# 接口文档

http[s]://{domain}/api/{release}/{resource}/{resource_id}?{query_string}

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


### 登陆检测

---

#### 请求
| Route | HTTP Verb | Data | Description |
|:-------------:|:-------------|:-------------|:-------------|
| /isLogin | GET |  | 登陆检测 |

#### 返回
| Code | Msg | Data | Description |
|:-------------:|:-------------|:-------------|:-------------|
| 1 |Is login |  | 已经登陆|
| -99 | Not logged in |  | 未登录 |

### 添加用户接口

---

#### 请求
| Route | HTTP Verb | Data | Description |
|:-------------:|:-------------|:-------------|:-------------|
| /user/add | POST | | 添加用户接口 |

#### 返回
| Code | Msg | Data | Description |
|:-------------:|:-------------|:-------------|:-------------|
| 2 | exist |  | 用户已经存在 |
| 1 | success |  | 添加成功 |
| 0 | err |  | 添加失败 |


### 添加部门接口

---

#### 请求
| Route | HTTP Verb | Data | Description |
|:-------------:|:-------------|:-------------|:-------------|
| /depart/add | POST | | 添加部门接口 |

#### 返回
| Code | Msg | Data | Description |
|:-------------:|:-------------|:-------------|:-------------|
| 2 | exist |  | 部门已经存在 |
| 1 | success |  | 添加成功 |
| 0 | err |  | 添加失败 |

### 添加工单接口

---

#### 请求
| Route | HTTP Verb | Data | Description |
|:-------------:|:-------------|:-------------|:-------------|
| /apply/add | POST | | 添加工单接口 |

#### 返回
| Code | Msg | Data | Description |
|:-------------:|:-------------|:-------------|:-------------|
| 2 | exist |  | 工单已经存在 |
| 1 | success |  | 添加成功 |
| 0 | err |  | 添加失败 |

### 添加通知接口

---

#### 请求
| Route | HTTP Verb | Data | Description |
|:-------------:|:-------------|:-------------|:-------------|
| /notice/add | POST | | 添加通知接口 |

#### 返回
| Code | Msg | Data | Description |
|:-------------:|:-------------|:-------------|:-------------|
| 2 | exist |  | 通知已经存在 |
| 1 | success |  | 添加成功 |
| 0 | err |  | 添加失败 |

### 查询具体用户接口

---

#### 请求
| Route | HTTP Verb | Data | Description |
|:-------------:|:-------------|:-------------|:-------------|
| /user/:id | GET | | 查询具体用户接口 |

#### 返回
| Code | Msg | Data | Description |
|:-------------:|:-------------|:-------------|:-------------|
| -2 | exist |  | 用户不存在 |
| 1 | success |  | 查询具体成功 |
| 0 | err |  | 查询具体失败 |


### 查询具体部门接口

---

#### 请求
| Route | HTTP Verb | Data | Description |
|:-------------:|:-------------|:-------------|:-------------|
| /depart/:id | GET | | 查询具体部门接口 |

#### 返回
| Code | Msg | Data | Description |
|:-------------:|:-------------|:-------------|:-------------|
| -2 | exist |  | 部门不存在 |
| 1 | success |  | 查询具体成功 |
| 0 | err |  | 查询具体失败 |

### 查询具体工单接口

---

#### 请求
| Route | HTTP Verb | Data | Description |
|:-------------:|:-------------|:-------------|:-------------|
| /apply/:id | GET | | 查询具体工单接口 |

#### 返回
| Code | Msg | Data | Description |
|:-------------:|:-------------|:-------------|:-------------|
| -2 | exist |  | 工单不存在 |
| 1 | success |  | 查询具体成功 |
| 0 | err |  | 查询具体失败 |

### 查询具体通知接口

---

#### 请求
| Route | HTTP Verb | Data | Description |
|:-------------:|:-------------|:-------------|:-------------|
| /notice/:id | GET | | 查询具体通知接口 |

