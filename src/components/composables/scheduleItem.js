import { computed, watch, reactive } from 'vue'
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
    inputDeparture,
    inputArrivalModel,
    inputDepartureModel
  } = inputRefs

  const openArrivalPicker = () => { inputArrival.value.openMenu() }
  const openDeparturePicker = () => { inputDeparture.value.openMenu() }

  const contentUpdated = reactive({
    to: false,
    from: false,
    departure: false,
    arrival: false
  })
  const readyToSchedule = computed(() =>
    Object.values(contentUpdated).every((item) => item)
  )

  watch(inputTo, (inputTo) => {
    inputTo.addEventListener('change', (e) => { contentUpdated.to = true })
  })
  watch(inputFrom, (inputFrom) => {
    inputFrom.addEventListener('change', (e) => { contentUpdated.from = true })
  })
  watch(inputArrivalModel, (inputArrivalModel) => {
    contentUpdated.arrival = true
    spanArrival.value.innerText = formatDate(inputArrivalModel)
  })
  watch(inputDepartureModel, (inputDepartureModel) => {
    contentUpdated.departure = true
    spanDeparture.value.innerText = formatDate(inputDepartureModel)
  })

  const schedule = () => {
    // TODO: add data validators
    emit(
      'schedule',
      {
        arrival_point: inputTo.value.value,
        arrival_dt: inputArrivalModel.value,
        departure_point: inputFrom.value.value,
        departure_dt: inputDepartureModel.value
      }
    )
    inputTo.value.value = ''
    inputFrom.value.value = ''
    spanArrival.value.innerText = ''
    spanDeparture.value.innerText = ''
    contentUpdated.to = false
    contentUpdated.from = false
    contentUpdated.arrival = false
    contentUpdated.departure = false
  }

  return {
    details,
    schedule,
    readyToSchedule,
    openArrivalPicker,
    openDeparturePicker,
    shipmentCreatingStatus
  }
}
