import { mainPage } from '../pages/mainPage'
import { shipmentPage } from '../pages/shipmentPage'

export default [
  {
    path: '/',
    component: mainPage,
    name: 'mainPage',
    props: true
  },
  {
    path: '/shipment/:id',
    component: shipmentPage,
    name: 'shipmentPage',
    props: true
  }
]
