<template>
  <div>
    <c-list-table
      ref="listTable"
      :show-fields="fields"
      :get-page-data="getRoles"
      :column-ctrl-ref-handle="handleCtrlRef.bind(this)"
      column-ctrl-error-message="没有编辑权限">
      <template slot="toolbar">
        <div class="fright">
          <router-link
            to="/system/role/add"
            class="fright">
            <el-button type="primary">新增</el-button>
          </router-link>
        </div>
      </template>
      <template
        slot="table-column-control"
        slot-scope="{row}">
        <el-button
          v-permission="'editBtn'"
          ref="defColumnCtrl"
          size="small"
          @click="handleEdit(row.id)">编辑</el-button>
        <el-button
          v-permission="'deleteBtn'"
          type="danger"
          size="small"
          @click="handleDel(row.id)">删除</el-button>
      </template>
    </c-list-table>
  </div>
</template>
<script>
import { roleService } from 'src/api'
import { dateTimeFormat } from 'src/lib/format'
export default {
  data () {
    return {
      fields: [{
        prop: 'id',
        label: 'ID',
        width: '50px',
        mobileDisplay: true
      }, {
        prop: 'name',
        label: '角色名',
        mobileDisplay: true
      }, {
        prop: 'createdAt',
        label: '创建时间',
        formatter: dateTimeFormat,
        mobileDisplay: true
      }]
    }
  },
  methods: {
    getRoles (page, limit, cursorSearch = {}) {
      return roleService.getPageOperableRoles(page, limit, cursorSearch)
    },
    handleEdit (id) {
      this.$router.push(`/system/role/edit/${id}`)
    },
    handleDel (id) {
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        roleService.deleteRole(id).then(() => {
          this.$refs.listTable.reloadDataByTotal(-1)
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        })
      }).catch(() => {})
    },
    handleCtrlRef () {
      return this.$refs.defColumnCtrl
    }
  }
}

</script>
