// Camera Configuration for Rover UI
// This file contains the IP addresses and WebSocket ports for all camera feeds

const cameraConfig = {
  // Regular cameras (3 cameras)
  cameras: {
    frontView: {
      name: 'Front View Camera',
      ip: '192.168.0.5',
      port: 8000,
      wsUrl: 'ws://192.168.0.5:8000',
      type: 'regular',
      grayscale: true
    },
    armCamera: {
      name: 'Arm Camera',
      ip: '192.168.0.5',
      port: 8001,
      wsUrl: 'ws://192.168.0.5:8001',
      type: 'regular',
      grayscale: true
    },
    armVideo: {
      name: 'Arm Video',
      ip: '192.168.0.5',
      port: 8002,
      wsUrl: 'ws://192.168.0.5:8002',
      type: 'regular',
      grayscale: true
    }
  },

  // ZED2 cameras (2 cameras)
  zedCameras: {

    zedDepth: {
      name: 'ZED2 Depth Camera',
      ip: '192.168.0.5',
      port: 8003,
      wsUrl: 'ws://192.168.0.5:8003',
      type: 'zed',
      grayscale: true
    }
  }
};

export default cameraConfig;
