import React, { useEffect, useRef, useState } from 'react';
import cameraConfig from '../../config/cameraConfig';

// Camera icon SVG component
const CameraIcon = ({ size = 'lg' }) => (
  <svg className={size === 'lg' ? 'cam-icon-lg' : 'cam-icon-sm'} viewBox="0 0 52 44" fill="none">
    <rect x="1" y="8" width="50" height="35" rx="4" stroke="#4a5a6a" strokeWidth="2"/>
    <circle cx="26" cy="25" r="10" stroke="#4a5a6a" strokeWidth="2"/>
    <circle cx="26" cy="25" r="4" fill="#4a5a6a" opacity={size === 'lg' ? "0.5" : "0.4"}/>
    <rect x="18" y="1" width="16" height="8" rx="2" stroke="#4a5a6a" strokeWidth="1.5"/>
    {size === 'lg' && <circle cx="44" cy="14" r="2.5" fill="#4a5a6a"/>}
  </svg>
);

// ZED Camera Panel Component
const ZedCameraPanel = ({ title, image, isEnabled, fps = 0, mode = 'DEPTH', gridClass }) => {
  const isConnected = isEnabled && image;

  return (
    <div className={`cam-panel ${gridClass}`}>
      <div className="cam-header">
        <span className="cam-title zed">⬡ {title}</span>
        <div className="cam-controls">
          <div className={`dot ${isConnected ? 'g' : 'r'}`}></div>
          <div className="dot r"></div>
          <div className="dot d"></div>
        </div>
      </div>
      <div className="cam-body">
        <div className="grid-overlay"></div>
        {isConnected ? (
          <img
            src={`data:image/jpeg;base64,${image}`}
            alt={title}
            className="cam-feed-image"
          />
        ) : (
          <div className="placeholder">
            <CameraIcon size="lg" />
            <div className="connecting lg">
              {isEnabled ? 'Connecting' : 'Disconnected'}<span>...</span>
            </div>
          </div>
        )}
      </div>
      <div className="cam-footer">
        <div className="badge depth">
          <div className={`dot ${isConnected ? 'g' : 'r'}`}></div>
          {mode} MODE
        </div>
        <span className="fps">{fps} FPS</span>
      </div>
    </div>
  );
};

// Regular Camera Panel Component
const CameraPanel = ({ title, image, isEnabled, fps = 0, showBadge = false, gridClass }) => {
  const isConnected = isEnabled && image;

  return (
    <div className={`cam-panel ${gridClass}`}>
      <div className="cam-header">
        <span className="cam-title">{title}</span>
        <div className="cam-controls">
          <div className={`dot ${isConnected ? 'g' : 'r'}`}></div>
          <div className="dot d"></div>
        </div>
      </div>
      <div className="cam-body">
        {isConnected ? (
          <img
            src={`data:image/jpeg;base64,${image}`}
            alt={title}
            className="cam-feed-image"
          />
        ) : (
          <div className="placeholder">
            <CameraIcon size="sm" />
            <div className="connecting">
              {isEnabled ? 'Connecting' : 'Disconnected'}<span>...</span>
            </div>
          </div>
        )}
      </div>
      <div className="cam-footer">
        {showBadge ? (
          <div className="badge standby">
            <div className="dot r"></div>
            {isConnected ? 'REC' : 'STANDBY'}
          </div>
        ) : (
          <span></span>
        )}
        <span className="fps">{fps} FPS</span>
      </div>
    </div>
  );
};

