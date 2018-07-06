window.SignUp = {
  template: `
    <div class="signUp">
      <form @submit.prevent="onSignUp" v-cloak>
        <h2>简历编辑器</h2>
        <p>New jobs, new lives</p>
        <router-link class="close" to="/">x</router-link>
        <div class="row">
          <label>邮箱</label>
          <input placeholder="example@example.com" type="text" v-model="signUpData.email" autocomplete="on">
        </div>
        <div class="row">
          <label>密码</label>
          <input placeholder="Enter password" type="password" v-model="signUpData.password" autocomplete="on">
        </div>
        <div class="row">
          <label>确认密码</label>
          <input placeholder="Confirm your password" type="password" v-model="signUpData.confirm" autocomplete="on">
        </div>
        <div class="actions">
          <button type="submit">注册</button>
          <p>Please remember your account and password, this site does not support the recovery.</p>
        </div>
      </form>
      <div class="toSignUp">
        已经有账户了？
        <router-link to="/signIn">登录</router-link>
      </div>
      <transition name="bounce">
        <prompt v-show="promptVisible" v-bind:prompt="prompt" @close-prompt="promptVisible = false"></prompt>
      </transition>
    </div>
  `,
  data: function () {
    return {
      promptVisible: false,
      signUpData: {
        email: '',
        password: '',
        confirm: ''
      },
      prompt: {
        icon: '',
        info: '',
      },
    }
  },
  methods: {
    onSignUp() {
      if(!this.check()){return}
      let user = new AV.User()
      user.setUsername(this.signUpData.email)
      user.setPassword(this.signUpData.password)
      user.setEmail(this.signUpData.email)
      user.signUp().then((loggedInUser) => {
        this.$router.push({name:'/', params:{message: 'signUpSuccess', email: this.signUpData.email, password: this.signUpData.password}})

        // this.$router.push({name:'/', params:{message:'signUpSuccess',userID:loggedInUser.id}})
      }, (error) => {
        if (error.code === 125) {
          this.showPrompt('!', '请输入正确的邮箱地址！')
        } else if(error.code === 203) {
          this.showPrompt('✘', '此电子邮箱已经被占用！', )
        }
      })
    },
    check(){
      if(this.signUpData.email === ''){
        this.showPrompt('!', '邮箱不能为空！', )
        return false
      } else if(this.signUpData.password === ''){
        this.showPrompt('!', '密码不能为空！')
        return false
      }  else if(this.signUpData.confirm === '') {
        this.showPrompt('!', '请确认密码！')
        return false
      } else if(this.signUpData.password !== this.signUpData.confirm){
        this.showPrompt('!', '请确保两次输入的密码一致！')
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
Vue.component('signUp', window.signUp)