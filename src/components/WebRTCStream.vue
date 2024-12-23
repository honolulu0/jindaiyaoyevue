<template>
  <div class="webrtc-stream">
    <video
      ref="videoRef"
      playsinline
      muted
    ></video>
    <div class="control-buttons">
      <div
        class="control-btn location-btn"
        @click="handleLocationClick"
      >
        <i class="location-icon"></i>
      </div>
      <div
        class="control-btn fullscreen-btn"
        @click="toggleFullscreen"
      >
        <i class="fullscreen-icon"></i>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, onUnmounted, watch } from "vue";

  const emit = defineEmits(["location-click"]);

  let webRtcServer = null;

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
    console.log("onMounted", props);
    webRtcServer = new WebRtcStreamer(videoRef.value, props.webrtcUrl);
    const videoUrl = props.url;
    const audioUrl = "";
    const options = "rtptransport=tcp&timeout=60";
    webRtcServer.connect(videoUrl, audioUrl, options);
  });

  onUnmounted(() => {
    webRtcServer.disconnect();
  });

  watch(
    () => props.url,
    (newUrl) => {
      console.log("watch", newUrl);
      if (webRtcServer !== null) {
        // 先断开现有连接
        webRtcServer.disconnect();
        
        if (newUrl) {
          // 建立新连接
          const audioUrl = "";
          const options = "rtptransport=tcp&timeout=60";
          webRtcServer.connect(newUrl, audioUrl, options);
        }
      }
    }
  );

  const toggleFullscreen = () => {
    const videoContainer = videoRef.value.parentElement;

    if (!document.fullscreenElement) {
      videoContainer.requestFullscreen().catch((err) => {
        console.error(`全屏错误: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const handleLocationClick = () => {
    emit("location-click");
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

  .fullscreen-icon {
    width: 20px;
    height: 20px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z'/%3E%3C/svg%3E");
    background-size: contain;
    background-repeat: no-repeat;
  }

  .control-buttons {
    position: absolute;
    right: 10px;
    bottom: 10px;
    display: flex;
    gap: 10px;
  }

  .control-btn {
    width: 32px;
    height: 32px;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .control-btn:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }

  .location-icon {
    width: 20px;
    height: 20px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06C6.83 3.52 3.52 6.83 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z'/%3E%3C/svg%3E");
    background-size: contain;
    background-repeat: no-repeat;
  }
</style>
