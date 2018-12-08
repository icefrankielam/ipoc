module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Users', 'balance', {
      type: Sequelize.FLOAT,
      allowNull: true,
      defaultValue: 0,
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Users', 'balance')
  },
}
