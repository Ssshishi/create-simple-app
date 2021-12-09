# create-simple-app

简单的脚手架 npm包

### 安装
```sh
 npm install maria-cli -g
```

### 运行
```sh
  npx maria-cli create <template-project>
  # 或者
  maria-cli create <template-project>
```

### 本地运行

```sh
 // 本地安装
 git clone git@github.com:Ssshishi/create-simple-app.git 
 
 # 运行 
 yarn build
 
 # 建立软链接
 npm link
 
 # 创建新项目
 maria-cli create <template-project>
```



### 核心依赖

- commander 命令行工具
- download-git-repo git 仓库代码下载
- chalk 命令行输出样式美化
- Inquirer.js 命令行交互
- ora 命令行加载中效果
- didyoumean 脚本命令匹配
- fs-extra fs 的替代品。
- log-symbols 日志着色
- semver 语义化日志控制
- validate-npm-package-name 校验包名

### 
