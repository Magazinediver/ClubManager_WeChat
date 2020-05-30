<template>
  <div>
    <el-container>
      <div class="video-container" style="margin: 0 auto;width: 100%;padding-top: 10px;padding-bottom: 30px;" >
        <div class="father">
            <li v-for="(item,index) in cvideolist" :key="index" class="video-item matrix">
              <a :href="item.link" title="视频封面,点击前往" target="_blank" class="img-anchor">
                <div class="img">
                  <div class="lazy-img">
                    <img alt="" :src="item.pic">
                  </div>
                  <span class="so-imgTag_rb">{{item.duration}}</span>
                </div>
              </a>
              <div class="info">
                <div class="headline clearfix">
                  <span class="type hide">{{item.type}}</span>
<!--                  <a :href="item.link" target="_blank" class="title">{{item.title}}</a>-->
                  <a :href="item.link" :title="item.title" target="_blank" class="title">
                    <span>
                      {{slice1(item.title,cquery)}}
                    </span>
                    <span style="color:#fb7299">
                      {{slice2(item.title,cquery)}}
                    </span>
                    <span>
                      {{slice3(item.title,cquery)}}
                    </span>
                  </a>
                </div>
                <div class="tags">
                  <span title="观看" class="so-icon watch-num"><i class="icon-playtime"></i>{{play(item.play)}}</span>
                  <span title="弹幕" class="so-icon hide"><i class="icon-subtitle"></i>{{item.danmu}}</span>
                  <span title="上传时间" class="so-icon time"><i class="icon-date"></i>{{item.time}}</span>
                  <span title="up主" class="so-icon">
              <i class="icon-uper"></i>
              <a :href="'//space.bilibili.com/'+item.mid" target="_blank" class="up-name">{{item.up}}</a>
            </span>
                </div>
              </div>
            </li>
        </div>

      </div>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: "Tabcomponent",
    data(){
      return{
        // videolist:[{
        //   query : '入门',
        //   link : '//www.bilibili.com/video/BV1HJ41147DG?from=search',
        //   pic : '//i1.hdslb.com/bfs/archive/20dd430345d90b3fa3ab4abc5b0b87a731042de5.jpg@320w_200h.webp',
        //   duration : '54:28:48',
        //   type : '演讲•公开课',
        //   title : '2019年最新js(JavaScript)基础入门',
        //   play : '21.2万',
        //   danmu : '1.6万',
        //   time : '2019-12-21',
        //   up : '码出未来',
        //   mid : '119',
        // },
        // ],

      }
    },
    methods:{
      play(play){
        if(play<10000)
          return play
        else if (play>10000){
          return (play/10000).toFixed(1) + '万'
        }
        // else if (play>10000000){
        //   return (play/10000000).toFixed(1) + '千万'
        // }
      },
      slice1(item,title){
        return item.slice(0,item.toLowerCase().indexOf(title.toLowerCase()))
      },
      slice2(item,title){
        return item.slice(item.toLowerCase().indexOf(title.toLowerCase()),item.toLowerCase().indexOf(title.toLowerCase())+title.length)
      },
      slice3(item,title){
        return item.substr(item.toLowerCase().indexOf(title.toLowerCase())+title.length)
      }
    },
    props: ['cvideolist','cquery']
  }
</script>

