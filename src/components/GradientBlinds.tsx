import { useEffect, useRef } from 'react';
import { Renderer, Camera, Transform, Geometry, Program, Mesh, Vec2 } from 'ogl';

interface GradientBlindsProps {
  gradientColors: string[];
  angle?: number;
  noise?: number;
  blindCount?: number;
  blindMinWidth?: number;
  spotlightRadius?: number;
  spotlightSoftness?: number;
  spotlightOpacity?: number;
  mouseDampening?: number;
  distortAmount?: number;
  shineDirection?: 'left' | 'right';
  mixBlendMode?: string;
}

const GradientBlinds = ({
  gradientColors = ['#FF9FFC', '#5227FF'],
  angle = 0,
  noise = 0.3,
  blindCount = 12,
  blindMinWidth = 50,
  spotlightRadius = 0.5,
  spotlightSoftness = 1,
  spotlightOpacity = 1,
  mouseDampening = 0.15,
  distortAmount = 0,
  shineDirection = 'left',
  mixBlendMode = 'lighten',
}: GradientBlindsProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<Vec2>(new Vec2(0.5, 0.5));
  const targetMouseRef = useRef<Vec2>(new Vec2(0.5, 0.5));

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const renderer = new Renderer({ canvas, alpha: true, dpr: 2 });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);

    const camera = new Camera(gl, { fov: 35 });
    camera.position.set(0, 0, 5);

    const scene = new Transform();

    // Convert hex colors to RGB
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? [
        parseInt(result[1], 16) / 255,
        parseInt(result[2], 16) / 255,
        parseInt(result[3], 16) / 255,
      ] : [1, 1, 1];
    };

    const color1 = hexToRgb(gradientColors[0]);
    const color2 = hexToRgb(gradientColors[1]);

    // Vertex shader
    const vertex = /* glsl */ `
      attribute vec2 uv;
      attribute vec3 position;
      uniform mat4 modelViewMatrix;
      uniform mat4 projectionMatrix;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    // Fragment shader with blinds effect
    const fragment = /* glsl */ `
      precision highp float;
      uniform float uTime;
      uniform vec2 uMouse;
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      uniform float uBlindCount;
      uniform float uNoise;
      uniform float uSpotlightRadius;
      uniform float uSpotlightSoftness;
      uniform float uSpotlightOpacity;
      varying vec2 vUv;

      // Simple noise function
      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
      }

      void main() {
        vec2 uv = vUv;
        
        // Create blinds effect
        float blindIndex = floor(uv.x * uBlindCount);
        float blindPos = fract(uv.x * uBlindCount);
        
        // Add animated rotation to blinds
        float rotation = sin(uTime * 0.5 + blindIndex * 0.5) * 0.5 + 0.5;
        float blind = smoothstep(0.45, 0.55, blindPos + rotation * 0.1);
        
        // Gradient
        float gradient = uv.y;
        vec3 color = mix(uColor1, uColor2, gradient);
        
        // Add noise
        float n = random(uv + uTime * 0.1) * uNoise;
        color += n;
        
        // Spotlight effect following mouse
        vec2 center = uMouse;
        float dist = distance(uv, center);
        float spotlight = 1.0 - smoothstep(uSpotlightRadius, uSpotlightRadius + uSpotlightSoftness, dist);
        spotlight *= uSpotlightOpacity;
        
        // Combine effects
        color = mix(color * 0.7, color, blind);
        color = mix(color, color * 1.3, spotlight);
        
        gl_FragColor = vec4(color, 1.0);
      }
    `;

    const geometry = new Geometry(gl, {
      position: { size: 3, data: new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]) },
      uv: { size: 2, data: new Float32Array([0, 0, 2, 0, 0, 2]) },
    });

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: mouseRef.current },
        uColor1: { value: color1 },
        uColor2: { value: color2 },
        uBlindCount: { value: blindCount },
        uNoise: { value: noise },
        uSpotlightRadius: { value: spotlightRadius },
        uSpotlightSoftness: { value: spotlightSoftness },
        uSpotlightOpacity: { value: spotlightOpacity },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });
    mesh.setParent(scene);

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseRef.current.x = (e.clientX - rect.left) / rect.width;
      targetMouseRef.current.y = 1.0 - (e.clientY - rect.top) / rect.height;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    let animationFrameId: number;
    const animate = (t: number) => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth mouse following
      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * mouseDampening;
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * mouseDampening;

      program.uniforms.uTime.value = t * 0.001;
      program.uniforms.uMouse.value = mouseRef.current;

      renderer.render({ scene, camera });
    };

    // Handle resize
    const handleResize = () => {
      renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
      camera.perspective({ aspect: canvas.offsetWidth / canvas.offsetHeight });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    animate(0);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [gradientColors, angle, noise, blindCount, blindMinWidth, spotlightRadius, spotlightSoftness, spotlightOpacity, mouseDampening, distortAmount, shineDirection]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: '100%',
        mixBlendMode: mixBlendMode as any,
      }}
    />
  );
};

export default GradientBlinds;
