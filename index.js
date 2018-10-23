const express = require('express');
const app = express();
var fs = require('fs');

var mailgun = require("mailgun-js");
var api_key = '5db66d1aea31ae5aab722cfbc465ca96-bd350f28-1638adce';
var DOMAIN = 'sandboxc7b8aa2a9d1d48849d269df5b602956c.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: DOMAIN});

var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile("/index.html");
});

app.get('/getval', (req, res) => {
  console.log('Hello World! get21312132132');
});

app.get('/tofile/:eamilid/:status/:mailid', (req, res) => {


   
    fs.readFile('data.json', "utf-8" , (err, data) => {
    	if (err) throw err;
    	
    	console.log('------------');    
    	console.log(data.toString() == '');    
    	console.log('------------');
    	
    	if( data.toString() != '' )	{
    		
    		data = JSON.parse(data);
    	
	    	if( data.mailid == req.params.mailid) {
	    		
	    		var count = ( typeof data.numberoftime === "undefined" ) ? 1 : data.numberoftime + 1 ;
	    		
	    		console.log( data.numberoftime );    		
	    		console.log( count );
	    		
	    		var datawrite = {
					"eamilid" : req.params.eamilid,
					"status" : 'Open',
					"mailid" : req.params.mailid,
					"numberoftime" : count
				 };
	    	} else {
	    		var datawrite = {
					"eamilid" : req.params.eamilid,
					"status" : 'Sent',
					"mailid" : req.params.mailid,
	
				};
	    	}
		}
		else {
			var datawrite = {
					"eamilid" : req.params.eamilid,
					"status" : req.params.status,
					"mailid" : req.params.mailid,
	
				};
		}

    	
    	
		datawrite = JSON.stringify(datawrite);
					
			fs.writeFile('data.json', datawrite, function(err, data){
			   if (err) console.log(err);
			    console.log("Successfully Written to File.");
			});			
	
	});
	
	
    
  	res.sendFile("/img/image.png");
	
});

app.get('/readfile', (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.sendFile("/data.json");
});

app.post('/sendmail', (req, res) => {

  
 var emailid = req.body.emailid;
 var message = req.body.message; 
 var subject = req.body.subject;
 
 console.log(emailid);
 console.log(message);
  
var data = {
  from: 'Excited User <me@samples.mailgun.org>',
  to: emailid,
  subject: subject,
  html: message + "<a href='https://www.google.com/'>adasdas</a>"
};

mailgun.messages().send(data, function (error, body) {
  console.log(body);
  console.log(error);
});
    
});

app.post('/sure', (req, res) => {

var data = {
  from: 'Excited User <me@samples.mailgun.org>',
  to: 'anu1488@gmail.com',
  subject: 'webhook working',
  html: "webhook working"
};

mailgun.messages().send(data, function (error, body) {
  console.log(body);
  console.log(error);
});

});


app.post('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/getval', (req, res) => {
  res.send('Hello World! post');
});


app.post('/sendmail', (req, res) => {
  res.send('Hello World! post');
});

app.post('/sendmail', (req, res) => {
  res.send('Hello World! post');
});

app.get('/getjson', (req, res) => {
 
	let resobj = {
		"fullfillmentText" : "testing testing tsting testing",
		"fullfillmentMessage" : [{ "text" :  "text"  }],
		"source" : ""
	};

	return res.send( resobj );

});

app.get('/newapi', (req, res) => {
 
	let resobj = {
		"speech": "something went wrong",
		"displayText": "something went wrong",
		"source": "webhook-echo-sample"
	};

	return res.json( resobj );

});

app.post('/newapi', (req, res) => {
 
	let resobj = {
		"speech": "something went wrong",
		"displayText": "something went wrong",
		"source": "webhook-echo-sample"
	};

	return res.json( resobj );

});



app.post('/getjson', (req, res) => {
 
	let resobj = {
		"fullfillmentText" : "testing testing tsting testing",
		"fullfillmentMessage" : [{ "text" :  "text"  }],
		"source" : ""
	};

	return res.send( resobj );

});


app.get('/getval', (req, res) => {
  res.send('Hello World! get21312132132');
});

const server = app.listen(80, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log(`Example app listening at http://${host}:${port}`);
});
