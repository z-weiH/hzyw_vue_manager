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
                <span>{{item.group.groupNum}}{{index + 1}}</span>
              </div>
            </el-col>
            <el-col :span="16">
              <div class="ellipsis line-h" style="width:100%;">
                {{item.group.eviObject}}
              </div>
            </el-col>
            <el-col :span="6">
              <el-button @click="handleAddEvidence(item,index)" type="primary" size="medium" round>新增证据</el-button>
              <el-button @click="handleDeleteEvidenceGroup(item,index)" size="medium" round>删除证据组</el-button>
            </el-col>
          </el-row>
        </div>
        <ul class="m-ul">
          <li v-if="item.group.eviList && item.group.eviList.length > 0" v-for="(eviList,key) in item.group.eviList" :key="key">
            <el-row>
              <el-col :span="12">
                <p>证据{{key + 1}}：{{eviList.eviNum}},{{eviList.eviCode}},{{eviList.evidenceNameText}}</p>
                <p class="mt-15">证据名称：{{eviList.evidenceNameInput}}</p>
              </el-col>
              <el-col :span="6">
                <p style="margin-top:28px;">是否签章：{{eviList.signStatus === 0 ? '否' : '是'}}</p>
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
        <el-button @click="handleGoBack">返回</el-button>
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
  import {objDeepCopy} from '@/assets/js/tool'
  export default {
    components : {
      evidenceGroupDialog,
      evidenceDialog,
    },
    data() {
      return {
        // 证据组 列表
        evidenceList : [
          {
            group : {
              // 组号
              groupNum : '',
              // 证据对象
              eviObject : '',
              // 证据 列表
              eviList : [
                {
                  // 证据 id
                  baseId : '',
                  // 签章是否读取,0:不读取,1:读取
                  signStatus : '',
                  // 证据排序 （数组下标）
                  sortIndex : '',
                  // 证据号
                  eviNum : '',
                  // 证据编码
                  eviCode : '',

                  // 前端字段 解决后端字段保存和编辑回显 字段不统一问题
                  // 证据名称(前端字段 纯文案) 
                  evidenceNameText : '',
                  // 证据名称（前端字段 手动输入）
                  evidenceNameInput : '',
                }
              ],
            },
          }
        ],
      }
    },
    mounted() {
      this.initList();
    },
    methods : {
      // 初始化 列表
      initList() {
        this.$http({
          url : '/eviConfigure/eviList.htm',
          method : 'post',
          data : {
            prodTempId : this.$route.query.prodTempId,
          },
        }).then((res) => {
          // 数据处理
          this.evidenceList = res.result.list.map((v,k) => {
            let children = v.group.eviList;
            let arr = children.map((v1,k1) => {
              v1.evidenceNameText = v1.eviTitle;
              v1.evidenceNameInput = v1.eviName;
              return v1;
            });
            v.group.eviList = arr;
            return v;
          });
        });
      },
      // 点击 取消
      handleGoBack() {
        this.$router.push(`tplSettingEdit?clientCode=${this.$route.query.clientCode}&prodTempId=${this.$route.query.prodTempId}`);
      },
      
      // 点击新增证据
      handleAddEvidence(iten,index) {
        this.$refs.evidenceDialog.show(index);
      },
      // 新增证据成功回调
      evidenceCBK(index,data) {
        this.evidenceList[index].group.eviList.push({
          baseId : data.tableDataActive[0].baseId,
          signStatus : data.signStatus,
          eviNum : data.tableDataActive[0].eviNum,
          eviCode : data.tableDataActive[0].eviCode,
          evidenceNameText : data.tableDataActive[0].eviTitle,
          evidenceNameInput : data.evidenceNameInput,
        });
      },
      // 点击删除证据
      handleDeleteEvidence(index,key) {
        if(this.evidenceList[index].group.eviList.length > 1) {
          this.evidenceList[index].group.eviList.splice(key,1);
        }
      },
      // 点击新增证据组
      handleAddEvidenceGroup() {
        this.$refs.evidenceGroupDialog.show();
      },
      // 新增证据组成功 回调
      evidenceGroupCBK(data) {
        this.evidenceList.push(
          {
            group : {
              groupNum : '证据组',
              eviObject : data,
              eviList : [],
            }
          }
        );
      },
      // 点击删除证据组
      handleDeleteEvidenceGroup(item,index) {
        if(this.evidenceList.length > 1) {
          this.evidenceList.splice(index,1);
        }
      },
      // 点击保存
      handleSubmit() {
        // 校验数据
        let verifyType = true;
        this.evidenceList.map((v,k) => {
          if(verifyType && v.group.eviList.length === 0) {
            verifyType = false;
            this.$message.warning('请确保证据组下至少有一条证据');
          }
        });
        if(verifyType) {
          // 数据处理
          let list = [];
          let data = objDeepCopy(this.evidenceList);
          data = data.map((v,k) => {
            v.group.eviList = v.group.eviList.map((v1,k1) => {
              let obj = {
                baseId : v1.baseId,
                eviTitle : v1.evidenceNameInput,
                signStatus : v1.signStatus,
                sortIndex : k1,
              }
              return obj;
            });
            return v
          });
          this.$http({
            url : '/eviConfigure/saveEviList.htm',
            method : 'post',
            data : data,
            mheaders : true,
          }).then((res) => {
            this.$message.success('保存成功');
          });
        }
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