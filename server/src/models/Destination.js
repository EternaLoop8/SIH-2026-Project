import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    description: {
      type: String,
    },
    state: {
      type: String,
      required: [true, "State is required"],
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
    tags: [
      {
        type: String,
      },
    ],
    bestTimeToVisit: {
      type: String,
    },
    estimatedDays: {
      type: Number,
    },
    // Explicitly declaring the type as a nested Schema or enforcing the object structure
    location: {
      type: {
        latitude: {
          type: Number,
        },
        longitude: {
          type: Number,
        },
      },
    },
  },
  {
    timestamps: true,
  }
);

const Destination = mongoose.model("Destination", destinationSchema);
export default Destination;
