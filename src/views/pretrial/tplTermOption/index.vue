<template>
  <div class="tpl-term-option">
    <div class="wsbodyhead">
      <a>所在位置</a>
      <router-link to="advanceHearSetsList">预审设置</router-link>
      <a>模板条件设置</a>
    </div>

    <div class="item-title of-hidden">
      <span class="item-title-sign">模板条件设置</span>
      <div class="fr">
        <el-button @click="handleAdd">添加</el-button>
      </div>
    </div>

    <div class="item-table">
      <ul>
        <template v-for="(item,index) in list">
          <li @mouseenter="handleMouseenter(item,index)" @mouseleave="handleMouseleave(item,index)" :key="item.conditionId + '' + index">
            <div class="m-text">{{index + 1}}.{{item.detailMessage}}</div>
            <div class="fr">
              <template v-if="(item.active === true)">
                <el-button @click="handleEdit(item)" type="text">修改</el-button>
                <span>|</span>
                <el-button @click="handleDelete(item)" type="text">删除</el-button>
              </template>
            </div>
          </li>
        </template>
      </ul>
    </div>

    <mdialog @successCBK="successCBK" ref="dialog"></mdialog>
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
        list : [
          /* {
            // id
            conditionId : '',
            // 文案
            detailMessage : '',
          } */
        ],
      }
    },
      mounted() {
      this.initList();
    },
    methods : {
      // 列表接口
      initList() {
        this.$http({
          method : 'post',
          url : '/reason/templateConditions.htm',
        }).then((res) => {
          this.list = res.result;
        });
      },
      // 点击 添加
      handleAdd() {
        this.$refs.dialog.show('add');
      },
      // 点击 修改
      handleEdit(row) {
        this.$refs.dialog.show('edit',row);
      },
      // dialog 成功 回调
      successCBK() {
        this.initList();
      },
      // 点击 删除
      handleDelete(row) {
        this.$confirm("确定删除该条件?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          center: true
        }).then(() => {
          this.$http({
            method : 'post',
            url : '/reason/deletedTemplate.htm',
            data : {
              conditionId : row.conditionId,
            },
          }).then((res) => {
            this.$message.success('删除成功');
            this.initList();
          });
        }).catch(() => {});
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

.tpl-term-option{
  .item-title{
    padding-top: 5px;
    padding-bottom: 5px;
  }
  .item-title-sign{
    margin-top: 12px;
    display: inline-block;
  }
  .item-table{
    padding: 25px 30px 20px 25px;
    li{
      overflow: hidden;
      border-bottom: 1px dotted #ccc;
      padding-top: 20px;
      padding-bottom: 10px;
      padding-left: 10px;
      line-height: 20px;
      .m-text{
        width: 730px;
        float: left;
      }
      .fr{
        margin-top: -5px;
        height: 40px;
        padding-right: 20px;
      }
    }
    li:hover{
      background-color: #eee;
    }
  }
}

</style>
