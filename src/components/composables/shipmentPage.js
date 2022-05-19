import { computed, watch, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { formatDate } from './scheduleItem'

export default (props, emit, inputRefs) => {
  const store = useStore()
  const route = useRoute()
  const router = useRouter()

  store.dispatch('mainPage/loadShipment', route.params.id)

  const shipmentUpdatingStatus = computed(() =>
    store.getters['mainPage/getShipmentUpdatingStatus'](route.params.id)
  )
  const shipmentLoadingStatus = computed(() =>
    store.getters['mainPage/getShipmentLoadingStatus'](route.params.id)
  )
  const shipmentDeletingStatus = computed(() =>
    store.getters['mainPage/getShipmentDeletingStatus']
  )
  const shipment = computed(() =>
    store.getters['mainPage/getShipment'](route.params.id)
  )

  const {
    inputTo,
    inputFrom,
    inputVolume,
    spanArrival,
    inputArrival,
    spanDeparture,
    inputDeparture,
    inputArrivalModel,
    inputDepartureModel
  } = inputRefs

  const openArrivalPicker = () => { inputArrival.value.openMenu() }
  const openDeparturePicker = () => { inputDeparture.value.openMenu() }

  const contentUpdated = ref(false)

  watch(inputTo, (inputTo) => {
    inputTo.addEventListener('change', () => { contentUpdated.value = true })
  })
  watch(inputFrom, (inputFrom) => {
    inputFrom.addEventListener('change', () => {
      contentUpdated.value = true
    })
  })
  watch(inputVolume, (inputVolume) => {
    inputVolume.addEventListener('change', () => { contentUpdated.value = true })
  })
  watch(inputArrivalModel, (inputArrivalModel) => {
    contentUpdated.value = true
    spanArrival.value.innerText = formatDate(inputArrivalModel, true)
  })
  watch(inputDepartureModel, (inputDepartureModel) => {
    contentUpdated.value = true
    spanDeparture.value.innerText = formatDate(inputDepartureModel, true)
  })

  const updateShipment = () => {
    store.dispatch(
      'mainPage/updateShipment',
      {
        id: route.params.id,
        data: {
          arrival_point: inputTo.value.value,
          arrival_dt: inputArrivalModel.value === undefined
            ? shipment.value.arrival_dt
            : inputArrivalModel.value,
          cargo_volume: inputVolume.value.value,
          departure_point: inputFrom.value.value,
          departure_dt: inputDepartureModel.value === undefined
            ? shipment.value.departure_dt
            : inputDepartureModel.value
        }
      }
    )
    contentUpdated.value = false
  }

  const deleteShipment = () => {
    store.dispatch('mainPage/deleteShipment', route.params.id)
    router.push({ name: 'mainPage' })
  }

  return {
    shipment,
    formatDate,
    updateShipment,
    deleteShipment,
    contentUpdated,
    shipmentLoadingStatus,
    shipmentUpdatingStatus,
    shipmentDeletingStatus,
    openArrivalPicker,
    openDeparturePicker
  }
}
