<template>
  <section>
    <!--工具条-->
    <el-col
      :span="24"
      class="toolbar">
      <el-button
        v-permission="'addBtn'"
        class="fright"
        type="primary"
        @click="handleAdd">新增</el-button>
    </el-col>
    <!--列表-->
    <el-table
      :data="users"
      highlight-current-row
      style="width: 100%;">
      <el-table-column
        prop="id"
        label="ID"
        fixed/>
      <el-table-column
        prop="username"
        label="用户邮箱"/>
      <el-table-column
        prop="role.name"
        label="用户角色"/>
      <el-table-column
        :formatter="dateTimeFormat"
        prop="lastLoginDate"
        label="最后登录时间"/>
      <el-table-column
        :formatter="dateTimeFormat"
        prop="createdAt"
        label="创建时间"
        sortable/>
      <el-table-column
        label="操作"
        width="150">
        <template slot-scope="scope">
          <div v-if="!scope.row.role.isSuper">
            <el-button
              v-permission="'editBtn'"
              size="small"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              v-permission="'deleteBtn'"
              type="danger"
              size="small"
              @click="handleDel(scope.$index, scope.row)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-col
      :span="24"
      class="toolbar">
      <el-pagination
        :current-page.sync="page"
        :page-size="limit"
        :total="total"
        layout="prev, pager, next"
        background
        style="float:right;"
        @current-change="handleCurrentChange"/>
    </el-col>
    <!--新增界面-->
    <el-dialog
      :visible.sync="addFormVisible"
      :before-close="closeAdd"
      title="新增">
      <el-form
        ref="addForm"
        :model="addForm"
        :rules="addFormRules"
        label-width="80px">
        <el-form-item
          label="用户邮箱"
          prop="username">
          <el-input v-model="addForm.username"/>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password">
          <el-input
            v-model="addForm.password"
            type="password"/>
        </el-form-item>
        <el-form-item
          label="角色"
          prop="roleId">
          <el-select
            v-model="addForm.roleId"
            placeholder="请选择">
            <el-option
              v-for="item in roles"
              :key="item.id"
              :label="item.name"
              :value="item.id"/>
          </el-select>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer">
        <el-button @click.native="closeAdd">取消</el-button>
        <el-button
          type="primary"
          @click.native="addSubmit">提交</el-button>
      </div>
    </el-dialog>
    <!--编辑界面-->
    <el-dialog
      :visible.sync="editFormVisible"
      :before-close="closeEdit"
      title="编辑">
      <el-form
        ref="editForm"
        :model="editForm"
        :rules="editFormRules"
        label-width="80px">
        <el-tabs
          v-model="editFormActive"
          type="card"
          @tab-click="handleEditActiveClick">
          <el-tab-pane
            label="角色管理"
            name="role"/>
          <el-tab-pane
            label="密码管理"
            name="password"/>
        </el-tabs>
        <el-form-item
          label="用户邮箱"
          prop="type">
          <el-input
            v-model="editForm.username"
            readonly/>
        </el-form-item>
        <el-form-item
          v-if="editFormActive==='password'"
          key="password"
          label="密码"
          prop="password">
          <el-input
            v-model="editForm.password"
            type="password"/>
        </el-form-item>
        <el-form-item
          v-else
          label="角色"
          prop="roleId">
          <el-select
            key="role"
            v-model="editForm.roleId"
            placeholder="请选择">
            <el-option
              v-for="item in roles"
              :key="item.id"
              :label="item.name"
              :value="item.id"/>
          </el-select>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer">
        <el-button @click.native="closeEdit">取消</el-button>
        <el-button
          type="primary"
          @click.native="editSubmit">提交</el-button>
      </div>
    </el-dialog>
  </section>
</template>
<script>
import { userService, roleService } from 'src/api'
import { dateTimeFormat } from 'src/lib/format'
export default {
  data () {
    return {
      users: [],
      roles: [],
      // 分页
      total: 0,
      page: 1,
      limit: 10,
      // 新增界面
      addFormVisible: false,
      addForm: {
        username: '',
        password: '',
        roleId: ''
      },
      addFormRules: {
        username: [
          { required: true, type: 'email', message: '请输入用户邮箱', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        roleId: [
          { required: true, type: 'number', message: '请选择角色', trigger: 'blur' }
        ]
      },
      // 编辑界面是否显示
      editFormVisible: false,
      editFormActive: 'role',
      // 编辑界面数据
      editForm: {
        id: 0,
        username: '',
        password: '',
        roleId: ''
      },
      editFormRules: {
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        roleId: [
          { required: true, type: 'number', message: '请选择角色', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.getUsers()
    this.getRoles()
  },
  methods: {
    dateTimeFormat,
    getUsers () {
      userService.getUsers(this.page, this.limit).then((res) => {
        this.total = res.count
        this.users = res.rows
      })
    },
    getRoles () {
      roleService.getOperableRoles().then(res => {
        this.roles = res
      })
    },
    handleCurrentChange (page) {
      this.getUsers()
    },
    handleAdd () {
      this.addFormVisible = true
    },
    closeAdd: function () {
      this.addFormVisible = false
      this.$refs.addForm.resetFields() // 字段重置 移除校验结果
    },
    addSubmit () {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          let params = this.addForm
          userService.addUser(params).then(() => {
            // 更新列表
            this.getUsers()
            this.$message({
              message: '提交成功',
              type: 'success'
            })
            this.closeAdd()
          })
        }
      })
    },
    // 删除
    handleDel: function (index, row) {
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        userService.deleteUser(row.id).then(() => {
          let pageCount = Math.ceil((this.total - 1) / this.limit)
          let page = this.page > pageCount ? pageCount : this.page
          this.page = page > 0 ? page : 1
          // 更新列表
          this.getUsers()
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        })
      }).catch(() => {})
    },
    // 显示编辑界面
    handleEdit: function (index, row) {
      this.editFormVisible = true
      this.editForm = Object.assign({}, row, { roleId: row.role.id })
    },
    closeEdit: function () {
      this.editFormVisible = false
      this.$refs.editForm.resetFields() // 字段重置 移除校验结果
    },
    editSubmit: function (actived) {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          let params = this.editForm
          let updateUser = this.editFormActive === 'password' ? userService.updataUserPassword : userService.updataUserRole
          updateUser(params).then(() => {
            // 更新列表
            this.getUsers()
            this.$message({
              message: '更新成功',
              type: 'success'
            })
            this.closeEdit()
          })
        }
      })
    },
    handleEditActiveClick () {

    }
  }
}

</script>
