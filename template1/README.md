# frontend
### 技术栈
vue3 setup script + js + vue-cli + less
### 配置说明
* 代码格式检查使用`eslint-prettier`，配置项在`.eslintrc.js`中
* css预处理语言用的less
* 配置了自动引入，可以自动引入ref、useRouter等函数、naive-ui中的组件、在src/components下自定义的组件，配置项是`vue.config.js`中的`configureWebpack`
* 配置了tailwind
* 添加UI库时需要对`vue.config.js`中的`resolver`进行配置
