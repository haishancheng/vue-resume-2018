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
    }
  },
  methods: {
    onEdit(key, value){
      this.resume[key] = value
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
    saveResume(){

    }
  }
})






























































