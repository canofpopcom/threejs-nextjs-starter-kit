import ThreeContainer from "../components/ThreeContainer";
import * as THREE from 'three';
import { useState } from 'react'
import { OrbitControls } from 'three/jsm/controls/OrbitControls.js'

export default function Home() {
  const [scene, setScene] = useState(null);
  const [renderer, setRenderer] = useState(null);
  const [camera, setCamera] = useState(null);
  const [sceneData, setSceneData] = useState(null);
  return <ThreeContainer
      onInit={({ scene, renderer, camera })=>{

        renderer.setPixelRatio(window.devicePixelRatio)

        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshStandardMaterial( { color: 0x00ff00 } );
        const cube = new THREE.Mesh( geometry, material );

        const ambientLight = new THREE.AmbientLight( 0x404040 ); // soft white light

        scene.add( ambientLight );

        const spotLight = new THREE.SpotLight( 0xffffff );
        spotLight.position.set(1,4,4);

        scene.add( spotLight );

        scene.add( cube );
        
        camera.position.z = 5;

        const controls = new OrbitControls( camera, renderer.domElement );
        controls.update();
        
        setCamera(camera);
        setScene(scene);
        setRenderer(renderer);
        setSceneData(sd => ({...sd,
          scene1: {
            geometry,
            material,
            cube
          }
        }))
      }}
      onResize={(width, height) => {
        if(renderer && camera){
          renderer.setSize(width, height);
          const canvas = renderer.domElement;
          canvas.style.width = '100%';
          canvas.style.height = '100%';
          canvas.style.position = 'absolute';
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
        }
      }}
      onAnimationFrame={()=>{
        if(renderer && scene && camera && sceneData){
          const { scene1: { cube } } = sceneData;

          cube.rotation.y += 0.01;

          renderer.render( scene, camera );
        }
      }}
      />
}
