<!--
From Uiverse.io by cssbuttons-io - https://uiverse.io/cssbuttons-io/massive-mayfly-74
MIT License, Copyright (c) cssbuttons-io (cssbuttons.io)
Purple glow styling inspired by:
From Uiverse.io by cssbuttons-io - https://uiverse.io/cssbuttons-io/funny-dog-69
MIT License, Copyright (c) cssbuttons-io (cssbuttons.io)
-->
<script setup>
defineProps({href:{type:String,required:true},label:{type:String,default:'看演示视频'}})
</script>
<template>
  <a class="portfolio-video-link" :href="href" target="_blank" rel="noopener noreferrer">
    <span class="portfolio-video-circle" aria-hidden="true"><span class="portfolio-video-arrow"></span></span>
    <span class="portfolio-video-text">{{label}}</span>
  </a>
</template>
<style scoped>
.portfolio-video-link{position:relative;display:inline-block;cursor:pointer;border:0;vertical-align:middle;text-decoration:none;background:transparent;padding:0;font-size:inherit;font-family:inherit;width:12rem;height:3rem}
.portfolio-video-circle{transition:all .45s cubic-bezier(.65,0,.076,1);position:relative;display:block;margin:0;width:3rem;height:3rem;background:linear-gradient(135deg,#c59aef,#aa78d6);border-radius:1.625rem;box-shadow:0 0 12px #b87af55c,inset 0 0 0 1px #e1bdff85}
.portfolio-video-arrow{transition:all .45s cubic-bezier(.65,0,.076,1);position:absolute;top:0;bottom:0;margin:auto;left:.625rem;width:1.125rem;height:.125rem;background:none}
.portfolio-video-arrow::before{position:absolute;content:"";top:-.29rem;right:.0625rem;width:.625rem;height:.625rem;border-top:.125rem solid #fff;border-right:.125rem solid #fff;transform:rotate(45deg)}
.portfolio-video-text{transition:all .45s cubic-bezier(.65,0,.076,1);position:absolute;top:0;left:0;right:0;bottom:0;padding:.75rem 0;margin:0 0 0 1.85rem;color:#9569b3;font-weight:700;line-height:1.6;text-align:center;text-transform:uppercase}
.portfolio-video-link:hover .portfolio-video-circle,.portfolio-video-link:focus-visible .portfolio-video-circle{width:100%;box-shadow:0 0 16px #b87af580,0 0 30px #bc83ef40,inset 0 0 10px #ead3ff55}
.portfolio-video-link:hover .portfolio-video-arrow,.portfolio-video-link:focus-visible .portfolio-video-arrow{background:#fff;transform:translate(1rem,0)}
.portfolio-video-link:hover .portfolio-video-text,.portfolio-video-link:focus-visible .portfolio-video-text{color:#fff;text-shadow:0 0 8px #ebd2ff99}
.portfolio-video-link:active .portfolio-video-circle{box-shadow:0 0 8px #b87af580,inset 0 0 12px #ead3ff70}
.portfolio-video-link:focus-visible{outline:2px solid #9d67cc;outline-offset:5px;border-radius:1.625rem}
@media(prefers-reduced-motion:reduce){.portfolio-video-circle,.portfolio-video-arrow,.portfolio-video-text{transition:none}}
</style>
