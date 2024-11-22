import React, { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Renders a 3D box object with configurable properties.
 */
function Box({ position, scale, rotation, material }) {
  return (
    <mesh position={position} scale={scale} rotation={rotation}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial 
        color={material?.color || "#ffffff"} 
        metalness={material?.reflectivity || 0}
        opacity={material?.opacity || 1}
        transparent={material?.opacity < 1}
      />
    </mesh>
  );
}

/**
 * Renders a light object based on the specified type and properties.
 */
function Light({ type, position, intensity, color, decay, distance }) {
  switch (type) {
    case 'point':
      return (
        <pointLight 
          position={position} 
          intensity={intensity} 
          color={color}
          decay={decay}
          distance={distance}
        />
      );
    case 'directional':
      return (
        <directionalLight
          position={position}
          intensity={intensity}
          color={color}
        />
      );
    case 'ambient':
      return <ambientLight intensity={intensity} color={color} />;
    default:
      return null;
  }
}

/**
 * Renders a sensor object, represented as a small sphere.
 */
function Sensor({ type, position }) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.2, 16, 16]} />
      <meshStandardMaterial 
        color={type === 'temperature' ? '#ff0000' : '#0000ff'} 
        emissive={type === 'temperature' ? '#ff0000' : '#0000ff'}
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}

/**
 * Renders the entire scene based on the provided scene data.
 */
export function Scene({ sceneData }) {
  const { camera } = useThree();
  
  // Update the camera's properties when scene data changes.
  useEffect(() => {
    if (sceneData?.scene?.camera) {
      const { position, target, fov } = sceneData.scene.camera;
      camera.position.set(...position);
      camera.lookAt(new THREE.Vector3(...target));
      camera.fov = fov;
      camera.updateProjectionMatrix();
    }
  }, [sceneData?.scene?.camera, camera]);

  return (
    <>
      {/* Lights */}
      {sceneData?.scene?.lights?.map((light, index) => (
        <Light key={light.id || index} {...light} />
      ))}

      {/* Primary Model (e.g., Building) */}
      <Box 
        position={sceneData?.models?.[0]?.settings?.position || [0, 0, 0]}
        scale={sceneData?.models?.[0]?.settings?.scale || [1, 1, 1]}
        rotation={sceneData?.models?.[0]?.settings?.rotation || [0, 0, 0]}
        material={sceneData?.config?.materials?.walls}
      />

      {/* Sensors */}
      {sceneData?.config?.sensors?.map((sensor, index) => (
        <Sensor key={sensor.id || index} {...sensor} />
      ))}

      {/* Grid Helper for Visual Reference */}
      <gridHelper args={[20, 20]} />
    </>
  );
}

export default Scene;
