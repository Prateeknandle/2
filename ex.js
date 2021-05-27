const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const validator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const config = require('./config/database');

mongoose.connect(config.database,{ useNewUrlParser: true,  useUnifiedTopology: true  });
let db = mongoose.connection;
// Check connection
db.once('open', function(){
  console.log('Connected to MongoDB');
});
// Check for DB errors
db.on('error', function(err){
  console.log(err);
})
// Init App
const app = express();
// Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Body Parser Middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(validator());
app.use(flash());

app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

const users = require('./routes/users');
app.use('/users', users);
app.listen(3000, function(){
  console.log('Server started on port 3000...');
});