import Vuex from 'vuex'
import Vue from "vue";

//1.安装插件
Vue.use(Vuex)

const store = new Vuex.Store({
  state:{
    //数据,state中的数据是响应式的(一开始就初始化好的,如果一开始没有定义属性，没有加入到响应式系统，就不会是响应式的)
    query : '',
    name : '黄驿涵',
    id : '31701074'
  },
  mutations:{
    //方法,不建议在里面进行异步操作，用action进行替代

  },
  actions:{
    //context： 上下文
    //action也能传递参数
    //法一
    //异步修改只能在actions里调用mutations
  },
  getters:{
    //类似于计算属性
  },
  modules:{

  }
})

//3.导出store对象
export default store
