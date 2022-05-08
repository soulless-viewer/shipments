import { computed, ref } from 'vue'

export default (props, emit) => {
  const currentDynamic = ref(props.current)
  const isActive = computed(() => (i) => currentDynamic.value === i)

  const moveLeft = () => {
    if (currentDynamic.value > 1) currentDynamic.value--
    emit('changePage', currentDynamic.value)
  }
  const moveRight = () => {
    if (currentDynamic.value !== props.count) currentDynamic.value++
    emit('changePage', currentDynamic.value)
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
