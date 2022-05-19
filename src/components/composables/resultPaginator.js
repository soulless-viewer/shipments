import { computed, ref } from 'vue'

export default (props, emit) => {
  const currentDynamic = ref(props.current)
  const isActive = computed(() => (i) => currentDynamic.value === i)

  const moveLeft = () => {
    if (currentDynamic.value > 1) moveTo(currentDynamic.value - 1)
  }
  const moveRight = () => {
    if (currentDynamic.value !== Math.ceil(props.count / props.perPage)) moveTo(currentDynamic.value + 1)
  }
  const moveTo = (idx) => {
    currentDynamic.value = idx
    emit('changePage', currentDynamic.value)
  }

  return {
    isActive,
    moveTo,
    moveLeft,
    moveRight
  }
}
