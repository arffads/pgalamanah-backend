//importing modules
const { Sequelize } = require("sequelize");

const { development } = require("../config/db.config");

//Database connection with dialect of postgres specifying the database we are using
//database name is discover
const sequelize = new Sequelize(
  development.DB,
  development.USER,
  development.PASSWORD,
  {
    host: development.HOST,
    dialect: development.dialect,
  }
);

//checking if connection is done
try {
  sequelize.authenticate();
  sequelize.sync();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//connecting to model
db.admin = require("../App/admin/admin.model")(sequelize, Sequelize);
db.classRoom = require("../App/classroom/classroom.model")(
  sequelize,
  Sequelize
);
db.teacher = require("../App/teacher/teacher.model")(sequelize, Sequelize);
db.student = require("../App/student/student.model")(sequelize, Sequelize);
db.teacherRelation = require("../App/teacher_relation/teacher_relation.model")(
  sequelize,
  Sequelize
);
db.classDetail = require("../App/class_detail/detail_class.model")(
  sequelize,
  Sequelize
);
db.detail_hafalan = require("../App/perhafalan/perhafalan.model")(
  sequelize,
  Sequelize
);
db.hafalan = require("../App/hafalan/hafalan.model")(sequelize, Sequelize);
db.category = require("../App/category_hafalan/category.model")(
  sequelize,
  Sequelize
);
/************************************************************************************
 *                              ASSOCIATION CENTRE
 ***********************************************************************************/
// Teacher to Teacher_Realtion
db.teacher.hasOne(db.teacherRelation, {
  foreignKey: "nip",
});
db.teacherRelation.belongsTo(db.teacher, {
  foreignKey: "nip",
});

// Teacher_Relation To ClassRoom
db.teacherRelation.hasMany(db.classRoom);

db.classRoom.belongsTo(db.teacherRelation);

// ClassRoom => Class_Detail
db.classRoom.hasMany(db.classDetail, {
  foreignKey: "kode_kelas",
});
db.classDetail.belongsTo(db.classRoom, {
  foreignKey: "kode_kelas",
});

// Class Detail => Student
db.classDetail.hasMany(db.student, {
  foreignKey: "classDetailId",
});
db.student.belongsTo(db.classDetail, {
  foreignKey: "classDetailId",
});

// student => perhafalan
db.student.hasMany(db.detail_hafalan, {
  foreignKey: "nis",
});
db.detail_hafalan.belongsTo(db.student, {
  foreignKey: "nis",
});

/* 
Perhafalan - Hafalan
*/
db.hafalan.hasMany(db.detail_hafalan, {
  foreignKey: "hafalan_id",
});
db.detail_hafalan.belongsTo(db.hafalan, {
  foreignKey: "hafalan_id",
});

/* 
Hafalan to Category hafalan
*/
db.category.hasMany(db.hafalan, {
  foreignKey: "category_id",
});
db.hafalan.belongsTo(db.category, {
  foreignKey: "category_id",
});

module.exports = sequelize;
