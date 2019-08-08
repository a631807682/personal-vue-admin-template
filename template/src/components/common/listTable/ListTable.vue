<template>
  <div class="list-table">
    <!-- 工具栏 -->
    <toolbar v-if="autoToolbar">
      <template slot="content">
        <slot name="toolbar"/>
      </template>
    </toolbar>
    <slot name="header"/>

    <template v-if="isMobile">
      <table-mobile
        ref="tableMobile"
        v-bind="$attrs"
        @loaded="handleLoaded">
        <!-- 传递所有slot -->
        <template
          v-slot:[slot]="scope"
          v-for="(_, slot) of $scopedSlots"><slot
            :name="slot"
            v-bind="scope"/></template>
      </table-mobile>
    </template>
    <template v-else>
      <table-p-c
        ref="tablePC"
        v-bind="$attrs"
        @loaded="handleLoaded">
        <!-- 传递所有slot -->
        <template
          v-slot:[slot]="scope"
          v-for="(_, slot) of $scopedSlots"><slot
            :name="slot"
            v-bind="scope"/></template>
      </table-p-c>
    </template>
  </div>
</template>
<script>
import Toolbar from './Toolbar'
import TableMobile from './TableMobile'
import TablePC from './TablePC'

export default {
  name: 'CListTable',
  components: {
    Toolbar,
    TableMobile,
    TablePC
  },
  props: {
    autoToolbar: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
    }
  },
  computed: {
    isMobile () {
      return this.$store.getters.isMobile
    }
  },
  methods: {
    reloadDataByTotal (addTotal) {
      if (this.isMobile) {
        this.$refs.tableMobile.reloadDataByTotal(addTotal)
      } else {
        this.$refs.tablePC.reloadDataByTotal(addTotal)
      }
    },
    refresh () {
      if (this.isMobile) {
        this.$refs.tableMobile.refresh()
      } else {
        this.$refs.tablePC.getDataByPage()
      }
    },
    handleLoaded () {
      this.$emit('loaded')
    }
  }
}

</script>

<style lang="scss">
.list-table{
  .vertical-center{
    padding-top:20vh;

    .el-button--small {
      padding: 12px 20px;
      font-size: 14px;
    }
  }

  img {
    width:100%;
  }

  .toolbar {
    background: #f2f2f2;
    padding: 10px;
    margin: 10px 0px;
    min-height: 45px;
  }

  .input-search-keyword {
    width:350px;
    @media (max-width: 768px) {
      width:60%;
    }
  }
  .search-btn{
    @media (max-width: 768px) {
      margin-left:0;
    }
  }
  .special-search-box {
    width:350px;
  }
}

</style>
