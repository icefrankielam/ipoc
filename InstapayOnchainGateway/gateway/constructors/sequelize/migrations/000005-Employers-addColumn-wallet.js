module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Employers', 'wallet', {
      type: Sequelize.STRING,
      allowNull: true,
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Employers', 'wallet')
  },
}
