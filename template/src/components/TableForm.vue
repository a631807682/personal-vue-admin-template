<template>
  <section>
    <el-table
      :data="tfData"
      v-bind="$attrs"
      row-class-name="tf-row">
      <slot />
      <el-table-column
        label="操作"
        width="80">
        <template slot-scope="scope">
          <el-button
            type="danger"
            icon="el-icon-delete"
            @click="handleDel(scope.$index)" />
        </template>
      </el-table-column>
      <template slot="append">
        <el-button
          class="btn-add"
          @click="handleAdd">
          <i class="el-icon-plus"/>
          <span>新增一条记录</span>
        </el-button>
      </template>
    </el-table>
  </section>
</template>
<script>
import { deepCopy } from 'src/lib/utils'

export default {
  props: {
    data: {
      type: Array,
      required: true
    },
    emptyRow: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {
    tfData: {
      get () {
        return this.data
      },
      set (val) {
        this.$emit('update:data', val)
      }
    }
  },
  methods: {
    deepCopy,
    handleAdd () {
      let emptyRow = this.deepCopy(this.emptyRow)
      this.tfData.push(emptyRow)
    },
    handleDel (index) {
      this.tfData.splice(index, 1)
    }
  }
}

</script>
<style scoped lang="scss">
.btn-add {
  width: 100%;
  border-radius: 0;
}

</style>
<!--不编译row-class-name指定名称-->
<style lang="scss">
.tf-row {
  .cell {
    padding: 15px 10px
  }
}

</style>
