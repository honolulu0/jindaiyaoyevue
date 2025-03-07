<template>
	<div class="party-building-adv">
		<PartyTitle titleText="党建宣传" />
		<div class="party-building-adv-content">
			<video ref="videoRef" preload="auto" width="100%" height="100%" loop autoplay muted>
				<source :src="videoUrl" type="video/mp4" />
			</video>
			<div class="video-controls">
				<div class="play-btn" @click="togglePlay">
					<i :class="isPlaying ? 'pause-icon' : 'play-icon'"></i>
				</div>
				<div class="custom-fullscreen-btn" @click="toggleFullScreen">
					<i class="fullscreen-icon"></i>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { getPartyAdv } from "@/apis/getPartyAdv";
	import PartyTitle from "./partyTitle.vue";
	import { onMounted, onBeforeUnmount, ref } from "vue";

	const videoRef = ref<HTMLVideoElement | null>(null);
	const videoUrl = ref("");
	let timer : any;
	const isPlaying = ref(true);

	async function updateVideo() {
		videoUrl.value = await getPartyAdv();
		videoRef.value?.load();
		videoRef.value?.play();
	}

	onMounted(async () => {
		await updateVideo();
		timer = setInterval(updateVideo, 5 * 60 * 1000);

		document.addEventListener("fullscreenchange", handleFullscreenChange);
	});

	onBeforeUnmount(() => {
		if (timer) {
			clearInterval(timer);
		}
		document.removeEventListener("fullscreenchange", handleFullscreenChange);
	});

	const toggleFullScreen = async () => {
		const videoContainer = document.querySelector(
			".party-building-adv-content"
		);
		try {
			if (!document.fullscreenElement) {
				await videoContainer?.requestFullscreen();
			} else {
				if (document.exitFullscreen) {
					await document.exitFullscreen();
				}
			}
		} catch (err) {
			console.error("全屏切换失败:", err);
		}
	};

	const togglePlay = () => {
		if (videoRef.value) {
			if (videoRef.value.paused) {
				videoRef.value.play();
				isPlaying.value = true;
			} else {
				videoRef.value.pause();
				isPlaying.value = false;
			}
		}
	};

	const handleFullscreenChange = () => {
		if (!document.fullscreenElement && videoRef.value) {
			if (!videoRef.value.paused) {
				videoRef.value.play();
			}
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

	/* 修改video标签样式 */
	video {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}

	/* 移除video.js相关样式 */
	:deep(.video-js),
	:deep(.video-js .vjs-big-play-button),
	:deep(.video-js .vjs-control-bar) {
		display: none;
	}

	.video-controls {
		position: absolute;
		bottom: 15px;
		right: 15px;
		display: flex;
		gap: 10px;
		z-index: 2;
	}

	.play-btn,
	.custom-fullscreen-btn {
		width: 24px;
		height: 24px;
		cursor: pointer;
		background: rgba(0, 0, 0, 0.5);
		border-radius: 4px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.play-icon,
	.pause-icon {
		width: 12px;
		height: 12px;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.pause-icon::before,
	.pause-icon::after {
		content: "";
		position: absolute;
		width: 2px;
		height: 10px;
		background: #fff;
		top: 50%;
		transform: translateY(-50%);
	}

	.pause-icon::before {
		left: 3px;
	}

	.pause-icon::after {
		right: 3px;
	}

	/* 播放按钮样式 */
	.play-icon::before {
		content: "";
		position: absolute;
		left: 4px;
		top: 50%;
		transform: translateY(-50%);
		border-left: 8px solid #fff;
		border-top: 5px solid transparent;
		border-bottom: 5px solid transparent;
	}

	/* 悬停时显示控制按钮 */
	.party-building-adv-content .video-controls {
		opacity: 0;
		transition: opacity 0.3s;
	}

	.party-building-adv-content:hover .video-controls {
		opacity: 1;
	}

	/* 移除全屏按钮的绝对定位 */
	.custom-fullscreen-btn {
		position: static;
		right: auto;
		bottom: auto;
	}

	/* 确保两个按钮在hover时都显示 */
	.party-building-adv-content:hover .video-controls,
	.party-building-adv-content:hover .custom-fullscreen-btn {
		opacity: 1;
	}

	.fullscreen-icon {
		position: relative;
		width: 12px;
		height: 12px;
		border: 2px solid #fff;
	}

	.fullscreen-icon::before,
	.fullscreen-icon::after {
		content: "";
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