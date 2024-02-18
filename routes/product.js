const express = require("express");
const { Product } = require("../models");
const router = express.Router();

router.post("/load", async (req, res, next) => {
  try {
    const products = await Product.findAll({});
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    next();
  }
});

module.exports = router;
