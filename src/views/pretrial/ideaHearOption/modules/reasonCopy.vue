<template>
    <el-dialog
      :visible.sync="flag"
      v-dialogDrag
      title="复制审核意见"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="600px"
    >
      <div class="header">
        <el-popover
          placement="bottom-end"
          width="400"
          trigger="hover">
          <div style="line-height: 18px;">
            <p>1.	审核意见不能被复制到同一公司。</p>
            <p>2.	审核意见被复制后，将会赋予新审核意见一个新的编码。</p>
            <p>3.	若某审核意见已被某脚本规则引用，则将该审核意见复制到对应脚本规则所在的公司后，脚本规则中的返回编码需手动替换。</p>
          </div>
          <i class="el-icon-info fr" slot="reference" style="line-height: 24px;"></i>
        </el-popover>
        将选中的审核意见复制到以下哪些公司？

      </div>
      <div class="company mt-10">
        <div class="left fl">
          <el-input type="text" v-model="searchValue" placeholder="请输入关键字搜索" size="medium"></el-input>
          <el-scrollbar style="max-height: 340px;">
            <ul>
              <li v-for="(item,idx) in companyList" :key="idx">
                <el-checkbox style="vertical-align: baseline;margin-top: -1px; overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        width: 230px;" v-model="item.selected" @change="handleChange($event,item)">{{item.merchantName}}</el-checkbox>

              </li>
            </ul>
          </el-scrollbar>
        </div>
        <div class="right fr">
          <p v-if="companyListCopy.filter(it => it.selected).length === 0" style="line-height: 36px;color: #aaa;">请在左侧选择目标公司</p>
          <p v-else style="line-height: 36px;color: #aaa;">已选 {{companyListCopy.filter(it => it.selected).length}}</p>
          <el-scrollbar style="max-height: 340px;">
            <ul>
              <li v-for="(item,idx) in companyListCopy.filter(it => it.selected)" :key="idx">
                <img class="fr" @click="handleSingleDel(item)"  style="width: 14px; height: 14px; cursor:pointer;margin-top: 8px; z-index: 100" src="../../../../assets/img/Delete.png" alt="">
                {{item.merchantName}}
              </li>
            </ul>
          </el-scrollbar>
        </div>
      </div>

      <div slot="footer" >
        <el-button type="primary" :disabled="disabled" @click="handleClick" class="mr-20">确定复制</el-button>
        <el-button @click="flag = false">取消</el-button>
      </div>
    </el-dialog>
</template>

<script>
    export default {
      name: 'reasonCopy',
      data() {
        return {
          flag: false,
          searchValue: '',
          companyList: [],
          companyListCopy: [],
          tab: null,
          reasonSOList: []

        }
      },
      watch: {
        searchValue(val,oldval){

          this.companyList= this.companyListCopy.filter(it => it.merchantName.indexOf(this.searchValue) > -1);
        }
      },
      computed:{
        disabled() {
          return !this.companyList.find(it => it.selected)
        }
      },
      methods: {

        handleSingleDel(item){
          // this.$set(item,'selected', false);
          item.selected = false;
          let res = this.companyList.find(it => it.code == item.code);
          if(res){
            res.selected = false;
          }

        },

        handleChange(val,item){
          console.log(val,item)
            let res = this.companyListCopy.find(i => i.code === item.code);
            if(res){
              this.$set(res, 'selected', val)
            }

        },

        //确定复制
        handleClick() {
          let arr = [];
          this.reasonSOList.forEach(it => {
            arr.push({ reasonId: it.reasonId, type: it.reasonType})
          })
          this.companyList.forEach(it => {
            it.clientName = it.merchantName;
            it.clientCode = it.code;
          })

          this.$http.post("/reason/saveReasonPrivate.htm",{reasonSOList: arr, clientSOList: this.companyList.filter(it => it.selected)},{mheaders: true}).then(res => {
            console.log(res);
            this.$message.success("复制成功");
            this.flag = false;
          })
        },

        show(obj, list, flag) {
          if(flag){
            this.reasonSOList = [obj];
          }
          else{
            this.reasonSOList = obj;
          }
          console.log(this.reasonSOList)
          this.flag = true;
          this.companyList = list;
          this.companyList.forEach(it => {
            this.$set(it, 'selected', false);
          })
          this.companyListCopy = JSON.parse(JSON.stringify(this.companyList));
        }
      }
    }
</script>

<style scoped lang="scss">
  .company{
    overflow: hidden;
    .left, .right{
      width: 260px;
      height: 400px;
      box-sizing: border-box;
      padding: 10px;
      border: 1px solid #ccc;
      li{
        line-height: 30px;
      }
    }
    .right li {
      padding-right: 25px;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      width: 230px;
      img{
        position: relative;
      }
    }
  }
</style>
