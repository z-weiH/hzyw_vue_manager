<template>
  <div class="tpl-setting-edit">
    <div class="wsbodyhead">
      <a>所在位置</a>
      <a href="javascript:;" class="aside_tit">模板设置</a>
    </div>

    <div class="item-title of-hidden">
      <span class="item-title-sign">模板设置</span>

      <div class="fr">
        <el-button type="primary" round class="mr-10">参数列表</el-button>
        <el-button type="text" @click="handleGoBack">返回&gt;&gt;</el-button>
      </div>
    </div>

    <div class="item-table">
      <div class="m-template-list h-70">
        <span class="mr-10">奇速贷0001</span>
        <el-button class="mr-10" type="warning" size="medium" round>启用</el-button>
        <span class="remarks ellipsis">我是备注</span>
        <span>仲裁服务费：</span>
        <el-select style="width:130px;" v-model="ruleForm.aaaa" class="mr-10">
          <el-option label="主张" value="M1"></el-option>
          <el-option label="不主张" value="M2"></el-option>
        </el-select>
        <span>仲裁程序：</span>
        <el-select style="width:130px;" v-model="ruleForm.bbbb">
          <el-option label="互金企业" value="M1"></el-option>
          <el-option label="普通程序" value="M2"></el-option>
        </el-select>
      </div>

      <div class="m-template-list">
        <el-row>
          <el-col :span="12">
            <div>
              <span class="is-required list-text">申请书：</span>
              <el-button type="text">word上传</el-button>
              <el-button @click="handleWebpage" type="text">网页编辑</el-button>
              <span class="m-time ml-10">2012-11-11 06:00:30</span>
            </div>
            <div>
              <span class="is-required list-text">标的金额：</span>
              <el-button @click="handleSet(1)" type="text">设置</el-button>
              <span class="m-time" style="margin-left:113px;">2012-11-11 06:00:30</span>
            </div>
          </el-col>
          <el-col :span="12">
            <el-row>
              <el-col :span="18">
                <span class="is-required list-text">证据设置：</span>
                <el-button type="text">设置</el-button>
                <span class="m-time ml-20">2012-11-11 06:00:30</span>
              </el-col>
              <el-col :span="6">
                <el-button type="warning" size="medium" round class="mt-20">禁用</el-button>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>

      <div class="m-template-list">
        <el-col :span="12">
            <div>
              <span class="list-text">裁决书：</span>
              <el-button type="text">word上传</el-button>
              <el-button @click="handleWebpage" type="text">网页编辑</el-button>
              <span class="m-time ml-10">2012-11-11 06:00:30</span>
            </div>
          </el-col>
          <el-col :span="12">
            <el-row>
              <el-col :span="18">
                <span class="list-text">预测仲裁金额：</span>
                <el-button @click="handleSet(2)" type="text">设置</el-button>
                <span class="m-time ml-20">2012-11-11 06:00:30</span>
              </el-col>
              <el-col :span="6">
                <el-button type="warning" size="medium" round>禁用</el-button>
              </el-col>
            </el-row>
          </el-col>
      </div>

      <div class="m-template-list">
        <el-col :span="12">
            <div>
              <span class="list-text">强制申请书：</span>
              <el-button type="text">word上传</el-button>
              <el-button @click="handleWebpage" type="text">网页编辑</el-button>
              <span class="m-time ml-10">2012-11-11 06:00:30</span>
            </div>
          </el-col>
          <el-col :span="12">
            <el-row>
              <el-col :span="18">
                <span class="list-text">执行标的：</span>
                <el-button @click="handleSet(3)" type="text">设置</el-button>
                <span class="m-time ml-20">2012-11-11 06:00:30</span>
              </el-col>
              <el-col :span="6">
                <el-button type="warning" size="medium" round>禁用</el-button>
              </el-col>
            </el-row>
          </el-col>
      </div>
    </div>

    <!-- 设置 dialog -->
    <setDialog ref="setDialog"></setDialog>
  </div>
</template>

<script>
  import setDialog from './modules/setDialog.vue'
  export default {
    components : {
      setDialog,
    },
    data() {
      return {
        ruleForm : {
          // 仲裁服务费
          aaaa : '',
          // 仲裁程序
          bbbb : '',
        },
      }
    },
    methods : {
      // 点击返回
      handleGoBack() {
        this.$router.push('tplSettingList');
      },
      // 点击设置
      handleSet(type) {
        this.$refs.setDialog.show({},type);
      },
      // 点击网页编辑
      handleWebpage() {
        this.$router.push('/webpageEditor');
      },
    },
  }
</script>

<style lang="scss" scoped>

.tpl-setting-edit{
  .item-title{
    padding-top: 5px;
    padding-bottom: 5px;
  }
  .item-title-sign{
    margin-top: 12px;
    display: inline-block;
  }
  .is-required:before{
    content: '*';
    color: #f56c6c;
    margin-right: 4px;
  }

  .item-table{
    .m-time{
      color: #bbb;
      font-size: 12px;
    }
    .remarks{
      color: #bbb;
      width: 300px;
    }
    .m-template-list{
      padding: 15px 20px;
      border-bottom: 1px solid #ddd;
      overflow: hidden;
      .list-text{
        width: 110px;
        display: inline-block;
      }
    }
    .m-template-list:last-child{
      border-bottom: none;
    }
  }
}

</style>