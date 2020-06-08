# 社团管理系统

> web端说明文档
>
> 项目地址：https://github.com/Magazinediver/ClubManager_WeChat



## WEB端用户模块设计

### 登录

+ 学号/工号
+ 密码

### 注册

+ 姓名
+ 学号/工号
+ 密码
+ 确认密码
+ 电子邮件

### 修改密码

+ 学号/工号
+ 原密码
+ 新密码



## WEB端功能模块设计

### 社团dashboard功能面板

+ 社团海报展示swiper
+ 我要建社团button
  + 社团申请表
    + 申请者学号（帮填）
    + 申请者姓名（帮填）
    + 社团名
    + 社团海报
    + 申请社团类别（全部/兴趣/游戏/艺术/组织/志愿/动漫/学术/运动）
    + 社团描述
    + 社团据点
    + 社团公告
+ 数据展示echart
  + 社团类型比率
  + 活动类型比率
+ 当前用户信息展示
  + 身份（游客、社长、管理员）
  + 工号/学号
  + 真实姓名

### 社团管理模块

> （仅社长可见）

+ 社员管理

  + 成员目录

  	+ 通过社员申请
  	+ 踢出社员

+ 申请活动
  + 活动申请表
    + 活动海报
    + 活动名
    + 活动时间
    + 活动类型（全部/兴趣爱好/学术创新/公益服务/体育运动）
    + 活动场地
    + 联系人
    + 主办社团（当前社团/帮填）
    + 活动介绍 
    + 活动须知

+ 活动编辑
  + 解散活动
  + 编辑活动（同活动申请表/须再次审核）

+ 社团管理
  	+ 解散社团
  + 设置社团大标签（1个）
  + 设置社团小标签（3个）
  + 设置公告 notice
  + 设置描述 describe
  + 设置海报

### 审核模块 （仅管理员可见）

+ 社团成立申请
+ 社团解散申请
+ 活动成立申请
+ 取消活动申请
+ 社团强制干预
  + 社团目录
  + 搜索功能
    + 选定社团后给社团管理里模块

## WEB端不同身份功能及信息

### 游客

1. 浏览Dashboard
2. 申请成立社团

### 社长

1. 解散社团
2. 管理本社团成员
3. 申请活动
4. 取消活动

### 管理员

1. 审核社团成立/解散
2. 审核活动创建/取消
3. 强制干预社团

### 社员（小程序和web共用）

+ 社员状态（待审核状态、成员状态）

+ 昵称

+ 头像

+ 学号（选填）
+ 真实姓名（选填）

+ 邮箱 （选填）

+ 手机 （选填）



## 接口

> baseUrl : http://121.36.153.113:8000/clubmanage/



### 登录页

#### 用户登录接口:

> login

前端

``` json
queryInfo: {
    uid:'',	//学号/工号
    password:''		//密码
},

```

后端

``` json
res:{
	data:{
        identity：'管理员', //有普通用户，社长，管理员三种
        name ：'黄驿涵',
		token : 			"BearereyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjUwMCwicmlkIjowLCJpYXQiOjE1MTI1NDQyOTksImV4cCI6MTUxMjYzMDY5OX0.eGrsrvwHm-tPsO9r_pxHIQ5i5L1kX9RX444uwnRGaIM"
		}
	meta: {
		status: 200,
		msg: "successful"
	}
}

```



### 注册页

#### 用户注册接口

> regist

前端

``` json
addUserForm: {
	id: '',
	password: '',
    name: '',
    email: '',
},
```

后端

```json
res:{
	meta: {
		status: 200,
		msg: "successful"
	}
}
```



### 密码修改页

#### 用户修改密码接口

> changepwd

前端

``` json
resetForm: {
	id: '',
	password: '',
	cpassword: '',
},
```

后端

```json
res:{
	meta: {
		status: 200,
		msg: "successful"
	}
}
```



### 首页

#### 首页信息请求

> homepage

前端

``` json

```

后端

