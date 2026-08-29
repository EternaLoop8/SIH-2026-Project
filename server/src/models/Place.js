import mongoose from "mongoose";

const placeSchema = new mongoose.Schema(
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

    destination: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Destination",
      required: true,
    },

    category: {
      type: String,
      enum: [
        "monument",
        "temple",
        "museum",
        "nature",
        "viewpoint",
        "market",
        "other",
      ],
      required: true,
    },

    image: {
      type: String,
    },

    entryFee: {
      type: Number,
      default: 0,
    },

    averageVisitDuration: {
      type: Number,
      required: true,
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

    openingTime: {
      type: String,
    },

    closingTime: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Place = mongoose.model("Place", placeSchema);

export default Place;