<template>
  <div class="idea-hear-option">
    <div class="wsbodyhead">
      <a>所在位置</a>
      <router-link to="advanceHearSetsList">预审设置</router-link>
      <a>审核意见维护</a>
    </div>

    <div class="item-title">
      <span class="item-title-sign">审核意见维护</span>
      <!--<div  class="fr" style="position: relative">-->
        <!--<span class="el-dropdown-link">-->
          <!--下拉菜单<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
        <!--</span>-->
        <!--<div class="dropdown-content">-->
          <!--<div class="search">-->
            <!--<el-input size="medium" v-model="searchText" placeholder="请输入..."></el-input>-->
          <!--</div>-->
          <!--<div class="content"></div>-->
        <!--</div>-->

      <!--</div>-->
      <el-popover
        placement="bottom"
        class="fr"
        ref="popover"
        @show = "searchText = ''"
        width="350"
        trigger="click">
        <div class="dropdown-content">
          <div class="search">
          <el-input size="medium" v-model="searchText" placeholder="请输入..."></el-input>
          </div>
          <div class="content">
            <ul>
              <li v-for="(item,idx) in companyList" :key="idx" @click="companyClick(item)">{{item.merchantName}}</li>
            </ul>
          </div>
        </div>
        <span slot="reference" class="el-dropdown-link">
          {{currentCompany.merchantName}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
      </el-popover>
    </div>

    <div class="item-table">
      <div class="add-button">
        <el-button type="text" @click="handleAdd"  size="small">添加</el-button>
        <el-button type="text" @click="handleCopy" :disabled="disabled" size="small">复制</el-button>
        <el-button type="text" @click="handleDel" :disabled="disabled1" size="small">删除</el-button>
      </div>

      <div class="tabs-box">
        <el-tabs v-model="activeName" @tab-click="handleTabClick">
          <el-tab-pane label="身份证审核" name="0"></el-tab-pane>
          <el-tab-pane label="签名审核" name="1"></el-tab-pane>
          <el-tab-pane label="证据链审核" name="2"></el-tab-pane>
        </el-tabs>
      </div>
      <div class="m-talbe-list">
        <ul>
          <template v-for="(item,index) in list">
            <li @mouseenter="handleMouseenter(item,index)" @mouseleave="handleMouseleave(item,index)" :key="item.reasonId + '' + index">

              <span>
                <el-checkbox v-model="item.selected"></el-checkbox>
                <span @click="labelClick(item)" style="cursor: pointer">
                  {{index + 1}}.
                <span v-if="item.code">[{{item.code}}]</span>
                {{item.negReasonMsg}}
                </span>

                <span style="color: #FFCC33;cursor: pointer;" class="ml-10" @click="handleShowRule(item)" v-if="item.returnCodeCount > 0">{{item.returnCodeCount}}次引用</span>
              </span>
              <div class="fr">
                <template v-if="item.active">
                  <img class="edit_icon" title="编辑" @click="handleEdit(item)" src="../../../assets/img/edit.png" alt="">
                  <img class="edit_icon" title="复制" @click="handleSingleCopy(item)" src="../../../assets/img/copy.png" alt="">
                  <img class="edit_icon" title="配置" @click="handleSingleSet(item)" src="../../../assets/img/set.png" alt="">
                  <img class="edit_icon" title="删除" v-if="( currentCompany && currentCompany.code == '0' && index > (
                    activeName === '0' ? 5 :
                    activeName === '1' ? 2 : -1
                  )) || (item.returnCodeCount !== 0)"  style="cursor:not-allowed;width: 14px; height: 14px;" src="../../../assets/img/delete_disabled.png" alt="">
                  <img class="edit_icon" v-else title="删除"  @click="handleSingleDel(item)" style="width: 14px; height: 14px;" src="../../../assets/img/Delete.png" alt="">
                  <!--<el-button @click="handleEdit(item)" type="text">修改</el-button>-->
                  <!--<span>|</span>-->
                  <!--<el-button @click="handleDelete(item)" type="text">删除</el-button>-->
                </template>
              </div>
            </li>
          </template>
        </ul>
      </div>

      <!-- 弹出框 -->
      <mdialog @successCBK="successCBK" :type="activeName" ref="dialog"></mdialog>

      <!--复制审核意见-->
      <reason-copy ref="copy"></reason-copy>

      <!--审核意见引用-->
      <reason-view ref="view" @successCBK="successCBK"></reason-view>

      <!--引用规则-->
      <quote-rules ref="quote" ></quote-rules>
    </div>
  </div>
</template>

