<template>
  <div class="webpage-editor-parameter" v-loading="loading">
    <div class="item-box">
      <div>
        <span class="tit mr-5">类型</span>
        <span @click="handleType(item)" :class="{'active' : item.paramBizType === typeActive}" v-for="(item,index) in typeList" :key="index" class="cursor mr-5">{{item.text}}</span>
      </div>

      <div class="mt-10 of-hidden" v-if="typeActive === 0">
        <div class="fl" style="width:35px;">
          <span class="tit mr-5">模块</span>
        </div>

        <div class="fl" style="width:calc(100% - 35px);">
          <span @click="handleModule(item)" :class="{'active' : item.type === moduleActive}" v-for="(item,index) in moduleList" :key="index"  class="cursor mr-5">{{item.text}}</span>
        </div>
      </div>
    </div>

    <div v-loading="listLoading" class="list-box" :style="{height : `calc(100% - ${typeActive === 0 ? '83' : '45'}px - 40px)`}">
      <template v-if="typeActive === 0">
        <div v-for="(item,index) in list" :key="index">
          <div :data-categoryCode="item.categoryCode" class="mb-10 mt-10">{{item.categoryDesc}}</div>
          <table
            class="m-primordial-table 
              el-table el-table--fit el-table--border 
              el-table--enable-row-hover mt-10"
          >
            <tr v-for="(item2,index2) in item.children" :key="index + '' + index2">
              <td @click=handleCopyLeft(item2)>{{item2.paramCode}}</td>
              <td @click="handleCopyRight(item2)">{{item2.paramName}}</td>
            </tr>
          </table>
        </div>
      </template>

      <template v-else>
        <table
          class="m-primordial-table 
            el-table el-table--fit el-table--border 
            el-table--enable-row-hover mt-10 mb-10"
        >
          <tr v-for="(item,index) in list" :key="index">
            <td @click=handleCopyLeft(item)>{{item.paramCode}}</td>
            <td @click=handleCopyRight(item)>{{item.paramName}}</td>
          </tr>
        </table>
      </template>

      <div v-if="list.length === 0">暂无数据</div>
    </div>

    <div class="handle-box">
      <el-button @click="handleReload">刷新</el-button><router-link :to="{path : '/tmParameterDetail' , query : {type : '0'}}" target="_blank"><el-button>打开参数列表</el-button></router-link>
    </div>
  </div>
</template>

