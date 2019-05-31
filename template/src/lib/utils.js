/**
 * 正则
 */
export const urlReg = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/);

/**
 * 数据对象拷贝
 * @param  {[type]} obj [description]
 * @return {[type]}     [description]
 */
export const deepCopy = (obj) => JSON.parse(JSON.stringify(obj));

/**
 * 本地存储
 * @type {Object}
 */
export const localStore = {
  userKey: 'user',
  setItem: function(key, value) {
    if (value instanceof Object) {
      value = JSON.stringify(value);
    }
    localStorage.setItem(key, value);
  },
  getItem: function(key) {
    let value = localStorage.getItem(key);
    if (!value) return null;
    value = JSON.parse(value);
    if (value instanceof Object) {
      return value;
    }
    return Object.prototype.toString.call(value);
  },
  saveUser: function(user) {
    this.setItem(this.userKey, user);
  },
  getToken: function() {
    let user = this.getItem(this.userKey)
    return user ? user.token : '';
  },
  getUser: function() {
    return this.getItem(this.userKey);
  },
  removeUser: function() {
    localStorage.removeItem(this.userKey)
  },
  getRefreshToken: function() {
    let user = this.getItem(this.userKey)
    return user ? user.refresh_token : '';
  }
};

/**
 * 权限菜单计算
 * @type {Object}
 */
export const menuHelper = {
  join(p1, p2) {
    if (p1 === '/') return p2;
    return p1 + '/' + p2;
  },
  allowed(parent, child, fullPath) {
    let menuPath = this.join(parent, child);
    return fullPath.indexOf(menuPath) === 0
  },
  genMenues(parents, result = [], prePath = '/') {
    let menus = [];
    let ps = parents.filter(p => !p.hidden && p.auth);
    for (let p of ps) {
      let menu = { path: this.join(prePath, p.path), label: p.name };
      if (p.children && p.children.length > 0) { //页面权限
        menu.children = this.genMenues(p.children, result, menu.path);
      } else if (p.cmpAuth && p.cmpAuth.length > 0) { //组件权限
        // console.log('组件权限',prePath, p.cmpAuth)
        menu.children = p.cmpAuth.map(cmp => {
          return {
            path: this.join(menu.path, cmp.key),
            label: cmp.name
          }
        });
      }
      // console.log('menu', JSON.stringify(menu))
      menus.push(menu);
    }

    return menus;
  }
};
