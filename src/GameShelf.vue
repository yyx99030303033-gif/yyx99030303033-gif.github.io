<script setup>
import {ref,computed,onMounted,onBeforeUnmount} from 'vue'
const selected=ref(0),hovered=ref(-1)
const current=()=>hovered.value>=0?hovered.value:selected.value
const collection=[
 {"title": "黑神话：悟空", "src": "black-myth-wukong.jpg", "kind": "动作 / 神话冒险"},
 {"title": "霍格沃茨之遗", "src": "hogwarts.jpg", "kind": "开放世界 / 魔法冒险"},
 {"title": "底特律：变人", "src": "detroit.jpg", "kind": "互动叙事 / 分支选择"},
 {"title": "生化危机", "src": "resident-evil.jpg", "kind": "生存恐怖 / 动作冒险"},
 {"title": "双人成行", "src": "it-takes-two.jpg", "kind": "双人合作 / 平台解谜"},
 {"title": "双影奇境", "src": "split-fiction.jpg", "kind": "双人合作 / 动作冒险"},
 {"title": "逃出生天", "src": "a-way-out.jpg", "kind": "双人合作 / 剧情冒险"},
 {"title": "女吊", "src": "scarlet-idol.jpg", "kind": "双人合作 / 民俗恐怖"},
 {"title": "生灵重塑", "src": "reanimal.jpg", "kind": "恐怖冒险 / 合作解谜"},
 {"title": "小小梦魇", "src": "little-nightmares.jpg", "kind": "悬疑 / 平台解谜"},
 {"title": "米塔", "src": "miside.jpg", "kind": "心理恐怖 / 叙事冒险"},
 {"title": "迷失", "src": "stray.jpg", "kind": "探索 / 叙事冒险"},
 {"title": "黎明杀机", "src": "dead-by-daylight.jpg", "kind": "非对称竞技 / 生存恐怖"},
 {"title": "森林", "src": "the-forest.jpg", "kind": "生存 / 探索"},
 {"title": "饥荒", "src": "dont-starve.jpg", "kind": "生存 / 沙盒探索"},
 {"title": "潜水员戴夫", "src": "dave.jpg", "kind": "探索冒险 / 餐厅经营"},
 {"title": "星露谷物语", "src": "stardew.jpg", "kind": "农场经营 / 生活模拟"},
 {"title": "双点医院", "src": "two-point-hospital.jpg", "kind": "模拟经营 / 医院管理"},
 {"title": "浮游世界", "src": "flotsam.jpg", "kind": "生存建造 / 城镇经营"},
 {"title": "毛线小精灵", "src": "unravel.jpg", "kind": "独立游戏 / 平台解谜"},
 {"title": "三位一体", "src": "trine.jpg", "kind": "奇幻冒险 / 合作解谜"},
 {"title": "人类一败涂地", "src": "human-fall-flat.jpg", "kind": "物理解谜 / 多人合作"},
 {"title": "双狗成形", "src": "phogs.jpg", "kind": "双人合作 / 趣味解谜"},
 {"title": "原神", "src": "genshin.png", "kind": "开放世界 / 角色扮演", "square": true},
 {"title": "鸣潮", "src": "wuthering-waves.png", "kind": "开放世界 / 动作角色扮演", "square": true},
 {"title": "王者荣耀", "src": "honor-of-kings.png", "kind": "移动端 / 多人竞技", "square": true},
 {"title": "和平精英", "src": "peacekeeper.png", "kind": "移动端 / 战术竞技", "square": true},
 {"title": "第五人格", "src": "identity-v.png", "kind": "非对称竞技 / 悬疑", "square": true},
 {"title": "如鸢", "src": "ruyuan.png", "kind": "卡牌 / 角色养成", "square": true},
 {"title": "蛋仔派对", "src": "eggy-party.png", "kind": "多人派对 / 休闲竞技", "square": true},
 {"title": "球球大作战", "src": "battle-of-balls.png", "kind": "移动端 / 多人竞技", "square": true},
 {"title": "桃源深处有人家", "src": "taoyuan.png", "kind": "田园经营 / 生活模拟", "square": true},
 {"title": "羊了个羊", "src": "sheep.png", "kind": "休闲 / 消除小游戏", "square": true},
 {"title": "抓大鹅", "src": "catch-goose.png", "kind": "休闲 / 3D 消除", "square": true},
 {title:"地铁跑酷",src:"subway-surfers.png",kind:"移动端 / 休闲跑酷",square:true}
]
const shelfViewport=ref(null),shelfWidth=ref(1100)
const bookWidth=computed(()=>shelfWidth.value<700?154:190)
const trackWidth=computed(()=>Math.max(shelfWidth.value,collection.length*18+bookWidth.value))
const spineWidth=computed(()=>(trackWidth.value-bookWidth.value)/(collection.length-1))
const trackStyle=computed(()=>({'width':trackWidth.value+'px','--book-width':bookWidth.value+'px','--spine-width':spineWidth.value+'px','--book-height':bookWidth.value*1.5+'px'}))
const bookStyle=i=>({'--book-x':(i*spineWidth.value+(i>current()?bookWidth.value-spineWidth.value:0))+'px'})
let resizeObserver,hoverFrame=0,pendingHover=-1
function sweep(event){if(event.pointerType!=='mouse')return;const book=event.target.closest('[data-book-index]');if(!book)return;pendingHover=Number(book.dataset.bookIndex);if(!hoverFrame)hoverFrame=requestAnimationFrame(()=>{hoverFrame=0;if(hovered.value!==pendingHover)hovered.value=pendingHover})}
function leaveShelf(){cancelAnimationFrame(hoverFrame);hoverFrame=0;hovered.value=-1}
onMounted(()=>{resizeObserver=new ResizeObserver(([entry])=>{shelfWidth.value=entry.contentRect.width});resizeObserver.observe(shelfViewport.value)})
onBeforeUnmount(()=>{resizeObserver?.disconnect();cancelAnimationFrame(hoverFrame)})
</script>
<template>
 <div class="player-cover-collection">
  <div class="player-wall-top"><span>WORLDS I'VE PLAYED</span><span>PC <i>✳</i> MOBILE <i>✳</i> MINI GAMES</span></div>
  <div ref="shelfViewport" class="shelf-viewport"><div class="player-cover-wall" :style="trackStyle" @pointermove="sweep" @pointerleave="leaveShelf" role="group" aria-label="游戏收藏书架"><button v-for="(game,i) in collection" :key="game.title" :data-book-index="i" class="player-cover" :class="{'is-square':game.square,'is-selected':current()===i}" :style="bookStyle(i)" :aria-pressed="current()===i" :aria-label="game.title+'，'+game.kind" @focus="hovered=i" @blur="hovered=-1" @click="selected=i;hovered=i"><img :src="'/images/player-games/'+game.src" :alt="game.title" loading="lazy" draggable="false"><span class="game-book-spine" aria-hidden="true">{{game.title}}</span><span class="player-cover-caption"><strong>{{game.title}}</strong><small>{{game.kind}}</small></span></button></div></div>

 </div>
