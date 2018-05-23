export default {
  data() {
    return {

    }
  },
  methods: {
    exportFile(surl) {
      let url = surl + '?';
      delete this.searchItem.pageSize;
      delete this.searchItem.currentNum;
      delete this.searchItem.count;
      Object.keys(this.searchItem).forEach(key => {
        !this.searchItem[key] && (this.searchItem[key] = '');
        url += key + '=' + this.searchItem[key] + '&';
      })
      url = url.substr(0, url.length - 1);
      console.log(url);


      let _form = document.createElement('form');
      _form.setAttribute('id', 'efile');
      _form.setAttribute('action', url);
      _form.setAttribute('method', 'get');
      _form.setAttribute('style', 'display:none;');
      document.body.appendChild(_form);
      _form.submit();
      document.getElementById('efile').remove();

    }

  }
}
