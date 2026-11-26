import { ref, onMounted, onBeforeUnmount } from 'vue'
export function usePortfolioMotion(){
 const ready=ref(false), typed=ref(''), progress=ref(0)
 const phrases=['AI Coding / 游戏原型','Three.js / 创意交互','Agentic Workflow / 研发交付']
 let timer,raf=0,observer, word=0,index=0,back=false,reduced=false
 const frames=new Set()
 const tick=()=>{const text=phrases[word];index+=back?-1:1;typed.value=text.slice(0,index);let delay=back?35:85;if(index===text.length){back=true;delay=1800}else if(index===0){back=false;word=(word+1)%phrases.length;delay=400}timer=setTimeout(tick,delay)}
 const update=()=>{raf=0;const max=document.documentElement.scrollHeight-innerHeight;progress.value=max>0?scrollY/max:0;document.querySelectorAll('.motion-statement').forEach(el=>{const r=el.getBoundingClientRect();const p=Math.max(0,Math.min(1,(innerHeight-r.top)/(innerHeight+r.height)));el.querySelectorAll('.statement-word').forEach((w,i)=>{const n=Math.max(0,Math.min(1,(p-.2-i*.075)*6));w.style.opacity=String(.13+n*.87);w.style.transform=`translateY(${(1-n)*20}px)`})})}
 const onScroll=()=>{if(!raf)raf=requestAnimationFrame(update)}
 const count=(el)=>{const target=Number(el.dataset.target),suffix=el.dataset.suffix||'';const begin=performance.now();const draw=now=>{const p=Math.min(1,(now-begin)/1400);el.textContent=Math.round(target*(1-Math.pow(1-p,3))).toLocaleString('en-US')+suffix;if(p<1){const id=requestAnimationFrame(t=>{frames.delete(id);draw(t)});frames.add(id)}};draw(begin)}
 onMounted(()=>{reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;typed.value=reduced?phrases[0]:'';if(!reduced)tick();observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(!e.isIntersecting)return;e.target.classList.add('motion-in');if(e.target.matches('[data-target]')&&!reduced)count(e.target);observer.unobserve(e.target)}),{threshold:.14});document.querySelectorAll('.hero-top,.hero-bottom,.section-heading,.project,.workflow-grid article,.opc-feature-grid article,.experience>div,.stack-grid article,.contact h2,.impact-grid strong').forEach((el,i)=>{if(el.matches('.impact-grid strong')){el.dataset.suffix=el.textContent.includes('+')?'+':'';el.dataset.target=el.textContent.replace(/[^0-9]/g,'')}else{el.classList.add('motion-reveal');el.style.setProperty('--entry-delay',`${el.classList.contains('project')?(i%3)*80:0}ms`)}observer.observe(el)});window.addEventListener('scroll',onScroll,{passive:true});update()})
 onBeforeUnmount(()=>{clearTimeout(timer);cancelAnimationFrame(raf);frames.forEach(cancelAnimationFrame);observer?.disconnect();window.removeEventListener('scroll',onScroll)})
 return {ready,typed,progress}
}
