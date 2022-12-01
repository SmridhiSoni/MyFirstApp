const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root', /* MySQL User */
    password: '', /* MySQL Password */
    database: 'node_rest_api' /* MySQL Database */
  });

app.listen(3000);
//browser does get request
//if error occurs it will capture the error else it will connect to database
conn.connect((err) =>{
    if(err) throw err;
    console.log('Mysql Connected with App...');
  });

  app.get('/api/items',(req, res) => {
    let sqlQuery = "SELECT * FROM items";
    
    let query = conn.query(sqlQuery, (err, results) => {
      if(err) throw err;
      res.send(apiResponse(results));
    });
  });
  //
  function apiResponse(results){
    return JSON.stringify({"status": 200, "error": null, "response": results});
}
