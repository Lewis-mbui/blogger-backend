module.exports = function(err, req, res, next) {
  console.error(err.message, err);

  if (err.message === "Email already in use") {
    response.json({message: err.message})
  } else {
    res.status(500).json({message: "something failed"});
  }

  process.exit(1);
}