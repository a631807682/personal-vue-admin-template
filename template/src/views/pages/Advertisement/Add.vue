<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true">
        <el-form-item>
          <el-button @click="goBack">返回</el-button>
          <el-button type="primary" @click="addSubmit()">提交</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="24">
      <el-form :model="form" label-width="100px" :rules="formRules" ref="form">
        <el-col :span="12">
          <el-col :span="18">
            <el-form-item label="名称" prop="title">
              <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="厂商" prop="company">
              <el-input v-model="form.company"></el-input>
            </el-form-item>
            <el-form-item label="分辨率" prop="ratio">
              <el-select v-model="form.ratio" placeholder="请选择">
                <el-option v-for="item in ADRatioType.items" :key="item.value" :label="item.name" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="媒体类型" prop="type">
              <el-select v-model="form.type" placeholder="请选择">
                <el-option v-for="item in ADType.items" :key="item.value" :label="item.name" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <div v-show="form.type==='VIDEO'">
              <el-form-item label="音量" prop="volume">
                <el-slider v-model="form.rule.volume" :min="0" :max="15" show-input>
                </el-slider>
              </el-form-item>
              <el-form-item label="视频上传" prop="filePath">
                <el-upload ref='videoUpload' class="upload-demo" drag :action="uploadPath" :headers="uploadHeaders" accept="video/*" :limit="1" :on-success="handleUploadVideoSuccess" :on-remove="handleUploadVideoRemove">
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                </el-upload>
              </el-form-item>
            </div>
            <div v-show="form.type==='IMAGE'">
              <el-form-item label="图片上传" prop="filePath">
                <el-upload ref='imageUpload' :action="uploadPath" :headers="uploadHeaders" list-type="picture-card" :multiple="false" :limit="1" :on-success="handleUploadImageSuccess" :on-preview="handleUploadImagePreview" :on-remove="handleUploadImageRemove" accept="image/*">
                  <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="uploadImageDialogVisible">
                  <img width="100%" :src="uploadImageDialogUrl" alt="">
                </el-dialog>
              </el-form-item>
            </div>
          </el-col>
        </el-col>
        <!--广告规则部分-->
        <el-col :span="12">
          <el-col :span="18">
            <el-form-item label="有效期" prop="rule.startDate">
              <el-date-picker v-model="ruleExpiryDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00', '23:59:59']">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="展示时长">
              <el-input-number v-model="form.rule.duration" :min="0" :max="60"></el-input-number>
            </el-form-item>
            <el-form-item label="展示时段">
              <el-select v-model="form.rule.timeSlot" placeholder="请选择">
                <el-option v-for="item in ADTimeSlot.items" :key="item.value" :label="item.name" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="广告位">
              <el-select v-model="form.rule.showType" placeholder="请选择">
                <el-option v-for="item in ADShowType.items" :key="item.value" :label="item.name" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="不投放地域">
              <el-tag :key="city" v-for="city in form.rule.blacklist" closable :disable-transitions="false" @close="handleCloseCity(city)">
                {{city}}
              </el-tag>
              <el-input class="input-new-tag" v-if="cityAppendVisible" v-model="cityAppendValue" size="small" @keyup.enter.native="handleCityAppendConfirm" @blur="handleCityAppendConfirm">
              </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="handleShowCityAppend">添加地域</el-button>
            </el-form-item>
            <el-form-item label="允许跳过">
              <el-switch v-model="form.rule.skipable"></el-switch>
            </el-form-item>
            <el-form-item label="允许外链">
              <el-switch v-model="form.rule.redirectable"></el-switch>
            </el-form-item>
            <div v-show="form.rule.redirectable">
              <el-form-item label="链接按钮名称" prop="rule.redirectTitle">
                <el-input v-model="form.rule.redirectTitle"></el-input>
              </el-form-item>
              <el-form-item label="链接地址" prop="rule.redirectUrl">
                <el-input v-model="form.rule.redirectUrl"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-col>
      </el-form>
    </el-col>
  </section>
</template>
<script>
import { ADRatioType, ADType, ADTimeSlot, ADShowType } from 'src/lib/enum'
import { uploadPath, adService } from 'src/api'
import { urlReg, localStore } from 'src/lib/utils'

