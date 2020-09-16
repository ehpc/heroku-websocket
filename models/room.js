import mongoose from 'mongoose';

const RoomSchema = new mongoose.Schema({
  // Название чат-команты
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
    match: /^\p{L}+$/iu,
  },
  // Описание команты
  description: {
    type: String,
    required: true,
    minlength: 8,
  },
});

export default mongoose.model('Room', RoomSchema);
