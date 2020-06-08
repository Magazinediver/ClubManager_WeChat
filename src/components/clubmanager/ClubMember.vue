<template>
  <div>

    <!-- 卡片视图 -->
    <el-card style="padding: 20px">
      <!-- 搜索 添加 -->
      <el-row :gutter="20">

        <el-col :span="14">
          <el-input placeholder="请输入你想查询的成员" v-model="queryInfo.query" clearable @clear="getmemberlist" @keyup.enter.native="getmemberlist">
            <el-button class="upsearch" slot="append" icon="el-icon-search" @click="getmemberlist"></el-button>
          </el-input>
        </el-col>

        <el-col :span="9" :offset="1">
          <el-radio-group @change="getRadioQuery" v-model="queryInfo.type">
            <el-radio-button label="全部"></el-radio-button>
            <el-radio-button label="待审核"></el-radio-button>
            <el-radio-button label="正式成员"></el-radio-button>
          </el-radio-group>
        </el-col>
      </el-row>


      <!-- 用户列表区域 -->
      <el-table
        :data="memberlist" stripe>
        <!-- stripe: 斑马条纹
        border：边框-->
        <el-table-column type="index" label="#"></el-table-column>
<!--        <el-table-column prop="mid" width="100" label="学号"></el-table-column>-->
        <el-table-column prop="id" label="学号"></el-table-column>
        <el-table-column prop="name" label="用户名"></el-table-column>
        <el-table-column label="头像/查看大图"  width="200" align="center">
          <template slot-scope="scope">
            <el-image
              style="border-radius: 50%;width: 60px;height: 60px"
              class="table-td-thumb"
              :src="scope.row.face"
              :preview-src-list="[scope.row.face]"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="appintime" label="申请/入社时间"></el-table-column>
<!--        <el-table-column prop="Status" label="状态"></el-table-column>-->
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.status==='社团成员'?'success':(scope.row.status==='待审核'?'danger':'')"
            >{{scope.row.status}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.status==='待审核'"
              type="text"
              icon="el-icon-edit"
              @click="handleAdd(scope.$index, scope.row)"
            >同意申请</el-button>
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


  </div>
</template>

<script>
export default {
  created() {
    this.getmemberlist()
  },
  data () {
    return {
      addid: '',
      deleteid: '',
      // 获取用户列表查询参数对象
      queryInfo: {
        type : '默认',
        query: '',
        // 当前页数
        pagenum: 1,
        // 每页显示多少数据
        pagesize: 4,
      },
      memberlist: [
        {
          id:'31710074',
          name: '黄驿涵',
          face: 'https://ae01.alicdn.com/kf/H86c0411c10b04d158935b666780c77af4.jpg',
          appintime: '2020-6-5',
          status: '社团成员',
        },
        {
          id:'31710063',
          name: '王靖平',
          face: 'https://ae01.alicdn.com/kf/H5a1b68ed1a424006827c91d2b96c4cd5J.jpg',
          appintime: '2020-6-6',
          status: '待审核',
        }
      ],
      total: 1,


      // 所有角色数据列表
      rolesLsit: [],
      // 已选中的角色Id值
      selectRoleId: ''
    }
  },
  methods: {
    aclick() {
      this.$router.push('/home');
    },
    async getmemberlist () {
      const { data: res } = await this.$http.get('/clubmanage/clubmember', {
        params: this.queryInfo
      })
      if (res.meta.status !== 200) {
        return this.$message.error('获取用户列表失败！')
      }
      this.memberlist = res.data.memberlist
      this.total = res.data.total
    },

    async deletemember () {
      const { data: res } = await this.$http.get('/clubmanage/deletemember', {
        params: this.deleteid
      })
      console.log(res.meat.status)
      if (res.meta.status !== 200) {
        return this.$message.error('删除社员失败！')
      }
      return this.$message.success('删除成功')
    },

    async addmember () {
      const { data: res } = await this.$http.get('/clubmanage/addmember', {
        params: this.addid
      })
      console.log(res.meat.status)
      if (res.meta.status !== 200) {
        return this.$message.error('添加社员失败！')
      }
      return this.$message.success('新社员加入成功')
    },

    getRadioQuery() {
      console.log(this.queryInfo.type)

      this.getmemberlist()
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
          this.deletemember()
          this.getmemberlist()
        })
        .catch(() => {});
    },

    handleAdd(index, row) {
      // 二次确认删除
      this.$confirm('确定要同意加入嘛吗？', '提示', {
        type:'warning'
      })
        .then(() => {
          // console.log(index)
          // console.log(row)
          this.addid = row.id
          console.log(this.addid)
          this.addmember()
          this.getmemberlist()
        })
        .catch(() => {});
    },

    // 监听 pagesize改变的事件
    handleSizeChange (newSize) {
      // console.log(newSize)
      this.queryInfo.pagesize = newSize
      this.getmemberlist()
    },
    // 监听 页码值 改变事件
    handleCurrentChange (newSize) {
      // console.log(newSize)
      this.queryInfo.pagenum = newSize
      this.getmemberlist()
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
</style>
