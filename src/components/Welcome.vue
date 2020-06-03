<template>
  <div class="welcome">


  </div>

</template>

<script>
// 1.导入echarts
import echarts from 'echarts'

export default {
  // 此时,页面上的元素,已经被渲染完毕了

  data(){
    return{

      queryInfo:{
        query: '',
        isSetHisNull: 'false',
      },
    }
  },
  methods:{



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
  /*@import "../assets/stylesheets/theme.css";*/



</style>
