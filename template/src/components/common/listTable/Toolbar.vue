<template>
  <div>
    <el-col
      :span="24"
      class="toolbar hidden-xs-only">
      <slot name="content"/>
    </el-col>
    <el-dialog
      :visible="visible"
      class="vertical-center"
      title="工具栏"
      @close="closeToolbar">
      <slot name="content"/>
      <span
        slot="footer"
        class="dialog-footer"/>
    </el-dialog>
  </div>
</template>
<script>
import { SET_LOCAL_TOOLBAR_VISABLE, SET_LOCAL_TOOLBAR_EXIST } from 'src/store/mutation-types'

export default {
  name: 'Toolbar',
  data () {
    return {}
  },
  computed: {
    visible () {
      return this.$store.getters.toolbarVisable
    }
  },
  mounted () {
    if (this.$slots.content && this.$slots.content.length > 0) {
      this.$store.commit(SET_LOCAL_TOOLBAR_EXIST, true)
    }
  },
  beforeDestroy () {
    this.$store.commit(SET_LOCAL_TOOLBAR_EXIST, false)
  },
  methods: {
    closeToolbar () {
      this.$store.commit(SET_LOCAL_TOOLBAR_VISABLE, false)
    }
  }
}

</script>
<style lang="scss" scoped>
.toolbar {
  background: #f2f2f2;
  padding: 10px;
  margin: 10px 0px;
  min-height: 45px;
}
</style>
