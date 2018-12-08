module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('LinkEmployeeToEmployerRequests', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      employerId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'PENDING_REVIEW',
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
    return queryInterface.dropTable('LinkEmployeeToEmployerRequests')
  },
}
