// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({42:[function(require,module,exports) {
window.App = {
  template: '\n      <div class="app">\n        <app-header v-show="!isSharing" v-bind:is-login-in="isLoginIn" @login-out="onSignOut" @on-edit="isEdit=true" @on-save="saveResume" @on-print="print" @on-share="share" @on-change-skin="changeSkinVisible=true"></app-header>\n        <main>\n          <resume v-show="!isEdit" v-bind:resume="resume" @remove-skill="removeSkill($event)"></resume>\n          <edit-resume v-show="isEdit" v-bind:resume="resume" @remove-skill="removeSkill($event)" @add-skill="addSkill()" @remove-project="removeProject($event)" @add-project="addProject()"></edit-resume>\n        </main>\n        <footer v-show="!isSharing">\n          <p class="author"><span>\u7B80\u5386\u7F16\u8F91\u5668</span> by \u6D77\u5C71\u57CE</p>\n          <p><a class="link" href="https://haishancheng.github.io/vue-resume-2018/src/index.html#/">github.com/haishancheng.</a> All Rights Reserved.</p>\n          <p>\xA9 CopyRight 2018-xxxx</p>\n        </footer>\n        <transition name="bounce">\n          <prompt v-show="promptVisible" v-bind:prompt="prompt" @close-prompt="promptVisible = false"></prompt>\n        </transition>\n        <transition name="bounce">\n          <skin-picker v-show="changeSkinVisible" @close-skin-picker="changeSkinVisible=false" @set-theme="setTheme($event)"></skin-picker>\n        </transition>\n      </div>\n  ',
  data: function data() {
    return {
      isEdit: false,
      isLoginIn: false,
      isSharing: false,
      shareLink: '',
      resume: {
        name: '你好',
        brief: '欢迎使用简历编辑器，如果你想要制作你的简历，请点击右上角的【登录】',
        contacts: [{ iconClass: 'icon-phone', info: '16666666666', editName: 'Phone' }, { iconClass: 'icon-email', info: 'example@example.com', editName: 'Email' }, { iconClass: 'icon-qq', info: '123456789', editName: 'QQ' }, { iconClass: 'icon-wechat', info: 'wechatID', editName: 'WeChat' }, { iconClass: 'icon-blog', info: ' http://example.blog.com/', editName: 'Blog' }, { iconClass: 'icon-github', info: 'https://github.com/example', editName: 'GitHub' }],
        skills: [{ name: 'HTML', description: '熟练掌握HTML...' }, { name: 'CSS', description: '熟练掌握CSS...' }, { name: 'JavaScript', description: '熟练掌握JavaScript...' }],
        projects: [{ name: 'HTML', link: 'http://example.com', keywords: 'HTML5', description: 'HTML作品' }, { name: 'CSS', link: 'http://example.com', keywords: 'CSS3', description: 'CSS作品' }, { name: 'JavaScript', link: 'http://example.com', keywords: 'ES6', description: 'JavaScript作品' }]
      },
      resumeExample: {
        name: '你好',
        brief: '欢迎使用简历编辑器，如果你想要制作你的简历，请点击右上角的【登录】',
        contacts: [{ iconClass: 'icon-phone', info: '16666666666' }, { iconClass: 'icon-email', info: 'example@example.com' }, { iconClass: 'icon-qq', info: '123456789' }, { iconClass: 'icon-wechat', info: 'wechatID' }, { iconClass: 'icon-blog', info: ' http://example.blog.com/' }, { iconClass: 'icon-github', info: 'https://github.com/example' }],
        skills: [{ name: 'HTML', description: '熟练掌握HTML...' }, { name: 'CSS', description: '熟练掌握CSS...' }, { name: 'JavaScript', description: '熟练掌握JavaScript...' }],
        projects: [{ name: 'HTML', link: 'http://example.com', keywords: 'HTML5', description: 'HTML作品' }, { name: 'CSS', link: 'http://example.com', keywords: 'CSS3', description: 'CSS作品' }, { name: 'JavaScript', link: 'http://example.com', keywords: 'ES6', description: 'JavaScript作品' }]
      },
      promptVisible: false,
      prompt: {
        icon: '',
        info: '',
        title: ''
      },
      changeSkinVisible: false
    };
  },

  created: function created() {
    var _this = this;

    var search = location.href;
    var regex = /user_id=([^&#]+)/;
    var matches = search.match(regex);
    if (matches) {
      this.isSharing = true;
      this.getResume(matches[1]);
      this.getTheme(matches[1]);
    } else {
      if (AV.User.current()) {
        this.isLoginIn = true;
        this.shareLink = location.origin + location.pathname + '?user_id=' + AV.User.current().id;
        this.getResume(AV.User.current().id);
        this.getTheme(AV.User.current().id);
      }
      var params = this.$route.params;
      if (params.message === "signUpSuccess") {
        this.showPrompt('√', '注册成功，开始编辑你的简历吧！');
        AV.User.logIn(params.email, params.password).then(function (loggedInUser) {
          _this.isLoginIn = true;
          _this.shareLink = location.origin + location.pathname + '?user_id=' + AV.User.current().id;
          _this.getResume(loggedInUser.id);
        });
      }
      if (params.message === "signInSuccess") {
        AV.User.logIn(params.email, params.password).then(function (loggedInUser) {
          _this.isLoginIn = true;
          _this.shareLink = location.origin + location.pathname + '?user_id=' + AV.User.current().id;
          _this.getResume(loggedInUser.id);
        });
      }
    }
  },
  methods: {
    addSkill: function addSkill() {
      this.resume.skills.push({ name: '请填写技能名称', description: '请填写技能描述' });
    },
    removeSkill: function removeSkill(index) {
      this.resume.skills.splice(index, 1);
    },
    addProject: function addProject() {
      this.resume.projects.push({ name: '请填写项目名称', link: 'http://...', keywords: '请填写关键词', description: '请填写项目描述' });
    },
    removeProject: function removeProject(index) {
      this.resume.projects.splice(index, 1);
    },
    getResume: function getResume(id) {
      var _this2 = this;

      var user = new AV.Query('User');
      return user.get(id).then(function (newUser) {
        Object.assign(_this2.resume, newUser.attributes.resume);
      }).catch(function (error) {
        if (error.code === 211) {
          _this2.showPrompt('✘', '分享链接不正确！');
          // this.isSharing = false
          // this.$router.replace({path: this.$route.path, query: {msg: 'error-sharing-link'}})
        }
      });
    },
    onSignOut: function onSignOut() {
      var _this3 = this;

      if (this.isEdit) {
        this.showPrompt('!', '保存之后才可以注销哦~');
      } else {
        AV.User.logOut().then(function () {
          _this3.isLoginIn = false;
          _this3.showPrompt('√', '注销成功！');
          Object.assign(_this3.resume, _this3.resumeExample);
          _this3.$emit('set-theme', 'default');
        });
      }
    },
    saveResume: function saveResume() {
      var _this4 = this;

      var _AV$User$current = AV.User.current(),
          id = _AV$User$current.id;

      var user = AV.Object.createWithoutData('User', id);
      user.set('resume', this.resume);
      user.save().then(function () {
        // this.showPrompt('√', '保存成功！')
        _this4.isEdit = false;
      }, function () {
        console.log('数据保存失败');
      });
    },
    print: function print() {
      if (this.isEdit) {
        this.showPrompt('!', '保存之后才能打印哦~');
      } else {
        window.print();
      }
    },
    share: function share() {
      if (this.isEdit) {
        this.showPrompt('!', '保存之后才能分享哦~');
      } else {
        this.showPrompt('√', this.shareLink, '请复制下列连接进行分享');
      }
    },
    setTheme: function setTheme(value) {
      this.$emit('set-theme', value);
      this.saveTheme(value);
    },
    saveTheme: function saveTheme(theme) {
      var user = AV.Object.createWithoutData('User', AV.User.current().id);
      user.set('theme', theme);
      user.save();
    },
    getTheme: function getTheme(id) {
      var _this5 = this;

      var user = new AV.Query('User');
      return user.get(id).then(function (newUser) {
        var theme = newUser.attributes.theme;

        _this5.$emit('set-theme', theme);
      });
    },
    showPrompt: function showPrompt(icon, info, title) {
      this.prompt.icon = icon;
      this.prompt.info = info;
      this.prompt.title = title;
      this.promptVisible = true;
    }
  }

  // 组件就是一个对象，上面就已经是组件了，这里是注册组件，注册完了才可以在html中使用，做路由的话其实暂时用不到
};Vue.component('app', window.App);
},{}],74:[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '57786' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
      // Clear the console after HMR
      console.clear();
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},[74,42], null)
//# sourceMappingURL=/app.98bb41d0.map