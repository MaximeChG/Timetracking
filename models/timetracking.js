const { DATEONLY } = require('sequelize');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = require('../util/database');

const Project = sequelize.define('project', {
    project_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    project_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    project_type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    project_status: {
        type: Sequelize.STRING,
        allowNull: false
    },
});

const Task = sequelize.define('task', {
    task_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    task_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    estimated_time: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    task_progress: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

const Time = sequelize.define('time', {
    time_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    time_worked: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    date_added: {
        type: DATEONLY,
        allowNull: false
    }
});

Project.hasMany(Task, {
    foreignKey: 'project_id',
    allowNull: false
});
Task.belongsTo(Project, {
    foreignKey: 'project_id',
    allowNull: false
});


Task.hasMany(Time, {
    foreignKey: 'task_id',
    allowNull: false
});
Time.belongsTo(Task, {
    foreignKey: 'task_id',
    allowNull: false
});

module.exports = {
    Project,
    Task,
    Time,
};
