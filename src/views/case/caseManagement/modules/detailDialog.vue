<template>
  <div class="case-management-detail-dialog">
    <el-dialog
      title="案件详情"
      :visible.sync="dialogVisible"
      width="800px"
      @close="handleClose"
    >
      <div class="m-content">
        <!-- 第一部分：案件基本信息 -->
        <table
          class="m-primordial-table 
            el-table el-table--fit el-table--border 
            el-table--enable-row-hover"
        >
          <tr>
            <td colspan="4">第一部分：案件基本信息</td>
          </tr>

          <tr>
            <td colspan="1">案件名称：</td>
            <td colspan="3">
              <!-- 申请人+与+被申请人+caseCause -->
              {{ruleForm.hzCaseInfoVO.applicants}}与{{ruleForm.hzCaseInfoVO.respondents}}{{ruleForm.hzCaseInfoVO.caseCause}}
            </td>
          </tr>

          <tr>
            <td colspan="1">提交时间：</td>
            <td colspan="1">{{ruleForm.hzCaseInfoVO.submitTime}}</td>
            <td colspan="1">案件程序：</td>
            <td colspan="1">{{ruleForm.hzCaseInfoVO.caseType}}</td>
          </tr>

          <tr>
            <td colspan="1">案件标的：</td>
            <td colspan="1">{{ruleForm.hzCaseInfoVO.amtBorrow}}</td>
            <td colspan="1">管辖权理由：</td>
            <td colspan="1">{{ruleForm.hzCaseInfoVO.caseCause}}</td>
          </tr>

        </table>

        <!-- 申请人信息 与 被申请人信息 -->
        <template v-for="(item,index) in ruleForm.litigants">
          <table
            class="m-primordial-table mt-10
              el-table el-table--fit el-table--border 
              el-table--enable-row-hover"
            :key="index"
          >

            <!-- 企业 -->
            <template v-if="item.type === 1">

              <tr>
                <td class="m-bg" colspan="4">
                  第{{index === 0 ? '二' : '三'}}部分：
                  {{item.litigantType === 0 ? '申请人' : '被申请人'}}信息（{{item.type === 1 ? '企业' : '个人'}}）
                </td>
              </tr>

              <tr>
                <td colspan="1">企业名称：</td>
                <td colspan="1">{{item.name}}</td>
                <td colspan="1">证件类型：</td>
                <td colspan="1">
                  {{item.idtype === 0 ? '身份证' : '营业执照'}}
                </td>
              </tr>

              <tr>
                <td colspan="1">证件号码：</td>
                <td colspan="1">{{item.idcard}}</td>
                <td colspan="1">营业执照：</td>
                <td colspan="1">
                  <a class="underline" target="_blank" :href="item.img01">查看</a>
                </td>
              </tr>

              <tr>
                <td colspan="1">注册地址：</td>
                <td colspan="3">{{item.idaddress}}</td>
              </tr>

              <tr>
                <td colspan="1">法定代表人：</td>
                <td colspan="1">{{item.legaller}}</td>
                <td colspan="1">职位：</td>
                <td colspan="1">{{item.position}}</td>
              </tr>

              <tr>
                <td colspan="1">手机号：</td>
                <td colspan="1">{{item.phone}}</td>
                <td colspan="1">邮箱：</td>
                <td colspan="1">{{item.email}}</td>
              </tr>

              <tr>
                <td colspan="1">通讯住址：</td>
                <td colspan="3">{{item.address}}</td>
              </tr>

            </template>
            <!-- 个人 -->
            <template v-else>

              <tr>
                <td class="m-bg" colspan="4">
                  第{{index === 0 ? '二' : '三'}}部分：
                  {{item.litigantType === 0 ? '申请人' : '被申请人'}}信息（{{item.type === 1 ? '企业' : '个人'}}）
                </td>
              </tr>

              <tr>
                <td colspan="1">姓名：</td>
                <td colspan="1">{{item.name}}</td>
                <td colspan="1">性别：</td>
                <td colspan="1">
                  {{item.sex === 0 ? '女' : '男'}}
                </td>
              </tr>

              <tr>
                <td colspan="1">民族：</td>
                <td colspan="1">{{item.nation	}}</td>
                <td colspan="1">出生年月：</td>
                <td colspan="1">{{item.birth}}</td>
              </tr>

              <tr>
                <td colspan="1">手机号：</td>
                <td colspan="1">{{item.phone}}</td>
                <td colspan="1">邮箱：</td>
                <td colspan="1">{{item.email}}</td>
              </tr>

              <tr>
                <td colspan="1">证件类型：</td>
                <td colspan="1">
                  {{item.idtype === 0 ? '身份证' : '营业执照'}}
                </td>
                <td colspan="1">证件号码：</td>
                <td colspan="1">{{item.idcard}}</td>
              </tr>

              <tr>
                <td colspan="1">身份证正面：</td>
                <td colspan="1">
                  <a class="underline" target="_blank" :href="item.img01">查看</a>
                </td>
                <td colspan="1">身份证反面：</td>
                <td colspan="1">
                  <a class="underline" target="_blank" :href="item.img02">查看</a>
                </td>
              </tr>

              <tr>
                <td colspan="1">证件地址：</td>
                <td colspan="3">{{item.idaddress}}</td>
              </tr>

              <tr>
                <td colspan="1">住址：</td>
                <td colspan="3">{{item.address}}</td>
              </tr>

            </template>

          </table>

        </template>

        <!-- 第四部分：案件主要信息 -->
        <table
          class="m-primordial-table mt-10
            el-table el-table--fit el-table--border 
            el-table--enable-row-hover"
        >
          <tr>
            <td colspan="1">诉讼请求：</td>
            <td colspan="3">{{ruleForm.hzCaseInfoVO.requireItem}}</td>
          </tr>

          <tr>
            <td colspan="1">事实与理由：</td>
            <td colspan="3">{{ruleForm.hzCaseInfoVO.factsReason}}</td>
          </tr>
        </table>

        <table
          class="m-primordial-table mt-10
            el-table el-table--fit el-table--border 
            el-table--enable-row-hover"
        >
          <tr>
            <td>序号</td>
            <td>证据名称</td>
            <td>证据来源</td>
            <td>形式</td>
            <td>页数</td>
            <td>操作</td>
          </tr>
          <!-- 一层循环 -->
          <template v-for="(item,index) in ruleForm.evidences">

            <!-- 二层循环 -->
            <template v-for="(child,ind) in item.details">
              <tr :key="ind">
                <td v-if="ind === 0" :rowspan="item.details.length" colspan="1">
                  {{index + 1}}
                </td>
                <td colspan="1">2{{ind}}</td>
                <td colspan="1">3</td>
                <td colspan="1">4</td>
                <td colspan="1">5</td>
                <td>
                  <a class="underline" target="_blank" :href="child.eviFileurl">查看</a>
                </td>
              </tr>
            </template>

          </template>

        </table>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleClose">返回</el-button>
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
          // 基本信息
          hzCaseInfoVO : {
            // 案件名称 申请人+与+被申请人+caseCause

            // 提交时间
            submitTime : '',
            // 案件程序
            caseType : '',
            // 案件标的
            amtBorrow : '',
            // 管辖权理由
            caseCause : '',
            // 诉讼请求
            requireItem : '',
            // 事实与理由
            factsReason : '',
          },
          

          // 申请人 与 被申请人 list 0申请人，1被申请人
          litigants : [
            {
              // 	用户类型 	0个人 1企业
              type : 1,
              // 姓名
              name : '',
              // 性别 0女 1男
              sex : '',
              // 民族
              nation : '',
              // 出生年月
              birth : '',
              // 手机号
              phone : '',
              // 邮箱
              email : '',
              // 证件类型 0身份证 3营业执照
              idtype : '',
              // 证件号码
              idcard : '',
              // 身份证正面
              img01 : '',
              // 身份证反面
              img02 : '',
              // 证件地址
              idaddress : '',
              // 住址
              address : '',
            }
          ],

          // 证据列表
          evidences : [
            {
              details : [
                {
                  // 证据名称
                  eviTitle : '1',
                  // 证据来源
                  eviSource : '',
                  // 形式
                  eviFormat : '',
                  // 页数
                  eviPage : '',
                  // 证据链接
                  eviFileurl : '',
                },
                {
                  // 证据名称
                  eviTitle : '1',
                  // 证据来源
                  eviSource : '',
                  // 形式
                  eviFormat : '',
                  // 页数
                  eviPage : '',
                  // 证据链接
                  eviFileurl : '',
                },
              ],
            },
             {
              details : [
                {
                  // 证据名称
                  eviTitle : '1',
                  // 证据来源
                  eviSource : '',
                  // 形式
                  eviFormat : '',
                  // 页数
                  eviPage : '',
                  // 证据链接
                  eviFileurl : '',
                },
                {
                  // 证据名称
                  eviTitle : '1',
                  // 证据来源
                  eviSource : '',
                  // 形式
                  eviFormat : '',
                  // 页数
                  eviPage : '',
                  // 证据链接
                  eviFileurl : '',
                },
                {
                  // 证据名称
                  eviTitle : '1',
                  // 证据来源
                  eviSource : '',
                  // 形式
                  eviFormat : '',
                  // 页数
                  eviPage : '',
                  // 证据链接
                  eviFileurl : '',
                },
              ],
            }
          ],
        },

      }
    },
    methods : {
      show(row) {
        console.log(row.hzCaseInfoVO);
        this.dialogVisible = true;
        this.ruleForm.hzCaseInfoVO = row.hzCaseInfoVO;
        this.ruleForm.litigants = row.litigants;
        this.ruleForm.evidences = row.evidences;
      },
      // 关闭浮层
      handleClose() {
        this.dialogVisible = false;
      },
      // 合并 表格
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        console.log(row.eviTitle);
        if( (rowIndex === 1) && (column.property === 'eviTitle') ){
          return {
            rowspan: 3,
            colspan: 1,
          }
        }else{
          return {
            rowspan: 1,
            colspan: 1,
          }
        }
      },
    },
  }
</script>

<style lang="scss">

.case-management-detail-dialog{
  .m-bg{
    background-color: #f6f6f7;
  }
}

</style>