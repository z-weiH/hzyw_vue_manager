<template>
    <div>
      <el-form-item :label="editItem.label" v-if="editItem.type == 'text'">
        <el-input v-model="trueValue" :disabled="editItem.disabled" :placeholder="editItem.placeholder"></el-input>
      </el-form-item>
      <el-form-item :label="editItem.label" v-if="editItem.type == 'select'">
        <el-select v-model="trueValue" :placeholder="editItem.placeholder" :disabled="editItem.disabled" :multiple="editItem.multiple">
          <el-option v-for="(opt, idx) in editItem.options" :key="idx" :label="editItem.optLabel ? opt[editItem.optLabel] : opt.label" :value="editItem.optValue ? opt[editItem.optValue] : opt.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="editItem.label" v-if="editItem.type == 'textarea'" >
        <el-input type="textarea" v-model="trueValue" :placeholder="editItem.placeholder" :disabled="editItem.disabled"></el-input>
      </el-form-item>
    </div>
</template>

<script>
  export default {
      name: 'formEdit',
      props: {
        editItem: Object,
        editValue: {}
      },
    data () {
      return {
        trueValue : this.editValue
      }
    },
    watch: {
      'editItem.options': (val,oldValue) => {
          console.error(val,oldValue)
      },
      trueValue(val,oldValue){
        let obj = {};
        obj[this.editItem.property] = val;
        console.log('sssssssss:',val);
        this.$emit('valueChange', obj);
      }
    },
    mounted () {

    }
  }
</script>

<style scoped>

</style>
