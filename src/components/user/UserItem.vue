<template>
  <div v-if="this.cdis == 'dis'" style="margin-right: 280px;margin-left: 40px" class="haha">
    <a class="user-click" target="_blank" :href="'//space.bilibili.com/'+cup.mid">
      <ul class="list-unstyled up-list">
        <li class="user-item">
          <div class="has-thumb search-item">
            <div class="up-face">
              <a :href="'//space.bilibili.com/'+cup.mid" :title="cup.name" target="_blank" class="face-img">
                <div class="up-head">
                  <img  :src="cup.face" alt="" />
                </div>
              </a>
            </div>
            <div class="result-data">
              <div style="width: 100%;height: 40px">
                <a :href="'//space.bilibili.com/'+cup.mid" :title="cup.name" target="_blank" style="float: left;text-decoration:none" class="up-name">{{cup.name}}</a>
                <p style="float: left;margin-left: 20px;margin-top: 3px" class="result-type">
                  <span class="label label-primary" style="position: relative;margin-top: 40px;padding-top: 4px">lv {{cup.level}}</span>
                </p>
              </div>

              <div class="up-info clearfix" style="margin-bottom: 6px">
                <span class="likes">点赞数：{{cup.likes}}</span>
                <span class="fans">粉丝：{{cup.fans}}</span>
              </div>
              <p class="description">{{cup.sign}}</p>
            </div>
          </div>
        </li>
      </ul>
    </a>
  </div>
</template>

<script>
  export default {
    name: "UserItem",
    props:['cup','cdis'],

    // created() {
    //   if(this.cdis === 'dis'){
    //     this.isActive = false
    //     console.log("display");
    //   }else if(this.cdis === 'nodis'){
    //     this.isActive = true
    //     console.log("nodisplay");
    //   }
    // },

    // updated() {
    //   this.display();
    //   console.log(this.isActive)
    // },
    //
    // mounted() {
    //   this.display();
    //   console.log(this.isActive)
    // },

    methods:{
      // display(){
      //   if(this.cdis === 'dis'){
      //     console.log("是打印")
      //     this.isActive = false
      //   }else if(this.cdis === 'nodis'){
      //     console.log("是不打印")
      //     this.isActive = true
      //   }
      // }
    },

    data(){
      return{
        isActive: true,
        // up:
        //   {
        //     lv : 5,
        //     link : '//space.bilibili.com/119?from=search',
        //     head : '//i2.hdslb.com/bfs/face/bc5ca101313d4db223c395d64779e76eb3482d60.jpg@315w_315h.webp',
        //     name : '老番茄',
        //     videonum : 184,
        //     fans : 3902,
        //     sign : '一日小明行至星光学院见一金发大眼挡在路中，小明定睛观瞧，此人右手饭勺木纹匀细有海苔味，身披星光学院校服头顶红色蝴蝶结，内衬天使软糖内衣脚蹬白色练功靴，腰间消防斧发出淡淡光芒，小明见罢心中暗想:此人莫非'
        //   }
      }

    }
  }
</script>

<style scoped>

  .user-click {
    text-decoration: none;
  }

  .up-list{
    display: block;
    padding-inline-start: 20px;
  }

  .user-item {
    margin-top: -10px;
    position: relative;
    padding: 20px 0 20px 102px;
    border-bottom: 1px solid #e5e9ef;
    z-index: 1;
  }

  .face-img {
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;

    text-decoration: none;
    outline: 0;
    color: #00a1d6;
    cursor: pointer;
  }

  .up-face{
    position: absolute;
    width: 90px;
    height: 90px;
    left: 0;
    top: 20px;
  }

  .up-head{
    width: 90px;
    height: 90px;
    display: inline-block;
  }

  .up-head img{
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    vertical-align: middle;
  }

  .likes{
    float: left;
    margin-top: 13px;
    margin-right: 15px;
    font-size: 14px;
    line-height: 12px;
    color: #6d757a;
  }

  .fans{
    float: left;
    margin-top: 13px;
    margin-right: 15px;
    font-size: 14px;
    line-height: 12px;
    color: #6d757a;
  }

  .description{
    margin-top: 10px;
    margin-bottom: 4px;
    width: 750px;
    font-size: 14px;
    color: #6d757a;
    line-height: 16px;
  }

  .up-name{
    font-weight: bold;
    margin-top: 3px;
    font-size: 20px;
  }

</style>
