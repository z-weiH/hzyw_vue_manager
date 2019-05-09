<template>
    <div>
      <div>
        <div class="wsbodyhead">
          <a>所在位置</a>
          <a href="javascript:;" class="aside_tit">执行标的计算器</a>
        </div>

        <div class="flex_contianer">
          <div class="left_contianer">
            <ul class="form">
              <li>
                <div class="form-label">
                  <el-upload
                    class="upload-demo"
                    style="float: right;display: inline-block;cursor: pointer;"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    multiple
                    :limit="3"
                    :on-exceed="handleExceed"
                    :show-file-list="false"
                    >
                    <el-button  size="small" type="text" >导入</el-button>
                  </el-upload>
                  仲裁案号
                </div>
                <div class="form-value">
                  <el-select
                    v-model="value"
                    multiple
                    filterable
                    remote
                    reserve-keyword
                    placeholder="请输入或导入仲裁案号"
                    :remote-method="remoteMethod"
                    :loading="loading">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </li>
              <li>
                <div class="form-label">
                  日期
                </div>
                <div class="form-value">
                  <el-date-picker
                    v-model="value1"
                    type="date"
                    placeholder="请选择执行标的计算截止日期">
                  </el-date-picker>
                </div>
              </li>

            </ul>
            <el-button type="success" style="width: 100%;">计&nbsp;&nbsp;算</el-button>
          </div>
          <div class="right_contianer">

            <p style="margin-top: 150px;text-align: center;    font-weight: 700;
    font-style: normal;
    font-size: 18px;
    color: #CCCCCC;">请在左侧录入仲裁案号及计算截止时间</p>

          </div>
        </div>

      </div>
    </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      loading: false,
      options: []
    }
  },
  methods:{
    remoteMethod(query){

    }
  }
}
</script>

<style scoped lang="scss">
  .flex_contianer{
    display: flex;
    >div{
      border: 1px solid #CCCCCC;
      background: #fff;
      line-height: 30px;
      &.left_contianer{
        width: 270px;
        padding: 10px;
        margin-right: 10px;
        ul>li{
          margin-bottom: 15px;
        }
        height: 220px;
      }
      &.right_contianer{
        flex: 1;
        min-height: 500px;
      }
    }

  }
</style>
