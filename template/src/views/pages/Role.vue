<template>
  <section>
    <!--工具条-->
    <el-col
      :span="24"
      class="toolbar">
      <el-button
        v-permission="'addBtn'"
        type="primary"
        class="fright"
        @click="handleOpenAdd">新增</el-button>
    </el-col>
    <!--列表-->
    <el-table
      :data="roles"
      highlight-current-row
      style="width: 100%;">
      <el-table-column
        prop="id"
        label="ID"
        fixed/>
      <el-table-column
        prop="name"
        label="角色名" />
      <el-table-column
        :formatter="dateTimeFormat"
        prop="createdAt"
        label="创建时间" />
      <el-table-column
        label="操作"
        width="150">
        <template slot-scope="scope">
          <el-button
            v-permission="'editBtn'"
            size="small"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            v-permission="'deleteBtn'"
            type="danger"
            size="small"
            @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--新增界面-->
    <el-dialog
      :visible.sync="addFormVisible"
      :before-close="closeAdd"
      title="新增">
      <el-form
        ref="addForm"
        :model="addForm"
        :rules="addFormRules"
        label-width="100px">
        <el-form-item
          label="角色名"
          prop="name">
          <el-input v-model="addForm.name"/>
        </el-form-item>
        <el-form-item
          label="可访问菜单"
          prop="menus">
          <menus
            :checks="addForm.menus"
            :check-change="handleAddCheckChange"/>
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
        label-width="100px">
        <el-form-item
          label="角色名"
          prop="name">
          <el-input v-model="editForm.name"/>
        </el-form-item>
        <el-form-item
          label="可访问菜单"
          prop="menus">
          <menus
            :checks="editForm.menus"
            :check-change="handleEditCheckChange"/>
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
import Menus from 'src/components/routeMenu/Tree'
import { roleService } from 'src/api'
import { dateTimeFormat } from 'src/lib/format'
export default {
  components: {
    Menus
  },
  data () {
    return {
      roles: [],
      // //新增界面
      addFormVisible: false,
      addForm: {
        name: '',
        menus: []
      },
      addFormRules: {
        name: [
          { required: true, type: 'string', message: '请输入角色名', trigger: 'blur' }
        ],
        menus: [
          { required: true, type: 'array', message: '选择权限', trigger: 'blur' }
        ]
      },
      // 编辑界面是否显示
      editFormVisible: false,
      // 编辑界面数据
      editForm: {
        id: 0,
        name: '',
        menus: [],
        defMenus: []
      },
      editFormRules: {
        name: [
          { required: true, type: 'string', message: '请输入角色名', trigger: 'blur' }
        ],
        menus: [
          { required: true, type: 'array', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getRoles()
  },
  methods: {
    dateTimeFormat,
    getRoles (page = 1) {
      roleService.getOperableRoles().then((res) => {
        this.roles = res
      })
    },
    handleOpenAdd () {
      this.addFormVisible = true
    },
    closeAdd () {
      this.addFormVisible = false
      this.$refs.addForm.resetFields() // 字段重置 移除校验结果
    },
    handleAddCheckChange (checkedKeys) {
      this.addForm.menus = checkedKeys
      console.log('handleAddCheckChange', checkedKeys)
    },
    addSubmit () {
      console.log(this.addForm)
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          let params = this.addForm
          roleService.addRole(params).then(() => {
            // 更新列表
            this.getRoles()
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
        roleService.deleteRole(row.id).then(() => {
          // 更新列表
          this.getRoles()
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
      this.editForm = Object.assign({}, row)
      console.log('handleEdit', this.editForm.menus)
    },
    closeEdit: function () {
      this.editFormVisible = false
      this.$refs.editForm.resetFields() // 字段重置 移除校验结果
    },
    handleEditCheckChange (checkedKeys) {
      this.editForm.menus = checkedKeys
      console.log('handleEditCheckChange', checkedKeys)
    },
    editSubmit: function () {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          let params = this.editForm
          console.log('editSubmit', params)
          roleService.updateRole(params).then(() => {
            // 更新列表
            this.getRoles()
            this.$message({
              message: '更新成功',
              type: 'success'
            })
            this.closeEdit()
          })
        }
      })
    }
  }
}

</script>
