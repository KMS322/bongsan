const express = require("express");
const { Review } = require("../models");
const router = express.Router();

router.post("/load", async (req, res, next) => {
  try {
    const reviews = await Review.findAll({});
    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    next();
  }
});

module.exports = router;
