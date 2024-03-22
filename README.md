## picgo-plugin-torna

[![下载](https://img.shields.io/npm/dm/picgo-plugin-bilibili.svg?color=brightgreen)](https://npmcharts.com/compare/picgo-plugin-smms-user?minimal=true)
[![版本](https://img.shields.io/npm/v/picgo-plugin-bilibili.svg?color=brightgreen)](https://www.npmjs.com/package/picgo-plugin-smms-user)
[![许可](https://img.shields.io/badge/license-mit-brightgreen.svg)](https://github.com/xlzy520/picgo-plugin-smms-user/blob/master/License)

为 [PicGo](https://github.com/Molunerfinn/PicGo) 开发的一款插件，新增了torna图床，用于存储图片。
使用用户动态的图片上传API。填写token和myurl即可，获取方式在下面。


### 安装

- 离线安装

  克隆该项目，复制项目到 以下目录：
    - Windows: `%APPDATA%\picgo\`
    - Linux: `$XDG_CONFIG_HOME/picgo/` or `~/.config/picgo/`
    - macOS: `~/Library/Application\ Support/picgo/`

  切换到新目录执行 `npm install ./picgo-plugin-torna`，然后重启应用即可。


### 获取torna token

1. 登录[torna]
2. 按`F12`打开控制台
3. 找到`Authorization`复制Bearer后面的内容 作为token
4. 找到host作为myurl


