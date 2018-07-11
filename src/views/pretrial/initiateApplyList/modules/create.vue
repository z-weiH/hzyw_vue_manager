<template>
  <div>
    <el-dialog :visible.sync="show" @open="open" @close="handleClose" :title="title" width="580px" center>
      <div class="dialog-container">
        <div class="title icon-sign mb-20">
          筛选结果
        </div>
        <el-row class="mb-10">
          <el-col :span="4">
            <div>共找到案件</div>
          </el-col>
          <el-col :span="20">
            <span class="f_orange">{{pager.count}}</span>
            <span>件</span>
          </el-col>
        </el-row>
        <el-row class="mb-10">
          <el-col :span="4">
            <div class="mt-8">申请立案</div>
          </el-col>
          <el-col :span="20">
            <el-input v-model="applyCaseNum" @input="applycaseNoChange"  placeholder="请输入内容" class="w200"></el-input>
            <span>件</span>
          </el-col>
        </el-row>
        <div class="title icon-sign mb-20">
          弹屏设置
        </div>
        <el-row class="mb-10">
          <el-col :span="4">
            <div class="mt-8">弹屏</div>
          </el-col>
          <el-col :span="20">
            <el-select v-model="type" placeholder="请选择" class="w150">
              <el-option
                v-for="item in tpOpts"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row class="mb-10">
          <el-col :span="4">
            <div class="mt-8">预览</div>
          </el-col>
          <el-col :span="20">
            <div class="f-write">
              被申请人：你通过（互金平台）借款时约定争议解决方式为仲裁，现（申请人姓名）向衢州仲裁委员会网络仲裁平台申请仲裁，请注意查收短信。
            </div>
          </el-col>
        </el-row>
      </div>

      <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="ofCouse">确 定</el-button>
                <el-button @click="$parent.editState = 0">取 消</el-button>
          </span>
    </el-dialog>

    <create1 :zqdata="zqdata"  :editState1="editState1" :item="item"></create1>
  </div>
</template>

<script type="text/ecmascript-6">
import { URL_JSON } from "../../../../components/script/url_json";
import Mock from "mockjs";
import create1 from "./create1";
export default {
  name: "initiateApplyCreate",
  props: {
    editState: Number,
    pager: Object,
    item: Object
  },
  data() {
    return {
      // item: {},
      zqdata: {},
      editState1: false,
      type: "",
      applyCaseNum: "",
      tpOpts: [
        //弹屏数据
        {
          label: "仲裁短信",
          value: "0"
        },
        {
          label: "调解短信",
          value: "1"
        },
        {
          label: "不发送",
          value: "2"
        }
      ]
    };
  },
  computed: {
    title() {
      return this.editState == 1 ? "申请立案" : "";
    },
    show: {
      get() {
        return this.editState == 1;
      },
      set(v) {
        if (!v) {
          this.$parent.editState = 0;
        }
      }
    }
  },
  methods: {
    ofCouse() {
      console.log("iiiii::", this.item);
      this.item.type = this.type;
      this.item.applicationNum = this.applyCaseNum;
      let _newItem = Object.assign(this.item,this.$parent.searchItem);
      console.log("_newItem: ",_newItem);
      this.$http.post(URL_JSON["queryApplyCaseNum"], this.item).then(res => {
        console.log("iiiii:--:", this.item);
        this.zqdata = res.result;
        console.log("123123", this.zqdata);
        console.log("rrrrr---", res.result);
        this.editState1 = true;
      });
    },
    applycaseNoChange(el) {
      console.log(el);
      this.applyCaseNum = el;
    },
    open() {
      // this.applyCaseNum = this.pager.count;
      this.$http.post(URL_JSON["querySetCaseNum"]).then(res => {
        if(res.code === "0000"){
          console.log('立案数量： ',res.result);
          this.applyCaseNum = res.result;
        }
      });
    },
    handleClose() {
      this.type = "";
    }
  },
  created() {
    console.info("*******item");
  },
  mounted() {
    console.info("mounted::", this.type);
  },
  updated() {
    console.log("-------------", this.pager.count);
    if (this.applyCaseNum > this.pager.count) {
      this.applyCaseNum = this.pager.count;
    }
  },
  components: {
    create1
  }
};
</script>

<style scoped lang="scss">
.w200 {
  width: 200px;
}
.w150 {
  width: 150px;
}
.w100 {
  width: 100px;
}
.w70 {
  width: 70px;
}
.dialog-container {
  .el-row {
    span {
      vertical-align: middle;
    }
  }
}
</style>