<style scoped>
  .father {
    padding-left: 20px;
    margin: 0 auto;
  }

  .video-item{
    float: left;
    margin-right: 12px;
    margin-left: 12px;
    margin-top: 20px;
    z-index: 0;
    list-style: none;
    display: inline;
  }

  .matrix {
    position: relative;
    height: 208px;
    width: 168px;
    border: 1px solid #e5e9ef;
    border-radius: 4px;
  }

  a {
    text-decoration: none;
    outline: 0;
    cursor: pointer;
  }



  .img {
    height: 100px;
    border-radius: 4px;
    position: relative;
    overflow: hidden;
  }

  .lazy-img {
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABHCAMAAAB4UkqjAAAAh1BMVEUAAADd3d3d3d…UCIZXAAAALHRSTlMAoJDx4OYL/DcGF+6+JNi4ycSIT2k6LPeWfRzTVPXPszEQrV0hpo12cEZAZFpRNIQAAAJVSURBVFjD7dbZcpswGIbhHwwSi81q8Ib33fnu//oatRIpmliDhQ/aaZ+TKInnjVgkhb4RJMhP9Fzo8PiD+vEA+JPnqS0+1dRHBJhibAzh2HNeekxP9Z8XBSMZM6SmRBYx65QeM6XsY3rKPqanLGMWqeDmOh0b/Io9+YHi3gKtdExgLznSlyjFMGnUphIMlcgY22C4DSPBxTu4IrXDe+yI6IDWbPSqGVoHoohDyip6XZVB4hFN1TgPyUaYQ5rSWQ0nZGcC6UyJukKypa4yIXX3HLLlqCdHX++HLRfS/9bbWvvHLSLNR3N6tRXdFwdxejekiYF4fDnWYa/WqSm2PqRCSy0hrbP5RxAaW8141N17tVbZ+S1fFYbWFF2+1lqg62BoBdAsqWOLroWhxTh+M8vmWuuaxp1WaWjRSn43yl35sHTLUjxiaWlqnYE4LZoJme3v13MibqepFZRL6otV5V+/Hv+xVvi+FsvZG1qh/LQ7uFXnF/HlwcEfYlDktW2r5EARUiXWc1xRWAC8tGwxsdJ9dcRnYrddMdtrjDZyAy3kXrSJ7O89u8zEZAIKxBRnFzbonWD3ZkfCrrmzP+6979nicjAnW3NZ4OS1R6GtVBa8drTek539up3NAgMvcv51WNZQitCiFBZQaqIMSrx1XrWNoWTy/w1r+hk+xjuMSVjGGC6WZ3S1xlDriqTKxzB+Ra3I4bDHne62drqmied57QR9z0D94dHnOEmvJ/pWAMm4ovL2TTcJ5cRyMlHrbkdG5c/5r82fYqt+K/iR89m2JrP9PEZyI80PsPxVT0P3FAEAAAAASUVORK5CYII=) 50% no-repeat;
    width: 100%;
    height: 100%;
    display: inline-block;
  }
  .lazy-img img {
    display: block;
    width: 100%;
    height: 100%;
  }


  .video-item .so-imgTag_rb {
    position: absolute;
    right: 0;
    bottom: 0;
    line-height: 18px;
    padding: 0 5px;
    color: #fff;
    background-color: #333;
    background-color: rgba(0, 0, 0, .5);
    border-top-left-radius: 4px;
  }

  .info {
    padding: 8px 10px 0;
  }

  .headline {
    margin-bottom: 12px;
    height: 40px;
    overflow: hidden;
  }

  .hide {
    display: none;
  }

  .watch-num {
    overflow: inherit;
    white-space: nowrap;
  }

  .so-icon {
    margin-right: 5px;
    margin-bottom: 12px;
    float: left;
    display: inline-block;
    font-size: 12px;
    height: 12px;
    vertical-align: text-top;
    line-height: 12px;
    padding-left: 14px;
    position: relative;
    color: #99a2aa;
  }
  .time{
    margin-right: 0px;
    padding-left: 14px;
  }


  .so-icon i {
    position: absolute;
    left: 0;
    top: 0;
    background-image: url(//s1.hdslb.com/bfs/static/jinkela/search/asserts/sprite-690be8a6ea.png);
    width: 11px;
    height: 11px;
  }

  .title {
    font-size: 12px;
    line-height: 20px;
    color: #222;
    margin-left: 0px;
  }

  .icon-playtime {
    background-position: -485px -543px;
  }

  .icon-subtitle {
    background-position: -442px -124px;
  }

  .so-icon i.icon-date {
    background-position: -442px -165px;
  }

  .so-icon i.icon-uper {
    background-position: -442px -83px;
  }

  .up-name {
    display: inline-block;
    max-width: 132px;
    height: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #99A2AA;
  }
</style>
