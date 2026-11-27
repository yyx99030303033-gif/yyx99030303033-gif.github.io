import { onMounted, onBeforeUnmount } from 'vue'

// Viewport-triggered motion only: no persistent scroll loop or layout animation.
export function useEditorialMotion(){
 let observer,media
 const frames=new Set()
 const originals=[]
 const animateMetric=el=>{
  const node=[...el.childNodes].find(n=>n.nodeType===Node.TEXT_NODE&&/\d/.test(n.textContent))
  if(!node)return
  const final=node.textContent,target=Number(final.trim()),decimal=final.includes('.')?1:0
  if(!Number.isFinite(target))return
  originals.push(()=>node.textContent=final)
  const begin=performance.now()
  const draw=now=>{
   if(document.hidden){node.textContent=final;return}
   const p=Math.min(1,(now-begin)/1100)
   node.textContent=(target*(1-Math.pow(1-p,3))).toFixed(decimal)
   if(p<1){const id=requestAnimationFrame(t=>{frames.delete(id);draw(t)});frames.add(id)}
  }
  draw(begin)
 }
 onMounted(()=>{
  media=matchMedia('(prefers-reduced-motion: reduce)')
  if(media.matches)return
  document.querySelectorAll('.section-heading h2,.harness-system-heading h3').forEach(el=>{
   if(el.closest('#games')||el.textContent.length>70)return
   el.setAttribute('aria-label',el.textContent)
   let index=0
   const walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT),nodes=[]
   while(walker.nextNode())nodes.push(walker.currentNode)
   for(const text of nodes){
    const fragment=document.createDocumentFragment()
    for(const char of text.textContent){const span=document.createElement('span');span.className='kinetic-glyph';span.setAttribute('aria-hidden','true');span.style.setProperty('--glyph-delay',`${Math.min(index++*19,600)}ms`);span.textContent=char===' '?'\u00a0':char;fragment.append(span)}
    text.replaceWith(fragment)
   }
   el.classList.add('kinetic-heading')
  })
  const selectors='.kinetic-heading,.career-list li,.harness-detail-grid article,.industry-invitation,.player-experience-notes article,.impact-context,.opc-story,.orchestration-results'
  document.querySelectorAll(selectors).forEach(el=>{
   el.classList.add('editorial-stage')
   if(el.matches('.career-list li,.harness-detail-grid article'))el.style.setProperty('--stage-delay',`${[...el.parentElement.children].indexOf(el)%4*65}ms`)
  })
  observer=new IntersectionObserver(entries=>{
   for(const e of entries){
    if(!e.isIntersecting)continue
    e.target.classList.add('editorial-visible')
    if(e.target.matches('.orchestration-results'))e.target.querySelectorAll('strong').forEach(animateMetric)
    observer.unobserve(e.target)
   }
  },{threshold:.12,rootMargin:'0px 0px -20px 0px'})
  document.querySelectorAll(selectors).forEach(el=>observer.observe(el))
  media.addEventListener('change',reduced)
 })
 function reduced(){if(media.matches){observer?.disconnect();frames.forEach(cancelAnimationFrame);frames.clear();originals.forEach(fn=>fn());document.querySelectorAll('.editorial-stage').forEach(el=>el.classList.add('editorial-visible'))}}
 onBeforeUnmount(()=>{observer?.disconnect();frames.forEach(cancelAnimationFrame);originals.forEach(fn=>fn());media?.removeEventListener('change',reduced)})
}
