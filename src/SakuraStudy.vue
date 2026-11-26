<script setup>
import {ref,onMounted,onBeforeUnmount} from 'vue'
import * as T from 'three'
const host=ref(null),paused=ref(false)
let renderer,observer,frame,cleanup
const resources=[]
onMounted(()=>{
 const scene=new T.Scene(),camera=new T.PerspectiveCamera(33,1,.1,40);camera.position.set(0,0,8.8)
 renderer=new T.WebGLRenderer({alpha:true,antialias:true});renderer.setPixelRatio(Math.min(devicePixelRatio,1.7));renderer.setClearColor(0,0);renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.05;renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;host.value.appendChild(renderer.domElement)
 scene.add(new T.HemisphereLight(0xfff5f3,0xcfaeba,1.05))
 const key=new T.DirectionalLight(0xfff2e6,3);key.position.set(-3,4,6);key.castShadow=true;key.shadow.mapSize.set(2048,2048);Object.assign(key.shadow.camera,{left:-3,right:3,top:3,bottom:-3,near:.1,far:16});key.shadow.bias=-.0003;key.shadow.normalBias=.018;key.shadow.radius=3;scene.add(key)
 const fill=new T.DirectionalLight(0xffe6ef,.65);fill.position.set(3,0,4);scene.add(fill)
 const root=new T.Group();scene.add(root)
 // Closed, double-surface petal with a cupped center, curled rim and sakura notch.
 const vertices=[],indices=[],nu=22,nv=30,stride=nu+1,layer=(nu+1)*(nv+1)
 for(let side=0;side<2;side++)for(let j=0;j<=nv;j++)for(let i=0;i<=nu;i++){
  const t=j/nv,u=i/nu*2-1,w=.295*Math.pow(Math.sin(Math.PI*t),.64)+.008
  const x=u*w,y=.64*t-.052*Math.exp(-u*u*24)*Math.pow(t,12)
  const z=.15*t*t+.095*u*u*Math.sin(Math.PI*t)-.065*Math.sin(Math.PI*t)+(side===0?.009:-.009)
  vertices.push(x,y,z)
 }
 for(let side=0;side<2;side++)for(let j=0;j<nv;j++)for(let i=0;i<nu;i++){const a=side*layer+j*stride+i,b=a+1,c=a+stride,d=c+1;if(!side)indices.push(a,b,c,b,d,c);else indices.push(a,c,b,b,c,d)}
 const edge=[];for(let i=0;i<=nu;i++)edge.push(i);for(let j=1;j<=nv;j++)edge.push(j*stride+nu);for(let i=nu-1;i>=0;i--)edge.push(nv*stride+i);for(let j=nv-1;j>0;j--)edge.push(j*stride)
 for(let i=0;i<edge.length;i++){const a=edge[i],b=edge[(i+1)%edge.length];indices.push(a,a+layer,b,b,a+layer,b+layer)}
 const petalGeo=new T.BufferGeometry();petalGeo.setAttribute('position',new T.Float32BufferAttribute(vertices,3));petalGeo.setIndex(indices);petalGeo.computeVertexNormals();resources.push(petalGeo)
 const materials=[0xfff9f1,0xffe0e5,0xf6c6d4,0xffedf0].map(color=>new T.MeshPhysicalMaterial({color,roughness:.55,metalness:0,clearcoat:.12,clearcoatRoughness:.7,side:T.DoubleSide}));resources.push(...materials)
 const heartGeo=new T.SphereGeometry(.065,16,10),heartMat=new T.MeshStandardMaterial({color:0xdba0aa,roughness:.8}),pollenGeo=new T.SphereGeometry(.013,8,6),pollenMat=new T.MeshStandardMaterial({color:0xd2aa64,roughness:.65}),stemMat=new T.MeshStandardMaterial({color:0xe4adb5,roughness:.8});resources.push(heartGeo,heartMat,pollenGeo,pollenMat,stemMat)
 const flowers=[[-.38,.55,.38,1.1,.08,0],[.52,.25,.52,.96,-.18,1],[.18,-.65,.4,.82,.2,2],[-1,.1,-.1,.68,-.4,1],[.55,1,-.18,.65,.25,3],[1.12,.46,-.16,.64,.2,2],[-.6,-.65,-.18,.64,-.3,3],[.94,-.53,-.2,.57,.35,1],[-.94,.98,-.28,.5,-.25,2],[.54,-1.2,-.14,.42,.3,0],[-.04,1.25,-.32,.4,0,1]]
 const blooms=[]
 flowers.forEach(([x,y,z,size,rz,tone],i)=>{
  const g=new T.Group();g.position.set(x,y,z);g.rotation.set((i%3-1)*.18,(i%4-1.5)*.17,rz);g.scale.setScalar(size);root.add(g)
  const petalGroups=[]
  for(let p=0;p<5;p++){const pivot=new T.Group();pivot.rotation.z=p*Math.PI*2/5;const petal=new T.Mesh(petalGeo,materials[tone]);petal.position.set(0,.012,p*.006);petal.rotation.y=.075;petal.castShadow=true;petal.receiveShadow=true;pivot.add(petal);g.add(pivot);petalGroups.push(petal)}
  const heart=new T.Mesh(heartGeo,heartMat);heart.scale.z=.48;heart.position.z=.045;heart.castShadow=true;g.add(heart)
  for(let j=0;j<19;j++){const a=j/19*Math.PI*2,r=.095+(j%3)*.028,end=new T.Vector3(Math.cos(a)*r,Math.sin(a)*r,.13+(j%4)*.013),start=new T.Vector3(0,0,.05),delta=end.clone().sub(start);const geo=new T.CylinderGeometry(.0025,.0035,delta.length(),4);resources.push(geo);const stamen=new T.Mesh(geo,stemMat);stamen.position.copy(start).add(end).multiplyScalar(.5);stamen.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),delta.normalize());g.add(stamen);const pollen=new T.Mesh(pollenGeo,pollenMat);pollen.position.copy(end);g.add(pollen)}
  blooms.push({g,rx:g.rotation.x,ry:g.rotation.y,rz,petals:petalGroups})
 })
 const budGeo=new T.SphereGeometry(1,20,14);resources.push(budGeo)
 for(const [x,y,z,s] of [[-.85,1.32,-.1,.12],[1.25,.98,-.15,.14],[1.3,-.3,-.2,.1],[.88,-1.03,-.1,.11]]){const bud=new T.Mesh(budGeo,materials[2]);bud.position.set(x,y,z);bud.scale.set(s*.7,s,s*.72);bud.rotation.z=-.3;bud.castShadow=true;root.add(bud)}
 const groundGeo=new T.PlaneGeometry(8,8),groundMat=new T.ShadowMaterial({color:0x9b637e,opacity:.13});resources.push(groundGeo,groundMat);const ground=new T.Mesh(groundGeo,groundMat);ground.position.z=-.65;ground.receiveShadow=true;scene.add(ground)
 const falling=[];for(let i=0;i<12;i++){const petal=new T.Mesh(petalGeo,materials[i%4]);petal.scale.setScalar(.1+(i%3)*.025);scene.add(petal);falling.push(petal)}
 const pointer=new T.Vector2(),target=new T.Vector2();let impulse=0,elapsed=0,previous=0
 const move=e=>{const r=host.value.getBoundingClientRect();target.set((e.clientX-r.left)/r.width*2-1,1-(e.clientY-r.top)/r.height*2)},leave=()=>target.set(0,0),touch=()=>{impulse=1}
 host.value.addEventListener('pointermove',move);host.value.addEventListener('pointerleave',leave);host.value.addEventListener('pointerdown',touch)
 cleanup=()=>{host.value?.removeEventListener('pointermove',move);host.value?.removeEventListener('pointerleave',leave);host.value?.removeEventListener('pointerdown',touch)}
 observer=new ResizeObserver(([entry])=>{const {width,height}=entry.contentRect;if(!width||!height)return;renderer.setSize(width,height);camera.aspect=width/height;camera.position.z=camera.aspect<1?9.6:8.8;camera.updateProjectionMatrix()});observer.observe(host.value)
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches
 const render=time=>{const dt=Math.min((time-previous)/1000,.05);previous=time;if(!paused.value&&!reduced){elapsed+=dt;pointer.lerp(target,.045);impulse*=.95;root.rotation.y=pointer.x*.16;root.rotation.x=-pointer.y*.11;blooms.forEach(({g,rx,ry,rz,petals},i)=>{g.rotation.z=rz+Math.sin(elapsed*.85+i*.65)*.035+Math.sin(elapsed*7-i*.5)*impulse*.065;g.rotation.x=rx+Math.sin(elapsed*.65+i)*.035;g.rotation.y=ry+pointer.x*.05;petals.forEach((petal,p)=>petal.rotation.x=Math.sin(elapsed*.8+i+p)*.018)});falling.forEach((petal,i)=>{const t=(elapsed*.075+i/12)%1;petal.position.set(1.1+Math.sin(t*5+i)*.6-t*.9,2.4-t*5,.5+Math.cos(i)*.6);petal.rotation.set(t*7+i,t*5,t*9)})}renderer.render(scene,camera);frame=requestAnimationFrame(render)};frame=requestAnimationFrame(render)
})
onBeforeUnmount(()=>{cancelAnimationFrame(frame);observer?.disconnect();cleanup?.();resources.forEach(r=>r.dispose());renderer?.dispose();renderer?.domElement.remove()})
</script>
<template><main><header><a href="/folder-demo.html">← 文件夹预览</a><span>SAKURA / MATERIAL STUDY</span><button @click="paused=!paused">{{paused?'继续动态':'暂停动态'}}</button></header><section><div class="study-copy"><small>花簇独立预览 · 未替换文件夹</small><h1>白与粉之间，<br>让花有了层次。</h1><p>宽瓣、卷边、层叠与柔和阴影。</p><span>移动鼠标轻轻转向 · 点击花簇触发晃动</span></div><div ref="host" class="flower-stage" role="img" aria-label="可交互的白粉色立体樱花花簇"></div></section><footer>每朵统一配色 / 三层交叠 / 真实几何花瓣 / 动态飘落</footer></main></template>
<style>
*{box-sizing:border-box}body{margin:0;background:#eee4ec;color:#594454;font-family:Arial,'Microsoft YaHei',sans-serif}main{min-height:100svh;background:radial-gradient(ellipse at 68% 45%,#f6edf0,transparent 60%)}header{height:80px;padding:0 5%;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #c4a7ba40;font-size:12px}a{color:inherit;text-decoration:none}header span{font-size:9px;letter-spacing:3px;color:#ab889f}button{font:inherit;border:1px solid #c8a9bd;background:#fff3;color:#896578;padding:9px 16px;border-radius:25px;cursor:pointer}section{display:grid;grid-template-columns:1fr 1.5fr;min-height:calc(100svh - 130px);align-items:center;padding:0 5%}.study-copy{padding-left:5%}.study-copy small{font-size:11px;color:#b08ba2}.study-copy h1{font-family:Georgia,'Microsoft YaHei',serif;font-size:clamp(27px,3.2vw,48px);line-height:1.6;font-weight:400;letter-spacing:2px;margin:24px 0}.study-copy p{font-size:14px;color:#9a788d}.study-copy>span{font-size:10px;color:#b395a8;display:block;margin-top:25px}.flower-stage{height:min(760px,calc(100svh - 140px));min-height:380px;cursor:grab;touch-action:pan-y}.flower-stage:active{cursor:grabbing}.flower-stage canvas{display:block;width:100%;height:100%}footer{padding:15px 5%;font-size:9px;letter-spacing:2px;color:#b08fa4}@media(max-width:700px){header span{display:none}section{grid-template-columns:1fr;padding:25px 5% 0}.study-copy{padding-left:0;text-align:center}.study-copy h1{font-size:27px;line-height:1.4;margin:12px 0}.study-copy p{font-size:11px}.study-copy>span{margin-top:12px}.flower-stage{height:57svh;min-height:330px}.study-copy small{font-size:9px}footer{font-size:8px;letter-spacing:1px;text-align:center}}
</style>
