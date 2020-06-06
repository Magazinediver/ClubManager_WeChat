<template>
  <div class="creat-act-page">

    <div class="container">
      <div class="logo">
        <img src="../../assets/images/zucc_grey.png" alt="">
      </div>
      <div class="form-title">活动申请表</div>
      <el-divider content-position="left">浙江大学城市学院</el-divider>
      <el-form class="createActForm" ref="createActForm" :rules="rules" :model="form" label-width="90px">
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
        <el-form-item label="活动名" prop="activityname">
          <el-col :span="16">
            <el-input v-model="form.activityname"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="活动场地" prop="address">
          <el-select v-model="form.address" placeholder="请选择活动区域">
            <el-option v-for="(item,index) in address" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
          <el-form-item label="活动时间">
            <el-col :span="8">
              <el-form-item prop="date1">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2" style="margin: 0 auto;text-align: center">-</el-col>
            <el-col :span="8">
              <el-form-item prop="date2">
                <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
        <el-form-item label="活动类型" prop="type">
          <el-radio-group v-model="form.type" size="small">
            <el-radio-button label="兴趣爱好"></el-radio-button>
            <el-radio-button label="学术创新"></el-radio-button>
            <el-radio-button label="公益服务"></el-radio-button>
            <el-radio-button label="体育运动"></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="活动海报">
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
        <el-form-item label="联系人" prop="contact">
          <el-col :span="16">
            <el-input v-model="form.contact"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="活动介绍" prop="introduce">
          <el-col :span="16">
            <el-input v-model="form.introduce"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="活动须知" prop="attention" >
          <el-col :span="20">
            <el-input type="textarea" :rows="4" v-model="form.attention"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <div class="footer">
        <el-button type="primary" @click="submitForm('createActForm')">确 定</el-button>
        <el-button @click="resetForm('createActForm')">重置</el-button>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: "CreateActivity",
    created() {
      this.form.id = this.$store.state.id
      this.form.name = this.$store.state.name
    },
    data(){
      return{
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
          activityname: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
          ],
          address: [
            { required: true, message: '请选择活动场地', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            {required: true, message: '请选择活动种类', trigger: 'change'}
          ],
          contact: [
            { required: true, message: '请填写活动联络人', trigger: 'blur' }
          ],
          introduce: [
            { required: true, message: '请填写活动介绍', trigger: 'blur' }
          ],
          attention: [
            { required: true, message: '请填写活动须知', trigger: 'blur' }
          ]
        }
      }
    },
    methods:{
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.editVisible = false;
            this.createActivity()
            alert('提交申请!');
          } else {
            alert('表单填写有误!!');
            return false;
          }
        });
      },
      async getData(){
        const { data: res } = await this.$http.get('/clubmanage/activitypage', {
        })
        if (res.meta.status !== 200) {
          return this.$message.error('获取搜索结果失败！')
        }
        // this.historylist.daily = res.data.daily

      },
      async createActivity() {
        const { data: res } = await this.$http.get('/clubmanage/creatactivity', {
          params: this.queryInfo
        })
        if (res.meta.status !== 200) {
          return this.$message.error('获取搜索结果失败！')
        }
        this.$message.success(`活动创建申请提交成功`);
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

</style>
