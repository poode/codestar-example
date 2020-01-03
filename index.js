const awsServerlessExpress = require('aws-serverless-express');
require('dotenv');
const env = require('dotenv');

const app = require('./app');
const log = require('npmlog');
const port = 3000 || process.env.PORT;
env.config();

if (process.env.NODE_ENV === 'production') {
  // serverless wrapper used to allow server to be used as serverless application!
  const awsServer = awsServerlessExpress.createServer(app);
  exports.handler = (event, context) => awsServerlessExpress.proxy(awsServer, event, context);
} else {
  app.listen(port, () => log.info('Status', `Server is Up and Running on port ${port}!`));
}
