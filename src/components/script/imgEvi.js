export  default {
  methods:{
    imgEviListener(refName){

      setTimeout(() => {
        let element = null;
        console.log('init',this.$refs)
        if(this.$refs[refName] && this.$refs[refName].length > 0){
          this.$refs[refName][0].onmouseenter = () => {
            if(!element){
              let elm = this.$refs[refName][0];
              element = elm.querySelector('img');
            }
            if(element){
              let w = element.offsetWidth;
              let h = element.offsetHeight;
              element.onmousewheel = (e) =>{
                e.preventDefault();
                let url = element.src;
                if(url.indexOf('?x-oss-process=image/resize') == -1){
                  element.src = url + `?x-oss-process=image/resize,p_100`;
                }

                let idx =element.src.lastIndexOf('_');
                let left = element.src.substring(0,idx);
                let right = +element.src.substr(idx+1);
                if(right < 20){
                  right = 20;
                }
                if(e.deltaY> 0){
                  element.src = left +'_'+ (right-10);
                }
                if(e.deltaY< 0){
                  element.src = left +'_'+ (right+10);
                }
              }
            }

          };
          this.$refs[refName][0].onmouseleave = () => {
            if(element){
              element.onmousewheel = null;
            }
          };

          this.$refs[refName][0].onmousedown = (e)=>{
            let elm = this.$refs[refName][0];
            element = elm.querySelector('img');
            element.ondragstart=function (){return false;};
            let x =e.clientX;
            let y =e.clientY;
            let w = element.offsetWidth;
            let h = element.offsetHeight;
            let _x = element.style.left ? +element.style.left.substring(0,element.style.left.length - 2) : 0;
            let _y = element.style.top ? +element.style.top.substring(0,element.style.top.length - 2) : 0;
            if(e.target.tagName == 'IMG'){
              element.onmousemove = (ev) =>{
                let left = ev.clientX - x;
                let top = ev.clientY - y;

                element.style.left = _x + left + 'px';
                element.style.top = _y + top + 'px';
              }
            }

          }
          this.$refs[refName][0].onmouseup = (e) =>{
            element.onmousemove = null;
          }

        }
      },2000)
    },
    imgEviListenerDown(e){

    },
    imgEviListenerUp(e){

    },
    imgEviListenerMove(){

    }
  },
  mounted(){
    this.imgEviListener('evidenceWarper');
  }
}
