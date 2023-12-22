const Router = require("express");
const genresController = require("../controllers/genresController");

const router = new Router();

router.post("/", genresController.create);
router.get("/", genresController.getAll);

module.exports = router;
