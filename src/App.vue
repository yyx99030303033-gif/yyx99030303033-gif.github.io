<script setup>
import { ref, h } from 'vue'
import FolderDemo from './FolderDemo.vue'
import BackToTop from './BackToTop.vue'
import { usePortfolioMotion } from './usePortfolioMotion'
import GameShelf from './GameShelf.vue'
import ProjectGallery from './ProjectGallery.vue'
import IndustrialReel from './IndustrialReel.vue'
import MiniatureShowcase from './MiniatureShowcase.vue'
import { profile, impact, games, creativeWorks, creatureWorks, workflow, industrialWorks } from './content'
function capabilityLight(event){if(event.pointerType!=='mouse')return;const r=event.currentTarget.getBoundingClientRect();event.currentTarget.style.setProperty('--light-x',`${event.clientX-r.left}px`);event.currentTarget.style.setProperty('--light-y',`${event.clientY-r.top}px`)}
const menuOpen = ref(false)
const creativeGallery=ref(null)
function selectArchiveWork(title){creativeGallery.value?.selectWork(title)}
const { ready, progress } = usePortfolioMotion()
const nav = [['about','关于我'],['work','作品'],['opc','Agentic Workflow'],['contact','联系']]
const ProjectCard = (props) => h('article', { id: games.includes(props.item)?`game-${games.indexOf(props.item)}`:undefined, class: 'project', onPointermove: e => { if(e.pointerType !== 'mouse' || matchMedia('(prefers-reduced-motion: reduce)').matches) return; const r=e.currentTarget.getBoundingClientRect(); const x=(e.clientX-r.left)/r.width, y=(e.clientY-r.top)/r.height; e.currentTarget.style.setProperty('--mx',x*100+'%'); e.currentTarget.style.setProperty('--my',y*100+'%'); e.currentTarget.style.setProperty('--rx',(y-.5)*-5+'deg'); e.currentTarget.style.setProperty('--ry',(x-.5)*7+'deg') }, onPointerleave: e => { e.currentTarget.style.setProperty('--rx','0deg'); e.currentTarget.style.setProperty('--ry','0deg') } }, [
  props.item.gallery?.length ? h(ProjectGallery, { images: props.item.gallery, title: props.item.title }) : h('div', { class: ['cover', props.item.visual] }, props.item.cover ? [h('img', { src: props.item.cover, alt: props.item.title, loading: 'lazy' })] : [
    h('span', { class: 'cover-note' }, '封面占位 · 非作品画面'),
    h('div', { class: 'art', 'aria-hidden': 'true' }, [h('i'), h('i'), h('i'), h('b', {}, props.item.visual === 'garden' ? 'WIND & FLOWERS' : props.item.visual === 'pixel' ? '+ PLAY' : props.item.visual === 'factory' ? 'AGENT / WORKFLOW' : props.item.visual === 'three' ? '3D' : props.item.visual === 'city' ? 'NIGHT SHIFT' : props.item.visual === 'anime' ? 'NEW WORLD' : 'SMALL WORLDS')]),
  ]),
  h('div', { class: 'project-meta' }, props.item.type), h('div',{class:'game-title-row'},[h('h3', {}, props.item.title),(props.item.playUrl||props.item.videoUrl)?h('a',{class:'game-play-link',href:props.item.playUrl||props.item.videoUrl,target:'_blank',rel:'noopener noreferrer','aria-label':(props.item.playUrl?'在线试玩 ':'观看视频 ')+props.item.title},[h('span',{class:'play-triangle','aria-hidden':'true'},'▶'),props.item.playUrl?'在线试玩':'观看视频',h('span',{'aria-hidden':'true'},'↗')]):null,props.item.playUrl&&props.item.videoUrl?h('a',{class:'game-video-link',href:props.item.videoUrl,target:'_blank',rel:'noopener noreferrer','aria-label':'观看视频 '+props.item.title},[h('span',{class:'play-triangle','aria-hidden':'true'},'▶'),'观看视频',h('span',{'aria-hidden':'true'},'↗')]):null]),
  h('p', {}, props.item.description), h('div', { class: 'tags' }, props.item.tags.map(t => h('span', {}, t))),
  
])
</script>

