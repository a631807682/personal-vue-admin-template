<template>
  <el-row class="container">
    <!-- 头部导航 -->
    <el-col :span="24" class="header">
      <div class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
        <router-link class="txt" to="/"> {{collapsed?'':sysName }}</router-link>
      </div>
      <div class="tools" @click.prevent="collapsed=!collapsed">
        <font-awesome-icon icon="align-justify" size="1x"></font-awesome-icon>
      </div>
      <div class="userinfo">
        <el-dropdown trigger="click">
          <div class="el-dropdown-link userinfo-inner">
            <img src="/static/img/default-user.png"  />
            <span>{{sysUserName}}</span>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native.prevent="$router.push('/personal/password')">
              <span>设置</span>
            </el-dropdown-item>
            <el-dropdown-item divided @click.native.prevent="logout">
              <span>退出登录</span></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-col>
    <el-col :span="24" class="main">
      <!-- 左侧菜单 -->
      <Sidebar></Sidebar>
      <!-- 右侧内容 -->
      <section class="content-container">
        <div class="grid-content bg-purple-light">
          <!-- 子导航 -->
          <el-col :span="24" class="breadcrumb-container">
            <strong class="title">{{$route.name}}</strong>
            <el-breadcrumb separator="/" class="breadcrumb-inner">
              <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
                {{ item.name }}
              </el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <!-- 内容 -->
          <el-col :span="24" class="content-wrapper">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-col>
        </div>
      </section>
    </el-col>
    <el-col :span="24" class="dialogs">
      <ErrorNotify></ErrorNotify>
    </el-col>
  </el-row>
</template>
<script>
import Sidebar from 'src/views/Sidebar.vue'
import ErrorNotify from 'src/components/ErrorNotify.vue'
import { isMobile } from 'src/lib/utils'

export default {
  name: 'home',
  data() {
    return {
      sysName: '轨廓形检管理后台',
      sysEnv: '',
      collapsed: false,
      sysUserName: null,
      sysUserAvatar: null
    }
  },
  computed: {

  },
  watch: {
    collapsed(val) {
      this.$store.dispatch('local', { field: 'collapsed', val });
    }
  },
  components: {
    Sidebar,
    ErrorNotify
  },
  methods: {
    isMobile,
    //折叠导航栏
    changeTitle(vm) {
      if (vm.pageTitle) {
        document.title = `${vm.pageTitle}`;
      }
    },
    logout: function() {
      this.$confirm('确认退出吗?', '提示', {
        //type: 'warning'
      }).then(() => {
        localStorage.removeItem('user');
        this.$router.push('/login');
        location.reload(); //刷新路由
      }).catch(() => {});
    }
  },
  created() {
    let user = JSON.parse(localStorage.getItem('user'));
    this.sysUserName = user.username;
    this.collapsed = this.isMobile();
  }
}

</script>
<style scoped lang="scss">
@import '~scss_vars';
@import 'src/styles/mixin.scss';

.container {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;

  .header {
    background: $color-primary;
    color: #fff;

    div {
      @include f_left;
      height: 60px;
      line-height: 60px;
    }


    .userinfo {
      text-align: right;
      padding-right: 1em;
      float: right;

      .userinfo-inner {
        @include text-overflow;
        width: 15vw;
        cursor: pointer;
        color: #fff;

        img {
          @include sm-hidden;
          width: 40px;
          height: 40px;
          border-radius: 20px;
          margin: 10px 0px 10px 10px;
          float: right;
        }
      }
    }

    .logo {
      height: 60px;
      font-size: 22px;
      padding-left: 20px;
      padding-right: 20px;
      border-color: rgba(238, 241, 146, 0.3);
      border-right-width: 1px;
      border-right-style: solid;

      img {
        width: 40px;
        float: left;
        margin: 10px 10px 10px 18px;
      }

      .txt {
        color: #fff;
        text-decoration: none;
      }

    }

    .logo-width {
      width: 189px;
    }

    .logo-collapse-width {
      width: 24px
    }

    .tools {

      padding: 0px 23px;
      width: 14px;
      height: 60px;
      line-height: 60px;
      cursor: pointer;
    }
  }

  .main {
    display: flex; // background: #324057;
    position: absolute;
    top: 60px;
    bottom: 0px;
    overflow: hidden;

    .content-container {
      // background: #f1f2f7;
      flex: 1; // position: absolute;
      // right: 0px;
      // top: 0px;
      // bottom: 0px;
      // left: 230px;
      overflow-y: scroll;
      padding: 20px;

      .breadcrumb-container {

        //margin-bottom: 15px;
        .title {
          width: 200px;
          float: left;
          color: #475669;
        }

        .breadcrumb-inner {
          @include sm-hidden;
          float: right;
        }
      }

      .content-wrapper {
        background-color: #fff;
        box-sizing: border-box;
      }
    }
  }
}

.link {
  text-decoration: none;
  color: #606266;
}

</style>
<style lang="scss">
@import 'src/styles/base.scss';

.toolbar {
  padding-right: 10px;

  .fright {
    float: right;
  }
}

.tags {
  margin-right: 10px;
}

</style>
