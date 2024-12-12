<template>
  <div class="party-building-adv">
    <PartyTitle titleText="党建宣传" />
    <div class="party-building-adv-content">
      <video
        id="party-video"
        class="video-js vjs-default-skin"
        preload="auto"
        width="100%"
        height="100%"
        data-setup="{}"
      >
        <source
          src="https://www.w3schools.com/html/mov_bbb.mp4"
          type="video/mp4"
        />
      </video>
    </div>
  </div>
</template>

<script setup lang="ts">
  import PartyTitle from "./partyTitle.vue";
  import videojs from "video.js";
  import "video.js/dist/video-js.css";
  import { onMounted, onBeforeUnmount } from "vue";

  let player: any;

  onMounted(() => {
    player = videojs("party-video", {
      controls: true,
      fluid: false,
      controlBar: false,
    });
  });

  onBeforeUnmount(() => {
    if (player) {
      player.dispose();
    }
  });
</script>

<style scoped>
  .party-building-adv {
    position: absolute;
    top: 95px;
    left: 53px;
    width: 206px;
    height: 135px;
  }

  .party-building-adv-content {
    position: absolute;
    top: 35px;
    left: 0;
    width: 100%;
    height: calc(100% - 35px);
    padding: 5px 9px;
    background-image: url("@/assets/party/视频背景模版.png");
    background-size: 100% 100%;
  }

  /* 自定义video.js样式 */
  :deep(.video-js) {
    width: 100%;
    height: 100%;
  }

  :deep(.video-js .vjs-big-play-button) {
    top: 50%;
    left: 50%;
    border-radius: 50%;
    width: 28px;
    height: 28px;
    line-height: 2em;
    border: none;
    background-image: url("@/assets/party/播放icon.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    font-size: 0;
    transform: translate(-50%, -50%);
  }

  :deep(.video-js .vjs-control-bar) {
    background-color: rgba(0, 0, 0, 0.5);
  }
</style>
