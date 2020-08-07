# readme
+ 项目说明文档
    1. 一会回合项目放在一起
    2. 作为项目说明文档
    
## git init
1. 把当前目录初始化为版本库
2. 当前目录下会生成一个隐藏文件 .git

## git add 文件名
1. 把当前目录下的谋个文件提交到暂存区
2. git add readme.md 把这个文件提交到暂存区
3. git add . 提交当前目录所有变动提交到暂存区

## git status
查看当前目录状态
查看当前目录状态（新增、删除、修改）

## git commit -m '提交注释'
1. 把暂存区的内容提交到本地仓库

## 本地仓库的三个组成部分
1. 工作区（实际持有文件的）
2. 暂存区  == （隐藏的.git）
3. 本地仓库 （ 看不见）

## git log
1. 查看日志

## git reflog
1. 查看操作日志（简单版）

## git diff 文件名
1. 查看文件变更信息

## git reset --hard 版本号
1. 回退到指定版本（可用git reflog 查看版本号）
2. 回退到上次 hard^

## 主要操作
1. git init 创建版本库
2. git add 文件名  -->工作区提交到暂存区
3. git commit -m '注释' -->暂存区到本地仓库  

## 远程仓库

## git remote add origin https://github.com/LiYang08/GP03-test.git（仓库地址）
1. 把本地仓库与远程仓库关联

## git remote -v 
1. 查看本地仓库关联的远程仓库地址

## git push -u origin master
1. git push 本地仓库提交到远程仓库
2. -u origin master 设置默认的远程拉取地址
3. 执行完这个命令之后，以后可以直接git push到远程仓库的master分支

## git remote rm origin 
1. 删除输错的远程仓库
2. $ git remote add origin https://github.com/LiYang08/GP03-test.git
