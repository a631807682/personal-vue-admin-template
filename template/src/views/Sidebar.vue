<template>
  <section :class="collapsed?'menu-collapsed':'menu-expanded'">
    <el-menu  :collapse="collapsed" router unique-opened :default-active='defaultActive'>
      <template v-for="(item,index) in accessedRouters" v-if="!item.hidden">
        <el-submenu :index="item.path">
          <template slot="title">
            <i :class="item.iconCls"></i>
            <span slot="title">\{{item.name}}</span>
          </template>
          <el-menu-item v-for="(child,cIndex) in item.children" v-if="!child.hidden" :index="pathJoin(item.path,child.path)" :class="actived(item.path,child.path)?'is-active':''">
            \{{child.name}}
          </el-menu-item>
        </el-submenu>
      </template>
      <!--       <el-submenu :index="item.path" v-for="(item,index) in accessedRouters" v-if="!item.hidden">
        <template slot="title"><i :class="item.iconCls"></i>\{{item.name}}</template>
        <el-menu-item v-for="(child,cIndex) in item.children" v-if="!child.hidden" :index="pathJoin(item.path,child.path)" :class="actived(item.path,child.path)?'is-active':''">
          \{{child.name}}
        </el-menu-item>
      </el-submenu> -->
    </el-menu>
  </section>
</template>
<script>
import { menuHelper } from 'src/lib/utils';

export default {
  name: 'Sidebar',
  data() {
    return {}
  },
  computed: {
    collapsed() {
      return this.$store.state.local.collapsed;
    },
    accessedRouters() {
      return this.$store.state.local.accessedRouters;
    },
    defaultActive() {
      let accessedRouters = this.$store.state.local.accessedRouters;
      for (let r of accessedRouters) {
        if (r.children && r.children.length > 0) {
          let same = r.children.find(c => this.actived(r.path, c.path))
          if (same) {
            return this.pathJoin(r.path, same.path);
          }
        }
      }
      return '';
    }
  },
  methods: {
    pathJoin: menuHelper.join.bind(menuHelper),
    pathAllow: menuHelper.allowed.bind(menuHelper),
    actived(parent, child) {
      return this.pathAllow(parent, child, this.$route.path);
    },
    handleselect: function(a, b) {},
    showMenu(i, status) {
      // this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-' + i)[0].style.display = status ? 'block' : 'none';
    }
  },
  created() {
    // console.log('this.$store.state.local.accessedRouters', this.$store.state.local.accessedRouters)
  }
}

</script>
<style lang='scss'>


.menu-collapsed {
  flex: 0 0 60px;
  width: 60px;
}

.menu-expanded {
  flex: 0 0 230px;
  width: 230px;
}
</style>
