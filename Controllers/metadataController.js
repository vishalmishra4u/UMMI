const Metadata = require('../Models/metadataModel');
const User = require('../Models/userModel');
const { handleError } = require('../Services/errorService');

async function createMetadata(req, res) {
  try {
    const createdMetadata = await Metadata.create(req.body.metadata);

    return createdMetadata;
  } catch (error) {
    console.error('Error during metadata creation:', error);
    return handleError(error, 400, 'Metadata creation failed');
  }
}

async function updateMetadata(req, res) {
  try {
    const metadataId = req.params.id;
    if (
      req.body.updatedMetadata.title &&
      req.body.updatedMetadata.description
    ) {
      const result = await Metadata.findByIdAndUpdate(
        metadataId,
        req.body.updatedMetadata,
        { new: true }
      );

      if (!result) {
        throw new Error('Metadata not found');
      }

      return result;
    } else {
      throw new Error('Invalid metadata update: Missing title or description');
    }
  } catch (error) {
    console.error('Error during metadata update:', error);
    return handleError(error, 400, 'Metadata update failed');
  }
}

async function deleteMetadata(req, res) {
  try {
    const deletedMetadata = await Metadata.findByIdAndDelete(
      req.params.metadataId
    );

    if (!deletedMetadata) {
      throw new Error('Metadata not found');
    }

    return deletedMetadata;
  } catch (error) {
    console.error('Error during metadata deletion:', error);
    return handleError(error, 400, 'Metadata deletion failed');
  }
}

async function getMetadataByRole(req, res) {
  try {
    const userId = req.queru.userId;
    const user = await User.findOne({ userId });

    if (!user) {
      throw new Error('User not found');
    }

    const userRole = user.userRole;
    const metadata = await Metadata.find({
      [`access_control.${userRole}`]: { $exists: true },
    });

    // Filter fields based on access control for the role
    const filteredMetadata = metadata.map((item) => {
      const allowedFields = ['title', ...item.access_control[userRole]];
      const filteredItem = Object.keys(item.toObject())
        .filter((key) => allowedFields.includes(key))
        .reduce((obj, key) => {
          obj[key] = item[key];
          return obj;
        }, {});
      return filteredItem;
    });

    return filteredMetadata;
  } catch (error) {
    console.error('Error during metadata retrieval:', error);
    return handleError(error, 400, 'Metadata retrieval failed');
  }
}

module.exports = {
  createMetadata,
  updateMetadata,
  deleteMetadata,
  getMetadataByRole,
};
