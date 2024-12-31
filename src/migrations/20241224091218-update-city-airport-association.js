'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('Airports',
      {
        type: 'FOREIGN KEY',
        fields:['cityId'],
        name:'city_foreign_key_constraint',
        references:{
          table:'Cities',
          field:'id'
        },
        
        
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
    })
   
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Airports','city_foreign_key_constraint');
  }
};
