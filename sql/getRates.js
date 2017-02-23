var path = require('path');
var Config = require('./sqlConfig.js');
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
let sqlToJsDate = require('../helpers/sqlToJSDate.js');

// var rows = [];

module.exports = function runDbQuery() {

  let rows = [];

  return new Promise(function(resolve, reject) {

    var config = {
        userName: Config.username,
        password: Config.password,
        server: Config.host,
        
        
        // If you're on Windows Azure, you will need this:
        options: {
                //encrypt: true,
                database: Config.database}
    };

    console.log('user: ' + config.username);
    console.log('database: ' + config.options.database);

    var connection = new Connection(config);

    connection.on('connect', function(err) {
        //   if (err) {
        //       console.log(err);
        //   } 
        //   else {
        // If no error, then good to go...
            executeStatement();
        // } 
        });


        function executeStatement() {        
            
            console.log('in executeStatement ');

            var date = new Date();
          
            var today = date.toISOString().substring(0, 10);
          
            //console.log('today: ' + today );   
     

            //var sql = "sp_update_investment_price";
           var sql = `select * from rates; `;      

            console.log('sql: ' + sql );         
            

            // request = new Request("select 42, 'hello world'", function (err, rowCount) {
            request = new Request(sql, function (err, rowCount) {    
                if (err) {
                    console.log(err);
                    reject(err);
                     //try disconnecting here
                    connection.close();
                } else {
                    //console.log(rowCount + ' rows');
                    //resolve(rowCount);
                    resolve(rows);
                    //try disconnecting here
                    connection.close();
                }
            });

            request.on('row', function (columns) {
                // columns.forEach(function (column) {
                //     console.log(column.value);                  
                // });
                 var row = {};

                columns.forEach(function(column) {
                    row[column.metadata.colName] = column.value;
                     //console.log(column.value);
                    //try to fix sql to js date issues
                    var thisColName = column.metadata.colName;
                    if  (thisColName.toLowerCase().indexOf("_date") > -1) {
                        //console.log('column.value' + column.value);
                        row[column.metadata.colName] = sqlToJsDate(column.value);
                        //console.log('sqlToJsDate was used');
                    }

                });
                rows.push(row);

            });
            
           
            connection.execSql(request);
            // connection.callProcedure(request);
        }
  });
};