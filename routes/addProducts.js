const express = require("express");
const { Product } = require("../models");
const router = express.Router();
const xlsx = require("xlsx");
const path = require("path");

const filePath = path.resolve(__dirname, "./products.xlsx");
function readExcelFile(filePath) {
  try {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(worksheet);

    return jsonData;
  } catch (error) {
    console.error("Error reading Excel file:", error);
    throw error;
  }
}
function processExcelData(data) {
  return data.map((row) => {
    return {
      product_category: String(row["product_category"]),
      product_name: String(row["product_name"]),
      product_falsePrice: String(row["product_falsePrice"]),
      product_truePrice: String(row["product_truePrice"]),
      product_mainImgSrc: String(row["product_mainImgSrc"]),
    };
  });
}
function generateObjectArrayFromExcel(filePath) {
  const excelData = readExcelFile(filePath);
  const processedData = processExcelData(excelData);
  return processedData;
}

router.post("/", async (req, res, next) => {
  console.log("AA");
  try {
    const products = generateObjectArrayFromExcel(filePath);
    for (const product of products) {
      const addedProduct = await Product.create({
        product_category: product.product_category,
        product_name: product.product_name,
        product_falsePrice: product.product_falsePrice,
        product_truePrice: product.product_truePrice,
        product_mainImgSrc: product.product_mainImgSrc,
      });
    }

    res.status(200).send("Products added");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
