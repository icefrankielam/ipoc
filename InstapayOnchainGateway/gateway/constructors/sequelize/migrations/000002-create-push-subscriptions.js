module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PushSubscriptions', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      hash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      subscription: {
        type: Sequelize.JSONB,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('PushSubscriptions')
  },
}
