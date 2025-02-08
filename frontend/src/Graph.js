import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { EffectComposer } from "/node_modules/three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "/node_modules/three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "/node_modules/three/examples/jsm/postprocessing/UnrealBloomPass.js";
import {
  CSS2DRenderer,
  CSS2DObject,
} from "three/addons/renderers/CSS2DRenderer.js";
import * as TWEEN from "@tweenjs/tween.js";

const Graph = () => {
  const canvasRef = useRef(null);

  function createLabel(text) {
    const div = document.createElement("div");

    div.style.backgroundColor = "argb(0, 0, 0, 0)";
    div.style.color = "#bfbfbf";
    div.style.font = "roboto, sans-serif";
    div.style.position = "absolute";
    div.style.fontSize = "16px";
    div.style.textShadow = "0 0 10px #FFFFFF";

    const name = document.createElement("p");
    name.textContent = text;
    div.appendChild(name);

    let label = new CSS2DObject(div);
    return label;
  }

  useEffect(() => {
    //global declaration
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    let renderer = new THREE.WebGLRenderer({
      antialias: true,
    });
    const canvas = renderer.domElement;
    scene = new THREE.Scene();

    let labelRenderer = new CSS2DRenderer(canvas);
    labelRenderer.setSize(window.innerWidth, window.innerHeight);
    labelRenderer.domElement.style.position = "absolute";
    labelRenderer.domElement.style.top = "0px";
    labelRenderer.domElement.style.zIndex = "41";
    document.body.appendChild(labelRenderer.domElement);

    // Initialize camera, scene, and controls
    const controls = new OrbitControls(camera, labelRenderer.domElement);
    camera.position.z = 500;
    camera.zoom = 5;
    controls.minZoom = 5.0;
    controls.maxZoom = 20.0;
    controls.update();

    // Initialize bloom renderer and canvas
    canvasRef.current.appendChild(canvas);
    const renderScene = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      4.0,
      2.0,
      2.0
    );
    bloomPass.threshold = 0;
    bloomPass.strength = 2.0; //intensity of glow
    bloomPass.radius = 0.5;
    const bloomComposer = new EffectComposer(renderer);
    bloomComposer.setSize(window.innerWidth, window.innerHeight);
    bloomComposer.renderToScreen = true;
    bloomComposer.addPass(renderScene);
    bloomComposer.addPass(bloomPass);

    // Initialize raycaster and mouse vector
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Setting up canvas dimensions
    const setCanvasSize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };

    // Background parameters
    const num_stars = 7500;
    const palette = ["#912e54", "#d1788f", "#dd7c86", "#ffffff"];

    // Initial setting
    setCanvasSize();

    // Animate function
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      bloomComposer.render();
      labelRenderer.render(scene, camera);

      spheres.forEach((sphere, i) => {
        const scale = camera.position.distanceTo(sphere.position) / 300;
        labels[i].position
          .copy(sphere.position)
          .add(new THREE.Vector3(4 * scale, 4 * scale, 4 * scale));
      });

      TWEEN.update();
    };

    // Star/label data
    const spheres = [];
    const labels = [];
    const sphereGeometry = new THREE.IcosahedronGeometry(0.35, 1);
    const baseColor = new THREE.Color("#ff7800");
    const hoverColor = new THREE.Color("#ffffff");

    let pointDict;
    // load points
    fetch("http://localhost:8080/get-points")
      .then((response) => response.json())
      .then((data) => {
        // Process the response data
        pointDict = data;
        // Render the points
        for (let key in pointDict) {
          const material = new THREE.MeshBasicMaterial({ color: baseColor });
          const sphere = new THREE.Mesh(sphereGeometry, material);
          const x = pointDict[key][0] * 150 - 75;
          const z = pointDict[key][1] * 150 - 75;
          const y = pointDict[key][2] * 150 - 75;
          sphere.position.set(x, y, z);
          let label = createLabel(key);
          label.visible = true;
          labels.push(label);
          spheres.push(sphere);
          scene.add(sphere);
          scene.add(label);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    // Background points
    const backgroundGeometry = new THREE.SphereGeometry(0.3, 1);
    for (let i = 0; i < num_stars; i++) {
      const idx = Math.floor(Math.random() * palette.length);
      const material = new THREE.MeshBasicMaterial({ color: palette[idx] });
      const sphere = new THREE.Mesh(backgroundGeometry, material);
      const x = Math.random() - 0.5;
      const y = Math.random() - 0.5;
      const z = Math.random() - 0.5;
      let dist = Math.random() * 4000;
      if (0 < dist && dist < 2000) dist = 2000;
      if (0 > dist && dist > -2000) dist = -2000;
      sphere.position.set(x * dist, y * dist, z * dist);
      scene.add(sphere);
    }

    let lastIntersected;
    const animationEasing = TWEEN.Easing.Back.InOut;
    const hoverAnimationLength = 30;
    function startHoverAnimation(sphere) {
      lastIntersected = sphere;
      new TWEEN.Tween(sphere.material.color)
        .to(hoverColor, hoverAnimationLength)
        .easing(animationEasing)
        .start();
      new TWEEN.Tween(sphere.scale)
        .to({ x: 1.6, y: 1.6, z: 1.6 }, hoverAnimationLength)
        .easing(animationEasing)
        .start();
    }
    function startUnHoverAnimation(sphere) {
      lastIntersected = null;
      new TWEEN.Tween(sphere.material.color)
        .to(baseColor, hoverAnimationLength)
        .easing(animationEasing)
        .start();
      new TWEEN.Tween(sphere.scale)
        .to({ x: 1, y: 1, z: 1 }, hoverAnimationLength)
        .easing(animationEasing)
        .start();
    }
    // Mouse move event handler
    const onMouseMove = (e) => {
      // Update mouse vector
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

      // Update raycaster
      raycaster.setFromCamera(mouse, camera);

      // Check for intersected objects
      const intersects = raycaster.intersectObjects(spheres);

      // We're intersecting something this frame
      if (intersects.length > 0) {
        if (!lastIntersected) {
          // We weren't intersecting anything in the last frame
          startHoverAnimation(intersects[0].object);
        } else if (lastIntersected !== intersects[0].Object) {
          // We were intersecting something on the last frame, but it was a different object
          startUnHoverAnimation(lastIntersected);
          startHoverAnimation(intersects[0].object);
        }
      } else if (lastIntersected) {
        // We were intersecting something on the last frame, but we aren't intersecting anything this frame
        startUnHoverAnimation(lastIntersected);
      }
      TWEEN.update();
    };

    // Add event listeners
    window.addEventListener("resize", setCanvasSize);
    window.addEventListener("mousemove", onMouseMove);

    // Kick off animation
    animate();

    // Cleanup function
    return () => {
      window.removeEventListener("resize", setCanvasSize);
      window.removeEventListener("mousemove", onMouseMove);
      if (canvasRef != null && canvasRef.current != null) {
        canvasRef.current.removeChild(canvas);
      }
      document.body.removeChild(labelRenderer.domElement);
    };
  }, []);

  return (
    <div
      ref={canvasRef}
      style={{ position: "absolute", top: 0, left: 0, zIndex: 40 }}
    ></div>
  );
};

export default Graph;
