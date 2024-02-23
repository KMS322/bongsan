module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define(
    "Cart",
    {
      product_id: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      user_id: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      product_cnt: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );
  Cart.associate = (db) => {};
  return Cart;
};
