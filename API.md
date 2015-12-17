|       访问路径      |        页面        |                      描述                         |
|:-------------------:|:------------------:|:-------------------------------------------------:|
| /                   | index.html         | 不需要登录，可以直接访问                          |
| /home               | home.html          | 必须用户登录以后，才可以访问                      |
| /login              | login.html         | 登录页面，用户名密码输入正确，自动跳转到home.html |
| /logout             | 无                 | 退出登录后，自动跳转到index.html                  |
| /register           | register.html      | 用户注册页面                                      |
| /user               | user.html          | 管理员和用户个人中心，有区别                      |
| /user/new           | userAdd.html       | 管理员添加用户                                    |
| /user/:id           | user.html          | 管理员管理全部用户                                |
| /user/:id/edit      | user.html          | 管理员编辑用户资料                                |
| /user/:id/delete    | user.html          | 管理员删除用户                                    |
| /depart             | depart.html        | 管理员和用户个人中心，有区别                      |
| /depart/new         | departAdd.html     | 管理员添加用户                                    |
| /depart/:id         | depart.html        | 管理员管理全部用户                                |
| /depart/:id/edit    | depart.html        | 管理员编辑用户资料                                |
| /depart/:id/delete  | depart.html        | 管理员删除用户                                    |
| /apply              | apply.html         | 管理员和用户个人中心，有区别                      |
| /apply/new          | applyAdd.html      | 管理员添加用户                                    |
| /apply/:id          | apply.html         | 管理员管理全部用户                                |
| /apply/:id/edit     | apply.html         | 管理员编辑用户资料                                |
| /apply/:id/delete   | apply.html         | 管理员删除用户                                    |
| /notice             | notice.html        | 管理员和用户个人中心，有区别                      |
| /notice/new         | noticeAdd.html     | 管理员添加用户                                    |
| /notice/:id         | notice.html        | 管理员管理全部用户                                |
| /notice/:id/edit    | notice.html        | 管理员编辑用户资料                                |
| /notice/:id/delete  | notice.html        | 管理员删除用户                                    |