#### 返回
| Code | Msg | Data | Description |
|:-------------:|:-------------|:-------------|:-------------|
| -2 | exist |  | 通知不存在 |
| 1 | success |  | 查询具体成功 |
| 0 | err |  | 查询具体失败 |


### 修改用户接口

---

#### 请求
| Route | HTTP Verb | Data | Description |
|:-------------:|:-------------|:-------------|:-------------|
| /user/:id/edit | PUT | data | 修改用户接口 |

#### 返回
| Code | Msg | Data | Description |
|:-------------:|:-------------|:-------------|:-------------|
| -2 | exist |  | 用户不存在 |
| 1 | success |  | 修改成功 |
| 0 | err |  | 修改失败 |


### 修改部门接口

---

#### 请求
| Route | HTTP Verb | Data | Description |
|:-------------:|:-------------|:-------------|:-------------|
| /depart/:id/edit | PUT | data | 修改部门接口 |

#### 返回
| Code | Msg | Data | Description |
|:-------------:|:-------------|:-------------|:-------------|
| -2 | exist |  | 部门不存在 |
| 1 | success |  | 修改成功 |
| 0 | err |  | 修改失败 |

### 修改工单接口

---

#### 请求
| Route | HTTP Verb | Data | Description |
|:-------------:|:-------------|:-------------|:-------------|
| /apply/:id/edit | PUT | data | 修改工单接口 |

#### 返回
| Code | Msg | Data | Description |
|:-------------:|:-------------|:-------------|:-------------|
| -2 | exist |  | 工单不存在 |
| 1 | success |  | 修改成功 |
| 0 | err |  | 修改失败 |

### 修改通知接口

---

#### 请求
| Route | HTTP Verb | Data | Description |
|:-------------:|:-------------|:-------------|:-------------|
| /notice/:id/edit | PUT | data | 修改通知接口 |

#### 返回
| Code | Msg | Data | Description |
|:-------------:|:-------------|:-------------|:-------------|
| -2 | exist |  | 通知不存在 |
| 1 | success |  | 修改成功 |
| 0 | err |  | 修改失败 |


### 删除用户接口

---

#### 请求
| Route | HTTP Verb | Data | Description |
|:-------------:|:-------------|:-------------|:-------------|
| /user/:id/delete | DELETE | data | 删除用户接口 |

#### 返回
| Code | Msg | Data | Description |
|:-------------:|:-------------|:-------------|:-------------|
| -2 | exist |  | 用户不存在 |
| 1 | success |  | 删除成功 |
| 0 | err |  | 删除失败 |


### 删除部门接口

---

#### 请求
| Route | HTTP Verb | Data | Description |
|:-------------:|:-------------|:-------------|:-------------|
| /depart/:id/delete | DELETE | data | 删除部门接口 |

#### 返回
| Code | Msg | Data | Description |
|:-------------:|:-------------|:-------------|:-------------|
| -2 | exist |  | 部门不存在 |
| 1 | success |  | 删除成功 |
| 0 | err |  | 删除失败 |

### 删除工单接口

---

#### 请求
| Route | HTTP Verb | Data | Description |
|:-------------:|:-------------|:-------------|:-------------|
| /apply/:id/delete | DELETE | data | 删除工单接口 |

#### 返回
| Code | Msg | Data | Description |
|:-------------:|:-------------|:-------------|:-------------|
| -2 | exist |  | 工单不存在 |
| 1 | success |  | 删除成功 |
| 0 | err |  | 删除失败 |

### 删除通知接口

---

#### 请求
| Route | HTTP Verb | Data | Description |
|:-------------:|:-------------|:-------------|:-------------|
| /notice/:id/delete | DELETE | data | 删除通知接口 |

#### 返回
| Code | Msg | Data | Description |
|:-------------:|:-------------|:-------------|:-------------|
| -2 | exist |  | 通知不存在 |
| 1 | success |  | 删除成功 |
| 0 | err |  | 删除失败 |

