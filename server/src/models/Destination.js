import mongoose from "mongoose";

// 1. Define the Review Schema (Subdocument)
const reviewSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required to leave a review"],
      trim: true,
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot be more than 5"],
    },
    comment: {
      type: String,
      trim: true,
    },
    // Optional: Reference to a User model if you have authentication
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'User',
    //   required: true
    // }
  },
  { timestamps: true } // Automatically tracks when the review was created
);

// 2. Define the Destination Schema
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
    Places: {
      type: String,
    },
    TimeEstimation: {
      type: Number,
    },
    // 3. Add Reviews and Summary Fields
    reviews: [reviewSchema], // Array of review subdocuments
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    numberOfReviews: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Destination = mongoose.model("Destination", destinationSchema);

export default Destination;
