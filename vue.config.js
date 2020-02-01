const webpack = require("webpack");
const path = require("path");

/**
 * 解析文件地址
 * @param dir
 */
function resolve(dir) {
  return path.join(__dirname, "", dir);
}

module.exports = {
  lintOnSave: false,
  parallel: false,
  productionSourceMap: false,
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
        "window.$": "jquery"
      })
    ],
    externals: {
      axios: "axios",
      "element-ui": "element-ui",
      "font-awesome": "font-awesome",
      jquery: "jquery",
      leaflet: "leaflet",
      lodash: "lodash",
      "mavon-editor": "mavon-editor",
      vue: "vue",
      "vue-context": "vue-context"
    }
  },
  chainWebpack: config => {
    /* 修改入口文件 */
    config
      .entry("app")
      .clear()
      .add("./src/index.ts");

    config.module
      .rule("ts")
      .use("ts-loader")
      .loader("ts-loader")
      .tap(options => {
        options.transpileOnly = false;
        return options;
      });

    config.module
      .rule("tsx")
      .use("ts-loader")
      .loader("ts-loader")
      .tap(options => {
        options.transpileOnly = false;
        return options;
      });

    /* 移除 cache-loader，使之生成类型定义文件 */
    config.module.rule("ts").uses.delete("cache-loader");
    config.module.rule("tsx").uses.delete("cache-loader");
  }
};
