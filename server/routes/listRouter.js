const Router = require("express");
const listController = require("../controllers/listController");

const router = new Router();

router.post("/", listController.addMovie);
router.get("/", listController.getMovies);

module.exports = router;