const CameraFeeds = () => {
  const { cameras, zedCameras } = cameraConfig;

  // Stream state
  const [frontViewStream, setFrontViewStream]   = useState(null);
  const [armCameraStream, setArmCameraStream]   = useState(null);
  const [armVideoStream,  setArmVideoStream]    = useState(null);
  const [zedStream,       setZedStream]         = useState(null);

  // Image state
  const [frontViewImage,  setFrontViewImage]    = useState(null);
  const [armCameraImage,  setArmCameraImage]    = useState(null);
  const [armVideoImage,   setArmVideoImage]     = useState(null);
  const [zedLeftImage,    setZedLeftImage]      = useState(null);
  const [zedRightImage,   setZedRightImage]     = useState(null);

  // Hidden canvases for ZED split processing
  const canvasLeftRef  = useRef(null);
  const canvasRightRef = useRef(null);

  // Enable toggles
  const [frontViewEnabled, setFrontViewEnabled] = useState(true);
  const [armCameraEnabled, setArmCameraEnabled] = useState(true);
  const [armVideoEnabled,  setArmVideoEnabled]  = useState(true);
  const [zedEnabled,       setZedEnabled]       = useState(true);

  // FPS state
  const [frontViewFps, setFrontViewFps] = useState(0);
  const [armCameraFps, setArmCameraFps] = useState(0);
  const [armVideoFps,  setArmVideoFps]  = useState(0);
  const [zedFps,       setZedFps]       = useState(0);

  // Connect a regular WebSocket stream
  const connectStream = (streamUrl, setImageFn, setFpsFn) => {
    const ws = new WebSocket(streamUrl);
    let frameCount = 0;
    let lastTime = Date.now();

    ws.onopen = () => console.log('WS connected:', streamUrl);

    ws.onmessage = (event) => {
      frameCount++;
      const now = Date.now();
      if (now - lastTime >= 1000) {
        setFpsFn(frameCount);
        frameCount = 0;
        lastTime = now;
      }
      setImageFn(event.data);
    };

    ws.onerror  = (err) => console.error('WS error:', err);
    ws.onclose  = ()    => { console.log('WS closed:', streamUrl); setFpsFn(0); };

    return ws;
  };

  // Connect ZED stream and split left/right
  const connectZedStream = (streamUrl) => {
    const ws = new WebSocket(streamUrl);
    let frameCount = 0;
    let lastTime = Date.now();

    ws.onopen = () => console.log('ZED WS connected:', streamUrl);

    ws.onmessage = (event) => {
      frameCount++;
      const now = Date.now();
      if (now - lastTime >= 1000) {
        setZedFps(frameCount);
        frameCount = 0;
        lastTime = now;
      }

      const img = new Image();
      img.onload = () => {
        const halfW = img.width / 2;
        const h     = img.height;

        const canvasLeft = canvasLeftRef.current;
        if (canvasLeft) {
          canvasLeft.width  = halfW;
          canvasLeft.height = h;
          canvasLeft.getContext('2d').drawImage(img, 0, 0, halfW, h, 0, 0, halfW, h);
          setZedLeftImage(canvasLeft.toDataURL('image/jpeg').split(',')[1]);
        }

        const canvasRight = canvasRightRef.current;
        if (canvasRight) {
          canvasRight.width  = halfW;
          canvasRight.height = h;
          canvasRight.getContext('2d').drawImage(img, halfW, 0, halfW, h, 0, 0, halfW, h);
          setZedRightImage(canvasRight.toDataURL('image/jpeg').split(',')[1]);
        }
      };
      img.src = `data:image/jpeg;base64,${event.data}`;
    };

    ws.onerror = (err) => console.error('ZED WS error:', err);
    ws.onclose = ()    => { console.log('ZED WS closed'); setZedFps(0); };

    return ws;
  };

  // Front View
  useEffect(() => {
    if (frontViewEnabled) {
      const ws = connectStream(cameras.frontView.wsUrl, setFrontViewImage, setFrontViewFps);
      setFrontViewStream(ws);
      return () => ws.close();
    } else {
      if (frontViewStream) { frontViewStream.close(); setFrontViewStream(null); }
      setFrontViewImage(null);
      setFrontViewFps(0);
    }
  }, [frontViewEnabled]);

  // Arm Camera
  useEffect(() => {
    if (armCameraEnabled) {
      const ws = connectStream(cameras.armCamera.wsUrl, setArmCameraImage, setArmCameraFps);
      setArmCameraStream(ws);
      return () => ws.close();
    } else {
      if (armCameraStream) { armCameraStream.close(); setArmCameraStream(null); }
      setArmCameraImage(null);
      setArmCameraFps(0);
    }
  }, [armCameraEnabled]);

  // Arm Video
  useEffect(() => {
    if (armVideoEnabled) {
      const ws = connectStream(cameras.armVideo.wsUrl, setArmVideoImage, setArmVideoFps);
      setArmVideoStream(ws);
      return () => ws.close();
    } else {
      if (armVideoStream) { armVideoStream.close(); setArmVideoStream(null); }
      setArmVideoImage(null);
      setArmVideoFps(0);
    }
  }, [armVideoEnabled]);

  // ZED
  useEffect(() => {
    if (zedEnabled) {
      const ws = connectZedStream(zedCameras.zedDepth.wsUrl);
      setZedStream(ws);
      return () => ws.close();
    } else {
      if (zedStream) { zedStream.close(); setZedStream(null); }
      setZedLeftImage(null);
      setZedRightImage(null);
      setZedFps(0);
    }
  }, [zedEnabled]);

  return (
    <div className="content">
      {/* Hidden canvases for ZED split processing */}
      <canvas ref={canvasLeftRef}  style={{ display: 'none' }} />
      <canvas ref={canvasRightRef} style={{ display: 'none' }} />

      {/* ZED2 Depth Camera — top row, left 50% */}
      <ZedCameraPanel
        title="ZED2 Depth Camera"
        image={zedLeftImage}
        isEnabled={zedEnabled}
        fps={zedFps}
        mode="DEPTH"
        gridClass="zed-depth"
      />

      {/* ZED2 RGB Camera — top row, right 50% */}
      <ZedCameraPanel
        title="ZED2 Camera"
        image={zedRightImage}
        isEnabled={zedEnabled}
        fps={zedFps}
        mode="RGB"
        gridClass="zed-rgb"
      />

      {/* Front View — bottom row, col 1/3 */}
      <CameraPanel
        title="Front View"
        image={frontViewImage}
        isEnabled={frontViewEnabled}
        fps={frontViewFps}
        showBadge={true}
        gridClass="front-view"
      />

      {/* Arm Camera — bottom row, col 2/3 */}
      <CameraPanel
        title="Arm Camera"
        image={armCameraImage}
        isEnabled={armCameraEnabled}
        fps={armCameraFps}
        gridClass="arm-camera"
      />

      {/* Arm Video — bottom row, col 3/3 */}
      <CameraPanel
        title="Arm Video"
        image={armVideoImage}
        isEnabled={armVideoEnabled}
        fps={armVideoFps}
        gridClass="arm-video"
      />
    </div>
  );
};

export default CameraFeeds;