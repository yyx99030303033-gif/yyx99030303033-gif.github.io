<script setup>
import {ref,onMounted,onBeforeUnmount} from 'vue'
const props=defineProps({animated:{type:Boolean,default:true}})
const particles=ref(null)
let frame=0,resizeObserver,intersectionObserver,visible=true,reduced,ctx,width=0,height=0,last=0,points=[]
function paint(time=0){
 if(!ctx||!width||!height)return
 ctx.clearRect(0,0,width,height)
 for(const p of points){
  const t=time*.001,x=p.x*width+Math.sin(t*p.speed+p.phase)*p.drift,y=((p.y*height-t*p.rise)%(height+30)+height+30)%(height+30)-15
  const nearCopy=x>width*.52&&x<width*.94&&y>height*.1&&y<height*.94
  const alpha=(.28+.24*(.5+.5*Math.sin(t*p.twinkle+p.phase)))*(nearCopy?.16:1)
  ctx.fillStyle=`rgba(${p.color},${alpha})`;ctx.beginPath();ctx.arc(x,y,p.radius,0,Math.PI*2);ctx.fill()
  if(p.star&&!nearCopy){ctx.strokeStyle=`rgba(175,137,202,${alpha*.65})`;ctx.lineWidth=.65;ctx.beginPath();ctx.moveTo(x-3.5,y);ctx.lineTo(x+3.5,y);ctx.moveTo(x,y-3.5);ctx.lineTo(x,y+3.5);ctx.stroke()}
 }
}
function tick(time){frame=requestAnimationFrame(tick);if(!props.animated||!visible||document.hidden||time-last<40)return;last=time;paint(time)}
onMounted(()=>{
 ctx=particles.value.getContext('2d');reduced=matchMedia('(prefers-reduced-motion: reduce)')
 points=Array.from({length:48},(_,i)=>({x:Math.random(),y:Math.random(),radius:.7+Math.random()*1.4,phase:Math.random()*Math.PI*2,speed:.12+Math.random()*.16,drift:8+Math.random()*15,rise:1.5+Math.random()*3.5,twinkle:.4+Math.random()*.6,star:i%9===0,color:i%3===0?'202,169,223':'164,124,188'}))
 resizeObserver=new ResizeObserver(([entry])=>{width=entry.contentRect.width;height=entry.contentRect.height;const dpr=Math.min(devicePixelRatio||1,1.5);particles.value.width=Math.round(width*dpr);particles.value.height=Math.round(height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);paint()});resizeObserver.observe(particles.value)
 intersectionObserver=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting});intersectionObserver.observe(particles.value)
 if(!reduced.matches)frame=requestAnimationFrame(tick)
})
onBeforeUnmount(()=>{cancelAnimationFrame(frame);resizeObserver?.disconnect();intersectionObserver?.disconnect()})
</script>
<template>
 <div class="hero-atmosphere" aria-hidden="true">
  <canvas ref="particles" class="atmosphere-particles"></canvas>
  <div class="atmosphere-wash wash-lilac"></div><div class="atmosphere-wash wash-pearl"></div>
  <div class="atmosphere-grid"></div><div class="atmosphere-halo"><span></span><span></span><i></i></div><div class="atmosphere-prism"></div>
  <svg class="atmosphere-ribbons" viewBox="0 0 1600 800" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="hero-orbit-ink" x1="0" y1="1" x2="1" y2="0"><stop stop-color="#b68bd2" stop-opacity="0"/><stop offset=".3" stop-color="#b38aca" stop-opacity=".38"/><stop offset=".65" stop-color="#c3a3dc" stop-opacity=".15"/><stop offset="1" stop-color="#b48cd0" stop-opacity="0"/></linearGradient><linearGradient id="hero-ribbon-wash" x1="0" y1="1" x2="1" y2="0"><stop stop-color="#b589d6" stop-opacity=".19"/><stop offset=".55" stop-color="#d4b6e5" stop-opacity=".07"/><stop offset="1" stop-color="#e7d9f0" stop-opacity="0"/></linearGradient></defs>
   <path class="satin-ribbon" d="M-160 800C140 300 520 925 850 470S1320 20 1730 90L1780 160C1280 40 1150 360 900 590S290 430-100 920Z" fill="url(#hero-ribbon-wash)"/>
   <g fill="none" stroke="url(#hero-orbit-ink)" stroke-width="1"><path d="M-180 760C160 320 530 875 860 475S1340-20 1730 110"/><path d="M-160 790C190 340 530 900 885 495S1350 5 1750 140"/><path d="M-200 825C210 375 565 925 920 520S1370 35 1760 180"/></g>
   <path class="orbit-glint" d="M-180 760C160 320 530 875 860 475S1340-20 1730 110" fill="none" stroke="#fff" stroke-width="1.5" stroke-dasharray="45 1900"/>
  </svg>
  <div class="atmosphere-edge edge-top"></div><div class="atmosphere-edge edge-bottom"></div>
  <span class="atmosphere-spark spark-one">✧</span><span class="atmosphere-spark spark-two">✳</span><span class="atmosphere-spark spark-three">✧</span>
 </div>
