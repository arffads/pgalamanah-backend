module.exports = (sequelize, DataTypes) => {
  const Category_Hafalan = sequelize.define(
    "category_hafalan",
    {
      category_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { freezeTableName: true }
  );

  return Category_Hafalan;
};
