Vue.component('app-aside',{
  template: `
    <aside v-cloak>
      <div class="upper">
        <button @click="$emit('on-save')">保存</button>
        <button @click="$emit('on-share')">分享</button>
        <button @click="$emit('on-print')">打印</button>
        <button @click="$emit('on-change-skin')">换肤</button>
      </div>
      <div class="down">
        <button @click="$emit('on-sign-out')" v-show="AV.User.current()" v-cloak>登出</button>
      </div>
    </aside>
  `
})