const gracefulShutdown = require('./gracefulShutdown');

module.exports = function registerProcessHandlers(getServer) {
  process.on('uncaughtException', (err) => {
    console.error("UNCAUGHT EXCEPTION");
    console.error(err);

    process.exit(1);
  });

  process.on('unhandledRejection', (err) => {
    console.error('UNHANDLED REJECTION');
    console.error(err);

    gracefulShutdown(getServer(), 1);    
  });
}