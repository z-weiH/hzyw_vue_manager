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

/**
 * //对字符串进行加密
 * @param {any} code
 * @returns
 */
function compileStr(code) {
  var c = String.fromCharCode(code.charCodeAt(0) + code.length);
  for (var i = 1; i < code.length; i++) {
    c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1));
  }
  return escape(c);
}




/**
 * //字符串进行解密
 * @param {any} code
 * @returns
 */
function uncompileStr(code) {
  code = unescape(code);
  var c = String.fromCharCode(code.charCodeAt(0) - code.length);
  for (var i = 1; i < code.length; i++) {
    c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1));
  }
  return c;
}

export {
  cutString,
  throttle,
  compileStr,
  uncompileStr
}
