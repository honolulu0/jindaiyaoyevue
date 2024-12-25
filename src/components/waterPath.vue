<template>
  <div class="path-container">
    <svg
      width="81px"
      height="35px"
      viewBox="0 0 81 25"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <path
        d="M1,12 C4,12 8,12 16,12 C24,12 22,3 29,3 C36,3 33,19 40,19 C47,19 42,-3 51,-3 C59,-3 57,15 62,15 C67,15 69,10 73,10 C75,10 78,10 83,10"
        stroke="#B8FBFD"
        stroke-width="2"
        fill="none"
        id="motionPath"
      />
      
      <circle class="ball" r="2" fill="#ffffff">
        <animateMotion
          dur="3s"
          repeatCount="indefinite"
          alternateReverse="true"
        >
          <mpath xlink:href="#motionPath" />
        </animateMotion>
      </circle>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'WaterPath'
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
