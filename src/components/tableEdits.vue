<template>
  <div>
    <table
      class="m-primordial-table el-table el-table--fit el-table--border el-table--enable-row-hover mb-20" v-for="(def,index) in calcDefines" :key="index"
    >
      <tbody>
      <tr>
        <td colspan="4" v-if="def.title">{{def.title}}</td>
      </tr>
      <tr class="table-edits" v-for="cnt in def.content" >
        <template v-for="td in cnt" >
          <td colspan="1" v-if="td.type != 'info' && td.type != 'img'">{{td.label}}</td>
          <td :colspan="td.columns == 2 ? 3 : 1" v-if="td.type != 'info' && td.type != 'img'">
            <el-input v-model.trim="item[td.property]" :placeholder="td.placeholder" :disabled="disabled || td.disabled" :readonly="td.readonly" v-if="td.type == 'text'"></el-input>
            <el-select v-model="item[td.property]" :placeholder="td.placeholder" :disabled="disabled || td.disabled" :readonly="td.readonly" v-if="td.type == 'select'">
              <el-option
                v-for="opt in td.options"
                :key="opt.value"
                :label="td.labelfield ? opt[td.labelfield] : opt.label"
                :value="td.valuefield ? opt[td.valuefield] : opt.value">
              </el-option>
            </el-select>
            <el-input type="textarea" v-model="item[td.property]" :placeholder="td.placeholder" :disabled="disabled || td.disabled" :readonly="td.readonly" v-if="td.type == 'textarea'"></el-input>
            <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/"   :limit="3" :show-file-list="false" v-if="td.type == 'file' && !(disabled || td.disabled)" >
              <el-button size="small" type="info" plain>点击这里上传文件</el-button>
            </el-upload>
            <a v-else class="colLink" :href="item[td.property]" target="_blank">{{td.disabledLabel}}</a>
          </td>
          <td :colspan="td.columns == 2 ? 4 : 2" v-if="td.type == 'info'">
            <span>{{td.content}}</span>
          </td>
          <td :colspan="td.columns == 2 ? 4 : 2" v-if="td.type == 'img'">
            <span>{{td.content}}</span>
          </td>
        </template>
      </tr>
      </tbody>
    </table>
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
  export default {
    name: 'tableEdits',
    props: {
      editDefines: Array,
      item: Object,
      disabled: Boolean
    },
    computed: {
      calcDefines () {
        let returnArr = [];
        this.editDefines.forEach(it =>{
          let obj = {title: it.title, content: []};
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
      }
    },
    watch: {
      editDefines(val, oldVal) {
        console.error(val,oldVal)
      }
    },
    mounted () {
      console.log(this.editDefines)
    }
  }
</script>

<style scoped lang="scss">
  .el-table--border{
    border: none;
    border-left: 1px solid #ebeef5;
  }
  td{
    border: 1px solid #ebeef5;
  }
</style>
