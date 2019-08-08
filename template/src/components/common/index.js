import Form from './form'
import ListTable from './listTable'

const components = [
  Form,
  ListTable
]

const install = (Vue) => {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

export default {
  install,
  Form,
  ListTable
}
