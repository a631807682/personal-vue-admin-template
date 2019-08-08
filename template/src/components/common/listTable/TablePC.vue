<template>
  <div>
    <el-table
      :data="data"
      highlight-current-row
      class="w100">
      <!-- 表格字段 -->
      <template
        v-for="(filed,index) of showFields">
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
          :width="filed.width"
          :type="filed.type"/>
      </template>
      <!-- 操作栏 -->
      <el-table-column
        label="操作"
        width="180">
        <template slot-scope="scope">
          <slot
            :row="scope.row"
            name="table-column-control" />
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-col
      :span="24"
      :class="paginationClass">
      <el-pagination
        :current-page.sync="page"
        :page-size="limit"
        :total="total"
        layout="prev, pager, next"
        background
        style="float:right;"
        @current-change="getDataByPage"/>
    </el-col>
  </div>
</template>
<script >
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
    paginationClass: {
      type: String,
      default: 'toolbar'
    },
    paginationLimit: {
      type: Number,
      default: 10
    }
  },
  data () {
    return {
      page: 1,
      limit: 0,
      total: 0,
      data: []
    }
  },
  created () {
    this.limit = this.paginationLimit
    this.getDataByPage()
  },
  methods: {
    getDataByPage () {
      let p = this.getPageData(this.page, this.limit)
      if (!p.then) throw new Error('get-page-data dose not return Promise')
      return p.then(({count, rows}) => {
        if (!Number.isInteger(count) || !Array.isArray(rows)) {
          throw new Error(`get-page-data return is not available: 
                count type: ${Object.prototype.toString.call(count)}
                rows type: ${Object.prototype.toString.call(rows)}
              `)
        }
        this.total = count
        this.data = rows

        this.$emit('loaded')
      })
    },
    reloadDataByTotal (addTotal) {
      let pageCount = Math.ceil((this.total + addTotal) / this.limit)
      let page = this.page > pageCount ? pageCount : this.page
      this.page = page > 0 ? page : 1

      this.getDataByPage()
    }
  }
}
</script>
