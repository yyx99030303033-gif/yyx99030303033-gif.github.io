<!--
From Uiverse.io by vinodjangid07 - https://uiverse.io/vinodjangid07/afraid-falcon-17
MIT License, Copyright (c) vinodjangid07 (Vinod Jangid)
-->
<script setup>
const backToTop=()=>window.scrollTo({top:0,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})
</script>
<template>
  <button class="portfolio-back-top" type="button" aria-label="返回顶部" @click="backToTop">
    <svg class="portfolio-back-top-icon" viewBox="0 0 384 512" aria-hidden="true"><path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"/></svg>
  </button>
</template>
<style scoped>
.portfolio-back-top{width:50px;height:50px;border-radius:50%;background-color:rgb(20,20,20);border:none;font-weight:600;display:flex;align-items:center;justify-content:center;box-shadow:0 0 0 4px rgba(180,160,255,.253);cursor:pointer;transition-duration:.3s;overflow:hidden;position:fixed;right:28px;bottom:calc(28px + env(safe-area-inset-bottom,0px));z-index:40;padding:0}
.portfolio-back-top-icon{width:12px;transition-duration:.3s}
.portfolio-back-top-icon path{fill:white}
.portfolio-back-top:hover,.portfolio-back-top:focus-visible{width:140px;border-radius:50px;transition-duration:.3s;background-color:rgb(181,160,255);align-items:center}
.portfolio-back-top:hover .portfolio-back-top-icon,.portfolio-back-top:focus-visible .portfolio-back-top-icon{transition-duration:.3s;transform:translateY(-200%)}
.portfolio-back-top::before{position:absolute;bottom:-20px;content:"Back to Top";color:white;font-size:0;white-space:nowrap}
.portfolio-back-top:hover::before,.portfolio-back-top:focus-visible::before{font-size:13px;opacity:1;bottom:unset;transition-duration:.3s}
.portfolio-back-top:focus-visible{outline:2px solid #7252a1;outline-offset:6px}
@media(max-width:600px){.portfolio-back-top{right:18px;bottom:calc(18px + env(safe-area-inset-bottom,0px))}}
@media(prefers-reduced-motion:reduce){.portfolio-back-top,.portfolio-back-top-icon,.portfolio-back-top::before{transition:none}}
</style>
