<template>
  <div>
    <el-table
      v-infinite-scroll="handleLoadMore"
      ref="table"
      :data="data"
      :border="tableBorder"
      :infinite-scroll-delay="300"
      highlight-current-row
      class="infinite-list"
      infinite-scroll-disabled="scroolDisabled"
      @cell-click="handleCellClick">
      <!-- 表格字段 -->
      <template
        v-for="(filed,index) of showFields"
        v-if="filed.mobileDisplay">
        <el-table-column
          v-if="filed.isSlot"
          :key="index"
          :label="filed.label"
          :type="filed.type">
          <template
            v-if="filed.isSlot"
            slot-scope="scope">
            <slot
              :name="`table-column-${filed.prop}-slot`"
              :row="scope.row"/>
          </template>
        </el-table-column>
        <el-table-column
          v-else
          :key="index"
          :prop="filed.prop"
          :label="filed.label"
          :formatter="filed.formatter"
          :width="filed.width"/>
      </template>
      <!-- 操作栏 -->
      <template>
        <el-table-column
          width="35"
          class-name="table-setting">
          <template slot-scope="scope">
            <i class="el-icon-setting"/>
          </template>
        </el-table-column>
        <template
          v-if="data.length!==0"
          slot="append">
          <div
            v-if="loading"
            class="el-table__empty-block">
            <span class="el-table__empty-text">
              <slot name="empty">加载中...</slot>
            </span>
          </div>
          <div
            v-else-if="noMore"
            class="el-table__empty-block">
            <span class="el-table__empty-text">
              <slot name="empty">没有更多内容</slot>
            </span>
          </div>
          <div
            v-else
            class="el-table__empty-block"
            @click="handleLoadMore">
            <span class="el-table__empty-text">
              <slot name="empty">加载更多</slot>
            </span>
          </div>
        </template>
      </template>
    </el-table>
    <el-dialog
      ref="dialog"
      :visible.sync="columnVisable"
      :title="columnTitle"
      class="vertical-center">
      <slot
        v-if="Object.keys(columnSoltRow).length>0"
        :row="columnSoltRow"
        name="table-column-control"/>
      <span
        slot="footer"
        class="dialog-footer"/>
    </el-dialog>
  </div>
</template>
<script>
import { SET_LOCAL_TOOLBAR_VISABLE } from 'src/store/mutation-types'
export default {
  props: {
    getPageData: {
      type: Function,
      default: () => {
        return new Promise((resolve) => {
          return {
            count: 0,
            rows: []
          }
        })
      }
    },
    showFields: {
      type: Array,
      required: true
    },
    controlTipsProp: {
      type: String,
      default: ''
    },
    paginationLimit: {
      type: Number,
      default: 10
    },
    tableBorder: {
      type: Boolean,
      default: false
    },
    cursorKey: {
      type: String,
      default: 'createdAt'
    },
    cursorFilter: {
      type: Function,
      default: (val) => val
    },
    columnCtrlRefHandle: {
      type: Function,
      default: () => {}
    },
    columnCtrlErrorMessage: {
      type: String,
      default: '没有权限'
    }
  },
  data () {
    return {
      limit: 12,
      data: [],
      loading: false,
      // 列弹出层
      columnVisable: false,
      columnSoltRow: {},
      cursorVal: '',
      noMore: false
    }
  },
  computed: {
    columnTitle () {
      let pre = '操作 '
      let title = this.columnSoltRow[this.controlTipsProp]
      return title ? pre + title : pre
    },
    scroolDisabled () {
      return this.loading || this.noMore || !this.isCollapsed
    },
    isCollapsed () {
      return this.$store.getters.isCollapsed
    }
  },
  watch: {
    isCollapsed (val) {
      if (val) {
        // [bug] See https://github.com/ElemeFE/element/pull/16681
        // 触发组件infiniteScroll的scroll事件进行计算
        this.$refs.table.$el.dispatchEvent(new CustomEvent('scroll'))
      }
    }
  },
  mounted () {
    // [bug] See https://github.com/ElemeFE/element/pull/16813
    this.$refs.dialog.rendered = true
  },
  beforeDestroy () {
    this.$store.commit(SET_LOCAL_TOOLBAR_VISABLE, false)
  },
  methods: {
    handleGetPageData (limit, refresh, cursorAble) {
      this.loading = true

      let search = {}
      if (cursorAble && this.data.length > 0) {
        let lastCursor = this.data[this.data.length - 1][this.cursorKey]
        if (lastCursor) {
          search = {
            // cursorAble: true,
            [this.cursorKey]: this.cursorFilter(lastCursor)
          }
        }
      }
      return this.getPageData(1, limit, search)
        .then(({count, rows}) => {
          this.total = count
          if (refresh) {
            this.data = rows
          } else {
            this.data = this.data.concat(rows)
          }

          this.noMore = count === rows.length
        }).finally(() => {
          this.columnVisable = false
          this.loading = false
        })
    },
    handleLoadMore () {
      // console.log('load more')
      this.handleGetPageData(this.limit, false, true).then(() => {
        this.$emit('loaded')
      })
    },
    handleCellClick (row, column, cell) {
      this.columnSoltRow = row
      if (column.property || column.label) {
        this.$nextTick(() => {
          let ctrlRef = this.columnCtrlRefHandle()
          if (ctrlRef && ctrlRef._isVue) {
            ctrlRef.$emit('click')
          } else {
            this.$message({
              message: this.columnCtrlErrorMessage,
              type: 'warning'
            })
          }
        })
      } else {
        this.columnVisable = true
      }
    },
    refresh () {
      this.handleGetPageData(this.limit, true, false)
    },
    reloadDataByTotal (addTotal) {
      let tempLimit = this.data.length + addTotal
      tempLimit = this.limit > tempLimit ? this.limit : tempLimit
      this.handleGetPageData(tempLimit, true, false)
    }
  }
}
</script>
<style lang="scss" scoped>
.empty {
  padding:15px 0;
}

</style>
<style lang="scss">
.infinite-list {
  width: 100%;
  max-height: 80vh;
  overflow: auto;
}

.infinite-list::-webkit-scrollbar {
  width: 0px;
  background: transparent;
}

.infinite-list::-webkit-scrollbar-thumb {
  background: #FF0000;
}
</style>
