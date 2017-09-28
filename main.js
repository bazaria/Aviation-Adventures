const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const device = require('express-device');
const gallery = require('express-photo-gallery');

const app = express();

app.set('port',3000);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(device.capture());


/*
app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');
*/

var transporter = nodemailer.createTransport({
	service: 'Zoho',
	tls: { rejectUnauthorized: false},
	auth:{
		user: 'barA351@zoho.com',
		pass: '1234zxcv'
	}

}); 

app.use('/gallery',gallery(path.join(__dirname,'gallery'),{title:"Gallery"}));

app.get('/', (req, res, next) => {
	var options = {
		root: path.join(__dirname,'views'),
		/*headers: {
			'x-timestamp': Date.now(),
			'x-sent': true
		}*/
	};
	if(req.device.type === 'desktop'){
		res.sendFile('index.html',options);
	} else {
		res.sendFile('index2.html',options);
	}	
	//res.render('index.ejs');
});

app.get('/mobile', (req, res, next) =>{
	var options = {
		root: path.join(__dirname,'views'),
		/*headers: {
			'x-timestamp': Date.now(),
			'x-sent': true
		}*/
	};
	res.sendFile('index2.html',options);

})

app.post('/order', (req, res) => {
	var mailOptions = {
		from: 'barA351@zoho.com',
		to: 'barA351@zoho.com',
		subject: 'hello bar',
		text: JSON.stringify(req.body)
	};

	transporter.sendMail(mailOptions,function(error,info){
		if(error){
			console.log(error);
		} else {
			console.log("email: " + info.response);
		}
	});
});

var server = app.listen(app.get('port'),function(){
	console.log('Listening on '+ server.address().port);
});