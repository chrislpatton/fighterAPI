// require express
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/fighterAPI');

var Fighter = require('./models/fighterModel');
// create an instance of express
var app = express();

app.use(cors());


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// set up a variable to declare a port 
var port = process.env.PORT || 8000;

fighterRouter = require('./routes/fighterRoutes')(Fighter);



app.use('/api/fighters', fighterRouter);

app.get('/', function(req, res){
	res.send('Welcome to the fighter API');
});

app.listen(port, function(){
	console.log("Hey, the server works and its running with Gulp on PORT " + port);
});
	// fighterRouter.route('/fighters')
	// .get(function(req,res){
	// 	var query = {};

	// 	if (req.query.weightClass) {
	// 		query.weightClass = req.query.weightClass;
	// 	}
	// 	Fighter.find(query, function(err, fighters) {
	// 		if (err)
	// 			res.status(500).send(err);
	// 		else
	// 			res.json(fighters);
	// 	});

	// });
