var app = new Vue({
  el: '#app',
  data: {
    signInVisible: false,
    signUpVisible: false,
    resume: {
      name: '开始模板',
      gender: '开始模板',
      birthday: '开始模板',
      jobTitle: '开始模板',
      phone: '开始模板',
      email: '开始模板'
    },
    signUpData: {
      email: '',
      password: ''
    },
    signInData: {
      email: '',
      password: ''
    }
  },
  methods: {
    onEdit(key, value) {
      this.resume[key] = value
    },
    onSignUp() {
      let user = new AV.User()
      user.setUsername(this.signUpData.email)
      user.setPassword(this.signUpData.password)
      user.setEmail(this.signUpData.email)
      user.signUp().then((loggedInUser) => {
        this.signUpVisible = false
        alert('注册成功')
        this.getResume(loggedInUser.id)
      }, function (error) {
        alert(error.rawMessage)
        // if (error.code === 125) {
        //   alert('请输入正确的邮箱地址')
        // }
      })
    },
    onSignIn() {
      AV.User.logIn(this.signInData.email, this.signInData.password).then((loggedInUser) => {
        this.signInVisible = false
        this.getResume(loggedInUser.id)
      }, (error) => {
        if (error.code === 211) {
          alert('邮箱不存在')
        } else if (error.code == 210) {
          alert('邮箱和密码不破配')
        }
      })
    },
    onSignOut() {
      AV.User.logOut()
      alert('注销成功')
      this.resume = {name: '注销成功', gender: '注销成功', birthday: '注销成功', jobTitle: '注销成功', phone: '注销成功', email: '注销成功'}
    },
    onSave() {
      var currentUser = AV.User.current()
      if (!currentUser) {
        this.signInVisible = true
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
      user.get(id).then((newUser) => {
        this.resume = newUser.attributes.resume || {name: '姓名', gender: '性别', birthday: '出生年月', jobTitle: '职位', phone: '电话', email: '邮箱'}
      }, (error) => {
      })
    }
  }
})
/* ☆☆☆☆☆☆
 * 1.toJSON用法：
 *   var obj = {name: '1', toJSON: function(){return {hello: 'hello'}}}
 *   JSON.stringify(obj) ===> "{"hello":"hello"}"
 * 2.VUE会和JSON.stringify一样返回toJSON中的值，所以在html中{{AV.User.current()}}会和console.log(AV.User.current())
 *   显示的不一样，html中的{{AV.User.current()}}只会显示toJSON中返回的属性，比如它显示的是ObjectId，而console.log(AV.User.current())中显示的是id
 */
console.log(AV.User.current())
if (AV.User.current()) {
  //不需要app.methods.getResume，Vue会自动复制一份到上层
  app.getResume(AV.User.current().id)
}






























































