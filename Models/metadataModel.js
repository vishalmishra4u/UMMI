const mongoose = require('mongoose');

const metadataSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  release_date: { type: Date },
  genres: { type: [String] },
  cast: { type: [String] },
  crew: {
    director: { type: String },
    producer: { type: String },
    writer: { type: String },
  },
  access_control: {
    Admin: { type: [String] },
    Editor: { type: [String] },
    Viewer: { type: [String] },
  },
});

const Metadata = mongoose.model('Metadata', metadataSchema);

module.exports = Metadata;
