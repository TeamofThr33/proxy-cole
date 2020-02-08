const axios = require('axios');
const express = require('express');
const morgan = require('morgan');

const port = 3000;
let app = express();
app.use(morgan('dev'));

app.use(express.static(__dirname + '/../client'));
app.use(express.json());


app.get("/reservations/bundle.js", (req, res)=> {
	axios.get('http://localhost:3002/bundle.js')
	.then((response)=> {
		
		res.send(response.data); 
	}).catch((error)=> {
	console.log(error)
	});
	

});

app.get("/restaraunts/bundle.js", (req, res)=> {
        axios.get('http://localhost:3001/bundle.js')
        .then((response)=> {

                res.send(response.data);
        }).catch((error)=> {
        console.log(error)
        });


});


app.get("/images/bundle.js", (req, res)=> {
        axios.get('http://localhost:3004/bundle.js')
        .then((response)=> {

                res.send(response.data);
        }).catch((error)=> {
        console.log(error)
        });


});


/*app.get(/icons/, function(req, res) {
    axios.get("http://localhost:3001"+req.url)
	.then((response)=> {
		res.setHeader('content-type', 'text/plain')
		res.send(JSON.stringify(response.data));
})})*/;


app.get(/icons/, function(req, res) {
    res.redirect("http://localhost:3001"+req.url);
})




app.listen(port, function(){
console.log(`Coles PROXY server is listening on port ${port}`)
});




