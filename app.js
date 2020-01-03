const express = require('express');
const app = express();

app.use(express.json());

app.get('/', function(req, res) {
  res.json({
    message: 'Server Is Up And Running!'
  });
});

app.post('/', function(req, res) {
  res.json({
    message : "Hello World!"
  });
});


app.post('*', function (req, res) {
  res.status(404).json({
   message: "NOT_FOUND!"
  });
});


app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.json({
    message: err.status ? err.message : 'Internal Server Error By Us!',
  });
});


// Export your Express configuration so that it can be consumed by the Lambda handler
module.exports = app
