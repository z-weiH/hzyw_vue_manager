<template>
    <div>
        <el-form :model="item" :ref="formname ? formname : 'editsform'"  :rules="rules" :label-width="labelWidth ? labelWidth : '80px'" label-position="left">
          <form-edit :item="item" :edit-item="item1" v-for="(item1,index) in editItems" :key="index"></form-edit>
          <slot name="addEdits"></slot>
        </el-form>
    </div>
</template>
<script>
  /**
   * @method
   * @description 描述一下方法的作用
   * @param editItems Array 定义要呈现的表单元素
   *                  demo: editItems: [
                             {type: 'text', property:'loginName', label: '用户名', disalbed: true},
                             {type: 'text', property:'userName', label: '真实姓名'},
                             {type: 'text', property:'userPhone', label: '手机号码'},
                             {type: 'text', property:'userEmail', label: '电子邮箱'},
                             {type: 'select', property:'roleIds', label: '角色权限（可多选）',options: [{label:'角色1',value:'palyer1'},{label:'角色2',value:'palyer2'},]},
                             {type: 'text', property:'userAddress', label: '通讯地址'},
                             {type: 'textarea', property:'otherInfo', label: '其它信息', placeholder: '请输入内容'},
                           ],
                          type 表示类型  目前有  text,select(需要额外定义options属性),textarea
                          property 属性名，作用在传入的item对象上
                          label 左侧文字说明
                          disabled 不可编辑 直接传入 readonly为true 即可
   * @param item  Object 通过property作为表单的数据源
   * @param labelWidth String label的宽度
   */
  import FormEdit from './formEdit'
  import {RULES} from "./script/rules";
  export default {
    name: 'edits',
    props: {
      editItems: Array,
      item: Object,
      labelWidth: String,
      formname: String
    },
    methods: {
      valueChange (obj) {
        Object.keys(obj).forEach(key => {
          console.log(obj[key]);
          this.item[key]=obj[key];
        });
        this.refresh()
      },
    },
    data () {
      return {

      }
    },
    computed: {
      rules() {
        let res= {};
        this.editItems.forEach( it => {
          if(it.rule && typeof it.rule === 'string'){
            let ruleKeys = it.rule.split(',');
            let rules = [];
            ruleKeys.forEach( ii => {
              if(it.type === 'select'){
                RULES[ii].trigger = 'change';
              }
              else{
                RULES[ii].trigger = 'blur';
              }
              rules.push(RULES[ii]);
            });
            Object.defineProperty(res,it.property,{
              configurable: true,
              enumerable: true,
              value: rules,
              writable: true
            })
          }
          else if(it.rule && it.rule instanceof Array){
            if(it.type === 'select'){
              it.rule.forEach(i => {
                i.trigger = 'change';
              })
            }
            Object.defineProperty(res,it.property,{
              configurable: true,
              enumerable: true,
              value: it.rule,
              writable: true
            })
          }
        })
        return res;
      }
    },
    mounted () {
    },
    components: {
      FormEdit
    }
  }
</script>

<style scoped>

</style>
