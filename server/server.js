const axios = require('axios');
const express = require('express');
const morgan = require('morgan');
const compression = require('compression');

const port = 3000;
let app = express();
app.use(morgan('dev'));
app.use(compression());

app.use(express.static(__dirname + '/../client'));
app.use(express.json());


//zacks component

app.get("/reservations/bundle.js", (req, res)=> {
	axios.get('http://localhost:3002/bundle.js')
	.then((response)=> {
		
		res.send(response.data); 
	}).catch((error)=> {
	console.log(error)
	});
	

});

app.get('/reservations', (req, res) => {
        axios.get('http://localhost:3002/reservations')
          .then((response) => {
            res.status(200).send(response.data);
          })
          .catch((err) => {
            res.status(500).end;
          })
      })


      //remis component
app.get("/restaraunts/bundle.js", (req, res)=> {
        axios.get('http://localhost:3001/bundle.js')
        .then((response)=> {

                res.send(response.data);
        }).catch((error)=> {
        console.log(error)
        });


});


app.get('/restaurants', (req, res) => {
        axios.get('http://localhost:3001/restaurants')
          .then((response) => {
            res.status(200).send(response.data);
          })
          .catch((err) => {
            res.status(500).end;
          })
      });

//       app.get(/icons/, function(req, res) {
//         res.redirect('http://localhost:3001'+req.url);
//     });
    


//coles component

app.get("/images/bundle.js", (req, res)=> {
        axios.get('http://localhost:3004/bundle.js')
        .then((response)=> {

                res.send(response.data);
        }).catch((error)=> {
        console.log(error)
        });


});
app.get('/images', (req, res) => {
        axios.get('http://localhost:3004/images')
          .then((response) => {
            res.status(200).send(response.data);
          })
          .catch((err) => {
            res.status(500).end;
          })
      })


// app.get(/icons/, function(req, res) {
//     axios.get("http://localhost:3001"+req.url)
// 	.then((response)=> {
// 		res.setHeader('content-type', 'text/plain')
// 		res.send(JSON.stringify(response.data));
// })})
app.get(/icons/, function(req, res) {
        axios.get("http://localhost:3001"+req.url)
            .then((response) => {
                res.setHeader("content-type", "image/svg+xml")
                res.end(response.data)
            })
            .catch((err) => {
                res.end(err);
            })
    })





app.listen(port, function(){
console.log(`Coles PROXY server is listening on port ${port}`)
});




