const { Router } = require("express");
const ratingController = require("../controllers/ratingController");

const router = new Router();

router.post("/", ratingController.createRating);
router.get("/", ratingController.getRating);

module.exports = router;
