export default  {
  data () {
    return {
      _formRef: null
    }
  },
  methods: {
    findForm(start, formname){
      let res = start.$refs[formname];
      if(res){
        this._formRef = res;
        return ;
      }else{
        return start.$children.forEach(it=>{
           this.findForm(it, formname);
        })
      }
    },
    checkForm(formname){
      let res = false;
      this._formRef = null;
      this.findForm(this, formname);
      if(this._formRef){
        this._formRef.validate((valid) => {
          if (valid) {
            res = true;
          } else {
            res = false;
          }
        });
      }else{
        res = false;
      }
      return res;
    }
  }
}
