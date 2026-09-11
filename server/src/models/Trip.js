import mongoose from "mongoose";

const tripSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    destinationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Destination",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    startDate: {
      type: Date,
      required: true,
    },

    numberOfDays: {
      type: Number,
      required: true,
      min: 1,
    },

    budget: {
      type: String,
      enum: ["budget", "moderate", "luxury"],
      default: "moderate",
    },

    interests: [
      {
        type: String,
      },
    ],

    itinerary: [
      {
        day: {
          type: Number,
          required: true,
        },

        activities: [
          {
            type: mongoose.Schema.Types.Mixed,
          },
        ],
      },
    ],

    estimatedCost: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Trip", tripSchema);