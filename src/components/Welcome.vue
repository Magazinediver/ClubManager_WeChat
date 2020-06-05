<template>
  <div class="welcome">

    <!--  间隔大小  -->
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card shadow="hover" class="identity-card" style="height:29vh;">
          <div class="user-info">
            <img src="~assets/images/avator_1.jpeg" class="user-avator" alt />
            <div class="user-info-cont">
              <div class="user-info-name">{{name}}</div>
              <div class="user-info-identity">{{identity}}</div>
            </div>
          </div>
          <div class="create-button" @click="createClub">
            创建社团
          </div>
<!--          <div class="user-info-list">-->
<!--            上次登录时间：-->
<!--            <span>2019-11-01</span>-->
<!--          </div>-->
<!--          <div class="user-info-list">-->
<!--            上次登录地点：-->
<!--            <span>东莞</span>-->
<!--          </div>-->
        </el-card>
        <el-card shadow="hover" style="height:55vh; margin-top: 20px">
          <div slot="header" class="clearfix">
            <span>公告</span>
            <el-button style="float: right; padding: 3px 0" type="text">咨询管理员</el-button>
          </div>
          <el-table :show-header="false" :data="todoList" style="width:100%;">
            <el-table-column>
              <template slot-scope="scope">
                <div
                  class="todo-item"
                  :class="{'todo-item-del': scope.row.status}"
                >{{scope.row.title}}</div>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="18">
        <el-card shadow="hover" class="card-swiper">
          <el-carousel  type="card" height="40vh" :interval="5000" arrow="always">
            <el-carousel-item v-for="(item,index) in pic" :key="index">
<!--              <div class="img-container" style="width: 100%;height: 100%">-->
                <img style="display: block;text-align: center;margin: 0 auto;width:100%;height:100%;object-fit: fill" :src="item">
<!--              </div>-->
            </el-carousel-item>
          </el-carousel>
        </el-card>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-card class="dash-pic">
              <ClubType></ClubType>
            </el-card>
          </el-col>

          <el-col :span="12">
            <el-card class="dash-pic">
              <ActivityType></ActivityType>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

  </div>

</template>

<script>
// 1.导入echarts

import ClubType from "./pie/ClubType";
import ActivityType from "./pie/ActivityType";

export default {
  components: {ActivityType, ClubType},
  // 此时,页面上的元素,已经被渲染完毕了

  data(){
    return{
      queryInfo:{

      },
      editVisible: false,
      name: '黄驿涵',
      identity: '超级管理员',
      todoList: [
        {
          title: '社团招新活动将在6月20号举办',
        },
        {
          title: '社长请于6月13日在理四306集合开会',
        },
      ],
      pic:[
        'https://ae01.alicdn.com/kf/H06978a26753d4c07bf899f39aef2949bf.jpg',
        'https://ae01.alicdn.com/kf/H54a7061e839f4d7c9ddc5679868b89f7l.jpg',
        'https://ae01.alicdn.com/kf/H0fd06a63db814c67a6160bdd8fa1ea1ag.jpg',
        'https://ae01.alicdn.com/kf/Hefdf7d749bdd46ef8f1685f87bd72b74E.jpg',
        'https://ae01.alicdn.com/kf/H54672b9fa07e49e58b06b6c37eeb5f1fh.jpg',
        'https://ae01.alicdn.com/kf/H2fde6e4069784393b181e707710fa673b.jpg',
      ],
    }
  },
  methods:{
    handleEdit() {
      this.editVisible = true;
    },
    // 保存编辑
    saveEdit() {
      this.editVisible = false;
      this.$message.success(`社团创建申请提交成功`);
      this.getData()
    },
    async getData(){
      const { data: res } = await this.$http.get('/bilibili/query/history', {
      })
      if (res.meta.status !== 200) {
        return this.$message.error('获取搜索结果失败！')
      }
      this.historylist.daily = res.data.daily
      this.historylist.history = res.data.history
      if(res.data.history !== null){
        this.queryInfo.isSetHisNull = 'false'
      }
    },

    async createClub(){
      const { data: res } = await this.$http.get('/bilibili/query/history', {
        params: this.queryInfo
      })
      if (res.meta.status !== 200) {
        return this.$message.error('获取搜索结果失败！')
      }
      this.historylist.daily = res.data.daily
      this.historylist.history = res.data.history
      if(res.data.history !== null){
        this.queryInfo.isSetHisNull = 'false'
      }
    },
  }
}
</script>

<style>
  /*@import "../assets/stylesheets/theme.css";*/

  .welcome{
    width: 100%;
    height: 100vh;
    padding: 20px;
  }

  .identity-card{
    padding-top: 2.3vh;
    padding-left: 20px;
    padding-right: 20px;
  }

  .user-info {
    display: flex;
    align-items: center;
    padding-bottom: 2.3vh;
    border-bottom: 2px solid #ccc;
  }

  .user-avator {
    width: 13.5vh;
    height: 13.5vh;
    border-radius: 50%;
  }

  .user-info-cont {
    padding-left: 2.5vw;
    flex: 1;
    font-size: 14px;
    color: #999;
  }

  .user-info-name {
    font-size: 3.5vh;
    color: #222;
  }

  .user-info-identity{
    margin-top: 5px;
  }

  .user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
  }


  .card-swiper{
    height: 46vh;
    padding: 0;
    padding-top: 20px;
  }

  .todo-item{
    padding-left: 20px;
  }

  .dash-pic{
    width: 100%;
    height: 38vh;
    margin-top: 20px;
    padding: 20px;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  .create-button{
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
    margin-top: 2.3vh;
    margin-bottom: 2.3vh;

    display: flex;
    height: 6vh;
    width: 100%;
    border-radius: 3vh;
    background-color: #ffc609;
    color: #fff;
    align-items: center;
    justify-content: center;
    line-height: 6vh;
    font-size: 20px;
    font-weight: bold;
    letter-spacing:1px
  }

  .create-button:hover{
    background-color: #ff7700;
  }

  .create-button:active{
    border: 1px solid #fff;
    font-size: 19px;
  }

</style>
