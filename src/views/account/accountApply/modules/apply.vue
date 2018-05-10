<template>
<div>
  <table
    class="m-primordial-table el-table el-table--fit el-table--border el-table--enable-row-hover" v-for="(def,index) in calcDefines" :key="index"
  >
    <tbody>
    <tr>
      <td colspan="4">{{def.title}}</td>
    </tr>
    <tr v-for="cnt in def.content" >
      <template v-for="td in cnt" >
        <td colspan="1">{{td.label}}</td>
        <td :colspan="td.columns == 2 ? 3 : 1">
          <el-input v-model.trim="item[td.property]" :placeholder="td.placeholder" v-if="td.type == 'text'"></el-input>
          <el-select v-model="item[td.property]" :placeholder="td.placeholder" v-if="td.type == 'select'">
            <el-option
              v-for="opt in td.options"
              :key="opt.value"
              :label="opt.label"
              :value="opt.value">
            </el-option>
          </el-select>
        </td>
      </template>
    </tr>
    </tbody>
  </table>
</div>
</template>

<script>
  export default {
    name: 'apply',
    props: {
      editDefines: Array,
      item: Object
    },
    computed: {
      calcDefines () {
        let returnArr = [];
        this.editDefines.forEach(it =>{
          let obj = {title: it.title, content: []};
          for(let i = 0;i<it.content.length;i++){
            if(it.content[i].columns!=2){
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
    mounted () {
      console.log(this.calcDefine)
    }
  }
</script>

<style scoped lang="scss">
  .el-table--border, .el-table--group{
    border: none;
    border-left: 1px solid #ebeef5;
  }
  td{
    border: 1px solid #ebeef5;
  }
</style>
