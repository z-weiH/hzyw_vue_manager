<template>
  <div class="tableEdits">
    <el-form :model="item" ref="tableEdits" :rules="rules">

    <table
      class="m-primordial-table el-table el-table--fit el-table--border el-table--enable-row-hover mb-20" v-for="(def,index) in calcDefines" :key="index"
    >
        <tbody v-if="!def.hidden || def.hidden()" >
        <tr>
          <td colspan="4" v-if="def.title">{{def.title}}</td>
        </tr>
        <tr class="table-edits" v-for="cnt in def.content" >
          <template v-for="td in cnt" >
            <template v-if="!td.hidden || td.hidden(item)">
              <td colspan="1" v-if="td.type != 'info' && td.type != 'img'">{{td.label ? td.label : td.labelFn(item)}}</td>
              <td :colspan="td.columns == 2 ? 3 : 1" v-if="td.type != 'info' && td.type != 'img'">
                <el-form-item label="" :prop="td.property">
                  <el-date-picker  v-if="td.type == 'date' | td.type == 'moment' | td.type == 'month'"  :format="td.baseFmat" :value-format="td.val_baseFmat ? td.val_baseFmat : 'yyyy-MM-dd'" v-model="item[td.property]" :type="td.type" :placeholder="td.placeholder"  :disabled="disabled || td.disabled" :readonly="td.readonly">
                  </el-date-picker>
                  <el-input v-model.trim="item[td.property]" :placeholder="td.placeholder" type="text" :disabled="disabled || td.disabled" :readonly="td.readonly" v-if="td.type == 'text' " @mousewheel='scrollFunc' @DOMMouseScroll="scrollFunc"></el-input>

                  <el-input v-model.trim="item[td.property]" :placeholder="td.placeholder" type="text" :disabled="disabled || td.disabled" :readonly="td.readonly" v-if=" td.type === 'number'" @mousewheel='scrollFunc' @DOMMouseScroll="scrollFunc" @keyup.native="HandleNumberCheck(td)"></el-input>
                  <el-select clearable  @change="valueChange({label:td.property,value:item[td.property]})" v-model="item[td.property]" :placeholder="td.placeholder" :disabled="disabled || td.disabled" :readonly="td.readonly" v-if="td.type == 'select'">
                    <el-option
                      v-for="opt in td.options"
                      :key="opt.value"
                      :label="td.labelfield ? opt[td.labelfield] : opt.label"
                      :value="td.valuefield ? opt[td.valuefield] : opt.value">
                    </el-option>
                  </el-select>
                  <el-input type="textarea" v-model="item[td.property]" :placeholder="td.placeholder" :disabled="disabled || td.disabled" :readonly="td.readonly"  v-if="td.type == 'textarea'"></el-input>
                  <el-upload :ref="td.property" :on-success="uploadSucc"	 class="upload-demo" :data="{path: td.path , token : token}" :action="uploadUrl"   :limit="1"  v-if="td.type == 'file' && !(disabled || td.disabled)" >
                    <el-button size="small" type="info" plain @click="startUpload(td)">点击这里上传文件</el-button>
                  </el-upload>
                  <template v-else>
                    <a v-if="item[td.property] && td.type == 'file'" class="colLink" :href="item[td.property]" target="_blank">{{td.disabledLabel}}</a>
                    <a v-if="!item[td.property] && td.type == 'file'" >未上传内容</a>
                  </template>
                </el-form-item>

              </td>
              <td :colspan="td.columns == 2 ? 4 : 2" v-if="td.type == 'info'">
                <span>{{td.content}}</span>
              </td>
              <td :colspan="td.columns == 2 ? 4 : 2" v-if="td.type == 'img'">
                <img :class="{'img-pointer':item[td.property]}" @click="HandleImgClick(item[td.property])" class="table_img" v-bind:src="item[td.property]" alt="">
              </td>
            </template>
          </template>
        </tr>
        </tbody>

    </table>

    <slot name="tableAdded"></slot>
      <table
        class="m-primordial-table el-table el-table--fit el-table--border el-table--enable-row-hover mb-20" v-for="(def,index) in residueDefines" :key="index"
      >
        <tbody v-if="!def.hidden || def.hidden()" >
        <tr>
          <td colspan="4" v-if="def.title">{{def.title}}</td>
        </tr>
        <tr class="table-edits" v-for="cnt in def.content" >
          <template v-for="td in cnt" >
            <template v-if="!td.hidden || td.hidden(item)">
              <td colspan="1" v-if="td.type != 'info' && td.type != 'img'">{{td.label ? td.label : td.labelFn(item)}}</td>
              <td :colspan="td.columns == 2 ? 3 : 1" v-if="td.type != 'info' && td.type != 'img'">
                <el-form-item label="" :prop="td.property">
                  <el-date-picker  v-if="td.type == 'date' | td.type == 'moment' | td.type == 'month'"  :format="td.baseFmat" :value-format="td.val_baseFmat ? td.val_baseFmat : 'yyyy-MM-dd'" v-model="item[td.property]" :type="td.type" :placeholder="td.placeholder"  :disabled="disabled || td.disabled" :readonly="td.readonly">
                  </el-date-picker>
                  <el-input v-model.trim="item[td.property]" :placeholder="td.placeholder" type="text" :disabled="disabled || td.disabled" :readonly="td.readonly" v-if="td.type == 'text' " @mousewheel='scrollFunc' @DOMMouseScroll="scrollFunc"></el-input>

                  <el-input v-model.trim="item[td.property]" :placeholder="td.placeholder" type="text" :disabled="disabled || td.disabled" :readonly="td.readonly" v-if=" td.type === 'number'" @mousewheel='scrollFunc' @DOMMouseScroll="scrollFunc" @keyup.native="HandleNumberCheck(td)"></el-input>
                  <el-select clearable  @change="valueChange({label:td.property,value:item[td.property]})" v-model="item[td.property]" :placeholder="td.placeholder" :disabled="disabled || td.disabled" :readonly="td.readonly" v-if="td.type == 'select'">
                    <el-option
                      v-for="opt in td.options"
                      :key="opt.value"
                      :label="td.labelfield ? opt[td.labelfield] : opt.label"
                      :value="td.valuefield ? opt[td.valuefield] : opt.value">
                    </el-option>
                  </el-select>
                  <el-input type="textarea" v-model="item[td.property]" :placeholder="td.placeholder" :disabled="disabled || td.disabled" :readonly="td.readonly"  v-if="td.type == 'textarea'"></el-input>
                  <el-upload :ref="td.property" :on-success="uploadSucc"	 class="upload-demo" :data="{path: td.path , token : token}" :action="uploadUrl"   :limit="1"  v-if="td.type == 'file' && !(disabled || td.disabled)" >
                    <el-button size="small" type="info" plain @click="startUpload(td)">点击这里上传文件</el-button>
                  </el-upload>
                  <template v-else>
                    <a v-if="item[td.property] && td.type == 'file'" class="colLink" :href="item[td.property]" target="_blank">{{td.disabledLabel}}</a>
                    <a v-if="!item[td.property] && td.type == 'file'" >未上传内容</a>
                  </template>
                </el-form-item>

              </td>
              <td :colspan="td.columns == 2 ? 4 : 2" v-if="td.type == 'info'">
                <span>{{td.content}}</span>
              </td>
              <td :colspan="td.columns == 2 ? 4 : 2" v-if="td.type == 'img'">
                <img :class="{'img-pointer':item[td.property]}" @click="HandleImgClick(item[td.property])" class="table_img" v-bind:src="item[td.property]" alt="">
              </td>
            </template>
          </template>
        </tr>
        </tbody>

      </table>

    </el-form>
    <slot name="tablePlus"></slot>
  </div>
