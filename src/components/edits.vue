<template>
    <div>
        <el-form :label-width="labelWidth ? labelWidth : '80px'" label-position="left">
          <form-edit :edit-item="item" :editValue="item[editItems.property]" v-for="(item,index) in editItems" :key="index" @valueChange="valueChange"></form-edit>
        </el-form>
    </div>
</template>
<script>
  /**
   * @method
   * @description 描述一下方法的作用
   * @param editItems Array 定义要呈现的表单元素
   *                  demo: editItems: [
                             {type: 'text', property:'loginName', label: '用户名', disalbed: true},
                             {type: 'text', property:'userName', label: '真实姓名'},
                             {type: 'text', property:'userPhone', label: '手机号码'},
                             {type: 'text', property:'userEmail', label: '电子邮箱'},
                             {type: 'select', property:'roleIds', label: '角色权限（可多选）',options: [{label:'角色1',value:'palyer1'},{label:'角色2',value:'palyer2'},]},
                             {type: 'text', property:'userAddress', label: '通讯地址'},
                             {type: 'textarea', property:'otherInfo', label: '其它信息', placeholder: '请输入内容'},
                           ],
                          type 表示类型  目前有  text,select(需要额外定义options属性),textarea
                          property 属性名，作用在传入的item对象上
                          label 左侧文字说明
                          disabled 不可编辑 直接传入 readonly为true 即可
   * @param item  Object 通过property作为表单的数据源
   * @param labelWidth String label的宽度
   */
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
        console.log(this.item);
        this.refresh()
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
