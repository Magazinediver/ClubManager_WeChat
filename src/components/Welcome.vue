<template>
  <div class="welcome">


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
