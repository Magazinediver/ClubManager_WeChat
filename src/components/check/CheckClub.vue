<template>
  <div class="">
    <div class="head">社团审核</div>
    <div class="check-container">
      <el-tabs v-model="message">
        <el-tab-pane :label="`未审申请(${unread.length})`" name="first">

          <el-table :data="unread">
            <el-table-column type="index" label="#"></el-table-column>
            <el-table-column width="150">
              <template slot-scope="scope">
                <span class="message-title">{{scope.row.clubname}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="type" width="100" label="社团类型"></el-table-column>
            <el-table-column prop="address" width="100" label="社团地点"></el-table-column>
            <el-table-column prop="notice"  label="社团公告"></el-table-column>
            <el-table-column prop="describe" label="社团描述"></el-table-column>
<!--            <el-table-column prop="date" width="180"></el-table-column>-->
            <el-table-column width="300">
              <template slot-scope="scope">
                <el-button type="primary" size="small" @click="handleKnowMore(scope.$index,scope.row)">查看详情</el-button>
                <el-button type="success" size="small" @click="handleAccept(scope.$index,scope.row)">通过</el-button>
                <el-button type="danger" size="small" @click="handleRefuse(scope.$index,scope.row)">驳回</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane :label="`过时消息(${read.length})`" name="second">
          <template v-if="message === 'second'">
            <el-table :data="read" :show-header="false" style="width: 100%">
              <el-table-column type="index" label="#"></el-table-column>
              <el-table-column width="150">
                <template slot-scope="scope">
                  <span class="message-title">{{scope.row.clubname}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="type" width="100" label="社团类型"></el-table-column>
              <el-table-column prop="address" width="100" label="社团地点"></el-table-column>
              <el-table-column prop="notice"  label="社团公告"></el-table-column>
              <el-table-column prop="describe" label="社团描述"></el-table-column>
              <!--            <el-table-column prop="date" width="180"></el-table-column>-->

              <el-table-column width="200">
                <template slot-scope="scope">
                  <el-button type="primary" size="small" @click="handleKnowMore(scope.$index,scope.row)">查看详情</el-button>
                  <el-button type="danger" size="small" @click="handleDel(scope.$index,scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>


    <el-dialog class="card" title="社团详情" :visible.sync="editVisible" width="40vw">
      <div class="club-container">
        <img class="poster" :src="this.form.poster" alt="">
        <div class="club-text">
          <div class="club-name">{{this.form.clubname}}</div>
          <div class="club-info">
            <div>社团据点： {{this.form.address}}</div>
            <div>负责人学号/工号：{{this.form.id}}</div>
            <div>负责人姓名：{{this.form.name}}</div>
            <div>社团分类： {{this.form.type}}</div>
            <div>社团公告： {{this.form.notice}}</div>
            <div>社团描述： {{this.form.describe}}</div>
          </div>
        </div>
      </div>


<!--      <span slot="footer" class="dialog-footer">-->
<!--        <el-button @click="editVisible = false">确认</el-button>-->
<!--      </span>-->
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
          deleteClubName: '',
          refuseClubName: '',
          acceptClubName: '',
        },
        form:{
          id:'',
          name:'',
          clubname:'',
          poster:'',
          type:'',
          describe:'',
          address:'',
          notice:''
        },
        unread: [
          {
            id:'31701074',
            name:'黄驿涵',
            clubname:'流云梦社',
            poster:'https://ae01.alicdn.com/kf/Hfa67dd673ebd4dfc8d1fcedd140c8564h.jpg',
            type:'兴趣',
            describe:'这是一个很有梦想的社团',
            address:'文一201',
            notice:'我们社团人满了不招了'
          },
          {
            id:'31701063',
            name:'王靖平',
            clubname:'棋社',
            poster:'https://ae01.alicdn.com/kf/H133eac1ed0fb4a54a55445ef6b455c0dw.jpg',
            type:'运动',
            describe:'这是一个有很多高人的社团',
            address:'教一107',
            notice:'我们只收没有段位的围棋新手'
          }
        ],
        read: [
          {
            id:'',
            name:'',
            clubname:'绮梦社',
            poster:'https://ae01.alicdn.com/kf/H68cefd5ad5814f26a38673d51f75b4b8w.jpg',
            type:'艺术',
            describe:'我们社团的目的只有一个，就是睡觉',
            address:'自己的宿舍',
            notice:'请不要举报我们，你难道不爱睡觉吗'
          }
        ],
      }
    },
    methods: {
      handleAccept(index,row) {
        this.queryInfo.deleteClubName = '';
        this.queryInfo.refuseClubName = '';
        this.queryInfo.acceptClubName = row.application_id;

        this.checkclub();
        console.log(this.queryInfo);
        // const item = this.unread.splice(index, 1);
        // this.read = item.concat(this.read);
        this.getclublist()
      },
      handleRefuse(index,row) {
        this.queryInfo.refuseClubName = row.application_id;
        this.queryInfo.acceptClubName = '';
        this.queryInfo.deleteClubName = '';

        this.checkclub();
        console.log(this.queryInfo);
        // const item = this.unread.splice(index, 1);
        // this.read = item.concat(this.read);
        this.getclublist()
      },
      handleDel(index,row) {
        this.queryInfo.refuseClubName = '';
        this.queryInfo.acceptClubName = '';
        this.queryInfo.deleteClubName = row.application_id;
        // const item = this.read.splice(index, 1);

        this.checkclub();
        console.log(this.queryInfo);
        // const item = this.read.splice(index, 1);
        // this.read = item.concat(this.read);
        this.getclublist()
      },
      handleKnowMore(index, row) {
        console.log(index);
        console.log(row);

        this.form.id = this.$store.state.id
        this.form.name = this.$store.state.name
        this.form.clubname = row.clubname
        this.form.poster = row.poster
        this.form.type = row.type
        this.form.address = row.address
        this.form.notice = row.notice
        this.form.describe = row.describe

        this.editVisible = true;
      },
      async getclublist() {
        const { data: res } = await this.$http.get('/clubmanage/checkclubpage', {
        })
        if (res.meta.status !== 200) {
          return this.$message.error('获取用户列表失败！')
        }
        this.read = res.data.read
        this.unread = res.data.unread
      },
      async checkclub() {
        const { data: res } = await this.$http.get('/clubmanage/checkclub', {
          params: this.queryInfo
        })
        console.log(res.meat.status)
        if (res.meta.status !== 200) {
          return this.$message.error('删除社员失败！')
        }
        return this.$message.success('审核通过')
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

  .club-container{
    position: relative;
    display: flex;
    align-items: center;
  }

  .poster{
    flex: 1;
    border-radius: 30px;
    width: 60%;
  }

  .club-text{
    flex: 1;
    padding: 0px 30px;
    width: 40%;
  }

  .club-name{
    font-size: 3.5vh;
    color: #222;
    line-height: 40px;
  }

  .club-info{
    margin-top: 20px;
    font-size: 15px;
  }

</style>

