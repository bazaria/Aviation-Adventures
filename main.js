const express = require('express');
const path = require('path');

const app = express();

app.set('port',3000);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/',function(req,res){
	var options ={
		root: path.join(__dirname,'public'),
		headers: {
			'x-timestamp': Date.now(),
			'x-sent': true
		}
	};
	res.sendFile('index.html',options);
});


var server = app.listen(app.get('port'),function(){
	console.log('Listening on '+server.address().port);
});