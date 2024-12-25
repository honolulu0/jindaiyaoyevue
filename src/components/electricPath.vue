<template>
  <div class="path-container">
    <svg
      width="70px"
      height="31px"
      viewBox="0 0 70 31"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/2000/svg"
    >
      <polygon
        id="electric-path-bg"
        points="0 19.146508 38.317184 19.146508 46.163023 7.208438 51.891143 31.013611 70.02438 12.109396 53.503548 24.749022 47.514247 0.013611 36.510728 16.770731"
        fill="#B8FBFD"
      />

      <path
        id="motion-path"
        d="M0 19.146508 L38.317184 19.146508 L46.163023 7.208438 L51.891143 31.013611 L70.02438 12.109396"
        stroke="none"
        fill="none"
      />
      
      <circle class="ball" r="2" fill="#ffffff">
        <animateMotion
          dur="3s"
          repeatCount="indefinite"
          keyPoints="0;1;0"
          keyTimes="0;0.5;1"
          calcMode="linear"
        >
          <mpath xlink:href="#motion-path" />
        </animateMotion>
      </circle>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'ElectricPath'
}
</script>

<style scoped>
.path-container {
  position: relative;
  transform: scale(0.4);
  width: 30px;
  height: 30px;
  margin: 10px;
}
</style> 