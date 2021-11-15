import express from "express";
import authRouter from "./auths";

var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
    res.render("index", { title: "Express" });
});
router.use("/api/auth", authRouter);

module.exports = router;