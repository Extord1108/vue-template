const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");

module.exports = {
  //自动导入配置
  configureWebpack: {
    plugins: [
      AutoImport({
        imports: ["vue", "vue-router"],
        resolvers: [ElementPlusResolver()],
        dts: true,
        eslintrc: {
          enabled: true,
        },
      }),
      Components({
        resolvers: [ElementPlusResolver()],
        // targets to transform
        dirs: ["src/components"],
        extensions: ["vue"],
        dts: true,
        deep: true,
        include: [/\.vue$/, /\.vue\?vue/],
        exclude: [
          /[\\/]node_modules[\\/]/,
          /[\\/]\.git[\\/]/,
          /[\\/]\.nuxt[\\/]/,
        ],
      }),
    ],
  },
  //tailwind配置
  css: {
    loaderOptions: {
      postcss: {
        plugins: [require("tailwindcss"), require("autoprefixer")],
      },
    },
  },
  //开发时跨域配置
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },

  //electron-builder配置
  pluginOptions: {
    electronBuilder: {
      preload: "src/preload.js", //预加载脚本
      builderOptions: {
        appId: "com.nitouche.demo",
        productName: "ChatSQL", //项目名，也是生成的安装文件名，即aDemo.exe
        copyright: "Copyright © 2023", //版权信息
        directories: {
          output: "./dist_electron", //输出文件路径
        },
        win: {
          //win相关配置
          target: [
            {
              target: "nsis", //利用nsis制作安装程序
            },
          ],
        },
      },
    },
  },
};
