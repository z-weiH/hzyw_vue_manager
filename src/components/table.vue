<template>
  <div class="table">
    <el-table :data="tableData" :span-method="spanMethod" stripe border @selection-change="slectionChange">
      <el-table-column
        type="selection"
        width="55" v-if="needCheckbox">
      </el-table-column>
      <el-table-column :resizable="false" type="index" label="序号" width="50"></el-table-column>
      <template v-for="(col, index) of columns">
          <el-table-column  :resizable="false" :key="index" :prop="col.property" :label="col.label" :render-header="defineHeader" v-if="!col.hidden && col.type == 'img'" :width="col.width ? col.width : 'auto'">
              <template slot-scope="scope" v-if="col.type == 'img'">
                <img :src="scope.row.custIcon" class="table_img">
              </template>
           </el-table-column>
           <el-table-column  :resizable="false" :key="index" :prop="col.property" :label="col.label" :render-header="defineHeader" v-if="!col.hidden && col.type != 'img' && col.type != 'select'" :width="col.width ? col.width : 'auto'">
                <template slot-scope="scope">
                  <div style="overflow:hidden" @mouseenter="setTip($event,scope.row[col.property])"
                    @mouseleave="hiddenTip($event)">
                  <span  :class="{colLink: col.isLink}" @click="col.linkShowPanel && col.linkShowPanel.bind($parent)(scope.row)">{{scope.row[col.property]}}</span>
                  </div>
                </template>
            </el-table-column>
            <el-table-column  :resizable="false" :key="index" :prop="col.property" :label="col.label" :render-header="defineHeader" v-if="!col.hidden && col.type == 'select'" :width="col.width ? col.width : 'auto'">
                <template slot-scope="scope">
                  <span :class="{colLink: col.isLink}" @click="col.linkShowPanel && col.linkShowPanel.bind($parent)(scope.row)">{{getLabel(col,scope.row[col.property])}}</span>
                </template>
            </el-table-column>
      </template>
      <!--<slot name=""></slot>-->
        <el-table-column  :resizable="false" :label="action.label" v-if="actions && actions.length > 0" v-for="(action, index) in actions" :key="action.label" :width="action.width">
            <template slot-scope="scope">
              <el-button v-for="(btn, index) of action.btns" :key="index" size="mini" @click="btn.function.bind($parent)(scope.row)">
                {{btn.label}}</el-button>
            </template>
        </el-table-column>
      <slot name="defineCol"></slot>
    </el-table>
    <!-- 分页 -->
    <div class="ctable_foot">
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pager.currentNum"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pager.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pager.count">
      </el-pagination>
    </div>
  </div>

</template>

<script>
/**
       * @method
       * @description 表格组件
       * @prop tableData // Object[] 表格显示的源数据
       * @prop columnDefine // Object[] 定义表格的列 label表示列头 property 表示列绑定的属性名，width 表示宽度
                        例子： [
                                 {label: '序号',property: 'index'，width:180},
                                 {label: '用户名',property: 'name',width:180},
                                 {label: '真实姓名',property: 'truename',width:180},
                                 {label: '手机号码',property: 'phonenumber',width:180,children: [
                                   {label: '序号',property: 'index'，width:180},
                                   {label: '用户名',property: 'name',width:180},
                                  {label: '真实姓名',property: 'truename',width:180},
                                 ]},
                               ]
       @prop spanMethod //Function  用来定义单元格合并
       */
import Vue from "vue";
import Tip from "@/components/tip";
export default {
  name: "mineTable",
  props: {
    tableData: Array,
    columnDefine: Array,
    spanMethod: Function,
    actions: Array,
    pager: Object,
    needCheckbox:Boolean
  },
  computed: {
    columns() {
      let arr = [];
      // console.error(this.columnDefine)
      this.columnDefine.forEach(it => {
        arr.push(it);
        if (it.children) {
          if (it.status) it.children.forEach(it => (it.hidden = false));
          else it.children.forEach(it => (it.hidden = true));
          arr.push(...it.children);
        }
      });
      return arr;
    }
  },
  methods: {
    // 工具函数使用
    setTip({ target }, $eleVal) {
      if(target.offsetWidth < target.getElementsByTagName('span')[0].offsetWidth){
        this.tipInstance = this.$tip({
          target,
          width: "auto",
          theme: "dark",
          transition: true,
          // customProps 传递 customComponent 组件的需要的 props
          customProps: {
            msg: $eleVal,
            handler() {
              console.log("click");
            }
          },
          // 用于监听自定义组件的 emit 事件
          customListeners: {
            created() {
              console.log("created");
            }
          },
          customComponent: Tip
        });
      }
      // el.offsetParent && (el.offsetWidth+20 > el.offsetParent.offsetWidth

    },
    hiddenTip({ target }) {
      const { tipInstance } = this;
      if (tipInstance && tipInstance.target === target) {
        tipInstance.hiddenTip();
      }
    },
    getLabel(col, prop) {
      let label = "label",
        value = "value";
      if (col && col.valuePath) value = col.valuePath;
      if (col && col.labelPath) label = col.labelPath;
      let item = col.options.find(it => it[value] == prop);
      console.log(item, prop);
      if (item) return item[label];
      return "--";
    },
    defineHeader(createElement, column) {
      // console.log(column, "column");
      let col = this.columns.find(it => it.property == column.column.property);
      if (col && col.children && col.children.length) {
        let ele = createElement(
          "i",
          {
            on: {
              click: () => this.toggleTable(col, ele)
            },
            style: {
              border: "1px solid #666",
              padding: "0 3px",
              marginLeft: "5px"
            }
          },
          "+"
        );
        return createElement("div", [
          createElement("span", {}, col.label),
          ele
        ]);
      } else {
        return col.label;
      }
    },
    toggleTable(col, ele) {
      col.status = !col.status;
      console.log(ele);
      ele.elm.innerHTML = col.status ? "-" : "+";
      this.$set(
        this.columnDefine,
        this.columnDefine.findIndex(it => it.property == col.property),
        col
      );
    },
    // 页数 change
    handleSizeChange(val) {
      this.$parent.pager.pageSize = val;
    },
    // 分页 change
    handleCurrentChange(val) {
      console.log("val===", val, this);
      this.$parent.pager.currentNum = val;
      this.$parent.doQuery(this.$parent.queryUrl, this.$parent.searchItem);
    },

    //选中行变化
    slectionChange(selection) {
      this.$emit('slectionChange', selection);
    }
  },
  watch: {
    tableData(val1, val2) {
      console.log(val1, val2);
    }
  },
  mounted() {
    console.log("--------");

    // console.log("当前显示条数", this.pager.pageSize);
    // console.log("当前页标", this.pager.currentPage);
    // console.log("总数", this.pager.total);
  },
  updated() {
    console.log(this.tableData);
    // console.log("当前显示条数", this.pager.pageSize);
    // console.log("当前页标", this.pager.currentPage);
    // console.log("总数", this.pager.total);
  }
};
</script>

<style>
thead.has-gutter > tr > th {
  padding: 0;
}

.table_img {
  width: 100px;
  height: 60px;
}
</style>
