import mongoose from "mongoose";

const DestinationDetailSchema = new mongoose.Schema(
  {
    // Links this directly to your primary Destination document ID
    destinationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Destination",
      required: true,
      unique: true // One detail document per destination
    },
    description: { type: String, required: true },
    
    // Cloudinary Images Array Structure
    images: [
      {
        url: { type: String, required: true },
        public_id: { type: String, required: true }
      }
    ],
    
    // Tour Guide Nested Object
    tourGuide: {
      name: { type: String, required: true },
      avatar: { type: String, default: "" },
      experience: { type: String, required: true },
      languages: [{ type: String }],
      rating: { type: Number, default: 5 }
    },
    
    highlights: [{ type: String }],
    included: [{ type: String }],
    excluded: [{ type: String }]
  },
  { timestamps: true }
);

export default mongoose.model("DestinationDetail", DestinationDetailSchema);
