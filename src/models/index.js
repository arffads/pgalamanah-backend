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
db.admin = require("./admin.models")(sequelize, Sequelize);
db.classroom = require("./classroom.models")(sequelize, Sequelize);
db.teacher = require("./teacher.models")(sequelize, Sequelize);
db.student = require("./student.models")(sequelize, Sequelize);
db.teacherClass = require("./teacher_class.models")(sequelize, Sequelize);
db.classDetail = require("./class_detail.models")(sequelize, Sequelize);
db.detail_hafalan = require("./perhafalan.models")(sequelize, Sequelize);
db.hafalan = require("./hafalan.models")(sequelize, Sequelize);
db.category = require("./category_hafalan.models")(sequelize, Sequelize);
/************************************************************************************
 *                              ASSOCIATION CENTRE
 ***********************************************************************************/
// Teacher to Teacher_Realtion
db.teacher.belongsToMany(db.classroom, {
  foreignKey: "nip",
  through: db.teacherClass,
});
db.classroom.belongsToMany(db.teacher, {
  foreignKey: "kode_kelas",
  through: db.teacherClass,
});

// classroom => Class_Detail
db.classroom.belongsToMany(db.student, {
  foreignKey: "kode_kelas",
  through: db.classDetail,
});
db.student.belongsToMany(db.classroom, {
  foreignKey: "nis",
  through: db.classDetail,
});

// Class Detail => Student
// db.classDetail.hasMany(db.student, {
//   foreignKey: "classDetailId",
// });
// db.student.belongsTo(db.classDetail, {
//   foreignKey: "classDetailId",
// });

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
