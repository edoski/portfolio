"use client";

import { useRef, useEffect } from 'react';
import * as THREE from 'three';

const vertexShader = `
varying vec2 vUv;
uniform float uTime;
uniform float mouse;
uniform float uEnableWaves;

void main() {
    vUv = uv;
    float time = uTime * 5.;

    float waveFactor = uEnableWaves;

    vec3 transformed = position;

    transformed.x += sin(time + position.y) * 0.5 * waveFactor;
    transformed.y += cos(time + position.z) * 0.15 * waveFactor;
    transformed.z += sin(time + position.x) * waveFactor;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
}
`;

const fragmentShader = `
varying vec2 vUv;
uniform float mouse;
uniform float uTime;
uniform sampler2D uTexture;

void main() {
    float time = uTime;
    vec2 pos = vUv;

    float move = sin(time + mouse) * 0.01;
    float r = texture2D(uTexture, pos + cos(time * 2. - time + pos.x) * .01).r;
    float g = texture2D(uTexture, pos + tan(time * .5 + pos.x - time) * .01).g;
    float b = texture2D(uTexture, pos - cos(time * 2. + time + pos.y) * .01).b;
    float a = texture2D(uTexture, pos).a;
    gl_FragColor = vec4(r, g, b, a);
}
`;

function map(n: number, start: number, stop: number, start2: number, stop2: number) {
  return ((n - start) / (stop - start)) * (stop2 - start2) + start2;
}

function clamp(n: number, min: number, max: number) {
  return Math.min(Math.max(n, min), max);
}

const MAX_TILT_ROTATION = 0.5;
const HUE_ROTATION_MAX_DEGREES = 22;
const HUE_ROTATION_LERP_FACTOR = 0.08;
const HUE_ROTATION_Y_WEIGHT = 0.85;
const HUE_ROTATION_X_WEIGHT = -0.35;

interface AsciiFilterOptions {
  fontSize?: number;
  fontFamily?: string;
  charset?: string;
  invert?: boolean;
}

class AsciiFilter {
  renderer: THREE.WebGLRenderer;
  domElement: HTMLDivElement;
  pre: HTMLPreElement;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D | null;
  deg: number;
  invert: boolean;
  fontSize: number;
  fontFamily: string;
  charset: string;
  width: number = 0;
  height: number = 0;
  cols: number = 0;
  rows: number = 0;

  constructor(renderer: THREE.WebGLRenderer, { fontSize, fontFamily, charset, invert }: AsciiFilterOptions = {}) {
    this.renderer = renderer;
    this.domElement = document.createElement('div');
    this.domElement.style.position = 'absolute';
    this.domElement.style.top = '0';
    this.domElement.style.left = '0';
    this.domElement.style.width = '100%';
    this.domElement.style.height = '100%';

    this.pre = document.createElement('pre');
    this.domElement.appendChild(this.pre);

    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d', { willReadFrequently: true });
    this.domElement.appendChild(this.canvas);

    this.deg = 0;
    this.invert = invert ?? true;
    this.fontSize = fontSize ?? 12;
    this.fontFamily = fontFamily ?? "'Courier New', monospace";
    this.charset = charset ?? ' .\'`^",:;Il!i~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$';

    if (this.context) {
      this.context.imageSmoothingEnabled = false;
      this.context.imageSmoothingEnabled = false;
    }
  }

  setSize(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.renderer.setSize(width, height);
    this.reset();
  }

  reset() {
    if (this.context) {
      this.context.font = `${this.fontSize}px ${this.fontFamily}`;
      const charWidth = this.context.measureText('A').width;

      this.cols = Math.floor(this.width / (this.fontSize * (charWidth / this.fontSize)));
      this.rows = Math.floor(this.height / this.fontSize);

      this.canvas.width = this.cols;
      this.canvas.height = this.rows;
      this.pre.style.fontFamily = this.fontFamily;
      this.pre.style.fontSize = `${this.fontSize}px`;
      this.pre.style.margin = '0';
      this.pre.style.padding = '0';
      this.pre.style.lineHeight = '1em';
      this.pre.style.position = 'absolute';
      this.pre.style.left = '50%';
      this.pre.style.top = '50%';
      this.pre.style.transform = 'translate(-50%, -50%)';
      this.pre.style.zIndex = '9';
      this.pre.style.backgroundAttachment = 'fixed';
      this.pre.style.mixBlendMode = 'difference';
    }
  }

