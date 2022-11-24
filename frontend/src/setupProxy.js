const { createProxyMiddleware } = require("http-proxy-middleware");
/*
- need this because using proxy in the package.json makes it kind of difficult to use a environment variable
https://create-react-app.dev/docs/proxying-api-requests-in-development/#configuring-the-proxy-manually
*/
// module.exports = function (app) {
//   app.use(
//     "/api",
//     createProxyMiddleware({
//       target: "https://habit-tracker-3.herokuapp.com/",
//       changeOrigin: true,
//     })
//   );
// };

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: process.env.BACKENDURL,
      changeOrigin: true,
    })
  );
};
