<template>
  <div>
    <c-list-table
      ref="listTable"
      :show-fields="fields"
      :get-page-data="getUsers"
      :column-ctrl-ref-handle="handleCtrlRef.bind(this)"
      column-ctrl-error-message="没有编辑权限">
      <template slot="toolbar">
        <div class="fright">
          <router-link
            to="/system/user/add"
            class="fright">
            <el-button type="primary">新增</el-button>
          </router-link>
        </div>
      </template>
      <template
        slot="table-column-control"
        slot-scope="{row}">
        <div v-if="row.role&&!row.role.isSuper">
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
        </div>
      </template>
    </c-list-table>
  </div>
</template>
<script>
import { userService } from 'src/api'
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
        prop: 'username',
        label: '用户邮箱',
        mobileDisplay: true
      }, {
        prop: 'role.name',
        label: '用户角色',
        mobileDisplay: true
      }, {
        prop: 'lastLoginDate',
        label: '最后登录时间',
        formatter: dateTimeFormat
      }, {
        prop: 'createdAt',
        label: '创建时间',
        formatter: dateTimeFormat
      }],
      controlTipsProp: 'username'
    }
  },
  methods: {
    getUsers (page, limit, cursorSearch) {
      return userService.getUsers(page, limit, cursorSearch)
        .then(({count, rows}) => {
          return {
            count: count - 1,
            rows
          }
        })
    },
    handleEdit (id) {
      this.$router.push(`/system/user/edit/${id}`)
    },
    handleDel (id) {
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        userService.deleteUser(id).then(() => {
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
