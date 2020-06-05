<template>
  <el-container class="container-main">
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
        <v-tags></v-tags>
        <div class="content">
          <transition name="move" mode="out-in">
            <keep-alive :include="tagsList">
              <router-view></router-view>
            </keep-alive>
          </transition>
          <el-backtop target=".content"></el-backtop>
        </div>
      </el-main>


    </el-container>

  </el-container>
</template>

<script>
  import vSidebar from './sidebar/Sidebar.vue';
  import vHeader from './header/Header'
  import bus from '../assets/javascript/bus.js';
  import vTags from "./Tags";
export default {
  components:{
    vSidebar,
    vHeader,
    vTags
  },
  data () {
    return {
      // 默认不折叠
      collapse: false,
      // 被激活导航地址
      tagsList: [],
    }
  },
  computed: {

  },
  created () {
    bus.$on('collapse-content', msg => {
      this.collapse = msg;
    });

    // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
    bus.$on('tags', msg => {
      let arr = [];
      for (let i = 0, len = msg.length; i < len; i++) {
        msg[i].name && arr.push(msg[i].name);
      }
      this.tagsList = arr;
    });
  },
  methods: {
  }
}
</script>



<style lang="less" scoped>
  .container-main{
    overflow: hidden;
  }

  .content-box{
    overflow: hidden;
  }

  .content{
    padding: 0;
    overflow: scroll;
  }

.el-container {
  height: 100%;
}

.el-header{
  height: 60px!important;
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
