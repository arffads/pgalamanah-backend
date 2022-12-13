module.exports = (sequelize, DataTypes) => {
  const ClassRoom = sequelize.define(
    "classRoom",
    {
      kode_kelas: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        autoIncrement: false,
      },
      nama_kelas: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { freezeTableName: true }
  );
  return ClassRoom;
};
