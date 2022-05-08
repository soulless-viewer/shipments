<template>
  <div class="main-wrapper">
    <pageWrapper>
      <template v-slot:content>
        <template v-if="!shipmentsLoadingStatus">
          <scheduleItem @schedule="(data) => createShipment(data)" :editable="true" />
          <hr class="main__hr">
          <template v-for="shipment in shipments" :key="shipment.id">
            <scheduleItem
              @details="this.$router.push({
                name: 'shipmentPage',
                params: { id: shipment.id }
              })"
              :to="shipment.arrival_point"
              :from="shipment.departure_point"
              :arrival="shipment.arrival_dt"
              :departure="shipment.departure_dt"
            />
          </template>
          <resultPaginator
            :count="resultsCount"
            :current="pageNumber"
            :perPage="perPageCount"
            @changePage="(page) => changePage(page)"
          />
        </template>
        <template v-if="shipmentsLoadingStatus">
          <div class="main__spinner">
            <customSpinner />
          </div>
        </template>
      </template>
    </pageWrapper>
  </div>
</template>

<script>
import mainPage from '../../composable/mainPage'
import { customSpinner } from '../../components/customSpinner'
import { pageWrapper } from '../../components/pageWrapper'
import { scheduleItem } from '../../components/scheduleItem'
import { resultPaginator } from '../../components/resultPaginator'

export default {
  name: 'mainPage',
  components: {
    customSpinner,
    pageWrapper,
    scheduleItem,
    resultPaginator
  },
  setup () {
    const {
      shipments,
      changePage,
      pageNumber,
      resultsCount,
      perPageCount,
      createShipment,
      shipmentsLoadingStatus
    } = mainPage()

    return {
      shipments,
      changePage,
      pageNumber,
      resultsCount,
      perPageCount,
      createShipment,
      shipmentsLoadingStatus
    }
  }
}
</script>

<style lang='scss' src='./mainPage.scss'></style>
