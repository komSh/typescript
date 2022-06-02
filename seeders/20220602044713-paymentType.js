module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('PaymentType', [
      {
        type: 'Weekly',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: 'Monthly',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: 'Bi-Weekly',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert('Menus', [
      {
        day: 'Monday',
        item: 'Chicken',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        day: 'Tuesday',
        item: 'beef',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
  },
};
