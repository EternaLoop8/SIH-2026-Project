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
      required: [true, "Description is required"],
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
          required: [true, "Latitude is required"],
        },
        longitude: {
          type: Number,
          required: [true, "Longitude is required"],
        },
      },
      required: [true, "Location data object is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Destination = mongoose.model("Destination", destinationSchema);
export default Destination;
