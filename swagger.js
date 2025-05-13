const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Đồ án tốt nghiệp Mạng Xã Hội",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3000", // phải đúng scheme và port
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT", // optional
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/*.js"], // đường dẫn đến các file chứa swagger doc
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
