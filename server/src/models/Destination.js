import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    state: {
      type: String,
      required: true,
    },

    image: {
      type: String,
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

    location: {
      latitude: {
        type: Number,
        required: true,
      },

      longitude: {
        type: Number,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  },
);

const Destination = mongoose.model("Destination", destinationSchema);

export default Destination;
