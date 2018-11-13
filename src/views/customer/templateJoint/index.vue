<template>
  <div>
    <div class="zoom-box">
      <img-zoom 
        :src="baseUrl + trailingParameter" 
        :bigsrc="baseUrl + trailingParameter" 
        width="400" 
        height="250" 
        :configs="configs"
      >
      </img-zoom>
    </div>

    <!-- table测试 -->
    <el-table
      :data="tableData6"
      :span-method="objectSpanMethod"
      border
      style="width: 100%; margin-top: 20px">
      <el-table-column
        prop="id"
        label="ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="amount1"
        label="数值 1（元）">
      </el-table-column>
      <el-table-column
        prop="amount2"
        label="数值 2（元）">
      </el-table-column>
      <el-table-column
        prop="amount3"
        label="数值 3（元）">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import imgZoom from "@/components/v-zoom"
  export default {
    components : {
      imgZoom,
    },
    data() {
      return {
        baseUrl : 'http://filetest.arbexpress.cn/150217103521/15325733390/1540542999465/0F83F1AB751280F4DA41B4C9B45BA1BA0.jpg',
        // 阿里云url 后缀参数
        trailingParameter : '?x-oss-process=image/resize,h_250/auto-orient,1/rotate,0',
        // 放大镜config
        configs: {
          width:400,
          height:250,
          maskWidth:133.5,
          maskHeight:83.5,
          maskColor:'#fff',
          maskOpacity:0.2
        },

        tableData6: [{
          id: '12987122',
          name: '王小虎',
          amount1: '234',
          amount2: '3.2',
          amount3: 10
        }, {
          id: '12987123',
          name: '王小虎',
          amount1: '165',
          amount2: '4.43',
          amount3: 12
        }, {
          id: '12987124',
          name: '王小虎',
          amount1: '324',
          amount2: '1.9',
          amount3: 9
        }, {
          id: '12987125',
          name: '王小虎',
          amount1: '621',
          amount2: '2.2',
          amount3: 17
        }, {
          id: '12987126',
          name: '王小虎',
          amount1: '539',
          amount2: '4.1',
          amount3: 15
        }],
      }
    },
    methods : {
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 1) {
          /* return {
              rowspan: 2,
              colspan: 1
            }; */
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      },
    },
  }
</script>

<style lang="scss">

.zoom-box{
  width: 400px;
  background-color: #fff;
}

</style>