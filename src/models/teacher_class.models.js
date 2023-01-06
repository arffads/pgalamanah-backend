module.exports = (sequelize, DataTypes) => {
  const TeacherClassRelation = sequelize.define(
    "teacher_class_relation",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nip: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      kode_kelas: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    { freezeTableName: true }
  );

  return TeacherClassRelation;
};
