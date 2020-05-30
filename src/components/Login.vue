<template>
  <div>
    <section class="body-sign">
      <div class="login_container">
        <div class="center-sign">
          <div class="avatar_box">
            <img src="~assets/images/logo.png" height="54" alt="Porto Admin" />
            <div class="login_tips">
              <span><img src="~assets/images/person.png"></span>
              <h2 style="font-size: 20px;margin-top: 10px">Sign In</h2>
            </div>
          </div>
          <div class="login_box">
            <!-- 头像区 -->


            <!-- 登录表单 -->
            <div>
              <el-form
                ref="loginFormRef"
                :model="loginForm"
                :rules="loginFormRules"
                label-width="0px"
                class="login_form"
              >
                <el-form-item prop="username">
                  <label style="color: #fb7299;margin-top: 5px;">Username / 用户昵称</label>
                  <el-input v-model="loginForm.username" prefix-icon="el-icon-user-solid"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <label style="color: #fb7299;margin-bottom: 0px;" class="pull-left">Password / 密码</label>
                  <a href="pages-recover-password.html" style="color: #fb7299;text-decoration:none;float:right">Lost Password?/忘记密码？</a>
                  <el-input
                    v-model="loginForm.password"
                    type="password"
                    prefix-icon="el-icon-lock"
                  ></el-input>
                </el-form-item>
                <div class="col-sm-8" style="float: left">
                  <div class="checkbox-custom checkbox-default">
                    <input id="RememberMe" name="rememberme" type="checkbox"/>
                    <label for="RememberMe">Remember Me/记住密码</label>
                  </div>
                </div>
                <el-form-item style="width: 205px" class="btns">
                  <el-button  style="margin-left: 55px;border: #fb7299; background-color: #fb7299" type="primary" @click="login">登录</el-button>
                  <el-button style="margin-left: 10px;" type="info" @click="resetLoginForm">重置</el-button>
                </el-form-item>
                <span class="mt-lg mb-lg line-thru text-center text-uppercase">
								<span>or</span>
            </span>
                <div class="mb-xs text-center">

                </div>
                <p class="text-center">Don't have an account yet?
                  <a href="javascript:void(0);" @click="postOpenPlatform()"> Sign up!</a>
                </p>
              </el-form>

            </div>
          </div>
          <p class="text-center text-muted mt-md mb-md">&copy; Copyright 2020. All rights reserved. Design by <a href="http://121.36.153.113/">HYH</a>.</p>
        </div>
      </div>

    </section>
  </div>
  </template>

<script>


export default {
  data () {
    return {
      loginForm: {
        // username: 'admin',
        // password: '123456'
        username: '',
        password: ''
      },
      // 表单验证
      loginFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入用户密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    postOpenPlatform(){
      this.$router.replace('/signup')
      // this.$router.replace('/login')
    },
    // 表单重置按钮
    resetLoginForm () {
      // console.log(this)
      // resetFields：element-ui提供的表单方法
      this.$refs.loginFormRef.resetFields()
    },
    login () {
      // 表单预验证
      // valid：bool类型,用于预验证输入内容是否合法
      this.$refs.loginFormRef.validate(async valid => {
        // console.log(valid)
        if (!valid) return false
        // this.$http.post('login', this.loginForm): 返回值为promise
        // 返回值为promise，可加await简化操作 相应的也要加async
        const { data: res } = await this.$http.post('/bilibili/user/login', this.loginForm)
        // console.log(res)
        if (res.meta.status !== 200) return this.$message.error('登录失败')
        this.$message.success('登录成功')
        // 1、将登陆成功之后的token, 保存到客户端的sessionStorage中; localStorage中是持久化的保存
        //   1.1 项目中出现了登录之外的其他API接口，必须在登陆之后才能访问
        //   1.2 token 只应在当前网站打开期间生效，所以将token保存在sessionStorage中
        window.sessionStorage.setItem('token', res.data.token)
        // 2、通过编程式导航跳转到后台主页, 路由地址为：/home
        this.$router.push('/home')
      })
    }
  }
}
</script>

<style lang="less" scoped>
/* // lang="less" 支持less格式
// scoped vue的指令，只在当前组件生效 */
.body-sign{
  background-color: #f2f2f2;
  height: 100%;
}

.login_container {
  background-color: #f2f2f2;
  height: 100%;
}
.center-sign{
  position: absolute;
  left: 50%;
  top: 45%;
  -webkit-transform: translate(-50%, -50%);
}
.login_box {
  width: 470px;
  height: 365px;
  background-color: #fff;
  border-radius: 5px 5px 15px;

  background-color: #fff;
  box-shadow: 0 -5px 0px rgba(251,114,153,1);

  .avatar_box {
    width: 200px;
    height: 50px;
    background-color: #f2f2f2;
  }
}
.login_tips{
  display: flex;
  border-radius: 5px 5px 0 0;
  margin-top: 3px;
  color: #FFF;
  font-size: 12px;
  float: right;
  width: 120px;
  height: 50px;
  background-color: #fb7299;
  align-items: center;
  justify-content: center;
}


.login_tips img{

  float: left;
  width: 20px;
  height: 20px;
}

.login_tips h2{
  margin-left: 4px;
  float: right;
}

.login_form {
  position: absolute;
  top: 90px;
  width: 100%;
  padding: 0 30px;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: center;
}
.info {
  font-size: 13px;
  margin: 10px 15px;
}

.el-form-item{
  margin-bottom: 20px;
}
</style>
