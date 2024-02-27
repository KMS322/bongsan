module.exports = (sequelize, DataTypes) => {
  const OrderList = sequelize.define(
    "OrderList",
    {
      orderlist_name: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      orderlist_name: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );
  return OrderList;
};
