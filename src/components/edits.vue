<template>
    <div>
        <el-form :label-width="labelWidth ? labelWidth : '80px'" label-position="left">
          <form-edit :edit-item="item" :editValue.sync="item[editItems.property]" v-for="(item,index) in editItems" :key="index" ></form-edit>
        </el-form>
    </div>
</template>

<script>
  import FormEdit from './formEdit'
  export default {
    name: 'edits',
    props: {
      editItems: Array,
      item: Object,
      labelWidth: String
    },
    methods: {
      valueChange (obj) {
        Object.assign(this.item,obj)
      },
      refresh () {
        this.$children[0].$children.forEach(it => {
          it.trueValue = this.item[it.editItem.property];
        })
      }

    },
    watch: {
      item (val, oldval) {
        this.refresh()
      },
      editItems (val, oldval) {

      }
    },
    mounted () {
      this.refresh()
    },
    components: {
      FormEdit
    }
  }
</script>

<style scoped>

</style>
