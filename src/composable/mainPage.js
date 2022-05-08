import { computed } from 'vue'
import { useStore } from 'vuex'

export default (props) => {
  const store = useStore()

  store.dispatch('mainPage/loadShipments')

  const shipments = computed(() => store.getters['mainPage/getShipments'])
  const pageNumber = computed(() => store.getters['mainPage/getPageNumber'])
  const resultsCount = computed(() => store.getters['mainPage/getResultsCount'])
  const perPageCount = computed(() => store.getters['mainPage/getPerPageCount'])
  const changePage = (page) => { store.dispatch('mainPage/loadShipments', page) }
  const createShipment = (data) => { store.dispatch('mainPage/createShipment', data) }
  const shipmentsLoadingStatus = computed(() => store.getters['mainPage/getShipmentsLoadingStatus'])

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