</template>
<style scoped>
.player-cover-collection{padding-bottom:10px}.player-wall-top{display:flex;justify-content:space-between;gap:20px;font-size:9px;letter-spacing:2px;color:#ac8fbd;line-height:1.7;margin-bottom:14px}.player-wall-top i{font-style:normal;margin:0 11px;color:#b498c5}.shelf-viewport{width:100%;overflow-x:auto;overflow-y:hidden;padding-bottom:14px;scrollbar-width:thin;scrollbar-color:#9e79b540 transparent}.player-cover-wall{position:relative;height:calc(var(--book-height) + 38px);isolation:isolate;contain:layout style}.player-cover-wall:after{content:'';position:absolute;left:0;right:0;bottom:8px;height:7px;border-radius:3px;background:linear-gradient(#967da8,#594566);box-shadow:0 8px 15px #0004;z-index:-1}.player-cover{position:absolute;left:0;top:13px;width:var(--book-width);height:var(--book-height);padding:0;border:0;border-radius:5px;overflow:hidden;background:linear-gradient(135deg,#a48bb9,#42334f);cursor:pointer;transform:translate3d(var(--book-x),0,0);clip-path:inset(0 calc(var(--book-width) - var(--spine-width) + 2px) 0 0 round 4px);transition:transform .38s cubic-bezier(.2,.75,.25,1),clip-path .38s cubic-bezier(.2,.75,.25,1);will-change:transform;isolation:isolate}.player-cover.is-selected{transform:translate3d(var(--book-x),-6px,0);clip-path:inset(0 0 0 0 round 6px);z-index:2}.player-cover img{position:absolute;inset:0;display:block;width:100%;height:100%;object-fit:cover;pointer-events:none}.player-cover.is-square img{object-fit:contain;padding:14px;background:linear-gradient(145deg,#b8a0cd,#5c4671)}.player-cover:after{content:'';position:absolute;inset:0;pointer-events:none;background:linear-gradient(90deg,#07050b85,#fff1 12%,transparent 33%,#08060b21);box-shadow:inset 2px 0 1px #ffffff3b,inset -2px 0 4px #0006;opacity:1;transition:opacity .25s}.player-cover.is-selected:after{opacity:.25}.game-book-spine{position:absolute;left:0;top:15px;bottom:15px;width:calc(var(--spine-width) - 2px);display:flex;align-items:center;justify-content:center;writing-mode:vertical-rl;white-space:nowrap;z-index:2;font-size:10px;letter-spacing:1px;line-height:1;color:white;text-shadow:0 2px 4px #000;pointer-events:none;opacity:1;transition:opacity .2s}.player-cover.is-selected .game-book-spine{opacity:0}.player-cover-caption{position:absolute;inset:auto 0 0;display:flex;flex-direction:column;gap:5px;padding:30px 12px 12px;background:linear-gradient(transparent,#160e22e6);color:#fff;text-align:left;opacity:0;transform:translateY(8px);transition:opacity .2s,transform .25s;pointer-events:none}.player-cover.is-selected .player-cover-caption{opacity:1;transform:none;transition-delay:.1s}.player-cover-caption strong{font-size:12px;font-weight:500}.player-cover-caption small{font-size:9px;color:#d9c6e4}.player-cover:focus-visible{outline:2px solid #d5b4ed;outline-offset:-3px}.player-wall-bottom{display:flex;justify-content:space-between;gap:20px;padding:17px 0 0;border-top:1px solid #baa4ca30;color:#9b80ac;font-size:10px;line-height:1.8}.player-wall-bottom i{font-style:normal;margin:0 12px;color:#b79bca}.player-wall-bottom>span:last-child{font-size:9px;text-align:right;color:#b09abc}@media(max-width:700px){.player-wall-top{font-size:8px;letter-spacing:1px;flex-wrap:wrap;gap:9px}.player-wall-bottom{display:block;font-size:9px}.player-wall-bottom>span{display:block}.player-wall-bottom>span:last-child{text-align:left;margin-top:7px}.game-book-spine{font-size:9px}.player-cover-caption strong{font-size:11px}.player-cover-caption small{font-size:8px}.player-cover.is-square img{padding:10px}}@media(prefers-reduced-motion:reduce){.player-cover,.player-cover:after,.game-book-spine,.player-cover-caption{transition:none!important}}
.player-cover.is-square img{object-fit:fill;padding:0;background:none}.player-cover-wall:after{display:none}.player-cover-wall{height:calc(var(--book-height) + 20px)}.shelf-viewport{padding-bottom:0}.player-cover{background:#29232e}.player-cover.is-selected{box-shadow:0 9px 20px #46334c20}
</style>
