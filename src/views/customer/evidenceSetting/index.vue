<template>
  <div class="evidence-setting">
    <div class="wsbodyhead">
      <a>所在位置</a>
      <a href="javascript:;" class="aside_tit">模板设置</a>
    </div>

    <div class="item-title of-hidden" draggable="true" ref="dragbox">
      <span class="item-title-sign">证据设置（{{title}}）</span>
    </div>

    <div class="item-table">
      <draggable v-model="evidenceList">
        <div v-for="(item,index) in evidenceList" :key="index" class="m-item-list">
          <div class="m-parent">
            <el-row>
              <el-col :span="2">
                <div class="line-h m-color">
                  <span>•</span>
                  <span>证据组{{index + 1}}</span>
                </div>
              </el-col>
              <el-col :span="13">
                <div class="line-h" style="width:100%;" :title="item.eviObject">
                  {{item.eviObject}}
                </div>
              </el-col>
              <el-col :span="9" style="text-align:right;">
                <el-button @click="handleEditEvidenceGroup(item,index)" size="medium" round style="margin-left:33px">修改</el-button>
                <el-button @click="handleAddEvidence(item,index)" type="primary" size="medium" round>新增证据</el-button>
                <el-button @click="handleDeleteEvidenceGroup(item,index)" size="medium" round>删除证据组</el-button>
              </el-col>
            </el-row>
          </div>
          <ul class="m-ul">
            <draggable class="dragArea" v-model="item.eviList" :options="{group:'article'}">
              <li v-for="(eviList,key) in item.eviList" :key="key">
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
                      <el-button @click="handleEditEvidence(index,key,eviList)" size="medium" round class="mr-5">修改</el-button>
                      <el-button @click="handleDeleteEvidence(index,key)" size="medium" round class="mr-5">删除证据</el-button>
                    </div>
                  </el-col>
                </el-row>
              </li>
            </draggable>
          </ul>
        </div>
      </draggable>

      <div v-if="evidenceList.length === 0" :style="{
        'height' : '60px',
        'line-height' : '60px',
        'text-align' : 'center',
        'font-size' : '18px',
      }">
        <span>暂无证据组</span>
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
  // 拖拽组件
  import draggable from 'vuedraggable'
  export default {
    components : {
      evidenceGroupDialog,
      evidenceDialog,
      draggable,
    },
    data() {
      return {
        title : '',
        // 证据组 列表
        evidenceList : [
          {
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
          }
        ],

        // 修改证据组 index
        evidenceGroupIndex : '',
        // 修改证据 index
        evidenceIndex : '',
      }
    },
    mounted() {
      this.initList();
      // 绑定拖拽相关事件
      document.addEventListener('dragleave',this.dragFn);
      document.addEventListener('drop',this.dragFn);
      document.addEventListener('dragenter',this.dragFn);
      document.addEventListener('dragover',this.dragFn);
      // 源
      this.$refs.dragbox.addEventListener('dragstart',this.dragstartFn);
      // 目标
      this.$refs.dragbox.addEventListener('drop',this.dropFn);

      // 获取产品 模板号
      this.$http({
        url : '/templateSetting/queryTemplateInfoByProdTempId.htm',
        method : 'post',
        data : {
          prodTempId : this.$route.query.prodTempId,
        },
      }).then((res) => {
        this.title = res.result.prodTempName;
      });
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
          let arr = res.result.map((v,k) => {
            let children = v.eviList;
            let arr = children.map((v1,k1) => {
              v1.evidenceNameText = v1.eviTitle;
              v1.evidenceNameInput = v1.eviName;
              return v1;
            });
            v.eviList = arr;
            return v;
          });
          // 根据 groupNum排序
          this.evidenceList = arr.sort((a,b) => {
            if(a.groupNum > b.groupNum) {
              return 1;
            }else if(a.groupNum < b.groupNum) {
              return -1;
            }else {
              return 0;
            }
          });
        });
      },
      // 点击 取消
      handleGoBack() {
        this.$confirm('确认退出吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          cancelButtonClass: 'cancel',
          confirmButtonClass: 'confirm',
          center: true,
        }).then(() => {
        this.$router.push(`tplSettingEdit?clientCode=${this.$route.query.clientCode}&prodTempId=${this.$route.query.prodTempId}&templateId=${this.$route.query.templateId}`);
        },() => {
        });
      },
      
      // 点击新增证据
      handleAddEvidence(iten,index) {
        this.$refs.evidenceDialog.show(index,'add');
      },
      // 新增证据成功回调
      evidenceCBK(index,data,type) {
        if(type === 'add') {
          this.evidenceList[index].eviList.push({
            baseId : data.tableDataActive.baseId,
            signStatus : data.signStatus,
            eviNum : data.tableDataActive.eviNum,
            eviCode : data.tableDataActive.eviCode,
            evidenceNameText : data.tableDataActive.eviTitle,
            evidenceNameInput : data.evidenceNameInput,
          });
        }else{
          let obj = {
            baseId : data.tableDataActive.baseId,
            signStatus : data.signStatus,
            eviNum : data.tableDataActive.eviNum,
            eviCode : data.tableDataActive.eviCode,
            evidenceNameText : data.tableDataActive.eviTitle,
            evidenceNameInput : data.evidenceNameInput,
          };
          this.$set(this.evidenceList[index].eviList,this.evidenceIndex,obj);
        }
      },
      // 点击删除证据
      handleDeleteEvidence(index,key) {
        if(this.evidenceList[index].eviList.length > 1) {
          this.evidenceList[index].eviList.splice(key,1);
        }else{
          this.$message.warning('请至少保留一个证据');
        }
      },
      // 点击修改证据
      handleEditEvidence(index,key,row) {
        this.evidenceIndex = key;
        this.$refs.evidenceDialog.show(index,'edit',row);
      },
      // 点击新增证据组
      handleAddEvidenceGroup() {
        this.$refs.evidenceGroupDialog.show('add');
      },
      // 新增证据组成功 回调
      evidenceGroupCBK(type,data) {
        if(type === 'add') {
          this.evidenceList.push(
            {
              eviObject : data,
              eviList : [],
            }
          );
        }else{
          this.evidenceList[this.evidenceGroupIndex].eviObject = data;
        }
      },
      // 点击修改证据组
      handleEditEvidenceGroup(row,index) {
        this.evidenceGroupIndex = index;
        this.$refs.evidenceGroupDialog.show('edit',row);
      },
      // 点击删除证据组
      handleDeleteEvidenceGroup(item,index) {
        if(this.evidenceList.length > 1) {
          this.evidenceList.splice(index,1);
        }else{
          this.$message.warning('请至少保留一个证据组');
        }
      },
      // 点击保存
      handleSubmit() {
        // 校验数据
        let verifyType = true;
        this.evidenceList.map((v,k) => {
          if(verifyType && v.eviList.length === 0) {
            verifyType = false;
            this.$message.warning('请确保证据组下至少有一条证据');
          }
        });
        if(verifyType) {
          // 数据处理
          let list = objDeepCopy(this.evidenceList);
          list = list.map((v,k) => {
            v.eviList = v.eviList.map((v1,k1) => {
              let obj = {
                baseId : v1.baseId,
                eviTitle : v1.evidenceNameInput,
                signStatus : v1.signStatus,
                sortIndex : k1 + 1,
              }
              return obj;
            });
            v.eviObject = v.eviObject;
            v.groupNum = k + 1;
            return v
          });
          this.$http({
            url : '/eviConfigure/saveEviList.htm',
            method : 'post',
            data : {
              group : list,
              prodTempId : this.$route.query.prodTempId,
            },
            mheaders : true,
          }).then((res) => {
            this.$message.success('保存成功');
          });
        }
      },

      // 拖拽相关事件
      dragFn(e) {
        e.preventDefault();
      },
      dragstartFn(e) {
        e.dataTransfer.setData('evidenceList',JSON.stringify(this.evidenceList)); 
      },
      dropFn(e) {
        this.evidenceList = JSON.parse(e.dataTransfer.getData('evidenceList'));
      },
    },
    // 销毁
    beforeDestroy() {
      document.removeEventListener('dragleave',this.dragFn);
      document.removeEventListener('drop',this.dragFn);
      document.removeEventListener('dragenter',this.dragFn);
      document.removeEventListener('dragover',this.dragFn);
      this.$refs.dragbox.removeEventListener('dragstart',this.dragstartFn);
      this.$refs.dragbox.removeEventListener('drop',this.dropFn);
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
  // 拖拽样式
  .sortable-chosen {
    background-color: rgba(15,53,127,.1);
  }
  .sortable-ghost {
    background-color: rgba(15,53,127,.3);
  }
  .dragArea{
    min-height: 20px;
  }
}

</style>