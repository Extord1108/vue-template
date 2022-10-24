const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
const { NaiveUiResolver } = require("unplugin-vue-components/resolvers");

module.exports = {
  //自动导入配置
  configureWebpack: {
    plugins: [
      AutoImport({
        imports: ["vue", "vue-router"],
        dts: true,
        eslintrc: {
          enabled: true,
        },
      }),
      Components({
        resolvers: [NaiveUiResolver()],
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
};
