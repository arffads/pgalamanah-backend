module.exports = (sequelize, DataTypes) => {
  const ClassDetail = sequelize.define(
    'class_detail',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nis: {
        type: DataTypes.STRING,
        allowNull: true
      },
      kode_kelas: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    { freezeTableName: true }
  );

  return ClassDetail;
};
