Vue.component('app-header',{
  props:['isLoginIn'],
  template: `
    <header class="clearfix" v-bind:class="{deActive:!isActive}">
      <h1>简历编辑器</h1>
      <button v-show="isLoginIn" class="navButton" @click="$emit('on-edit')">编辑</button>
      <button v-show="isLoginIn" class="navButton" @click="$emit('on-save')">保存</button>
      <button v-show="isLoginIn" class="navButton" @click="$emit('on-print')">打印</button>
      <button v-show="isLoginIn" class="navButton" @click="$emit('on-share')">分享</button>
      <button v-show="isLoginIn" class="navButton" @click="$emit('on-change-skin')">换肤</button>
      <button v-show="isLoginIn" class="loginOut" v-show="isLoginIn" @click="$emit('login-out')" v-cloak>登出</button>
      <router-link class="loginIn" v-show="!isLoginIn"  to="/signIn">登录</router-link>
      <i class="iconfont icon-list" @click="isActive=!isActive"></i>
    </header>
  `,
  data(){
    return {
      isActive: false
    }
  }
})