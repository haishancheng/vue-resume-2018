Vue.component('skinPicker', {
  template: `
    <div class="skinPicker" v-cloak>
      <button @click="setTheme('default')">default</button>
      <button @click="setTheme('dark')">dark</button>
      <button @click="$emit('close-skin-picker')">close</button>
    </div>
  `,
  setTheme(name){
    document.body.className = name
  }
})