``` json
res:{
	data:{
        pic:[  //轮播图片
        	'https://ae01.alicdn.com/kf/H06978a26753d4c07bf899f39aef2949bf.jpg',
        	'https://ae01.alicdn.com/kf/H54a7061e839f4d7c9ddc5679868b89f7l.jpg',
        	'https://ae01.alicdn.com/kf/H0fd06a63db814c67a6160bdd8fa1ea1ag.jpg',
        	'https://ae01.alicdn.com/kf/Hefdf7d749bdd46ef8f1685f87bd72b74E.jpg',
        	'https://ae01.alicdn.com/kf/H54672b9fa07e49e58b06b6c37eeb5f1fh.jpg',
        	'https://ae01.alicdn.com/kf/H2fde6e4069784393b181e707710fa673b.jpg',
      	],
        todoList: [  //公告栏
            {
                title: '社团招新活动将在6月20号举办',
            },
            {
                title: '社长请于6月13日在理四306集合开会',
            },
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
      ]
	},
    
	meta: {
		status: 200,
		msg: "successful"
	}
}
```



#### 饼图请求

> clubpie//社团饼图	activitypie//活动饼图

前端

``` json

```

后端

``` json
res:{//活动饼图
    //如果是活动饼图请求，/activitypie
    data: [  //饼图数据
    	{value: 10, name: '兴趣爱好'},
      	{value: 5, name: '学术创新'},
      	{value: 15, name: '公益服务'},
       	{value: 25, name: '体育运动'},
    ],
        
        
    //如果是活动饼图请求，/clubpie
    data: [  //饼图数据
    	{value: 10, name: '兴趣'},
       	{value: 5, name: '游戏'},
       	{value: 15, name: '艺术'},
       	{value: 25, name: '组织'},
       	{value: 20, name: '志愿'},
       	{value: 35, name: '动漫'},
       	{value: 30, name: '学术'},
       	{value: 40, name: '运动'}
   	],
	meta: {
		status: 200,
		msg: "successful"
	}
}
```



### 社员管理页

#### 社团成员列表获取接口

> clubmember    //用于获取列表，参数是为了搜索和排序

前端

``` json
queryInfo: {
        type : '默认',
        query: '',
        // 当前页数
        pagenum: 1,
        // 每页显示多少数据
        pagesize: 4,
},
```

后端

```json
res:{
    data: {
        memberlist: [  //成员列表
        {
          id:'31710074',
          name: '黄驿涵',
          face: 'https://ae01.alicdn.com/kf/H86c0411c10b04d158935b666780c77af4.jpg',
          registtime: '2020-6-5',
          status: '社团成员',
        },
        {
          id:'31710063',
          name: '王靖平',
          face: 'https://ae01.alicdn.com/kf/H5a1b68ed1a424006827c91d2b96c4cd5J.jpg',
          registtime: '2020-6-6',
          status: '待审核',
        }
      ],
      total: 1,  //返回的成员个数
    },
	meta: {
		status: 200,
		msg: "successful"
	}
}
```



#### 添加社员接口

> addmember    

前端

``` json
addid: '',
```

后端

```json
res:{
	meta: {
		status: 200,
		msg: "successful"
	}
}
```



#### 删除社员接口

> deletemember

前端

``` json
deleteid: '',
```

后端

```json
res:{
	meta: {
		status: 200,
		msg: "successful"
	}
}
```



### 创建活动页

#### 创建活动地点获取接口

> createactivitypage

前端

``` json

```

后端

```json
res:{
    data: {
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
    }
	meta: {
		status: 200,
		msg: "successful"
	}
}
```



#### 创建活动表单提交接口

> createactivity

前端

``` json
form:{
	id:'',  //申请人学号/工号
	name:'',  //申请人姓名
	activityname:'',  //活动名
	contact:'',  //联系人及联系方式
	poster:'',  //活动海报
	type:'',  //活动类型
	attention:'',  //活动须知
	address:'',  //活动地点
	introduce:'',  //活动简介
	date1:'',  //活动日期
	date2:''  //活动开始时间
},
```

后端

```json
res:{
	meta: {
		status: 200,
		msg: "successful"
	}
}
```



### 活动编辑页

#### 活动列表获取接口

> editactivitypage  //用于获取列表，参数是为了搜索和排序

前端

