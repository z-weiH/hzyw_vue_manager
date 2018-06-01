<template>
  <el-dialog
    :visible.sync="show"
    :title="title"
    width="660px"
    center>
    <div class="dailog-container">
      <table
        class="m-primordial-table
              el-table el-table--fit el-table--border
              el-table--enable-row-hover"
      >
        <tbody class="left-table">
          <tr>
            <td colspan="2">
              <el-select style="width: 180px;" placeholder="请选择调节人员" v-model="mediatorId1">
                <template  v-for="(opt,idx) in MediatorList">
                  <el-option :key="idx"  :value="opt.id" :label="opt.name" ></el-option>
                </template>
              </el-select>
            </td>
            <td colspan="1">
              <el-button type="primary" >调解员介绍</el-button>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <el-select style="width: 150px;" placeholder="请选择调节人员" v-model="mediatorId2">
                <template  v-for="(opt,idx) in MediatorList">
                  <el-option :key="idx"  :value="opt.id" :label="opt.name" ></el-option>
                </template>
              </el-select>
              <el-date-picker
                type="date" placeholder="选择日期"
                v-model="date2"
                style="width: 140px;"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
              <el-input type="number" v-model="hour2" style="width: 50px;"></el-input>时

            </td>
            <td colspan="1">
              <el-button type="primary" >进展报告</el-button>
            </td>
          </tr>
        <tr>
          <td colspan="2">
            <el-date-picker
              type="date" placeholder="选择日期"
              v-model="date3"
              class="mr-30 w-205"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
            <el-input type="number" v-model="hour3" style="width: 50px;"></el-input>时
          </td>
          <td colspan="1">
            <el-button type="primary" >还款约定告知</el-button>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <el-select class="w-160" placeholder="请选择调节人员" v-model="mediatorId4">
              <template  v-for="(opt,idx) in MediatorList">
                <el-option :key="idx"  :value="opt.id" :label="opt.name" ></el-option>
              </template>
            </el-select>
            <el-select class="w-160" placeholder="请选择还款账户" v-model="payment4">
              <template  v-for="(opt,idx) in AdjustList">
                <el-option :key="idx"  :value="opt.id" :label="opt.accountInformation" ></el-option>
              </template>
            </el-select>
          </td>
          <td colspan="1">
            <el-button type="primary" >还款方式告知</el-button>
          </td>
        </tr>
        </tbody>
      </table>
      <div slot="footer" class="dialog-footer center mt-30" >
          <el-button type="primary" @click="$parent.editState = 0">取 消</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
  import TableEdits from '@/components/tableEdits'
  import {URL_JSON} from "../../../../components/script/url_json";
  export default {
    name: 'edit',
    props: {
      editState: Number,
      item: Object
    },
    data () {
      return {
        title:'发送短信类型',
        MediatorList: [],
        AdjustList: [],
        mediatorId1: '',//调解员id1
        mediatorId2: '',//调解员id2
        date2: '',//时间2
        hour2: '',
        date3: '',//时间2
        hour3: '',
        mediatorId4: '',
        payment4: ''
      }
    },
    computed: {
      show :{
        get: function () {
          return this.editState === 1;
        },
        set: function (v) {
          if(!v)
            this.$parent.editState = 0
        }
      }
    },
    components: {
      TableEdits
    },
    methods: {
      queryAllMediatorList() {
        this.$http.post(URL_JSON['queryAllMediatorList']).then(res => {
            if(res.code === '0000'){
              this.MediatorList = res.result;
              console.error(this.MediatorList)
            }
        })
      },
      queryAdjustPaymentQuery() {
        this.$http.post(URL_JSON['queryAdjustPaymentQuery']).then(res => {
          if(res.code === '0000'){
            this.AdjustList = res.result;
          }
        })
      },

    },
    created () {
      this.queryAllMediatorList();
      this.queryAdjustPaymentQuery();
    }
  }
</script>

<style scoped>
  /*.dailog-container{*/
    /*height: 542px;*/
    /*overflow-y: scroll;*/
  /*}*/
  .left-table> tr > td:nth-child(1) {
    padding-left: 20px !important;
    text-align: left;
  }
</style>