<script>
  let copyArray = (arr) => {
    return JSON.parse(JSON.stringify(arr));
  };
  export default {
    data() {
      return {
        loading : false,
        listLoading : false,
        // 类型 list
        typeList : [
          {
            paramBizType : 0,
            text : '案件参数',
          },
          {
            paramBizType : 1,
            text : '仲裁参数',
          },
          {
            paramBizType : 2,
            text : '个性参数',
          },
        ],
        // 类型 当前选中
        typeActive : 0,
        // 模块 list
        moduleList : [
          {
            text : '基础',
            type : 1,
          },
          {
            text : '金额',
            type : 2,
          },
          {
            text : '日期',
            type : 4,
          },
          {
            text : '当事人',
            type : 3,
          },
          {
            text : '证据',
            type : 5,
          },
          {
            text : '银行卡',
            type : 7,
          },
          {
            text : '还款',
            type : 6,
          },
          {
            text : '分期',
            type : 8,
          },
          {
            text : '代偿',
            type : 9,
          },
        ],
        // 模块当前选中
        moduleActive : 1,
        // 列表数据
        list : [
          {
            // 参数分类: 1-基础信息 2-金额信息 3-当事人信息 4-日期信息 5-证据信息 6-还款信息 7-借款人银行卡信息 8-分期贷信息 9-代偿信息
            categoryCode : 1,
            categoryDesc : '基础信息', // 对应中文
            children : [
              {
                // 参数编码
                paramCode : 'lender',
                // 参数id
                paramId : '',
                // 参数名
                paramName : '出借人',
              }
            ],
          }
        ],
        listDefault : [],
      }
    },
    mounted() {
      this.init();
    },
    methods : {
      init(callback) {
        this.$http({
          method : 'post',
          url : '/param/queryAllParamList.htm',
          data : {
            paramBizType : this.typeActive,
            prodTempId : this.$route.query.prodTempId,
          },
        }).then((res) => {
          if(this.typeActive === 0) {
            res.result = this.dataProcessing(res.result);
          }

          this.listDefault = copyArray(res.result);
          this.list = copyArray(res.result);

          callback && callback();
        }).catch(() => {
          this.loading = false;
          this.listLoading = false;
        });
      },
      // 数据处理
      dataProcessing(result) {
        let obj = {};
        let arr = [];
        result.map((v,k) => {
          if(!obj[v.categoryCode]) {
            obj[v.categoryCode] = true;
            arr.push({
              categoryCode : v.categoryCode,
              categoryDesc : (
                v.categoryCode === 1 ? '基础信息' :
                v.categoryCode === 2 ? '金额信息' :
                v.categoryCode === 3 ? '当事人信息' :
                v.categoryCode === 4 ? '日期信息' :
                v.categoryCode === 5 ? '证据信息' :
                v.categoryCode === 6 ? '还款信息' :
                v.categoryCode === 7 ? '借款人银行卡信息' :
                v.categoryCode === 8 ? '分期贷信息' :
                v.categoryCode === 9 ? '代偿信息' : ''
              ),
              children : result.filter(v1 => v.categoryCode === v1.categoryCode),
            });
          }
        });
        return copyArray(arr);
      },
      // 类型 点击
      handleType(item) {
        this.typeActive = item.paramBizType;
        this.moduleActive = 1;
        this.listLoading = true;
        this.init(() => {
          window.setTimeout(() => {
            this.listLoading = false;
          },500);
        });
      },
      // 模块 点击
      handleModule(item) {
        this.moduleActive = item.type;
        this.moduleScroll(item);
      },
      // 模块 滚动某一位置
      moduleScroll(item) {
        let target = document.querySelector(`[data-categoryCode="${item.type}"]`);
        let offsetTop = target.offsetTop - 83 - 75 - 11;
        document.querySelector('.list-box').scrollTop = offsetTop;
      },
      // 左侧复制
      handleCopyLeft(row) {
        let money = '';
        row.paramCode = row.paramCode + '';
        // money 类型特殊 处理 凭借 money()字段
        /* if(row.valueType === 4) {
          money = '${money('+ row.paramCode +')}';
        } */
        /* if(row.paramCode.search(/^rate/g) !== -1) {
          money = '${money('+ row.paramCode +')}%';
        } */
        this.$parent.handleCopy(money || '${'+ row.paramCode +'}');
      },
      // 右侧复制
      handleCopyRight(row) {
        this.$parent.handleCopy(row.paramCode);
      },
      // 点击刷新
      handleReload() {
        this.loading = true;
        this.init(() => {
          window.setTimeout(() => {
            this.loading = false;
          },1000);
        });
      },
    },
  }
</script>

<style lang="scss" scoped>

.webpage-editor-parameter{
  height: 100%;
  background-color: #fff;
  tr{
    cursor: pointer;
  }
  td{
    word-wrap:break-word;
  }
  .item-box{
    padding: 15px 10px;
    color: #999999;
    border-bottom: 1px solid #ddd;
    .tit{
      color: #333333;
    }
    .active{
      color: #0f357f;
    }
  }
  .list-box{
    box-sizing: border-box;
    overflow-y: auto;
    padding: 10px;
    padding-top: 0;
  }
  .handle-box{
    button{
      box-sizing: border-box;
      width: 50%;
      margin: 0;
      border-radius: 0;
      color: #0f357f;
      border-bottom: none;
      border-right: none;
    }
    >button{
      border-left: none;
    }
  }
}

</style>