export default {
  data() {
    return {
      form: {
        title: '',
        company: '',
        ratio: ADRatioType.default,
        type: ADType.default,
        filePath: '',
        size: 0,
        filename: '',
        rule: {
          duration: 0,
          startDate: null,
          endDate: null,
          timeSlot: ADTimeSlot.default,
          showType: ADShowType.default,
          blacklist: [],
          skipable: false,
          redirectable: true,
          redirectTitle: '',
          redirectUrl: '',
          volume: 7
        }
      },
      formRules: {
        title: [
          { required: true, message: '请输名称', trigger: 'blur' },
        ],
        company: [
          { required: true, message: '厂商', trigger: 'blur' },
        ],

        filePath: [
          { required: true, message: '请上传广告资源', trigger: 'blur' },
        ],

        'rule.startDate': [
          { required: true, message: '请选择有效期', trigger: 'blur' },
        ],

        'rule.redirectTitle': [{
          validator: (rule, value, callback) => {
            if (this.form.rule.redirectable) {
              if (value === '') {
                callback(new Error('请输入链接按钮名称'));
              }
            }
            callback();
          },
          trigger: 'blur'
        }],

        'rule.redirectUrl': [{
          validator: (rule, value, callback) => {
            if (this.form.rule.redirectable) {
              if (value === '') {
                callback(new Error('请输入链接地址'));
              } else if (!urlReg.test(value)) {
                callback(new Error('请输入正确的链接地址 如：http://www.google.com'));
              }
            }
            callback();
          },
          trigger: 'blur'
        }]
      },
      //文件上传
      uploadPath,
      uploadHeaders: {
        token: ''
      },
      //图片上传进度
      uploadImageDialogVisible: false,
      uploadImageDialogUrl: '',
      //不投放地域
      cityAppendVisible: false,
      cityAppendValue: '',
      //类型枚举
      ADRatioType,
      ADType,
      ADTimeSlot,
      ADShowType
    }
  },
  watch: {
    'form.type': function(val) {
      this.clearFormFile();
    },
  },
  computed: {
    //计算有效时间段
    ruleExpiryDate: {
      // getter
      get: function() {
        if (!this.form.rule.startDate && !this.form.rule.endDate) return []; //初始状态避免1970-01-01
        return [this.form.rule.startDate, this.form.rule.endDate]
      },
      // setter
      set: function(dates) {
        this.form.rule.startDate = dates[0]
        this.form.rule.endDate = dates[1]
      }
    }
  },
  components: {

  },
  methods: {
    goBack() {
      this.gotoAdIndex();
    },
    gotoAdIndex() {
      this.$router.push('/ad/list')
    },
    addSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          adService.addAD(this.form).then(() => {
            // 更新列表
            this.$message({
              message: '提交成功',
              type: 'success'
            });
            this.gotoAdIndex();
          })
        }
      })
    },
    //清空文件上传状态
    clearFormFile() {
      this.form.filePath = '';
      this.form.size = 0;
      this.form.filename = '';
      this.$refs.videoUpload.clearFiles();
      this.$refs.imageUpload.clearFiles();
    },
    //图片上传
    handleUploadImagePreview(file) {
      this.uploadImageDialogUrl = file.url;
      this.uploadImageDialogVisible = true;
    },
    handleUploadImageSuccess(res, file) {
      this.form.filePath = res.result.savePath;
      this.form.size = file.size;
      this.form.filename = file.name;
    },
    handleUploadImageRemove() {
      this.clearFormFile();
    },
    //视频上传
    handleUploadVideoSuccess(res, file) {
      this.form.filePath = res.result.savePath;
      this.form.size = file.size;
      this.form.filename = file.name;
    },
    handleUploadVideoRemove() {
      this.clearFormFile();
    },
    //不投放地域
    handleShowCityAppend() {
      this.cityAppendVisible = true;
    },
    handleCityAppendConfirm() {
      let cityAppendValue = this.cityAppendValue;

      this.cityAppendVisible = false;
      if (cityAppendValue && this.form.rule.blacklist.every(b => b !== cityAppendValue)) {
        this.form.rule.blacklist.push(cityAppendValue);
      }
      this.cityAppendValue = ''
    },
    handleCloseCity(city) {
      this.form.rule.blacklist.splice(this.form.rule.blacklist.indexOf(city), 1);
    }
  },
  mounted() {
    this.uploadHeaders.token = localStore.getToken();
  }
}

</script>
