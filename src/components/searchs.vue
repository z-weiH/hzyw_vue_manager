<template>
  <el-form action="" :rules="rules" class="searchs">
    <div class="search">
      <el-row :gutter="10">
        <div v-for="(search, index) in searchItems" :key="index">
          <!-- <el-form-item :prop="search.property"> -->
            <search-item :btnClickHandle="btnClickHandle" class="searchs" :item="item" v-bind:value="item[search.property]" v-bind:search-item="search" @valueChange="valueChange" @doQuery="btnClickHandle">
            </search-item>
          <!-- </el-form-item> -->

        </div>
        <el-button class="fl" type="warning" @click="btnClickHandle">查询</el-button>
        <slot name="moreBtn"></slot>
      </el-row>
    </div>
  </el-form>
</template>

<script>
/**
 * @description 查询条件组件
 * @props item 类型 Object  以对象形式存放查询条件数据
 * @props searchItems 类型 Object[]  每个object定义一个查询条件
 *        属性： label //string 搜索组件的label字段说明
 *        属性： colSpan  //number  div被等分成24分，columns表示占几分 ，从1到24
 *        属性： property //string  表示该查询条件绑定到 item上的属性名
 *        属性： placeholder //string  placeholder
 *        属性： type //string 查询框类型 text表示文本输入,select表示下拉框,date表示日期
 *        属性： defaultValue //any  给该查询条件定义默认值
 */
import SearchItem from "./search.vue";
import { RULES } from "./script/rules";
export default {
  name: "search",
  props: {
    searchItems: {
      type: Array,
      default: () => {
        return [];
      }
    }, // 定义显示的表单
    item: {
      type: Object,
      default: () => {
        return {};
      }
    }, // 关联表单的数据
    queryUrl: String
  },
  methods: {
    btnClickHandle() {
      let url = this.queryUrl;
      if (!url) url = this.$parent.queryUrl;
      this.$parent.pager.currentNum = 1;
      this.$parent.doQuery(url, this.item);
    },
    valueChange(key) {
      let obj = {
        property: key,
        value: this.item[key]
      };
      // this.item[key] = newVal[key];
      // 把change的值合成一个新对象传给父页面
      this.$emit("valueChange", obj);
    }
  },
  computed: {
    rules() {
      let res = {};
      this.searchItems.forEach(it => {
        if (it.rule && typeof it.rule === "string") {
          let ruleKeys = it.rule.split(",");
          let rules = [];
          ruleKeys.forEach(ii => {
            if (it.type === "select") {
              RULES[ii].trigger = "change";
            } else {
              RULES[ii].trigger = "blur";
            }
            rules.push(RULES[ii]);
          });
          Object.defineProperty(res, it.property, {
            configurable: true,
            enumerable: true,
            value: rules,
            writable: true
          });
        } else if (it.rule && it.rule instanceof Array) {
          if (it.type === "select") {
            it.rule.forEach(i => {
              i.trigger = "change";
            });
          }
          Object.defineProperty(res, it.property, {
            configurable: true,
            enumerable: true,
            value: it.rule,
            writable: true
          });
        }
      });
      return res;
    }
  },
  components: {
    SearchItem
  }
};
</script>

<style>
  .searchs .el-date-editor.el-input.el-input--prefix.el-input--suffix.el-date-editor--date {
  width: 100% !important;
}
</style>
