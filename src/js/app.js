var app = new Vue({
  el: '#app',
  data: {
    editingName: false,
    resume: {
      name:'SeaMountCity',
      gender:'男',
      birthday: '1993-10-10',
      jobTitle: '前端工程师',
      phone: '13811111111',
      email: 'example@example.com'
    }
  },
  methods: {
    onEdit(key, value){
      console.log(key,value)
      this.resume[key] = value
    }
  }
})





































