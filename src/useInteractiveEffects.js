import {onMounted,onBeforeUnmount} from 'vue'
export function useInteractiveEffects(){
 let observer,raf=0,last=null,activeButton=null,activeImage=null,media
 const timers=new Set(),listeners=[]
 const reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches
 const listen=(target,type,fn,options)=>{target.addEventListener(type,fn,options);listeners.push(()=>target.removeEventListener(type,fn,options))}
 const resetButton=()=>{if(activeButton){activeButton.style.removeProperty('translate');activeButton=null}}
 const resetImage=()=>{if(activeImage){activeImage.style.removeProperty('transform');activeImage.closest('.fan-stage')?.style.removeProperty('--light-opacity');activeImage=null}}
 const render=()=>{raf=0;if(!last||reduced())return;const e=last
  const b=e.target.closest('.design-entry,.game-play-link,.game-video-link,.design-action')
  if(b!==activeButton){resetButton();activeButton=b}
  if(b){const r=b.getBoundingClientRect();b.style.translate=`${(e.clientX-r.left-r.width/2)*.09}px ${(e.clientY-r.top-r.height/2)*.14}px`}
  const stage=e.target.closest('.fan-stage'),im=stage?.querySelector('.is-front img')
  if(im!==activeImage){resetImage();activeImage=im}
  if(stage&&im){const r=stage.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;im.style.transform=`perspective(900px) rotateX(${(y-.5)*-5}deg) rotateY(${(x-.5)*6}deg) scale(1.025)`;stage.style.setProperty('--spot-x',x*100+'%');stage.style.setProperty('--spot-y',y*100+'%');stage.style.setProperty('--light-opacity','1')}
 }
 onMounted(()=>{
  media=matchMedia('(hover: hover) and (pointer: fine)')
  listen(document,'pointermove',e=>{if(e.pointerType!=='mouse'||!media.matches)return;last=e;if(!raf)raf=requestAnimationFrame(render)},{passive:true})
  listen(document,'pointerout',e=>{if(!e.relatedTarget){resetImage();resetButton()}},{passive:true})
  listen(window,'scroll',()=>{resetImage();resetButton()},{passive:true})
  listen(document,'visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(raf);raf=0;resetImage();resetButton()}})
  listen(document,'click',e=>{
   if(reduced())return
   const b=e.target.closest('.design-entry,.game-play-link,.game-video-link,.design-action');if(!b)return
   const r=b.getBoundingClientRect(),wave=document.createElement('i');wave.className='click-bloom';wave.style.left=(e.detail?e.clientX-r.left:r.width/2)+'px';wave.style.top=(e.detail?e.clientY-r.top:r.height/2)+'px';wave.setAttribute('aria-hidden','true');b.append(wave)
   const id=setTimeout(()=>{wave.remove();timers.delete(id)},650);timers.add(id)
  })
  observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('chapter-lit');observer.unobserve(e.target)}})},{threshold:.08})
  document.querySelectorAll('#creative,#opc,#workflow,#player').forEach(el=>{el.classList.add('chapter-effect');observer.observe(el)})
  const focusObserver=new IntersectionObserver(entries=>entries.forEach(e=>e.target.classList.toggle('reading-focused',e.isIntersecting)),{rootMargin:'-18% 0px -22% 0px',threshold:0})
  document.querySelectorAll('.career-list p,.harness-detail-grid p,.player-experience-notes p').forEach(el=>{el.classList.add('reading-focus');focusObserver.observe(el)})
  listeners.push(()=>focusObserver.disconnect())
 })
 onBeforeUnmount(()=>{observer?.disconnect();listeners.forEach(fn=>fn());timers.forEach(clearTimeout);cancelAnimationFrame(raf);resetImage();resetButton()})
}
