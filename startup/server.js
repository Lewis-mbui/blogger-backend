const app = require('./app');

function createServer() {
  const port = process.env.PORT || 4000;
  return app.listen(port, () => console.log(`Server started on port ${port}...`));
}

module.exports = createServer;