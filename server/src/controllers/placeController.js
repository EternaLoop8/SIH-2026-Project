import Place from "../models/Place.js";

// GET all places
export const getPlaces = async (req, res) => {
  try {
    const places = await Place.find()
      .populate("destination", "name");

    res.status(200).json({
      success: true,
      count: places.length,
      data: places,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch places",
    });
  }
};


// GET places by destination
export const getPlacesByDestination = async (req, res) => {
  try {
    const places = await Place.find({
      destination: req.params.destinationId,
    });

    res.status(200).json({
      success: true,
      count: places.length,
      data: places,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch places",
    });
  }
};


// GET single place
export const getPlaceById = async (req, res) => {
  try {
    const place = await Place.findById(req.params.id)
      .populate("destination", "name");

    if (!place) {
      return res.status(404).json({
        success: false,
        message: "Place not found",
      });
    }

    res.status(200).json({
      success: true,
      data: place,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch place",
    });
  }
};


// CREATE place
export const createPlace = async (req, res) => {
  try {
    const place = await Place.create(req.body);

    res.status(201).json({
      success: true,
      message: "Place created successfully",
      data: place,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};