const Router = require("express");
const movieController = require("../controllers/movieController");

const router = new Router();

router.post("/", movieController.create);
router.get("/", movieController.getAll);
router.get("/:id", movieController.getOne);

module.exports = router;
