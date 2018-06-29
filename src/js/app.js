var app = new Vue({
  el: '#app',
  data: {
    signInVisible: false,
    signUpVisible: false,
    shareVisible: false,
    skinPickerVisible: false,
    resume: {
      name: '开始模板',
      gender: '开始模板',
      birthday: '开始模板',
      jobTitle: '开始模板',
      phone: '开始模板',
      email: '开始模板',
      skills: [
        {name: '请填写技能名称', description: '请填写技能描述'},
        {name: '请填写技能名称', description: '请填写技能描述'},
      ],
      projects: [
        {name: '请填写项目名称', link: 'http://...', keywords: '请填写关键词', description: '请填写项目描述'},
        {name: '请填写项目名称', link: 'http://...', keywords: '请填写关键词', description: '请填写项目描述'},
      ]
    },
    shareLink: '不知道',
    isShareMode: false,
  },
  watch: {
    // 'resume.phone': function(newValue, oldValue){
    //   console.log('oldValue',oldValue)
    //   console.log('newValue',newValue)
    // }
  },
  methods: {
    onEdit(key, value) {
      /* 解析key => skills[0].name*/

      /* 1.skills[0].name => skills.0.name */
      let reg = /\[(\d+)\]/g
      //match是reg匹配出的结果
      key = key.replace(reg, function(match, number){
        return '.' + number
      })

      /* 2.skills.0.name  => ["skills", "0", "name"] */
      let keys = key.split('.')

      /* 3.找到resume["skills"]["0"]["name"] */
      let result = this.resume
      for(let i = 0; i < keys.length; i++){
        if(i === keys.length-1){
          result[keys[i]] = value
        }else{
          result = result[keys[i]]
        }
      }
    },
    onSignOut() {
      AV.User.logOut()
      alert('注销成功')
      location.reload()
    },
    onSave() {
      var currentUser = AV.User.current()
      if (!currentUser) {
        this.signInVisible = true
      }
      else {
        this.saveResume()
      }
    },
    saveResume() {
      let {id} = AV.User.current()
      var user = AV.Object.createWithoutData('User', id)
      user.set('resume', this.resume)
      user.save().then(() => {
        alert('保存成功')
      }, () => {
        alert('保存失败')
      })
    },
    getResume(id) {
      var user = new AV.Query('User')
      return user.get(id).then((newUser) => {
        Object.assign(this.resume, newUser.attributes.resume)
      }).catch(function(error) {
        alert('查询的用户的id有错误，未查询到结果');
      });

    },
    addSkill(){
      this.resume.skills.push({name: '请填写技能名称', description: '请填写技能描述'})
    },
    removeSkill(index){
      this.resume.skills.splice(index, 1)
    },
    addProject(){
      this.resume.projects.push({name: '请填写项目名称', link: 'http://...', keywords: '请填写关键词', description: '请填写项目描述'})
    },
    removeProject(index){
      this.resume.projects.splice(index, 1)
    },
    print(){
      window.print()
    }
  }
})




let search = location.href
let regex = /user_id=([^&]+)/
let matches = search.match(regex)
if(matches){
  app.isShareMode = true
  app.getResume(matches[1]).then(()=>{console.log(3)},(error)=>{console.log(4)})
}else{
  app.isShareMode = false
  /* ☆☆☆☆☆☆
 * 1.toJSON用法：
 *   var obj = {name: '1', toJSON: function(){return {hello: 'hello'}}}
 *   JSON.stringify(obj) ===> "{"hello":"hello"}"
 * 2.VUE会和JSON.stringify一样返回toJSON中的值，所以在html中{{AV.User.current()}}会和console.log(AV.User.current())
 *   显示的不一样，html中的{{AV.User.current()}}只会显示toJSON中返回的属性，比如它显示的是ObjectId，而console.log(AV.User.current())中显示的是id
 */
// console.log(AV.User.current())

  if (AV.User.current()) {
    app.getResume(AV.User.current().id)
    //不需要app.methods.getResume，Vue会自动复制一份到上层
    app.shareLink = location.origin + location.pathname + '?user_id=' + AV.User.current().id
  }

}






























































