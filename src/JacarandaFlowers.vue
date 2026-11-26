<script setup>
import {ref,onMounted,onBeforeUnmount} from 'vue'
import * as THREE from 'three'
const host=ref(null)
let renderer,scene,camera,observer,raf
const clusters=[],owned=[]
onMounted(()=>{
 scene=new THREE.Scene();camera=new THREE.OrthographicCamera(-3.5,3.5,2.8,-2.8,.1,40);camera.position.set(0,0,12)
 renderer=new THREE.WebGLRenderer({alpha:true,antialias:true});renderer.setPixelRatio(Math.min(devicePixelRatio,1.6));renderer.setClearColor(0,0);renderer.outputColorSpace=THREE.SRGBColorSpace;host.value.appendChild(renderer.domElement)
 scene.add(new THREE.HemisphereLight(0xf8eaff,0x65558d,2.5));const light=new THREE.DirectionalLight(0xfff5ff,3);light.position.set(-3,6,9);scene.add(light)
 // Adapted from the user's Sydney Jacaranda source: five-lobed trumpet flower,
 // spatial sprays and the original lavender palette. No tree project is bundled.
 const pos=[],uv=[],indices=[],rows=4,cols=10
 for(let j=0;j<=rows;j++)for(let i=0;i<=cols;i++){
  const v=j/rows,a=i/cols*Math.PI*2,r=.015+.034*v*v*(j===rows?1+.18*Math.cos(a*5):1)
  pos.push(Math.cos(a)*r,-v*.095+(j===rows?Math.cos(a*5)*.006:0),Math.sin(a)*r);uv.push(i/cols,v)
 }
 for(let j=0;j<rows;j++)for(let i=0;i<cols;i++){const a=j*(cols+1)+i;indices.push(a,a+cols+1,a+1,a+1,a+cols+1,a+cols+2)}
 const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));geometry.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));geometry.setIndex(indices);geometry.computeVertexNormals();owned.push(geometry)
 const material=new THREE.MeshStandardMaterial({color:0xffffff,roughness:.72,metalness:0,side:THREE.DoubleSide});owned.push(material)
 const palette=['#9b80ce','#7f60b4','#b59cdb','#a28acb','#c6afe3'].map(c=>new THREE.Color(c))
 let seed=41;const random=()=>{seed=(seed*16807)%2147483647;return(seed-1)/2147483646},range=(a,b)=>a+(b-a)*random()
 const dummy=new THREE.Object3D()
 const forms=[
  {x:-.78,y:1.46,z:-.08,sx:.57,sy:.24,sz:.28,n:600},
  {x:-.17,y:1.75,z:0,sx:.55,sy:.35,sz:.36,n:800},
  {x:.48,y:1.94,z:-.1,sx:.59,sy:.3,sz:.35,n:850},
  {x:1.02,y:1.67,z:.12,sx:.52,sy:.38,sz:.38,n:850},
  {x:1.43,y:1.3,z:.15,sx:.37,sy:.41,sz:.34,n:650},
  {x:1.53,y:.87,z:.12,sx:.25,sy:.27,sz:.24,n:320},
  {x:.28,y:1.29,z:.25,sx:.36,sy:.21,sz:.28,n:400}
 ]
 for(const [index,f] of forms.entries()){
  const group=new THREE.Group();group.position.set(f.x,f.y,f.z);scene.add(group);clusters.push(group)
  const mesh=new THREE.InstancedMesh(geometry,material,f.n);group.add(mesh)
  // Uneven sub-sprays create gaps, overlapping depth and an oblique botanical silhouette.
  const centers=Array.from({length:9},()=>new THREE.Vector3(range(-.7,.7)*f.sx,range(-.65,.65)*f.sy,range(-.65,.65)*f.sz))
  for(let i=0;i<f.n;i++){
   const center=centers[i%centers.length],az=random()*Math.PI*2,ny=range(-1,1),radial=Math.sqrt(1-ny*ny)*Math.cbrt(random())
   const x=center.x+Math.cos(az)*radial*f.sx*.46,y=center.y+ny*f.sy*.55,z=center.z+Math.sin(az)*radial*f.sz*.55
   const size=range(.72,1.15)
   dummy.position.set(x,y,z);dummy.rotation.set(range(-1.7,.9),random()*Math.PI*2,range(-1.2,1.2));dummy.scale.set(size,size*range(.9,1.15),size);dummy.updateMatrix();mesh.setMatrixAt(i,dummy.matrix)
   mesh.setColorAt(i,palette[y<-f.sy*.2?(random()<.6?1:0):y>f.sy*.25?(random()<.7?2:4):3])
  }
  mesh.instanceMatrix.needsUpdate=true;mesh.instanceColor.needsUpdate=true
 }
 const leafGeometry=new THREE.PlaneGeometry(.11,.035),leafMaterial=new THREE.MeshStandardMaterial({color:0x809478,roughness:.9,side:THREE.DoubleSide});owned.push(leafGeometry,leafMaterial)
 const leaves=new THREE.InstancedMesh(leafGeometry,leafMaterial,120);scene.add(leaves)
 for(let i=0;i<120;i++){
  const branch=Math.floor(i/20),j=Math.floor((i%20)/2),side=i%2?1:-1,t=j/10
  const x=-.9+branch*.47,y=1.85+Math.sin(branch*.8)*.3
  dummy.position.set(x+t*.3,y+t*.17+side*.045,-.22);dummy.rotation.set(range(-.5,.5),range(-.4,.4),side*.55);dummy.scale.set(1-t*.5,1-t*.25,1);dummy.updateMatrix();leaves.setMatrixAt(i,dummy.matrix)
 }
 leaves.instanceMatrix.needsUpdate=true
 observer=new ResizeObserver(([e])=>{const {width:w,height:h}=e.contentRect;if(!w||!h)return;renderer.setSize(w,h);const aspect=w/h;camera.left=-2.8*aspect;camera.right=2.8*aspect;camera.updateProjectionMatrix()});observer.observe(host.value)
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches
 const tick=t=>{clusters.forEach((g,i)=>{g.rotation.z=reduced?0:Math.sin(t*.00055+i*.7)*.025;g.rotation.y=reduced?0:Math.sin(t*.0004+i)*.06});renderer.render(scene,camera);raf=requestAnimationFrame(tick)};raf=requestAnimationFrame(tick)
})
onBeforeUnmount(()=>{cancelAnimationFrame(raf);observer?.disconnect();owned.forEach(x=>x.dispose());renderer?.dispose();renderer?.domElement.remove()})
</script>
<template><div ref="host" class="jacaranda-three" aria-hidden="true"></div></template>
<style scoped>.jacaranda-three{position:absolute;inset:-25% -12% -5%;z-index:4;pointer-events:none}.jacaranda-three :deep(canvas){display:block;width:100%;height:100%}</style>
