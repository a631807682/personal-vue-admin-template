<template>
  <el-container>
    <!-- 左侧菜单 -->
    <sidebar v-show="!isMobile || !collapsed">
      <template slot="header">
        <div class="hidden-sm-and-up">
          <div
            class="tools"
            @click.prevent="collapsed=true">
            <font-awesome-icon
              icon="align-justify"
              size="1x" />
          </div>
        </div>
        <el-header class="hidden-xs-only header">
          <div>
            <router-link
              class="txt"
              to="/"> \{{ sysName }}</router-link>
          </div>
        </el-header>
      </template>
    </sidebar>
    <!-- 遮罩 -->
    <div
      :class="['hidden-sm-and-up', !collapsed ? 'dlg-window':'']"
      @click="collapsed=true"/>
    <el-container>
      <!-- 头部导航 -->
      <el-header class="header">
        <div class="full">
          <div
            v-show="collapsed"
            class="tools hidden-sm-and-up"
            @click.prevent="collapsed=false">
            <font-awesome-icon
              icon="align-justify"
              size="1x" />
          </div>
          <div
            v-show="pageToolbarExist"
            class="hidden-sm-and-up fright"
            @click.prevent="openToobar">
            <i
              class="el-icon-menu"
              style="font-size: 16px"/>
          </div>
          <div :class="['userinfo',isMobile&&!collapsed?'hidden':'']">
            <el-dropdown trigger="click">
              <div class="el-dropdown-link userinfo-inner">
                <img src="/static/img/default-user.png" >
                <span>\{{ sysUserName }}</span>
              </div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native.prevent="$router.push('/personal/password')">
                  <span>设置</span>
                </el-dropdown-item>
                <el-dropdown-item
                  divided
                  @click.native.prevent="logout">
                <span>退出登录</span></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </el-header>
      <el-main>
        <el-container>
          <!-- 面包屑导航 -->
          <el-header
            class="view"
            height="20px">
            <el-col
              :span="24"
              class="breadcrumb-container">
              <strong class="title">\{{ $route.name }}</strong>
              <el-breadcrumb
                separator="/"
                class="breadcrumb-inner">
                <el-breadcrumb-item
                  v-for="item in $route.matched"
                  :key="item.path">
                  \{{ item.name }}
                </el-breadcrumb-item>
              </el-breadcrumb>
            </el-col>
          </el-header>
          <el-main
            class="view">
            <transition
              name="fade"
              mode="out-in">
              <router-view />
            </transition>
          </el-main>
        </el-container>
      </el-main>
    </el-container>
    <error-notify/>
  </el-container>
</template>

<script>
import Sidebar from 'src/views/Sidebar.vue'
import ErrorNotify from 'src/components/ErrorNotify.vue'
import { isMobile, localStore, debounce } from 'src/lib/utils'
import { SET_LOCAL_COLLAPSED,
  SET_LOCAL_TOOLBAR_VISABLE,
  SET_LOCAL_IS_MOBILE } from 'src/store/mutation-types'

export default {
  name: 'Home',
  components: {
    Sidebar,
    ErrorNotify
  },
  data () {
    return {
      sysName: '后台管理系统',
      sysEnv: '',
      sysUserName: null,
      sysUserAvatar: null
    }
  },
  computed: {
    pageToolbarExist () {
      return this.$store.getters.toolbarExist
    },
    collapsed: {
      get () {
        return this.$store.getters.isCollapsed
      },
      set (val) {
        this.$store.commit(SET_LOCAL_COLLAPSED, val)
      }
    }
  },
  created () {
    let user = this.$store.state.local.user
    this.sysUserName = user.username
    this.isMobile = this.isMobileFn()
    this.$store.commit(SET_LOCAL_IS_MOBILE, this.isMobile)

    window.addEventListener('resize', this.debounceResize)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.debounceResize)
  },
  methods: {
    isMobileFn: isMobile,
    logout () {
      this.$confirm('确认退出吗?', '提示', {
        // type: 'warning'
      }).then(() => {
        localStore.removeUser()
        this.$router.push('/login')
        location.reload() // 刷新路由
      }).catch(() => {})
    },
    openToobar () {
      this.$store.commit(SET_LOCAL_TOOLBAR_VISABLE, true)
    },
    debounceResize () {
      debounce(() => {
        let isMobile = this.isMobileFn()
        if (isMobile !== this.isMobile) {
          this.isMobile = isMobile
          this.collapsed = isMobile
          // console.warn('resize: is mobile', isMobile)
          this.$store.commit(SET_LOCAL_IS_MOBILE, isMobile)
        }
      }, 200).call(this)
    }
  }
}

</script>
<style scoped lang="scss">
@import 'src/styles/vars';
@import 'src/styles/mixin.scss';

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
        @media (max-width: 768px) {
          width: 20vw;
        }
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
    }

    .logo-width {
      width: 189px;
    }

    .logo-collapse-width {
      width: 24px
    }
  }

  .txt {
    color: #fff;
    text-decoration: none;
    font-size:18px;
  }

  .tools {
    padding: 0px 23px;
    width: 14px;
    height: 60px;
    line-height: 60px;
    cursor: pointer;
  }

  .breadcrumb-container {
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

.link {
  text-decoration: none;
  color: #606266;
}

.hidden-overflow {
  overflow:hidden
}

.modal {
  background: rgba(0,0,0,.5)
}

.dlg-window {
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 40;
}

</style>
<style lang="scss">
@import 'src/styles/base.scss';
@import 'src/styles/mixin.scss';

.toolbar {
  padding-right: 10px;
}

.fright {
  float: right !important;
}

.tags {
  margin-right: 10px;
}

.full{
  width:100%;
}

.table-btns {
  button:first-child {
    margin-left: 10px;
  }

  button {
    margin-top: 5px;
  }

  a+button {
    margin-left: 10px;
  }

  .none {
    color: #FFF;
    text-decoration: none;
  }
}

.view+.el-main {
  @media (max-width: 768px) {
    padding:5px 15px !important;
  }
}

.hidden {
  display:none;
}

</style>