  render(scene: THREE.Scene, camera: THREE.Camera, hueRotation: number) {
    this.renderer.render(scene, camera);

    const w = this.canvas.width;
    const h = this.canvas.height;
    if (this.context) {
      this.context.clearRect(0, 0, w, h);
      if (this.context && w && h) {
        this.context.drawImage(this.renderer.domElement, 0, 0, w, h);
      }

      this.asciify(this.context, w, h);
      this.hue(hueRotation);
    }
  }

  hue(targetDeg: number) {
    this.deg += (targetDeg - this.deg) * HUE_ROTATION_LERP_FACTOR;
    this.domElement.style.filter = `hue-rotate(${this.deg.toFixed(1)}deg)`;
  }

  settleNeutralHue() {
    const isSettled = Math.abs(this.deg) < 0.1;

    if (isSettled) {
      this.deg = 0;
      this.domElement.style.filter = 'hue-rotate(0deg)';
      return true;
    }

    return false;
  }

  asciify(ctx: CanvasRenderingContext2D, w: number, h: number) {
    if (w && h) {
      const imgData = ctx.getImageData(0, 0, w, h).data;
      let str = '';
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const i = x * 4 + y * 4 * w;
          const [r, g, b, a] = [imgData[i], imgData[i + 1], imgData[i + 2], imgData[i + 3]];

          if (a === 0) {
            str += ' ';
            continue;
          }

          let gray = (0.3 * r + 0.6 * g + 0.1 * b) / 255;
          let idx = Math.floor((1 - gray) * (this.charset.length - 1));
          if (this.invert) idx = this.charset.length - idx - 1;
          str += this.charset[idx];
        }
        str += '\n';
      }
      this.pre.textContent = str;
    }
  }
}

interface CanvasTxtOptions {
  fontSize?: number;
  fontFamily?: string;
  color?: string;
}

class CanvasTxt {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D | null;
  txt: string;
  fontSize: number;
  fontFamily: string;
  color: string;
  font: string;

  constructor(txt: string, { fontSize = 200, fontFamily = 'Arial', color = '#fdf9f3' }: CanvasTxtOptions = {}) {
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d', { willReadFrequently: true });
    this.txt = txt;
    this.fontSize = fontSize;
    this.fontFamily = fontFamily;
    this.color = color;

    this.font = `600 ${this.fontSize}px ${this.fontFamily}`;
  }

  resize() {
    if (this.context) {
      this.context.font = this.font;
      const metrics = this.context.measureText(this.txt);

      const textWidth = Math.ceil(metrics.width) + 20;
      const textHeight = Math.ceil(metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent) + 20;

      this.canvas.width = textWidth;
      this.canvas.height = textHeight;
    }
  }

  render() {
    if (this.context) {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.context.fillStyle = this.color;
      this.context.font = this.font;

      const metrics = this.context.measureText(this.txt);
      const yPos = 10 + metrics.actualBoundingBoxAscent;

      this.context.fillText(this.txt, 10, yPos);
    }
  }

  get width() {
    return this.canvas.width;
  }

  get height() {
    return this.canvas.height;
  }

  get texture() {
    return this.canvas;
  }
}

interface CanvAsciiOptions {
  text: string;
  asciiFontSize: number;
  textFontSize: number;
  textColor: string;
  fontFamily: string;
  planeBaseHeight: number;
  enableWaves: boolean;
  introDurationMs: number;
  trackingSelector?: string;
}

