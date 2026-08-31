import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
  },
  image: {
    url: {
      type: String,
      required: [true, "Image URL is required"],
    },
    public_id: {
      type: String,
      required: [true, "Image public ID is required"],
    },
  },
  rating: {
    type: Number,
    default: 0,
  },
  reviewCount: {
    type: Number,
    default: 0,
  },
  isPopular: {
    type: Boolean,
    default: true,
  },
  duration: {
    type: Number,
  },
  price: {
    type: Number,
  },
  Categories: [
    {
      type: String,
    },
  ],
});

const Experience = mongoose.model("Experience", experienceSchema);
export default Experience;
