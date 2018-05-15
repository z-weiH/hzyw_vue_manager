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
  import Mock from 'mockjs'
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
        queryUrl: "/13/merchant/queryAllMerchant.htm",//互金企业
        queryUrl1:"/13/user/queryUserListByRoleType.htm",//运营人员
        createItems: [{
            type: "select",
            property: "merchantName",
            label: "互金企业",
            options: [],
            optValue: 'merchantCode',
            optLabel: 'merchantName'
          },
          {
            type: "select",
            property: "operatorName",
            label: "运营人员",
            options: [],
            optValue: 'merchantCode',
            optLabel: 'merchantName'
          }
        ]
      };
    },
    computed: {
      title() {
        // return this.editState == 1 ? '修改仲裁委' : this.editState == 2 ? '新增仲裁委' : ''
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
          res = Mock.mock(res);
          console.info('fff:', res);
          this.createItems[0].options = res.result.list;
        });
      },
      searchYyPeople() {
        this.$http.post(this.queryUrl).then(res => {
          res = Mock.mock(res);
          console.info('yy:', res);
          this.createItems[1].options = res.result.list;
        });
      },
      fpnewstatus() {
        console.log(this.item);
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
