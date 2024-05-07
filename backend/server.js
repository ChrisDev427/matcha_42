let express = require('express');
let app = express();


//template engine

//static files
// app.use('/assets', express.static('public'));
// app.use('/js', express.static('views/pages/js'));
app.use(express.static('../frontend/dist'));

// //middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//routes
app.get('/', (req, res) => {
})


// const user = require('./models/User');


app.get('*', (req, res) => {
  res.sendFile('../frontend/dist/index.html');
});


//start server
app.listen(8080, () => {
	  console.log('Server is running on port 8080');
});