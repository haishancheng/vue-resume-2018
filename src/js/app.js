var app = new Vue({
  el: '#app',
  data: {
    signInVisible: false,
    signUpVisible: false,
    resume: {
      name:'SeaMountCity',
      gender:'男',
      birthday: '1993-10-10',
      jobTitle: '前端工程师',
      phone: '13811111111',
      email: 'example@example.com'
    },
    signUpData:{
      email:'',
      password: ''
    },
    signInData:{
      email:'',
      password: ''
    }
  },
  methods: {
    onEdit(key, value){
      this.resume[key] = value
    },
    signUp(){
      let user = new AV.User();
      user.setUsername(this.signUpData.email);
      user.setPassword(this.signUpData.password);
      user.setEmail(this.signUpData.email)
      user.signUp().then((loggedInUser)=> {
      }, function (error) {
      })
    },
    signIn(){
      AV.User.logIn(this.signInData.email, this.signInData.password).then(function (loggedInUser) {
      }, function (error) {
        if(error.code === 211) {
          alert('邮箱不存在')
        } else if(error.code == 210) {
          alert('邮箱和密码不破配')
        }
      })
    },
    signOut(){
      AV.User.logOut()
    },
    save(){
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
      var user = AV.Object.createWithoutData('User', id);
      user.set('resume', this.resume);
      user.save();
    }
  }
})






























































