export const urlReg = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/);


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
  }
}
