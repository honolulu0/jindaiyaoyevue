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
          type="video/mp4"
        />
      </video>
      <div class="custom-fullscreen-btn" @click="toggleFullScreen">
        <i class="fullscreen-icon"></i>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { getPartyAdv } from "@/apis/getPartyAdv";
import PartyTitle from "./partyTitle.vue";
  import videojs from "video.js";
  import "video.js/dist/video-js.css";
  import { onMounted, onBeforeUnmount } from "vue";

  let player: any;
  let timer: any;

  async function updateVideo() {
    const url = await getPartyAdv();
    player.src(url);
  }

  onMounted(async () => {
    const url = await getPartyAdv();
    player = videojs("party-video", {
      controls: true,
      fluid: false,
      controlBar: false,
    });
    player.src(url);

    timer = setInterval(updateVideo, 5 * 60 * 1000);
  });

  onBeforeUnmount(() => {
    if (player) {
      player.dispose();
    }
    if (timer) {
      clearInterval(timer);
    }
  });

  const toggleFullScreen = () => {
    const videoContainer = document.querySelector('.party-building-adv-content');
    if (!document.fullscreenElement) {
      videoContainer?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };
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

  .custom-fullscreen-btn {
    position: absolute;
    right: 15px;
    bottom: 15px;
    width: 24px;
    height: 24px;
    cursor: pointer;
    z-index: 2;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .fullscreen-icon {
    position: relative;
    width: 12px;
    height: 12px;
    border: 2px solid #fff;
  }

  .fullscreen-icon::before,
  .fullscreen-icon::after {
    content: '';
    position: absolute;
    width: 4px;
    height: 4px;
    border: 2px solid #fff;
  }

  .fullscreen-icon::before {
    top: -4px;
    left: -4px;
    border-right: none;
    border-bottom: none;
  }

  .fullscreen-icon::after {
    bottom: -4px;
    right: -4px;
    border-left: none;
    border-top: none;
  }

  /* 全屏时的样式 */
  .party-building-adv-content:fullscreen {
    background-color: black;
    padding: 0;
  }

  .party-building-adv-content:fullscreen video {
    width: 100vw;
    height: 100vh;
    object-fit: contain;
  }
</style>
