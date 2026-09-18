import DestinationDetail from "../models/DestinationDetail.js";
import Destination from "../models/Destination.js";

// ==========================================
// HELPER: PARSE JSON FORM-DATA FIELDS
// ==========================================

const parseJSONField = (value, defaultValue = []) => {
  if (!value) {
    return defaultValue;
  }

  // If already an object/array
  if (typeof value === "object") {
    return value;
  }

  try {
    return JSON.parse(value);
  } catch (error) {
    throw new Error(`Invalid JSON format: ${value}`);
  }
};

// ==========================================
// HELPER: CALCULATE TOTAL PRICE
// ==========================================

const calculateTotalPrice = (pricing = {}) => {
  const ticketFee = Number(pricing.ticketFee) || 0;
  const localTourGuideFee =
    Number(pricing.localTourGuideFee) || 0;
  const accommodationFee =
    Number(pricing.accommodationFee) || 0;
  const activityFee =
    Number(pricing.activityFee) || 0;
  const transportationFee =
    Number(pricing.transportationFee) || 0;
  const otherFee =
    Number(pricing.otherFee) || 0;

  return (
    ticketFee +
    localTourGuideFee +
    accommodationFee +
    activityFee +
    transportationFee +
    otherFee
  );
};

// ==========================================
// GET DESTINATION DETAILS
// GET /api/destinations/:id/details
// ==========================================

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
    console.error("GET DESTINATION DETAILS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error retrieving destination details.",
      error: error.message,
    });
  }
};

// ==========================================
// CREATE DESTINATION DETAILS
// POST /api/destinations/:id/details
// ==========================================

export const createDestinationDetailById = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      description,
      tourGuideName,
      tourGuideExperience,
      tourGuideLanguages,
      pricing,
      highlights,
      included,
      excluded,
      relatedPlaces,
      testimonials,
    } = req.body;

    // ==========================================
    // VERIFY DESTINATION
    // ==========================================

    const destination = await Destination.findById(id);

    if (!destination) {
      return res.status(404).json({
        success: false,
        message: "Destination not found.",
      });
    }

    // ==========================================
    // CHECK EXISTING DETAILS
    // ==========================================

    const existingDetails = await DestinationDetail.findOne({
      destinationId: id,
    });

    if (existingDetails) {
      return res.status(400).json({
        success: false,
        message:
          "Details already exist for this destination. Use PUT to update them.",
      });
    }

    // ==========================================
    // CHECK IMAGES
    // ==========================================

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please upload at least one image.",
      });
    }

    // ==========================================
    // CLOUDINARY IMAGES
    // ==========================================

    const imageFiles = req.files.map((file) => ({
      url: file.path,
      public_id: file.filename,
    }));

    // ==========================================
    // PRICING
    // ==========================================

    // IMPORTANT:
    // Parse the pricing field, NOT tourGuideLanguages
    const parsedPricing = parseJSONField(pricing, {});

    parsedPricing.ticketFee =
      Number(parsedPricing.ticketFee) || 0;

    parsedPricing.localTourGuideFee =
      Number(parsedPricing.localTourGuideFee) || 0;

    parsedPricing.accommodationFee =
      Number(parsedPricing.accommodationFee) || 0;

    parsedPricing.activityFee =
      Number(parsedPricing.activityFee) || 0;

    parsedPricing.transportationFee =
      Number(parsedPricing.transportationFee) || 0;

    parsedPricing.otherFee =
      Number(parsedPricing.otherFee) || 0;

    // Calculate total automatically
    parsedPricing.total =
      calculateTotalPrice(parsedPricing);

    // ==========================================
    // PARSE OTHER FORM-DATA FIELDS
    // ==========================================

    const parsedLanguages =
      parseJSONField(tourGuideLanguages, []);

    const parsedHighlights =
      parseJSONField(highlights, []);

    const parsedIncluded =
      parseJSONField(included, []);

    const parsedExcluded =
      parseJSONField(excluded, []);

    const parsedRelatedPlaces =
      parseJSONField(relatedPlaces, []);

    const parsedTestimonials =
      parseJSONField(testimonials, []);

    // ==========================================
    // CREATE DESTINATION DETAILS
    // ==========================================

    const newDetail = new DestinationDetail({
      destinationId: destination._id,

      description,

      images: imageFiles,

      // ==========================================
      // TOUR GUIDE
      // ==========================================

      tourGuide: {
        name: tourGuideName,
        experience: tourGuideExperience,
        languages: parsedLanguages,
        avatar: imageFiles[0]?.url || "",
      },

      // ==========================================
      // PRICING
      // ==========================================

      pricing: parsedPricing,

      // ==========================================
      // HIGHLIGHTS
      // ==========================================

      highlights: parsedHighlights,

      // ==========================================
      // INCLUDED / EXCLUDED
      // ==========================================

      included: parsedIncluded,
      excluded: parsedExcluded,

      // ==========================================
      // RELATED PLACES
      // ==========================================

      relatedPlaces: parsedRelatedPlaces,

      // ==========================================
      // TESTIMONIALS
      // ==========================================

      testimonials: parsedTestimonials,
    });

    // ==========================================
    // SAVE
    // ==========================================

    await newDetail.save();

    // ==========================================
    // RESPONSE
    // ==========================================

    return res.status(201).json({
      success: true,
      message: "Destination details created successfully.",
      data: newDetail,
    });
  } catch (error) {
    console.error(
      "CREATE DESTINATION DETAILS ERROR:",
      error
    );

    // Duplicate destination details
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message:
          "Details already exist for this destination. Use PUT to update them.",
      });
    }

    return res.status(500).json({
      success: false,
      message:
        "Internal server error while creating destination details.",
      error: error.message,
    });
  }
};

