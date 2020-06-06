<template>
  <div class="header-top">
    <div class="head_container">
      <div style="padding-left: 20px;padding-top: 4px" @click="collapseChage">
        <i style="margin-top: 3px" v-if="!collapse" class="el-icon-s-fold"></i>
        <i style="margin-top: 3px"  v-else class="el-icon-s-unfold"></i>
        <img class="top_logo" src="../../assets/images/logo.png" alt />
      </div>

      <div class="header-right">
        <div class="header-user-con">
          <!-- 全屏显示 -->
          <div class="btn-fullscreen" @click="handleFullScreen">
            <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
              <i style="margin-top: 2px" class="el-icon-rank"></i>
            </el-tooltip>
          </div>
          <!-- 用户头像 -->
          <div class="user-avator">
            <img src="../../assets/images/avator_1.jpeg" />
          </div>
          <!-- 用户名下拉菜单 -->
          <el-dropdown class="user-name" trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          {{username}}
          <i class="el-icon-caret-bottom"></i>
        </span>
            <el-dropdown-menu slot="dropdown">
              <a style="text-decoration: none" href="https://github.com/Magazinediver/bilibilisearch.git" target="_blank">
                <el-dropdown-item>项目仓库</el-dropdown-item>
              </a>
              <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>

      </div>

    </div>
    <div class="header-line"></div>
  </div>

</template>

<script>
  import bus from '../../assets/javascript/bus.js';
  export default {
    name: "Header",
    created() {
      this.username = this.$store.state.name
    },
    data(){
      return{
        username: '',
        fullscreen: false,
        collapse: false,
      }
    },
    methods:{
      // 菜单的折叠与展开
      collapseChage() {
        this.collapse = !this.collapse;
        bus.$emit('collapse', this.collapse);
      },
      handleCommand(command) {
        if (command == 'logout') {
          window.sessionStorage.clear()
          this.$router.push('/login');
        }
      },
      handleFullScreen() {
        let element = document.documentElement;
        if (this.fullscreen) {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
          }
        } else {
          if (element.requestFullscreen) {
            element.requestFullscreen();
          } else if (element.webkitRequestFullScreen) {
            element.webkitRequestFullScreen();
          } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
          } else if (element.msRequestFullscreen) {
            // IE11
            element.msRequestFullscreen();
          }
        }
        this.fullscreen = !this.fullscreen;
      },
      logout () {
        // 清空token
        window.sessionStorage.clear()
        this.$router.push('/login')
      },
    },
    mounted() {
      if (document.body.clientWidth < 1500) {
        this.collapseChage();
      }
    }
  }
</script>

<style scoped>
  .header-top{
    width: 100%;
  }

  .head_container {
    width: 100%;
    height: 56px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    color: #ff7700;
    font-size: 20px;

  }

  .header-line{
    position: absolute;
    top: 56px;
    left: 0;
    width: 100%;
    height: 4px;
    background-image: linear-gradient(to right, #ffc609 , #ff7700);
  }

  div {
    display: flex;
    align-items: center;
  }

  img {
    height: 40px;
  }

  span {
    margin-left: 15px;
  }

  .user-name {
    margin-left: 10px;
    margin-top: 8px;
  }
  .user-avator {
    margin-top: 6px;
    margin-left: 20px;
  }
  .user-avator img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .el-dropdown-link {
    color: #111111;
    cursor: pointer;
  }
  .el-dropdown-menu__item {
    text-align: center;
  }

  .top_logo{
    position: relative;
    float: left;
    margin-left: 10px;
  }

  .header-right {
    float: right;
    padding-right: 50px;
  }
  .header-user-con {
    display: flex;
    height: 70px;
    align-items: center;
  }

  .btn-fullscreen {
    transform: rotate(45deg);
    margin-right: 5px;
    font-size: 24px;
  }

  .btn-fullscreen {
    position: relative;
    width: 30px;
    height: 30px;
    text-align: center;
    margin-top: 8px;
    border-radius: 15px;
    cursor: pointer;
  }


</style>
