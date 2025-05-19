const swaggerJsdoc = require("swagger-jsdoc");

function getSwaggerSpec(serverUrl) {
  return swaggerJsdoc({
    definition: {
      openapi: "3.0.0",
      info: {
        title: "API Đồ án tốt nghiệp Mạng Xã Hội",
        version: "1.0.0",
      },
      servers: [{ url: serverUrl || "http://localhost:3000" }],
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
  });
}

module.exports = getSwaggerSpec;
