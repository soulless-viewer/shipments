<template>
  <button :class="['button', 'uniq-button-for-hover', this.theme_color]">
    <span class="button__text">
      <slot></slot>
    </span>
  </button>
</template>

<script>
export default {
  name: 'customButton',
  props: {
    theme_color: {
      type: String,
      default: 'green-theme'
    }
  }
}
</script>

<style lang="scss" src="./customButton.scss" scoped></style>
