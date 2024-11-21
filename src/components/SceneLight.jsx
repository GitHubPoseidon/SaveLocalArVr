import React from 'react';

export const SceneLight = ({ type, position, intensity, color }) => {
  switch (type) {
    case 'point':
      return <pointLight position={position} intensity={intensity} color={color} />;
    case 'directional':
      return <directionalLight position={position} intensity={intensity} color={color} />;
    case 'ambient':
      return <ambientLight intensity={intensity} color={color} />;
    default:
      return null;
  }
};