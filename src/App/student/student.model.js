module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define(
    "student",
    {
      nis: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      alamat: {
        type: DataTypes.STRING,
      },
      gender: {
        type: DataTypes.ENUM,
        values: ["Laki-Laki", "Perempuan"],
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { freezeTableName: true }
  );
  return Student;
};
