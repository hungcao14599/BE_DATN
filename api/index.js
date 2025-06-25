const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("../swagger");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/hello", (req, res) => {
  res.json({ message: "Hello from Express on Vercel!" });
});

app.get("/", (req, res) => {
  console.log("API gọi thành công");
  res.json({ message: "Hello from API" });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ❗ Xuất default như Vercel yêu cầu
module.exports = serverless(app);