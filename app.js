var express = require('express');
var sqlite = require('sqlite3');
var app = express();
var bodyParser = require('body-parser');
var db = new sqlite.Database('users.db');

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('public'));
app.get('/index.html', function (req, res) {
   	res.sendFile( __dirname + "/" + "index.html" );

   	db.all("SELECT * FROM users", function(err,row){
      console.log(row);
  });
})

app.post('/process_post', urlencodedParser, function (req, res) {
   // Prepare output in JSON format
   response = {
      first_name:req.body.first_name,
      last_name: req.body.last_name
   };
   first_name = req.body.first_name;
   last_name = req.body.last_name;

   db.run("INSERT INTO users Values($first_name, $last_name)",{
    $first_name : first_name,
    $last_name : last_name
  });

   /*console.log(response);*/
   res.end(JSON.stringify(response));
})
var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)

})