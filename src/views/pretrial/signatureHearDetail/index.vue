<template>
  <div class="body_container">
    <div class="header_container">
      <div class="header">
        <el-button type="primary" class="fr mr-10 mt-20" @click="HandleAudit">审核完成</el-button>
        <span class="header_title">签名审核</span>
        <el-checkbox class="header_checkbox" v-model="auditStatus">必要审核</el-checkbox>
      </div>
    </div>
    <div class="card">
      <div class="card_header">
        <div class="fr mt-5">
          <el-button type="text">添加书签</el-button>
          <el-button type="primary" plain @click="HandleShow">审核意见</el-button>
        </div>
      </div>
      <div class="card_body">
        <table class="card_table">
          <tr>
            <td>签名时间</td>
            <td>2017/08/12    09:07:37</td>
            <td>签名实体</td>
            <td>张三@123456789098765432</td>
          </tr>
          <tr>
            <td>签名时间</td>
            <td>2017/08/12    09:07:37</td>
            <td>签名实体</td>
            <td>张三@123456789098765432</td>
          </tr>
          <tr>
            <td>签名时间</td>
            <td>2017/08/12    09:07:37</td>
            <td>签名实体</td>
            <td>张三@123456789098765432</td>
          </tr>
          <tr>
            <td>借款开始时间</td>
            <td>2017/08/12    09:07:37</td>
            <td>借款合同</td>
            <td>点击查看</td>
          </tr>
        </table>
        <div class="img_desc">
          <ul>
            <li>各签名有效且自签名应用以来文档未被修改</li>
            <li>被申请人签名已获取</li>
            <li>被申请人签名时间早于或等于借款开始时间</li>
          </ul>
        </div>
        <div class="audit">
          <p class="audit_title">审核意见:</p>
          <ul>
            <li>32156156156313514567815631</li>
          </ul>
        </div>
      </div>

    </div>

    <audit></audit>

  </div>
</template>

<script>
  import audit from './modules/audit'
  import Mixins from '@/components/script/_mixin'
  export default {
    extends: Mixins,
    data(){
      return {
        auditStatus: false,
        editState: 0
      }
    },
    methods: {
      HandleShow() {
        this.editState = 1;
      },
      HandleAudit() {
        const h = this.$createElement;
        this.$msgbox({
          title: '提示',
          message: h('div',null,[
            h('p',null,'即将提交身份证结果。提交后讲无法修改。'),
            h('p',null,'确定提交?')

          ]),
          center: true,
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(res => {

        }).catch(() => {})
      }
    },
    components: {
      audit
    }
  }
</script>

<style lang="scss" scoped>
  .body_container{
    background: #F7F7F7;
    height: 100%;
    .header_container{
      height: 76px;
      background: #fff;
      .header{
        width: 1200px;
        margin: 0 auto;
        height: 76px;
        .header_title{
          font-size: 28px;
          color: #193B8C;
          line-height: 76px;
          font-weight: 500;
        }
        .header_checkbox {
          margin-left: 20px;
        }
      }
    }
    .card{
      width:1200px;
      border:1px solid #E5EAEE;
      background: #fff;
      margin: 16px auto;
      .card_header{
        height: 49px;
        border-bottom: 1px solid #E5EAEE;
        background: #EEF3FF;
        padding-left: 12px;
        padding-right: 10px;
      }
      .card_body{
        padding: 30px 0 30px 22px;
        table, tr, td{
          border: 1px solid #E5EAEE;
          text-align: center;
        }
        .card_table{
          color: #363636;
          float: left;
          width: 768px;
          height: 195px;
          border-collapse: collapse;
          margin-right: 20px;
          tr{
            td{
              &:nth-child(odd){
                color: #7A7A7A;
              }
            }
          }
        }
        .img_desc{
          margin: 50px;
          ul{
            li{
              line-height: 38px;
              font-size: 14px;
              color: #363636;
            }
          }
        }

      }
      .audit{
        margin-top: 28px;
        .audit_title{
          font-size: 17px;
          color: #193B8C;
          margin-bottom: 10px;
        }
        ul{
          padding-left: 15px;
          li{
            font-size: 14px;
            line-height: 24px;
            color: #444;
          }
        }
      }
    }

  }

</style>
