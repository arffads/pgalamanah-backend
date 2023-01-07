module.exports = (sequelize, DataTypes) => {
  const Classroom = sequelize.define(
    "classroom",
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
      status: {
        type: DataTypes.ENUM("ON_PROGRESS", "GRADUATE"),
      },
    },
    { freezeTableName: true }
  );
  return Classroom;
};