class CanvAscii {
  textString: string;
  asciiFontSize: number;
  textFontSize: number;
  textColor: string;
  fontFamily: string;
  planeBaseHeight: number;
  container: HTMLElement;
  trackingElement: HTMLElement;
  trackingSelector?: string;
  width: number;
  height: number;
  trackingWidth: number;
  trackingHeight: number;
  enableWaves: boolean;
  introEndsAt: number;
  camera: THREE.PerspectiveCamera;
  scene: THREE.Scene;
  mouse: { x: number; y: number };
  isHovering: boolean;
  textCanvas!: CanvasTxt;
  texture!: THREE.CanvasTexture;
  geometry!: THREE.PlaneGeometry;
  material!: THREE.ShaderMaterial;
  mesh!: THREE.Mesh;
  renderer!: THREE.WebGLRenderer;
  filter!: AsciiFilter;
  center!: { x: number; y: number };
  animationFrameId: number | null = null;
  private isVisible: boolean = true;
  private shaderTime: number = 0;
  private animateFrame: () => void;

  constructor(
    { text, asciiFontSize, textFontSize, textColor, fontFamily, planeBaseHeight, enableWaves, introDurationMs, trackingSelector }: CanvAsciiOptions,
    containerElem: HTMLElement,
    width: number,
    height: number
  ) {
    this.textString = text;
    this.asciiFontSize = asciiFontSize;
    this.textFontSize = textFontSize;
    this.textColor = textColor;
    this.fontFamily = fontFamily;
    this.planeBaseHeight = planeBaseHeight;
    this.container = containerElem;
    this.trackingElement = containerElem;
    this.trackingSelector = trackingSelector;
    this.width = width;
    this.height = height;
    this.trackingWidth = width;
    this.trackingHeight = height;
    this.enableWaves = enableWaves;
    this.introEndsAt = performance.now() + introDurationMs;

    this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 1, 1000);
    this.camera.position.z = 30;

    this.scene = new THREE.Scene();
    this.mouse = { x: 0, y: 0 };
    this.isHovering = false;

    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.animateFrame = this.createAnimationFrame();

