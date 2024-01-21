const express = require('express');
const router = express.Router();
const metadataController = require('../Controllers/metadataController');
const middlewares = require('../middlewares');

// POST route to accept metadata
router.post(
  '/postMetadata',
  middlewares.validateMetadata,
  metadataController.createMetadata
);

router.put(
  '/:metadataId',
  middlewares.validateMetadata,
  metadataController.updateMetadata
);

router.delete('/:metadataId', metadataController.deleteMetadata);

// Get metadata by role (authorization required)
router.get('/getMetadata', metadataController.getMetadataByRole);

module.exports = router;
