const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const device = require('express-device');
const gallery = require('express-photo-gallery');

const app = express();

app.set('port',process.env.PORT || 3000);


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
		user: 'aviationadventures@zoho.com',
		pass: 'EnCt2593ab16'
	}

});

app.use('/gallery',gallery(path.join(__dirname,'gallery'),{title:"Gallery"}));

app.get('/advantures',(req, res) =>{
	let advantures = {
		1: ['france_2017_adventure', 'europe', 'Франция - Ноябрь 2017'],
		2: ['westcoast_2018_adventure', 'east coast','Восточное Побережие США - апрель 2018'],
		3: ['alps_2018_adventure', 'nordic', 'Прага - Май 2018'],
		4: ['iceland_2018_adventure', 'iceland', 'Исландия - Июль 2018'],
	}
	res.send(JSON.stringify(advantures));
});

app.get('/', (req, res, next) => {
	var options = {
		root: path.join(__dirname, 'views'),
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
	if(req.body.select_advanture == "none" || !req.body.emailaddress)
	{
		console.log(req.body.emailaddress);
		res.send('0');
		return;
	}
	var mailOptions = {
		from: 'aviationadventures@zoho.com',
		to: 'bezfobiy@gmail.com',
		subject: 'New Aviation Adventures Signup Request',
		text: "Dear alex,\n\n " + req.body.fullname + " wants to join your " + req.body.select_adventure + " adventure.\n\nYou can contact him at his email address -\n\n"
		 + req.body.emailaddress + "\n\n\n\nGoodluck!"
	};
	console.log(JSON.stringify(req.body));
	console.log(Boolean(req.body));
	transporter.sendMail(mailOptions,function(error,info){
		if(error){
			console.log(error);
			res.send('1');
		} else {
			console.log("email: " + info.response);
			res.send('2');
		}
	});
});

var server = app.listen(app.get('port'),function(){
	console.log('Listening on '+ server.address().port);
});
