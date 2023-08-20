module.exports = (sequelize, Sequelize) => {
    const Participants = sequelize.define("participants", {
      name: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      }
    });
  
    return Participants;
  };