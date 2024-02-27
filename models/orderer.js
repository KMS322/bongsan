module.exports = (sequelize, DataTypes) => {
  const Orderer = sequelize.define(
    "Orderer",
    {
      oderer_userId: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      orderer_name: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      orderer_tel: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      orderer_request: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      receiver_name: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      receiver_tel: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      receiver_jibunAddress: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      receiver_detailAddress: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      receiver_billNeed: {
        type: DataTypes.STRING(10),
        allowNull: true,
        defaultValue: false,
      },
      receiver_billName: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      receiver_billNum: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      receiver_billemail: {
        type: DataTypes.STRING(40),
        allowNull: true,
      },
      arrival_date: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      arrival_hour: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      arrival_minute: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      arrival_type: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      ribbon_select: {
        type: DataTypes.STRING(10),
        allowNull: true,
        defaultValue: true,
      },
      ribbon_leftText: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      ribbon_rightText: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      card_select: {
        type: DataTypes.STRING(10),
        allowNull: true,
        defaultValue: true,
      },
      card_text: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );
  return Orderer;
};
