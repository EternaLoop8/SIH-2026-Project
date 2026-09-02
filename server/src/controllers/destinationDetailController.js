import DestinationDetail from "../models/DestinationDetail.js";

// @desc    Get complete details for a destination by ID
// @route   GET /api/destinations/:id
export const getDestinationDetailById = async (req, res) => {
  try {
    const { id } = req.params;

    // Finds the details document and pulls structural info from the parent collection
    const details = await DestinationDetail.findOne({ destinationId: id }).populate("destinationId");

    if (!details) {
      return res.status(404).json({
        success: false,
        message: "Particulars for this destination were not found."
      });
    }

    res.status(200).json({
      success: true,
      data: details
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error retrieving destination details.",
      error: error.message
    });
  }
};

// @desc    Create extended destination details by target ID
// @route   POST /api/destinations/:id
export const createDestinationDetailById = async (req, res) => {
  try {
    const { id } = req.params; // 🌟 This is your destinationId from the URL path
    const {
      description,
      tourGuideName,
      tourGuideExperience,
      tourGuideLanguages,
      highlights,
      included,
      excluded
    } = req.body;

    // 1. Check if files were uploaded
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please upload at least one image asset."
      });
    }

    // 2. Map files from Cloudinary storage payload
    const imageFiles = req.files.map((file) => ({
      url: file.path,
      public_id: file.filename
    }));

    // 3. Save detailed structure using the URL parameter id
    const newDetail = new DestinationDetail({
      destinationId: id, // 🌟 Mapping parameter id here
      description,
      images: imageFiles,
      tourGuide: {
        name: tourGuideName,
        experience: tourGuideExperience,
        languages: tourGuideLanguages ? JSON.parse(tourGuideLanguages) : [],
        avatar: imageFiles[0]?.url || "" // Safe access fallback configuration
      },
      highlights: highlights ? JSON.parse(highlights) : [],
      included: included ? JSON.parse(included) : [],
      excluded: excluded ? JSON.parse(excluded) : []
    });

    await newDetail.save();

    res.status(201).json({
      success: true,
      message: "Destination detailed itinerary saved successfully under this ID!",
      data: newDetail
    });
  } catch (error) {
    // Handle duplicate key error if details already exist for this destination
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Details already exist for this destination. Use a PUT request to update instead."
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal backend error saving detailed records.",
      error: error.message
    });
  }
};
