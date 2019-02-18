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
        width="350"
        trigger="click">
        <div class="dropdown-content">
          <div class="search">
          <el-input size="medium" v-model="searchText" placeholder="请输入..."></el-input>
          </div>
          <div class="content">
            <ul>
              <li v-for="(item,idx) in companyList" :key="idx" @click="companyClick">{{item}}</li>
            </ul>
          </div>
        </div>
        <span slot="reference" class="el-dropdown-link">
          下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
      </el-popover>
    </div>

    <div class="item-table">
      <div class="add-button">
        <el-button type="text" @click="handleAdd"  size="small">添加</el-button>
        <el-button type="text" @click="handleCopy" :disabled="disabled" size="small">复制</el-button>
        <el-button type="text" @click="handleDel" :disabled="disabled" size="small">删除</el-button>
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
                {{index + 1}}.
                <span v-if="item.code">[{{item.code}}]</span>
                {{item.negReasonMsg}}
                <span style="color: #FFCC33;cursor: pointer;" class="ml-10" @click="handleShowRule(item)">{{'3次引用'}}</span>
              </span>
              <div class="fr">
                <template v-if="(index > (
                    activeName === '0' ? 5 :
                    activeName === '1' ? 2 : -1
                  )) && (item.active === true) ">
                  <img class="edit_icon"  @click="handleEdit(item)" src="../../../assets/img/edit.png" alt="">
                  <img class="edit_icon"  @click="handleSingleCopy(item)" src="../../../assets/img/copy.png" alt="">
                  <img class="edit_icon" @click="handleSingleSet(item)" src="../../../assets/img/set.png" alt="">
                  <img class="edit_icon" @click="handleSingleDel(item)" style="width: 14px; height: 14px;" src="../../../assets/img/Delete.png" alt="">
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
      <reason-view ref="view"></reason-view>

      <!--引用规则-->
      <quote-rules ref="quote"></quote-rules>
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
        companyList: ['公共','杭州晋天科技有限公司1111111111111111111111112333333333111111111111111','达飞云贷科技（北京）有限公司'],//公司列表
      }
    },
    computed: {
      disabled(){
        return !this.listDefault.find(it => it.selected);
      }
    },
    mounted() {
      // 加载列表
      this.loadList();
    },
    methods : {

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
          //TODO 批量删除

        }).catch(() => {
          //TODO 取消
        })
      },

      //复制审核意见
      handleCopy(){
        this.$refs.copy.show();
      },

      companyClick(){
        console.log(this.$refs.popover)
        this.$refs.popover.showPopper = false;
      },

      // 加载 列表
      loadList() {
        this.$http({
          method : 'post',
          url : '/reason/idCardAudit.htm',
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
        this.$refs.dialog.show('add');
      },
      // 点击修改
      handleEdit(row) {
        this.$refs.dialog.show('edit',row);
      },


      //显示引用
      handleShowRule(row) {
        //TODO query引用的规则
        this.$refs.quote.show(row)

      },

      //单个复制
      handleSingleCopy(row){
        this.$refs.copy.show();
      },

      //单个删除
      handleSingleDel(row) {
        this.$confirm("确定删除本条审核意见？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          center: true
        }).then(() => {
          //TODO 单个删除
        }).catch(() => {})
      },

      //单个设置
      handleSingleSet(row) {
        this.$refs.view.show(row);
      },

      // dialog success
      successCBK() {
        this.loadList();
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
