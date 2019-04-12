<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-button type="primary" v-permission="'addBtn'" class="fright" @click="handleOpenAdd">新增</el-button>
    </el-col>
    <!--列表-->
    <el-table :data="roles" highlight-current-row style="width: 100%;">
      <el-table-column type="index">
      </el-table-column>
      <el-table-column prop="id" label="ID" sortable>
      </el-table-column>
      <el-table-column prop="name" label="角色名" sortable>
      </el-table-column>
      <el-table-column prop="createdAt" :formatter="dateTimeFormat" label="创建时间" sortable>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template scope="scope">
          <el-button size="small" v-permission="'editBtn'" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" v-permission="'deleteBtn'" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--新增界面-->
    <el-dialog title="新增" :visible.sync="addFormVisible" :before-close="closeAdd">
      <el-form :model="addForm" label-width="100px" :rules="addFormRules" ref="addForm">
        <el-form-item label="角色名" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="可访问菜单" prop="menus">
          <menus :checks="addForm.menus" :checkChange="handleAddCheckChange"></menus>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="closeAdd">取消</el-button>
        <el-button type="primary" @click.native="addSubmit">提交</el-button>
      </div>
    </el-dialog>
    <!--编辑界面-->
    <el-dialog title="编辑" :visible.sync="editFormVisible" :before-close="closeEdit">
      <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
        <el-form-item label="角色名" prop="name">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="可访问菜单" prop="menus">
          <menus :checks="editForm.menus" :checkChange="handleEditCheckChange"></menus>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="closeEdit">取消</el-button>
        <el-button type="primary" @click.native="editSubmit">提交</el-button>
      </div>
    </el-dialog>
  </section>
</template>
<script>
import Menus from 'src/components/routeMenu/Tree'
import { roleService } from 'src/api'
import { dateTimeFormat } from 'src/lib/format';
export default {
  data() {
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
          { required: true, type: 'string', message: '请输入角色名', trigger: 'blur' },
        ],
        menus: [
          { required: true, type: 'array', message: '选择权限', trigger: 'blur' },
        ]
      },
      //编辑界面是否显示
      editFormVisible: false,
      //编辑界面数据
      editForm: {
        id: 0,
        name: '',
        menus: [],
        defMenus: []
      },
      editFormRules: {
        name: [
          { required: true, type: 'string', message: '请输入角色名', trigger: 'blur' },
        ],
        menus: [
          { required: true, type: 'array', trigger: 'blur' },
        ]
      }
    }
  },
  components: {
    Menus
  },
  methods: {
    dateTimeFormat,
    getRoles(page = 1) {
      roleService.getOperableRoles().then((res) => {
        this.roles = res;
      });
    },
    handleOpenAdd() {
      this.addFormVisible = true;
    },
    closeAdd() {
      this.addFormVisible = false;
      this.$refs.addForm.resetFields(); //字段重置 移除校验结果
    },
    handleAddCheckChange(checkedKeys) {
      this.addForm.menus = checkedKeys;
      console.log('handleAddCheckChange', checkedKeys)
    },
    addSubmit() {
      console.log(this.addForm)
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          let params = this.addForm;
          roleService.addRole(params).then(() => {
            // 更新列表
            this.getRoles();
            this.$message({
              message: '提交成功',
              type: 'success'
            });
            this.closeAdd();
          });
        }
      });
    },
    //删除
    handleDel: function(index, row) {
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        roleService.deleteRole(row.id).then(() => {
          // 更新列表
          this.getRoles();
          this.$message({
            message: '删除成功',
            type: 'success'
          });
        });
      }).catch(() => {});
    },
    //显示编辑界面
    handleEdit: function(index, row) {
      this.editFormVisible = true;
      this.editForm = Object.assign({}, row);
      console.log('handleEdit', this.editForm.menus)
    },
    closeEdit: function() {
      this.editFormVisible = false;
      this.$refs.editForm.resetFields(); //字段重置 移除校验结果
    },
    handleEditCheckChange(checkedKeys) {
      this.editForm.menus = checkedKeys;
      console.log('handleEditCheckChange', checkedKeys)
    },
    editSubmit: function() {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          let params = this.editForm;
          console.log('editSubmit', params)
          roleService.updateRole(params).then(() => {
            // 更新列表
            this.getRoles();
            this.$message({
              message: '更新成功',
              type: 'success'
            });
            this.closeEdit();
          });
        }
      });
    },
  },
  created() {
    this.getRoles();
  }
}

</script>
