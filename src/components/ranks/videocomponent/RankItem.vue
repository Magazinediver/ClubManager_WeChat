<template>
  <div>
    <li @click="" v-for="(item,index) in cranklist" :key="index" class="rank-item">
      <a class="rank-click-a" target="_blank" :href="item.link">
        <div class="num">{{index+1}}</div>
        <div class="content">
          <div class="img">
            <a :href="item.link" target="_blank">
              <div class="lazy-img cover">
                <img :alt="item.title" :src="item.pic">
              </div>
            </a>
          </div>
          <div class="info">
            <a :href="item.link" target="_blank" class="title_rank">{{item.title}}</a>
            <div class="detail">
            <span class="data-box">
              <i class="b-icon play"></i>
              {{item.play}}
            </span>
              <span class="data-box">
             <i class="b-icon view"></i>
             {{item.danmu}}
            </span>
              <a class="rank-up-name" target="_blank" :href="'//space.bilibili.com/'+item.mid">
                <span class="data-box">
                <i class="b-icon author"></i>
                {{item.up}}
              </span>
            </a>
            </div>
            <div class="pts">
              <div>
                {{item.score}}
              </div>
              综合得分
            </div>
          </div>
        </div>
      </a>

    </li>
  </div>
</template>

<script>
  export default {
    name: "RankItem",
    data(){
      return{

      }
    },
    props: ['cranklist']
  }
</script>

<style scoped>

  .rank-item {
    transition: .2s;
    overflow: hidden;
    border-bottom: 1px solid #e5e9ef;
    position: relative;
  }

  .rank-item:hover{
    /*box-shadow: 0 2px 5px #ccc, 0 -2px 5px #ccc;*/
    box-shadow: inset 0 2px 0px #ccc,inset 0 -2px 0px #ccc,inset 2px 0 0px #ccc,inset -2px 0 01px #ccc;
  }

  .num {
    width: 70px;
    height: 70px;
    position: absolute;
    top: 20px;
    left: 0;
    line-height: 70px;
    text-align: center;
    font-size: 36px;
    font-weight: 700;
    color: #b8c0cc;
    font-family: simhei;
  }

  .content {
    padding: 20px 0 0 70px;
    overflow: hidden;
  }

  .img {
    position: relative;
    float: left;
  }

  .img>a {
    display: inline-block;
  }

  .cover {
    width: 114px;
    height: 70px;
  }

  img {
    border-radius: 4px;
    display: block;
    width: 100%;
    height: 100%;
  }

  .info {
    padding-bottom: 20px;
    margin-left: 130px;
    height: 70px;
    position: relative;
    display: block;
  }

  .title_rank {
    height: 20px;
    line-height: 20px;
    font-weight: 700;
    font-size: 14px;
    color: #222;
    text-decoration: none;
    transition: .3s;
    display: inline-block;
  }
  .title_rank:hover {
    color: #00a1d6;
  }

  .detail {
    margin-top: 20px;
    color: #99a2aa;
  }

  .rank-up-name{
    text-decoration: none;
  }

  .rank-up-name:hover{
    color: #00a1d6;
  }

  .data-box {
    width: 80px;
    margin-right: 20px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .data-box {
    text-decoration: none;
  }

  .rank-click-a{
    text-decoration: none;
  }

  .b-icon.play {
    background-position: -282px -90px;
  }

  .b-icon {
    width: 12px;
    height: 12px;
    margin-right: 5px;
    display: inline-block;
    vertical-align: text-top;
    background: url(//static.hdslb.com/images/base/icons.png) no-repeat;
  }

  .data-box {
    width: 80px;
    margin-right: 20px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .b-icon.view {
    background-position: -282px -218px;
  }

  .detail a {
    color: #99a2aa;
  }

  .b-icon.author {
    background-position: -282px -154px;
  }

  .rank-item .content .info .pts {
    height: 20px;
    color: #b8c0cc;
    line-height: 20px;
    position: absolute;
    bottom: 40px;
    right: 20px;
    text-align: center;
  }

  .rank-item .content .info .pts div {
    color: #00a1d6;
    font-weight: 700;
    font-size: 16px;
    margin-bottom: 12px;
  }


</style>
