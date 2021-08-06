const { Project, Task, Time } = require("../models/timetracking");

const dateFormat = require("dateformat");

const now = new Date();

exports.getIndex = (req, res, next) => {
    Project.findAll({
        where: {
            project_status: 'In Progress'
        }
    }).then(project => {
        Time.findAll({
            attributes: ['time_worked', 'date_added'],
            where: {
                date_added: dateFormat(now, "yyyy-mm-dd")
            },
            include: [{
                model: Task,
                required: true,
                attributes: ['task_name'],
                include: [{
                    model: Project,
                    required: true,
                    attributes: ['project_name']
                }]
            }]
        }) 
        .then(time => {
            console.log(time[0].time_worked);
            res.render('main-page', {
                pageTitle: 'Main-Page',
                projects: project,
                times: time,
                path: '/'
            })
        }).catch(err => {
            console.log(err);
        });
    }).catch(err => {
        console.log(err);
    });
    
};

exports.postAddTime = (req, res, next) => {
    const current_project = req.body.project;
    const current_task = req.body.task;
    const hours_worked = req.body.time;
    Time.create({
        project_id: current_project,
        task_id: current_task,
        time_worked: hours_worked,
        date_added: dateFormat(now, "yyyy-mm-dd")
    }).then(result => {
        res.redirect('/')
    }).catch(err => {
        console.log(err);
    });
};

exports.postFillTask = (req, res, next) => {
    const projectID = req.body.project_id;
    Task.findAll({
        attributes: ['task_id', 'task_name'],
        where: {
            project_id: projectID,
            task_progress: 'In Progress'
        } 
    })
    .then(tasks => {
        res.json(tasks);
    })
    .catch(err => {
        console.log(err);
    });
};