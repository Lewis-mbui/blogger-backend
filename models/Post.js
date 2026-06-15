const { default: mongoose } = require("mongoose");

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 200,
    trim: true
  },
  content: {
    type: String,
    required: true,
    minLength: 2,
    trim: true
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  views: {
    type: Number,
    default: 0
  },
  publishedAt: {
    type: Date,
    default: null
  }
}, { timeStamps: true });

module.exports = mongoose.model('Post', postSchema);