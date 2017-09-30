const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Start app
const app = express();

// // Connect to mLab database
// mongoose.Promise = global.Promise // Map global promise
// mongoose.connect('', {
//   useMongoClient: true
// })
//   .then(() => console.log('MongoDB successfully connected...'))
//   .catch(err => console.log(err));
//
// // Use Handlebars Middleware and setup view engine
// app.engine('handlebars', exphbs({
//   defaultLayout: 'main'
// }));
// app.set('view engine', 'handlebars');

// // Use Body-parser Middleware
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// Index Route
app.get('/', (req, res) => {
  res.send('It works!');
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
