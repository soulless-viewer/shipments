import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import axios from 'axios'

import mainPageStore from '../../store/modules/mainPage'
import scheduleItem from './scheduleItem.vue'

jest.mock("axios", () => (
  jest.fn(() => new Promise((resolve) => {
    resolve({})
  }))
))

const store = createStore({
  modules: {
      mainPage: mainPageStore
  }
})

const defaultProps = {
  editable: true,
  to: 'London',
  from: 'Minsk',
  arrival: '2021-12-13T13:13:13+000Z',
  departure: '2021-12-12T12:12:12+000Z'
}

describe('"scheduleItem" component', () => {
  it('Button is clickable only when inputs filled', async () => {
    const wrapper = mount(
      scheduleItem, {
        global: { plugins: [store] },
        propsData: defaultProps
      }
    )

    const scheduleItemSections = wrapper
      .findAll('.schedule-item__section')
    const scheduleButton = scheduleItemSections
      .at(-1)
      .find('button')
    const scheduleFrom = scheduleItemSections
      .at(0)
      .find('input')
    const scheduleTo = scheduleItemSections
      .at(1)
      .find('input')
    const scheduleDeparture = scheduleItemSections
      .at(2)
      .find('input')
    const scheduleArrival = scheduleItemSections
      .at(3)
      .find('input')

    await scheduleButton.trigger('click')
    expect(wrapper.emitted().schedule).toBe(undefined)

    scheduleFrom.element.value = defaultProps.from
    await scheduleFrom.trigger('change')

    scheduleTo.element.value = defaultProps.to
    await scheduleTo.trigger('change')

    scheduleDeparture.element.value = defaultProps.departure.slice(0, -5)
    await scheduleDeparture.trigger('change')

    scheduleArrival.element.value = defaultProps.arrival.slice(0, -5)
    await scheduleArrival.trigger('change')

    await scheduleButton.trigger('click')
    await scheduleButton.trigger('click')
    expect(wrapper.emitted().schedule.length).toBe(1)
  })
})
