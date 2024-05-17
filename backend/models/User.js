const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true},
  password: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  verified: { type: Boolean, default: false },
  refreshToken: { type: String , default: 'None'},
  connected: { type: Boolean, default: false },
  lastConnection: { type: Date, default: null },
  gender: { type: String, enum: ['Male', 'Female', 'Other', 'None'], default: 'None' },
  sexualPreferences: { type: String, enum: ['Male', 'Female', 'Both', 'None'], default: 'None' },
  biography: { type: String, default: 'bio here' },
  age: { type: Number, default: null },
  interests: [{ type: String }], // Tags like #vegan, #geek, etc.
  photos: [{ type: String}],//, validate: [arrayLimit, 'Cannot exceed 5 photos'] }],
  profilePicture: { type: Number, default: 1},
  fameRating: { type: Number, default: 0 }, // Fame rating can be calculated based on various criteria
  location: {
	type: { type: String, default: 'Point' }, // GeoJSON type
    coordinates: { type: [Number], default: [0, 0] } // Longitude, Latitude
  },
  viewedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }], // Array of user IDs who viewed the profile
  likedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }], // Array of user IDs who liked the profile
  matcha: [{ type: Schema.Types.ObjectId, ref: 'User' }], // Array of user IDs who matched each other
  notifications: [{ // Array of notifications
	title: { type: String, required: true },
	body: { type: String, required: true },
	viewed : { type: Boolean, default: false },
	date: { type: Date, default: Date.now }
  }],
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps,
});


// Helper function to ensure the photos array does not exceed 5 elements
// function arrayLimit(val) {
//   return val.length <= 5;
// }

// To index the location field for geo-queries
userSchema.index({ location: '2dsphere' });

const User = mongoose.model('User', userSchema);

module.exports = User;
