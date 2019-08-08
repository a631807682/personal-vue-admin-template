<template>
  <div class="infinite-list">
    <el-table
      :data="tableData3"
      border
      class="infinite-table"
      style="width: 100%">
      <el-table-column type="index" />
      <el-table-column
        prop="date"
        label="Date" />
      <el-table-column
        prop="name"
        label="Name" />
      <el-table-column
        prop="address"
        label="Address" />
      <template slot="append">
        <div
          v-infinite-scroll="onInfinite"
          ref="infiniteLoading"
          infinite-scroll
          distance="10" />
      </template>
    </el-table>
  </div>
</template>
<script>
const item = {
  date: '2016-05-03',
  name: 'Tom',
  address: 'No. 189, Grove St, Los Angeles'
}

export default {
  data () {
    return {
      tableData3: new Array(6).fill(item)
    }
  },
  methods: {
    onInfinite () {
      setTimeout(() => {
        console.log('Loading more...')
        this.tableData3 = this.tableData3.concat(new Array(10).fill(item))
      }, 1000)
    }
  }
}

</script>
<style lang="scss" scoped>
.infinite-list {
/*
  padding: 0;
  margin: 0;
  list-style: none;*/
  border: 2px solid #000;
}
.infinite-table {
  max-height: 210px !important;
  overflow: auto;
}

.el-table::before{
  height: 0;
}

.el-table--border::after, .el-table--group::after {
  width: 0;
}

.el-table--border td, .el-table--border th, .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed {
    border-right: 2px solid #000;
}
.el-table td, .el-table th.is-leaf {
    border-bottom: 2px solid #000;
}

/*.infinite-list .infinite-list-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    background: #e8f3fe;
    margin: 10px;
    color: #7dbcfc;
}*/

</style>
