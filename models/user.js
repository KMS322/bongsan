module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      user_id: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
      },
      user_pw: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      user_name: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      user_email: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      user_tel: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      checkList1: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      checkList2: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      checkList3: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      checkList4: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );
  User.associate = (db) => {};
  return User;
};
