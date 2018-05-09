<template>
  <div class="time-frame">
    <el-form-item prop="startTime">
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
    <el-form-item prop="endTime">
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
      startTime : {
        required: true,
      },
      /* 结束时间 */
      endTime : {
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
        start : this.startTime,
        end : this.endTime,
        pickerOptions1 : {
          disabledDate(time) {
            if(_this.endTime){
              return time.getTime() > + new Date(_this.endTime);
            }
            return false;
          }
        },
        pickerOptions2 : {
          disabledDate(time) {
            if(_this.startTime){
              return time.getTime() < + new Date(_this.startTime) - (1000 * 3600 * 20);
            }
            return false;
          }
        },
      }
    },
    mounted() {},
    methods : {
      initTime() {
        this.$emit('update:startTime',this.start);
        this.$emit('update:endTime',this.end);
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