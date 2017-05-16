var AWS = require('aws-sdk');
var express = require('express'), http = require('http');
var app = express();


AWS.config.update({
	region: process.env.DYNAMO_REGION,
	//endpoint: process.env.DYNAMO_ENDPOINT
});

app.get('/', function (req, res) {
	res.send('Wow');
});

app.get('/students', function (req, res) {


});

app.get('/user/:userId', function(req, res) {
	var docClient = new AWS.DynamoDB.DocumentClient();
	var params = {
		TableName: "users",
		Key: {
			"userId": req.params["userId"],
			"promo": req.params['promo']
		}
	}
	docClient.get(params, function(err,data) {
		if(err) {
			res.send("Error while reading: " + JSON.stringify(err, null, n2));
		} else {
			res.send("Get item: " + JSON.stringify(data, null, 2));
		}
	});
})

app.listen(process.env.PORT, function () {
	console.log("server successfully started!");
});
