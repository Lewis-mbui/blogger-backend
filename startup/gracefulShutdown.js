module.exports = function(server, exitCode = 1) {
  if (!server) process.exit(exitCode);

  server.close(() => {
    console.log("HTTP Server closed");
    process.exit(exitCode);
  })
}