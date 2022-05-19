<template>
  <div class="schedule-item__wrapper">
    <div class="schedule-item">

      <div class="schedule-item__section">
        <div class="schedule-item__section__text">
          <span class="schedule-item__section__text__label">From</span>
          <input
            v-if="editable"
            class="schedule-item__section__text__input"
            ref="inputFrom" required="true"
            type="text" name="from" :placeholder="from"
          />
          <span v-if="!editable" class="schedule-item__section__text__value">{{ from }}</span>
        </div>
        <span class="schedule-item__section__icon schedule-item__section__icon--datetime-to">
          <userIcon name="iconDeparture"/>
        </span>
      </div>

      <div class="schedule-item__section">
        <div class="schedule-item__section__text">
          <span class="schedule-item__section__text__label">To</span>
          <input
            v-if="editable"
            class="schedule-item__section__text__input"
            ref="inputTo" required="true"
            type="text" name="from" :placeholder="to"
          />
          <span v-if="!editable" class="schedule-item__section__text__value">{{ to }}</span>
        </div>
        <span class="schedule-item__section__icon schedule-item__section__icon--datetime-to">
          <userIcon name="iconArrival"/>
        </span>
      </div>

      <div class="schedule-item__section">
        <div class="schedule-item__section__text">
          <span id="departureInputSpan" class="schedule-item__section__text__label">Departure</span>
          <Datepicker
            v-if="editable"
            ref="inputDeparture"
            v-model="inputDepartureModel"
            :hideInputIcon="true"
            utc
            inputClassName="schedule-item__section__text__input--datetime"
          />
          <span ref="spanDeparture"
            class="schedule-item__section__text__value--datetime"
          >{{ editable ? '' : formatDate(departure) }}</span>
        </div>
        <span @click="editable ? openDeparturePicker() : null"
          class="schedule-item__section__icon schedule-item__section__icon--datetime-to">
          <userIcon name="iconDatetimeDeparture"/>
        </span>
      </div>

      <div class="schedule-item__section">
        <div class="schedule-item__section__text">
          <span class="schedule-item__section__text__label">Arrival</span>
          <Datepicker
            v-if="editable"
            ref="inputArrival"
            v-model="inputArrivalModel"
            :hideInputIcon="true"
            utc
            inputClassName="schedule-item__section__text__input--datetime"
          />
          <span ref="spanArrival"
            class="schedule-item__section__text__value--datetime"
          >{{ editable ? '' : formatDate(arrival) }}</span>
        </div>
        <span @click="editable ? openArrivalPicker() : null"
          class="schedule-item__section__icon schedule-item__section__icon--datetime-to">
          <userIcon name="iconDatetimeArrival"/>
        </span>
      </div>

      <div class="schedule-item__section">
        <customButton
          v-if="!editable"
          @click="details()"
          class="schedule-item__section__button"
          theme_color="grey-theme">
          {{ "Details" }}
        </customButton>
        <customButton
          v-if="editable && !shipmentCreatingStatus"
          @click="readyToSchedule ? schedule() : null"
          class="schedule-item__section__button"
          :theme_color="readyToSchedule ? 'green-theme' : 'grey-theme'">
          {{ "Schedule" }}
        </customButton>
        <customButton
          v-if="editable && shipmentCreatingStatus"
          class="schedule-item__section__button"
          theme_color="green-theme">
          <customSpinner size="25px" color="#fff"/>
        </customButton>
      </div>
    </div>
  </div>
</template>

<script>
import scheduleItem, { formatDate } from '../composables/scheduleItem'
import Datepicker from '@vuepic/vue-datepicker'
import './datetimePicker.css'
import { customSpinner } from '../customSpinner'
import { customButton } from '../customButton'
import { userIcon } from '../../icons'
import { ref } from 'vue'

export default {
  name: 'scheduleItem',
  components: {
    customButton,
    customSpinner,
    Datepicker,
    userIcon
  },
  emits: ['schedule', 'details'],
  props: {
    editable: {
      type: Boolean,
      default: false
    },
    from: {
      type: String,
      default: 'Minsk'
    },
    to: {
      type: String,
      default: 'London'
    },
    departure: {
      type: String,
      default: '2020-01-01T12:12:12Z'
    },
    arrival: {
      type: String,
      default: '2020-01-02T13:13:13Z'
    }
  },
  setup (props, { emit }) {
    const inputTo = ref(null)
    const inputFrom = ref(null)
    const spanArrival = ref(null)
    const inputArrival = ref(null)
    const spanDeparture = ref(null)
    const inputDeparture = ref(null)

    const inputArrivalModel = ref()
    const inputDepartureModel = ref()

    const {
      details,
      schedule,
      readyToSchedule,
      openArrivalPicker,
      openDeparturePicker,
      shipmentCreatingStatus
    } = scheduleItem(
      props,
      emit,
      {
        inputTo,
        inputFrom,
        spanArrival,
        inputArrival,
        spanDeparture,
        inputDeparture,
        inputArrivalModel,
        inputDepartureModel
      }
    )

    return {
      details,
      schedule,
      readyToSchedule,
      formatDate,
      inputTo,
      inputFrom,
      spanArrival,
      inputArrival,
      spanDeparture,
      inputDeparture,
      inputArrivalModel,
      inputDepartureModel,
      openArrivalPicker,
      openDeparturePicker,
      shipmentCreatingStatus
    }
  }
}
</script>

<style lang="scss" src="./scheduleItem.scss" scoped></style>
