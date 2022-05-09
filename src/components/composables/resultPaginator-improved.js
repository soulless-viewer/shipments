import { computed, ref } from 'vue'

export default (props) => {
  const currentDynamic = ref(props.current)
  const prefixedPaginator = ref(false)
  // let postfixedPaginator = ref(props.count <= props.maxItems ? false : true)

  const isActive = computed(() => (i) => {
    // console.log('isActive: ')
    // console.log(currentDynamic.value - 1)
    return currentDynamic.value - 1 === i
  })

  const moveLeft = () => {
    // console.log('moveLeft: ')
    // const buf = currentDynamic.value
    if (currentDynamic.value > 1) {
      currentDynamic.value += prefixedPaginator.value - 1
    }
    // console.log(`${buf} -> ${currentDynamic.value}`)
  }

  const moveRight = () => {
    // console.log('moveRight: ')
    // const buf = currentDynamic.value
    if (currentDynamic.value !== props.count) {
      currentDynamic.value += prefixedPaginator.value + 1
    }
    // console.log(`${buf} -> ${currentDynamic.value}`)
  }

  const itemTexts = computed(() => {
    // if number of the pages less than maxItems, skip formatting
    if (props.count <= props.maxItems) {
      return [...Array(props.count + 1).keys()].slice(1)
    }

    const arrPrefix = currentDynamic.value > props.maxItems ? ['...'] : []
    currentDynamic.value += arrPrefix.length

    const arrPostfix = props.maxItems - currentDynamic.value ? ['...'] : []

    const shift = currentDynamic.value - props.maxItems

    const arr = [...Array(props.count).keys()].slice(shift > 0 ? shift + 1 : 1, props.maxItems + 1)

    return arrPrefix.concat(arr).concat(arrPostfix)
  })

  return {
    isActive,
    moveLeft,
    moveRight,
    itemTexts
  }
}
