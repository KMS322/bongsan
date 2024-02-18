module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      product_category: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      product_name: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      product_falsePrice: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      product_truePrice: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      product_mainImgSrc: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      product_detailImgSrc: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      product_count: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );
  return Product;
};
