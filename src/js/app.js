window.App = {
  template: `
    <div>
      <app-aside v-show="!isShareMode" @on-save="onSave" @on-sign-out="onSignOut" @on-share="shareVisible=true" @on-print="print" @on-change-skin="skinPickerVisible=true"></app-aside>
      <main>
        <resume v-bind:resume="resume"></resume>
      </main>
    </div>
  `,
  data(){
    return {
      signInVisible: false,
      signUpVisible: false,
      shareVisible: false,
      skinPickerVisible: false,
      resume: {
        name: '开始模板',
        gender: '开始模板',
        birthday: '开始模板',
        jobTitle: '开始模板',
        phone: '开始模板',
        email: '开始模板',
        skills: [
          {name: '请填写技能名称', description: '请填写技能描述'},
          {name: '请填写技能名称', description: '请填写技能描述'},
        ],
        projects: [
          {name: '请填写项目名称', link: 'http://...', keywords: '请填写关键词', description: '请填写项目描述'},
          {name: '请填写项目名称', link: 'http://...', keywords: '请填写关键词', description: '请填写项目描述'},
        ]
      },
      shareLink: '不知道',
      isShareMode: false,
    }
  },
  methods: {
    onEdit(key, value) {
      /* 解析key => skills[0].name*/

      /* 1.skills[0].name => skills.0.name */
      let reg = /\[(\d+)\]/g
      //match是reg匹配出的结果
      key = key.replace(reg, function(match, number){
        return '.' + number
      })

      /* 2.skills.0.name  => ["skills", "0", "name"] */
      let keys = key.split('.')

      /* 3.找到resume["skills"]["0"]["name"] */
      let result = this.resume
      for(let i = 0; i < keys.length; i++){
        if(i === keys.length-1){
          result[keys[i]] = value
        }else{
          result = result[keys[i]]
        }
      }
    },
    onSignOut() {
      AV.User.logOut()
      alert('注销成功')
      location.reload()
    },
    onSave() {
      var currentUser = AV.User.current()
      if (!currentUser) {
        // this.signInVisible = true
        this.$router.push('/signIn')
      }
      else {
        this.saveResume()
      }
    },
    saveResume() {
      let {id} = AV.User.current()
      var user = AV.Object.createWithoutData('User', id)
      user.set('resume', this.resume)
      user.save().then(() => {
        alert('保存成功')
      }, () => {
        alert('保存失败')
      })
    },
    getResume(id) {
      var user = new AV.Query('User')
      return user.get(id).then((newUser) => {
        Object.assign(this.resume, newUser.attributes.resume)
      }).catch(function(error) {
        alert('查询的用户的id有错误，未查询到结果');
      });

    },
    print(){
      window.print()
    }
  }
}

// 组件就是一个对象，上面就已经是组件了，这里是注册组件，注册完了才可以在html中使用，做路由的话其实暂时用不到
Vue.component('app', window.App)