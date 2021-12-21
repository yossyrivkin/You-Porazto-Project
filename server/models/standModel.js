import mongoose from "mongoose";

const standSchema = mongoose.Schema({
  city: String,
  street: String,
  locationDescription: String,
  firstName: String,
  lastName: String,
  phone: Number,
  location: Object,
  tags: [String],
  selectedFile: String,
  likes: { type: [String], default: [] },
  comments: { type: [String], default: [] },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

var StandModel = mongoose.model("StandModel", standSchema);

export default StandModel;
