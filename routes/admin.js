const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { Product, Review } = require("../models");
const router = express.Router();

const folderPath1 = path.join(__dirname, "..", "public", "products");
if (!fs.existsSync(folderPath1)) {
  fs.mkdirSync(folderPath1);
}
const folderPath2 = path.join(__dirname, "..", "public", "reviews");
if (!fs.existsSync(folderPath2)) {
  fs.mkdirSync(folderPath2);
}
const Storage1 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/products/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const Storage2 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/reviews/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload1 = multer({ storage: Storage1 });
const upload2 = multer({ storage: Storage2 });

router.post(
  "/uploadProduct",
  upload1.single("mainImage"),
  async (req, res, next) => {
    try {
      const { originalname: file_name } = req.file;
      const decodeFileName = decodeURIComponent(file_name);

      res.status(201).send(`${decodeFileName} 등록 완료`);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
);

router.post("/addProduct", async (req, res, next) => {
  try {
    await Product.create({
      product_category: req.body.selectedCategory,
      product_name: req.body.productName,
      product_falsePrice: req.body.productFalsePrice,
      product_truePrice: req.body.productTruePrice,
      product_mainImgSrc: req.body.productMainImgSrc,
    });

    res.status(200).send("added");
  } catch (error) {
    console.error(error);
    next();
  }
});

router.post("/deleteProduct", async (req, res, next) => {
  try {
    const deletedProduct = await Product.findOne({
      where: { id: req.body.deletedId },
    });

    const productMainImgSrc = deletedProduct.product_mainImgSrc;
    const imagePath = path.join(
      __dirname,
      "..",
      "public",
      "products",
      productMainImgSrc
    );

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
      console.log(`Deleted image file: ${productMainImgSrc}`);
    } else {
      console.log(`Image file not found: ${productMainImgSrc}`);
    }

    await Product.destroy({
      where: { id: req.body.deletedId },
    });

    res.status(200).send("deleted");
  } catch (error) {
    console.error(error);
    next();
  }
});

router.post(
  "/uploadReview",
  upload2.single("mainImage"),
  async (req, res, next) => {
    try {
      const { originalname: file_name } = req.file;
      const decodeFileName = decodeURIComponent(file_name);

      res.status(201).send(`${decodeFileName} 등록 완료`);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
);

router.post("/addReview", async (req, res, next) => {
  try {
    await Review.create({
      review_name: req.body.reviewName,
      review_orderer: req.body.reviewOrderer,
      review_imgSrc: req.body.reviewImgSrc,
    });

    res.status(200).send("added");
  } catch (error) {
    console.error(error);
    next();
  }
});

router.post("/deleteReview", async (req, res, next) => {
  try {
    const deletedReview = await Review.findOne({
      where: { id: req.body.deletedId },
    });

    const reviewImgSrc = deletedReview.review_imgSrc;
    const imagePath = path.join(
      __dirname,
      "..",
      "public",
      "reviews",
      reviewImgSrc
    );

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
      console.log(`Deleted image file: ${reviewImgSrc}`);
    } else {
      console.log(`Image file not found: ${reviewImgSrc}`);
    }

    await Review.destroy({
      where: { id: req.body.deletedId },
    });

    res.status(200).send("deleted");
  } catch (error) {
    console.error(error);
    next();
  }
});

router.get("/downList", (req, res) => {
  try {
    const fileName = "products.xlsx";
    const filePath = path.join(__dirname, fileName); // 현재 스크립트가 위치한 디렉토리를 기준으로 파일의 상대 경로 설정
    console.log("filePath : ", filePath);
    res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);
    res.sendFile(filePath);
  } catch (error) {
    console.error("파일 다운로드 중 에러가 발생했습니다:", error);
    res.status(500).send("파일을 다운로드하는 도중 에러가 발생했습니다.");
  }
});
module.exports = router;
