<template>
  <div class="creat-act-page">

    <div class="container">
      <div class="logo">
        <img src="../../assets/images/zucc_grey.png" alt="">
      </div>
      <div class="form-title">社团变更申请表</div>
      <el-divider content-position="left">浙江大学城市学院</el-divider>
      <el-form class="editClubForm" ref="editClubForm" :rules="rules" :model="form" label-width="90px">
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
            <el-input :disabled="true" v-model="form.clubname"></el-input>
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
            action="http://jsonplaceholder.typicode.com/api/posts/"
            multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="社团描述" prop="describe">
          <el-col :span="20">
            <el-input type="textarea" :rows="4" v-model="form.describe"></el-input>
          </el-col>
        </el-form-item>
      </el-form>

      <div class="footer">
        <el-button type="primary" @click="submitForm('editClubForm')">确 定</el-button>
        <el-button @click="resetForm('editClubForm')">重置</el-button>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: "editClub",
    created() {
      this.form.id = this.$store.state.id
      this.form.name = this.$store.state.name
    },
    data(){
      return{
        form:{
          id:'',
          name:'',
          clubname:'流云梦社',
          poster:'',
          type:'艺术',
          describe:'xxxxxxxxxxxxxxxxxxxxxxxxxxx',
          address:'xxxxxxxxxxxxxx',
          notice:'xxxxxxxxxxxxxxxxx'
        },

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
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.editVisible = false;
            this.editClub()
            alert('提交申请!');
          } else {
            alert('表单填写有误!!');
            return false;
          }
        });
      },

      //获取社团地址
      async getData(){
        const { data: res } = await this.$http.get('/clubmanage/editclubpage', {
        })
        if (res.meta.status !== 200) {
          return this.$message.error('获取搜索结果失败！')
        }
        this.address = res.data.address
        this.form = res.data.form

      },
      async editClub() {
        const { data: res } = await this.$http.get('/clubmanage/editclub', {
          params: this.form
        })
        if (res.meta.status !== 200) {
          return this.$message.error('获取搜索结果失败！')
        }
        this.$message.success(`活动创建申请提交成功`);
      },
      resetForm(formName) {
        // console.log(1111)
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>
  .creat-act-page{
    padding-top: 20px;
    padding-bottom: 100px;
    position: relative;
    width: 100%;
    background-color: #F2F2F2;
  }

  .container{
    position: relative;
    border-radius: 10px;
    border: 1px solid #ddd;
    width: 60%;
    padding-bottom: 60px;
    background-color: white;
  }

  .form-title{
    margin-top: 20px;
    margin-bottom: 10px;
    color: #ff7700;
    font-size: 30px;
    line-height: 80px;
    margin-left: 20px;
    /*margin: 0 auto;*/
    /*text-align: center;*/
  }

  .logo{
    position: absolute;
    top: 40px;
    right: 30px;
  }

  .logo img{
    width: 280px;

  }

  .createActForm{
    padding-left: 40px;
  }

  .el-divider--horizontal{

    background-color: #777;
    margin-bottom: 60px;
    margin-top: 0;
  }


  .el-upload__input {
    display: none!important;
  }


  .footer{
    margin-top: 60px;
    margin-left: 130px;
  }

  .editClubForm{
    padding-left: 40px;
  }

</style>
