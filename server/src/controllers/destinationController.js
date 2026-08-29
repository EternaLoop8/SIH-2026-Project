import Destination from "../models/Destination.js";

// GET /api/destinations
export const getDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find();

    res.status(200).json({
      success: true,
      count: destinations.length,
      data: destinations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch destinations",
    });
  }
};


// GET /api/destinations/:id
export const getDestinationById = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);

    if (!destination) {
      return res.status(404).json({
        success: false,
        message: "Destination not found",
      });
    }

    res.status(200).json({
      success: true,
      data: destination,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch destination",
    });
  }
};


// POST /api/destinations
export const createDestination = async (req, res) => {
  try {
    const destination = await Destination.create(req.body);

    res.status(201).json({
      success: true,
      message: "Destination created successfully",
      data: destination,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};