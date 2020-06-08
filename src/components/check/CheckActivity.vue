<template>
  <div class="">
    <div class="head">活动审核</div>
    <div class="check-container">
      <el-tabs v-model="message">
        <el-tab-pane :label="`未审申请(${unread.length})`" name="first">
          <el-table :data="unread">
            <el-table-column type="index" label="#"></el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                <span class="message-title">{{scope.row.activityname}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="type" width="120" label="活动类型"></el-table-column>
            <el-table-column prop="address" width="120" label="活动地点"></el-table-column>
            <el-table-column prop="contact" label="联系人"></el-table-column>
            <el-table-column prop="introduce" label="活动简介"></el-table-column>
            <el-table-column prop="date"></el-table-column>
            <el-table-column width="300">
              <template slot-scope="scope">
                <el-button type="primary" size="small" @click="handleKnowMore(scope.$index,scope.row)">查看详情</el-button>
                <el-button type="success" size="small" @click="handleAccept(scope.$index,scope.row)">通过</el-button>
                <el-button type="danger" size="small" @click="handleRefuse(scope.$index,scope.row)">驳回</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane :label="`已读消息(${read.length})`" name="second">
          <template v-if="message === 'second'">
            <el-table :data="read">
              <el-table-column type="index" label="#"></el-table-column>
              <el-table-column>
                <template slot-scope="scope">
                  <span class="message-title">{{scope.row.activityname}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="type" width="120" label="活动类型"></el-table-column>
              <el-table-column prop="address" width="120" label="活动地点"></el-table-column>
              <el-table-column prop="contact" label="联系人"></el-table-column>
              <el-table-column prop="introduce" label="活动简介"></el-table-column>
              <el-table-column prop="date"></el-table-column>
              <el-table-column width="200">
                <template slot-scope="scope">
                  <el-button type="primary" size="small" @click="handleKnowMore(scope.$index,scope.row)">查看详情</el-button>
                  <el-button type="danger" size="small" @click="handleDel(scope.$index)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>


    <el-dialog class="card" title="活动详情" :visible.sync="editVisible" width="40vw">
      <div class="act-container">
        <img class="poster" :src="this.form.poster" alt="">
        <div class="act-text">
          <div class="act-name">{{this.form.activityname}}</div>
          <div class="act-adddress"><i class="iconfont icon-didian"></i>  {{this.form.address}}</div>
          <div class="act-date"><i class="iconfont icon-shijian2"></i>  {{this.form.date}}</div>
        </div>
      </div>
      <div class="act-info-container">
        <div>负责人学号/工号：{{this.form.id}}</div>
        <div>负责人姓名：{{this.form.name}}</div>
        <div>联系人： {{this.form.contact}}</div>
        <div>活动分类： {{this.form.type}}</div>
        <div>活动简介： {{this.form.introduce}}</div>
        <div>活动须知： {{this.form.attention}}</div>
      </div>




      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'CheckClub',
    created() {
      this.getclublist()
    },
    data() {
      return {
        message: 'first',
        showHeader: false,
        editVisible: false,
        queryInfo:{
          deleteActivityName: '',
          refuseActivityName: '',
          acceptActivityName: '',
        },
        form:{
          id:'',
          name:'',
          activityname:'',
          contact:'',
          poster:'',
          type:'',
          attention:'',
          address:'',
          introduce:'',
          date1:'',
          date2:''
        },
        unread: [
          {
            activityname: '社团招新',
            poster: 'https://ae01.alicdn.com/kf/H06978a26753d4c07bf899f39aef2949bf.jpg',
            date: '2020-6-5',
            type: '兴趣爱好',
            address:'理四404',
            contact:'黄驿涵 17306412345',
            introduce: '这是一个很好的活动',
            attention: '这个活动只有群众才能参加',
            status: '准备进行',
          },
          {
            activityname: '团建',
            poster: 'https://ae01.alicdn.com/kf/H54a7061e839f4d7c9ddc5679868b89f7l.jpg',
            date: '2020-6-6',
            type: '学术创新',
            address:'理四401',
            contact:'王靖平 17315622345',
            introduce: '这是一个很虎虎虎虎虎虎斤斤计较急急急急急急急急急急急急急急急啊啊啊啊啊啊的活动',
            attention: '这个活动只有群众才能jijijijjij参加',
            status: '已过期',
          }
        ],
        read: [
          {
            activityname: '动漫展会',
            poster: 'https://ae01.alicdn.com/kf/H54a7061e839f4d7c9ddc5679868b89f7l.jpg',
            date: '2020-6-6',
            type: '学术创新',
            address:'理四321',
            contact:'程序员 17315622345',
            introduce: '这是一个ddddddddd',
            attention: '这个活dddddddddddjeeeeeeee加',
            status: '已过期',
          }
        ],
      }
    },
    methods: {
      handleAccept(index,row) {
        this.queryInfo.deleteActivityName = '';
        this.queryInfo.refuseActivityName = '';
        this.queryInfo.acceptActivityName = row.activityname;
        this.checkclub();
        console.log(this.queryInfo);
        const item = this.unread.splice(index, 1);
        this.read = item.concat(this.read);
      },
      handleRefuse(index,row) {
        this.queryInfo.refuseActivityName = row.activityname;
        this.queryInfo.acceptActivityName = '';
        this.queryInfo.deleteActivityName = '';
        this.checkclub();
        console.log(this.queryInfo);
        const item = this.unread.splice(index, 1);
        this.read = item.concat(this.read);
      },
      handleDel(index) {
        const item = this.read.splice(index, 1);
      },
      handleKnowMore(index, row) {
        console.log(index);
        console.log(row);

        this.form.id = this.$store.state.id
        this.form.name = this.$store.state.name
        this.form.activityname = row.activityname
        this.form.contact = row.contact
        this.form.poster = row.poster
        this.form.type = row.type
        this.form.address = row.address
        this.form.introduce = row.introduce
        this.form.attention = row.attention
        this.form.date = row.date

        this.editVisible = true;
      },
      async getclublist() {
        const { data: res } = await this.$http.get('/clubmanage/checkactivitypage', {
        })
        if (res.meta.status !== 200) {
          return this.$message.error('获取用户列表失败！')
        }
        this.read = res.data.read
        this.unread = res.data.unread
      },
      async checkclub() {
        const { data: res } = await this.$http.get('/clubmanage/deleteactivity', {
          params: this.deleteid
        })
        console.log(res.meat.status)
        if (res.meta.status !== 200) {
          return this.$message.error('删除社员失败！')
        }
        return this.$message.success('删除成功')
      },
    },
    computed: {
      unreadNum(){
        return this.unread.length;
      }
    }
  }

</script>

<style>
  .message-title{
    cursor: pointer;
  }
  .handle-row{
    margin-top: 30px;
  }

  .head{
    color: white;
    padding-left: 20px;
    font-size: 20px;
    line-height: 40px;

    border-radius: 10px 10px 0 0;
    margin-top: 30px;
    margin-left: 20px;
    margin-right: 20px;
    background-color: #ffc609;
  }

  .check-container {
    margin: 20px;
    margin-top: 0;
    padding: 30px;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 0 0 10px 10px;
  }

  .el-breadcrumb{
    background-color: white;
    padding-left: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
    margin-bottom: 0;
  }

  .el-dialog{
    border-radius: 30px;
  }

  .el-dialog__title{
    padding-left: 10px;
  }

  .act-container{
    display: flex;
    align-items: center;
  }

  .poster{
    flex: 1;
    border-radius: 30px;
    width: 60%;
  }

  .act-text{
    flex: 1;
    padding: 0 30px;
    width: 40%;
  }

  .act-name{
    font-size: 3.5vh;
    color: #222;
    line-height: 40px;
  }

  .act-adddress{
    color: #666;
    font-size: 20px;
    line-height: 20px;
    margin-top: 30px;
  }

  .icon-didian{
    color: #666;
    font-size: 20px;
    line-height: 20px;
  }

  .act-date{
    color: #666;
    font-size: 20px;
    margin-top: 10px;
  }

  .icon-shijian2{
    color: #666;
    font-size: 20px;
    line-height: 20px;
  }

  .act-info-container{
    margin: 20px;
    margin-bottom: 0;
  }

</style>
