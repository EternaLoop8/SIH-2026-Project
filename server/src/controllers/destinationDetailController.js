import DestinationDetail from "../models/DestinationDetail.js";
import Destination from "../models/Destination.js";

// @desc    Get complete details for a destination by ID
// @route   GET /api/destinations/:id/details
export const getDestinationDetailById = async (req, res) => {
try {
const { id } = req.params;


const details = await DestinationDetail.findOne({
  destinationId: id,
}).populate("destinationId");

if (!details) {
  return res.status(404).json({
    success: false,
    message: "Details for this destination were not found.",
  });
}

return res.status(200).json({
  success: true,
  data: details,
});


} catch (error) {
return res.status(500).json({
success: false,
message: "Internal server error retrieving destination details.",
error: error.message,
});
}
};

// @desc    Create extended destination details by destination ID
// @route   POST /api/destinations/:id/details
export const createDestinationDetailById = async (req, res) => {
try {
const { id } = req.params;


const {
  description,
  tourGuideName,
  tourGuideExperience,
  tourGuideLanguages,
  highlights,
  included,
  excluded,
} = req.body;

// Verify parent destination exists
const destination = await Destination.findById(id);

if (!destination) {
  return res.status(404).json({
    success: false,
    message: "Destination not found.",
  });
}

// Check uploaded images
if (!req.files || req.files.length === 0) {
  return res.status(400).json({
    success: false,
    message: "Please upload at least one image asset.",
  });
}

const imageFiles = req.files.map((file) => ({
  url: file.path,
  public_id: file.filename,
}));

const newDetail = new DestinationDetail({
  destinationId: destination._id,

  description,

  images: imageFiles,

  tourGuide: {
    name: tourGuideName,
    experience: tourGuideExperience,
    languages: tourGuideLanguages
      ? JSON.parse(tourGuideLanguages)
      : [],
    avatar: imageFiles[0]?.url || "",
  },

  highlights: highlights ? JSON.parse(highlights) : [],
  included: included ? JSON.parse(included) : [],
  excluded: excluded ? JSON.parse(excluded) : [],
});

await newDetail.save();

return res.status(201).json({
  success: true,
  message: "Destination details created successfully.",
  data: newDetail,
});


} catch (error) {
if (error.code === 11000) {
return res.status(400).json({
success: false,
message:
"Details already exist for this destination. Use PUT to update them.",
});
}


return res.status(500).json({
  success: false,
  message: "Internal backend error saving detailed records.",
  error: error.message,
});


}
};
