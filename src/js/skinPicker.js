Vue.component('skin-picker', {
  template: `
    <div class="skinPickerCover" @click="$emit('close-skin-picker')" v-cloak>
      <div class="skinPicker" @click.stop>
        <h2>请选择一种主题</h2>
        <div class="theme">
          <button class="default" @click="setTheme('default')">default</button>
          <button class="orange" @click="setTheme('orange')">orange</button>
        </div>
        <p>更多主题,敬请期待!</p>
        <button class="close" @click="$emit('close-skin-picker')">close</button>
      </div>
    </div>
  `,
  methods: {
    setTheme(name){
      this.$emit('close-skin-picker')
      this.$emit('set-theme', name)
    }
  }
})