module.exports = function(err, req, res, next) {
  console.error(err.message, err);

  res.status(500).send('something failed');
  process.exit(1);
}