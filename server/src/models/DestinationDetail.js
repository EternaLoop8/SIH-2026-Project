import mongoose from "mongoose";

// ==========================================
// PRICING SCHEMA
// ==========================================

const pricingSchema = new mongoose.Schema(
  {
    ticketFee: {
      type: Number,
      default: 0,
      min: 0,
    },

    localTourGuideFee: {
      type: Number,
      default: 0,
      min: 0,
    },

    accommodationFee: {
      type: Number,
      default: 0,
      min: 0,
    },

    activityFee: {
      type: Number,
      default: 0,
      min: 0,
    },

    transportationFee: {
      type: Number,
      default: 0,
      min: 0,
    },

    otherFee: {
      type: Number,
      default: 0,
      min: 0,
    },

    total: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { _id: false }
);

// ==========================================
// RELATED PLACES SCHEMA
// ==========================================

const relatedPlaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  description: {
    type: String,
    default: "",
  },

  distance: {
    type: String,
    default: "",
  },

  bestTimeToVisit: {
    type: String,
    default: "",
  },

  recommendedDuration: {
    type: String,
    default: "",
  },
});

// ==========================================
// TESTIMONIAL SCHEMA
// ==========================================

const testimonialSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    comment: {
      type: String,
      required: true,
      trim: true,
    },

    visitDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

// ==========================================
// DESTINATION DETAIL SCHEMA
// ==========================================

const DestinationDetailSchema = new mongoose.Schema(
  {
    destinationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Destination",
      required: true,
      unique: true,
    },

    description: {
      type: String,
      required: true,
    },

    // ==========================================
    // IMAGES
    // ==========================================

    images: [
      {
        url: {
          type: String,
          required: true,
        },

        public_id: {
          type: String,
          required: true,
        },
      },
    ],

    // ==========================================
    // TOUR GUIDE
    // ==========================================

    tourGuide: {
      name: {
        type: String,
        required: true,
      },

      avatar: {
        type: String,
        default: "",
      },

      experience: {
        type: String,
        required: true,
      },

      languages: [
        {
          type: String,
        },
      ],

      rating: {
        type: Number,
        default: 5,
        min: 0,
        max: 5,
      },
    },

    // ==========================================
    // PRICING
    // ==========================================

    pricing: {
      type: pricingSchema,
      default: () => ({}),
    },

    // ==========================================
    // HIGHLIGHTS
    // ==========================================

    highlights: [
      {
        type: String,
      },
    ],

    // ==========================================
    // INCLUDED
    // ==========================================

    included: [
      {
        type: String,
      },
    ],

    // ==========================================
    // EXCLUDED
    // ==========================================

    excluded: [
      {
        type: String,
      },
    ],

    // ==========================================
    // RELATED PLACES
    // ==========================================

    relatedPlaces: {
      type: [relatedPlaceSchema],
      default: [],
    },

    // ==========================================
    // CURATED TESTIMONIALS
    // ==========================================

    testimonials: {
      type: [testimonialSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "DestinationDetail",
  DestinationDetailSchema
);
