const ValidationError = require('./errors/ValidationError');

module.exports = (updates, allowedFields) => {
  const forbidden = Object.keys(updates)
    .filter(field => !allowedFields.includes(field));

  if (forbidden.length) {
    throw new ValidationError(
      `Forbidden fields: ${forbidden.join(", ")}`
    );
  }
}