<template>
  <div>

    <!-- 卡片视图 -->
    <el-card style="padding: 20px">
      <!-- 搜索 添加 -->
      <el-row :gutter="20">

        <el-col :span="14">
          <el-input placeholder="请输入你想查询的up主" v-model="queryInfo.query" clearable @clear="getclublist" @keyup.enter.native="getclublist">
            <el-button class="upsearch" slot="append" icon="el-icon-search" @click="getclublist"></el-button>
          </el-input>
        </el-col>

        <el-col :span="9" :offset="1">
          <el-radio-group @change="getRadioQuery" v-model="queryInfo.type">
            <el-radio-button label="默认"></el-radio-button>
            <el-radio-button label="成立时间近"></el-radio-button>
            <el-radio-button label="成立时间远"></el-radio-button>
          </el-radio-group>
        </el-col>
      </el-row>


      <!-- 用户列表区域 -->
      <el-table
        :data="clublist" stripe>
        <!-- stripe: 斑马条纹
        border：边框-->
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="id" width="100" label="社长学号"></el-table-column>
        <el-table-column prop="name" width="100" label="社长姓名"></el-table-column>
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
        <el-table-column prop="clubname" width="120" label="社团名"></el-table-column>
        <el-table-column prop="type" width="80" label="社团类型"></el-table-column>
        <el-table-column prop="address" width="100" label="社团据点"></el-table-column>

        <el-table-column prop="notice"  label="公告"></el-table-column>
        <el-table-column prop="describe" label="社团描述"></el-table-column>
        <el-table-column label="状态" width="100" align="center">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.status==='正常运行'?'success':(scope.row.status==='已废弃'?'danger':'')"
            >{{scope.row.status}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120" align="center">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.status==='正常运行'"
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
      this.getclublist()

    },
    data () {
      return {
        addid: '',
        deleteid: '',
        // 获取该社团所有活动信息
        queryInfo: {
          type : '默认',
          query: '',
          // 当前页数
          pagenum: 1,
          // 每页显示多少数据
          pagesize: 4,
        },
        clublist: [
          {
            id:'31701074',
            name:'黄驿涵',
            clubname:'流云梦社',
            poster:'https://ae01.alicdn.com/kf/Hfa67dd673ebd4dfc8d1fcedd140c8564h.jpg',
            type:'兴趣',
            describe:'这是一个很有梦想的社团',
            address:'文一201',
            notice:'我们社团人满了不招了',
            status:'正常运行',
          },
          {
            id:'31701063',
            name:'王靖平',
            clubname:'棋社',
            poster:'https://ae01.alicdn.com/kf/H133eac1ed0fb4a54a55445ef6b455c0dw.jpg',
            type:'运动',
            describe:'这是一个有很多高人的社团',
            address:'教一107',
            notice:'我们只收没有段位的围棋新手',
            status:'已废止',
          }
        ],
        total: 1,


      }
    },
    methods: {



      aclick() {
        this.$router.push('/home');
      },
      async getclublist() {
        const { data: res } = await this.$http.get('/clubmanage/member', {
          params: this.queryInfo
        })
        if (res.meta.status !== 200) {
          return this.$message.error('获取用户列表失败！')
        }
        this.activitylist = res.data
        this.total = res.total
      },

      async deleteclub () {
        const { data: res } = await this.$http.get('/clubmanage/deleteclub', {
          params: this.deleteid
        })
        console.log(res.data.status)
        if (res.meta.status !== 200) {
          return this.$message.error('删除社团失败！')
        }
        return this.$message.success('删除社团成功')
      },


      getRadioQuery() {
        console.log(this.queryInfo.type)
        this.getclublist()
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
            this.deleteclub()
            this.getclublist()
          })
          .catch(() => {});
      },


      // 监听 pagesize改变的事件
      handleSizeChange (newSize) {
        // console.log(newSize)
        this.queryInfo.pagesize = newSize
        this.getclublist()
      },
      // 监听 页码值 改变事件
      handleCurrentChange (newSize) {
        // console.log(newSize)
        this.queryInfo.pagenum = newSize
        this.getclublist()
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
