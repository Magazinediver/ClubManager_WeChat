<template>
  <div>

    <!-- 卡片视图 -->
    <el-card style="padding: 20px">
      <!-- 搜索 添加 -->
      <el-row :gutter="20">

        <el-col :span="14">
          <el-input placeholder="请输入你想查询的up主" v-model="queryInfo.query" clearable @clear="getactivitylist" @keyup.enter.native="getactivitylist">
            <el-button class="upsearch" slot="append" icon="el-icon-search" @click="getactivitylist"></el-button>
          </el-input>
        </el-col>

        <el-col :span="9" :offset="1">
          <el-radio-group @change="getRadioQuery" v-model="queryInfo.type">
            <el-radio-button label="默认"></el-radio-button>
            <el-radio-button label="时间近"></el-radio-button>
            <el-radio-button label="时间远"></el-radio-button>
          </el-radio-group>
        </el-col>
      </el-row>


      <!-- 用户列表区域 -->
      <el-table
        :data="activitylist" stripe>
        <!-- stripe: 斑马条纹
        border：边框-->
        <el-table-column type="index" label="#"></el-table-column>
        <!--        <el-table-column prop="mid" width="100" label="学号"></el-table-column>-->
        <el-table-column prop="activityname" width="120" label="活动名"></el-table-column>
        <el-table-column label="海报/查看大图"  width="200" align="center">
          <template slot-scope="scope">
            <el-image
              style="border-radius: 20px;width: 100%;height: 100%;margin-bottom: -8px"
              class="table-td-thumb"
              :src="scope.row.poster"
              :preview-src-list="[scope.row.poster]"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="type" width="100" label="活动类型"></el-table-column>
        <el-table-column prop="address" width="100" label="活动地点"></el-table-column>
        <el-table-column prop="date" label="活动时间"></el-table-column>
        <el-table-column prop="contact"  label="联系人"></el-table-column>
        <el-table-column prop="introduce" label="活动简介"></el-table-column>
        <el-table-column prop="attention" label="活动须知"></el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.status==='准备进行'?'success':(scope.row.status==='已过期'?'danger':'')"
            >{{scope.row.status}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.status==='准备进行'"
              type="text"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[ 4, 5, 6, 8]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>


    <el-dialog title="编辑活动" :visible.sync="editVisible" width="40vw">
      <el-form class="editActForm" ref="editActForm" :rules="rules" :model="form" label-width="90px">
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
            <el-input :disabled="true" v-model="form.activityname"></el-input>
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
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('editActForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    created() {
      this.getactivitylist()
      this.form.id = this.$store.state.id
      this.form.name = this.$store.state.name
    },
    data () {
      return {
        addid: '',
        deleteid: '',
        editVisible: false,
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
        // 获取该社团所有活动信息
        queryInfo: {
          type : '默认',
          query: '',
          // 当前页数
          pagenum: 1,
          // 每页显示多少数据
          pagesize: 4,
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
        activitylist: [
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
            introduce: '这是一个很虎虎虎虎虎虎的活动',
            attention: '这个活动只有群众才能jijijijjij参加',
            status: '已过期',
          }
        ],
        total: 1,

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
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.editVisible = false;
            this.editactivity()
            alert('提交申请!');
          } else {
            alert('表单填写有误!!');
            return false;
          }
        });
      },

      aclick() {
        this.$router.push('/home');
      },
      async getactivitylist() {
        const { data: res } = await this.$http.get('/clubmanage/editactivitypage', {
          params: this.queryInfo
        })
        if (res.meta.status !== 200) {
          return this.$message.error('获取用户列表失败！')
        }
        this.address = res.data.address
        this.activitylist = res.data.activitylist
        this.total = res.data.total
      },

      async deleteactivity () {
        const { data: res } = await this.$http.get('/clubmanage/deleteactivity', {
          params: this.deleteid
        })
        console.log(res.meta.status)
        if (res.meta.status !== 200) {
          return this.$message.error('删除社员失败！')
        }
        return this.$message.success('删除成功')
      },

      async editactivity() {
        const { data: res } = await this.$http.get('/clubmanage/editactivity', {
          params: this.form
        })
        console.log(res.meta.status)
        if (res.meta.status !== 200) {
          return this.$message.error('添加社员失败！')
        }
        return this.$message.success('新社员加入成功')
      },

      getRadioQuery() {
        console.log(this.queryInfo.type)
        this.getactivitylist()
      },

      handleDelete(index, row) {
        // 二次确认删除
        this.$confirm('确定要删除吗？', '提示', {
          type: 'warning'
        })
          .then(() => {
            // console.log(index)
            // console.log(row)
            this.deleteid = row.id
            this.deleteactivity()
            this.getactivitylist()
          })
          .catch(() => {});
      },

      handleEdit(index, row) {
        this.form.activityname = row.activityname
        this.form.type = row.type
        this.form.address = row.address
        this.form.introduce = row.introduce
        this.form.attention = row.attention
        this.form.contact = row.contact
        this.form.poster = row.poster

        this.editVisible = true;
      },

      // 监听 pagesize改变的事件
      handleSizeChange (newSize) {
        // console.log(newSize)
        this.queryInfo.pagesize = newSize
        this.getactivitylist()
      },
      // 监听 页码值 改变事件
      handleCurrentChange (newSize) {
        // console.log(newSize)
        this.queryInfo.pagenum = newSize
        this.getactivitylist()
      },
      // 监听 switch开关 状态改变
      async userStateChanged (userInfo) {
        // console.log(userInfo)
        const { data: res } = await this.$http.put(
          `users/${userInfo.id}/state/${userInfo.mg_state}`
        )
        if (res.meta.status !== 200) {
          userInfo.mg_state = !userInfo.mg_state
          return this.$message.error('更新用户状态失败')
        }
        this.$message.success('更新用户状态成功！')
      },
      // 监听 添加用户对话框的关闭事件
      addDialogClosed () {
        this.$refs.addUserFormRef.resetFields()
      },

    }
  }
</script>

<style lang="less" scoped>
  .up-name-a{
    color: #222;
    text-decoration: none;
  }

  .up-name-a:hover{
    color: #00a1d6;
  }

  .el-input-group__append{
    background-color: #ffc609!important;
    color: white !important;
  }

  .upsearch{
    background-color: #ffc609 !important;
    color: #fff !important;
  }

  .upsearch:hover{
    background-color: #ff7700 !important;
    color: white !important;
  }

  .cell{
    padding-bottom: 0px;
  }
</style>
