<template>
  <div class="evidence-setting">
    <div class="wsbodyhead">
      <a>所在位置</a>
      <a href="javascript:;" class="aside_tit">模板设置</a>
    </div>

    <div class="item-title of-hidden">
      <span class="item-title-sign">证据设置</span>
    </div>

    <div class="item-table">
      <div v-for="(item,index) in evidenceList" :key="index" class="m-item-list">
        <div class="m-parent">
          <el-row>
            <el-col :span="2">
              <div class="line-h m-color">
                <span>•</span>
                <span>证据组{{index + 1}}</span>
              </div>
            </el-col>
            <el-col :span="16">
              <div class="ellipsis line-h" style="width:100%;">
                我是证明对象
              </div>
            </el-col>
            <el-col :span="6">
              <el-button @click="handleAddEvidence(item,index)" type="primary" size="medium" round>新增证据</el-button>
              <el-button @click="handleDeleteEvidenceGroup(item,index)" size="medium" round>删除证据组</el-button>
            </el-col>
          </el-row>
        </div>
        <ul class="m-ul">
          <li v-for="(children,key) in item.children" :key="key">
            <el-row>
              <el-col :span="12">
                <p>证据{{key + 1}}：30，啦啦啦啦</p>
                <P class="mt-15">证据名称：啦啦啦</P>
              </el-col>
              <el-col :span="6">
                <P style="margin-top:28px;">是否签章：是</P>
              </el-col>
              <el-col :span="6">
                <div class="fr">
                  <el-button @click="handleDeleteEvidence(index,key)" size="medium" round class="mr-5">删除证据</el-button>
                </div>
              </el-col>
            </el-row>
          </li>
        </ul>
      </div>

      <div class="text-center" style="margin-top: 40px;margin-bottom: 40px;">
        <el-button @click="handleAddEvidenceGroup" type="primary">
          <i class="el-icon-circle-plus-outline"></i>
          新增证据组
        </el-button>
        <el-button @click="handleSubmit" type="primary">保存</el-button>
        <el-button @click="handleGoBack">取消</el-button>
      </div>
    </div>

    <evidenceGroupDialog @successCBK="evidenceGroupCBK" ref="evidenceGroupDialog"></evidenceGroupDialog>
    <evidenceDialog @successCBK="evidenceCBK" ref="evidenceDialog"></evidenceDialog>
  </div>
</template>

<script>
  // 新增证据组
  import evidenceGroupDialog from './modules/evidenceGroupDialog.vue'
  // 新增证据
  import evidenceDialog from './modules/evidenceDialog.vue'
  export default {
    components : {
      evidenceGroupDialog,
      evidenceDialog,
    },
    data() {
      return {
        evidenceList : [{children : [{}]},{children:[{},{}]}],
      }
    },
    methods : {
      // 点击 取消
      handleGoBack() {
        this.$router.push('tplSettingEdit');
      },
      
      // 点击新增证据
      handleAddEvidence(iten,index) {
        this.$refs.evidenceDialog.show(index);
      },
      // 新增证据成功回调
      evidenceCBK(index,data) {
        this.evidenceList[index].children.push({});
      },
      // 点击删除证据
      handleDeleteEvidence(index,key) {
        if(this.evidenceList[index].children.length > 1) {
          this.evidenceList[index].children.splice(key,1);
        }
      },
      // 点击新增证据组
      handleAddEvidenceGroup() {
        this.$refs.evidenceGroupDialog.show();
      },
      // 新增证据组成功 回调
      evidenceGroupCBK(data) {
        this.evidenceList.push({children : []});
      },
      // 点击删除证据组
      handleDeleteEvidenceGroup(item,index) {
        if(this.evidenceList.length > 1) {
          this.evidenceList.splice(index,1);
        }
      },
      // 点击保存
      handleSubmit() {

      },
    },
  }
</script>

<style lang="scss" scoped>

.evidence-setting{
  .m-item-list{
    .line-h{
      line-height: 36px;
    }
    .m-color{
      color: #0F357F;
      font-weight: bold;
    }
    .m-parent{
      background-color: #F7F9FE;
      padding: 15px 20px;
      border-bottom: 1px solid #ddd;
    }
    .m-ul{
      li{
        border-bottom: 1px solid #ddd;
        padding: 15px 20px;
        color: #aaa;
      }
    }
  }
  .text-center{
    text-align: center;
  }
}

</style>