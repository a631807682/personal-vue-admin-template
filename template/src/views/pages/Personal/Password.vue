<template>
  <section>
    <el-col :span="12" style="padding-top:20px">
      <el-form :model="form" label-width="100px" ref="form" :rules="formRules">
        <el-form-item label="原始密码" prop="oldPassword">
          <el-input type="password" v-model="form.oldPassword"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input type="password" v-model="form.newPassword"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input type="password" v-model="form.confirmPassword"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveSubmit()">保存</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </section>
</template>
<script>
import { personalService } from 'src/api'
import { deepCopy } from 'src/lib/utils'

export default {
  data() {
    return {
      form: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      formRules: {
        oldPassword: [
          { required: true, message: '请输入原始密码', trigger: 'blur' },
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
        ],
        confirmPassword: [
          { required: true, message: '请输入确认密码', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (value) {
                if (value !== this.form.newPassword) {
                  callback(new Error('确认密码需与新密码相同'));
                }
              }
              callback();
            },
            trigger: 'blur'
          }
        ]
      },
      initData: null
    }
  },
  methods: {
    saveSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          personalService.updataPassword(this.form).then(() => {
            // 更新列表
            this.$message({
              message: '提交成功',
              type: 'success'
            });

            this.$refs.form.clearValidate();
            this.form = deepCopy(this.initData)
          })
        }
      })
    }
  },
  created() {
    this.initData = deepCopy(this.form)
  }
}

</script>
