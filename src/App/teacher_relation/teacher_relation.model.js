module.exports = (sequelize, DataTypes) => {
  const TeacherClassRelation = sequelize.define(
    "teacher_class_relation",
    {},
    { freezeTableName: true }
  );

  return TeacherClassRelation;
};
