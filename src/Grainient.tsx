import { useEffect, useRef } from "react";
import { Mesh, Program, Renderer, Triangle } from "ogl";
import "./Grainient.css";

type GrainientProps = {
  className?: string;
  color1?: string;
  color2?: string;
  color3?: string;
  timeSpeed?: number;
  colorBalance?: number;
  warpStrength?: number;
  warpFrequency?: number;
  warpSpeed?: number;
  warpAmplitude?: number;
  blendAngle?: number;
  blendSoftness?: number;
  rotationAmount?: number;
  noiseScale?: number;
  grainAmount?: number;
  grainScale?: number;
  grainAnimated?: boolean;
  contrast?: number;
  gamma?: number;
  saturation?: number;
  centerX?: number;
  centerY?: number;
  zoom?: number;
};

const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [1, 1, 1];
  return [
    parseInt(result[1], 16) / 255,
    parseInt(result[2], 16) / 255,
    parseInt(result[3], 16) / 255
  ];
};

const vertex = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = `#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform float uTimeSpeed;
uniform float uColorBalance;
uniform float uWarpStrength;
uniform float uWarpFrequency;
uniform float uWarpSpeed;
uniform float uWarpAmplitude;
uniform float uBlendAngle;
uniform float uBlendSoftness;
uniform float uRotationAmount;
uniform float uNoiseScale;
uniform float uGrainAmount;
uniform float uGrainScale;
uniform float uGrainAnimated;
uniform float uContrast;
uniform float uGamma;
uniform float uSaturation;
uniform vec2 uCenterOffset;
uniform float uZoom;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
out vec4 fragColor;
#define S(a,b,t) smoothstep(a,b,t)
mat2 Rot(float a){float s=sin(a),c=cos(a);return mat2(c,-s,s,c);}
vec2 hash(vec2 p){p=vec2(dot(p,vec2(2127.1,81.17)),dot(p,vec2(1269.5,283.37)));return fract(sin(p)*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p),u=f*f*(3.0-2.0*f);float n=mix(mix(dot(-1.0+2.0*hash(i+vec2(0.0,0.0)),f-vec2(0.0,0.0)),dot(-1.0+2.0*hash(i+vec2(1.0,0.0)),f-vec2(1.0,0.0)),u.x),mix(dot(-1.0+2.0*hash(i+vec2(0.0,1.0)),f-vec2(0.0,1.0)),dot(-1.0+2.0*hash(i+vec2(1.0,1.0)),f-vec2(1.0,1.0)),u.x),u.y);return 0.5+0.5*n;}
void mainImage(out vec4 o, vec2 C){
  float t=iTime*uTimeSpeed;
  vec2 uv=C/iResolution.xy;
  float ratio=iResolution.x/iResolution.y;
  vec2 tuv=uv-0.5+uCenterOffset;
  tuv/=max(uZoom,0.001);

  float degree=noise(vec2(t*0.1,tuv.x*tuv.y)*uNoiseScale);
  tuv.y*=1.0/ratio;
  tuv*=Rot(radians((degree-0.5)*uRotationAmount+180.0));
  tuv.y*=ratio;

  float ws=max(uWarpStrength,0.001);
  float amplitude=uWarpAmplitude/ws;
  float warpTime=t*uWarpSpeed;
  tuv.x+=sin(tuv.y*uWarpFrequency+warpTime)/amplitude;
  tuv.y+=sin(tuv.x*(uWarpFrequency*1.5)+warpTime)/(amplitude*0.5);

  float b=uColorBalance;
  float s=max(uBlendSoftness,0.0);
  float blendX=(tuv*Rot(radians(uBlendAngle))).x;
  vec3 layer1=mix(uColor3,uColor2,S(-0.3-b-s,0.2-b+s,blendX));
  vec3 layer2=mix(uColor2,uColor1,S(-0.3-b-s,0.2-b+s,blendX));
  vec3 col=mix(layer1,layer2,S(0.5-b+s,-0.3-b-s,tuv.y));

  vec2 grainUv=uv*max(uGrainScale,0.001);
  if(uGrainAnimated>0.5){grainUv+=vec2(iTime*0.05);}
  float grain=fract(sin(dot(grainUv,vec2(12.9898,78.233)))*43758.5453);
  col+=(grain-0.5)*uGrainAmount;

  col=(col-0.5)*uContrast+0.5;
  float luma=dot(col,vec3(0.2126,0.7152,0.0722));
  col=mix(vec3(luma),col,uSaturation);
  col=pow(max(col,0.0),vec3(1.0/max(uGamma,0.001)));
  o=vec4(clamp(col,0.0,1.0),1.0);
}
void main(){
  vec4 o=vec4(0.0);
  mainImage(o,gl_FragCoord.xy);
  fragColor=o;
}
`;

const ctxMap = new WeakMap<HTMLElement, { program: Program }>();

