<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-right:10px">
      <el-col :span="12">
        <el-col :span="6">
          <el-input placeholder="输入关键字进行过滤">
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" style="margin-left:10px">搜索</el-button>
        </el-col>
      </el-col>
      <el-col :span="12">
        <router-link to="/ad/add" style="float: right">
          <el-button type="primary">新增</el-button>
        </router-link>
      </el-col>
    </el-col>
    <!--列表-->
    <el-table :data="ads" highlight-current-row style="width: 100%;">
      <el-table-column type="index">
      </el-table-column>
      <el-table-column prop="id" label="ID" sortable>
      </el-table-column>
      <el-table-column prop="title" label="广告名" sortable>
      </el-table-column>
      <el-table-column prop="company" label="商家名称" sortable>
      </el-table-column>
      <el-table-column prop="status" label="状态" sortable>
        <template slot-scope="scope">
          <el-tag :type="scope.row.status === 'ONLINE' ? 'success':'danger'" disable-transitions>
            {{scope.row.status|statusFilter}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="rule.startDate" label="生效日期" :formatter="dateFormat" sortable>
      </el-table-column>
      <el-table-column prop="rule.endDate" label="失效日期" :formatter="dateFormat" sortable>
      </el-table-column>
      <el-table-column prop="playTimes" label="播放次数" sortable>
      </el-table-column>
      <el-table-column prop="clickTimes" label="点击次数" sortable>
      </el-table-column>
      <el-table-column prop="createdAt" :formatter="dateTimeFormat" label="创建时间" sortable>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template scope="scope">
          <el-button size="small" @click="handleGotoEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-col :span="24" class="toolbar">
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="limit" :total="total" background style="float:right;">
      </el-pagination>
    </el-col>
  </section>
</template>
<script>
import { adService } from 'src/api'
import { dateTimeFormat, dateFormat } from 'src/lib/format';
import { statusFilter } from 'src/lib/filter';

export default {
  data() {
    return {
      ads: [],
      //分页
      total: 0,
      page: 1,
      limit: 10,
    }
  },
  filters: {
    statusFilter
  },
  methods: {
    dateFormat,
    dateTimeFormat,
    getADs(page = 1) {
      let limit = this.limit;
      let start = (page - 1) * limit;
      adService.getADs(page, limit).then((res) => {
        this.total = res.count;
        this.ads = res.rows;
      });
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getADs(val);
    },
    handleGotoEdit(index, row) {
      this.$router.push('/ad/edit/' + row.id);
    },
    handleDel(index, row) {
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        adService.deleteAD(row.id).then(() => {
          this.getADs();
          this.$message({
            message: '删除成功',
            type: 'success'
          });
        })
      })
    }
  },
  mounted() {
    this.getADs();
  }
}

</script>
