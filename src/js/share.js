Vue.component('share', {
  //html规范，属性不能有大写，因此写成share-link
  props: ['shareLink'],
  template: `
    <div class="share" v-cloak>
      <h2>请复制下列连接进行分享</h2>
      <textarea readonly>{{shareLink}}</textarea>
      <button @click="$emit('close-share')">close</button>
    </div>
  `
})