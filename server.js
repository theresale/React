var express = require("express");
var app = express();
var databaseManager = require("./database-manager.js");

app.use(express.static("."));
app.listen(3000,function(){
	console.log("listening on port", 3000);
});