<template>
  <BackToTop/>
  <div class="reading-progress" :style="{ transform: `scaleX(${progress})` }" aria-hidden="true"></div>
  <a class="skip" href="#main">跳转到内容</a>
  <header>
    <a class="wordmark hero-wordmark" href="#" aria-label="GO BOLD. BUILD FUN."><span>GO BOLD.</span><span class="brand-star" aria-hidden="true">✳</span><span>BUILD FUN.</span></a>
    <button class="menu-toggle" @click="menuOpen = !menuOpen" :aria-expanded="menuOpen" aria-controls="navigation">{{ menuOpen ? '关闭' : '菜单' }}</button>
    <nav id="navigation" :class="{ open: menuOpen }" aria-label="主导航"><a v-for="[id,label] in nav" :key="id" :href="`#${id}`" @click="menuOpen = false">{{ label }}</a></nav>
  </header>
  <main id="main">
    <FolderDemo embedded @done="ready=true" @select-work="selectArchiveWork"/>
    <div class="ticker motion-marquee archive-home-ticker" aria-hidden="true"><div v-for="n in 2" :key="n">AI CODING <span>✳</span> GAME PROTOTYPING <span>✳</span> THREE.JS <span>✳</span> AGENTIC WORKFLOW <span>✳</span></div></div>
    <section id="experience" class="section experience career-section"><div class="section-label">EXPERIENCE / 工作经历</div><div><div class="career-heading-row"><h2>软件开发与项目交付</h2><p class="career-period">2021.03 — 2026</p></div><p class="lead">拥有 <strong>5 年以上软件开发与项目交付经验</strong>，长期参与大型国际机场数字化建设、智慧能源管理及 IoT 数据中台建设，具备从业务需求分析、技术方案设计、独立研发到项目交付的全流程实践经验。</p><ul class="career-list">
      <li><h3>B 端项目开发与交付</h3><p>负责<strong>北京大兴国际机场、昆明长水国际机场</strong>等大型机场的 <strong>B 端业务项目开发与交付</strong>，项目涵盖<strong>小程序、Web 管理端及后端系统</strong>，参与从需求梳理、系统建设到联调上线的完整交付过程；独立完成员工服务类小程序从 0 到 1 的开发。另参与<strong>中国民航机场百科</strong> C 端小程序建设，相关产品累计用户达 <mark>35.86 万</mark>。</p></li>
      <li><h3>大型数字化项目建设</h3><p>参与北京住总<strong>全国首家零碳办公楼智慧能源管理系统</strong>及 <strong>IoT 数据中台</strong>建设，涉及能源监测、设备管理、数字孪生及多层级数据可视化，推动系统在大型楼宇、园区及工业场景落地。</p></li>
      <li><h3>客户沟通与项目统筹</h3><p><strong>直接对接机场及集团客户</strong>，负责需求梳理、方案研讨、项目推进及驻场交付，协调产品、设计与研发团队，多次面向<strong>机场及集团管理层</strong>进行项目汇报、系统演示及使用培训。</p></li>
      <li><h3>工程建设与效率优化</h3><p>负责复杂业务系统开发、技术难点攻克及工程化建设，推动<strong>公共组件标准化与跨项目能力复用</strong>，将新功能交付周期由 <mark>5 天缩短至 3 天</mark>。</p></li>
      <li><h3>AI 转型与研发提效</h3><p>推动 <strong>AI Coding 与 Agentic Workflow</strong> 在实际业务中的应用，主导搭建 <strong>多 Agent 协作任务编排器</strong>，形成覆盖需求分析、架构设计、开发执行、质量检查与验收的自动化工作流，并投入<strong>公司数字孪生类项目使用</strong>，实现<mark>研发效率提升约 50%</mark>，减少对外包制作的依赖，<mark>预计降低相关外包开发支出约 86.7%</mark>。</p></li>
    </ul></div></section>
    <section class="motion-statement compact-transition" aria-label="从想象到交付"><div><p class="section-label">FROM IDEAS TO EXPERIENCES</p><h2><span class="statement-word">把想象做成游戏，</span><span class="statement-word">把创意变成可交付的作品。</span></h2></div></section>
    <section id="work" class="section work-section">
      <div class="section-heading"><div><div class="section-label">CREATIVE IMPACT / 创作成果</div><h2>创作，遇见真实反馈。</h2></div></div><div class="impact-context"><span>小红书、抖音双平台</span><strong>约一个月内</strong></div>
      <div class="impact-grid"><div v-for="stat in impact" :key="stat.label"><strong>{{ stat.value }}</strong><span>{{ stat.label }}</span></div></div>
      <p class="lead">持续进行 AI 创意内容输出，关注视觉表达、用户兴趣及真实反馈，具备独立创作、内容传播与用户体验分析能力。</p>
      <div class="social-links"><a v-for="social in profile.socials" :key="social.label" :href="social.url" target="_blank" rel="noopener noreferrer"><span :class="['platform-logo', social.label === '小红书' ? 'xiaohongshu-logo' : 'douyin-logo']" aria-hidden="true"><template v-if="social.label === '小红书'">小红书</template><svg v-else viewBox="0 0 32 32"><path d="M19 5v15a5 5 0 1 1-4-4.9v4a1.5 1.5 0 1 0 1 1.4V5h3c.6 3.5 2.4 5.5 6 6v4c-2.5-.2-4.5-1.2-6-2.6" fill="currentColor"/></svg></span>{{ social.label }}<span class="social-hint">查看创作主页</span></a></div>
    </section>
    <section id="games" class="section games-section">
      <div class="section-heading"><div><div class="section-label">GAME DEMOS / 游戏 DEMO</div><h2>SMALL DEMOS<span class="orange">.</span> BIG IDEAS<span class="orange">.</span></h2></div><p>风格可以不同，<br>对“有趣”的好奇心不变。</p></div>
      <div class="grid games-grid"><ProjectCard v-for="item in games" :key="item.title" :item="item" /></div>
    </section>
    <section id="creative" class="section creative-section"><div class="section-heading"><div><div class="section-label">THREE.JS / 三维微缩景观</div><h2>小小场景，自成世界。</h2></div><p>构图 · 植物 · 光照 · 空间氛围</p></div><MiniatureShowcase ref="creativeGallery" :works="[...creativeWorks,...creatureWorks]" /></section>
    <section id="opc" class="section opc-section">
      <div class="section-heading"><div><div class="section-label">AGENTIC WORKFLOW</div><h2>多 Agent 编排，落到项目交付。</h2></div></div>
      <div class="opc-orchestration"><div class="opc-story"><span class="opc-kicker">我的贡献 / WORKFLOW ENGINEERING</span><h3>主导搭建多阶段任务编排器，<br>应用于公司工业数字孪生项目。</h3><p>将需求分析、架构设计、开发执行、自检与验收串联为协作流程，用于下方四类工业场景的三维搭建、设备动画与业务流程开发，减少对外包制作的依赖。</p><div class="orchestration-results"><div><strong>50<span>%</span></strong><h4>研发效率提升约</h4></div><div><strong>86.7<span>%</span></strong><h4>相关外包开发支出预计降低约</h4></div></div></div><div class="opc-route" aria-label="五阶段任务编排流程"><div v-for="(stage,i) in [{name:'需求分析',note:'梳理目标与业务约束'},{name:'架构设计',note:'拆解任务与实现路径'},{name:'开发执行',note:'协作完成场景与逻辑'},{name:'质量自检',note:'检查实现与任务交接'},{name:'交付验收',note:'核对结果与验收要求'}]" :key="stage.name" class="opc-route-step"><span>{{String(i+1).padStart(2,'0')}}</span><div><h4>{{stage.name}}</h4><p>{{stage.note}}</p></div><i aria-hidden="true">{{i===4?'✳':'↓'}}</i></div></div></div>
      <div class="industrial-heading orchestration-applications"><span class="application-connector" aria-hidden="true">↓</span><div><span>WORKFLOW IN PRACTICE / 应用成果</span><h3>工业数字孪生项目</h3></div><p>同一套编排流程，应用于四类工业场景。</p></div>
      <IndustrialReel :works="industrialWorks"/>
    </section>
    <section id="workflow" class="section workflow-section"><div class="section-heading"><div><div class="section-label">AI DEVELOPMENT / 工程与创作实践</div><h2>我的 AI 技术能力<span class="ai-heading-star" aria-hidden="true">✳</span></h2></div><p>从上下文与工具调用，<br>到多阶段协作与结果交付。</p></div><div class="workflow-grid"><article v-for="(step,index) in workflow" :key="step.title" @pointermove="capabilityLight($event)"><span class="capability-flow" aria-hidden="true"></span><div class="ai-capability-label"><span>{{String(index+1).padStart(2,'0')}}</span><small>{{step.label}}</small></div><h3>{{ step.title }}</h3><p>{{ step.text }}</p><div class="ai-capability-evidence"><span class="evidence-label">实践</span><span v-for="(item,i) in step.evidence.split('：')[1].split(' · ')" :key="item" class="evidence-chip" :style="{'--chip-delay':i*60+'ms'}">{{item}}</span></div></article></div></section>
    <section id="player" class="section player-section"><div class="section-heading"><div><div class="section-label">A PLAYER, ALSO A CREATOR / 游戏经历</div><h2>一直热爱，一直在玩。</h2></div></div><div class="player-introduction"><p><strong>长期热爱游戏，保持跨平台、跨品类的游戏体验。</strong><span>从 PC 到移动端、微信小游戏，从国内外 3A 大作到独立游戏与休闲小玩法，持续探索不同世界。</span></p><div class="player-platforms"><span>PC</span><span>MOBILE</span><span>MINI GAMES</span></div></div><GameShelf/><div class="player-experience-notes"><article><span>01 / KEEP EXPLORING</span><h3>持续尝新<span>不把自己局限在一种游戏里。</span></h3><p><strong>长期关注国内外新游，乐于主动尝试。</strong>跨 PC、移动端与小游戏，体验不同体量、题材和美术风格，从 3A 大作到独立作品都保持兴趣。</p></article><article><span>02 / LOOK INTO DESIGN</span><h3>观察设计<span>玩进去，也看得更细。</span></h3><p>游玩时留意<strong>玩法机制、操作反馈、关卡节奏与美术氛围</strong>，关注哪些设计让人愿意继续玩、哪些细节会打断体验。</p></article><article><span>03 / MY OWN PERSPECTIVE</span><h3>独立判断<span>保留自己的感受与评价。</span></h3><p>结合亲身体验，形成对<strong>玩法趣味、交互感受与整体表现</strong>的个人判断。既享受游戏，也愿意思考它哪里打动我、哪里还有改进空间。</p></article></div></section>
    <section id="contact" class="contact section"><div class="section-label">CONTACT / 联系</div><div class="contact-bottom"><a v-if="profile.email" class="button dark" :href="`mailto:${profile.email}`">{{ profile.email }}</a><span v-else class="contact-placeholder">联系邮箱待填写</span></div><div class="social-links" aria-label="社交平台"><a v-for="social in profile.socials" :key="social.label" :href="social.url" target="_blank" rel="noopener noreferrer"><span :class="['platform-logo', social.label === '小红书' ? 'xiaohongshu-logo' : 'douyin-logo']" aria-hidden="true"><template v-if="social.label === '小红书'">小红书</template><svg v-else viewBox="0 0 32 32"><path d="M19 5v15a5 5 0 1 1-4-4.9v4a1.5 1.5 0 1 0 1 1.4V5h3c.6 3.5 2.4 5.5 6 6v4c-2.5-.2-4.5-1.2-6-2.6" fill="currentColor"/></svg></span>{{ social.label }}<span class="social-hint">查看创作主页</span></a><a v-if="profile.githubUrl" :href="profile.githubUrl" target="_blank" rel="noopener noreferrer">GitHub</a><a v-if="profile.resumeUrl" :href="profile.resumeUrl" download>下载简历</a></div></section>
  </main>
  <footer><span>{{ profile.name }} · AI BUILDER</span><span>用好奇心驱动，持续构建中。</span></footer>
</template>
