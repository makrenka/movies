const Router = require("express");
const router = new Router();
const userRouter = require("./userRouter");
const movieRouter = require("./movieRouter");
const listRouter = require("./listRouter");
const genresRouter = require("./genresRouter");

router.use("/user", userRouter);
router.use("/list", listRouter);
router.use("/movie", movieRouter);
router.use("/genres", genresRouter);

module.exports = router;
