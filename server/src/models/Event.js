import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    destinationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Destination",
      required: true,
    },

    category: {
      type: String,
      enum: [
        "culture",
        "festival",
        "food",
        "adventure",
        "music",
        "workshop",
        "other",
      ],
      default: "other",
    },

    date: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
    },

    location: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      default: 0,
      min: 0,
    },

    image: {
      url: {
        type: String,
        default: "",
      },

      public_id: {
        type: String,
        default: "",
      },
    },

    organizer: {
      type: String,
      default: "",
    },

    maxParticipants: {
      type: Number,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Event", eventSchema);