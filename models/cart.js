module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define(
    "Cart",
    {
      product_id: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );
  Cart.associate = (db) => {
    db.Cart.belongsTo(db.User, { foreignKey: "userId" });
  };
  return Cart;
};
