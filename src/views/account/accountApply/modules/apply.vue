<template>
  <div class="table">
    <div class="header">
      {{editDefine.title}}
    </div>
    <el-row>
      <el-col :span="def.columns == 2 ? 24 : 12" v-for="(def,index) in editDefine.content" :key="index" >
        <div class="cell" ref="">
          <div class="grid-content grid-label">
            <span>{{def.label}}</span>
          </div>
          <div class="grid-content grid-input" >
            <el-input v-model="item[def.property]" :placeholder="def.placeholder" v-if="def.type == 'text'"></el-input>
            <el-select v-model="item[def.property]" :placeholder="def.placeholder" v-if="def.type == 'select'">
              <el-option
                v-for="opt in def.options"
                :key="opt.value"
                :label="opt.label"
                :value="opt.value">
              </el-option>
            </el-select>
          </div>
        </div>
      </el-col>


    </el-row>
  </div>

</template>

<script>
  export default {
    name: 'apply',
    props: {
      editDefine: Object,
      item: Object
    }
  }
</script>

<style scoped lang="scss">
  .table{
    font-size: 14px;
    color: #666
  }
  .cell{
    display: table;
    width: 100%;
    >div{
      display:table-cell;
    }
    .grid-label{
      width: 200px;
    }
  }
  .header{
    border-right: 1px solid #e2e2e2;
    border-bottom: 1px solid #e2e2e2;
    padding: 9px 15px;
  }
  .grid-content {
    height:57px;
    box-sizing: border-box;
    lien-height: 37px;
    border-right: 1px solid #e2e2e2;
    border-bottom: 1px solid #e2e2e2;
    span{
      line-height: 37px;
    }
  }
  .grid-content.grid-label{
    padding:9px 15px
  }
  .grid-content.grid-input{
    padding:7.5px 15px
  }
</style>
