module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Users', 'wagesPerDay', {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0,
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Users', 'wagesPerDay')
  },
}
