// src/scene.js
export const initialScene = {
    "id": "project-001",
    "name": "Simple Building",
    "version": "1.0",
    "models": [
      {
        "type": "glTF",
        "path": "/models/building.gltf",
        "settings": {
          "scale": [1, 1, 1],
          "position": [0, 0, 0],
          "rotation": [0, 0, 0]
        }
      }
    ],
    "config": {
      "sensors": [
        {
          "type": "temperature",
          "id": "sensor-001",
          "position": [3, 2, 0],
          "range": "0-100°C",
          "accuracy": "±0.5°C",
          "dataFrequency": "1s"
        },
        {
          "type": "humidity",
          "id": "sensor-002",
          "position": [-3, 2, 0],
          "range": "0-100%",
          "accuracy": "±2%",
          "dataFrequency": "1s"
        }
      ],
      "materials": {
        "walls": {
          "color": "#ffffff",
          "texture": "brick",
          "reflectivity": 0.5,
          "opacity": 1.0
        },
        "roof": {
          "color": "#cccccc",
          "texture": "shingle",
          "reflectivity": 0.3,
          "opacity": 1.0
        }
      },
      "animationState": {
        "isPlaying": true,
        "speed": 1.0,
        "loop": true
      }
    },
    "scene": {
      "camera": {
        "position": [0, 10, 20],
        "target": [0, 0, 0],
        "fov": 75,
        "near": 0.1,
        "far": 1000
      },
      "lights": [
        {
          "type": "point",
          "id": "light-001",
          "position": [5, 10, 5],
          "intensity": 1.0,
          "color": "#ffffff",
          "decay": 2.0,
          "distance": 50
        },
        {
          "type": "directional",
          "id": "light-002",
          "position": [10, 10, 10],
          "intensity": 0.8,
          "color": "#ffffff",
          "shadow": {
            "enabled": true,
            "bias": 0.01,
            "radius": 1.0
          }
        },
        {
          "type": "ambient",
          "id": "light-003",
          "intensity": 0.3,
          "color": "#ffffff"
        }
      ]
    }
  };