<template>
  <div class="webrtc-stream">
    <video
      ref="videoRef"
      playsinline
      muted
    ></video>
    <div class="fullscreen-btn" @click="toggleFullscreen">
      <i class="fullscreen-icon"></i>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, onUnmounted, watch } from "vue";

  const props = defineProps({
    url: {
      type: String,
      required: true,
    },
    webrtcUrl: {
      type: String,
      default: "http://localhost:8001", // webrtc-streamer 服务地址
    },
  });

  const videoRef = ref(null);

  onMounted(() => {
    const webRtcServer = new WebRtcStreamer(videoRef.value, props.webrtcUrl);
    const videoUrl = props.url;
    const audioUrl = "";
    const options = "rtptransport=tcp&timeout=60";
    webRtcServer.connect(videoUrl, audioUrl, options);
  });

  const toggleFullscreen = () => {
    const videoContainer = videoRef.value.parentElement;
    
    if (!document.fullscreenElement) {
      videoContainer.requestFullscreen().catch(err => {
        console.error(`全屏错误: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };
</script>

<style scoped>
  .webrtc-stream {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .webrtc-stream video {
    width: 100%;
    height: 100%;
    object-fit: fill;
  }

  .fullscreen-btn {
    position: absolute;
    right: 10px;
    bottom: 10px;
    width: 32px;
    height: 32px;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .fullscreen-btn:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }

  .fullscreen-icon {
    width: 20px;
    height: 20px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z'/%3E%3C/svg%3E");
    background-size: contain;
    background-repeat: no-repeat;
  }
</style>
