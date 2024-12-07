<template>
  <div class="aspect-container" ref="containerRef">
    <div class="content" :style="contentStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

const containerRef = ref<HTMLElement | null>(null)
const scale = ref(1)
const baseWidth = 1080 // 基准宽度
const baseHeight = 579 // 基准高度 (约16.8:9)

// 计算缩放比例
const calculateScale = () => {
  if (!containerRef.value) return
  const containerWidth = window.innerWidth
  scale.value = containerWidth / baseWidth
}

// 计算内容样式
const contentStyle = computed(() => ({
  transform: `scale(${scale.value})`,
  transformOrigin: 'left top',
  width: `${baseWidth}px`,
  height: `${baseHeight}px`
}))

// 监听窗口大小变化
const handleResize = () => {
  calculateScale()
}

onMounted(() => {
  calculateScale()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.aspect-container {
  width: 100vw;
}

.content {
  position: relative;
}
</style> 