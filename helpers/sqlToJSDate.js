module.exports = function sqlToJsDate(sqlDate){    
    var d1 = new Date(sqlDate);
    var d2 = new Date ( d1 );
    d2.setHours ( d1.getHours() - 11 );
    return d2;
}