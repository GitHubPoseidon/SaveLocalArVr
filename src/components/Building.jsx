import React from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export const Building = ({ modelPath, scale, position, rotation }) => {
  const gltf = useLoader(GLTFLoader, modelPath);
  
  return (
    <primitive 
      object={gltf.scene} 
      scale={scale} 
      position={position}
      rotation={rotation}
    />
  );
};