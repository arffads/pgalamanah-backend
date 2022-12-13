module.exports = (sequelize, DataTypes) => {
  const ClassDetail = sequelize.define(
    "class_detail",
    {},
    { freezeTableName: true }
  );

  return ClassDetail;
};
