// 超出显示省略号
function cutString(str, len) {
  //length属性读出来的汉字长度为1
  if (str.length * 2 <= len) {
    return str;
  }
  var strlen = 0;
  var s = "";
  for (var i = 0; i < str.length; i++) {
    s = s + str.charAt(i);
    if (str.charCodeAt(i) > 128) {
      strlen = strlen + 2;
      if (strlen >= len) {
        return s.substring(0, s.length - 1) + "...";
      }
    } else {
      strlen = strlen + 1;
      if (strlen >= len) {
        return s.substring(0, s.length - 2) + "...";
      }
    }
  }
  return s;
}

/**
 * 节流函数
 * @param {*} fn 调用方法
 * @param {*} delay 毫秒数
 */
function throttle(fn, delay) {
  var timer = null;
  return function() {
    var context = this,
        args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function() {
        fn.apply(context, args);
    }, delay);
  };
}

export {
  cutString,
}
