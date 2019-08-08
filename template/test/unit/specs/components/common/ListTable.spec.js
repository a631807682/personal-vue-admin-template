import { createVue, destroyVM, Store, waitForEvent, waitImmediate, noop } from 'unit/utils'
import { SET_LOCAL_TOOLBAR_EXIST, SET_LOCAL_TOOLBAR_VISABLE } from 'src/store/mutation-types'

const toArray = function (obj) {
  return [].slice.call(obj)
}

const getTestData = function () {
  return {
    tableData: [{
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    }, {
      date: '2016-05-04',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1517 弄'
    }, {
      date: '2016-05-01',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1519 弄'
    }, {
      date: '2016-05-03',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1516 弄'
    }],
    fields: [{
      type: 'index'
    }, {
      prop: 'date',
      label: '日期',
      mobileDisplay: true
    }, {
      prop: 'name',
      label: '姓名',
      mobileDisplay: true
    }, {
      prop: 'address',
      label: '地址',
      mobileDisplay: true
    }]
  }
}

describe('ListTable', () => {
  describe('Mobile', () => {
    let vm
    const testDataArr = []

    getTestData().tableData.forEach(cur => {
      Object.keys(cur).forEach(prop => {
        testDataArr.push(cur[prop].toString())
      })
      testDataArr.push('')// 操作栏
    })

    const createMobileTable = function () {
      return createVue({
        template: `
        <c-list-table
          ref="listTable"
          :show-fields="fields"
          :get-page-data="getData">
          <template
            slot="table-column-control"
            slot-scope="{row}">
          </template>
        </c-list-table>
      `,
        data: getTestData,
        store: Store({
          getters: {
            isMobile: () => true,
            isCollapsed: () => true
          },
          mutations: {
            [SET_LOCAL_TOOLBAR_EXIST]: noop,
            [SET_LOCAL_TOOLBAR_VISABLE]: noop
          }
        }),
        methods: {
          getData () {
            return new Promise((resolve) => {
              resolve({
                count: this.tableData.length,
                rows: this.tableData
              })
            })
          }
        }
      }, true)
    }

    describe('Rendering data is correct', () => {
      vm = createMobileTable()
      before(async () => {
        await waitForEvent(vm.$refs.listTable, 'loaded')
      })

      after(() => {
        destroyVM(vm)
      })

      it('head', async () => {
        const ths = toArray(vm.$el.querySelectorAll('thead th'))
        expect(ths.map(node => node.textContent).filter(o => o))
          .to.eql(['日期', '姓名', '地址'])
      })

      it('row length', async () => {
        const rows = vm.$el.querySelectorAll('.el-table__row')
        expect(rows.length).to.equal(4)
      })

      it('row data', async () => {
        const cells = toArray(vm.$el.querySelectorAll('td .cell'))
          .map(node => node.textContent)

        expect(cells).to.eql(testDataArr)
      })
    })
  })

  describe('PC', () => {
    let vm
    const testDataArr = []

    getTestData().tableData.forEach((cur, index) => {
      testDataArr.push((index + 1).toString())// index
      Object.keys(cur).forEach(prop => {
        testDataArr.push(cur[prop].toString())
      })
      testDataArr.push('')// 操作栏
    })

    const createPCTable = function () {
      return createVue({
        template: `
        <c-list-table
          ref="listTable"
          :show-fields="fields"
          :get-page-data="getData">
          <template
            slot="table-column-control"
            slot-scope="{row}">
          </template>
        </c-list-table>
      `,
        data: getTestData,
        store: Store({
          getters: {
            isMobile: () => false
          },
          mutations: {
            [SET_LOCAL_TOOLBAR_EXIST]: noop
          }
        }),
        methods: {
          getData () {
            return new Promise((resolve) => {
              resolve({
                count: this.tableData.length,
                rows: this.tableData
              })
            })
          }
        }
      }, true)
    }

    afterEach(() => {
      destroyVM(vm)
    })

    describe('Rendering data is correct', () => {
      vm = createPCTable()

      it('head', async () => {
        const ths = toArray(vm.$el.querySelectorAll('thead th'))
        expect(ths.map(node => node.textContent).filter(o => o))
          .to.eql(['#', '日期', '姓名', '地址', '操作'])
      })

      it('row length', async () => {
        await waitImmediate()

        const rows = vm.$el.querySelectorAll('.el-table__row')
        expect(rows.length).to.equal(4)
      })

      it('row data', () => {
        const cells = toArray(vm.$el.querySelectorAll('td .cell'))
          .map(node => node.textContent)

        expect(cells).to.eql(testDataArr)
      })
    })
  })
})
