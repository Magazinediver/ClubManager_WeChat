<template>
  <el-container>
    <!-- 头部 -->
    <el-header>
      <v-header></v-header>
    </el-header>

    <!-- 主体 -->
    <el-container>
      <!-- 侧边栏 -->
      <v-sidebar></v-sidebar>
      <!-- 内容主体 -->
      <el-main class="content-box" :class="{'content-collapse':collapse}" style="padding: 0px;">
        <router-view></router-view>
      </el-main>


    </el-container>

  </el-container>
</template>

<script>
  import vSidebar from './sidebar/Sidebar.vue';
  import vHeader from './header/Header'
  import bus from '../assets/javascript/bus.js';
export default {
  components:{
    vSidebar,
    vHeader
  },
  data () {
    return {
      // 默认不折叠
      collapse: false,
      // 被激活导航地址
    }
  },
  computed: {

  },
  created () {
    bus.$on('collapse-content', msg => {
      this.collapse = msg;
    });
  },
  methods: {
  }
}
</script>



<style lang="less" scoped>

  .el-scrollbar__wrap
  {
    overflow-x:hidden;
    overflow-y:hidden;
  }


.el-container {
  height: 100%;
}

.el-header{
  height: 56px!important;
  padding: 0;
}

.el-aside {
  background-color: #333744;

  .el-menu {
    border: none;
  }
}
.el-main {
  background-color: #fff;
}
.iconfont{
  margin-right: 10px;
}
.toggle-button {
  height: 50px;
  margin-left: 20px;
  font-size: 18px;
  line-height: 50px;
  color: #787878;
  text-align: center;
  letter-spacing: 0.2em;
  // 鼠标放上去变成小手
  cursor: pointer;
}




</style>
