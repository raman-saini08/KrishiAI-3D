import React, { useEffect, useRef, useState } from 'react';

interface AgriBackground3DProps {
  children?: React.ReactNode;
  enableParallax?: boolean;
}

export const AgriBackground3D: React.FC<AgriBackground3DProps> = ({
  children,
  enableParallax = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [targetMouse, setTargetMouse] = useState({ x: 0, y: 0 });

  // Mouse Parallax Lerping
  useEffect(() => {
    if (!enableParallax) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
      const y = (e.clientY / innerHeight - 0.5) * 2;
      setTargetMouse({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [enableParallax]);

  // Smooth lerp loop
  useEffect(() => {
    let animationFrameId: number;

    const lerp = () => {
      setMousePos((prev) => ({
        x: prev.x + (targetMouse.x - prev.x) * 0.05,
        y: prev.y + (targetMouse.y - prev.y) * 0.05,
      }));
      animationFrameId = requestAnimationFrame(lerp);
    };

    animationFrameId = requestAnimationFrame(lerp);
    return () => cancelAnimationFrame(animationFrameId);
  }, [targetMouse]);

  // Canvas particle animation (Floating Pollen & Holographic Data Points)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Generate Particles
    const particleCount = 65;
    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      color: string;
      vx: number;
      vy: number;
      alpha: number;
      maxAlpha: number;
      pulseSpeed: number;
      isHologramNode: boolean;
      label?: string;
    }> = [];

    const colors = [
      'rgba(183, 239, 197, ', // Light green
      'rgba(82, 183, 136, ',  // Leaf green
      'rgba(255, 224, 102, ', // Golden yellow
      'rgba(56, 189, 248, ',  // Sky blue holographic
    ];

    const sampleLabels = ['AI-SCAN', 'NPK:92%', 'MANDI:₹28', 'GPS:NODE-4', 'SOIL:6.8pH', 'HUM:68%'];

    for (let i = 0; i < particleCount; i++) {
      const isHologramNode = Math.random() > 0.8;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: isHologramNode ? Math.random() * 2.5 + 2 : Math.random() * 1.8 + 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 0.4,
        vy: -(Math.random() * 0.45 + 0.15), // gently float up
        alpha: Math.random() * 0.6 + 0.2,
        maxAlpha: Math.random() * 0.4 + 0.4,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        isHologramNode,
        label: isHologramNode ? sampleLabels[Math.floor(Math.random() * sampleLabels.length)] : undefined,
      });
    }

    let animationId: number;
    let time = 0;

    const render = () => {
      time += 0.01;
      ctx.clearRect(0, 0, width, height);

      // Render connected neural agricultural grid lines between close nodes
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110 && (particles[i].isHologramNode || particles[j].isHologramNode)) {
            const lineAlpha = (1 - dist / 110) * 0.18;
            ctx.strokeStyle = `rgba(183, 239, 197, ${lineAlpha})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw each particle
      particles.forEach((p) => {
        p.x += p.vx + mousePos.x * 0.2;
        p.y += p.vy;

        // Wrap around screen
        if (p.y < -20) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        // Pulse alpha
        const currentAlpha = Math.sin(time * p.pulseSpeed * 10) * 0.2 + p.alpha;

        // Glow circle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.max(0.1, Math.min(0.85, currentAlpha)) + ')';
        ctx.shadowColor = '#b7efc5';
        ctx.shadowBlur = p.isHologramNode ? 10 : 4;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Holographic label if node
        if (p.isHologramNode && p.label) {
          ctx.font = '8px "Courier New", monospace';
          ctx.fillStyle = `rgba(183, 239, 197, ${Math.min(0.7, currentAlpha * 0.8)})`;
          ctx.fillText(p.label, p.x + 6, p.y + 3);

          // Small ring around node
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius + 3, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(183, 239, 197, ${currentAlpha * 0.4})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      });

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [mousePos]);

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen overflow-x-hidden bg-[#070e0a]"
    >
      {/* 1. LAYER: CINEMATIC FULL-SCREEN AGRICULTURAL LANDSCAPE */}
      <div
        className="fixed inset-0 z-0 pointer-events-none transition-transform duration-300 ease-out will-change-transform"
        style={{
          transform: `scale(1.08) translate3d(${mousePos.x * -12}px, ${mousePos.y * -8}px, 0)`,
        }}
      >
        {/* Realistic aerial view of lush Indian golden-green farmland */}
        <img
          src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=2560&q=88"
          alt="Vast Indian Agricultural Fields"
          className="w-full h-full object-cover object-center filter brightness-[0.70] contrast-[1.12] saturate-[1.18]"
        />

        {/* 2. LAYER: HORIZON SUNRISE GOLDEN LIGHT BEAM */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#050c08] via-transparent to-transparent opacity-90"
        />
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-to-b from-[#f4a261]/20 via-[#e9c46a]/15 to-transparent rounded-full blur-[120px] pointer-events-none"
        />

        {/* 3. LAYER: SOFT DEPTH OF FIELD & ATMOSPHERIC FOG OVERLAY */}
        <div className="absolute inset-0 bg-radial-vignette pointer-events-none" />

        {/* 4. LAYER: SUBTLE CYBER-AGRI DIGITAL MATRIX GRID */}
        <div className="absolute inset-0 bg-cyber-grid pointer-events-none opacity-35" />
      </div>

      {/* 5. LAYER: FLOATING HOLOGRAPHIC PARTICLES & DATA POINTS CANVAS */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-1 pointer-events-none w-full h-full"
      />

      {/* 6. CONTENT LAYER */}
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
};
