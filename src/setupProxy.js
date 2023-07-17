const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    "/proxy",
    createProxyMiddleware({
      target: "https://provinces.open-api.vn/api/",
      changeOrigin: true,
      pathRewrite: {
        "/proxy": "/",
      },
    })
  );
};
