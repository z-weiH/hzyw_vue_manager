<template>
  <div>
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
              <td colspan="1" v-if="td.type != 'info' && td.type != 'img'">{{td.label}}</td>
              <td :colspan="td.columns == 2 ? 3 : 1" v-if="td.type != 'info' && td.type != 'img'">
                <el-form-item label="" :prop="td.property">
                  <el-date-picker  v-if="td.type == 'date' | td.type == 'moment' | td.type == 'month'"  :format="td.baseFmat" :value-format="td.val_baseFmat" v-model="item[td.property]" :type="td.type" :placeholder="td.placeholder"  :disabled="disabled || td.disabled" :readonly="td.readonly">
                  </el-date-picker>
                  <el-input v-model.trim="item[td.property]" :placeholder="td.placeholder" :type="td.type" :disabled="disabled || td.disabled" :readonly="td.readonly" v-if="td.type == 'text' || td.type === 'number'"></el-input>
                  <el-select @change="valueChange({label:td.property,value:item[td.property]})" v-model="item[td.property]" :placeholder="td.placeholder" :disabled="disabled || td.disabled" :readonly="td.readonly" v-if="td.type == 'select'">
                    <el-option
                      v-for="opt in td.options"
                      :key="opt.value"
                      :label="td.labelfield ? opt[td.labelfield] : opt.label"
                      :value="td.valuefield ? opt[td.valuefield] : opt.value">
                    </el-option>
                  </el-select>
                  <el-input type="textarea" v-model="item[td.property]" :placeholder="td.placeholder" :disabled="disabled || td.disabled" :readonly="td.readonly"  v-if="td.type == 'textarea'"></el-input>
                  <el-upload :ref="td.property" :on-success="uploadSucc"	 class="upload-demo" :data="{path: td.path}" :action="uploadUrl"   :limit="1"  v-if="td.type == 'file' && !(disabled || td.disabled)" >
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
                <img class="table_img" :src="item[td.property]" alt="">
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
                                        {label: '社会唯一信用号：', type: 'text', placeholder: '请输入社会唯一信用号',columns:1},
                                        {label: '邮箱(账户)：', type: 'text', placeholder: '请输入邮箱(账户)',columns:1},
                                        {label: '企业注册地址：', type: 'text', placeholder: '请输入企业注册地址',columns:2},
                                        {label: '网址或应用(名称)：', type: 'text', placeholder: '请输入网址或应用(名称)',columns:2},
                                      ]
                                    }]
   *@props item 传入的和edit的property属性双向绑定的数据对象
   */
  import axios from 'axios';
import {RULES} from "./script/rules";
  export default {
    name: 'tableEdits',
    props: {
      editDefines: Array,
      item: Object,
      disabled: Boolean
    },
    data() {
      return {
        uploadUrl: '/file/upload.htm',
        path: '',
        editPro: ''
      }
    },
    computed: {
      calcDefines () {
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
        return returnArr;
      },
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
            ruleKeys.forEach( ii => {
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
      valueChange(obj) {
        this.$emit('valueChange', obj);
      },
      clearFiles() {
        Object.keys(this.$refs).forEach(key => {
          if(this.$refs[key][0] && this.$refs[key][0].clearFiles instanceof Function)
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
          // this.$parent.$set(this.item, this.editPro, response.result);
          fileList = [];
        }else {
          this.$message.error('上传文件失败');
        }
      }
    },
  watch: {
    editDefines(val, oldVal) {
    }
  },
  mounted() {
    console.log(this.editDefines);
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
</style>
Accept: */*
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9
Connection: keep-alive
Content-Length: 58603
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryT70pcUladrz2THsx
Cookie: _ga=GA1.1.366899317.1525409895; io=VTcwb0hyQ34ob0svAAAI
Host: localhost:8080
Origin: http://localhost:8080
Referer: http://localhost:8080/
User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36