``` json
// 获取该社团所有活动信息
queryInfo: {
	type : '默认',
	query: '',
	// 当前页数
	pagenum: 1,
	// 每页显示多少数据
	pagesize: 4,
},
```

后端

```json
res:{
    data:{
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
        total: 1, //社团个数
    },
	meta: {
		status: 200,
		msg: "successful"
	}
}
```



#### 删除活动接口

> deleteactivity

前端

``` json
deleteid: '',
```

后端

```json
res:{
    data: {
    }
	meta: {
		status: 200,
		msg: "successful"
	}
}
```



#### 编辑活动接口

> editactivity

前端

``` json
form:{
	id:'',  //申请人学号/工号
	name:'',  //申请人姓名
	activityname:'',  //活动名
	contact:'',  //联系人及联系方式
	poster:'',  //活动海报
	type:'',  //活动类型
	attention:'',  //活动须知
	address:'',  //活动地点
	introduce:'',  //活动简介
	date1:'',  //活动日期
	date2:''  //活动开始时间
},
```

后端

```json
res:{
    data: {
    }
	meta: {
		status: 200,
		msg: "successful"
	}
}
```



### 社团编辑页

#### 编辑社团信息获取接口

> editclubpage

前端

``` json

```

后端

```json
res:{
    data: {
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
    }
	meta: {
		status: 200,
		msg: "successful"
	}
}
```



#### 编辑社团表单提交接口

> editclub

前端

``` json
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
```

后端

```json
res:{
    data: {}
	meta: {
		status: 200,
		msg: "successful"
	}
}
```



### 解散社团页

#### 编辑社团信息获取接口

> dismissclub

前端

``` json
form:{
	id:'',
	name:'',
	clubname:'流云梦社',
	reason:'', //解散理由
},
```

后端

```json
res:{
    data: {
    }
	meta: {
		status: 200,
		msg: "successful"
	}
}
```



### 审核社团页

#### 审核社团列表获取接口

> checkclubpage

前端

``` json

```

后端

```json
res:{
    data: {
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
	meta: {
		status: 200,
		msg: "successful"
	}
}
```



#### 审核社团提交接口

> checkclub

前端

``` json
queryInfo:{
          deleteClubName: '',
          refuseClubName: '',
          acceptClubName: '',
        },
```

后端

```json
res:{
    data: {
    }
	meta: {
		status: 200,
		msg: "successful"
	}
}
```



### 审核活动页

#### 审核活动列表获取接口

> checkactivitypage

前端

``` json

```

后端

```json
res:{
    data: {
        unread: [
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
            introduce: '这是一个很虎虎虎虎虎虎斤斤计较急急急急急急急急急急急急急急急啊啊啊啊啊啊的活动',
            attention: '这个活动只有群众才能jijijijjij参加',
            status: '已过期',
          }
        ],
        read: [
          {
            activityname: '动漫展会',
            poster: 'https://ae01.alicdn.com/kf/H54a7061e839f4d7c9ddc5679868b89f7l.jpg',
            date: '2020-6-6',
            type: '学术创新',
            address:'理四321',
            contact:'程序员 17315622345',
            introduce: '这是一个ddddddddd',
            attention: '这个活dddddddddddjeeeeeeee加',
            status: '已过期',
          }
        ],
    }
	meta: {
		status: 200,
		msg: "successful"
	}
}
```



#### 审核活动提交接口

> checkclub

前端

``` json
queryInfo:{
          deleteActivityName: '',
          refuseActivityName: '',
          acceptActivityName: '',
        },
```

后端

```json
res:{
    data: {
    }
	meta: {
		status: 200,
		msg: "successful"
	}
}
```



### 社团强制管理页

#### 社团管理列表获取接口

> forcemanage

前端

``` json
queryInfo: {
          type : '默认',
          query: '',
          // 当前页数
          pagenum: 1,
          // 每页显示多少数据
          pagesize: 4,
        },
```

后端

```json
res:{
    data: {
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
        total: 1, //社团个数
    }
	meta: {
		status: 200,
		msg: "successful"
	}
}
```



#### 社团删除接口

> deleteclub

前端

``` json
deleteid:''
```

后端

```json
res:{
    data: {
    }
	meta: {
		status: 200,
		msg: "successful"
	}
}
```



