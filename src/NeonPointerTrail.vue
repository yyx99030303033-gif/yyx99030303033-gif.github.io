<script setup>
import {ref,onMounted,onBeforeUnmount} from 'vue'
const canvas=ref(null)
let ctx,raf=0,last=0,dpr=1,disposed=false
let points=[],pointer=null
let fine,motion
const life=560
const allowed=()=>fine?.matches&&!motion?.matches&&!document.hidden
function resize(){dpr=Math.min(devicePixelRatio||1,1.5);const c=canvas.value;if(!c)return;c.width=Math.round(innerWidth*dpr);c.height=Math.round(innerHeight*dpr);ctx=c.getContext('2d');ctx.setTransform(dpr,0,0,dpr,0,0)}
function clear(){points=[];pointer=null;cancelAnimationFrame(raf);raf=0;last=0;ctx?.clearRect(0,0,innerWidth,innerHeight)}
function move(e){if(e.pointerType!=='mouse'||!allowed())return;pointer={x:e.clientX,y:e.clientY,t:performance.now()};if(!raf)raf=requestAnimationFrame(draw)}
function draw(now){raf=0;if(disposed||!allowed()){clear();return}
 if(now-last<16){raf=requestAnimationFrame(draw);return}last=now
 if(pointer&&now-pointer.t<life){
  const tail=points.at(-1)
  if(!tail)points.push({...pointer})
  else{const distance=Math.hypot(tail.x-pointer.x,tail.y-pointer.y)
   if(distance>.2){const steps=Math.min(160,Math.max(1,Math.ceil(distance/3)));for(let i=1;i<=steps;i++){const f=i/steps;points.push({x:tail.x+(pointer.x-tail.x)*f,y:tail.y+(pointer.y-tail.y)*f,t:tail.t+(pointer.t-tail.t)*f})}}
  }
  if(points.length>220)points.splice(0,points.length-220)
 }

 points=points.filter(p=>now-p.t<life)
 ctx.clearRect(0,0,innerWidth,innerHeight)
 if(points.length>1){
  const head=points.at(-1),tail=points[0],fade=Math.max(0,1-(now-head.t)/life)
  ctx.lineCap='round';ctx.lineJoin='round'
  const path=()=>{
   ctx.beginPath();ctx.moveTo(tail.x,tail.y)
   for(let i=1;i<points.length-1;i++){const p=points[i],next=points[i+1];ctx.quadraticCurveTo(p.x,p.y,(p.x+next.x)/2,(p.y+next.y)/2)}
   ctx.lineTo(head.x,head.y)
  }
  // Continuous strokes avoid overlapping round caps at sampling points.
  const gradient=ctx.createLinearGradient(tail.x,tail.y,head.x+.01,head.y+.01)
  gradient.addColorStop(0,'rgba(227,201,250,0)');gradient.addColorStop(.18,'rgba(224,192,248,.16)');gradient.addColorStop(.46,'rgba(220,177,248,.72)');gradient.addColorStop(.72,'rgba(235,206,255,.9)');gradient.addColorStop(.9,'rgba(255,224,248,.96)');gradient.addColorStop(1,'rgba(252,244,255,1)')
  ctx.globalAlpha=fade*fade
  ctx.globalCompositeOperation='source-over'
  ctx.strokeStyle=gradient
  ctx.shadowColor='#ddbcfa';ctx.shadowBlur=16;ctx.lineWidth=4;path();ctx.stroke()
  ctx.shadowColor='#f1d8ff';ctx.shadowBlur=8;ctx.lineWidth=2.5;path();ctx.stroke()
  ctx.shadowBlur=0
  const metal=ctx.createLinearGradient(tail.x,tail.y,head.x+.01,head.y+.01)
  metal.addColorStop(0,'rgba(239,217,255,0)');metal.addColorStop(.35,'rgba(236,204,255,.15)');metal.addColorStop(.58,'rgba(255,248,255,.95)');metal.addColorStop(.78,'rgba(227,191,247,.75)');metal.addColorStop(.94,'rgba(255,255,255,1)');metal.addColorStop(1,'rgba(236,225,255,.85)')
  ctx.strokeStyle=metal;ctx.lineWidth=1.15;path();ctx.stroke()
  ctx.globalAlpha=1
 }

 if(points.length)raf=requestAnimationFrame(draw)
}
function out(e){if(!e.relatedTarget)clear()}
onMounted(()=>{fine=matchMedia('(hover: hover) and (pointer: fine)');motion=matchMedia('(prefers-reduced-motion: reduce)');resize();window.addEventListener('resize',resize,{passive:true});window.addEventListener('pointermove',move,{passive:true});document.addEventListener('pointerout',out,{passive:true});document.addEventListener('visibilitychange',clear);window.addEventListener('blur',clear);fine.addEventListener('change',clear);motion.addEventListener('change',clear)})
onBeforeUnmount(()=>{disposed=true;clear();window.removeEventListener('resize',resize);window.removeEventListener('pointermove',move);document.removeEventListener('pointerout',out);document.removeEventListener('visibilitychange',clear);window.removeEventListener('blur',clear);fine?.removeEventListener('change',clear);motion?.removeEventListener('change',clear)})
</script>
<template><canvas ref="canvas" class="neon-pointer-trail" aria-hidden="true"></canvas></template>
<style scoped>
.neon-pointer-trail{position:fixed;inset:0;width:100%;height:100%;z-index:20000;pointer-events:none;contain:strict}
@media(hover:none),(pointer:coarse),(prefers-reduced-motion:reduce){.neon-pointer-trail{display:none}}
</style>
