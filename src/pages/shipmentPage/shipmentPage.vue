<template>
  <div class="shipment-wrapper">
    <pageWrapper title="Main / Shipment detail">
      <template v-slot:content>
        <template v-if="!shipmentLoadingStatus && shipment">
          <div class="shipment">
            <div class="shipment__background">

              <div class="shipment__background__column">
                <div class="shipment__background__column__row">
                  <div class="shipment__background__column__row__label">
                    <label>ID</label>
                  </div>
                  <div class="shipment__background__column__row__span">
                    <span>{{ $route.params.id }}</span>
                  </div>
                </div>
                <div class="shipment__background__column__row">
                  <div class="shipment__background__column__row__label">
                    <label for="shipment-input--from">From</label>
                  </div>
                  <div class="shipment__background__column__row__input">
                    <input
                      ref="inputFrom"
                      class="shipment__input"
                      type="text"
                      name="shipment-input--from"
                      v-model="shipment.departure_point">
                  </div>
                </div>
                <div class="shipment__background__column__row">
                  <div class="shipment__background__column__row__label">
                    <label for="shipment-input--to">To</label>
                  </div>
                  <div class="shipment__background__column__row__input">
                    <input
                      ref="inputTo"
                      class="shipment__input"
                      type="text"
                      name="shipment-input--to"
                      v-model="shipment.arrival_point">
                  </div>
                </div>
                <div class="shipment__background__column__row">
                  <div class="shipment__background__column__row__buttons">
                    <customButton
                      v-if="!shipmentUpdatingStatus"
                      @click="contentUpdated ? updateShipment() : null"
                      class="shipment__background__column__row__button"
                      :theme_color="contentUpdated ? 'green-theme' : 'grey-theme'">
                      {{ "Save" }}
                    </customButton>
                    <customButton
                      v-if="shipmentUpdatingStatus"
                      class="shipment__background__column__row__button"
                      theme_color="green-theme">
                      <customSpinner size="25px" color="#fff"/>
                    </customButton>
                  </div>
                </div>
              </div>

              <div class="shipment__background__column">
                <div class="shipment__background__column__row">
                  <div class="shipment__background__column__row__label">
                    <label for="shipment-input--departure">Departure</label>
                  </div>
                  <div class="shipment__background__column__row__input">
                    <input
                      class="shipment__input--datetime"
                      ref="inputDeparture"
                      type="datetime-local"
                      :value="shipment.departure_dt.slice(0, -1)"
                    />
                    <div class="shipment__input__span">
                      <span ref="spanDeparture">
                        {{ formatDate(shipment.departure_dt, true) }}
                      </span>
                      <span @click="openDeparturePicker()"
                      class="shipment__input__icon">
                      <userIcon name="iconDatetimeDeparture"/>
                    </span>
                    </div>
                  </div>
                </div>
                <div class="shipment__background__column__row">
                  <div class="shipment__background__column__row__label">
                    <label for="shipment-input--arrival">Arrival</label>
                  </div>
                  <div class="shipment__background__column__row__input">
                    <input
                      class="shipment__input--datetime"
                      ref="inputArrival"
                      type="datetime-local"
                      :value="shipment.arrival_dt.slice(0, -1)"
                    />
                    <div class="shipment__input__span">
                      <span ref="spanArrival">
                        {{ formatDate(shipment.arrival_dt, true) }}
                      </span>
                      <span @click="openArrivalPicker()"
                      class="shipment__input__icon">
                      <userIcon name="iconDatetimeArrival"/>
                    </span>
                    </div>
                  </div>
                </div>
                <div class="shipment__background__column__row">
                  <div class="shipment__background__column__row__label">
                    <label for="shipment-input--arrival">Cargo volume, kg</label>
                  </div>
                  <div class="shipment__background__column__row__input">
                    <input
                      ref="inputVolume"
                      class="shipment__input"
                      type="text"
                      name="shipment-input--volume"
                      v-model="shipment.cargo_volume">
                  </div>
                </div>
                <div class="shipment__background__column__row">
                  <div class="shipment__background__column__row__buttons">
                    <customButton
                      v-if="!shipmentDeletingStatus"
                      @click="deleteShipment()"
                      class="shipment__background__column__row__button"
                      theme_color="red-theme">
                      {{ "Delete" }}
                    </customButton>
                    <customButton
                      v-if="shipmentDeletingStatus"
                      class="shipment__background__column__row__button"
                      theme_color="red-theme">
                      <customSpinner size="25px" color="#fff"/>
                    </customButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template v-if="shipmentLoadingStatus">
          <div class="shipment__spinner">
            <customSpinner />
          </div>
        </template>
        <template v-if="!shipment">
          <div class="shipment__not-found">
            <h2>Not found</h2>
          </div>
        </template>
      </template>
    </pageWrapper>
  </div>
</template>

<script>
import { ref } from 'vue'
import { userIcon } from '../../icons'
import { customButton } from '../../components/customButton'
import { customSpinner } from '../../components/customSpinner'
import shipmentPage from '../../components/composables/shipmentPage'
import { pageWrapper } from '../../components/pageWrapper'

export default {
  name: 'shipmentPage',
  components: {
    userIcon,
    customButton,
    customSpinner,
    pageWrapper
  },
  setup (props, { emit }) {
    const inputTo = ref(null)
    const inputFrom = ref(null)
    const inputVolume = ref(null)
    const spanArrival = ref(null)
    const inputArrival = ref(null)
    const spanDeparture = ref(null)
    const inputDeparture = ref(null)

    const {
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
    } = shipmentPage(
      props,
      emit,
      {
        inputTo,
        inputFrom,
        inputVolume,
        spanArrival,
        inputArrival,
        spanDeparture,
        inputDeparture
      }
    )

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
      openDeparturePicker,
      inputTo,
      inputFrom,
      inputVolume,
      spanArrival,
      inputArrival,
      spanDeparture,
      inputDeparture
    }
  }
}
</script>

<style lang='scss' src='./shipmentPage.scss'></style>
