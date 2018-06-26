Vue.component('editable-span', {
  props: ['value'],
  template: `
      <span class="editableSpan">
        <span v-show="!editing">{{value}}</span>
        <input type="text" v-show="editing" v-model="value" @input="triggerEdit">
        <button v-on:click="editing = !editing">edit</button>
      </span>
    `,
  data: function () {
    return {
      editing: false
    }
  },
  methods: {
    triggerEdit(e){
      this.$emit('edit', e.target.value)
    }
  }
})



































