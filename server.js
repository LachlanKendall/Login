var express = require('express');
var app = express();
var port = 3000;
//var bodyParser = require('body-parser');
var path = require('path');
var exphbs = require('express-handlebars');
//var expressHbs = require('express3-handlebars');
let cron = require('node-schedule');//require('node-cron');



app.engine('handlebars', exphbs({extname:'hbs'}, {defaultLayout: __dirname + '/views/main'}));
app.set('view engine', 'handlebars');

app.set('port', port); 
//app.use(bodyParser.urlencoded({ extended: true }));

let session_start = new Date();
let last_run  = '....not yet run....'//Date();

//run once at start-up
last_run  = new Date();
//ourFunction();

      
// This runs at 8:30AM every weekday. 
var rule = new cron.RecurrenceRule();
rule.dayOfWeek = [1,2,3,4,5];
rule.hour = 8;
rule.minute = 30;
cron.scheduleJob(rule, function(){     
  console.log('running a task once a day every weekday');
  last_run  = new Date();
  //ourFunction();

});

app.get('/', function (req, res, next) {
    //ourFunction().then(function(ratesData){
    let ratesData = require('./fakeData.js');    
    //getData.then(function(ratesData){    
        res.render('home', {
            showTitle: true,
            ratesData: ratesData,
            // Override `foo` helper only for this rendering.
            helpers: {
                //foo: function () { return 'foo.'; }
                session_start: function (){return session_start; },
                last_run: function (){return last_run; }                
            },

            showWarning: function() {
                if (session_start > last_run) {                
                    return true;
                } else {
                    return false;
                }
            }
        });
  //  });    
});

var server = app.listen(port, function () {
  console.log('Listening on port ' + server.address().port)
});

