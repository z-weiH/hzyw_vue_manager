export default {
  // 数据处理的小工具都写在这里
  data() {
    return {
      /**
       * 深拷贝对象：使用场景，
       * 处理克隆data上数据，
       * 子组件有需求要去更改这个数据，
       * 防止父组件data中的变量值发生改变！
       * @param {Object} OldOb 父组件data方法中挂载的数据源
       * @param {Array} OldKey 需要拷贝的键值对key的名称
       */
      deepCopy(OldOb, OldKey) {
        let _mob = {};
        let _OldOb = JSON.parse(JSON.stringify(OldOb));
        OldKey.forEach((item, index) => {
          _mob[item] = _OldOb[item];
        });
        return _mob;
      }
    }
  }
}
