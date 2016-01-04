# 接口文档


### 登陆接口

---

#### 请求
| Route | HTTP Verb | Data | Description |
|:-------------:|:-------------|:-------------|:-------------|
| /login | POST | uname&upwd | 登陆接口 |

#### 返回
| Code | Msg | Data | Description |
|:-------------:|:-------------|:-------------|:-------------|
| 1 | Login success |  | 登陆成功 |
| 0 | Err |  | 未定义错误，由服务端返回 |
| -1 | User not exist |  | 账号不存在 |
| -2 | Password incorrect |  | 密码错误 |


### 登出接口

---

#### 请求
| Route | HTTP Verb | Data | Description |
|:-------------:|:-------------|:-------------|:-------------|
| /logout | GET |  | 登出接口 |

#### 返回
| Code | Msg | Data | Description |
|:-------------:|:-------------|:-------------|:-------------|
| 1 | Logout success |  | 登出成功|


### 用户管理接口

---

#### 请求
| Route | HTTP Verb | Data | Description |
|:-------------:|:-------------|:-------------|:-------------|
| /login | POST | uname&upwd | 登陆接口 |
| /logout | GET |  | 登出接口 |

#### 返回
| Code | Msg | Data | Description |
|:-------------:|:-------------|:-------------|:-------------|
| 0 | Not logged in |  | 未登录 |


### 部门管理接口

---

#### 请求
| Route | HTTP Verb | Data | Description |
|:-------------:|:-------------|:-------------|:-------------|
| /login | POST | uname&upwd | 登陆接口 |

#### 返回
| Code | Msg | Data | Description |
|:-------------:|:-------------|:-------------|:-------------|
| 0 | Not logged in |  | 未登录 |


### 工单管理接口

---

#### 请求
| Route | HTTP Verb | Data | Description |
|:-------------:|:-------------|:-------------|:-------------|
| /login | POST | uname&upwd | 登陆接口 |

#### 返回
| Code | Msg | Data | Description |
|:-------------:|:-------------|:-------------|:-------------|
| 0 | Not logged in |  | 未登录 |


### 通知管理接口

---

#### 请求
| Route | HTTP Verb | Data | Description |
|:-------------:|:-------------|:-------------|:-------------|
| /login | POST | uname&upwd | 登陆接口 |

#### 返回
| Code | Msg | Data | Description |
|:-------------:|:-------------|:-------------|:-------------|
| 0 | Not logged in |  | 未登录 |
