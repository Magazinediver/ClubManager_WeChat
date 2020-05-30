<template>
  <div class="welcome">
    <div class="sec_bar">
        <header class="page-header">
          <h2>首页</h2>

          <div style="margin-right: 40px" class="right-wrapper pull-right">
            <ol class="breadcrumbs">
              <li>
              <span @click="aclick()">
                <i class="fa fa-home"></i>
              </span>
              </li>
              <li><span>首页</span></li>
            </ol>

            <a class="sidebar-right-toggle" ></a>
          </div>
        </header>
    </div>
    <!-- 2.为Echarts准备一个Dom -->
    <div id="content-body-index">
      <div id="bilibili_2233">
        <img class="pic" src="~assets/images/bilibili_2233.png" >
      </div>
      <div id="bilibili_search">
        <div style="margin-top: 15px;">
          <el-input placeholder="请输入想搜索的内容" v-model="queryInfo.query" class="input-with-select" @keyup.enter.native="searchbtnclick">
            <el-select v-model="select" slot="prepend" class="search-select" placeholder="">
              <el-option label="综合搜索" value="1"></el-option>
              <el-option label="视频搜索" value="2"></el-option>
              <el-option label="up主搜索" value="3"></el-option>
            </el-select>
            <el-button slot="append" @click="searchbtnclick()" icon="el-icon-search" class="home-search-button allsearch-button">
            搜索
            </el-button>
          </el-input>
        </div>

      </div>

      <div class="index-suggest">
        <div class="home-suggest">
          <div class="hot-search">
            <div class="title"><i class="title-icon hot"></i>热门搜索<span class="subtitle">Daily Hot</span></div>
            <ul class="hotlist">
              <li class="item" v-for="(item,index) in historylist.daily.slice(0,3)"  :key="index+'1'">
                <span class="num special">{{index+1}}</span>
                <span @click="goallsearch($event)" class="word">{{item}}</span>
              </li>
              <li class="item" v-for="(item,index) in historylist.daily.slice(3,10)" :key="index+'2'">
                <span class="num">{{index+4}}</span>
                <span @click="goallsearch($event)" class="word">{{item}}</span>
              </li>
            </ul>
            <ul class="hotlist">
              <li class="item" v-for="(item,index) in historylist.daily.slice(10,20)" :key="index+'3'">
                <span class="num">{{index+11}}</span>
                <span @click="goallsearch($event)" class="word">{{item}}</span>
              </li>
            </ul>
          </div>
          <div class="history">
            <div class="title">
              <i class="title-icon time"></i>
                搜索历史
              <span @click="clearhistory" class="delete-history">
                <i class="icon-garbage"></i>
                清空
              </span>
              <span class="subtitle">History</span>
            </div>
            <ul class="list" v-for="(item,index) in historylist.history" :key="index">
              <li class="item">
                <a class="history-search" @click="goallsearch($event)">{{item}}</a>
              </li>
            </ul>
            <div class="no-history" style="margin-left: 20px" :class="isdisplay">
              <span>没有历史记录了！</span>
            </div>
          </div>
        </div>
      </div>

    </div>

  </div>

</template>

<script>
// 1.导入echarts
import echarts from 'echarts'

export default {
  // 此时,页面上的元素,已经被渲染完毕了
  created() {
    this.gethistory()
    if(this.historylist.history === null) {
      this.isdisplay = ''
    }else if(this.historylist.history !== null){
      this.isdisplay = 'nodisplay'
    }
  },

  data(){
    return{
      isdisplay: '',
      queryInfo:{
        query: '',
        isSetHisNull: 'false',
      },
      select: '1',

      //v-for="item of array.slice(0, 5)"
      historylist : {
        daily:['仙王的日常生活','周深','淡黄的长裙','青春有你2','星游记','特朗普','老番茄','世卫组织','四月新番',
          '达拉崩吧','籽岷','中国boy','刺客五六七','张大仙','约会大作战','地缚少年花子君','蜡笔小新','钉钉','成果','回形针'],
        history: ['黄驿涵','黄科烨','赵焕明'],
      },
    }
  },
  methods:{
    clearhistory(){
      this.historylist.history = []
      this.isdisplay = ''
      this.queryInfo.isSetHisNull = 'true'
      this.gethistory();
    },

    goallsearch(e){
      this.$router.push('/allsearch');
      this.$store.state.query = e.currentTarget.innerHTML
    },
    searchbtnclick(){
      if(this.select === '1'){
        this.$router.push('/allsearch');
        this.$store.state.query = this.queryInfo.query
      }else if(this.select === '2'){
        this.$router.push('/videosearch');
        this.$store.state.query = this.queryInfo.query
      }else if(this.select === '3'){
        this.$router.push('/usersearch');
        this.$store.state.query = this.queryInfo.query
      }
    },
    aclick(){
      this.$router.push('/home');
    },
    async gethistory(){
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
  @import "../assets/stylesheets/theme.css";

  .pic:hover{
    content: url("../assets/images/bilibili_2233_2.png");
  }

  .welcome{
    overflow-x: hidden;
  }

  .el-input-group__append{
    background-color: #fb7299!important;
    color: white !important;
  }
  .allsearch-button{
    background-color: #fb7299 !important;
    color: white !important;
  }

  .allsearch-button:hover{
    background-color: #fd457a!important;
    color: white !important;
  }



  .sec_bar{
    display: block;
    width:100%;
    margin-top: 40px;
    margin-left: 40px;
  }

  #content-body-index{
    padding-right: 70px;
  }

  .search-select {
    width: 130px;
    color: #444;


  }


  .search-select:hover{
    box-shadow: 0 2px 4px rgba(0,0,0,.16);
    border: 1px solid #ccc;
    background-image: linear-gradient(0deg,#f8f8f8,#fff);
  }

  .history-search{
    text-decoration: none !important;
  }

  .history-search:hover{
    color: #00a1d6 !important;
    cursor:pointer !important;
  }

  .word:hover{
    color: #00a1d6 !important;
    cursor:pointer !important;
  }

  .nodisplay{
    display: none;
  }

  .hot-search > .title > .title-icon {

    /*    font-style: normal;
        font-weight: 400; */

    position: absolute;
    display: inline-block;
    right: 100%;
    width: 34px;
    height: 28px;
    background: url(//s1.hdslb.com/bfs/static/jinkela/search/asserts/search_title_icon.png) no-repeat;
  }

  .title-icon.time {
    background-position: -1px -38px!important;
  }

  .title-icon.history{
    background-position: -1px -1px!important;
  }

</style>
