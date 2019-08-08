<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="rules"
      label-position="left"
      label-width="0px"
      class="login-form">
      <h3 class="title">系统登录</h3>
      <el-form-item prop="username">
        <el-input
          v-model="loginForm.username"
          type="text"
          autocomplete="off"
          placeholder="账号"/>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          autocomplete="off"
          placeholder="密码"/>
      </el-form-item>
      <!-- <el-checkbox
        v-model="checked"
        checked
        class="remember">记住密码</el-checkbox> -->
      <el-form-item style="width:100%;">
        <el-button
          :loading="logining"
          type="primary"
          style="width:100%;"
          @click.native.prevent="handleSubmit">登录</el-button>
      </el-form-item>
    </el-form>
    <error-notify/>
  </div>
</template>
<script>
import { userService } from 'src/api'
import { localStore } from 'src/lib/utils'
import ErrorNotify from 'src/components/ErrorNotify.vue'
import { SET_LOCAL_USER } from 'src/store/mutation-types'

export default {
  components: {
    ErrorNotify
  },
  data () {
    return {
      logining: false,
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      checked: true
    }
  },
  methods: {
    handleSubmit () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          let params = this.loginForm
          userService.login(params).then(user => {
            console.log('login user', user)
            localStore.saveUser(user)
            this.$store.commit(SET_LOCAL_USER, user)

            let { redirect } = this.$route.query
            this.$router.push({ path: redirect || '/' })
          })
        }
      })
    }
  }
}

</script>
<style lang="scss" scoped>
@import 'src/styles/mixin.scss';

.login-container {
  @include relative;

  .login-form {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;

    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;

    @include fxied-center;
    top: 40%;
    width:22em;
    padding: 35px 35px 15px 35px;

    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }

    .remember {
      margin: 0px 0px 35px 0px;
    }
  }

}

</style>
