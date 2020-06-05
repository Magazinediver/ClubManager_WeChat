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

### 用户登录接口:

> login

#### 前端：

``` json
queryInfo: {
    userid:'',	//学号/工号
    password:''		//密码
},

```

#### 后端：

``` json
res:{
	data:{
        identity：'管理员',
		userid: '31701074'
        name ：'黄驿涵',
		token : 			"BearereyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjUwMCwicmlkIjowLCJpYXQiOjE1MTI1NDQyOTksImV4cCI6MTUxMjYzMDY5OX0.eGrsrvwHm-tPsO9r_pxHIQ5i5L1kX9RX444uwnRGaIM"
		}
	meta: {
		status: 200,
		msg: "successful"
	}
}

```



### 用户注册接口

> register

#### 前端：

``` json
addUserForm: {
	userid: '',
	password: '',
    name: '',
    email: '',
	},
```

#### 后端：

```json
res:{
	meta: {
		status: 200,
		msg: "successful"
	}
}
```



### 首页信息请求

> homepage

#### 前端：

``` json

```

#### 后端：

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
        todoList：todoList: [  //公告栏
            {
                title: '社团招新活动将在6月20号举办',
            },
            {
                title: '社长请于6月13日在理四306集合开会',
            },
      	],
	}
	meta: {
		status: 200,
		msg: "successful"
	}
}
```



### 饼图请求

> clubpie//社团饼图	activitypie//活动饼图

#### 前端：

``` json

```

#### 后端：

``` json
res:{//活动饼图
	data:{
        //如果是活动饼图请求，/activitypie
        title:[  //图例
        	'兴趣爱好','学术创新','公益服务','体育运动'
      	],
       	data: [  //饼图数据
        	{value: 10, name: '兴趣爱好'},
        	{value: 5, name: '学术创新'},
          	{value: 15, name: '公益服务'},
          	{value: 25, name: '体育运动'},
      	],
        //如果是活动饼图请求，/clubpie
        title:[  //图例
        	'兴趣','游戏','艺术','组织','志愿','动漫','学术','运动'
      	],
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
	}
	meta: {
		status: 200,
		msg: "successful"
	}
}
```

