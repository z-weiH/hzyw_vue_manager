export default  {
  data () {
    return {
      _formRef: null,
      _refForms: []
    }
  },

  methods: {
    resetForm () {
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
          it.clearValidate();
        })
      },200)

    },
    checkbeforeSave() {
      let ret = true;
      let arr = [];
       this._refForms.forEach(it => {
        arr.push(it.validate());
        })
      // console.log(arr);
      return Promise.all(arr);
      // return ret;
    },
    // findForm(start, formname){
    //   let res = start.$refs[formname];
    //   if(res){
    //     this._formRef = res;
    //     return ;
    //   }else{
    //     return start.$children.forEach(it=>{
    //        this.findForm(it, formname);
    //     })
    //   }
    // },
    // checkForm(formname){
    //   let res = false;
    //   this._formRef = null;
    //   this.findForm(this, formname);
    //   if(this._formRef){
    //     this._formRef.validate((valid) => {
    //       if (valid) {
    //         res = true;
    //       } else {
    //         res = false;
    //       }
    //     });
    //   }else{
    //     res = false;
    //   }
    //   return res;
    // }
  }
}