function Grainient({
  className = "",
  color1 = "#461301",
  color2 = "#000000",
  color3 = "#B497CF",
  timeSpeed = 0.22,
  colorBalance = 0,
  warpStrength = 0.8,
  warpFrequency = 4.8,
  warpSpeed = 1.25,
  warpAmplitude = 58,
  blendAngle = 0,
  blendSoftness = 0.06,
  rotationAmount = 430,
  noiseScale = 1.8,
  grainAmount = 0.08,
  grainScale = 2,
  grainAnimated = false,
  contrast = 1.4,
  gamma = 1,
  saturation = 1,
  centerX = 0,
  centerY = 0,
  zoom = 0.95
}: GrainientProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const renderer = new Renderer({
      webgl: 2,
      alpha: true,
      antialias: false,
      dpr: Math.min(window.devicePixelRatio || 1, 1.25)
    });
    const gl = renderer.gl;
    const canvas = gl.canvas as HTMLCanvasElement;
    canvas.setAttribute("aria-hidden", "true");
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    container.appendChild(canvas);

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new Float32Array([1, 1]) },
        uTimeSpeed: { value: timeSpeed },
        uColorBalance: { value: colorBalance },
        uWarpStrength: { value: warpStrength },
        uWarpFrequency: { value: warpFrequency },
        uWarpSpeed: { value: warpSpeed },
        uWarpAmplitude: { value: warpAmplitude },
        uBlendAngle: { value: blendAngle },
        uBlendSoftness: { value: blendSoftness },
        uRotationAmount: { value: rotationAmount },
        uNoiseScale: { value: noiseScale },
        uGrainAmount: { value: grainAmount },
        uGrainScale: { value: grainScale },
        uGrainAnimated: { value: grainAnimated ? 1 : 0 },
        uContrast: { value: contrast },
        uGamma: { value: gamma },
        uSaturation: { value: saturation },
        uCenterOffset: { value: new Float32Array([centerX, centerY]) },
        uZoom: { value: zoom },
        uColor1: { value: new Float32Array(hexToRgb(color1)) },
        uColor2: { value: new Float32Array(hexToRgb(color2)) },
        uColor3: { value: new Float32Array(hexToRgb(color3)) }
      }
    });
    const mesh = new Mesh(gl, { geometry, program });
    ctxMap.set(container, { program });

    const renderOnce = () => renderer.render({ scene: mesh });
    const setSize = () => {
      const rect = container.getBoundingClientRect();
      renderer.setSize(Math.max(1, Math.floor(rect.width)), Math.max(1, Math.floor(rect.height)));
      const resolution = program.uniforms.iResolution.value as Float32Array;
      resolution[0] = gl.drawingBufferWidth;
      resolution[1] = gl.drawingBufferHeight;
      renderOnce();
    };

    const resizeObserver = new ResizeObserver(setSize);
    resizeObserver.observe(container);
    setSize();

    let raf = 0;
    let elementVisible = true;
    let pageVisible = !document.hidden;
    const startedAt = performance.now();
    const loop = (time: number) => {
      program.uniforms.iTime.value = (time - startedAt) * 0.001;
      renderOnce();
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (elementVisible && pageVisible && raf === 0) raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      if (raf !== 0) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        elementVisible = entry.isIntersecting;
        elementVisible ? start() : stop();
      },
      { threshold: 0 }
    );
    const onVisibility = () => {
      pageVisible = !document.hidden;
      pageVisible ? start() : stop();
    };
    visibilityObserver.observe(container);
    document.addEventListener("visibilitychange", onVisibility);
    start();

    return () => {
      stop();
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      ctxMap.delete(container);
      renderer.gl.getExtension("WEBGL_lose_context")?.loseContext();
      if (container.contains(canvas)) container.removeChild(canvas);
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const ctx = ctxMap.get(container);
    if (!ctx) return;

    const { uniforms } = ctx.program;
    uniforms.uTimeSpeed.value = timeSpeed;
    uniforms.uColorBalance.value = colorBalance;
    uniforms.uWarpStrength.value = warpStrength;
    uniforms.uWarpFrequency.value = warpFrequency;
    uniforms.uWarpSpeed.value = warpSpeed;
    uniforms.uWarpAmplitude.value = warpAmplitude;
    uniforms.uBlendAngle.value = blendAngle;
    uniforms.uBlendSoftness.value = blendSoftness;
    uniforms.uRotationAmount.value = rotationAmount;
    uniforms.uNoiseScale.value = noiseScale;
    uniforms.uGrainAmount.value = grainAmount;
    uniforms.uGrainScale.value = grainScale;
    uniforms.uGrainAnimated.value = grainAnimated ? 1 : 0;
    uniforms.uContrast.value = contrast;
    uniforms.uGamma.value = gamma;
    uniforms.uSaturation.value = saturation;
    uniforms.uCenterOffset.value = new Float32Array([centerX, centerY]);
    uniforms.uZoom.value = zoom;
    uniforms.uColor1.value = new Float32Array(hexToRgb(color1));
    uniforms.uColor2.value = new Float32Array(hexToRgb(color2));
    uniforms.uColor3.value = new Float32Array(hexToRgb(color3));
  }, [
    timeSpeed,
    colorBalance,
    warpStrength,
    warpFrequency,
    warpSpeed,
    warpAmplitude,
    blendAngle,
    blendSoftness,
    rotationAmount,
    noiseScale,
    grainAmount,
    grainScale,
    grainAnimated,
    contrast,
    gamma,
    saturation,
    centerX,
    centerY,
    zoom,
    color1,
    color2,
    color3
  ]);

  return <div ref={containerRef} className={`grainient-container ${className}`.trim()} aria-hidden="true" />;
}

export default Grainient;
