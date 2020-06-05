<template>
  <div class="sidebar">
<!--  element ui侧边栏菜单区域  -->
    <el-menu
      :collapse="collapse"
      :default-active="onRoutes"
      active-text-color="#fff"

      class="sidebar-el-menu"
      router

      unique-opened
    >

      <template v-for="item in items">
        <!--如果有二级菜单-->
        <template v-if="item.subs">
          <!--有二级菜单情况下,一级菜单-->
          <el-submenu :index="item.index" :key="item.index">
            <!--一级菜单模块-->
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </template>
            <!--二级菜单外部包裹-->
            <template v-for="subItem in item.subs">
              <!--二级菜单-->
              <el-menu-item
                :index="subItem.index"
                :key="subItem.index"
              >
                <!--二级菜单模块-->
                {{ subItem.title }}
              </el-menu-item>
            </template>
          </el-submenu>
        </template>

        <!--如果没有二级菜单-->
        <template v-else>
          <!--没有二级菜单情况下,一级菜单模块-->
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
  import bus from '../../assets/javascript/bus.js';

  export default {
    data() {
      return {
        collapse: false,
        items: [
          {
            icon: 'el-icon-house',
            index: 'welcome',
            title: '首页'
          },
          {
            icon: 'el-icon-tickets',
            index: 'clubmanager',
            title: '社团管理',
            subs: [
              {
                icon: 'el-icon-user',
                index: 'clubmember',
                title: '社员管理'
              },
              {
                icon: 'el-icon-setting',
                index: 'actapplication',
                title: '活动申请'
              },
              {
                icon: 'el-icon-user',
                index: 'editactivity',
                title: '编辑活动'
              },
              {
                icon: 'el-icon-setting',
                index: 'editclub',
                title: '编辑社团'
              }
            ]
          },
          {
            icon: 'el-icon-user-solid',
            index: 'check',
            title: '审核模块',
            subs: [
              {
                icon: 'el-icon-user',
                index: 'checkclub',
                title: '社团审核'
              },
              {
                icon: 'el-icon-setting',
                index: 'checkactivity',
                title: '活动审核'
              },
              {
                icon: 'el-icon-user',
                index: 'forceclubmanager',
                title: '强制干预社团'
              },
            ]
          },
          {
            icon: 'el-icon-s-tools',
            index: 'usermanager',
            title: '用户管理',
            subs: [
              {
                icon: 'el-icon-user',
                index: 'signup',
                title: '注册新用户'
              },
              {
                icon: 'el-icon-setting',
                index: 'recoverpwd',
                title: '修改密码'
              },
            ]
          },
        ]
      };
    },
    computed: {
      onRoutes() {
        return this.$route.path.replace('/', '');
      }
    },
    created() {
      // 通过 Event Bus 进行组件间通信，来折叠侧边栏
      bus.$on('collapse', msg => {
        this.collapse = msg;
        bus.$emit('collapse-content', msg);
      });
    },

  };
</script>

<style scoped>
  .sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 60px;
    bottom: 0;


  }

  .sidebar::-webkit-scrollbar {
    width: 0;
  }

  .sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
  }

  .sidebar > ul {
    height: 100%;
  }


</style>
