window.App = {
  template: `
    <!--<div>-->
      <!--<app-aside v-show="!isShareMode" @on-save="onSave" @on-sign-out="onSignOut" @on-share="shareVisible=true" @on-print="print" @on-change-skin="skinPickerVisible=true"></app-aside>-->
      <!--<main>-->
        <!--<resume v-bind:resume="resume"></resume>-->
      <!--</main>-->
    <!--</div>-->
      <div class="app">
        <app-header></app-header>
        <main>
          <resume v-bind:resume="resume" @remove-skill="removeSkill($event)"></resume>
        </main>
        <footer>
          <p class="author"><span>简历编辑器</span> by 海山城</p>
          <p><a class="link" href="#">github.com/haishancheng.</a> All Rights Reserved.</p>
          <p>© CopyRight 2018-xxxx</p>
        </footer>
        <transition name="bounce">
          <prompt v-show="promptVisible" v-bind:prompt="prompt" @close-prompt="promptVisible = false"></prompt>
        </transition>
      </div>
  `,
  data(){
    return {
      resume: {
        name: '你好',
        gender: '欢迎使用简历编辑器，如果你想要制作你的简历，请点击右上角的【登录】',
        birthday: '1991-1-1',
        jobTitle: '前端开发工程师',
        contacts: [
          {iconClass:'icon-phone', info: '16666666666'},
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
      },
    }
  },
  created: function () {
    if(this.$router.history.current.params.message==="signUpSuccess"){
      this.prompt.icon = '√'
      this.prompt.info = '注册成功，开始编辑你的简历吧！'
      this.promptVisible = true
    }
  },
  methods:{
    addSkill(){
      this.resume.skills.push({name: '请填写技能名称', description: '请填写技能描述'})
    },
    removeSkill(index){
      this.resume.skills.splice(index, 1)
    },
    addProject(){
      this.resume.projects.push({name: '请填写项目名称', link: 'http://...', keywords: '请填写关键词', description: '请填写项目描述'})
    },
    removeProject(index){
      this.resume.projects.splice(index, 1)
    },
  }
  // data(){
  //   return {
  //     signInVisible: false,
  //     signUpVisible: false,
  //     shareVisible: false,
  //     skinPickerVisible: false,
  //     resume: {
  //       name: '开始模板',
  //       gender: '开始模板',
  //       birthday: '开始模板',
  //       jobTitle: '开始模板',
  //       phone: '开始模板',
  //       email: '开始模板',
  //       skills: [
  //         {name: '请填写技能名称', description: '请填写技能描述'},
  //         {name: '请填写技能名称', description: '请填写技能描述'},
  //       ],
  //       projects: [
  //         {name: '请填写项目名称', link: 'http://...', keywords: '请填写关键词', description: '请填写项目描述'},
  //         {name: '请填写项目名称', link: 'http://...', keywords: '请填写关键词', description: '请填写项目描述'},
  //       ]
  //     },
  //     shareLink: '不知道',
  //     isShareMode: false,
  //   }
  // },
  // methods: {
  //   onEdit(key, value) {
  //     /* 解析key => skills[0].name*/
  //
  //     /* 1.skills[0].name => skills.0.name */
  //     let reg = /\[(\d+)\]/g
  //     //match是reg匹配出的结果
  //     key = key.replace(reg, function(match, number){
  //       return '.' + number
  //     })
  //
  //     /* 2.skills.0.name  => ["skills", "0", "name"] */
  //     let keys = key.split('.')
  //
  //     /* 3.找到resume["skills"]["0"]["name"] */
  //     let result = this.resume
  //     for(let i = 0; i < keys.length; i++){
  //       if(i === keys.length-1){
  //         result[keys[i]] = value
  //       }else{
  //         result = result[keys[i]]
  //       }
  //     }
  //   },
  //   onSignOut() {
  //     AV.User.logOut()
  //     alert('注销成功')
  //     location.reload()
  //   },
  //   onSave() {
  //     var currentUser = AV.User.current()
  //     if (!currentUser) {
  //       // this.signInVisible = true
  //       this.$router.push('/signIn')
  //     }
  //     else {
  //       this.saveResume()
  //     }
  //   },
  //   saveResume() {
  //     let {id} = AV.User.current()
  //     var user = AV.Object.createWithoutData('User', id)
  //     user.set('resume', this.resume)
  //     user.save().then(() => {
  //       alert('保存成功')
  //     }, () => {
  //       alert('保存失败')
  //     })
  //   },
  //   getResume(id) {
  //     var user = new AV.Query('User')
  //     return user.get(id).then((newUser) => {
  //       Object.assign(this.resume, newUser.attributes.resume)
  //     }).catch(function(error) {
  //       alert('查询的用户的id有错误，未查询到结果');
  //     });
  //
  //   },
  //   print(){
  //     window.print()
  //   }
  // }
}

// 组件就是一个对象，上面就已经是组件了，这里是注册组件，注册完了才可以在html中使用，做路由的话其实暂时用不到
Vue.component('app', window.App)