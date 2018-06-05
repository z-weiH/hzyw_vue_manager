import host from '@/axios/host'
export default {
  methods: {
    exportFile(surl) {
      let _userData = JSON.parse(localStorage.getItem('loginInfo'));
      // alert(1);
      let url = host + surl + '?';
      delete this.searchItem.pageSize;
      delete this.searchItem.currentNum;
      delete this.searchItem.count;
      Object.keys(this.searchItem).forEach(key => {
        !this.searchItem[key] && (this.searchItem[key] = '');
        url += key + '=' + this.searchItem[key] + '&';
      })
      // url = url.substr(0, url.length - 1);
      url = url + `token=${_userData.token}`;
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
