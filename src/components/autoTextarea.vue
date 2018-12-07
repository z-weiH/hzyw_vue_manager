<template>
    <el-input 
      class="auto-textarea" 
      @keydown.native="handleChange" 
      ref="textarea" :rows="rows" 
      type="textarea" 
      v-model="textareaVal" 
      :placeholder="placeholder" 
      @blur="handleBlur"
      spellcheck="false"
    />
</template>

<script>
  import autosize from 'autosize'
  export default {
    props : {
      rows : {
        default : 2,
      },
      value : {
        type : String,
      },
      placeholder : {
        type : String,
        default : '请输入'
      },
      // 回车是否 换行
      enter : {
        default : true,
      },
    },
    watch : {
      textareaVal(val) {
        this.$emit('input',val);
        // 校验 element 组件
        this.$refs.textarea.dispatch('ElFormItem', 'el.form.change', [val]);
      },
      value(val) {
        this.textareaVal = val;
      },
    },
    data() {
      return {
        textareaVal : '',
      }
    },
    mounted() {
      this.textareaVal = this.value;
      this.$nextTick(() => {
        autosize(this.$refs.textarea.$el.querySelector('textarea'));
      });
    },
    methods : {
      handleChange(event) {
        let code = event.keyCode;
        if(code === 13 && this.enter === false) {
          event.preventDefault();  
        }
      },
      handleBlur() {
        // 校验 element 组件
        this.$refs.textarea.dispatch('ElFormItem', 'el.form.blur', [this.textareaVal]);
      },
    },
  }
</script>

<style lang="scss">

.auto-textarea{
  textarea{
    resize: none;
  }
}

</style>