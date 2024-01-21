function handleError(error, status, customMessage = 'An error occurred') {
  console.error('Error:', error);

  const errorMessage = error.message || customMessage;

  return res.status(status).json({ success: false, message: errorMessage });
}

module.exports = { handleError };
