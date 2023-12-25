const Router = require("express");
const genresController = require("../controllers/genresController");
const checkRole = require("../middlewares/checkRoleMiddleware");

const router = new Router();

router.post("/", checkRole("ADMIN"), genresController.create);
router.get("/", genresController.getAll);

module.exports = router;
