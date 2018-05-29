<template>
    <div>
      <el-form-item :label="editItem.label" v-if="editItem.type == 'text' || editItem.type == 'number'" :prop="editItem.property" >
        <el-input :type="editItem.type" v-model="item[editItem.property]" :disabled="editItem.disabled"  :placeholder="editItem.placeholder"></el-input>
      </el-form-item>
      <el-form-item :label="editItem.label" v-if="editItem.type == 'select' && (! editItem.hidden || editItem.hidden())" >
        <el-select v-model="item[editItem.property]" style="width:100%;" :placeholder="editItem.placeholder" :disabled="editItem.disabled" :multiple="editItem.multiple">
          <el-option v-for="(opt, idx) in editItem.options"
                     :key="idx"
                     :label="editItem.optLabel ? opt[editItem.optLabel] : opt.label"
                     :value="editItem.optValue ? opt[editItem.optValue] : opt.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="editItem.label" v-if="editItem.type == 'textarea'" >
        <el-input type="textarea" v-model="item[editItem.property]" :placeholder="editItem.placeholder" :disabled="editItem.disabled"></el-input>
      </el-form-item>
    </div>
</template>

<script>
  export default {
    name: 'formEdit',
    props: {
      editItem: Object,
      editValue: {},
      item: Object
    },
    // watch: {
    //   item(val, oldVal){
    //     console.log(val,oldVal)
    //     this.item = val;
    //   },
    //   trueValue(val,oldValue){
    //     let obj = {};
    //     obj[this.editItem.property] = val;
    //     this.$emit('valueChange', obj);
    //   }
    // },
    // mounted () {
    //   console.log(this.item)
    // }
  }
</script>

<style scoped>

</style>
