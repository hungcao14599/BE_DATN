import createError from "http-errors";
import path from "path";
import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";

import indexRouter from "./routes/index";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.js"; // Đường dẫn bạn tạo ở bước 2

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("assets"));

const corsOptions = {
  origin: [
    "http://localhost:3000/",
    "https://be-datn-68xn.onrender.com",
    "https://fe-datn-zd1y.onrender.com",
    "https://fe-datn-two.vercel.app",
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Accept",
    "Origin",
    "X-Requested-With",
  ],
};
app.use(cors(corsOptions));

// ✅ Redirect "/" to "/api-docs"
app.get("/", (req, res) => {
  res.redirect("/api-docs");
});

app.use("/", indexRouter);

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
  res.status(err.statusCode || 500).json({
    message: err.message || "INTERNAL SERVER ERROR",
    error: process.env.NODE_ENV === "development" ? err.stack : undefined
  });
  res.render("error", { error: "Something went wrong" }); // ✅ Đúng
});

module.exports = app;
