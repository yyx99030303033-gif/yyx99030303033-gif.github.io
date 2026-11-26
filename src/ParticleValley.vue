<script setup>
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import * as THREE from 'three'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'
const host = ref(null)
const props = defineProps({ disperse: Boolean, mode: { type: Number, default: 0 } })
let cleanup = () => {}
onMounted(() => {
  const el = host.value, parent = el.parentElement
  let renderer
  try { renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'high-performance' }) } catch { return }
  const mobile = matchMedia('(max-width: 700px)').matches
  const reduced = matchMedia('(prefers-reduced-motion: reduce)')
  renderer.setPixelRatio(Math.min(devicePixelRatio, mobile ? 1.25 : 1.5))
  renderer.setClearColor(0x050508,1)
  renderer.toneMapping=THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure=.85
  el.appendChild(renderer.domElement)
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(43,1,.1,100)
  camera.position.set(0,0,13.8)
  const sculpture = new THREE.Group()
  scene.add(sculpture)
  const count = mobile ? 14000 : 38000
  const sphere = new Float32Array(count*3), knot = new Float32Array(count*3), orbit = new Float32Array(count*3), seed = new Float32Array(count)
  // Each particle owns three procedural destinations; all morphing runs on the GPU.
  const curve = new THREE.CatmullRomCurve3(Array.from({length:241},(_,i)=>{
    const t=i/240*Math.PI*2, r=2.05+.76*Math.cos(3*t)
    return new THREE.Vector3(r*Math.cos(2*t),r*Math.sin(2*t),.95*Math.sin(3*t))
  }),true)
  const frames=curve.computeFrenetFrames(500,true)
  for(let i=0;i<count;i++){
    const u=Math.random(), v=Math.random()*Math.PI*2, z=1-2*u, r=Math.sqrt(1-z*z)
    sphere.set([r*Math.cos(v)*2.75,z*2.75,r*Math.sin(v)*2.75],i*3)
    const t=Math.random(), ix=Math.min(499,Math.floor(t*500)), p=curve.getPointAt(t), a=Math.random()*Math.PI*2, radius=.27+Math.random()*.25
    p.addScaledVector(frames.normals[ix],Math.cos(a)*radius).addScaledVector(frames.binormals[ix],Math.sin(a)*radius)
    knot.set([p.x,p.y,p.z],i*3)
    const theta=Math.random()*Math.PI*2, phi=Math.random()*Math.PI*2, rr=2.3+.42*Math.cos(phi)
    orbit.set([rr*Math.cos(theta),.42*Math.sin(phi),rr*Math.sin(theta)],i*3)
    seed[i]=Math.random()*100
  }
  const geometry=new THREE.BufferGeometry()
  geometry.setAttribute('position',new THREE.BufferAttribute(sphere,3))
  geometry.setAttribute('aKnot',new THREE.BufferAttribute(knot,3))
  geometry.setAttribute('aOrbit',new THREE.BufferAttribute(orbit,3))
  geometry.setAttribute('aSeed',new THREE.BufferAttribute(seed,1))
  const uniforms={uTime:{value:0},uMode:{value:0},uIntro:{value:reduced.matches?1:0},uBurst:{value:0},uScroll:{value:0},uRatio:{value:renderer.getPixelRatio()},uMouse:{value:new THREE.Vector2(9,9)},uHover:{value:0}}
  const material=new THREE.ShaderMaterial({uniforms,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,
    vertexShader:`attribute vec3 aKnot; attribute vec3 aOrbit; attribute float aSeed;
    uniform float uTime,uMode,uIntro,uBurst,uScroll,uRatio,uHover;uniform vec2 uMouse;
    varying vec3 vColor;varying float vAlpha;varying float vSeed;
    void main(){
      float t=uTime;vec3 p=mix(position,aKnot,clamp(uMode,0.,1.));p=mix(p,aOrbit,clamp(uMode-1.,0.,1.));
      float wave=sin(p.x*2.4+t*.8)*sin(p.y*2.3-t*.6)*sin(p.z*2.2+t*.4);
      vec3 dir=normalize(p+vec3(.0001));p+=dir*(wave*.22+sin(aSeed+t)*.035);
      float intro=1.-uIntro;
      p+=dir*(intro*(6.+mod(aSeed,5.))+uBurst*(2.+mod(aSeed,6.))+uHover*.18+uScroll*(3.+mod(aSeed,6.)));
      p.y+=sin(aSeed+t*.4)*uScroll;
      vec4 mv=modelViewMatrix*vec4(p,1.);vec4 clip=projectionMatrix*mv;
      vec2 delta=clip.xy/clip.w-uMouse;float force=exp(-dot(delta,delta)*13.);
      clip.xy+=delta*force*.35*clip.w;
      gl_Position=clip;
      float s=mod(aSeed,7.)<1.?3.9:1.55;
      gl_PointSize=clamp(s*uRatio*16./max(-mv.z,1.)*(1.+force*.8),1.,18.);
      vec3 gold=vec3(1.,.56,.08),violet=vec3(.48,.2,1.),ice=vec3(.75,.87,1.);
      float band=sin(p.y*2.3+p.x*1.2+t*.4+sin(p.z*2.))* .5+.5;
      vColor=mix(violet,gold,smoothstep(.35,.8,band));vColor=mix(vColor,ice,step(.88,fract(aSeed*.13)));
      vColor*=1.05+force*.35;
      vAlpha=(.10+.18*smoothstep(-2.8,2.8,p.z))*(1.-uScroll*.55)*uIntro;
      vSeed=aSeed;
    }`,
    fragmentShader:`varying vec3 vColor;varying float vAlpha;varying float vSeed;
    void main(){vec2 p=gl_PointCoord-.5;float r=length(p);float a=atan(p.y,p.x)+vSeed;
      float tri=cos(floor(.5+a/2.094395)*2.094395-a)*r;
      float shape=1.-smoothstep(.21,.27,tri);
      float outline=smoothstep(.12,.19,tri);
      float alpha=shape*mix(.32,1.,outline);
      if(mod(vSeed,7.)>1.)alpha=exp(-r*r*22.);
      if(alpha<.03)discard;gl_FragColor=vec4(vColor,alpha*vAlpha);
    }`})
  const points=new THREE.Points(geometry,material);points.frustumCulled=false;sculpture.add(points)
  const starsGeo=new THREE.BufferGeometry(),starsData=new Float32Array(650*3)
  for(let i=0;i<650;i++)starsData.set([(Math.random()-.5)*30,(Math.random()-.5)*20,-Math.random()*15-2],i*3)
  starsGeo.setAttribute('position',new THREE.BufferAttribute(starsData,3))
  const starsMat=new THREE.PointsMaterial({color:0xc2a7f5,size:.015,transparent:true,opacity:.5})
  scene.add(new THREE.Points(starsGeo,starsMat))
  let composer,bloom
  if(!mobile){composer=new EffectComposer(renderer);composer.addPass(new RenderPass(scene,camera));bloom=new UnrealBloomPass(new THREE.Vector2(1,1),.14,.25,1.2);composer.addPass(bloom);composer.addPass(new OutputPass())}
  let raf=0,time=0,last=0,active=true,inView=true,burst=0,scroll=0
  const mouse=new THREE.Vector2(9,9), rotation=new THREE.Vector2()
  const draw=stamp=>{
    raf=0;if(!active)return
    const dt=Math.min((stamp-last)/1000||0,.04);last=stamp
    if(!reduced.matches)time+=dt
    uniforms.uTime.value=time
    uniforms.uMode.value+=(props.mode-uniforms.uMode.value)*.035
    uniforms.uIntro.value+=(1-uniforms.uIntro.value)*(1.-Math.exp(-dt*2.8))
    uniforms.uBurst.value+=(burst-uniforms.uBurst.value)*(1.-Math.exp(-dt*11.));burst*=Math.exp(-dt*1.5)
    uniforms.uHover.value+=((props.disperse?1:0)-uniforms.uHover.value)*.05
    uniforms.uScroll.value+=(scroll-uniforms.uScroll.value)*.06
    uniforms.uMouse.value.lerp(mouse,.08)
    sculpture.rotation.y=reduced.matches?.4:time*.1+rotation.x*.3
    sculpture.rotation.x=.25+rotation.y*.18
    sculpture.rotation.z=Math.sin(time*.16)*.12
    if(composer)composer.render();else renderer.render(scene,camera)
    if(!reduced.matches)raf=requestAnimationFrame(draw)
  }
  const start=()=>{if(!raf&&active){last=performance.now();raf=requestAnimationFrame(draw)}}
  const sync=()=>{active=inView&&!document.hidden;if(active)start();else{cancelAnimationFrame(raf);raf=0}}
  const resize=()=>{const r=el.getBoundingClientRect();if(!r.width||!r.height)return;renderer.setSize(r.width,r.height,false);composer?.setSize(r.width,r.height);camera.aspect=r.width/r.height;camera.updateProjectionMatrix();const narrow=r.width<700;sculpture.position.set(narrow?0:3.05,narrow?-1.7:0,0);sculpture.scale.setScalar(narrow?.82:1);start()}
  const pointer=e=>{const r=el.getBoundingClientRect();mouse.set((e.clientX-r.left)/r.width*2-1,1-(e.clientY-r.top)/r.height*2);rotation.set(mouse.x,mouse.y)}
  const leave=()=>{mouse.set(9,9);rotation.set(0,0)}
  const click=e=>{if(e.target.closest('a,button'))return;burst=2.5;start()}
  const scrolling=()=>{const r=parent.getBoundingClientRect();scroll=Math.max(0,Math.min(1,-r.top/r.height));}
  const ro=new ResizeObserver(resize);ro.observe(el)
  const io=new IntersectionObserver(e=>{inView=e[0].isIntersecting;sync()});io.observe(el)
  parent.addEventListener('pointermove',pointer);parent.addEventListener('pointerleave',leave);parent.addEventListener('click',click)
  window.addEventListener('scroll',scrolling,{passive:true});document.addEventListener('visibilitychange',sync);reduced.addEventListener('change',start)
  const stopWatch=watch(()=>[props.mode,props.disperse],()=>{if(reduced.matches){uniforms.uMode.value=props.mode;uniforms.uHover.value=props.disperse?1:0;start()}})
  resize();start()
  cleanup=()=>{stopWatch();active=false;cancelAnimationFrame(raf);ro.disconnect();io.disconnect();parent.removeEventListener('pointermove',pointer);parent.removeEventListener('pointerleave',leave);parent.removeEventListener('click',click);window.removeEventListener('scroll',scrolling);document.removeEventListener('visibilitychange',sync);reduced.removeEventListener('change',start);geometry.dispose();material.dispose();starsGeo.dispose();starsMat.dispose();bloom?.dispose();composer?.dispose();renderer.dispose();renderer.domElement.remove()}
})
onBeforeUnmount(()=>cleanup())
</script>
<template><div ref="host" class="particle-valley" aria-hidden="true"></div></template>
