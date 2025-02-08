import p5 from "p5";

const ShaderSketch = (p) => {
  let myShader;

  p.preload = () => {
    myShader = new p5.Shader(p.renderer, vert, frag);
  };

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    p.noStroke();
  };

  p.draw = () => {
    p.background(0);
    myShader.setUniform('u_time', p.millis() / 1000.0);
    myShader.setUniform('u_mouse', [p.mouseX / p.width, 1.0 - p.mouseY / p.height]);

    p.shader(myShader);
    p.rect(0, 0, p.width, p.height);
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  const vert = `
    attribute vec3 aPosition; 
    attribute vec2 aTexCoord; 
    varying vec2 vTexCoord; 

    void main() {
      vTexCoord = aTexCoord; 
      vec4 positionVec4 = vec4(aPosition, 1.0); 
      positionVec4.xy = positionVec4.xy * 2.0 - 1.0; 
      gl_Position = positionVec4; 
    }
  `;

  const frag = `
    precision mediump float; 
    varying vec2 vTexCoord; 
    uniform vec2 u_mouse;
    uniform float u_time;

    float pi = 3.14159265358979;
    float t = u_time / 4.0;

    float rand(vec2 co) {
      return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
    }

    float noise(vec2 p) {
      vec2 ip = floor(p);
      vec2 u = fract(p);
      u = u * u * (3.0 - 2.0 * u);

      float res = mix(
        mix(rand(ip), rand(ip + vec2(1.0, 0.0)), u.x),
        mix(rand(ip + vec2(0.0, 1.0)), rand(ip + vec2(1.0, 1.0)), u.x), u.y);
      return res * res;
    }

    vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
      return a + b * cos(2.0 * pi * (c * t + d));
    }

    const mat2 mtx = mat2(0.80, 0.60, -0.60, 0.80);
    float fbm(vec2 p) {
      float f = 0.0;
      f += 0.500000 * noise(p + t);
      p = mtx * p * 2.02;
      f += u_mouse.x * noise(p);
      p = mtx * p * 2.01;
      f += 0.250000 * noise(p);
      p = mtx * p * 2.03;
      f += (1.0 - u_mouse.x) * noise(p);
      p = mtx * p * 2.01;
      f += 0.015625 * noise(p + sin(t));
      return f / 0.96875;
    }

    float pattern(vec2 p) {
      return fbm(p + fbm(p + t / 20.0 + fbm(p)));
    }

    void main() {
      vec2 coord = vTexCoord;
      float shade = pattern(coord);
      float xDif = pow(u_mouse.x - coord.x, 2.0);
      float yDif = pow(u_mouse.y - coord.y, 2.0);
      float mouseDist = clamp(pow(xDif + yDif, 0.5) * 1.0, 0.0, 1.0);

      vec3 col = palette((shade * 2.0) + u_mouse.x + t, vec3(2.0, 0.6 - mouseDist * 1.1, mouseDist / 2.0), vec3(0.7, 0.5, 0.5), vec3(2.0, 0.0, 0.0), vec3(0.5, 0.90, 0.25));

      vec4 color = vec4(shade * vec3(col) * (1.0 - mouseDist / 2.0), 1.0);
      color *= vec4(1.5 - mouseDist * 1.0, 1.5 - mouseDist * 1.9, 1.4 * (1.0 - mouseDist * 0.2), 1.0);

      gl_FragColor = color;
    }
  `;
};

export default ShaderSketch;