window.SignIn = {
  template: `
    <div class="signIn" v-cloak>
      <form @submit.prevent="onSignIn">
        <h2>简历编辑器</h2>
        <p>New jobs, new lives</p>
        <router-link class="close" to="/">x</router-link>
        <div class="row">
          <label>邮箱</label>
          <input placeholder="example@example.com" type="text" v-model="signInData.email" autocomplete="on">
        </div>
        <div class="row">
          <label>密码</label>
          <input placeholder="Enter password" type="password" v-model="signInData.password" autocomplete="on">
        </div>
        <div class="actions">
          <button type="submit">登录</button>
          <p>We'll never share your email with anyone else.</p>
        </div>
      </form>
      <div class="toSignUp">
        还没有账户？
        <router-link to="/signUp">注册</router-link>
      </div>
      <transition name="bounce">
        <prompt v-show="promptVisible" v-bind:prompt="prompt" @close-prompt="promptVisible = false"></prompt>
      </transition>
    </div>
  `,
  data: function () {
    return {
      signInData: {
        email: '',
        password: ''
      },
      prompt: {
        icon: '',
        info: '',
      },
      promptVisible: false,
    }
  },
  methods: {
    onSignIn() {
      if(!this.check()){return}
      AV.User.logIn(this.signInData.email, this.signInData.password).then((loggedInUser) => {
        this.$router.push({name:'/', params:{message: 'signInSuccess', email:this.signInData.email, password:this.signInData.password}})
      }, (error) => {
        if (error.code === 211) {
          this.showPrompt('✘', '邮箱不存在！')
        } else if (error.code == 210) {
          this.showPrompt('✘', '密码错误！')
        }
      })
    },
    check(){
      if(this.signInData.email === ''){
        this.showPrompt('!', '请填写邮箱！', )
        return false
      } else if(this.signInData.password === ''){
        this.showPrompt('!', '请填写密码！')
        return false
      }
      return true
    },
    showPrompt(icon, info){
      this.prompt.icon = icon
      this.prompt.info = info
      this.promptVisible = true
    }
  }
}

// html规范，标签不能有大写，因此写成sign-in
Vue.component('signIn', window.signIn)