// ==========================================
// UPDATE DESTINATION DETAILS
// PUT /api/destinations/:id/details
// ==========================================

export const updateDestinationDetailById = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    // ==========================================
    // FIND EXISTING DETAILS
    // ==========================================

    const details = await DestinationDetail.findOne({
      destinationId: id,
    });

    if (!details) {
      return res.status(404).json({
        success: false,
        message:
          "Destination details not found. Create them using POST first.",
      });
    }

    const {
      description,
      tourGuideName,
      tourGuideExperience,
      tourGuideLanguages,
      pricing,
      highlights,
      included,
      excluded,
      relatedPlaces,
      testimonials,
    } = req.body;

    // ==========================================
    // DESCRIPTION
    // ==========================================

    if (description !== undefined) {
      details.description = description;
    }

    // ==========================================
    // TOUR GUIDE
    // ==========================================

    if (tourGuideName !== undefined) {
      details.tourGuide.name = tourGuideName;
    }

    if (tourGuideExperience !== undefined) {
      details.tourGuide.experience =
        tourGuideExperience;
    }

    if (tourGuideLanguages !== undefined) {
      details.tourGuide.languages =
        parseJSONField(
          tourGuideLanguages,
          []
        );
    }

    // ==========================================
    // IMAGES
    // ==========================================

    if (
      req.files &&
      req.files.length > 0
    ) {
      const newImages = req.files.map(
        (file) => ({
          url: file.path,
          public_id: file.filename,
        })
      );

      // Replace existing images
      details.images = newImages;

      // Use first image as guide avatar
      details.tourGuide.avatar =
        newImages[0]?.url ||
        details.tourGuide.avatar;
    }

    // ==========================================
    // PRICING
    // ==========================================

    if (pricing !== undefined) {
      const parsedPricing =
        parseJSONField(pricing, {});

      parsedPricing.ticketFee =
        Number(parsedPricing.ticketFee) || 0;

      parsedPricing.localTourGuideFee =
        Number(
          parsedPricing.localTourGuideFee
        ) || 0;

      parsedPricing.accommodationFee =
        Number(
          parsedPricing.accommodationFee
        ) || 0;

      parsedPricing.activityFee =
        Number(
          parsedPricing.activityFee
        ) || 0;

      parsedPricing.transportationFee =
        Number(
          parsedPricing.transportationFee
        ) || 0;

      parsedPricing.otherFee =
        Number(
          parsedPricing.otherFee
        ) || 0;

      parsedPricing.total =
        calculateTotalPrice(
          parsedPricing
        );

      details.pricing = parsedPricing;
    }

    // ==========================================
    // HIGHLIGHTS
    // ==========================================

    if (highlights !== undefined) {
      details.highlights =
        parseJSONField(
          highlights,
          []
        );
    }

    // ==========================================
    // INCLUDED
    // ==========================================

    if (included !== undefined) {
      details.included =
        parseJSONField(
          included,
          []
        );
    }

    // ==========================================
    // EXCLUDED
    // ==========================================

    if (excluded !== undefined) {
      details.excluded =
        parseJSONField(
          excluded,
          []
        );
    }

    // ==========================================
    // RELATED PLACES
    // ==========================================

    if (
      relatedPlaces !== undefined
    ) {
      details.relatedPlaces =
        parseJSONField(
          relatedPlaces,
          []
        );
    }

    // ==========================================
    // TESTIMONIALS
    // ==========================================

    if (
      testimonials !== undefined
    ) {
      details.testimonials =
        parseJSONField(
          testimonials,
          []
        );
    }

    // ==========================================
    // SAVE
    // ==========================================

    await details.save();

    return res.status(200).json({
      success: true,
      message:
        "Destination details updated successfully.",
      data: details,
    });
  } catch (error) {
    console.error(
      "UPDATE DESTINATION DETAILS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Internal server error while updating destination details.",
      error: error.message,
    });
  }
};
