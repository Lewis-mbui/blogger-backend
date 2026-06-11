const app = require('./startup/app');
const connectDb = require('./startup/connectDb');
const registerProcessHandlers = require('./startup/processHandlers');

let server;

registerProcessHandlers(() => server);

async function start() {
  try {
    await connectDb();

    const port = process.env.PORT || 4000;
    server = app.listen(port, () => console.log(`Server started on port ${port}...`));
  } catch (err) {
    console.error("Failed to start application");
    console.error(err);

    process.exit(1)
  }
}

start();