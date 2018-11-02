import { throttle } from '@/assets/js/tool'
let scrollFn;

export default {
  init(callback) {
    scrollFn = throttle(() => {
      // 高亮判断的位置元素
      let arr = Array.map(document.querySelectorAll('.scroll-top-item'),v => v.offsetTop);
      // 当前滚动条距离 顶部的距离
      let top = document.querySelector('.main').scrollTop;
      // 判断当前滚动距离 距离哪个元素范围
      for(let index = 0 ; index < arr.length ; index ++) {
        let current = arr[index];
        let next = arr[index + 1];
        // （当前滚动距离大于等于元素距离顶部位置 且 当前滚动距离小于下一个元素位置） || （如果当前是最后一个元素，滚动距离大于自身）
        if( (top >= current && top < next) || (!next && top >= current) ) {
          callback(index,current,next);
        }
      };
    },60);
    document.querySelector('.main').addEventListener('scroll',scrollFn,false);
    scrollFn();
  },

  unbind() {
    document.querySelector('.main').removeEventListener('scroll',scrollFn);
  },

}