import { createVue, destroyVM, Store, noop } from 'unit/utils'
import ErrorNotify from 'src/components/ErrorNotify'

describe('ErrorNotify', () => {
  let vm
  let store

  beforeEach(() => {
    store = Store({
      modules: {
        error: {}
      },
      actions: {
        clearError: noop
      }
    })
  })

  afterEach(() => {
    destroyVM(vm)
  })

  it('notify error', () => {
    vm = createVue({
      template: `
        <error-notify ref="notify"/>
      `,
      components: {
        ErrorNotify
      },
      store
    }, true)

    const error = 'my error'
    const notifyVm = vm.$refs.notify
    vm.$store.state.error = { error }
    expect(notifyVm.notify).to.equal(error)
  })
})
