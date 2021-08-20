const Sequelize = require('sequelize');

const sequelize = new Sequelize('timetracking', 'root', 'root', {
    dialect: 'mysql',
    host: 'localhost',
    define: {
        timestamps: false
    }
});

module.exports = sequelize;