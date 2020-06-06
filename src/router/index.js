import Vue from 'vue'
import VueRouter from 'vue-router'



// 路由懒加载
// 主目录
const Login = () => import(/* webpackChunkName: "Login" */ '../components/Login.vue')
const Home = () => import(/* webpackChunkName: "Home" */ '../components/Home.vue')
const Welcome = () => import(/* webpackChunkName: "Welcome" */ '../components/Welcome.vue')

//社团管理子目录
const ClubMember = () => import(/* webpackChunkName: "ClubMember" */ '../components/clubmanager/ClubMember.vue')
const CreateActivity = () => import(/* webpackChunkName: "CreateActivity" */ "../components/clubmanager/CreateActivity");
const EditActivity = () => import(/* webpackChunkName: "EditActivity" */ "../components/clubmanager/EditActivity");
const EditClub = () => import(/* webpackChunkName: "EditClub" */ "../components/clubmanager/EditClub");
const DismissClub = () => import(/* webpackChunkName: "DismissClub" */ "../components/clubmanager/DismissClub");

//审核模块子目录
const CheckActivity = () => import(/* webpackChunkName: "CheckActivity" */ '../components/check/CheckActivity')
const CheckClub = () => import(/* webpackChunkName: "CheckClub" */ "../components/check/CheckClub");
const ForceClubManager = () => import(/* webpackChunkName: "ForceClubManager" */ "../components/check/ForceClubManager");


const Signup = () => import(/* webpackChunkName: "Order_Report" */ '../components/user/Signup.vue')
const Recoverpwd = () => import('../components/user/Recoverpwd')


Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/welcome' },
  { path: '/login', component: Login },
  { path: '/signup', component: Signup },
  { path: '/',
    component: Home,
    // redirect: '/home',
    children: [
      { path: '/welcome', component: Welcome, meta: { title: '系统首页' }},

      { path: '/clubmember', component: ClubMember, meta: { title: '社员管理' }},
      { path: '/actapplication', component: CreateActivity, meta: { title: '创建活动' }},
      { path: '/editactivity', component: EditActivity, meta: { title: '编辑活动' }},
      { path: '/editclub', component: EditClub, meta: { title: '编辑社团' }},
      { path: '/dismissclub', component: DismissClub, meta: { title: '解散社团' }},

      { path: '/checkclub', component: CheckClub, meta: { title: '社团审核' }},
      { path: '/checkactivity', component: CheckActivity, meta: { title: '活动审核' }},
      { path: '/forceclubmanager', component: ForceClubManager, meta: { title: '强制干预社团' }},

      { path: '/recoverpwd', component: Recoverpwd, meta: { title: '修改密码' }},
      // { path: '/rank', component: Rank },
    ] }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 挂载路由导航守卫,to表示将要访问的路径，from表示从哪里来，next是下一个要做的操作 next('/login')强制跳转login
// router.beforeEach((to, from, next) => {
//   // 访问登录页，放行
//   if (to.path === '/login') return next()
//   if (to.path === '/signup') return next()
//   // 获取token
//   const tokenStr = window.sessionStorage.getItem('token')
//   // 没有token, 强制跳转到登录页
//   if (!tokenStr) return next('/login')
//   next()
// })

export default router
