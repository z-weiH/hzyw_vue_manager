export default  {
  data () {
    return {
      _formRef: null,
      _refForms: []
    }
  },
  watch: {
    '$parent.editState': function(val,oldval){
      this.resetForm();
        this.$refs.dialog && (this.$refs.dialog.$el.scrollTop = 0);
    },
  },
  methods: {
    resetForm () {
      console.log(this);
      setTimeout(() => {
        this._refForms = [];
        Object.keys(this.$refs).forEach(key => {
          // console.error(this.$refs[key])
          if(key.indexOf('edits') === 0){
            Object.keys(this.$refs[key].$refs).forEach(k => {
              this._refForms.push(this.$refs[key].$refs[k]);
            })
          }
        })
        this._refForms.forEach(it => {
          if(it.clearValidate){
            it.clearValidate();
          }
        })
      },200)

    },
    checkbeforeSave() {
      let ret = true;
      let arr = [];
       this._refForms.forEach(it => {
         if(it.validate)
          arr.push(it.validate());
        })
      // console.log(arr);
      return Promise.all(arr);
      // return ret;
    },
  }
}
