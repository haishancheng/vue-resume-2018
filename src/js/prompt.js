Vue.component('prompt', {
  props: ['prompt'],
  template: `
    <div class="promptCover" @click="$emit('close-prompt')" v-cloak>
      <div class="prompt" @click.stop>
        <span class="icon" v-bind:class="classObject">{{prompt.icon}}</span>
        <p class="title">{{prompt.title}}</p>
        <p class="info">{{prompt.info}}</p>
        <button @click="$emit('close-prompt')">OK</button>
      </div>
    </div>
  `,
  computed: {
    classObject: function () {
      return {
        exclamation: this.prompt.icon === '!',
        hook: this.prompt.icon === '√',
        cross: this.prompt.icon === '✘',
      }
    }
  }
})