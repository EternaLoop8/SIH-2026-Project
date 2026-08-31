import mongoose from "mongoose";

const businessSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    category: {
      type: String,
    },
    rating: {
      type: Number,
      default: 0, 
    },
    reviewCount: {
      type: Number,
      default: 0, 
    },
    neighbourhood: {
      type: String,
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
    isOpen: {
      type: Boolean, 
      default: true,
    },
    tags: [
      {
        type: String, 
      },
    ],
  },
  {
    timestamps: true, 
  }
);

const Business = mongoose.model("Business", businessSchema);
export default Business;
