<script setup>
import { ref, computed, onBeforeUnmount } from 'vue'
const props=defineProps({images:{type:Array,required:true},title:String})
const selected=ref(0),dialog=ref(null)
const order=ref(props.images.map((_,i)=>i)),drag=ref(null),flung=ref(null)
const cards=computed(()=>order.value.map((index,slot)=>({index,slot,image:props.images[index]})))
let timer
const throwDirection=ref(1)
const next=(direction=1)=>{if(flung.value!==null)return;throwDirection.value=typeof direction==='number'?direction:1;flung.value=order.value[0];timer=setTimeout(()=>{order.value.push(order.value.shift());flung.value=null},280)}
const down=e=>{if(e.button!==0)return;drag.value={id:e.pointerId,x:e.clientX,y:e.clientY,dx:0};e.currentTarget.setPointerCapture(e.pointerId)}
const move=e=>{if(!drag.value)return;drag.value.dx=e.clientX-drag.value.x}
const up=()=>{if(!drag.value)return;const dx=drag.value.dx;drag.value=null;if(Math.abs(dx)>55)next(Math.sign(dx));else if(Math.abs(dx)<8)open(order.value[0])}
const cardStyle=card=>({'--slot':card.slot,'--offset':card.slot===0&&drag.value?drag.value.dx+'px':'0px','--throw':throwDirection.value,'--drag-rotate':card.slot===0&&drag.value?drag.value.dx/22+'deg':'0deg'})
onBeforeUnmount(()=>clearTimeout(timer))
const open=i=>{selected.value=i;dialog.value.showModal()}
const close=()=>dialog.value.close()
const change=direction=>selected.value=(selected.value+direction+props.images.length)%props.images.length
</script>
<template>
  <div class="project-gallery gallery-fan">
    <div class="fan-stage" :class="{'is-dragging':drag}" aria-label="作品图片卡堆">
      <button v-for="card in cards" :key="card.index" class="fan-card" :class="{'is-front':card.slot===0,'is-flung':flung===card.index}" :style="cardStyle(card)" :aria-label="`查看${card.image.label}`" @pointerdown="card.slot===0&&down($event)" @pointermove="card.slot===0&&move($event)" @pointerup="card.slot===0&&up()" @pointercancel="drag=null" @keydown.enter.prevent="card.slot===0&&open(order[0])" @keydown.space.prevent="card.slot===0&&open(order[0])" @keydown.right.prevent="next(1)" @keydown.left.prevent="next(-1)">
        <img :src="card.image.src" :alt="`${title} · ${card.image.label}`" loading="lazy" draggable="false">
        <span class="fan-card-label"><span>{{card.image.label}}</span><small>{{String(card.index+1).padStart(2,'0')}} / {{String(images.length).padStart(2,'0')}}</small></span>
      </button>
    </div>
    <dialog ref="dialog" class="gallery-dialog gameplay-lightbox" @click="($event.target===dialog)&&close()" @keydown.left.prevent="change(-1)" @keydown.right.prevent="change(1)"><div class="gallery-dialog-inner"><div class="gallery-dialog-head"><div><small>PROJECT GALLERY</small><span>{{title}} · {{images[selected].label}}</span></div><button @click="close" aria-label="关闭图片">关闭 ×</button></div><Transition name="shot-change" mode="out-in"><img :key="selected" :src="images[selected].src" :alt="`${title} · ${images[selected].label}`"></Transition><div class="lightbox-timeline" role="group" aria-label="选择展示画面"><button v-for="(image,i) in images" :key="image.src" :aria-pressed="selected===i" @click="selected=i">{{image.label.replace('实机 · ','')}}</button></div><div class="gallery-controls"><button @click="change(-1)" aria-label="上一张图片">上一张</button><span>{{selected+1}} / {{images.length}} · 可用键盘方向键切换</span><button @click="change(1)" aria-label="下一张图片">下一张</button></div></div></dialog>
  </div>
</template>
