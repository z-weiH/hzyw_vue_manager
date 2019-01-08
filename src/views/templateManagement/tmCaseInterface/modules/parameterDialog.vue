<template>
  <div class="tm-caseInterface-parameter-dialog">
    <el-dialog
      :title="type === 'add' ? '添加参数' : '编辑参数'"
      :visible.sync="dialogVisible"
      width="580px"
      @close="handleClose"
			ref="dialog"
    >
      <div class="m-conetnt">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
          
					<el-form-item class="param-name-box" label="参数" prop="paramCode">
						<el-input @click.native.stop="searchShow" class="param-name-input" style="width:400px;" v-model.trim="ruleForm.paramCode" placeholder="请选择参数" suffix-icon="el-icon-arrow-down"></el-input>

            <!-- 弹出框 -->
            <div @click.stop="() => {}" v-if="searchActive" class="param-name-dialog">
              <!-- tab 切换 -->
              <div>
                <el-tabs v-model="tabActive" type="card">
                  <el-tab-pane label="案件参数" name="0">
                    <div class="param-name-cont">
                      <ul>
                        <li :key="index" v-for="(item,index) in listAJCS">
                          <div class="mb-10">
                            <span class="param-title">{{item.categoryDesc}}</span>
                          </div>
                          <div @click="handleCheckAJCS(item,item2)" class="param-child mb-10 cursor" :key="index + '' + index2" v-for="(item2,index2) in item.params">
                            <span class="param-title-green">{{item2.paramCode}}</span>
                            <span>{{item2.paramName}}</span>
                          </div>
                        </li>
                      </ul>

                      <div class="no-data" v-if="listAJCS.length === 0">
                        <span>暂无数据</span>
                      </div>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="仲裁参数" name="1">
                    <div class="param-name-cont">
                      <ul>
                        <li @click="handleCheckZCCS(item)" class="mb-10 cursor" :key="index" v-for="(item,index) in listZCCS">
                          <span class="param-title-green">{{item.paramCode}}</span>
                          <span>{{item.paramName}}</span>
                        </li>
                      </ul>
                      <div class="no-data" v-if="listZCCS.length === 0">
                        <span>暂无数据</span>
                      </div>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="个性参数" name="2">
                    <div class="param-name-cont">
                      <ul>
                        <li @click="handleCheckGXCS(item)" class="mb-10 cursor" :key="index" v-for="(item,index) in listGXCS">
                          <span class="param-title-green">{{item.paramCode}}</span>
                          <span>{{item.paramName}}</span>
                        </li>
                      </ul>
                      <div class="no-data" v-if="listGXCS.length === 0">
                        <span>暂无数据</span>
                      </div>
                    </div>
                  </el-tab-pane>
                </el-tabs>
              </div>
            </div>
					</el-form-item>

          <el-form-item label="参数中文名" prop="paramName">
						<el-input style="width:400px;" v-model.trim="ruleForm.paramName" placeholder="请输入"></el-input>
					</el-form-item>

					<el-form-item label="类型" prop="valueType">
            <el-select clearable style="width:400px;" v-model="ruleForm.valueType" placeholder="请选择类型">
              <el-option label="Integer" :value="1"></el-option>
              <el-option label="String" :value="2"></el-option>
              <el-option label="Date" :value="3"></el-option>
              <el-option label="Decimal" :value="4"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item filterable label="所属模块" prop="categoryCode">
            <el-select clearable style="width:400px;" v-model="ruleForm.categoryCode" placeholder="请选择所属模块">
              <el-option label="基础信息" :value="1"></el-option>
              <el-option label="金额信息" :value="2"></el-option>
              <el-option label="当事人信息" :value="3"></el-option>
              <el-option label="日期信息" :value="4"></el-option>
              <el-option label="证据信息" :value="5"></el-option>
              <el-option label="还款信息" :value="6"></el-option>
              <el-option label="借款人银行卡信息" :value="7"></el-option>
              <el-option label="分期贷信息" :value="8"></el-option>
              <el-option label="代偿信息" :value="9"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="数据来源" prop="dataSource">
            <el-select clearable style="width:400px;" v-model="ruleForm.dataSource" placeholder="请选择数据来源">
              <el-option label="接口" :value="0"></el-option>
              <el-option label="脚本" :value="1"></el-option>
              <el-option label="公式" :value="2"></el-option>
              <el-option label="账户" :value="3"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="说明" prop="paramNote">
						<el-input type="textarea" style="width:400px;" v-model.trim="ruleForm.paramNote" placeholder="请输入"></el-input>
					</el-form-item>
        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button :disabled="submitDisabled" type="primary" @click="handleSubmit">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  let copyArray = (arr) => {
    return JSON.parse(JSON.stringify(arr));
  }
  export default {
    data() {
      return {
        dialogVisible : false,
        // 提交按钮禁用状态
        submitDisabled : false,
        // 当前菜单
        tabActive : '0',
        searchActive : false,
        type : '',
        row : '',

        ruleForm : {
          // 参数
          paramCode : '',
          // 参数中文名
          paramName : '',
          // 类型 	案件参数类型(1:数字,2:字符串,3:日期,4:金额)
          valueType : '',
          // 所属模块
          categoryCode : '',
          // 数据来源 数据来源(0:接口;1:脚本;2:公式)
          dataSource : '',
          // 说明
          paramNote : '',
        },
        rules : {
          paramCode : [
            {required : true , message : '请选择参数' , trigger : 'change'},
          ],
          paramName : [
            {required : true , message : '请输入参数中文名' , trigger : 'blur'},
          ],
          valueType : [
            {required : true , message : '请选择类型' , trigger : 'change'},
          ],
          categoryCode : [
            {required : true , message : '请选择所属模块' , trigger : 'change'},
          ],
          dataSource : [
            {required : true , message : '请选择数据来源' , trigger : 'change'},
          ],
        },

        // 案件参数 list
        listAJCS : [
          {
            // 参数分类的编码值: 1-基础信息 2-金额信息 3-当事人信息 4-日期信息 5-证据信息 6-还款信息 7-借款人银行卡信息 8-分期贷信息 9-代偿信息
            categoryCode : 1,
            // 参数分类的编码值中文
            categoryDesc : '基础类型',
            // 表格数据
            params : [
              {
                // 参数
                paramCode : '我是参数',
                // 中文
                paramName : '我是中文',
                // 类型 1:数字,2:字符串,3:日期,4:金额
                valueType : 4,
                // 属性 0 否 1 是 是否为通用参数 属性
                isCommon : 1,
                // 说明
                paramNote : '我是说明',
                // id
                paramId : 'id',
                paramType : 0,
              }
            ],
          },
          {
            categoryCode : 2,
            categoryDesc : '金额信息',
            params : [],
          },
        ],
        listAJCSDefault : [],
        // 仲裁参数 list
        listZCCS : [
          {
            // 参数
            paramCode : '我是参数2',
            // 中文
            paramName : '我是中文2',
            // 类型 1:数字,2:字符串,3:日期,4:金额
            valueType : 4,
            // 属性 0 否 1 是 是否为通用参数 属性
            isCommon : 1,
            // 说明
            paramNote : '我是说明',
            // id
            paramId : 'id',
            paramType : 1,
          },
        ],
        listZCCSDefault : [],
        // 个性参数 list
        listGXCS : [
          {
            // 参数
            paramCode : '我是参数3',
            // 中文
            paramName : '我是中文3',
            // 类型 1:数字,2:字符串,3:日期,4:金额
            valueType : 4,
            // 属性 0 否 1 是 是否为通用参数 属性
            isCommon : 1,
            // 说明
            paramNote : '我是说明',
            // id
            paramId : 'id',
            paramType : 1,
          },
        ],
        listGXCSDefault : [],
      }
    },
    watch : {
      ['ruleForm.paramCode'](val) {
        this.paramCodeFilter();
      },
      // 菜单切换
      tabActive() {
        this.paramCodeFilter();
      },
    },
    mounted() {
      // 测试 - 需删除
      this.listAJCSDefault = copyArray(this.listAJCS);
      this.listZCCSDefault = copyArray(this.listZCCS);
      this.listGXCSDefault = copyArray(this.listGXCS);
    },
    methods : {
      show(type,data) {
        this.dialogVisible = true;
        this.type = type;
				// dialog 返回顶部
        this.$nextTick(() => {
          this.$refs.dialog.$el.scrollTop = 0;
        });

        // 获取数据
        this.getAJCS();
        this.getZCCS();
        this.getGXCS();

        this.$nextTick(() => {
          // 处理逻辑 写在nextTick中 ， 防止dialog没有加载数据问题
          document.addEventListener('click',this.clickFn);
          if(this.type === 'edit') {
            this.row = data;
          }
          this.ruleForm = Object.assign(this.ruleForm,data);
        });
      },
      searchShow() {
        this.searchActive = true;
      },
      searchClose() {
        this.tabActive = '0';
        this.searchActive = false;

        // 还原搜素数据
        this.listAJCS = copyArray(this.listAJCSDefault);
        this.listZCCS = copyArray(this.listZCCSDefault);
        this.listGXCS = copyArray(this.listGXCSDefault);
      },
      // 全局点击事件
      clickFn() {
        this.searchClose();
      },

      // 关闭浮层
      handleClose() {
        this.dialogVisible = false;
        
        setTimeout(() => {
          // 取消按钮禁用
          this.submitDisabled = false;
          // 重置表单数据
          this.$refs.ruleForm.resetFields();
          this.$nextTick(() => {
            this.$refs.ruleForm.clearValidate();
          });

          this.searchClose();
          // 销毁事件
          document.removeEventListener('click',this.clickFn);
				},500);
				
      },
      // 点击提交
      handleSubmit(submitType) {
        this.$refs.ruleForm.validate((valid) => {
          if(valid) {
						// 提交数据
            this.submitDisabled = true;
            let form = {...this.ruleForm};
            form.prodTempId = this.$route.query.prodTempId;
            if(this.type === 'edit') {
              form.id = this.row.id;
            }
						this.$http({
              method : 'post',
              url : '/interface/saveInterfaceParam.htm',
              data : form,
            }).then((res) => {
              this.$message.success('操作成功');
              this.handleClose();
              this.$emit('successCBK');
            }).catch(() => {
              this.submitDisabled = false;
            });
          }
        });
      },

      // 获取 案件参数
      getAJCS() {
        // 处理页面案件参数列表中 不出现重复问题
        let dataFormat = (arr) => {
          let result = [];
          let parentData = [];
          this.$parent.tableData.map(v => {
            v.params.map(v1 => {
              parentData.push(v1);
            });
          });
          // 获取所有 一维表格数据
          parentData = copyArray(parentData);
          result = arr.map((v) => {
            let params = [];
            v.params.map(v1 => {
              let len = parentData.filter(v2 => v2.paramCode === v1.paramCode).length;
              if(len === 0) {
                params.push(v1);
              }
            });
            v.params = params;
            return v;
          });
          return copyArray(result)
        }
        this.$http({
          method : 'post',
          url : '/param/queryCaseParamList.htm',
        }).then((res) => {
          this.listAJCS = dataFormat(res.result);
          this.listAJCSDefault = dataFormat(res.result);
        });
      },
      // 获取 仲裁参数
      getZCCS() {
        this.$http({
          method : 'post',
          url : '/param/queryArbParamList.htm',
        }).then((res) => {
          this.listZCCS = res.result;
          this.listZCCSDefault = copyArray(res.result);
        });
      },
      // 获取 个性参数
      getGXCS() {
        this.$http({
          method : 'post',
          url : '/param/queryPersonalParamList.htm',
          data : {
            productId : this.$route.query.productId,
          },
        }).then((res) => {
          this.listGXCS = res.result;
          this.listGXCSDefault = copyArray(res.result);
        });
      },

      // 浮层选择案件参数
      handleCheckAJCS(item,item2) {
        item = copyArray(item);
        item2 = copyArray(item2);
        this.ruleForm.paramCode = item2.paramCode;
        this.ruleForm.paramName = item2.paramName;
        this.ruleForm.valueType = item2.valueType;
        this.ruleForm.categoryCode = item.categoryCode;

        this.searchClose();
      },
      handleCheckZCCS(item) {
        item = copyArray(item);
        this.ruleForm.paramCode = item.paramCode;
        this.ruleForm.paramName = item.paramName;
        this.ruleForm.valueType = item.valueType;

        this.searchClose();
      },
      handleCheckGXCS(item) {
        item = copyArray(item);
        this.ruleForm.paramCode = item.paramCode;
        this.ruleForm.paramName = item.paramName;
        this.ruleForm.valueType = item.valueType;

        this.searchClose();
      },
      // 过滤 paramCode
      paramCodeFilter() {
        let val = this.ruleForm.paramCode.toLocaleLowerCase();
        // 案件参数
        if(this.tabActive === '0') {
          if(val) {
            let newArr = [];
            copyArray(this.listAJCSDefault).map((v) => {
              let params = v.params.filter((v1) => {
                if(v1.paramCode.toLocaleLowerCase().indexOf(val) !== -1 || v1.paramName.indexOf(val) !== -1) {
                  return v1;
                }
              });
              if(params.length > 0) {
                v.params = params;
                newArr.push(v);
              }
            });
            this.listAJCS = newArr;
          }else{
            this.listAJCS = copyArray(this.listAJCSDefault);
          }
        // 仲裁参数
        }else if(this.tabActive === '1') {
          if(val) {
            let newArr = [];
            copyArray(this.listZCCSDefault).map((v) => {
              if(v.paramCode.indexOf(val) !== -1 || v.paramName.indexOf(val) !== -1) {
                newArr.push(v);
              }
            });
            this.listZCCS = newArr;
          }else{
            this.listZCCS = copyArray(this.listZCCSDefault);
          }
        // 个性参数
        }else if(this.tabActive === '2') {
          if(val) {
            let newArr = [];
            copyArray(this.listGXCSDefault).map((v) => {
              if(v.paramCode.indexOf(val) !== -1 || v.paramName.indexOf(val) !== -1) {
                newArr.push(v);
              }
            });
            this.listGXCS = newArr;
          }else{
            this.listGXCS = copyArray(this.listGXCSDefault);
          }
        }
      },
    },
  }
