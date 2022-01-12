import mongoose from "mongoose";

const standSchema = mongoose.Schema({
  city: String,
  street: String,
  locationDescription: String,
  firstName: String,
  lastName: String,
  creator: Number,
  phone: Number,
  location: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    },
  },
  tags: [String],
  selectedFile: String,
  likes: { type: [String], default: [] },
  comments: { type: [String], default: [] },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});
standSchema.index({'$**': 'text'});
standSchema.index( { "location" : "2dsphere" } )


var StandModel = mongoose.model("StandModel", standSchema);


export default StandModel;
