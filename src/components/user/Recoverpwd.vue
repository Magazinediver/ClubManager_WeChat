<template>
  <div class="recover-pwd-container">

    <section class="body-sign">
      <div class="reset_container">
        <div class="center-sign">
          <div class="avatar_box">
            <img src="~assets/images/logo.png" height="54" alt="Porto Admin" />
            <div class="reset_tips">
              <span><i class="el-icon-refresh-left"></i></span>
              <h2 style="font-size: 20px;margin-top: 10px">Recover Password</h2>
            </div>
          </div>
          <div class="reset_box">
            <!-- 头像区 -->


            <!-- 修改密码表单 -->
            <div>
              <el-form
                ref="resetFormRef"
                :model="resetForm"
                :rules="resetFormRules"
                label-width="0px"
                class="reset_form"
              >
                <el-form-item prop="id">
                  <label style="color: #ff7700;margin-top: 5px;">ID / 学号/工号</label>
                  <el-input
                    v-model="resetForm.id"
                    disabled
                    prefix-icon="el-icon-user-solid">
                  </el-input>
                </el-form-item>

                <el-form-item prop="oldpassword">
                  <label style="color: #ff7700;margin-bottom: 0px;" class="pull-left">Password / 旧密码</label>
                   <el-input
                    v-model="resetForm.oldpassword"
                    type="password"
                    prefix-icon="el-icon-lock">
                   </el-input>
                </el-form-item>

                <el-form-item prop="newpassword">
                  <label style="color: #ff7700;margin-bottom: 0px;" class="pull-left">Password / 新密码</label>
                  <el-input
                    v-model="resetForm.newpassword"
                    type="password"
                    prefix-icon="el-icon-lock">
                  </el-input>
                </el-form-item>

                <el-form-item prop="cpassword">
                  <label style="color: #ff7700;margin-bottom: 0px;" class="pull-left">Confirm Password / 确认密码</label>
                  <el-input
                    v-model="resetForm.cpassword"
                    type="password"
                    name="pwd_confirm"
                    prefix-icon="el-icon-lock"
                    style="width: 320px;float: left"
                  ></el-input>
                  <span class="input-group-btn reset-span">
										<el-button class="btn btn-primary btn-lg btn-recover reset-btn" type="info" @click="checkpwd">重置</el-button>
									</span>
                </el-form-item>



              </el-form>

            </div>
          </div>
          </div>
      </div>

    </section>


  </div>
</template>

<script>
  export default {
    name: "recoverpasswd",
    created() {
      this.resetForm.id = this.$store.state.id
    },
    data() {
      return {
        resetForm: {
          id: '',
          oldpassword: '',
          newpassword: '',
          cpassword: '',
        },
        // 表单验证
        resetFormRules: {
          id: [
            { required: true, message: '请输入学号/工号', trigger: 'blur' },
            // { min: 5, max: 8, message: '长度在 5 到 8 个字符', trigger: 'blur' }
          ],
          oldpassword: [
            {required: true, message: '请输入旧密码', trigger: 'blur'},
            {min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur'}
          ],
          newpassword:[
            {required: true, message: '请输入新密码', trigger: 'blur'},
            {min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur'}
          ],
          cpassword: [
            {required: true, message: '请再次确认密码', trigger: 'blur'},
            {min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      checkpwd(){
        if(this.resetForm.newpassword !== this.resetForm.cpassword){
          this.$message.error('两次输入的密码不相同')
        }else{
         this.reset()
        }
      },

      reset() {
        // 表单预验证
        // valid：bool类型,用于预验证输入内容是否合法
        this.$refs.resetFormRef.validate(async valid => {
          // console.log(valid)
          if (!valid) return false
          // this.$http.post('reset', this.resetForm): 返回值为promise
          // 返回值为promise，可加await简化操作 相应的也要加async
          const {data: res} = await this.$http.post('/clubmanage/changepwd', this.resetForm)
          // console.log(res)
          if (res.meta.status !== 200) return this.$message.error('原密码错误')
          this.$message.success('重置成功')
          // 2、通过编程式导航跳转到后台主页, 路由地址为：/home
          this.$router.push('/login')
        })
      }
    }
  }
</script>

<style scoped>
  .recover-pwd-container{
    background-color: #f2f2f2;
  }

  .body-sign{
    background-color: #f2f2f2;
    height: 100%;
  }

  .reset_container {
    background-color: #f2f2f2;
    height: 100%;
  }
  .center-sign{
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
  }
  .reset_box {
    width: 470px;
    height: 465px;
    background-color: #fff;
    border-radius: 5px 5px 15px;

    background-color: #fff;
    box-shadow: 0 -5px 0px #ffc609;

    .avatar_box {
      width: 200px;
      height: 50px;
      background-color: #f2f2f2;
    }
  }
  .reset_tips{
    display: flex;
    border-radius: 5px 5px 0 0;
    margin-top: 3px;
    color: #FFF;
    font-size: 12px;
    float: right;
    width: 200px;
    height: 50px;
    background-color: #ffc609;
    align-items: center;
    justify-content: center;
  }


  .reset_tips i{

    float: left;
    font-size: 20px;
  }

  .reset_tips h2{
    margin-left: 4px;
    float: right;
  }

  .reset_form {
    position: absolute;
    top: 90px;
    width: 100%;
    padding: 0 30px;
    box-sizing: border-box;
  }
  .reset-span{
    width: 90px;
    position: fixed;
    margin-top: 40px;
    margin-left: 320px
  }
  .reset-btn{
    width: 90px;
    height: 40px;
  }

</style>
