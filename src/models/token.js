import { Model } from 'sequelize'
import bcrypt from 'bcryptjs'

module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    static associate(models) {
      this.maker = this.belongsTo(models.Maker, {
        foreignKey: 'makerId',
      })
    }
  }
  Token.init(
    {
      publicToken: DataTypes.STRING,
      secretToken: DataTypes.STRING,
      makerId: DataTypes.INTEGER,
      lastUsedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Token',
      tableName: 'tokens',
      underscored: true,
      hooks: {
        beforeCreate: (record) => {
          record.secretToken = bcrypt.hashSync(record.secretToken, 10)
        },
      },
    },
  )
  return Token
}
