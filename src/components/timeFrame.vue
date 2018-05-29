<template>
  <div class="time-frame">
    <el-form-item prop="start">
      <el-date-picker 
        type="date" class="w-133" 
        placeholder="起始时间" 
        v-model="start"
        :picker-options="pickerOptions1"
        value-format="yyyy-MM-dd"
      >
      </el-date-picker>
    </el-form-item>
    <span class="mr-10">-</span>
    <el-form-item prop="end">
      <el-date-picker 
        type="date" class="w-133" 
        placeholder="结束时间" 
        v-model="end"
        :picker-options="pickerOptions2"
        value-format="yyyy-MM-dd"
      >
      </el-date-picker>
    </el-form-item>
  </div>
</template>

<script>
  export default {
    props : {
      /* 开始时间 */
      startDate : {
        required: true,
      },
      /* 结束时间 */
      endDate : {
        required: true,
      },
    },
    watch : {
      start() {
        this.initTime();
      },
      end() {
        this.initTime();
      },
    },
    data() {
      let _this = this;
      return {
        start : this.startDate,
        end : this.endDate,
        pickerOptions1 : {
          disabledDate(time) {
            if(_this.endDate){
              return time.getTime() > + new Date(_this.endDate);
            }
            return false;
          }
        },
        pickerOptions2 : {
          disabledDate(time) {
            if(_this.startDate){
              return time.getTime() < + new Date(_this.startDate) - (1000 * 3600 * 20);
            }
            return false;
          }
        },
      }
    },
    mounted() {},
    methods : {
      initTime() {
        this.$emit('update:startDate',this.start);
        this.$emit('update:endDate',this.end);
      },
    },
  }
</script>

<style lang="scss">

.time-frame{
  display: inline-block;
  vertical-align: top;
  .el-form-item{
    vertical-align: middle;
  }
}

</style>