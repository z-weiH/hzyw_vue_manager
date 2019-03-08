<template>
  <el-dialog
    :visible.sync="show"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :title="'审核意见'"
    width="560px"
    center>
    <el-form>
      <el-form-item label="审核结果" label-width="100px" label-position="left">
        <el-select v-model="status" >
          <el-option label="通过" value="1"></el-option>
          <el-option label="未通过" value="0"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
          <customer-button type="primary" >确 认</customer-button>
          <customer-button @click="$parent.editState = 0" >取 消</customer-button>
      </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'audit',
  data() {
    return {
      status: 0
    }
  },
  computed:{
    show: {
      get: function () {
        return this.$parent.editState !== 0;
      },
      set: function (v) {
        if(!v)
          this.$parent.editState = 0
      }
    }
  }
}
</script>

<style scoped>

</style>
