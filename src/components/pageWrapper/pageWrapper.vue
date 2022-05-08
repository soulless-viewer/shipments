<template>
  <div class="page-wrapper-wrapper">
    <div class="page-wrapper__header">
      <router-link :to="{name: 'mainPage'}" tag="h2">
        <h2>{{ title }}</h2>
      </router-link>
    </div>
    <div class="page-wrapper__content">
      <div class="page-wrapper__content__wrapper">
        <slot name="content"></slot>
      </div>
    </div>
    <div class="page-wrapper__footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>s

<script>
export default {
  name: 'pageHeader',
  props: {
    title: {
      type: String,
      default: 'Main /'
    }
  }
}
</script>

<style lang="scss" src="./pageWrapper.scss" scoped></style>
