module.exports = function(err, req, res, next) {
  console.error(err.message, err);

  if (err.message === "Email already in use") {
    res.status(409).json({message: err.message})
  } else {
    res.status(500).json({message: "something failed"});
  }
}