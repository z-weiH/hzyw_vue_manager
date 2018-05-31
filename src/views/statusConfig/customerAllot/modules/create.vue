<template>
  <div>
    <el-dialog :visible.sync="show" :title="title" width="495px" center>
      <edits :edit-items="createItems" :item="item" :label-width="'90px'"></edits>
      <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="fpnewstatus">确 定</el-button>
              <el-button @click="$parent.editState = 0">取 消</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import { URL_JSON } from "../../../../components/script/url_json";
import Mock from "mockjs";
import Edits from "@/components/edits";
export default {
  name: "customerAllotCreate",
  props: {
    editState: Number
  },
  data() {
    return {
      item: {},
      merchantList: [],
      queryUrl: URL_JSON["queryAllMerchant"], //互金企业"/13/merchant/queryAllMerchant.htm"
      queryUrl1: URL_JSON["queryUserListByRoleType"], //运营人员"/13/user/queryUserListByRoleType.htm"
      createItems: [
        {
          type: "select",
          property: "code",
          label: "互金企业",
          options: [],
          optValue: "code",
          optLabel: "merchantName"
        },
        {
          type: "select",
          property: "operatorId",
          label: "运营人员",
          options: [],
          optValue: "userId",
          optLabel: "userName"
        }
      ]
    };
  },
  computed: {
    title() {
      return this.editState == 1 ? "新增" : "";
    },
    show: {
      get() {
        return this.editState == 2 || this.editState == 1;
      },
      set(v) {
        if (!v) {
          this.$parent.editState = 0;
        }
      }
    }
  },
  methods: {
    searchEnterPrise() {
      this.$http.post(this.queryUrl).then(res => {
        // res = Mock.mock(res);
        console.info("fff:", res);
        this.createItems[0].options = res.result;
      });
    },
    searchYyPeople() {
      this.$http.post(this.queryUrl1, { type: "OPERATOR" }).then(res => {
        // res = Mock.mock(res);
        console.info("yy:", res);
        this.createItems[1].options = res.result;
      });
    },
    fpnewstatus() {
      console.log("xinz::", this.item);

      this.$http.post(URL_JSON["saveCustomerAllot"],this.item).then(res => {
        this.$message.success("新增成功");
        this.item = {};
        this.$parent.FullListQuery();
        this.$parent.editState = 0;
      });

    }
  },
  created() {
    console.info("*******item");
    console.info(this.item);
    this.searchEnterPrise();
    this.searchYyPeople();
  },
  components: {
    Edits
  }
};
</script>

<style scoped lang="scss">
</style>
