<template>
  <div>
    <c-form>
      <template slot="toolbar">
        <el-button
          type="primary"
          @click="saveSubmit()">保存</el-button>
      </template>
      <template slot="content">
        <el-form
          ref="form"
          :model="form"
          :rules="formRules"
          label-width="100px">
          <el-tabs
            v-model="formActive"
            type="card">
            <el-tab-pane
              label="角色管理"
              name="role" />
            <el-tab-pane
              label="密码管理"
              name="password" />
          </el-tabs>
          <el-form-item
            label="用户邮箱"
            prop="type">
            <el-input
              v-model="form.username"
              readonly />
          </el-form-item>
          <el-form-item
            v-if="formActive==='password'"
            key="password"
            label="密码"
            prop="password">
            <el-input
              v-model="form.password"
              type="password" />
          </el-form-item>
          <el-form-item
            v-else
            label="角色"
            prop="roleId">
            <el-select
              key="role"
              v-model="form.role.id"
              placeholder="请选择">
              <el-option
                v-for="item in roles"
                :key="item.id"
                :label="item.name"
                :value="item.id" />
            </el-select>
          </el-form-item>
        </el-form>
      </template>
    </c-form>
  </div>
</template>
<script>
import { userService, roleService } from 'src/api'
export default {
  data () {
    const validatePass = (rule, value, callback) => {
      if (!value && this.formActive === 'password') {
        callback(new Error('请输入密码'))
      }
      callback()
    }

    return {
      id: this.$route.params.id,
      formActive: 'role',
      roles: [],
      form: {
        id: 0,
        username: '',
        password: '',
        roleId: '',
        role: {}
      },
      formRules: {
        password: [
          {validator: validatePass, trigger: 'blur'}
        ],
        'role.id': [
          { required: true, type: 'number', message: '请选择角色', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getRoles()
    this.getUser()
  },
  methods: {
    getRoles () {
      roleService.getOperableRoles().then(res => {
        this.roles = res
      })
    },
    getUser () {
      userService.getUser(this.id).then(res => {
        this.form = res
      })
    },
    gotoList () {
      this.$router.push('/system/user/list')
    },
    saveSubmit: function (actived) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          let params = this.form
          params.roleId = this.form.role.id
          let updateUser = this.formActive === 'password' ? userService.updataUserPassword : userService.updataUserRole
          updateUser(params).then(() => {
            this.$message({
              message: '更新成功',
              type: 'success'
            })
            this.gotoList()
          })
        }
      })
    }
  }
}

</script>
