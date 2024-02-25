const express = require("express");
const { Review } = require("../models");
const router = express.Router();
const xlsx = require("xlsx");
const path = require("path");

const filePath = path.resolve(__dirname, "./reviews.xlsx");
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
      review_name: String(row["review_name"]),
      review_imgSrc: String(row["review_imgSrc"]),
    };
  });
}
function generateObjectArrayFromExcel(filePath) {
  const excelData = readExcelFile(filePath);
  const processedData = processExcelData(excelData);
  return processedData;
}

router.post("/", async (req, res, next) => {
  try {
    const reviews = generateObjectArrayFromExcel(filePath);
    for (const review of reviews) {
      const addedReview = await Review.create({
        review_name: review.review_name,
        review_imgSrc: review.review_imgSrc,
      });
    }

    res.status(200).send("Reviews added");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
