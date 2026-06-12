const createServer = require('./startup/server');
const connectDb = require('./startup/connectDb');
const registerProcessHandlers = require('./startup/processHandlers');

registerProcessHandlers(() => server);

async function start() {
  try {
    await connectDb();
    createServer();
  } catch (err) {
    console.error("Failed to start application");
    console.error(err);

    process.exit(1)
  }
}

start();