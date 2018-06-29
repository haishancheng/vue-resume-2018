Vue.component('signUp',{
  template: `
    <div class="signUp">
      <form @submit.prevent="onSignUp" v-cloak>
        <h2>注册</h2>
        <button type="button" @click="signUpVisible=false;">关闭</button>
        <div class="row">
          <label>邮箱</label>
          <input type="text" v-model="signUpData.email" autocomplete="on">
        </div>
        <div class="row">
          <label>密码</label>
          <input type="password" v-model="signUpData.password" autocomplete="on">
        </div>
        <div class="actions">
          <button type="submit">提交</button>
          <a href="#" @click="$emit('to-sign-in')">登录</a>
        </div>
      </form>
    </div>
  `,
  data: function () {
    return {
      signUpData: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
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
    }
  }
})