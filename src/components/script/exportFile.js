export default {
  methods: {
    exportFile(surl) {
      let _userData = JSON.parse(localStorage.getItem('loginInfo'));
      console.info(_userData.token);
      alert(1);
      let url = surl + '?';
      delete this.searchItem.pageSize;
      delete this.searchItem.currentNum;
      delete this.searchItem.count;
      Object.keys(this.searchItem).forEach(key => {
        !this.searchItem[key] && (this.searchItem[key] = '');
        url += key + '=' + this.searchItem[key] + '&';
      })
      // url = url.substr(0, url.length - 1);
      url = url + `token=${_userData.token}`;
      let _form = document.createElement('form');
      _form.setAttribute('id', 'efile');
      _form.setAttribute('action', url);
      _form.setAttribute('method', 'get');
      _form.setAttribute('style', 'display:none;');
      document.body.appendChild(_form);
      _form.submit();
      document.getElementById('efile').remove();
      console.log(url);

    }

  }
}