</template>
<style scoped>
.hero-atmosphere{position:absolute;inset:0;z-index:-1;overflow:hidden;pointer-events:none;background:radial-gradient(ellipse at 5% 0%,#d8c3e72e,transparent 40%),radial-gradient(ellipse at 95% 95%,#dac8e83d,transparent 38%),#f3eff7}.atmosphere-wash{position:absolute;border-radius:50%;filter:blur(48px);will-change:transform;mix-blend-mode:multiply}.wash-lilac{width:75%;height:70%;left:-22%;bottom:-35%;background:conic-gradient(from 50deg,#e9d9f000,#c7a6df65,#d4bbe977,#e2d2ed00);animation:lilac-drift 23s ease-in-out infinite alternate}.wash-pearl{width:55%;height:60%;right:-28%;top:-30%;background:conic-gradient(from 180deg,#d3c3ea00,#c8b6e252,#dfc7e24d,#ebe0f000);animation:pearl-drift 27s ease-in-out infinite alternate}.atmosphere-grid{position:absolute;inset:0;background-image:radial-gradient(#9d78b44d .65px,transparent .8px);background-size:19px 19px;opacity:.3;mask-image:radial-gradient(ellipse at 6% 78%,#000 0,transparent 37%)}.atmosphere-ribbons{position:absolute;width:100%;height:100%;inset:0;opacity:.85}.satin-ribbon{transform-origin:center;animation:satin-breathe 17s ease-in-out infinite alternate}.orbit-glint{opacity:.5;animation:orbit-pass 17s linear infinite}.atmosphere-edge{position:absolute;pointer-events:none;border:1px solid #c8acdb28;border-radius:50%;transform:rotate(-22deg)}.edge-top{width:800px;height:340px;right:-450px;top:-210px}.edge-bottom{width:720px;height:290px;left:-480px;bottom:-170px}.atmosphere-spark{position:absolute;color:#b699c94f;line-height:1;font-weight:400;animation:star-breathe 7s ease-in-out infinite alternate}.spark-one{left:7%;top:23%;font-size:21px;animation-delay:-2s}.spark-two{left:45%;bottom:10%;font-size:15px;animation-delay:-4s}.spark-three{right:7%;top:15%;font-size:24px}@keyframes lilac-drift{to{transform:translate3d(8%,-12%,0) rotate(18deg) scale(1.12)}}@keyframes pearl-drift{to{transform:translate3d(-10%,15%,0) rotate(-20deg) scale(1.12)}}@keyframes satin-breathe{to{transform:translateY(14px) scaleY(1.035);opacity:.65}}@keyframes orbit-pass{0%{stroke-dashoffset:1950;opacity:0}15%,80%{opacity:.6}100%{stroke-dashoffset:-1950;opacity:0}}@keyframes star-breathe{to{opacity:.35;transform:rotate(15deg)}}@media(max-width:800px){.wash-lilac{width:110%;height:40%;bottom:38%;left:-50%;filter:blur(35px)}.wash-pearl{width:80%;height:30%;right:-50%;top:55%}.atmosphere-ribbons{opacity:.55}.atmosphere-grid{opacity:.2;mask-image:radial-gradient(ellipse at 0% 25%,#000,transparent 40%)}.spark-one{top:12%;left:9%;font-size:16px}.spark-two{bottom:9%;left:87%;font-size:13px}.spark-three{top:42%;right:9%;font-size:19px}}@media(prefers-reduced-motion:reduce){.atmosphere-wash,.satin-ribbon,.orbit-glint,.atmosphere-spark{animation:none;will-change:auto}.orbit-glint{display:none}}
.atmosphere-particles{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:1}
.wash-lilac{background:conic-gradient(from 50deg,#e9d9f000,#b68dd783,#c6a4e58f,#e2d2ed00);filter:blur(42px);bottom:-30%}.wash-pearl{background:conic-gradient(from 180deg,#d3c3ea00,#bca3dc73,#d2b0d96b,#ebe0f000)}.atmosphere-ribbons{opacity:1}.atmosphere-grid{opacity:.42}.atmosphere-halo{position:absolute;left:3%;top:8%;width:46%;height:77%;transform:rotate(-19deg);pointer-events:none}.atmosphere-halo>span{position:absolute;inset:0;border:1px solid #bf9bd44d;border-radius:50%;box-shadow:inset 1px 0 0 #fff8,0 0 24px #c8a3e71c;transform:scaleX(1.12) scaleY(.92)}.atmosphere-halo>span:nth-child(2){inset:8%;border-color:#c5a3d337;transform:scaleX(1.13);box-shadow:none}.atmosphere-halo>i{position:absolute;left:8%;top:25%;width:7px;height:7px;background:#ebdcf5;border:1px solid #c4a0d7;border-radius:50%;box-shadow:0 0 10px #c6a4dc70,0 0 23px #dac1eb50;animation:halo-drift 14s ease-in-out infinite alternate}.atmosphere-prism{position:absolute;left:-15%;bottom:-20%;width:78%;height:64%;transform:rotate(-26deg);background:linear-gradient(180deg,transparent 38%,#d5b7e52b 43%,#f8f0fc70 47%,#c29cdb33 49%,transparent 55%);filter:blur(2px);opacity:.8;pointer-events:none;animation:prism-breathe 13s ease-in-out infinite alternate}.spark-one{color:#b08bc76b}.spark-three{color:#b08bc76b}@keyframes halo-drift{to{transform:translate(15px,-12px);opacity:.45}}@keyframes prism-breathe{to{transform:rotate(-23deg) translateY(-12px);opacity:.45}}@media(max-width:800px){.atmosphere-halo{left:4%;top:8%;width:87%;height:36%;opacity:.7}.atmosphere-prism{left:-30%;bottom:40%;width:120%;height:45%}.wash-lilac{bottom:38%;filter:blur(35px)}.wash-pearl{opacity:.8}}@media(prefers-reduced-motion:reduce){.atmosphere-halo>i,.atmosphere-prism{animation:none}}
.atmosphere-wash,.wash-lilac,.wash-pearl{filter:none;mix-blend-mode:normal}.wash-lilac{background:radial-gradient(ellipse,#c4a0dd55 0%,#d2b6e53d 30%,#e4d3ef1c 53%,transparent 72%)}.wash-pearl{background:radial-gradient(ellipse,#c6b0dd3d,#dec4e42b 40%,transparent 72%)}.atmosphere-prism{filter:none}.satin-ribbon{animation:none}.atmosphere-halo>i{animation-duration:20s}.atmosphere-spark{animation-duration:10s}
</style>
