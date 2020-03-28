## 给仓库增加子仓：
    假设主仓叫做mainProject，现在主仓内部需要用到两个子仓，repo1和repo2。
    repo1和repo2是两个组分别开发的，
    需要将repo1和repo2作为子仓添加到主仓

- 在主仓内 git submodule add https://repo1.git
- 在主仓内 git submodule add https://repo2.git
- 此时在主仓目录下会生成如下的文件 ： .gitmodules，同时两个子仓也会被添加到主仓内，需要分别进入两个子仓拉取最新代码
    [submodule "liba"]
        path = liba
        url = https://repo1.git
    [submodule "libb"]
        path = libb
        url = https://repo2.git
- git commit，将两个子仓commit进入子仓。


## 更新子仓：
    - 可以在两个子仓内分别进行fetch 和 pull，拉取最新代码
    - 也可以git submodule update --remote liba更新子仓

## 删除子仓
   - git rm --cached liba从版本控制中删除子仓
   - 删除.gitmodules中的模块
   - 删除.git/config 中的模块
   - rm -rf .git/modules/liba删除.git下的缓存模块

## clone含有子模块的仓库
   - git clone --recursive https://github.com/imtianx/MainProject.git  
   或者
   - git clone  https://github.com/imtianx/MainProject.git  
    git submodule init
    git submodule update
