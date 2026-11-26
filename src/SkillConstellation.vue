<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
const mode=ref('graph'), active=ref(null), svg=ref(null)
const nodes=ref([
 {name:'Codex',x:170,y:130,group:0,desc:'主要 AI Coding 工具'}, {name:'Claude Code',x:350,y:85,group:0,desc:'AI 协作开发'}, {name:'MiniMax',x:95,y:270,group:0,desc:'按任务选择模型与工具'}, {name:'DeepSeek',x:275,y:250,group:0,desc:'AI 开发工具'},
 {name:'Agent',x:490,y:180,group:1,desc:'多智能体分工协作'}, {name:'Skills',x:650,y:90,group:1,desc:'可复用的能力与开发规范'}, {name:'MCP',x:800,y:190,group:1,desc:'工具连接与协作'}, {name:'Agentic Workflow',x:585,y:320,group:1,desc:'多阶段任务编排与验收'},
 {name:'Vue 3',x:175,y:430,group:2,desc:'前端与交互功能开发'}, {name:'TypeScript',x:370,y:390,group:2,desc:'软件工程与业务实现'}, {name:'Three.js',x:800,y:400,group:3,desc:'三维场景与创意交互'}, {name:'Hi3D',x:690,y:500,group:3,desc:'三维内容创作'}, {name:'Game Prototyping',x:450,y:530,group:3,desc:'玩法构思到可体验原型'},
])
const links=[[0,1],[0,2],[0,3],[0,4],[1,4],[4,5],[4,6],[4,7],[5,7],[6,7],[7,9],[8,9],[9,10],[10,11],[10,12],[8,12],[7,10]]
let dragging=null
const position=e=>{const rect=svg.value.getBoundingClientRect();return {x:Math.max(65,Math.min(935,(e.clientX-rect.left)/rect.width*1000)),y:Math.max(35,Math.min(565,(e.clientY-rect.top)/rect.height*600))}}
const down=(e,i)=>{dragging=i;active.value=i;svg.value.setPointerCapture(e.pointerId);e.preventDefault()}
const move=e=>{if(dragging===null)return;Object.assign(nodes.value[dragging],position(e))}
const up=()=>{dragging=null}
let media
const onMedia=()=>{if(media.matches)mode.value='list'}
onMounted(()=>{media=matchMedia('(max-width:600px)');onMedia();media.addEventListener('change',onMedia)})
onBeforeUnmount(()=>media?.removeEventListener('change',onMedia))
</script>
<template><div class="constellation"><div class="skill-mode" role="group" aria-label="技能展示方式"><button :aria-pressed="mode==='graph'" @click="mode='graph'">关系图</button><button :aria-pressed="mode==='list'" @click="mode='list'">列表</button><span>悬停了解 · 拖动节点</span></div><div v-if="mode==='graph'" class="graph-wrap"><svg ref="svg" viewBox="0 0 1000 600" class="skill-graph" aria-label="AI、工程与创意开发的技能关系图" @pointermove="move" @pointerup="up" @pointercancel="up"><g class="skill-edges"><line v-for="([a,b],i) in links" :key="i" :x1="nodes[a].x" :y1="nodes[a].y" :x2="nodes[b].x" :y2="nodes[b].y" :class="{'edge-active':active===a||active===b}"/></g><g v-for="(node,i) in nodes" :key="node.name" :transform="`translate(${node.x},${node.y})`" :class="['skill-node',`node-group-${node.group}`,{'node-active':active===i}]" role="button" tabindex="0" :aria-label="`${node.name}：${node.desc}`" @pointerenter="active=i" @pointerdown="down($event,i)" @focus="active=i" @keydown.enter="active=i" @keydown.space.prevent="active=i"><rect :x="-Math.max(53,node.name.length*4.3+16)" y="-23" :width="Math.max(106,node.name.length*8.6+32)" height="46" rx="23"/><text x="4" y="5" text-anchor="middle">{{node.name}}</text></g></svg><div class="graph-caption" aria-live="polite"><strong>{{active===null?'AI × ENGINEERING × CREATIVITY':nodes[active].name}}</strong><span>{{active===null?'工具之间的连接，最终落在可以交付的作品上。':nodes[active].desc}}</span></div></div><div v-else class="skill-list"><button v-for="(node,i) in nodes" :key="node.name" @click="active=i" :aria-pressed="active===i"><strong>{{node.name}}</strong><span>{{node.desc}}</span></button></div></div></template>
