const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
    static associate(models) {
      Invoice.belongsTo(models.User, {
        foreignKey: 'UserId',
        targetKey: 'id',
        as: 'client',
      });
      Invoice.belongsTo(models.PaymentType, {
        targetKey: 'id',
        foreignKey: 'paymentId',
      });
    }
  }
  Invoice.init(
    {
      paymentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      image: {
        type: DataTypes.BLOB,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Invoice',
    },
  );
  return Invoice;
};
