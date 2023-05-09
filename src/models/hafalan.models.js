module.exports = (sequelize, DataTypes) => {
  const Hafalan = sequelize.define(
    'hafalan',
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      image_media: {
        type: DataTypes.STRING,
        allowNull: false
      },
      media_reader: {
        type: DataTypes.STRING
      }
    },
    { freezeTableName: true }
  );

  return Hafalan;
};