    this.setMesh();
    this.setRenderer();
  }

  setMesh() {
    this.textCanvas = new CanvasTxt(this.textString, {
      fontSize: this.textFontSize,
      fontFamily: this.fontFamily,
      color: this.textColor
    });
    this.textCanvas.resize();
    this.textCanvas.render();

    this.texture = new THREE.CanvasTexture(this.textCanvas.texture);
    this.texture.minFilter = THREE.NearestFilter;

    const textAspect = this.textCanvas.width / this.textCanvas.height;
    const baseH = this.planeBaseHeight;
    const planeW = baseH * textAspect;
    this.geometry = new THREE.PlaneGeometry(planeW, baseH, 36, 36);
    this.material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      uniforms: {
        uTime: { value: 0 },
        mouse: { value: 1.0 },
        uTexture: { value: this.texture },
        uEnableWaves: { value: this.enableWaves ? 1.0 : 0.0 }
      }
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
  }

  setRenderer() {
    this.renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    this.renderer.setPixelRatio(1);
    this.renderer.setClearColor(0x000000, 0);

    this.filter = new AsciiFilter(this.renderer, {
      fontFamily: this.fontFamily,
      fontSize: this.asciiFontSize,
      invert: true
    });

    this.container.appendChild(this.filter.domElement);
    this.setSize(this.width, this.height);

    this.trackingElement = this.trackingSelector
      ? this.container.closest(this.trackingSelector) as HTMLElement || this.container
      : this.container;
    this.setTrackingSize();

    this.trackingElement.addEventListener('mousemove', this.onMouseMove);
    this.trackingElement.addEventListener('touchmove', this.onMouseMove);
    this.trackingElement.addEventListener('mouseleave', this.onMouseLeave);
    this.trackingElement.addEventListener('touchend', this.onMouseLeave);
  }

  setSize(w: number, h: number) {
    this.width = w;
    this.height = h;

    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();

    this.filter.setSize(w, h);

    this.center = { x: w / 2, y: h / 2 };
    this.setTrackingSize();
    this.startAnimation();
  }

  setTrackingSize() {
    const bounds = this.trackingElement.getBoundingClientRect();
    this.trackingWidth = bounds.width || this.width;
    this.trackingHeight = bounds.height || this.height;
  }

  load() {
    this.startAnimation();
  }

  onMouseMove(evt: MouseEvent | TouchEvent) {
    const e = (evt as TouchEvent).touches ? (evt as TouchEvent).touches[0] : (evt as MouseEvent);
    const bounds = this.trackingElement.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;
    this.mouse = { x, y };
    this.isHovering = true;
    this.startAnimation();
  }

  onMouseLeave() {
    this.isHovering = false;
    this.startAnimation();
  }

  createAnimationFrame() {
    return () => {
      this.animationFrameId = null;

      if (!this.isVisible) return;

      const shouldContinue = this.render();

      if (shouldContinue) {
        this.startAnimation();
      }
    };
  }

  startAnimation() {
    if (!this.isVisible || this.animationFrameId !== null) return;

    this.animationFrameId = requestAnimationFrame(this.animateFrame);
  }

  pause() {
    this.isVisible = false;

    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  resume() {
    this.isVisible = true;
    this.startAnimation();
  }

  render() {
    const time = new Date().getTime() * 0.001;
    const isIntroActive = performance.now() < this.introEndsAt;
    const targetShaderTime = this.isHovering || isIntroActive ? Math.sin(time) : 0;

    this.shaderTime += (targetShaderTime - this.shaderTime) * (this.isHovering || isIntroActive ? 1 : 0.075);
    (this.mesh.material as THREE.ShaderMaterial).uniforms.uTime.value = this.shaderTime;

    const rotationSettled = this.updateRotation();
    const hueRotation = this.getHueRotation();

    this.filter.render(this.scene, this.camera, hueRotation);

    if (this.isHovering || isIntroActive || this.enableWaves) return true;

    const shaderSettled = Math.abs(this.shaderTime) < 0.001;

    if (shaderSettled) {
      this.shaderTime = 0;
      (this.mesh.material as THREE.ShaderMaterial).uniforms.uTime.value = 0;
    }

    return !(rotationSettled && shaderSettled && this.filter.settleNeutralHue());
  }

  getHueRotation() {
    const normalizedY = clamp(this.mesh.rotation.y / MAX_TILT_ROTATION, -1, 1);
    const normalizedX = clamp(this.mesh.rotation.x / MAX_TILT_ROTATION, -1, 1);
    const tiltMix = normalizedY * HUE_ROTATION_Y_WEIGHT + normalizedX * HUE_ROTATION_X_WEIGHT;

    return clamp(tiltMix, -1, 1) * HUE_ROTATION_MAX_DEGREES;
  }

  updateRotation() {
    const targetX = this.isHovering
      ? map(this.mouse.y, 0, this.trackingHeight, 0.5, -0.5)
      : 0;
    const targetY = this.isHovering
      ? map(this.mouse.x, 0, this.trackingWidth, -0.5, 0.5)
      : 0;

    // Use slower lerp when returning to neutral for smoother animation
    const lerpFactor = this.isHovering ? 0.05 : 0.025;

    this.mesh.rotation.x += (targetX - this.mesh.rotation.x) * lerpFactor;
    this.mesh.rotation.y += (targetY - this.mesh.rotation.y) * lerpFactor;

    const isSettled =
      Math.abs(targetX - this.mesh.rotation.x) < 0.001 &&
      Math.abs(targetY - this.mesh.rotation.y) < 0.001;

    if (!this.isHovering && isSettled) {
      this.mesh.rotation.x = 0;
      this.mesh.rotation.y = 0;
      return true;
    }

    return false;
  }

  clear() {
    this.scene.traverse(object => {
      const obj = object as unknown as THREE.Mesh;
      if (!obj.isMesh) return;
      [obj.material].flat().forEach(material => {
        material.dispose();
        Object.keys(material).forEach(key => {
          const matProp = material[key as keyof typeof material];
          if (matProp && typeof matProp === 'object' && 'dispose' in matProp && typeof matProp.dispose === 'function') {
            matProp.dispose();
          }
        });
      });
      obj.geometry.dispose();
    });
    this.scene.clear();
  }

  dispose() {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
    this.container.removeChild(this.filter.domElement);
    this.trackingElement.removeEventListener('mousemove', this.onMouseMove);
    this.trackingElement.removeEventListener('touchmove', this.onMouseMove);
    this.trackingElement.removeEventListener('mouseleave', this.onMouseLeave);
    this.trackingElement.removeEventListener('touchend', this.onMouseLeave);
    this.clear();
    this.renderer.dispose();
  }
}

