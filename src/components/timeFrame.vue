<template>
  <div class="time-frame">
    <el-form-item prop="start">
      <el-date-picker 
        type="date" style="width:144px;" 
        :placeholder="startPlaceholder" 
        v-model="start"
        :picker-options="pickerOptions1"
        value-format="yyyy-MM-dd"
      >
      </el-date-picker>
    </el-form-item>
    <span v-if="bar" class="mr-10 m-span">-</span>
    <el-form-item prop="end">
      <el-date-picker 
        type="date" style="width:144px;" 
        :placeholder="endPlaceholder" 
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
      startPlaceholder : {
        type : String,
        default : '起始时间',
      },
      endPlaceholder : {
        type : String,
        default : '结束时间',
      },
      // 是否显示 横杠
      bar : {
        type : Boolean,
        default : true,
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
  .m-span{
    display: inline-block;
    vertical-align: top;
    margin-top: 15px;
  }
}

</style>