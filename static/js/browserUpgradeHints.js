;(function() {
  window.onload = function() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串 
    var isEdge = userAgent.indexOf("Edge") > -1; //判断是否IE的Edge浏览器
    var isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1&&!isEdge; //判断Chrome浏览器 
    if(!isChrome) {
      var body = document.body;
      var box = document.createElement('div');
      box.className = "m-upload-box";
      box.innerHTML = '<div style="position:fixed;top:0;left:0;height:40px;line-height:40px;background-color:#f2dede;width:100%;text-align:center;"><a style="color: #a94442;" href="https://pc.qq.com/detail/1/detail_2661.html" target="_blank">为了获得最佳的网页效果，推荐您使用chrome浏览器</a><span class="m-upload-box-close" style="margin-left:20px;cursor:pointer;">x</span></div>';
      body.appendChild(box);
      document.querySelector('.m-upload-box-close').addEventListener('click',function() {
        body.removeChild(box);
      });
    }
  };
})();