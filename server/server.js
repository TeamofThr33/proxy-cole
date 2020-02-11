const axios = require('axios');
const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const responseTime = require('response-time');
const redis = require('redis');
const client = redis.createClient();




const port = 3000;
let app = express();
app.use(morgan('dev'));
app.use(compression());
app.use(responseTime());

app.use(express.static(__dirname + '/../client'));
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());


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

checkCache2 = (req, res, next) => {
  const id = "restaurants";
  
  //get data value for key =id
  client.get(id, (err, data) => {
      if (err) {
          //console.log(err);
          res.status(500).send(err);
      }
      //if no match found
      if (data != null) {
          console.log("using Restaurant cached data!!!!!!!!")
          res.send(data);
      } 
      else {
          //proceed to next middleware function
          next();
      }
   });
};

app.get("/restaurants", checkCache2, async (req, res) => {
  try {
       const  id  = "restaurants";
       
       const restaurants = await axios.get(
       `http://localhost:3001/restaurants`
       );
       
       //get data from response
       const restaurantData = restaurants.data;
       
       client.setex(id, 100, JSON.stringify(restaurantData));
       
       return res.json(restaurantData);
  } 
  catch (error) {
       
       console.log(error);
       return res.status(500).json(error);
   }
});



// app.get('/restaurants', (req, res) => {
//         axios.get('http://localhost:3001/restaurants')
//           .then((response) => {
//             res.status(200).send(response.data);
//           })
//           .catch((err) => {
//             res.status(500).end;
//           })
//       });

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

//testing cache function
checkCache = (req, res, next) => {
  const id = "images";
  
  //get data value for key =id
  client.get(id, (err, data) => {
      if (err) {
          //console.log(err);
          res.status(500).send(err);
      }
      //if no match found
      if (data !== null) {
          console.log("using image cached data!!!!!!!!")
          res.send(data);
      } 
      else {
          //proceed to next middleware function
          next();
      }
   });
};

app.get("/images", checkCache, async (req, res) => {
  try {
       const  id  = "images";
       
       const images = await axios.get(
       `http://localhost:3004/images`
       );
       
       //get data from response
       const imageData = images.data;
       client.setex(id, 100, JSON.stringify(imageData));
       
       return res.json(imageData);
  } 
  catch (error) {
       
       console.log(error);
       return res.status(500).json(error);
   }
});









// app.get('/images', (req, res) => {
//         axios.get('http://localhost:3004/images')
//           .then((response) => {
//             res.status(200).send(response.data);
//           })
//           .catch((err) => {
//             res.status(500).end;
//           })
//       })


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




