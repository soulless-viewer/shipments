<template>
  <div class="result-paginator__wrapper">
    <div class="result-paginator">
      <ul class="result-paginator__list">
        <li @click="moveLeft()" class="result-paginator__list__item">◄</li>
        <li v-for="i in perPage ? Math.ceil(count / perPage) : 0" :key="i"
          @click="moveTo(i)"
          class="result-paginator__list__item"
          :class="{ 'result-paginator__list__item--active': isActive(i) }"
        >{{ i }}</li>
        <li @click="moveRight()" class="result-paginator__list__item">►</li>
      </ul>
    </div>
  </div>
</template>

<script>
import resultPaginator from '../../composable/resultPaginator'

export default {
  name: 'resultPaginator',
  emits: ['changePage'],
  props: {
    count: {
      type: Number,
      required: true
    },
    current: {
      type: Number,
      required: true
    },
    perPage: {
      type: Number,
      required: true
    },
    maxItems: {
      type: Number,
      default: 3
    }
  },
  setup (props, { emit }) {
    const {
      isActive,
      moveTo,
      moveLeft,
      moveRight
    } = resultPaginator(props, emit)

    return {
      isActive,
      moveTo,
      moveLeft,
      moveRight
    }
  }
}
</script>

<style lang="scss" src="./resultPaginator.scss" scoped></style>