<script>
  import reasonCopy from './modules/reasonCopy'
  import reasonView from './modules/reasonView'
  import quoteRules from './modules/quoteRules'
  import mdialog from './modules/dialog.vue'
  export default {
    components : {
      mdialog,
      reasonCopy,
      reasonView,
      quoteRules
    },
    data() {
      return {
        activeName : '0',
        list : [
          /* {
            // 原因
            reasonMsg : '',
            // id
            reasonId : '',
            // 类型 0-身份证意见，1-签名意见，2-证据意见
            reasonType : '',
          } */
        ],
        listDefault : [],
        searchText: '', //公司输入
        currentCompany: {}, //当前公司
        companyList: [],//公司列表
        companyListCopy: [] //公司列表复制
        // companyName: ''
      }
    },
    watch: {
      searchText(val,oldval){
        this.companyList = this.companyListCopy.filter(it => it.merchantName.indexOf(this.searchText) > -1);
      }
    },
    computed: {
      disabled(){
        return !this.listDefault.find(it => it.selected);
      },
      disabled1() {
        let arr = this.listDefault.filter(it => it.reasonType === 0).slice(6);
        let arr1 = this.listDefault.filter(it => it.reasonType === 1).slice(3);
        let arr2 = this.listDefault.filter(it => it.reasonType === 2);
        let res = arr.concat(arr1, arr2);
        let r = res.filter(it => it.selected);
        if(r.length === 0)
          return true;
        else
          return r.find(it => it.returnCodeCount > 0);
      }
    },
    mounted() {

    },
    methods : {

      labelClick(item){
        this.$set(item, 'selected', !item.selected);
      },

      //调取删除api
      doDelete(reasonIds){
        return this.$http.post("/reason/deleteErrorReasonByReasonId.htm",{reasonIds: reasonIds}).then(res => {
          return res;
        })
      },

      //批量删除
      handleDel() {
        this.$msgbox({
          title: '提示',
          message:`确定删除这${this.listDefault.filter(it => it.selected).length}条审核意见？`,
          center: true,
          showCancelButton: true,

          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
          //TODO 批量删除d
            this.doDelete(this.listDefault.filter(it => it.selected).map(v => v.reasonId).join(',')).then(res => {
              console.log(res);
              this.$message.success("删除成功")
              this.companyClick(this.currentCompany);
            })

        }).catch(() => {
          //TODO 取消
        })
      },

      //复制审核意见
      handleCopy(){
        this.$refs.copy.show(this.listDefault.filter(it => it.selected ), this.companyListCopy.slice(1).filter(it => it.code !== this.currentCompany.code));
      },

      companyClick(row){
        this.$refs.popover.showPopper = false;
        this.currentCompany = row;
        console.log({clientCode: row.code})
        this.loadList({clientCode: row.code})
      },

      //查询列表/reason/queryPreMerchantNameWithReason.htm
      queryPreMerchantName(){
        this.$http.post("/reason/queryPreMerchantNameWithReason.htm").then(res => {
            this.companyList = res.result;
            this.companyListCopy = JSON.parse(JSON.stringify(this.companyList));
          // 加载列表
          console.log(this.companyList[0])
          this.companyClick(this.companyList[0])
        })
      },


      // 加载 列表
      loadList(data) {
        this.$http({
          method : 'post',
          url : '/reason/idCardAudit.htm',
          data:data
        }).then((res) => {
          this.listDefault = res.result;
          this.initList();
        });
      },
      // 更新 列表
      initList() {
        this.list = this.listDefault.filter((v) => {
          return v.reasonType === +this.activeName;
        });
      },
      // 点击新增
      handleAdd() {
        this.$refs.dialog.show('add',this.currentCompany);
      },
      // 点击修改
      handleEdit(row) {
        this.$refs.dialog.show('edit',{...row, clientCode: this.currentCompany.code});
      },


      //显示引用
      handleShowRule(row) {
        //TODO query引用的规则
        this.$refs.quote.show(row)

      },

      //单个复制
      handleSingleCopy(row){
        this.$refs.copy.show(row, this.companyListCopy.slice(1).filter(it => it.code !== this.currentCompany.code), true);
      },

      //单个删除
      handleSingleDel(row) {
        this.$confirm("确定删除本条审核意见？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          center: true
        }).then(() => {
          // 单个删除
          this.doDelete(row.reasonId).then(res => {
            console.log(res);
            this.$message.success("删除成功")
            this.companyClick(this.currentCompany);
          })
        }).catch(() => {})
      },

      //单个设置
      handleSingleSet(row) {
        this.$http.post("/reason/queryClientTemplateRuleList.htm", {clientCode: this.currentCompany.code, errorCode: row.code}).then(res => {
          // console.log(res);
          this.$refs.view.show(row,res.result);

        })
      },

      // dialog success
      successCBK() {
        this.companyClick(this.currentCompany);
      },
      // 点击删除
      handleDelete(row) {
        this.$confirm("确定删除该审核意见吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          center: true
        }).then(() => {
          this.$http({
            method : 'post',
            url : '/reason/updateCause.htm',
            data : {
              reasonId : row.reasonId,
            },
          }).then((res) => {
            this.$message.success('删除成功');
            this.loadList();
          });
        }).catch(() => {});
      },
      // tab切换
      handleTabClick() {
        this.initList();
      },
      // 鼠标移入
      handleMouseenter(row,index) {
        this.$set(row,'active',true);
      },
      // 鼠标移出
      handleMouseleave(row,index) {
        this.list[index].active = false;
      },
    },
    created(){
      this.queryPreMerchantName();
    }
  }
</script>

<style lang="scss" scoped>

.edit_icon{
  width: 16px;
  height: 16px;
  margin-right: 10px;
  cursor: pointer;
}

.el-dropdown-link{
  cursor: pointer;
  color: #409eff;
}
.dropdown-content{
  width: 350px;
  background: #fff;
  z-index: 999;
  border: 1px solid #ccc;
  .search{
    padding: 10px;
    background: #F2F2F2;
    border-bottom: 1px solid #ccc;
  }
  .content{
    ul{
      max-height: 400px;
      overflow: auto;
      padding: 0 10px;
      li{
        cursor: pointer;
        line-height: 26px;
        font-size: 14px;
        overflow:hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }

}
.idea-hear-option{
  .item-table{
    position: relative;
    padding-left: 25px;
    padding-right: 25px;
    .tabs-box{

    }
    .add-button{
      position: absolute;
      right: 25px;
      top: 3px;
      z-index: 10;
    }
    .m-talbe-list{
      padding-bottom: 20px;
      li{
        padding: 15px;
        padding-bottom: 0;
        border-bottom: 1px dotted #ccc;
        overflow: hidden;
      }
      li:hover{
        background-color: #eee;
      }
      li:last-child{
        border-bottom: none;
      }
      .fr{
        margin-top: -13px;
        height: 40px;
        line-height: 40px;
      }
    }
  }
}

</style>
