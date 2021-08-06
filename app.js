// built in node modules required
const path = require('path');

// npm modules
const express = require('express');
const bodyParser = require('body-parser');

// includes from personal files
const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const timetracking = require('./models/timetracking');

// Create the app
const app = express();
// tell the server that we are using pug
app.set('view engine', 'pug');
app.set('views', 'views');

// Grab the routes 
const indexRoutes = require('./routes/general');
// const gamesListRoutes = require('./routes/gamesListRoutes');
// const timesheetRoutes = require('./routes/timesheets');

// allow files to use the files in the public folder.
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(indexRoutes);

app.use(errorController.get404)

sequelize.sync({alter: true}).then(result => {
    app.listen(4000);
})
.catch(err => {
    console.log(err);
});
