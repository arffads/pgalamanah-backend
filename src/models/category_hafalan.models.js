module.exports = (sequelize, DataTypes) => {
  const CategoryHafalan = sequelize.define(
    'category_hafalan',
    {
      category_name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    { freezeTableName: true }
  );

  return CategoryHafalan;
};
