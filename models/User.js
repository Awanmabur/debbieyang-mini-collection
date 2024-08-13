const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  token: {
    type: String
  },
  confirmed: {
    type: Boolean,
    default: false
  },
  confirmationToken: {
    type: String
  },
  bios: {
    type: String
  },
  whatsapp: {
    type: String
  },
  phonecall: {
    type: String
  },
  image: {
    type: String,
  },
  role : { type: String, enum: {
    values: ['user', 'admin', 'super-admin'],
    message: '{VALUE} is not supported'
  }},
  likes: {
    type: Number,
    default: 0
  },
  followers: {
    type: Number,
    default: 0
  },
  likedBy: [String],
  followedBy: [String],
  Items: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Item',
    },
  ],
},
{
  timestamps: true,
});

let User;
try {
  User = mongoose.model("User");
} catch {
  User = mongoose.model("User", UserSchema);
}
module.exports = User;
