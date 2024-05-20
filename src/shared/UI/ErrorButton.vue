<script setup></script>

<template>
  <svg
    width="30px"
    height="30px"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="#ffffff"
    class="errorButton">
    <g id="SVGRepo_bgCarrier" stroke-width="0" />

    <g
      id="SVGRepo_tracerCarrier"
      stroke-linecap="round"
      stroke-linejoin="round" />

    <g id="SVGRepo_iconCarrier">
      <path
        d="M16 8L8 16M8.00001 8L16 16"
        stroke="#ffffff"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round" />
    </g>
  </svg>
</template>

<style lang="scss" scoped>
  .errorButton {
    position: absolute;
    top: 0px;
    right: 5px;
    cursor: pointer;
    transition: $opacity-transition;

    @media (hover: hover) {
      &:hover {
        opacity: 0.6;
        cursor: pointer;
      }
    }
  }
</style>
