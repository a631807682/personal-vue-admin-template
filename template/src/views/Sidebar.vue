<template>
  <div
    :class="collapsed?'collapsed':'expanded'"
    class="menu">
    <el-menu
      :collapse="collapsed"
      :default-active="defaultActive"
      unique-opened>
      <template
        v-for="(item,index) in accessedRouters"
        v-if="!item.hidden">
        <el-submenu
          :key="index"
          :index="item.path">
          <template slot="title">
            <i :class="item.iconCls"/>
            <span slot="title">\{{ item.name }}</span>
          </template>
          <el-menu-item
            v-for="(child,cIndex) in item.children"
            v-if="!child.hidden"
            :key="index+'_'+cIndex"
            :index="pathJoin(item.path,child.path)"
            :class="actived(item.path,child.path)?'is-active':''"
            @click="handleMenuClick(pathJoin(item.path,child.path),$event)">
            \{{ child.name }}
          </el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>
<script>
import { menuHelper } from 'src/lib/utils'

export default {
  name: 'Sidebar',
  data () {
    return {}
  },
  computed: {
    collapsed () {
      return this.$store.state.local.collapsed
    },
    accessedRouters () {
      return this.$store.state.local.accessedRouters
    },
    defaultActive () {
      let accessedRouters = this.$store.state.local.accessedRouters
      for (let r of accessedRouters) {
        if (r.children && r.children.length > 0) {
          let same = r.children.find(c => this.actived(r.path, c.path))
          if (same) {
            return this.pathJoin(r.path, same.path)
          }
        }
      }
      return ''
    }
  },
  methods: {
    pathJoin: menuHelper.join.bind(menuHelper),
    pathAllow: menuHelper.allowed.bind(menuHelper),
    actived (parent, child) {
      return this.pathAllow(parent, child, this.$route.path)
    },
    handleselect: function (a, b) {},
    showMenu (i, status) {
      // this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-' + i)[0].style.display = status ? 'block' : 'none';
    },
    handleMenuClick (path, vm) {
      if (vm.$parent && vm.$parent.$options.name === 'ElSubmenu') {
        vm.$parent.handleMouseleave()
        vm.onMouseLeave()
      }
      this.$router.push(path)
    }
  }
}

</script>
<style lang='scss' scoped>
.menu {
  border-right: solid 1px #e6e6e6;
}

.collapsed {
  flex: 0 0 60px;
}

.expanded {
  flex: 0 0 230px;
}

</style>
