<template>
  <div>
    <c-form
      :default-btns="false">
      <template slot="toolbar"/>
      <template slot="content">

        <el-form
          ref="form"
          :model="form"
          :rules="formRules"
          label-width="100px">
          <el-form-item
            label="原始密码"
            prop="oldPassword">
            <el-input
              v-model="form.oldPassword"
              type="password"/>
          </el-form-item>
          <el-form-item
            label="新密码"
            prop="newPassword">
            <el-input
              v-model="form.newPassword"
              type="password"/>
          </el-form-item>
          <el-form-item
            label="确认密码"
            prop="confirmPassword">
            <el-input
              v-model="form.confirmPassword"
              type="password"/>
          </el-form-item>
          <el-form-item>
            <el-button
              class="fright"
              type="primary"
              @click="saveSubmit()">保存</el-button>
          </el-form-item>
        </el-form>
      </template>
    </c-form>
  </div>
</template>
<script>
import { personalService } from 'src/api'
import { deepCopy } from 'src/lib/utils'

export default {
  data () {
    return {
      form: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      formRules: {
        oldPassword: [
          { required: true, message: '请输入原始密码', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '请输入确认密码', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (value) {
                if (value !== this.form.newPassword) {
                  callback(new Error('确认密码需与新密码相同'))
                }
              }
              callback()
            },
            trigger: 'blur'
          }
        ]
      },
      initData: null
    }
  },
  created () {
    this.initData = deepCopy(this.form)
  },
  methods: {
    saveSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          personalService.updataPassword(this.form).then(() => {
            // 更新列表
            this.$message({
              message: '提交成功',
              type: 'success'
            })

            this.$refs.form.clearValidate()
            this.form = deepCopy(this.initData)
          })
        }
      })
    }
  }
}

</script>
