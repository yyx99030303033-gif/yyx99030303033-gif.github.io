<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
const emit=defineEmits(['done'])
const visible=ref(false)
const leaving=ref(false)
let timer, endTimer
const finish=()=>{if(!visible.value||leaving.value)return;leaving.value=true;clearTimeout(timer);endTimer=setTimeout(()=>{visible.value=false;emit('done')},650)}
onMounted(()=>{if(matchMedia('(prefers-reduced-motion: reduce)').matches){emit('done');return}visible.value=true;timer=setTimeout(finish,1700)})
onBeforeUnmount(()=>{clearTimeout(timer);clearTimeout(endTimer)})
</script>
<template><button v-if="visible" class="motion-intro" :class="{'intro-leaving':leaving}" @click="finish" aria-label="跳过开场动画"><span class="intro-corner">YANG YUANXIN / PORTFOLIO</span><span class="intro-word"><span>想象</span><i>×</i><span>创造</span></span><span class="intro-rule"></span><span class="intro-sub">AI CODING · PLAYFUL WORLDS</span><span class="intro-skip">点击跳过 / SKIP INTRO</span></button></template>
