const routes = [
  { path: '/', component: window.App },
  { path: '/signIn', component: window.signIn },
  { path: '/signUp', component: window.signUp },
]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
})

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
const app = new Vue({
  router
}).$mount('#root')












// var app = new Vue({
//   el: '#app',
//   data: {
//     signInVisible: false,
//     signUpVisible: false,
//     shareVisible: false,
//     skinPickerVisible: false,
//     resume: {
//       name: '开始模板',
//       gender: '开始模板',
//       birthday: '开始模板',
//       jobTitle: '开始模板',
//       phone: '开始模板',
//       email: '开始模板',
//       skills: [
//         {name: '请填写技能名称', description: '请填写技能描述'},
//         {name: '请填写技能名称', description: '请填写技能描述'},
//       ],
//       projects: [
//         {name: '请填写项目名称', link: 'http://...', keywords: '请填写关键词', description: '请填写项目描述'},
//         {name: '请填写项目名称', link: 'http://...', keywords: '请填写关键词', description: '请填写项目描述'},
//       ]
//     },
//     shareLink: '不知道',
//     isShareMode: false,
//   },
//   watch: {
//     // 'resume.phone': function(newValue, oldValue){
//     //   console.log('oldValue',oldValue)
//     //   console.log('newValue',newValue)
//     // }
//   },
//   methods: {
//     onEdit(key, value) {
//       /* 解析key => skills[0].name*/
//
//       /* 1.skills[0].name => skills.0.name */
//       let reg = /\[(\d+)\]/g
//       //match是reg匹配出的结果
//       key = key.replace(reg, function(match, number){
//         return '.' + number
//       })
//
//       /* 2.skills.0.name  => ["skills", "0", "name"] */
//       let keys = key.split('.')
//
//       /* 3.找到resume["skills"]["0"]["name"] */
//       let result = this.resume
//       for(let i = 0; i < keys.length; i++){
//         if(i === keys.length-1){
//           result[keys[i]] = value
//         }else{
//           result = result[keys[i]]
//         }
//       }
//     },
//     onSignOut() {
//       AV.User.logOut()
//       alert('注销成功')
//       location.reload()
//     },
//     onSave() {
//       var currentUser = AV.User.current()
//       if (!currentUser) {
//         this.signInVisible = true
//       }
//       else {
//         this.saveResume()
//       }
//     },
//     saveResume() {
//       let {id} = AV.User.current()
//       var user = AV.Object.createWithoutData('User', id)
//       user.set('resume', this.resume)
//       user.save().then(() => {
//         alert('保存成功')
//       }, () => {
//         alert('保存失败')
//       })
//     },
//     getResume(id) {
//       var user = new AV.Query('User')
//       return user.get(id).then((newUser) => {
//         Object.assign(this.resume, newUser.attributes.resume)
//       }).catch(function(error) {
//         alert('查询的用户的id有错误，未查询到结果');
//       });
//
//     },
//     print(){
//       window.print()
//     }
//   }
// })
//
//
//
//
// let search = location.href
// let regex = /user_id=([^&]+)/
// let matches = search.match(regex)
// if(matches){
//   app.isShareMode = true
//   app.getResume(matches[1]).then(()=>{console.log(3)},(error)=>{console.log(4)})
// }else{
//   app.isShareMode = false
//   /* ☆☆☆☆☆☆
//  * 1.toJSON用法：
//  *   var obj = {name: '1', toJSON: function(){return {hello: 'hello'}}}
//  *   JSON.stringify(obj) ===> "{"hello":"hello"}"
//  * 2.VUE会和JSON.stringify一样返回toJSON中的值，所以在html中{{AV.User.current()}}会和console.log(AV.User.current())
//  *   显示的不一样，html中的{{AV.User.current()}}只会显示toJSON中返回的属性，比如它显示的是ObjectId，而console.log(AV.User.current())中显示的是id
//  */
// // {{AV.User.current()}} 和console.log(AV.User.current())显示的不一样
//
//   if (AV.User.current()) {
//     app.getResume(AV.User.current().id)
//     //不需要app.methods.getResume，Vue会自动复制一份到上层
//     app.shareLink = location.origin + location.pathname + '?user_id=' + AV.User.current().id
//   }
//
// }
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
