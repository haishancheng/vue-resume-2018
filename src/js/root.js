const routes = [
  { name: '/', path: '/', component: window.App },
  { path: '/signIn', component: window.SignIn },
  { path: '/signUp', component: window.SignUp },
]
const router = new VueRouter({
  routes
})

const root = new Vue({
  router: router
}).$mount('#root')