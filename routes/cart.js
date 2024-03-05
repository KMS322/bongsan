const express = require("express");
const { Cart, User } = require("../models");
const router = express.Router();

router.post("/add", async (req, res, next) => {
  try {
    await Cart.create({
      user_id: req.body.user_id,
      product_id: req.body.product_id,
      product_cnt: req.body.product_cnt,
    });

    res.status(200).send("added");
  } catch (error) {
    console.error(error);
    next();
  }
});

router.post("/load", async (req, res, next) => {
  try {
    const lists = await Cart.findAll({
      where: { user_id: req.body.user_id },
    });
    res.status(200).json(lists);
  } catch (error) {
    console.error(error);
    next();
  }
});

router.post("/delete", async (req, res, next) => {
  try {
    const { productIds } = req.body;
    const lists = await Cart.destroy({
      where: { id: productIds },
    });
    res.status(200).send("ok");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