</template>

<script>
/**
   * @method
   * @description 描述一下方法的作用
   * @pros editDefines 传入的表单定义,可循环生产多个表格，暂时不支持文件上传
   *                    demo:     edtDefines: [{
                                      title: '第一部分：客户基本信息',
                                      content: [
                                        {label: '客户全称：', type: 'text', placeholder: '请输入客户全称',columns:1,property: 'hello'},
                                        {label: '年营业额（万元）：', type: 'text', placeholder: '请输入年营业额',columns:1},
                                        {label: '统一社会信用代码：', type: 'text', placeholder: '请输入社会唯一信用号',columns:1},
                                        {label: '邮箱(账户)：', type: 'text', placeholder: '请输入邮箱(账户)',columns:1},
                                        {label: '企业注册地址：', type: 'text', placeholder: '请输入企业注册地址',columns:2},
                                        {label: '网址或应用(名称)：', type: 'text', placeholder: '请输入网址或应用(名称)',columns:2},
                                      ]
                                    }]
   *@props item 传入的和edit的property属性双向绑定的数据对象
   */
  import axios from 'axios';
import host from '../axios/host'

import {RULES} from "./script/rules";
  export default {
    name: 'tableEdits',
    props: {
      editDefines: Array,
      item: Object,
      disabled: Boolean,
      sliceNumber: Number
    },
    data() {
      return {
        token : JSON.parse(localStorage.getItem('loginInfo')).token,
        uploadUrl: host.target + '/file/upload.htm'+'?token='+JSON.parse(localStorage.getItem('loginInfo')).token,
        path: '',
        editPro: '',
        residueDefines: [],
        calcDefines: []
      }
    },
    computed: {
      rules() {
        let res= {},arr = [];
        this.editDefines.forEach(it => {
          it.content.forEach(ii => {
            arr.push(ii);
          })
        })
        arr.forEach( it => {
          if(it.rule && typeof it.rule === 'string'){
            let ruleKeys = it.rule.split(',');
            let rules = [];
            if(it.type === 'number'){
              rules.push({required : false , pattern : /^\d*$/ , message : '必须输入数字',trigger:'blur'});
            }
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
    methods: {

      initParams(){
        let returnArr = [];
        this.editDefines.forEach(it =>{
          let obj = {title: it.title, content: [],hidden: it.hidden};
          for(let i = 0;i<it.content.length;i++){
            if(it.content[i].columns!=2 && i < it.content.length-1){
              obj.content.push([it.content[i],it.content[++i]])
            }else{
              obj.content.push([it.content[i]])
            }
          }
          returnArr.push(obj);
        })
        if(this.sliceNumber){
          this.residueDefines = returnArr.slice(this.sliceNumber);
          this.calcDefines = returnArr.slice(0,this.sliceNumber);
        }else{
          this.calcDefines =  returnArr;
        }
      },

      HandleNumberCheck(td){
        console.log(td)
        let reg = /[^0-9]/g;
        this.item[td.property] = this.item[td.property].replace(reg,'');


      },
      HandleImgClick(src) {
        if(src){
          window.open(src, "_blank");
        }
      },
      scrollFunc(evt) { //取消滑轮的默认事件
        evt = evt || window.event;
        console.log(123);
        if(evt.preventDefault) {
          // Firefox
          evt.preventDefault();
          evt.stopPropagation();
        } else {
          // IE
          evt.cancelBubble=true;
          evt.returnValue = false;
        }
        return false;
      },
      valueChange(obj) {
        this.$emit('valueChange', obj);
      },
      clearFiles() {
        Object.keys(this.$refs).forEach(key => {
          if(this.$refs[key] && this.$refs[key][0] && this.$refs[key][0].clearFiles instanceof Function)
            this.$refs[key][0].clearFiles();
        })
      },
      startUpload(td){
        console.log(td);
        this.path = td.path;
        this.editPro = td. property;
      },
      uploadSucc(response, file, fileList){
        console.log(response, file, fileList)
        if(response.code == '0000'){
          this.item[this.editPro] = response.result;
          this.$emit('update:item',this.item);
          console.log(this.item);
          // this.item = Object.assign({},this.item);
          // this.$set(this.item, this.editPro, response.result);
          fileList = [];
        }else {
          this.$message.error('上传文件失败');
        }
      }
    },
  watch: {
    editDefines(val, oldVal) {
      this.initParams();
    }
  },
  mounted() {
    console.log(this.editDefines);
  },
  created(){
    this.initParams();
  },
    updated() {
      this.clearFiles();
    }
};
</script>

<style scoped lang="scss">
.el-table--border {
  border: none;
  border-left: 1px solid #ebeef5;
}
td {
  border: 1px solid #ebeef5;
}
  img.img-pointer{
    cursor: pointer;
  }
</style>
