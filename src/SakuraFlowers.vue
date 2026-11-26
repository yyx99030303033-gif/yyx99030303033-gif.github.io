<script setup>
import {ref,onMounted,onBeforeUnmount} from 'vue'
import * as THREE from 'three'
import {createHangingRope} from './hangingRope.js'
const host=ref(null)
let renderer,observer,frame,removePointerListeners
const resources=[],blooms=[]
onMounted(()=>{
 const scene=new THREE.Scene(),camera=new THREE.OrthographicCamera(-3.2,3.2,2.5,-2.5,.1,30)
 camera.position.set(0,0,10)
 renderer=new THREE.WebGLRenderer({alpha:true,antialias:true});renderer.setPixelRatio(Math.min(devicePixelRatio,1.75));renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.setClearColor(0,0);renderer.toneMapping=THREE.NeutralToneMapping;renderer.toneMappingExposure=1;renderer.shadowMap.enabled=false;renderer.shadowMap.type=THREE.PCFSoftShadowMap;host.value.appendChild(renderer.domElement)
 scene.add(new THREE.HemisphereLight(0xffffff,0xffedf5,1.65))
 const key=new THREE.DirectionalLight(0xfffaf7,1.5);key.position.set(-3,5,8);key.castShadow=true;key.shadow.mapSize.set(2048,2048);Object.assign(key.shadow.camera,{left:-4,right:4,top:4,bottom:-4,near:.1,far:20});key.shadow.bias=-.0002;key.shadow.normalBias=.009;key.shadow.radius=3;scene.add(key)
 const fill=new THREE.DirectionalLight(0xffe5f1,1.05);fill.position.set(3,0,5);scene.add(fill)
 const rimLight=new THREE.DirectionalLight(0xfff4fb,1.2);rimLight.position.set(2,3,-3);scene.add(rimLight)
 // Dense, closed petal surface: broad rounded lobe, tip notch, bowl and curled lip.
 const vertices=[],indices=[],nu=26,nv=36,stride=nu+1,layer=(nu+1)*(nv+1)
 for(let side=0;side<2;side++)for(let j=0;j<=nv;j++)for(let i=0;i<=nu;i++){
  const t=j/nv,u=i/nu*2-1
  const width=.245*Math.pow(Math.sin(Math.PI*t),.76)+.008
  const x=u*width,y=.64*t-.025*Math.exp(-u*u*30)*Math.pow(t,18)
  const bowl=.21*t*t-.045*Math.sin(Math.PI*t),rim=.075*Math.pow(Math.abs(u),3)*Math.sin(Math.PI*t)
  vertices.push(x,y,bowl+rim+(side===0?.009:-.009))
 }
 for(let side=0;side<2;side++)for(let j=0;j<nv;j++)for(let i=0;i<nu;i++){const a=side*layer+j*stride+i,b=a+1,c=a+stride,d=c+1;if(side===0)indices.push(a,b,c,b,d,c);else indices.push(a,c,b,b,c,d)}
 const edge=[];for(let i=0;i<=nu;i++)edge.push(i);for(let j=1;j<=nv;j++)edge.push(j*stride+nu);for(let i=nu-1;i>=0;i--)edge.push(nv*stride+i);for(let j=nv-1;j>0;j--)edge.push(j*stride)
 for(let i=0;i<edge.length;i++){const a=edge[i],b=edge[(i+1)%edge.length];indices.push(a,a+layer,b,b,a+layer,b+layer)}
 const petalGeometry=new THREE.BufferGeometry();petalGeometry.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));petalGeometry.setIndex(indices);petalGeometry.computeVertexNormals();resources.push(petalGeometry)
 const palette=[0xfff7f3,0xffe5e9,0xf5c8d6,0xffedf0,0xf7d6de]
 const petals=palette.map(color=>new THREE.MeshPhysicalMaterial({color,side:THREE.DoubleSide,roughness:.58,metalness:0,clearcoat:.16,clearcoatRoughness:.55,emissive:color,emissiveIntensity:.12}));resources.push(...petals)
 const pollenGeometry=new THREE.SphereGeometry(.018,8,6),pollenMaterial=new THREE.MeshStandardMaterial({color:0xf0cd8c,roughness:.65}),heartGeometry=new THREE.SphereGeometry(.065,12,8),heartMaterial=new THREE.MeshStandardMaterial({color:0xe799bd,roughness:.6}),filamentMaterial=new THREE.LineBasicMaterial({color:0xc88fac,transparent:true,opacity:.85});resources.push(pollenGeometry,pollenMaterial,heartGeometry,heartMaterial,filamentMaterial)
 const branchMaterial=new THREE.MeshStandardMaterial({color:0xffedf6,roughness:.8,metalness:0});resources.push(branchMaterial)
 const branches=[]
 const flowers=[]
 // Independent hanging strands, like willow tendrils; no branching skeleton.
 const strands=[
  {x:-1.35,y:1.02,length:.91,width:.25},
  {x:-.47,y:1.83,length:1.58,width:.34},
  {x:.34,y:1.27,length:1.48,width:.30},
  {x:1.12,y:1.61,length:1.40,width:.32},
  {x:1.97,y:1.12,length:2.16,width:.32}
 ]
 strands.forEach((strand,branchIndex)=>{
  const anchor=new THREE.Vector3(strand.x,strand.y,-.14+branchIndex*.035),g=new THREE.Group();g.position.copy(anchor);scene.add(g)
  const rope=createHangingRope(strand.length),curve=new THREE.CatmullRomCurve3(rope.points)
  const count=36,geometry=new THREE.TubeGeometry(curve,count,.009,6,false),position=geometry.attributes.position,rest=position.array.slice(),weights=[]
  for(let row=0;row<=count;row++){const t=row/count,center=curve.getPointAt(t);for(let col=0;col<=6;col++){const k=row*7+col,taper=1-t*.68;position.setXYZ(k,center.x+(position.getX(k)-center.x)*taper,center.y+(position.getY(k)-center.y)*taper,center.z+(position.getZ(k)-center.z)*taper);weights[k]=t}}
  geometry.computeVertexNormals();resources.push(geometry);const stem=new THREE.Mesh(geometry,branchMaterial);g.add(stem)
  branches.push({group:g,anchor,geometry,curve,rope,count,length:strand.length})
  // Each flexible centerline carries a tapered, volumetric bunch.
  const rows=8+Math.floor(strand.length*3)
  for(let row=0;row<rows;row++){
   const t=.035+row/(rows-1)*.92
   const taper=Math.pow(1-t,.48),radius=strand.width*taper
   const number=row===rows-1?1:3
   for(let j=0;j<number;j++){
    const angle=j/number*Math.PI*2+row*2.399+branchIndex*.7
    const dx=Math.cos(angle)*radius,depth=Math.sin(angle)*radius
    const size=(.29+.045*Math.sin(row*3+j*5+branchIndex))*(.55+.45*taper)
    flowers.push([dx,-t*strand.length,depth+.15,size,angle*.25,branchIndex,t])
   }
  }
 })
 flowers.forEach(([x,y,z,scale,rotation,branchIndex,strandT],i)=>{
  const bloom=new THREE.Group();bloom.position.set(x,y,z);bloom.scale.setScalar(scale);bloom.rotation.set((i%5-2)*.25,(i%7-3)*.19,rotation);branches[branchIndex].group.add(bloom);blooms.push({group:bloom,branchIndex,strandT,z:rotation,rx:bloom.rotation.x,ry:bloom.rotation.y,base:bloom.position.clone(),clusterX:x,clusterDepth:z,offset:new THREE.Vector2(),velocity:new THREE.Vector2()})
  for(let p=0;p<5;p++){const petal=new THREE.Mesh(petalGeometry,petals[i%palette.length]);petal.rotation.z=p*Math.PI*2/5;petal.position.set(0,.008,p*.003);petal.rotation.x=.10+.07*Math.sin(p*2+i);petal.rotation.y=.09*Math.sin(p+i);petal.castShadow=false;petal.receiveShadow=false;petal.userData.restX=petal.rotation.x;petal.userData.restY=petal.rotation.y;petal.userData.isPetal=true;bloom.add(petal)}
  const heart=new THREE.Mesh(heartGeometry,heartMaterial);heart.scale.z=.45;heart.position.z=.065;bloom.add(heart)
  for(let j=0;j<18;j++){const a=j*Math.PI*2/18,r=.12+(j%3)*.025,end=new THREE.Vector3(Math.cos(a)*r,Math.sin(a)*r,.17+(j%4)*.012);const geo=new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0,0,.075),end]);resources.push(geo);bloom.add(new THREE.Line(geo,filamentMaterial));const pollen=new THREE.Mesh(pollenGeometry,pollenMaterial);pollen.position.copy(end);bloom.add(pollen)}
 })
 const budGeometry=new THREE.SphereGeometry(1,16,12);resources.push(budGeometry)
 const buds=branches.map((branch,i)=>{
  const group=new THREE.Group(),bud=new THREE.Mesh(budGeometry,petals[(i+1)%petals.length]);bud.scale.set(.045,.07,.043);group.add(bud);branch.group.add(group);return {group,branch}
 })
 observer=new ResizeObserver(([entry])=>{const {width,height}=entry.contentRect;if(!width||!height)return;renderer.setSize(width,height);const ratio=width/height;camera.left=-2.5*ratio;camera.right=2.5*ratio;camera.updateProjectionMatrix()});observer.observe(host.value)
 const interactionHost=host.value.parentElement
 const pointer=new THREE.Vector2(99,99),previousPointer=new THREE.Vector2(99,99),pointerSpeed=new THREE.Vector2(),unprojected=new THREE.Vector3()
 let hovering=false
 const move=e=>{
  const rect=host.value.getBoundingClientRect()
  unprojected.set((e.clientX-rect.left)/rect.width*2-1,-(e.clientY-rect.top)/rect.height*2+1,0).unproject(camera)
  pointer.set(unprojected.x,unprojected.y)
  if(hovering){
   pointerSpeed.subVectors(pointer,previousPointer).clampLength(0,.45)
   branches.forEach(branch=>branch.rope.brush(previousPointer,pointer,branch.anchor,.48))
  }
  previousPointer.copy(pointer);hovering=true
 }
 const leave=()=>{hovering=false;pointerSpeed.set(0,0);pointer.set(99,99)}
 interactionHost.addEventListener('pointermove',move);interactionHost.addEventListener('pointerleave',leave)
 removePointerListeners=()=>{interactionHost.removeEventListener('pointermove',move);interactionHost.removeEventListener('pointerleave',leave)}
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches
 let previousTime=0,accumulator=0
 const center=new THREE.Vector3(),tangent=new THREE.Vector3(),radial=new THREE.Vector3()
 const render=time=>{
  const elapsed=previousTime?Math.min((time-previousTime)/1000,.05):0;previousTime=time
  accumulator+=elapsed
  while(accumulator>=1/120){branches.forEach(branch=>branch.rope.step());accumulator-=1/120}
  branches.forEach(branch=>{
   const {curve,geometry,count}=branch,attribute=geometry.attributes.position,normal=geometry.attributes.normal
   // Rebuild the smooth tube around the simulated centerline, not a fixed sine curve.
   curve.needsUpdate=true;curve.updateArcLengths()
   const frames=curve.computeFrenetFrames(count,false)
   for(let row=0;row<=count;row++){
    const t=row/count;curve.getPointAt(t,center)
    const radius=.009*(1-t*.68)
    for(let col=0;col<=6;col++){
     const a=col/6*Math.PI*2,k=row*7+col
     radial.copy(frames.normals[row]).multiplyScalar(Math.cos(a)).addScaledVector(frames.binormals[row],Math.sin(a))
     attribute.setXYZ(k,center.x+radial.x*radius,center.y+radial.y*radius,center.z+radial.z*radius)
     normal.setXYZ(k,radial.x,radial.y,radial.z)
    }
   }
   attribute.needsUpdate=true;normal.needsUpdate=true
  })
  buds.forEach(({group,branch})=>{branch.curve.getPointAt(.995,center);group.position.copy(center)})
  blooms.forEach((flower,i)=>{
   const {group,z,rx,ry}=flower
   group.getWorldPosition(unprojected)
   const dx=unprojected.x-pointer.x,dy=unprojected.y-pointer.y,distance=Math.hypot(dx,dy),influence=hovering?Math.max(0,1-distance/.8):0
   const branch=branches[flower.branchIndex],t=flower.strandT
   branch.curve.getPointAt(t,center);branch.curve.getTangentAt(t,tangent)
   group.position.set(center.x+flower.clusterX,center.y,center.z+flower.clusterDepth)
   const bendAngle=Math.atan2(tangent.x,-tangent.y)
   group.rotation.z=z+bendAngle
   group.rotation.x=rx;group.rotation.y=ry
   group.children.forEach((petal,p)=>{
    if(!petal.userData.isPetal)return
    const ripple=reduced?0:Math.sin(time*.00125-i*.57-p*.9)*.012
    const brush=influence*Math.sin(time*.004-i*.45-p*.8)*.032
    petal.rotation.x=petal.userData.restX+ripple+brush
    petal.rotation.y=petal.userData.restY+Math.cos(time*.0011+i+p)*.008
   })
  })
  pointerSpeed.multiplyScalar(.86)
  renderer.render(scene,camera);frame=requestAnimationFrame(render)
 };frame=requestAnimationFrame(render)

})
onBeforeUnmount(()=>{cancelAnimationFrame(frame);observer?.disconnect();removePointerListeners?.();resources.forEach(r=>r.dispose());renderer?.dispose();renderer?.domElement.remove()})
</script>
<template><div ref="host" class="sakura-flowers" aria-hidden="true"></div></template>
<style scoped>.sakura-flowers{position:absolute;inset:-25% -14% -15%;z-index:4;pointer-events:none}.sakura-flowers :deep(canvas){display:block;width:100%;height:100%}</style>
