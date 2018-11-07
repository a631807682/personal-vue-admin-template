<template>
  <section>
    <el-tree ref="tree" :data="menus" node-key="path" @check="handleCheckChange" :default-expand-all="true" show-checkbox>
    </el-tree>
  </section>
</template>
<script>
import { asyncRouterMap } from 'src/router/async'
import { menuHelper } from 'src/lib/utils'

export default {
  props: ['checks', 'checkChange'],
  data() {
    return {
      menus: []

    }
  },
  computed: {

  },
  watch: {
    checks: function(now, old) {
      this.$refs.tree.setCheckedKeys(now);
    }
  },
  methods: {
    pathJoin: menuHelper.join.bind(menuHelper),
    genMenues: menuHelper.genMenues.bind(menuHelper),
    handleCheckChange(data, { checkedNodes, checkedKeys }) {
      this.checkChange(checkedKeys);
    },
  },
  created() {
    this.menus = this.genMenues(asyncRouterMap);
  },
  mounted() {
    this.$refs.tree.setCheckedKeys(this.checks);
  }

}


// data2: [{
//   id: 1,
//   label: '一级 1',
//   children: [{
//     id: 4,
//     label: '二级 1-1',
//     children: [{
//       id: 9,
//       label: '三级 1-1-1'
//     }, {
//       id: 10,
//       label: '三级 1-1-2'
//     }]
//   }]
// }]

</script>
