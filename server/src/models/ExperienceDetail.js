import mongoose from "mongoose";

const ExperienceDetailSchema = new mongoose.Schema({

    // Link this with primary Experience document ID
    experienceId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Experience",
        required: true,
        unique: true 
    },

    title: {type: String, required: true},

    description: {type: String},

    images: [{
        url: { type: String, required: true },
        public_id: { type: String, required: true }
    }],

    tags: [
      {
        type: String,
      },
    ],

    rating: {type: Number},

    price: {type: Number},
});

export default mongoose.model("ExperienceDetail", ExperienceDetailSchema);