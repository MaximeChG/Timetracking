const Sequelize = require('sequelize');

const sequelize = new Sequelize('website', 'root', 'root', {
    dialect: 'mysql',
    host: 'localhost',
    define: {
        timestamps: false
    }
});

module.exports = sequelize;