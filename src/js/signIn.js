window.signIn = {
  template: `
    <div class="signIn" v-cloak>
      <form @submit.prevent="onSignIn">
        <h2>登录</h2>
        <!--<button type="button" @click="$emit('close-sign-in')">关闭</button>-->
        <router-link to="/">关闭</router-link>
        <div class="row">
          <label>邮箱</label>
          <input type="text" v-model="signInData.email" autocomplete="on">
        </div>
        <div class="row">
          <label>密码</label>
          <input type="password" v-model="signInData.password" autocomplete="on">
        </div>
        <div class="actions">
          <button type="submit">提交</button>
          <!--<a href="#" @click="$emit('to-sign-up')">注册</a>-->
          <router-link to="/signUp">注册</router-link>
        </div>
      </form>
    </div>
  `,
  data: function () {
    return {
      signInData: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    onSignIn() {
      AV.User.logIn(this.signInData.email, this.signInData.password).then((loggedInUser) => {
        // this.signInVisible = false
        this.$emit('close-sign-in')
        // this.getResume(loggedInUser.id)
        this.$emit('get-resume', loggedInUser.id)
      }, (error) => {
        if (error.code === 211) {
          alert('邮箱不存在')
        } else if (error.code == 210) {
          alert('邮箱和密码不破配')
        }
      })
    }
  }
}

// html规范，标签不能有大写，因此写成sign-in
Vue.component('signIn', window.signIn
)