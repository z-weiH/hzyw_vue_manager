<template>
  <div class="rule-base">
    <!-- <div class="m-bar">
      <m-progress :width="progress" :height="20">执行中</m-progress>
    </div> -->
    <div class="title-box">
      <div>
        <span class="m-title">规则库</span>
        <div class="fr">
          <el-button type="primary" class="mt-20">执行规则</el-button>
        </div>
      </div>
    </div>
    <div class="content-box">
      <div class="fl m-left">
        <!--<el-tree -->
          <!--:data="treeData" -->
          <!--:props="{children : 'children' , label : 'label'}"-->
          <!--:highlight-current="true"-->
          <!--:expand-on-click-node="false"-->
          <!--@node-click="handleNodeClick"-->
        <!--&gt;-->
        <!--</el-tree>-->
        <el-menu
          background-color="#fff"
          text-color="#7C7C7C"
          active-text-color="#435F9A">
          <el-submenu index="1"  v-for="(menu,ii) in treeData" :key="ii">
            <template slot="title">
              <div @click="handleNodeClick(menu)">{{menu.labelName}}</div>
            </template>
            <el-menu-item-group v-for="(sub,index) in menu.children" :key="index">
              <el-submenu :index="sub.levelId">
                <template slot="title" >
                  <div @click="handleNodeClick(sub)">
                    {{sub.labelName}}
                  </div>
                </template>
                <el-menu-item-group v-for="(group,idx) in sub.children" :key="idx">
                  <el-submenu index="1-5">
                    <template slot="title" >
                      <div @click="handleNodeClick(group)">
                      {{group.labelName}}
                      </div>
                    </template>
                  <el-menu-item :index="item.levelId" v-for="(item,i) in group.children" :key="i" @click="handleNodeClick(item)">{{item.labelName}}</el-menu-item>
                  </el-submenu>

                </el-menu-item-group>
              </el-submenu>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </div>
      <div class="fl m-right" style="height: 100%;">
        <div class="rule_title">
          {{currentRule}}
        </div>
        <div class="rule_body">
          <div class="rule_desc">
            <el-button style="margin-top: 5px;" class="fr" icon="el-icon-plus"  type="primary" plain>添加规则</el-button>
            <span>规则列表</span>
            （共{{pager.count}}条)
          </div>
          <ul class="rule_list">
            <li class="rule_item" v-for="(rule,index) in ruleList" :key="index">
              <div class="ruleDesc">
                <div class="btns fr">
                  <span class="edit_btn colLink">编辑</span>
                  <span class="delete_btn colLink">删除</span>
                </div>
                <b >{{(pager.currentNum-1) * 5 + index + 1}}.</b>
                <span>{{rule.ruleDesc}}</span>
              </div>
              <div class="auditOpinion">
                <span class="rule_title_desc">审核意见</span>
                <span>{{rule.auditOpinion}}</span>
              </div>
              <div class="modularType">
                <span class="rule_title_desc">所属模块</span>
                <!--1-身份证，2-签名，3-证据链-->
                <span>{{rule.modularType == 1 ? "身份证" : rule.modularType == 2 ? "签名" : "证据链"}}模块</span>
              </div>
              <div class="ruleInfo">
                <span class="rule_title_desc">规则代码</span>
                <span>{{rule.ruleInfo}}</span>
              </div>


            </li>
          </ul>

          <div class="pagination clear">
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page="pager.currentNum"
              :page-size="1"
              layout="prev, pager, next, jumper, total"
              :total="pager.count">
            </el-pagination>
          </div>

        </div>


      </div>
    </div>
  </div>
</template>

<script>
  import progress from './modules/progress.vue'
  export default {
    components : {
      'm-progress' : progress,
    },
    data() {
      return {
        currentRule:'',
        currentMenu: {},
        progress : 80,
        treeData : [],
        ruleList: [],
        pager: {
          currentNum: 1,
          pageSize: 10,
          count: 0,
        }
          // [{
          //   label : '公共规则',
          //   children : [
          //     {
          //       label : 'P2P现金贷业务',
          //       children : [
          //         {
          //           label : '奇速贷',
          //           children : [
          //             {
          //               label : '奇速贷-1001',
          //               id : 1,
          //             },
          //             {
          //               label : '奇速贷-1002',
          //               id:2,
          //             },
          //             {
          //               label : '奇速贷-1003',
          //               id: 3
          //             },
          //           ],
          //         }
          //       ],
          //     }
          //   ],
          // }],
      }
    },
    mounted() {

    },
    methods : {
      handleCurrentChange(val){
        this.pager.currentNum = val;
        this.handleNodeClick(this.currentMenu);
      },
      handleNodeClick(item){
        console.log(item);
        item.children = null;
        this.currentMenu = item;
        this.currentRule = item.labelName;
        this.$http.post("/ruleBase/ruleInfoByBaseQuery.htm",Object.assign(item,this.pager)).then(res => {
          if(res.code === '0000'){
            this.ruleList = res.result.list;
            this.pager.count = res.result.count;
          }
        })
      }
    },
    created(){
      this.$http.post('/rule/queryRuleTree.htm').then(res => {
        if(res.code === '0000'){
          this.treeData = res.result;
          this.handleNodeClick(this.treeData[0]);
        }
      })
    }
  }
</script>

<style lang="scss" scoped>

.rule-base{
  height: 100%;
  overflow: auto;
  background-color: #F1F2F7;
  .title-box{
    height: 75px;
    background-color: #fff;
    >div{
      width: 1200px;
      margin: 0 auto;
    }
    .m-title{
      font-size: 30px;
      color: #0f357f;
      display: inline-block;
      margin-top: 21px;
    }
  }
  .content-box{
    width: 1200px;
    margin: 0 auto;
    margin-top: 10px;
    .m-left{
      width: 300px;
    }
    .m-right{
      width: 890px;
      margin-left: 10px;
      background-color: #fff;

      height: 300px;
    }
  }
}
  .rule_title{
    height: 56px;
    background: #EEF3FF;
    font-size: 16px;
    color:#46629C;
    line-height: 56px;
    padding-left: 20px;
  }
  .rule_body{
    padding: 0 20px 50px 20px;
    .rule_desc{
      height: 50px;
      color:#A0A0A0;
      span{
        color:#46629C;
        font-size:17px;
        line-height: 50px;
        padding-left:10px;
        border-left: 5px solid #46629C;
      }
    }
    .rule_list{

      .rule_item{
        border:1px solid #F3F5F7;
        margin: 20px 0;
        padding: 10px;
        div{
          padding-left: 20px;
          color: #aaa;
          line-height: 20px;
          margin: 10px 0;
          .rule_title_desc{
            padding-right: 15px;
          }
          &.ruleDesc{
            margin: 0;
            padding-left: 0;
            color: #505050;
            font-size: 16px;
            line-height: 30px;
            b{
              padding-right: 10px;
            }
            .btns{
              margin-right: 5px;
              font-size: 14px;
              span{
                padding:0 10px;
                &.delete_btn{
                  color: #656565;
                }
              }
            }
          }
        }

      }
    }
  }


</style>
