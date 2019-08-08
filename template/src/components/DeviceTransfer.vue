<template>
  <div class="device-transfer">
    <el-transfer
      v-model="selects"
      :data="transferDevices"
      :titles="['设备列表', '已选设备']"
      :button-texts="[ '撤销','选择']"
      :filterable="true"
      :render-content="renderFunc"
      style="text-align: left;"
      @change="handleChange"/>
  </div>
</template>
<script>
export default {
  props: {
    devices: {
      type: Array,
      required: true
    },
    value: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      maxSelectCount: 6
    }
  },
  computed: {
    selects: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('update:value', val)
      }
    },
    transferDevices () {
      let devices = this.devices.map(d => {
        return {
          key: d.id,
          label: d.name + ' (UID:' + d.id + ')'
        }
      })

      return devices
    }
  },
  methods: {
    renderFunc (h, option) {
      return h('span', {
        attrs: {
          title: option.label
        }
      },
      [option.label]
      )
    },
    handleChange (value, direction, movedKeys) {
      if (direction === 'right') {
        if (value.length > this.maxSelectCount) {
          value.length = this.maxSelectCount
          this.$message({
            type: 'warning',
            message: '分组最多允许添加' + this.maxSelectCount + '个设备'
          })
        }
      }
    }
  }
}

</script>
<style lang="scss">
.device-transfer{
  @media (max-width: 768px) {
    .el-transfer-panel {
      width:100%;
    }

    .el-transfer__buttons {
      width:100%;
      padding:10px 0;

      .transfer__button:first-child{
        margin-bottom:0;
      }
      .el-transfer__button:nth-child(2){
        margin-left:10px;
      }
      .el-button {
        float:left;
      }
    }
  }
}
</style>
