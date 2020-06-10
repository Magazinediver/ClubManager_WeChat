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
              <div class="user-info-id">{{id}}</div>
              <div class="user-info-identity">{{identity}}</div>
            </div>
          </div>
          <div v-if="identity === '普通用户' || identity === '管理员'" class="create-button" @click="handleEdit">
            创建社团
          </div>
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
                >{{scope.row}}</div>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="18">
        <el-card shadow="hover" class="card-swiper">
          <el-carousel  type="card" height="40vh" :interval="5000" arrow="always">
            <el-carousel-item v-for="(item,index) in pic" :key="index">
              <img style="display: block;text-align: center;margin: 0 auto;width:100%;height:100%;object-fit: fill" :src="item">
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



    <el-dialog title="创建社团" :visible.sync="editVisible" width="40vw">
      <el-form ref="createClubForm" :rules="rules" :model="form" label-width="90px">
        <el-form-item label="学号/工号">
          <el-col :span="16">
            <el-input :disabled="true" v-model="form.id"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="用户名">
          <el-col :span="16">
            <el-input :disabled="true" v-model="form.name"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="社团名" prop="clubname">
          <el-col :span="16">
            <el-input v-model="form.clubname"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="社团地点" prop="address">
          <el-select v-model="form.address" placeholder="请选择活动区域">
            <el-option v-for="(item,index) in address" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="社团公告" prop="notice">
          <el-col :span="16">
            <el-input v-model="form.notice"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="社团类型" prop="type">
          <el-radio-group v-model="form.type" size="small">
            <el-radio-button label="兴趣"></el-radio-button>
            <el-radio-button label="游戏"></el-radio-button>
            <el-radio-button label="艺术"></el-radio-button>
            <el-radio-button label="组织"></el-radio-button>
            <el-radio-button label="志愿"></el-radio-button>
            <el-radio-button label="动漫"></el-radio-button>
            <el-radio-button label="学术"></el-radio-button>
            <el-radio-button label="运动"></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="社团海报">
          <el-upload
            class="upload-demo"
            drag
            :on-change="handleChange"
            :auto-upload="false"
            >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="社团描述" prop="describe">
          <el-input type="textarea" v-model="form.describe"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('createClubForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
// 1.导入echarts

import ClubType from "./pie/ClubType";
import ActivityType from "./pie/ActivityType";

export default {
  components: {ActivityType, ClubType},
  // 此时,页面上的元素,已经被渲染完毕了
  created() {
    this.form.id = window.sessionStorage.getItem('id')
    this.form.name = window.sessionStorage.getItem('name')
    this.id = window.sessionStorage.getItem('id')
    this.name = window.sessionStorage.getItem('name')
    this.identity = window.sessionStorage.getItem('identity')
    this.getData()
  },
  data(){
    return{
      editVisible: false,
      id: '',
      name: '',
      identity: '',
      todoList: [
        '社团招新活动将在6月20号举办',
        '社长请于6月13日在理四306集合开会',
        '社团招新活动将在6月20号举办',
        '社长请于6月13日在理四306集合开会',
      ],
      pic:[
        'https://ae01.alicdn.com/kf/H06978a26753d4c07bf899f39aef2949bf.jpg',
        'https://ae01.alicdn.com/kf/H54a7061e839f4d7c9ddc5679868b89f7l.jpg',
        'https://ae01.alicdn.com/kf/H0fd06a63db814c67a6160bdd8fa1ea1ag.jpg',
        'https://ae01.alicdn.com/kf/Hefdf7d749bdd46ef8f1685f87bd72b74E.jpg',
        'https://ae01.alicdn.com/kf/H54672b9fa07e49e58b06b6c37eeb5f1fh.jpg',
        'https://ae01.alicdn.com/kf/H2fde6e4069784393b181e707710fa673b.jpg',
      ],
      address:[
        '理四201',
        '理四301',
        '理四401',
        '理四410',
        '理四404',
        '理四230',
        '理四321',
        '理四218',
        '理四420',
      ],
      form:{
        poster:'',
        id:'',
        name:'',
        clubname:'',
        type:'',
        describe:'',
        address:'',
        notice:''
      },
      rules: {
        clubname: [
          { required: true, message: '请输入社团名称', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请选择社团据点', trigger: 'change' }
        ],
        type: [
          {required: true, message: '请选择社团种类', trigger: 'change'}
        ],
        notice: [
          { required: true, message: '请填写社团公告', trigger: 'blur' }
        ],
        describe: [
          { required: true, message: '请填写社团描述', trigger: 'blur' }
        ]
      }
    }
  },
  methods:{
    handleEdit() {
      this.editVisible = true;

    },

    handleChange(file) {
      var This = this;
      //this.imageUrl = URL.createObjectURL(file.raw);
      var reader = new FileReader();
      reader.readAsDataURL(file.raw);
      reader.onload = function(e){
        this.result // 这个就是base64编码了
        This.form.poster = this.result;
      }
    },

    // 保存编辑
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.editVisible = false;
          this.createClub()
          alert('社团创建申请提交成功!');
        } else {
          alert('表单填写有误!!');
          return false;
        }
      });
    },
    async getData(){
      const { data: res } = await this.$http.get('/clubmanage/homepage', {
      })
      if (res.meta.status !== 200) {
        return this.$message.error('获取搜索结果失败！')
      }
      //取得轮播图图片
      this.pic = res.data.pic
      //取得公告栏信息
      this.todoList = res.data.todoList
      //取得社团创建表单得地址选项
      this.address = res.data.address
      // this.$store.state.id = res.data.uid
      // this.$store.state.name = res.data.name
      // this.$store.state.identity = res.data.identity
    },


    async createClub(){
      const { data: res } = await this.$http.get('/clubmanage/createclub', {
        params: this.form
      })
      if (res.meta.status !== 200) {
        return this.$message.error('获取搜索结果失败！')
      }
      this.$message.success(`社团创建申请提交成功`);
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
    padding-left: 2vw;
    flex: 1;
    font-size: 14px;
    color: #999;
  }

  .user-info-name {
    font-size: 3.5vh;
    line-height: 3.5vh;
    color: #222;
  }

  .user-info-id{
    font-size: 15px;
    line-height: 15px;
    margin-top: 4px;
  }

  .user-info-identity{
    font-size: 15px;
    line-height: 15px;
    margin-top: 4px;
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

  .el-upload__input {
    display: none!important;
  }

  .el-upload__tip{
    line-height: 12px;
    margin-top: 0px;
  }

</style>
