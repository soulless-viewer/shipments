import gateway from '../../api/requests'

export default {
  namespaced: true,
  state: {
    shipments: [],
    pageNumber: 1,
    resultsCount: 0,
    perPageCount: 0,
    shipmentsLoadingMap: {},
    shipmentsUpdatingMap: {},
    shipmentsLoadingStatus: false,
    shipmentCreatingStatus: false,
    shipmentDeletingStatus: false
  },
  getters: {
    getResultsCount (state) {
      return state.resultsCount
    },
    getPageNumber (state) {
      return state.pageNumber
    },
    getPerPageCount (state) {
      return state.perPageCount
    },
    getShipments (state) {
      return state.shipments
    },
    getShipment: (state) => (id) => {
      id = parseInt(id)
      return state.shipments.find(
        item => item.id === id
      )
    },
    getShipmentsLoadingStatus (state) {
      return state.shipmentsLoadingStatus
    },
    getShipmentCreatingStatus (state) {
      return state.shipmentsCreatingStatus
    },
    getShipmentDeletingStatus (state) {
      return state.shipmentsDeletingStatus
    },
    getShipmentLoadingStatus: (state) => (id) => {
      return state.shipmentsLoadingMap[id]
    },
    getShipmentUpdatingStatus: (state) => (id) => {
      return state.shipmentsUpdatingMap[id]
    }
  },
  mutations: {
    UPDATE_RESULTS_COUNT (state, payload) {
      state.resultsCount = payload
    },
    UPDATE_PAGE_NUMBER (state, payload) {
      state.pageNumber = payload
    },
    UPDATE_PER_PAGE_COUNT (state, payload) {
      state.perPageCount = payload
    },
    UPDATE_SHIPMENTS (state, payload) {
      state.shipments = payload
    },
    UPDATE_SHIPMENT (state, payload) {
      const idx = state.shipments.findIndex(
        item => item.id === payload.id
      )
      if (idx > -1) {
        state.shipments[idx] = payload
      } else {
        state.shipments.push(payload)
      }
    },
    DELETE_SHIPMENT (state, id) {
      id = parseInt(id)
      const idx = state.shipments.findIndex(
        item => item.id === id
      )
      if (idx > -1) {
        state.shipments.splice(idx, 1)
      }
    },
    UPDATE_SHIPMENTS_LOADING_STATUS (state, payload) {
      state.shipmentsLoadingStatus = payload
    },
    UPDATE_SHIPMENT_CREATING_STATUS (state, payload) {
      state.shipmentsCreatingStatus = payload
    },
    UPDATE_SHIPMENT_DELETING_STATUS (state, payload) {
      state.shipmentsDeletingStatus = payload
    },
    UPDATE_SHIPMENT_LOADING_STATUS (state, { id, status }) {
      state.shipmentsLoadingMap[id] = !!status
    },
    UPDATE_SHIPMENT_UPDATING_STATUS (state, { id, status }) {
      state.shipmentsUpdatingMap[id] = status
    }
  },
  actions: {
    loadShipments (state, page = 1) {
      state.commit('UPDATE_SHIPMENTS_LOADING_STATUS', true)

      gateway(
        `/api/v1/shipment/?page=${page}`,
        'get'
      )
        .then(resp => {
          state.commit('UPDATE_RESULTS_COUNT', resp.data.count)
          state.commit('UPDATE_PAGE_NUMBER', resp.data.page)
          state.commit('UPDATE_PER_PAGE_COUNT', resp.data.page_size)
          state.commit('UPDATE_SHIPMENTS', resp.data.results)
        })
        .catch(err => { console.log(err) })
        .finally(() => state.commit('UPDATE_SHIPMENTS_LOADING_STATUS', false))
    },
    loadShipment (state, id) {
      state.commit('UPDATE_SHIPMENT_LOADING_STATUS', { id, status: true })
      gateway(
        `/api/v1/shipment/${id}/`,
        'get'
      )
        .then(resp => {
          state.commit('UPDATE_SHIPMENT', resp.data)
        })
        .catch(err => { console.log(err) })
        .finally(() => state.commit('UPDATE_SHIPMENT_LOADING_STATUS', { id, status: false }))
    },
    updateShipment (state, { id, data }) {
      state.commit('UPDATE_SHIPMENT_UPDATING_STATUS', { id, status: true })

      gateway(
        `/api/v1/shipment/${id}/`,
        'put',
        null,
        data
      )
        .then(resp => {
          state.commit('UPDATE_SHIPMENT', resp.data)
        })
        .catch(err => { console.log(err) })
        .finally(() => state.commit('UPDATE_SHIPMENT_UPDATING_STATUS', { id, status: false }))
    },
    createShipment (state, data) {
      state.commit('UPDATE_SHIPMENT_CREATING_STATUS', true)
      gateway(
        '/api/v1/shipment/',
        'post',
        null,
        data
      )
        .then(resp => {
          state.commit('UPDATE_SHIPMENT', resp.data)
        })
        .catch(err => { console.log(err) })
        .finally(() => state.commit('UPDATE_SHIPMENT_CREATING_STATUS', false))
    },
    deleteShipment (state, id) {
      state.commit('UPDATE_SHIPMENT_DELETING_STATUS', true)

      gateway(
        `/api/v1/shipment/${id}/`,
        'delete'
      )
        .then(resp => {
          state.commit('DELETE_SHIPMENT', resp.data)
        })
        .catch(err => { console.log(err) })
        .finally(() => state.commit('UPDATE_SHIPMENT_DELETING_STATUS', false))
    }
  }
}
