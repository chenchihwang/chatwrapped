import p5 from "p5";

const TooltipShader = (p) => {
  let myShader;

  p.preload = () => {
    myShader = p.loadShader(vert, frag);
  };

  p.setup = () => {
    p.createCanvas(250, 150, p.WEBGL);
    p.noStroke();
  };

  p.draw = () => {
    p.shader(myShader);
    myShader.setUniform("iResolution", [p.width, p.height]);
    myShader.setUniform("iTime", p.millis() / 1000.0);
    p.rect(0, 0, p.width, p.height);
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
    uniform vec2 iResolution;
    uniform float iTime;

    #define S(a,b,t) smoothstep(a,b,t)

    float N21 (vec2 p){
      float d = fract(sin(p.x*110.+(8.21-p.y)*331.)*1218.);
      return d;
    }

    float Noise2D(vec2 uv){
      vec2 st = fract(uv);
      vec2 id = floor(uv);
      st = st*st*(3.0-2.0*st);
      float c=mix(mix(N21(id),N21(id+vec2(1.0,0.0)),st.x),mix(N21(id+vec2(0.0,1.0)),N21(id+vec2(1.0,1.0)),st.x),st.y);
      return c;
    }

    float fbm (vec2 uv){
      float c=0.;
      c+=Noise2D(uv)/2.;
      c+=Noise2D(2.*uv)/4.;
      return c/(1.-1./16.);
    }

    vec3 fbm3(vec2 uv){
      vec3 color;
      float f1 = fbm(uv);
      color= mix(vec3(0.1,0.0,0.0),vec3(0.9,0.1,0.1),2.5*f1);

      float f2 = fbm(2.4*f1+uv+0.15*sin(iTime)*vec2(7.0,-8.0));
      color= mix(color,vec3(0.6,0.5,0.1),1.5*f2);
      float f3 = fbm(3.5*f2+uv-0.15*cos(1.5*iTime)*vec2(4.0,3.0));
      color= mix(color,vec3(0.1,0.35,0.45),f3);

      return color;
    }

    void main() {
      vec2 uv = vTexCoord * iResolution.xy / iResolution.x;
      vec3 c = fbm3(vec2(5.0,5.0)*uv+sin(0.3*iTime)*0.5);
      vec3 col = c;

      col.r *= .825;
      col.g *= .825;
      gl_FragColor = vec4(col * 2.5,1.0); 
    }
  `;
};

export default TooltipShader;
