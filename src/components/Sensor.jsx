import React from 'react';

export const Sensor = ({ position, type }) => {
  const color = type === 'temperature' ? '#ff0000' : '#0000ff';
  
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.2, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};