# frontend
### 整体说明

技术栈：electron + vue3 setup script + js + vue-cli + less

vue3考虑到性能和大小，选择ElementUI作为组件库。

[electron](https://www.electronjs.org/zh/)使用的是21.4.2版本，要求chrome至少为106.0.5249.199版本，nodejs至少为16.16.0版本。

项目的搭建使用了[vue-cli-plugin-electron-builder](https://nklayman.github.io/vue-cli-plugin-electron-builder/)，另外参考了这个教程：https://www.bilibili.com/video/BV1FP4115739，开发之前可以先看看

目前没有找到合适的热更新方案，修改主进程的js代码可以重新加载窗口，修改vue代码以后只能在当前窗口实现热更新，如果修改vue代码以后报错，需要在background.js里保存一次才能重新加载窗口。

### 启动

```bash
npm run electron:serve
npm run serve //只启动vue
```

### 打包

```
npm run electron:build
npm run build //只打包vue
```

打包时需要从github下载三个工具，大概率会因为下载超时打包失败，需要挂梯子。

如果挂梯子还不行就需要自己去github下载，参考https://www.likecs.com/show-203969917.html

### Vue配置说明
* 代码格式检查使用`eslint-prettier`，配置项在`.eslintrc.js`中
* css预处理语言用的less
* 配置了自动引入，可以自动引入ref、useRouter等函数、elementui中的组件、在src/components下自定义的组件，配置项是`vue.config.js`中的`configureWebpack`
* 配置了tailwind
* 添加UI库时需要对`vue.config.js`中的`resolver`进行配置

### Electron配置说明

* electron的配置在`/src/background.js`中
* electron-builder的配置在`vue.config.js`中
* 目前不允许使用外部链接引入图片、代码等，如果需要可以放到本地或者修改`public/index.html`中的`Content-Security-Policy`
