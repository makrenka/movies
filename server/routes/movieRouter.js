const Router = require("express");
const movieController = require("../controllers/movieController");
const checkRole = require("../middlewares/checkRoleMiddleware");

const router = new Router();

router.post("/", checkRole("ADMIN"), movieController.create);
router.get("/", movieController.getAll);
router.get("/:id", movieController.getOne);

module.exports = router;
