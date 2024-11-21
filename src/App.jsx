import React, { Suspense, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { Scene } from './components/scene';
import { initialScene } from './scene';

const App = () => {
  const [sceneData, setSceneData] = useState(initialScene);
  const fileInputRef = useRef();

  const handleLoadScene = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const loadedData = JSON.parse(e.target.result);
          setSceneData(loadedData);
        } catch (error) {
          console.error('Error parsing scene file:', error);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleSaveScene = () => {
    const sceneString = JSON.stringify(sceneData, null, 2);
    const blob = new Blob([sceneString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'scene.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <div className="absolute top-0 left-0 z-10 p-4 bg-white/80 rounded-br-lg">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleLoadScene}
          accept=".json"
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current.click()}
          className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
        >
          Load Scene
        </button>
        <button
          onClick={handleSaveScene}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Save Scene
        </button>
      </div>

      <Canvas shadows camera={{ position: [10, 10, 10], fov: 75 }}>
        <Suspense fallback={null}>
          <Scene sceneData={sceneData} />
          <OrbitControls />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default App;