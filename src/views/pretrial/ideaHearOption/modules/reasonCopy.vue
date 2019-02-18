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
        width: 230px;" v-model="item.selected" >{{item.name}}</el-checkbox>

              </li>
            </ul>
          </el-scrollbar>
        </div>
        <div class="right fr">
          <p style="line-height: 36px;color: #aaa;">请在左侧选择目标公司</p>
          <el-scrollbar style="max-height: 340px;">
            <ul>
              <li v-for="(item,idx) in companyList.filter(it => it.selected)" :key="idx">
                {{item.name}}
              </li>
            </ul>
          </el-scrollbar>
        </div>
      </div>

      <div slot="footer" >
        <el-button type="primary" :disabled="disabled"  class="mr-20">确定复制</el-button>
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
          companyList: [
            {name: '杭州晋天科技有限公司11111111111111111111111123333', selected: false},
            {name: '杭州晋天科技有限公司11111111111111111111111123333', selected: false},
            {name: '杭州晋天科技有限公司11111111111111111111111123333', selected: false},
            {name: '杭州晋天科技有限公司11111111111111111111111123333', selected: false},
            {name: '杭州晋天科技有限公司11111111111111111111111123333', selected: false},
            {name: '杭州晋天科技有限公司11111111111111111111111123333', selected: false},
            {name: '杭州晋天科技有限公司11111111111111111111111123333', selected: false},
            {name: '杭州晋天科技有限公司11111111111111111111111123333', selected: false},
            {name: '杭州晋天科技有限公司11111111111111111111111123333', selected: false},
            {name: '杭州晋天科技有限公司11111111111111111111111123333', selected: false},
            {name: '杭州晋天科技有限公司11111111111111111111111123333', selected: false},
            {name: '杭州晋天科技有限公司11111111111111111111111123333', selected: false},
            {name: '杭州晋天科技有限公司11111111111111111111111123333', selected: false},
          ]
        }
      },
      computed:{
        disabled() {
          return !this.companyList.find(it => it.selected)
        }
      },
      methods: {
        show() {
          this.flag = true
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
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      width: 230px;
    }
  }
</style>
