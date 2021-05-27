const express = require("express");
const path = require("path");
const app = express();
app.use('/static',express.static('static'));
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.get('/home',function(req,res){
  res.render("home");
});

app.get('/events',function(req,res){
  res.render("events");
});
/*app.get('/programmersdate.ejs',function(req,res){
  res.render("programmersdate");
});
app.get('/events.ejs',function(req,res){
  res.render("events");
});
app.get('/events.ejs',function(req,res){
  res.render("events");
});
app.get('/events.ejs',function(req,res){
  res.render("events");
});
app.get('/events.ejs',function(req,res){
  res.render("events");
});*/
app.use(express.static(path.join(__dirname, 'public')));
//app.use (express.static(path.join(__dirname,'tech')));
app.listen(3000,function(req,res){
    console.log("Server is running at port no. 3000");
});