module.exports = (sequelize, DataTypes) => {
  const Perhafalan = sequelize.define(
    "detail_hafalan",
    {
      grade: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      record: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    { freezeTableName: true }
  );

  return Perhafalan;
};
