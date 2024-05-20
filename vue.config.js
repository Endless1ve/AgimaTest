const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  configureWebpack: {
    entry: {
      app: "./src/app/main.js",
    },
  },
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/app/assets/styles/variables.scss";`,
      },
    },
  },
});