</script>

<style lang="scss">

.tm-caseInterface-parameter-dialog{
  .param-name-box{
    position: relative;
    .param-name-input input{
      cursor: pointer;
    }
    .param-name-dialog{
      position: absolute;
      background-color: #fff;
      border-radius: 4px;
      width: 400px;
      border: 1px solid #dcdfe6;
      border-top: none;
      z-index: 10;
      top: 40px;
      .no-data{
        line-height: 40px!important;
        text-align: center;
      }
      .param-name-cont{
        max-height: 274px;
        overflow: auto;
        padding-left: 10px;
        div{
          line-height: initial;
          margin-bottom: 10px;
        }
        li{
          line-height: initial;
          margin-bottom: 10px;
        }
        ul{
          padding-top: 10px;
        }
      }
      .el-tabs__nav-wrap.is-scrollable{
        padding: 0;
      }
      .el-tabs__nav-prev,.el-tabs__nav-next{
        display: none;
      }
      .el-tabs__nav>div{
        width: 133px!important;
        text-align: center;
      }
      .el-tabs__header{
        margin-bottom: 0;
      }

      .param-title-green{
        color: #0f357f;
      }
      .param-title{
        font-weight: bold;
      }
      .param-child{
        padding-left: 20px;
      }
    }
  }
}

</style>
