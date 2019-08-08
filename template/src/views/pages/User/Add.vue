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
          <el-form-item
            label="用户邮箱"
            prop="username">
            <el-input v-model="form.username"/>
          </el-form-item>
          <el-form-item
            label="密码"
            prop="password">
            <el-input
              v-model="form.password"
              type="password"/>
          </el-form-item>
          <el-form-item
            label="角色"
            prop="roleId">
            <el-select
              v-model="form.roleId"
              placeholder="请选择">
              <el-option
                v-for="item in roles"
                :key="item.id"
                :label="item.name"
                :value="item.id"/>
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
    return {
      roles: [],
      form: {
        username: '',
        password: '',
        roleId: ''
      },
      formRules: {
        username: [
          { required: true, type: 'email', message: '请输入用户邮箱', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        roleId: [
          { required: true, type: 'number', message: '请选择角色', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getRoles()
  },
  methods: {
    getRoles () {
      roleService.getOperableRoles().then(res => {
        this.roles = res
      })
    },
    gotoList () {
      this.$router.push('/system/user/list')
    },
    saveSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          let params = this.form
          userService.addUser(params).then(() => {
            this.$message({
              message: '提交成功',
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
