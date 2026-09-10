import ExperienceDetail from "../models/ExperienceDetail.js";
import Experience from "../models/Experience.js";

// GET /api/experiences/:id
export const getExperienceDetailById = async (req, res) => {
  try {
    const { id } = req.params;

    const details = await ExperienceDetail.findOne({
      experienceId: id,
    }).populate("experienceId");

    if (!details) {
      return res.status(404).json({
        success: false,
        message: "Details for this experience were not found.",
      });
    }
    return res.status(200).json({
      success: true,
      data: details,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error retrieving experience details",
      error: error.message,
    });
  }
};

export const createExperienceDetailById = async (req, res) => {
  try {
    const { id } = req.params;

    const { title, description, tags, rating, price } = req.body;

    const experience = await Experience.findById(id);

    if (!experience) {
      return res.staus(404).json({
        sucess: false,
        message: "Experience not found.",
      });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        sucess: false,
        message: "Please upload at least one image asset.",
      });
    }

    const imageFiles = req.files.map((file) => ({
      url: file.path,
      public_id: file.filename,
    }));

    const newDetail = new ExperienceDetail({
      experienceId: experience._id,

      title,
      description,
      tags,
      rating,
      price,

      images: imageFiles,
    });
    await newDetail.save();

    return res.status(201).json({
      success: true,
      message: "Destination  details created sucessfully.",
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
