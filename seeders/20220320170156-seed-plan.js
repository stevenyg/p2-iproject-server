'use strict';
const fs = require('fs');
module.exports = {
  up(queryInterface, Sequelize) {

    const data = JSON.parse(fs.readFileSync("./data/plan.json", "utf8"))

    data.forEach(element => {
      element.createdAt = new Date()
      element.updatedAt = new Date()
    });

    return queryInterface.bulkInsert('Plans', data, {});
  },

  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Plans', null, {});
  }
};
