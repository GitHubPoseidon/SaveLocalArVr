import React, { Suspense, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { Scene } from './components/scene'; // Custom component to render the 3D scene
import { initialScene } from './scene'; // Initial scene configuration (scene.js)

/**
 * Main application component for managing a 3D scene.
 * - Allows loading and saving of scene configurations.
 */
const App = () => {
  // State to manage the current scene data
  const [sceneData, setSceneData] = useState(initialScene);
  
  // Ref for accessing the hidden file input element
  const fileInputRef = useRef();

  /**
   * Handles loading a 3D scene configuration from a JSON file.
   * - Parses the file content and updates the `sceneData` state.
   * @param {Event} event - The input change event
   */
  const handleLoadScene = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const loadedData = JSON.parse(e.target.result);
          setSceneData(loadedData); // Update the scene with loaded data
        } catch (error) {
          console.error('Error parsing scene file:', error);
        }
      };
      reader.readAsText(file); // Read file as text
    }
  };

  /**
   * Handles saving the current 3D scene configuration as a JSON file.
   * - Creates a downloadable file containing the `sceneData`.
   */
  const handleSaveScene = () => {
    const sceneString = JSON.stringify(sceneData, null, 2); // Pretty-print JSON
    const blob = new Blob([sceneString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    // Create and trigger a download link
    const link = document.createElement('a');
    link.href = url;
    link.download = 'scene.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url); // Clean up the URL
  };

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      {/* UI Controls */}
      <div className="absolute top-0 left-0 z-10 p-4 bg-white/80 rounded-br-lg">
        {/* Hidden file input for uploading scene JSON */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleLoadScene}
          accept=".json"
          className="hidden"
        />
        {/* Load Scene Button */}
        <button
          onClick={() => fileInputRef.current.click()} // Trigger file input
          className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
        >
          Load Scene
        </button>
        {/* Save Scene Button */}
        <button
          onClick={handleSaveScene}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Save Scene
        </button>
      </div>

      {/* 3D Scene Rendering */}
      <Canvas shadows camera={{ position: [10, 10, 10], fov: 75 }}>
        <Suspense fallback={null}>
          {/* Render the custom Scene component with current scene data */}
          <Scene sceneData={sceneData} />
          {/* Orbit controls for 3D interaction */}
          <OrbitControls />
          {/* Environment preset for ambient lighting */}
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default App;
