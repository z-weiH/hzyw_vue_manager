<template>
    <div>
      <el-form-item :label="editItem.label" v-if="editItem.type == 'text'">
        <el-input v-model="trueValue" :readonly="editItem.readonly" :placeholder="editItem.placeholder"></el-input>
      </el-form-item>
      <el-form-item :label="editItem.label" v-if="editItem.type == 'select'">
        <el-select v-model="trueValue" :placeholder="editItem.placeholder" :readonly="editItem.readonly">
          <el-option v-for="(opt, idx) in editItem.options" :key="idx" :label="opt.label" :value="opt.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="editItem.label" v-if="editItem.type == 'textarea'" >
        <el-input type="textarea" v-model="trueValue" :placeholder="editItem.placeholder" :readonly="editItem.readonly"></el-input>
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
      trueValue(val,oldValue){
        let obj = {};
        obj[this.editItem.property] = val;
        this.$emit('valueChange', obj);
      }
    },
    mounted () {

    }
  }
</script>

<style scoped>

</style>
