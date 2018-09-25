import Vue from 'vue';

// v-dialogDrag: 弹窗拖拽
Vue.directive('dialogDrag', {
  bind(el, binding, vnode, oldVnode) {
    const dialogHeaderEl = el.querySelector('.el-dialog__header');
    const dragDom = el.querySelector('.el-dialog');
    dialogHeaderEl.style.cursor = 'move';

    // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
    const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null);

    dialogHeaderEl.onmousedown = (e) => {
      // 鼠标按下，计算当前元素距离可视区的距离
      const disX = e.clientX - dialogHeaderEl.offsetLeft;
      const disY = e.clientY - dialogHeaderEl.offsetTop;
      // 获取到的值带px 正则匹配替换
      let styL, styT;

      // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
      if(sty.left.includes('%')) {
        styL = +document.body.clientWidth * (+sty.left.replace(/\%/g, '') / 100);
        styT = +document.body.clientHeight * (+sty.top.replace(/\%/g, '') / 100);
      }else {
        styL = +sty.left.replace(/\px/g, '');
        styT = +sty.top.replace(/\px/g, '');
      };

      document.onmousemove = function (e) {
        // 通过事件委托，计算移动的距离
        const l = e.clientX - disX;
        const t = e.clientY - disY;

        // 移动当前元素
        dragDom.style.left = `${l + styL}px`;
        dragDom.style.top = `${t + styT}px`;

        //将此时的位置传出去
        //binding.value({x:e.pageX,y:e.pageY})
      };

      document.onmouseup = function (e) {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    }
  }
})
//表格内容缩进... hover 显示完整
Vue.directive('tableCollapse',{
  inserted(el, binding, vnode, oldVnode){
    setTimeout(()=> {
      if(el.offsetParent && (el.offsetWidth+20 > el.offsetParent.offsetWidth)){
        el.setAttribute('title',el.innerHTML)
      }
    },200)

  },
  updated(el, binding, vnode, oldVnode){
    setTimeout(()=> {
      if(el.offsetParent && (el.offsetWidth+20 > el.offsetParent.offsetWidth)){
        el.setAttribute('title',el.innerHTML)
      }
    },200)

  }
})

Vue.directive('ellipsis',{
  inserted(el,binding,vnode,oldVnode) {
    el.style.display = 'inline-block';
    el.style.whiteSpace = 'nowrap';
    // 可以存储数据到 el中
    el.$mapp = new Vue({
      el : el,
      data() {
        let padding = Object.keys(binding.modifiers)[0] || 0;
        let parentWidth = binding.value || (el.parentNode.clientWidth - padding);
        let width = el.clientWidth;
        let text = el.innerText;
        return {
          padding,
          parentWidth,
          width,
          el,
          text,
        }
      },
      template : `
        <span class="ellipsis-box" style="display:inline-block;">
          <template v-if="width <= parentWidth">
            {{text}}
          </template>
          <template v-else>
            <el-tooltip :content="text" placement="top-start">
              <span 
                style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;display:inline-block;"
                :style="{maxWidth : parentWidth + 'px'}">{{text}}</span>
            </el-tooltip>
          </template>
        </span>
      `
    });
  },
  componentUpdated(el,binding,vnode,oldVnode) {
    // 以下操作 为了获取当前元素的 width
    let span = document.createElement('span');
    let className = `span-${Math.random()}`
    span.className = className;
    span.innerText = el.innerText;
    document.body.appendChild(span);
    let width = span.offsetWidth;
    document.body.removeChild(span);

    let padding = Object.keys(binding.modifiers)[0] || 0;
    el.$mapp.padding = padding;
    el.$mapp.parentWidth = binding.value || (el.$mapp.$el.parentNode.clientWidth - padding);
    el.$mapp.width = width;
    el.$mapp.text = el.innerText;

  },
});


