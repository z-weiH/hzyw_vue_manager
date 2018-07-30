<template>
  <div class="arbitrament-users-manage-detail">
    <el-dialog
      title="用户详情"
      :visible.sync="dialogVisible"
      width="700px"
      @close="handleClose"
      ref="dialog"
    >
      <div class="m-content">
        <table
          class="m-primordial-table 
            el-table el-table--fit el-table--border 
            el-table--enable-row-hover"
        >
          <tr>
            <td colspan="4">客户基本信息</td>
          </tr>

          <tr>
            <td colspan="1">企业名称：</td>
            <td colspan="1">{{ruleForm.merchantName}}</td>
            <td colspan="1">申请人：</td>
            <td colspan="1">{{ruleForm.defaultApplicants === 1 ? '是' : '否'}}</td>
          </tr>

          <tr>
            <td colspan="1">客户名称：</td>
            <td colspan="1">{{ruleForm.name}}</td>
            <td colspan="1">所属商户：</td>
            <td colspan="1">{{ruleForm.merchantName}}</td>
          </tr>

          <tr>
            <td colspan="1">所属账户：</td>
            <td colspan="1">{{ruleForm.acctName}}</td>
            <td colspan="1">客户类型：</td>
            <td colspan="1">{{ruleForm.type === 0 ? '自然人' : '企业'}}</td>
          </tr>

          <tr>
            <td colspan="1">开户时间：</td>
            <td colspan="3">{{ruleForm.createTime}}</td>
          </tr>

          <tr>
            <td colspan="1">其他信息：</td>
            <td colspan="3">{{ruleForm.remark}}</td>
          </tr>

        </table>

        <table
          class="m-primordial-table mt-10
            el-table el-table--fit el-table--border 
            el-table--enable-row-hover"
        >

          <!-- 自然人 信息 -->
          <template v-if="ruleForm.type === 0">
            <tr>
              <td colspan="4">自然人信息</td>
            </tr>

            <tr>
              <td colspan="1">民族：</td>
              <td colspan="1">{{ruleForm.nation}}</td>
              <td colspan="1">性别：</td>
              <td colspan="1">{{ruleForm.sex === 0 ? '女' : '男'}}</td>
            </tr>

            <tr>
              <td colspan="1">手机号：</td>
              <td colspan="1">{{ruleForm.phone}}</td>
              <td colspan="1">电子邮箱：</td>
              <td colspan="1">{{ruleForm.email}}</td>
            </tr>

            <tr>
              <td colspan="1">出生年月：</td>
              <td colspan="1">{{ruleForm.birth}}</td>
              <td colspan="2"></td>
            </tr>

            <tr>
              <td colspan="1">证件类型：</td>
              <td colspan="1">{{ruleForm.idtype === 0 ? '身份证' : '营业执照'}}</td>
              <td colspan="1">证件号：</td>
              <td colspan="1">{{ruleForm.idcard}}</td>
            </tr>

            <tr>
              <td colspan="1">身份证正面照：</td>
              <td colspan="1">
                <a class="underline" target="_blank" :href="ruleForm.img01">查看</a>
              </td>
              <td colspan="1">身份证反面照：</td>
              <td colspan="1">
                <a class="underline" target="_blank" :href="ruleForm.img02">查看</a>
              </td>
            </tr>

            <tr>
              <td colspan="1">证件地址：</td>
              <td colspan="3">{{ruleForm.idaddress}}</td>
            </tr>

            <tr>
              <td colspan="1">通讯地址：</td>
              <td colspan="3">{{ruleForm.address}}</td>
            </tr>

          </template>
          <!-- 企业 信息 -->
          <template v-else>

            <tr>
              <td colspan="4">企业信息</td>
            </tr>

            <tr>
              <td colspan="1">法定代表人：</td>
              <td colspan="1">{{ruleForm.legaller}}</td>
              <td colspan="1">法定代表人职务：</td>
              <td colspan="1">{{ruleForm.position}}</td>
            </tr>

            <tr>
              <td colspan="1">手机号：</td>
              <td colspan="1">{{ruleForm.phone}}</td>
              <td colspan="1">电子邮箱：</td>
              <td colspan="1">{{ruleForm.email}}</td>
            </tr>

            <tr>
              <td colspan="1">证件类型：</td>
              <td colspan="1">{{ruleForm.idtype === 0 ? '身份证' : '营业执照'}}</td>
              <td colspan="1">证件号：</td>
              <td colspan="1">{{ruleForm.idcard}}</td>
            </tr>

            <tr>
              <td colspan="1">证件链接：</td>
              <td colspan="3">
                <a class="underline" target="_blank" :href="ruleForm.img01">查看</a>
              </td>
            </tr>

            <tr>
              <td colspan="1">证件地址：</td>
              <td colspan="3">{{ruleForm.idaddress}}</td>
            </tr>

            <tr>
              <td colspan="1">通讯地址：</td>
              <td colspan="3">{{ruleForm.address}}</td>
            </tr>

          </template>
        </table>

        <!-- 电子签章 -->
        <table
          class="m-primordial-table mt-10
            el-table el-table--fit el-table--border 
            el-table--enable-row-hover"
        >
          <tr>
            <td colspan="4">电子签章</td>
          </tr>
          <tr>
            <td colspan="1">签章图片：</td>
            <td colspan="3">
              <a v-if="ruleForm.signedUrl" class="underline" target="_blank" :href="ruleForm.signedUrl">查看</a>
              <span v-else>暂无图片</span>
            </td>
          </tr>
        </table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleClose">返 回</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dialogVisible : false,

        ruleForm : {

        },
      }
    },
    methods: {
      show(row) {
        // 获取详情数据
        this.$http({
          method : 'post',
          url : '/hzuser/selectUserDetailByUserId.htm',
          data : {
            userId : row.userId,
          },
        }).then((res) => {
          this.dialogVisible = true;
          this.ruleForm = res.result;
        });
        // dialog 返回顶部
        this.$nextTick(() => {
          this.$refs.dialog.$el.scrollTop = 0;
        });
      },
      //关闭浮层
      handleClose() {
        this.dialogVisible = false;
      }
    },
  }
</script>

<style lang="scss" scoped>

.arbitrament-users-manage-detail{

}

</style>