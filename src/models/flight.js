'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Flight extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Airplane,{
        foreignKey:'airplaneId',
        as:"airplaneDetail",
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
      })
      this.belongsTo(models.Airport,{
        foreignKey:'departureAirportId',
        as:'departureAirport',
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
      })
      this.belongsTo(models.Airport,{
        foreignKey:'arrivalAirportId',
        as:'arrivalAirport',
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
      })
  
    }
  }
  Flight.init({
    flightNumber: {
      type:DataTypes.STRING,
    allowNull:false
  },
    airplaneId: {
      type:DataTypes.INTEGER,
      allowNull:false,
      
  },
    departureAirportId: {
      type:DataTypes.STRING,
      allowNull:false,
     
  },
    arrivalAirportId: {
      type:DataTypes.STRING,
      allowNull:false,
     
  },
    departureTime: {
      type:DataTypes.DATE,
      allowNull:false,
      
  },
    arrivalTime: {
      type:DataTypes.DATE,
      allowNull:false
  },
    price: {
      type:DataTypes.INTEGER,
      allowNull:false
  },
    boardingGate: {
      type:DataTypes.INTEGER,
  },
    totalSeats: {
      type:DataTypes.INTEGER,
      allowNull:false
  }, 
  }, {
    sequelize,
    modelName: 'Flight',
  });
  return Flight;
};