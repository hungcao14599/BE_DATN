const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Social Network - Đại Học Thuỷ Lợi 4.0 - Nguyễn Việt Hưng K59-CNTT",
      version: "2.1.0",
    },
    servers: [
      {
        url: "/", // ✅ để tự động dùng domain hiện tại
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;