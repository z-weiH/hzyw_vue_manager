<template>
  <div class="idea-hear-option">
    <div class="wsbodyhead">
      <a>所在位置</a>
      <router-link to="advanceHearSetsList">预审设置</router-link>
      <a>审核意见维护</a>
    </div>

    <div class="item-title of-hidden">
      <span class="item-title-sign">审核意见维护</span>
    </div>

    <div class="item-table">
      <el-button @click="handleAdd" class="add-button" size="small">添加</el-button>
      <div class="tabs-box">
        <el-tabs v-model="activeName" @tab-click="handleTabClick">
          <el-tab-pane label="身份证意见" name="0"></el-tab-pane>
          <el-tab-pane label="签名意见" name="1"></el-tab-pane>
          <el-tab-pane label="证据意见" name="2"></el-tab-pane>
        </el-tabs>
      </div>
      <div class="m-talbe-list">
        <ul>
          <template v-for="(item,index) in list">
            <li @mouseenter="handleMouseenter(item,index)" @mouseleave="handleMouseleave(item,index)" :key="item.reasonId + '' + index">
              <span>{{index + 1}}.{{item.postiveReason}}</span>
              <div class="fr">
                <template v-if="(index > 5) && (item.active === true)">
                  <el-button @click="handleEdit(item)" type="text">修改</el-button>
                  <span>|</span>
                  <el-button @click="handleDelete(item)" type="text">删除</el-button>
                </template>
              </div>
            </li>
          </template>
        </ul>
      </div>

      <!-- 弹出框 -->
      <mdialog @successCBK="successCBK" :type="activeName" ref="dialog"></mdialog>
    </div>
  </div>
</template>

<script>
  import mdialog from './modules/dialog.vue'
  export default {
    components : {
      mdialog,
    },
    data() {
      return {
        activeName : '0',
        list : [
          {
            // 原因
            postiveReason : '', 
            // id
            reasonId : '',
            // 类型 0-身份证意见，1-签名意见，2-证据意见
            reasonType : '',
          }
        ],
        listDefault : [],
      }
    },
    mounted() {
      // 加载列表
      this.loadList();
    },
    methods : {
      // 加载 列表
      loadList() {
        this.$http({
          method : 'post',
          url : '/reason/idCardAudit.htm',
        }).then((res) => {
          this.listDefault = res.result.list;
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
      }
    }
  }
}

</style>