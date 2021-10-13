const express = require('express');
// require('dotenv').config();
const app = express();
const cors = require('cors');

const port = process.env.PORT || 3000;

// const DIST_DIR = path.join(__dirname, "dist");
// const HTML_FILE = path.join(DIST_DIR, "index.html");

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(express.static('dist'));

//App imports
app.use('/api', require('./routes/api'));

//router handler to respond with main app
// app.get("/", (req, res) => {
//   res.sendFile(HTML_FILE, function(err){
//      if(err){
//         res.status(500).send(err);
//      }
//   });
// });

//Custom Error Handler
// Handle 'page not found' error
const AppError = require('../utils/AppError');

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.listen(port, () => {
  console.log(`The app server is running on port: ${port}`.yellow);
});
