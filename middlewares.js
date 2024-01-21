// Middleware function for validating the request body
const validateMetadata = (req, res, next) => {
  if (!Array.isArray(req.body)) {
    return res
      .status(400)
      .json({ error: 'Invalid request body. Expected an array.' });
  }

  for (const metadataObject of req.body) {
    const requiredFields = [
      'title',
      'description',
      'release_date',
      'genres',
      'cast',
      'crew',
      'access_control',
    ];

    // Check if all required fields are present in the current object
    for (const field of requiredFields) {
      if (!metadataObject.hasOwnProperty(field)) {
        return res.status(400).json({
          error: `Missing "${field}" field in one or more metadata objects.`,
        });
      }
    }
  }

  next();
};

module.exports = { validateMetadata };
