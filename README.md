# 当当接口文档

+ 后端项目地址：
    + [dangServer_java](https://github.com/Ethereal-bang/dangServer_java)
    + [dangServer_express](https://github.com/Ethereal-bang/dang_server)

+ 返回数据格式：

    ```json
    {
      flag: [true, false],
      data: ,
      msg: "",
    }
    ```

    > 出错信息会返回在 msg 字段。

+ 请求地址：http://localhost:3001

+ 均为 GET 请求



# User /users

+ MySQL：

    ![image-20220512080448234](https://gitee.com/ethereal-bang/images/raw/master/20220512080722.png)





## 返回所有用户信息 /_showAll



## 获取用户信息 /getUser/:tel

> 未使用

+ Return data——{ `user`:  user}



## 注册 /register

+ Param——`tel` required、`password` required
+ Return data——{ `user`:  user}
+ Return msg——注册成功 / 用户已存在



## 登录 /login

+ Param——`tel` required、`password` required
+ Return data——{ `user`:  user}
+ Return msg——登录成功 / 用户不存在 / 密码错误



# Goods

+ MySQL:

    ![image-20220511163350980](https://gitee.com/ethereal-bang/images/raw/master/20220511163353.png)



## 查看所有 /showAll

+ Return data——{ `count`、`list` }



## 删除所有 /_deleteAll

> Java 后端：暂没实现

+ Return data——"删除成功${数目}"



## 获取相应类型商品 /getByType/:type

+ Params——`type` required ["book", "clock", "bookRanking"]

+ Return data——{ `count`, `list` }
+ Return msg——"查询成功：${`type`}"



## 获取某商品信息 /getById/:id

+ Return data——{`goods`: Goods}
+ Return msg——"查询成功：${`id`}"



## 搜索商品列表 /search

> Node 后端：
>
> 1. 未更改接口调用数据
> 2. 未更改查询空字符串时 Return data

+ Params——`name`
+ Return msg——"查询成功：${`name`}"
+ Return data——{`list`: Goods[] }



# Ad /ad

![image-20220512000327716](https://gitee.com/ethereal-bang/images/raw/master/20220512000328.png)



## 查看所有 /_showAll

> Java 后端暂未实现

+ Return data——{ `count`, `list` }



## 查询相应位置的广告 /getByPos/:pos

+ Param——pos

+ Return Data——{ `count`, `list` }

+ Return Msg——"查询成功${pos}"



## 添加 /_add

> Java 后端暂未实现

+ Param——`name`、`position`、`img`、`link`



# ShoppingCart	/shoppingCart

+ MySQL:

    ![image-20220511232259081](https://gitee.com/ethereal-bang/images/raw/master/20220511232301.png)



## 添加到购物车 /:tel/addGoods

> Node 后端：暂无错误处理

+ Param——`id` required、`num` required
+ Return Data：{name: `书名`, num: `数目`}
+ Return msg：“添加失败”



## 查看购物车 /:shoppingCartId/show

+ Return Data：{`count`、`price`、`goodsList`}



## 清空购物车 /:tel/reset

> Java 后端暂未实现



