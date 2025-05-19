import createError from "http-errors";
import path from "path";
import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import ngrok from "ngrok";
import indexRouter from "./routes/index";
import swaggerUi from "swagger-ui-express";
import getSwaggerSpec from "./swagger.js"; // Đường dẫn bạn tạo ở bước 2

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("assets"));

const corsOptions = {
  origin: "http://localhost:3006",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

app.use("/", indexRouter);
(async () => {
  // Khởi chạy ngrok
  const url = await ngrok.connect({
    addr: process.env.PORT_NGROK,
    authtoken: process.env.NGROK_AUTHTOKEN,
  });

  const localPort = process.env.PORT_NGROK || process.env.PORT;

  console.log("🌐 Public ngrok URL:", url); // ✅ In link ngrok
  console.log("📘 Swagger UI:", `${url}/api-docs`); // ✅ In link Swagger
  console.log(`🖥️  Localhost: http://localhost:${localPort}/api-docs`);

  const swaggerSpec = getSwaggerSpec(url);

  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      swaggerOptions: {
        persistAuthorization: true, // ⚠️ Quan trọng
      },
    })
  );

  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    next(createError(404));
  });

  // error handler
  app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error", { error: "Something went wrong" }); // ✅ Đúng
  });
})();

module.exports = app;
