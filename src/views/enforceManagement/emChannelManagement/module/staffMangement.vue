<template>
    <div class="staffMangement">
      <div class="wsbodyhead">
        <a>所在位置</a>
        <router-link tag="a" to="emChannelManagement" class="aside_tit">渠道商-{{$route.query.channelName}}</router-link>
        <a href="javascript:;" class="aside_tit">员工管理</a>
      </div>
      <div class="item-search">
        <el-form :inline="true" ref="ruleForm" :model="searchItem" >
          <el-form-item label="" prop="keyWord" >
            <el-input style="width: 240px;" v-model.trim="searchItem.keyWord" placeholder="用户名、手机号"></el-input>
          </el-form-item>

          <el-button @click="HandleQuery" type="warning">查询</el-button>
        </el-form>
      </div>

      <div class="item-title of-hidden" style="position: relative;">
        <el-button style="position: absolute;top: 6px;right: 10px;" type="primary" @click="addChannel">添加</el-button>
        <span class="item-title-sign">渠道成员</span>
      </div>

      <div class="item-table" >
        <el-table
          :data="tableData"
          border
          style="width: 100%;">
          <el-table-column
            type="index"
            width="70"
            label="序号"
          >
          </el-table-column>
          <el-table-column prop="agencyName"  label="渠道名称"></el-table-column>
          <el-table-column prop="userName"  label="用户名"></el-table-column>
          <el-table-column prop="userPhone"  label="手机号"></el-table-column>
          <el-table-column prop="isBand"  label="是否绑定微信">
            <template slot-scope="scope">
              <!--<el-switch-->
                <!--active-color="#13ce66"-->
                <!--inactive-color="#ff4949"-->
                <!--v-model="scope.row.isLinked">-->
              <!--</el-switch>-->
              <span>{{scope.row.isBand === 1 ? '是' : '否'}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="updateTime"  label="更新时间"></el-table-column>
          <el-table-column prop="userRoleName"  label="角色"></el-table-column>
          <el-table-column prop="isDeleted"  label="是否启用">
            <!--是否删除，1 是 0 否-->
            <template slot-scope="scope">
              <el-switch
                active-color="#13ce66"
                @change="HandleChange($event, scope.row)"
                v-model="scope.row.isDeleted">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column
            prop="courtSettingStatus"
            label="操作"
          >
            <template slot-scope="scope">
              <el-button type="text" @click="handleEditClick(scope.row)" size="small">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>


      <el-pagination
        class="mt-10 mb-10"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pager.currentNum"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pager.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pager.count">
      </el-pagination>



      <el-dialog
        :visible.sync="flag"
        v-dialogDrag
        :title="title"
        width="440px"
        center>

        <el-form ref="form" :rules="rules" :model="item" label-width="80px">

          <el-form-item label="用户名" prop="userName">
            <el-input v-model="item.userName"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="loginName">
            <el-input v-model="item.loginName"></el-input>
          </el-form-item>
          <el-form-item label="登录密码" prop="password">
            <el-input type="password" v-model="item.password"></el-input>
          </el-form-item>

          <el-form-item label="渠道类型" prop="userRole" >
            <el-radio-group v-model="item.userRole">
              <!--1：自营渠道：2：律所代理：3：公司代理-->
              <template v-if="$route.query.channelType == 1">
                <el-radio label="FINANCE">财务</el-radio>
                <el-radio label="OPERATOR">运营</el-radio>
                <el-radio label="FINANCE_SUPERVISOR">财务主管</el-radio>
                <el-radio label="OPERATOR_SUPERVISOR">运营主管</el-radio>
              </template>
              <template v-else>
                <el-radio label="SUPERVISOR">负责人</el-radio>
                <el-radio label="COMMONEMP">普通员工</el-radio>
              </template>
            </el-radio-group>
          </el-form-item>

        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary"  @click="save">确 定</el-button>
          <el-button @click="flag = false">取 消</el-button>
    </span>
      </el-dialog>
    </div>
</template>

<script>
    import host from '../../../../axios/distribute_host'
    export default {
        name: 'staffMangement',
        data(){
          return {
            flag: false,
            title: '',
            item: {},
            rules : {
              userName : [
                { required : true , message : '请输入用户名' , trigger : 'blur'},
              ],
              loginName : [
                { required : true , message : '请输入手机号' , trigger : 'blur'},
                { pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/ , message : '手机号格式不正确' , trigger : 'blur'},
              ],
              password : [
                { required : true , pattern: '^[a-zA-Z0-9]{6,16}$', message : '密码必须未6到16位的数字或英文' , trigger : 'blur'},
              ],
              userRole : [
                { required : true , message : '请选择角色' , trigger : 'blur'},
              ],
            },
            searchItem: {},
            tableData: [],
            pager: {
              currentNum: 1,
              pageSize: 10,
              count: 1
            }
          }
        },
      watch:{
        'flag'(val, oldval){
          if(!val){
            this.$refs.form.resetFields();
          }
        }
      },
        methods:{



          save(){
            this.$refs.form.validate((valid) => {
              if (valid) {
                let obj = {...this.item};
                if(obj.password === '00000000'){
                    delete obj.password;
                }
                if(obj.userId){
                  this.$http.post('/employee/mod.htm',{...obj},{notoken: true,apiPrefix: 'web'}).then(res => {
                    this.flag = false;
                    this.doQuery();
                  })
                }else{
                  this.$http.post('/employee/add.htm', {agencyId: this.$route.query.channelId, ...obj},{notoken: true,apiPrefix: 'web'}).then(res => {
                    this.flag = false;
                    this.doQuery();
                  })
                }
              }
            });
          },

          handleEditClick(row){
            this.item = {userId: row.userId, userName: row.userName,loginName: row.userPhone, password: '00000000',userRole: row.userRole};
            this.title = '修改渠道成员';
            this.flag = true;
          },

          HandleChange(val,row){
            console.log(val, row);
            this.$http.post('/employee/del.htm',{isDeleted: 1 - (+val), userId: row.userId },{notoken: true,apiPrefix: 'web',apiPrefix: 'web'}).then(res => {

            }).catch( () => {
              row.isDeleted = !val;
            })
          },

          addChannel(){
            this.title= '添加渠道成员';
            this.item = {};
            this.flag = true;
          },


          HandleQuery(){
            this.pager.currentNum = 1;
            this.doQuery();
          },

          handleSizeChange(val){
            this.pager.pageSize = val;
            this.pager.currentNum = 1;
            this.doQuery();
          },
          handleCurrentChange(val){
            this.pager.currentNum = val;
            this.doQuery();
          },

          doQuery(){
            this.$http.get('/employee/list.htm',{params: {agencyId: this.$route.query.channelId, ...this.pager,...this.searchItem},notoken: true,apiPrefix: 'web'}).then(res => {
              this.tableData = res.result.list;
              this.pager.count = res.result.count;
              res.result.list.forEach(it => {
                it.isDeleted = it.isDeleted === 0;
              })
            })
          },
        },
        created(){
          console.log(host);
          this.HandleQuery();
        }
    }
</script>

<style scoped lang="scss">

</style>
