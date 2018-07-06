window.App = {
  template: `
      <div class="app">
        <app-header v-show="!isSharing" v-bind:is-login-in="isLoginIn" @login-out="onSignOut" @on-edit="isEdit=true" @on-save="saveResume" @on-print="print" @on-share="share"></app-header>
        <main>
          <resume v-show="!isEdit" v-bind:resume="resume" @remove-skill="removeSkill($event)"></resume>
          <edit-resume v-show="isEdit" v-bind:resume="resume" @remove-skill="removeSkill($event)" @add-skill="addSkill()" @remove-project="removeProject($event)" @add-project="addProject()"></edit-resume>
        </main>
 
        <footer v-show="!isSharing">
          <p class="author"><span>简历编辑器</span> by 海山城</p>
          <p><a class="link" href="https://haishancheng.github.io/vue-resume-2018/src/index.html#/">github.com/haishancheng.</a> All Rights Reserved.</p>
          <p>© CopyRight 2018-xxxx</p>
        </footer>
        <transition name="bounce">
          <prompt v-show="promptVisible" v-bind:prompt="prompt" @close-prompt="promptVisible = false"></prompt>
        </transition>
      </div>
  `,
  data() {
    return {
      isEdit: false,
      isLoginIn: false,
      isSharing: false,
      shareLink: '',
      resume: {
        name: '你好',
        brief: '欢迎使用简历编辑器，如果你想要制作你的简历，请点击右上角的【登录】',
        contacts: [
          {iconClass: 'icon-phone', info: '16666666666', editName: 'Phone'},
          {iconClass: 'icon-email', info: 'example@example.com', editName: 'Email'},
          {iconClass: 'icon-qq', info: '123456789', editName: 'QQ'},
          {iconClass: 'icon-wechat', info: 'wechatID', editName: 'WeChat'},
          {iconClass: 'icon-blog', info: ' http://example.blog.com/', editName: 'Blog'},
          {iconClass: 'icon-github', info: 'https://github.com/example', editName: 'GitHub'},
        ],
        skills: [
          {name: 'HTML', description: '熟练掌握HTML...'},
          {name: 'CSS', description: '熟练掌握CSS...'},
          {name: 'JavaScript', description: '熟练掌握JavaScript...'},
        ],
        projects: [
          {name: 'HTML', link: 'http://example.com', keywords: 'HTML5', description: 'HTML作品'},
          {name: 'CSS', link: 'http://example.com', keywords: 'CSS3', description: 'CSS作品'},
          {name: 'JavaScript', link: 'http://example.com', keywords: 'ES6', description: 'JavaScript作品'},
        ]
      },
      resumeExample: {
        name: '你好',
        brief: '欢迎使用简历编辑器，如果你想要制作你的简历，请点击右上角的【登录】',
        contacts: [
          {iconClass: 'icon-phone', info: '16666666666'},
          {iconClass: 'icon-email', info: 'example@example.com'},
          {iconClass: 'icon-qq', info: '123456789'},
          {iconClass: 'icon-wechat', info: 'wechatID'},
          {iconClass: 'icon-blog', info: ' http://example.blog.com/'},
          {iconClass: 'icon-github', info: 'https://github.com/example'},
        ],
        skills: [
          {name: 'HTML', description: '熟练掌握HTML...'},
          {name: 'CSS', description: '熟练掌握CSS...'},
          {name: 'JavaScript', description: '熟练掌握JavaScript...'},
        ],
        projects: [
          {name: 'HTML', link: 'http://example.com', keywords: 'HTML5', description: 'HTML作品'},
          {name: 'CSS', link: 'http://example.com', keywords: 'CSS3', description: 'CSS作品'},
          {name: 'JavaScript', link: 'http://example.com', keywords: 'ES6', description: 'JavaScript作品'},
        ]
      },
      promptVisible: false,
      prompt: {
        icon: '',
        info: '',
        title: ''
      },
    }
  },
  created: function () {
    let search = location.href
    let regex = /user_id=([^&#]+)/
    let matches = search.match(regex)
    if (matches) {
      this.isSharing = true
      this.getResume(matches[1]).then(() => {
      }, () => {
      })
    } else {
      if (AV.User.current()) {
        this.isLoginIn = true
        this.shareLink = location.origin + location.pathname + '?user_id=' + AV.User.current().id
        this.getResume(AV.User.current().id)
      }
      let params = this.$router.history.current.params
      if (params.message === "signUpSuccess") {
        this.showPrompt('√', '注册成功，开始编辑你的简历吧！')
        AV.User.logIn(params.email, params.password).then((loggedInUser) => {
          this.isLoginIn = true
          this.shareLink = location.origin + location.pathname + '?user_id=' + AV.User.current().id
          this.getResume(loggedInUser.id)
        })
      }
      if (params.message === "signInSuccess") {
        AV.User.logIn(params.email, params.password).then((loggedInUser) => {
          this.isLoginIn = true
          this.shareLink = location.origin + location.pathname + '?user_id=' + AV.User.current().id
          this.getResume(loggedInUser.id)
        })
      }
    }
  },
  methods: {
    addSkill() {
      this.resume.skills.push({name: '请填写技能名称', description: '请填写技能描述'})
    },
    removeSkill(index) {
      this.resume.skills.splice(index, 1)
    },
    addProject() {
      this.resume.projects.push({name: '请填写项目名称', link: 'http://...', keywords: '请填写关键词', description: '请填写项目描述'})
    },
    removeProject(index) {
      this.resume.projects.splice(index, 1)
    },
    getResume(id) {
      var user = new AV.Query('User')
      return user.get(id).then((newUser) => {
        Object.assign(this.resume, newUser.attributes.resume)
      }).catch(function (error) {
        alert('查询的用户的id有错误，未查询到结果');
      });
    },
    onSignOut() {
      if (this.isEdit) {
        this.showPrompt('!', '保存之后才可以注销哦~')
      } else {
        AV.User.logOut().then(() => {
          this.isLoginIn = false
          this.showPrompt('√', '注销成功！')
          Object.assign(this.resume, this.resumeExample)
        })
      }
    },
    saveResume() {
      let {id} = AV.User.current()
      var user = AV.Object.createWithoutData('User', id)
      user.set('resume', this.resume)
      user.save().then(() => {
        // this.showPrompt('√', '保存成功！')
        this.isEdit = false
      }, () => {
        console.log('数据保存失败')
      })
    },
    print() {
      if (this.isEdit) {
        this.showPrompt('!', '保存之后才能打印哦~')
      } else {
        window.print()
      }
    },
    share() {
      if (this.isEdit) {
        this.showPrompt('!', '保存之后才能分享哦~')
      } else {
        this.showPrompt('√', this.shareLink, '请复制下列连接进行分享')
      }
    },
    showPrompt(icon, info, title) {
      this.prompt.icon = icon
      this.prompt.info = info
      this.prompt.title = title
      this.promptVisible = true
    }
  }
}

// 组件就是一个对象，上面就已经是组件了，这里是注册组件，注册完了才可以在html中使用，做路由的话其实暂时用不到
Vue.component('app', window.App)