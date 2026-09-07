import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  Rotate3d,
  Sparkles,
  Zap,
  Activity,
  Layers,
  Maximize2,
  Minimize2,
  Scan,
  ShieldCheck,
  AlertTriangle,
  Info,
} from 'lucide-react';

interface ThreePlantCanvasProps {
  onScanLeaf?: () => void;
}

export const ThreePlantCanvas: React.FC<ThreePlantCanvasProps> = ({ onScanLeaf }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [scanMode, setScanMode] = useState<'healthy' | 'disease' | 'wireframe'>('healthy');
  const [growthStage, setGrowthStage] = useState<'seedling' | 'vegetative' | 'fruiting'>('vegetative');
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // References for Three.js state
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const plantGroupRef = useRef<THREE.Group | null>(null);
  const leavesRef = useRef<THREE.Mesh[]>([]);
  const scanRingRef = useRef<THREE.Mesh | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. SCENE CREATION
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. CAMERA
    const width = container.clientWidth;
    const height = container.clientHeight || 420;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 2.8, 6.2);
    camera.lookAt(0, 1.4, 0);
    cameraRef.current = camera;

    // 3. RENDERER
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. LIGHTING SETUP
    const ambientLight = new THREE.AmbientLight(0xd8f3dc, 0.85);
    scene.add(ambientLight);

    // Warm Sun Directional Light
    const sunLight = new THREE.DirectionalLight(0xfff3b0, 2.2);
    sunLight.position.set(5, 8, 4);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    scene.add(sunLight);

    // Emerald Rim Light (Cyber-Agri Glow)
    const rimLight = new THREE.DirectionalLight(0x52b788, 1.8);
    rimLight.position.set(-5, 4, -4);
    scene.add(rimLight);

    // Blue Hologram Floor Uplight
    const pointLight = new THREE.PointLight(0x38bdf8, 1.5, 8);
    pointLight.position.set(0, 0.4, 0);
    scene.add(pointLight);

    // 5. 3D PROCEDURAL PLANT CREATION
    const plantGroup = new THREE.Group();
    plantGroup.position.set(0, 0, 0);
    scene.add(plantGroup);
    plantGroupRef.current = plantGroup;

    // A. Cyber Nursery Pedestal & Glowing Grid Disk
    const pedestalGeo = new THREE.CylinderGeometry(1.6, 1.9, 0.28, 32);
    const pedestalMat = new THREE.MeshStandardMaterial({
      color: 0x111c16,
      roughness: 0.35,
      metalness: 0.8,
    });
    const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat);
    pedestal.position.y = -0.14;
    pedestal.receiveShadow = true;
    plantGroup.add(pedestal);

    // Hologram Ring Disk
    const ringGeo = new THREE.RingGeometry(1.3, 1.45, 48);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x74c69d,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.7,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.02;
    plantGroup.add(ring);

    // Scanning Laser Ring
    const scanRingGeo = new THREE.TorusGeometry(1.2, 0.025, 16, 64);
    const scanRingMat = new THREE.MeshBasicMaterial({
      color: 0x52b788,
      transparent: true,
      opacity: 0.8,
    });
    const scanRing = new THREE.Mesh(scanRingGeo, scanRingMat);
    scanRing.rotation.x = Math.PI / 2;
    scanRing.position.y = 1.2;
    plantGroup.add(scanRing);
    scanRingRef.current = scanRing;

    // Soil Mound
    const soilGeo = new THREE.CylinderGeometry(1.25, 1.1, 0.15, 24);
    const soilMat = new THREE.MeshStandardMaterial({
      color: 0x2b1d0c,
      roughness: 0.95,
      bumpScale: 0.05,
    });
    const soil = new THREE.Mesh(soilGeo, soilMat);
    soil.position.y = 0.04;
    plantGroup.add(soil);

    // B. Stem Construction (Smooth curve spline)
    const stemCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0.04, 0.6, 0.02),
      new THREE.Vector3(-0.05, 1.3, 0.04),
      new THREE.Vector3(0.02, 2.0, -0.02),
      new THREE.Vector3(0, 2.7, 0),
    ]);

    const stemGeo = new THREE.TubeGeometry(stemCurve, 32, 0.065, 12, false);
    const stemMat = new THREE.MeshStandardMaterial({
      color: 0x2d6a4f,
      roughness: 0.6,
      metalness: 0.1,
    });
    const stemMesh = new THREE.Mesh(stemGeo, stemMat);
    stemMesh.castShadow = true;
    plantGroup.add(stemMesh);

    // C. Procedural Botanical Leaves
    const leaves: THREE.Mesh[] = [];

    // Custom Leaf Geometry function
    const createLeafGeometry = (scale = 1.0) => {
      const shape = new THREE.Shape();
      shape.moveTo(0, 0);
      shape.bezierCurveTo(0.25 * scale, 0.4 * scale, 0.35 * scale, 0.8 * scale, 0, 1.4 * scale);
      shape.bezierCurveTo(-0.35 * scale, 0.8 * scale, -0.25 * scale, 0.4 * scale, 0, 0);

      const extrudeSettings = {
        depth: 0.015,
        bevelEnabled: true,
        bevelSegments: 3,
        steps: 1,
        bevelSize: 0.01,
        bevelThickness: 0.01,
      };

      const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      geo.center();
      return geo;
    };

    // Plant Leaf Nodes configuration (Angles, heights, tilt)
    const leafNodes = [
      { y: 0.65, angle: 0.2, pitch: 0.75, roll: 0.3, scale: 0.8 },
      { y: 0.95, angle: 2.2, pitch: 0.7, roll: -0.25, scale: 0.95 },
      { y: 1.35, angle: 4.1, pitch: 0.65, roll: 0.2, scale: 1.1 },
      { y: 1.75, angle: 0.9, pitch: 0.6, roll: -0.3, scale: 1.05 },
      { y: 2.15, angle: 3.0, pitch: 0.55, roll: 0.15, scale: 0.9 },
      { y: 2.45, angle: 5.2, pitch: 0.45, roll: -0.2, scale: 0.75 },
      { y: 2.7, angle: 1.8, pitch: 0.3, roll: 0.1, scale: 0.55 },
    ];

    leafNodes.forEach((node, idx) => {
      const leafGeo = createLeafGeometry(node.scale);
      const leafMat = new THREE.MeshStandardMaterial({
        color: idx === 1 && scanMode === 'disease' ? 0x93000a : 0x40916c,
        roughness: 0.4,
        metalness: 0.15,
        side: THREE.DoubleSide,
      });

      const leafMesh = new THREE.Mesh(leafGeo, leafMat);
      leafMesh.castShadow = true;
      leafMesh.receiveShadow = true;

      // Position along stem
      const radius = 0.42 * node.scale;
      leafMesh.position.set(
        Math.cos(node.angle) * radius,
        node.y,
        Math.sin(node.angle) * radius
      );

      leafMesh.rotation.set(node.pitch, node.angle + Math.PI / 2, node.roll);
      leafMesh.userData = {
        id: `leaf-${idx}`,
        baseRotationY: leafMesh.rotation.y,
        baseRotationX: leafMesh.rotation.x,
        phase: idx * 0.8,
      };

      plantGroup.add(leafMesh);
      leaves.push(leafMesh);

      // Add a small pulsating holographic data marker on key leaves
      if (idx === 1 || idx === 3 || idx === 5) {
        const markerGeo = new THREE.SphereGeometry(0.045, 12, 12);
        const markerMat = new THREE.MeshBasicMaterial({
          color: idx === 1 && scanMode === 'disease' ? 0xff5449 : 0xb7efc5,
        });
        const marker = new THREE.Mesh(markerGeo, markerMat);
        marker.position.copy(leafMesh.position);
        marker.position.y += 0.15;
        plantGroup.add(marker);
      }
    });

    leavesRef.current = leaves;

    // 6. INTERACTIVE ORBIT & MOUSE DRAGGING
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      if (plantGroupRef.current) {
        plantGroupRef.current.rotation.y += deltaX * 0.008;
        plantGroupRef.current.rotation.x = Math.max(
          -0.4,
          Math.min(0.5, plantGroupRef.current.rotation.x + deltaY * 0.004)
        );
      }

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const domElem = renderer.domElement;
    domElem.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Touch support for mobile
    let touchStartX = 0;
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1 && plantGroupRef.current) {
        const deltaX = e.touches[0].clientX - touchStartX;
        plantGroupRef.current.rotation.y += deltaX * 0.01;
        touchStartX = e.touches[0].clientX;
      }
    };
    domElem.addEventListener('touchstart', onTouchStart, { passive: true });
    domElem.addEventListener('touchmove', onTouchMove, { passive: true });

    // 7. ANIMATION TICK LOOP
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Auto rotation when not dragging
      if (isAutoRotate && !isDragging && plantGroupRef.current) {
        plantGroupRef.current.rotation.y += 0.005;
      }

      // Wind sway effect on leaves
      leaves.forEach((leaf) => {
        const { baseRotationX, phase } = leaf.userData;
        if (baseRotationX !== undefined) {
          leaf.rotation.x = baseRotationX + Math.sin(elapsedTime * 2.2 + phase) * 0.04;
          leaf.position.y += Math.cos(elapsedTime * 1.8 + phase) * 0.0006;
        }
      });

      // Scanning laser ring up/down translation
      if (scanRingRef.current) {
        scanRingRef.current.position.y = 1.35 + Math.sin(elapsedTime * 2.0) * 1.1;
        scanRingRef.current.rotation.z += 0.02;
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // 8. RESIZE HANDLER
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 420;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      domElem.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      domElem.removeEventListener('touchstart', onTouchStart);
      domElem.removeEventListener('touchmove', onTouchMove);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isAutoRotate]);

  // Update materials when scanMode changes
  useEffect(() => {
    leavesRef.current.forEach((leaf, idx) => {
      const mat = leaf.material as THREE.MeshStandardMaterial;
      if (scanMode === 'wireframe') {
        mat.wireframe = true;
        mat.color.setHex(0xb7efc5);
      } else if (scanMode === 'disease') {
        mat.wireframe = false;
        if (idx === 1 || idx === 2) {
          // Flag leaf as early blight spot
          mat.color.setHex(0xd90429);
        } else {
          mat.color.setHex(0x52b788);
        }
      } else {
        // Healthy mode
        mat.wireframe = false;
        mat.color.setHex(0x2d6a4f);
      }
      mat.needsUpdate = true;
    });

    if (scanRingRef.current) {
      const ringMat = scanRingRef.current.material as THREE.MeshBasicMaterial;
      ringMat.color.setHex(
        scanMode === 'disease' ? 0xff5449 : scanMode === 'wireframe' ? 0x38bdf8 : 0x52b788
      );
    }
  }, [scanMode]);

  return (
    <div className="relative w-full h-[400px] sm:h-[460px] rounded-3xl glass-card border border-[#b7efc5]/30 overflow-hidden shadow-2xl bg-gradient-to-b from-[#0e1f15]/80 via-[#0a150e]/90 to-[#040a06]/95 group">
      {/* 3D WebGL Canvas Container */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Overlay HUD Bar */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
        <div className="flex items-center gap-2">
          <div className="px-3 py-1 rounded-full bg-[#102217]/90 border border-[#b7efc5]/40 text-[#b7efc5] text-xs font-bold flex items-center gap-1.5 shadow-md backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#b7efc5] animate-ping" />
            <span>Interactive 3D Digital Twin</span>
          </div>
          <span className="text-[11px] text-[#95d4b3] hidden sm:inline-block font-mono bg-black/40 px-2 py-0.5 rounded-md border border-[#95d4b3]/20">
            FPS: 60 • Three.js WebGL
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 pointer-events-auto">
          <button
            onClick={() => setIsAutoRotate(!isAutoRotate)}
            className={`p-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer backdrop-blur-md ${
              isAutoRotate
                ? 'bg-[#1b4332] border-[#b7efc5]/60 text-[#b7efc5]'
                : 'bg-[#141d18]/80 border-[#414844] text-[#86af99] hover:text-white'
            }`}
            title="Toggle 3D Orbit Auto-Rotate"
          >
            <Rotate3d className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Floating Holographic AI Diagnostics Badges (Projected on 3D Space) */}
      <div className="absolute top-16 left-4 space-y-2 pointer-events-none z-10">
        {/* Metric 1: Health Index */}
        <div className="bg-[#0b1b11]/85 border border-[#b7efc5]/30 backdrop-blur-md rounded-2xl p-2.5 shadow-xl max-w-[160px] animate-float-3d">
          <div className="flex items-center justify-between text-[10px] text-[#86af99] font-mono">
            <span>CHLOROPHYLL</span>
            <span className="text-[#b7efc5] font-bold">48.2 SPAD</span>
          </div>
          <div className="w-full bg-[#18231c] h-1.5 rounded-full mt-1 overflow-hidden">
            <div className="bg-gradient-to-r from-[#40916c] to-[#b7efc5] h-full w-[92%]" />
          </div>
          <div className="text-[9px] text-[#b7efc5] mt-1 font-semibold flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5" /> High Photosynthesis
          </div>
        </div>

        {/* Metric 2: Cellular Hydration */}
        <div className="bg-[#0b1b11]/85 border border-[#38bdf8]/30 backdrop-blur-md rounded-2xl p-2.5 shadow-xl max-w-[160px] hidden sm:block">
          <div className="flex items-center justify-between text-[10px] text-[#86af99] font-mono">
            <span>TRANSPIRATION</span>
            <span className="text-[#38bdf8] font-bold">84%</span>
          </div>
          <div className="w-full bg-[#18231c] h-1.5 rounded-full mt-1 overflow-hidden">
            <div className="bg-gradient-to-r from-[#0284c7] to-[#38bdf8] h-full w-[84%]" />
          </div>
          <div className="text-[9px] text-[#38bdf8] mt-1 font-semibold flex items-center gap-1">
            <Zap className="w-2.5 h-2.5" /> Optimal Stomatal Flow
          </div>
        </div>
      </div>

      {/* Bottom Diagnostics & Scan Mode Toolbar */}
      <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row items-center justify-between gap-3 z-10">
        {/* Mode Switcher Tabs */}
        <div className="bg-[#0f2117]/90 p-1 rounded-2xl border border-[#b7efc5]/30 backdrop-blur-md flex items-center gap-1 shadow-lg w-full sm:w-auto justify-center">
          <button
            onClick={() => setScanMode('healthy')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              scanMode === 'healthy'
                ? 'bg-[#1b4332] text-[#b7efc5] border border-[#b7efc5]/40 shadow-sm'
                : 'text-[#86af99] hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Healthy Crop</span>
          </button>

          <button
            onClick={() => setScanMode('disease')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              scanMode === 'disease'
                ? 'bg-[#93000a] text-[#ffdad6] border border-[#ff897d]/40 shadow-sm'
                : 'text-[#86af99] hover:text-white'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Disease Triage</span>
          </button>

          <button
            onClick={() => setScanMode('wireframe')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              scanMode === 'wireframe'
                ? 'bg-[#0369a1] text-[#e0f2fe] border border-[#38bdf8]/40 shadow-sm'
                : 'text-[#86af99] hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Neural Wireframe</span>
          </button>
        </div>

        {/* Scan Button Action */}
        <button
          onClick={onScanLeaf}
          className="w-full sm:w-auto px-4 py-2 rounded-2xl btn-3d-primary font-bold text-xs flex items-center justify-center gap-2 shadow-xl cursor-pointer"
        >
          <Scan className="w-4 h-4" />
          <span>Launch AI Full Scan</span>
        </button>
      </div>
    </div>
  );
};
