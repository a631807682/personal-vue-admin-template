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
            label="角色名"
            prop="name">
            <el-input v-model="form.name"/>
          </el-form-item>
          <el-form-item
            label="可访问菜单"
            prop="menus">
            <menus
              :checks="form.menus"
              :check-change="handleAddCheckChange"/>
          </el-form-item>
        </el-form>
      </template>
    </c-form>
  </div>
</template>
<script>
import { roleService } from 'src/api'
import Menus from 'src/components/routeMenu/Tree'

export default {
  components: {
    Menus
  },
  data () {
    return {
      form: {
        name: '',
        menus: []
      },
      formRules: {
        name: [
          { required: true, type: 'string', message: '请输入角色名', trigger: 'blur' }
        ],
        menus: [
          { required: true, type: 'array', message: '选择权限', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleAddCheckChange (checkedKeys) {
      this.form.menus = checkedKeys
    },
    gotoList () {
      this.$router.push('/system/role/list')
    },
    saveSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          let params = this.form
          roleService.addRole(params).then(() => {
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