interface ASCIITextProps {
  text?: string;
  asciiFontSize?: number;
  textFontSize?: number;
  textColor?: string;
  planeBaseHeight?: number;
  enableWaves?: boolean;
  introDurationMs?: number;
  trackingSelector?: string;
}

function getAsciiFontFamily() {
  return getComputedStyle(document.body)
    .getPropertyValue('--font-ibm-plex-mono')
    .trim() || 'IBM Plex Mono, Courier New, monospace';
}

async function loadAsciiFont(fontFamily: string, textFontSize: number) {
  if (!document.fonts?.load) return;

  try {
    await document.fonts.load(`600 ${textFontSize}px ${fontFamily}`);
  } catch {
    // Font loading failure falls back to the browser's available monospace face.
  }
}

export default function ASCIIText({
  text = 'David!',
  asciiFontSize = 8,
  textFontSize = 200,
  textColor = '#fdf9f3',
  planeBaseHeight = 8,
  enableWaves = true,
  introDurationMs = 1400,
  trackingSelector
}: ASCIITextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const asciiRef = useRef<CanvAscii | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const element = containerRef.current;
    let isInitialized = false;
    let isInitializing = false;
    let isDisposed = false;
    const fontFamily = getAsciiFontFamily();

    const initialize = async (width: number, height: number) => {
      if (isInitialized || isInitializing || width <= 0 || height <= 0) return;

      isInitializing = true;
      await loadAsciiFont(fontFamily, textFontSize);
      isInitializing = false;

      if (isDisposed || isInitialized) return;

      asciiRef.current = new CanvAscii(
        {
          text,
          asciiFontSize,
          textFontSize,
          textColor,
          fontFamily,
          planeBaseHeight,
          enableWaves,
          introDurationMs,
          trackingSelector
        },
        element,
        width,
        height
      );
      asciiRef.current.load();
      isInitialized = true;
    };

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        if (!isInitialized) {
          if (entry.isIntersecting && entry.boundingClientRect.width > 0 && entry.boundingClientRect.height > 0) {
            const { width: w, height: h } = entry.boundingClientRect;
            void initialize(w, h);
          }
        } else {
          if (entry.isIntersecting) {
            asciiRef.current?.resume();
          } else {
            asciiRef.current?.pause();
          }
        }
      },
      { threshold: 0.1 }
    );

    const { width, height } = element.getBoundingClientRect();

    if (width > 0 && height > 0) {
      void initialize(width, height);
    }

    visibilityObserver.observe(element);

    const ro = new ResizeObserver(entries => {
      if (!entries[0] || !asciiRef.current) return;
      const { width: w, height: h } = entries[0].contentRect;
      if (w > 0 && h > 0) {
        asciiRef.current.setSize(w, h);
      }
    });
    ro.observe(element);

    return () => {
      isDisposed = true;
      visibilityObserver.disconnect();
      ro.disconnect();
      if (asciiRef.current) {
        asciiRef.current.dispose();
      }
    };
  }, [text, asciiFontSize, textFontSize, textColor, planeBaseHeight, enableWaves, introDurationMs, trackingSelector]);

  return (
    <div
      ref={containerRef}
      className="ascii-text-container"
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%'
      }}
    >
    </div>
  );
}
