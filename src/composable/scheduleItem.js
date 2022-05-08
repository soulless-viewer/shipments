import { computed, watch } from 'vue'
import { useStore } from 'vuex'

export const formatDate = (dt, full = false) => {
  const dtSplit = dt.split('T')
  const dateSplit = dtSplit[0].split('-')
  const year = dateSplit[0]
  const day = dateSplit[2]
  const monthShortName = new Date(
    1,
    parseInt(dateSplit[1]) - 1
  ).toLocaleString('default', { month: 'long' }).slice(0, 3)
  const time = dtSplit[1].slice(0, 5)

  return full ? `${monthShortName} ${day} ${year}, ${time}` : `${monthShortName} ${day}, ${time}`
}

export default (props, emit, inputRefs) => {
  const store = useStore()

  const shipmentCreatingStatus = computed(() =>
    store.getters['mainPage/getShipmentCreatingStatus']
  )
  const details = () => { emit('details') }

  const {
    inputTo,
    inputFrom,
    spanArrival,
    inputArrival,
    spanDeparture,
    inputDeparture
  } = inputRefs

  const openArrivalPicker = () => { inputArrival.value.showPicker() }
  const openDeparturePicker = () => { inputDeparture.value.showPicker() }

  watch(inputArrival, (inputArrival) => {
    inputArrival.addEventListener('change', (e) => {
      spanArrival.value.innerText = formatDate(e.target.value)
    })
  })
  watch(inputDeparture, (inputDeparture) => {
    inputDeparture.addEventListener('change', (e) => {
      spanDeparture.value.innerText = formatDate(e.target.value)
    })
  })

  const schedule = () => {
    // TODO: add data validators
    emit(
      'schedule',
      {
        arrival_point: inputTo.value.value,
        arrival_dt: inputArrival.value.value,
        departure_point: inputFrom.value.value,
        departure_dt: inputDeparture.value.value
      }
    )
    inputTo.value.value = ''
    inputFrom.value.value = ''
    spanArrival.value.innerText = ''
    spanDeparture.value.innerText = ''
  }

  return {
    details,
    schedule,
    openArrivalPicker,
    openDeparturePicker,
    shipmentCreatingStatus
  }
}