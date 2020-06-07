<template>
  <div class="creat-act-page">

    <div class="container">
      <div class="logo">
        <img src="../../assets/images/zucc_grey.png" alt="">
      </div>
      <div class="form-title">社团解散申请表</div>
      <el-divider content-position="left">浙江大学城市学院</el-divider>
      <el-form class="dismissClubForm" ref="dismissClubForm" :rules="rules" :model="form" label-width="90px">
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

        <el-form-item label="解散原因" prop="reason">
          <el-col :span="20">
            <el-input :rows="4" type="textarea" v-model="form.reason"></el-input>
          </el-col>
        </el-form-item>
      </el-form>

      <div class="footer">
        <el-button type="primary" @click="submitForm('dismissClubForm')">确 定</el-button>
        <el-button @click="resetForm('dismissClubForm')">重置</el-button>
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
          reason:'',
        },

        rules: {
          clubname: [
            { required: true, message: '请输入社团名称', trigger: 'blur' },
            { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
          ],
          reason: [
            { required: true, message: '请填写解散理由', trigger: 'blur' },
            { min: 20, max: 100, message: '长度在 20 到 100 个字符', trigger: 'blur' }
          ]
        }
      }
    },
    methods:{
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.editVisible = false;
            this.dismissClub()
            alert('提交申请!请重新登陆');

            window.sessionStorage.clear()
            this.$router.push('/login');
          } else {
            alert('表单填写有误!!');
            return false;
          }
        });
      },

      async dismissClub() {
        const { data: res } = await this.$http.get('/clubmanage/dismissclub', {
          params: this.form
        })
        if (res.meta.status !== 200) {
          return this.$message.error('获取搜索结果失败！')
        }
        this.$message.success(`社团解散提交成功`);
      },
      resetForm(formName) {
        console.log(1111)
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

  .dismissClubForm{
    margin: 0 40px;
  }

</style>
