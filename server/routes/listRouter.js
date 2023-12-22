const Router = require("express");
const listController = require("../controllers/listController");

const router = new Router();

router.post("/", listController.create);
router.get("/", listController.getAll);

module.exports = router;
