import Trip from "../models/Trip.js";
import Destination from "../models/Destination.js";
import Experience from "../models/Experience.js";
import Event from "../models/Event.js";

// ==============================
// CREATE TRIP
// POST /api/trips
// ==============================

export const createTrip = async (req, res) => {
  try {
    const {
      destinationId,
      startDate,
      numberOfDays,
      budget,
      interests,
    } = req.body;

    // Validate destination

    const destination = await Destination.findById(
      destinationId,
    );

    if (!destination) {
      return res.status(404).json({
        success: false,
        message: "Destination not found.",
      });
    }

    // Find experiences for destination

    const experiences = await Experience.find({
      destinationId,
    });

    // Find events for destination

    const events = await Event.find({
      destinationId,
    });

    const totalDays = Number(numberOfDays);

    // Combine activities

    const activities = [
      ...experiences.map((experience) => ({
        type: "experience",
        id: experience._id,
        title: experience.title,
        price: experience.price || 0,
      })),

      ...events.map((event) => ({
        type: "event",
        id: event._id,
        title: event.title,
        price: event.price || 0,
      })),
    ];

    // Filter based on interests if available

    let selectedActivities = activities;

    if (
      Array.isArray(interests) &&
      interests.length > 0
    ) {
      selectedActivities = activities;
    }

    // Create day-wise itinerary

    const itinerary = [];

    let activityIndex = 0;

    for (let day = 1; day <= totalDays; day++) {
      const dayActivities = [];

      // Add up to 3 activities per day

      for (let i = 0; i < 3; i++) {
        if (
          selectedActivities.length === 0
        ) {
          break;
        }

        const activity =
          selectedActivities[
            activityIndex %
              selectedActivities.length
          ];

        dayActivities.push(activity);

        activityIndex++;
      }

      itinerary.push({
        day,
        activities: dayActivities,
      });
    }

    // Calculate estimated cost

    const estimatedCost =
      itinerary.reduce(
        (total, day) =>
          total +
          day.activities.reduce(
            (dayTotal, activity) =>
              dayTotal +
              (activity.price || 0),
            0,
          ),
        0,
      );

    // Create trip

    const trip = await Trip.create({
      destinationId,
      title: `${destination.name} Trip`,
      startDate,
      numberOfDays: totalDays,
      budget,
      interests,
      itinerary,
      estimatedCost,
    });

    return res.status(201).json({
      success: true,
      message: "Trip created successfully.",
      data: trip,
    });
  } catch (error) {
    console.error("CREATE TRIP ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to create trip.",
      error: error.message,
    });
  }
};

// ==============================
// GET TRIP BY ID
// GET /api/trips/:id
// ==============================

export const getTripById = async (req, res) => {
  try {
    const { id } = req.params;

    const trip = await Trip.findById(id).populate(
      "destinationId",
      "name state image",
    );

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: trip,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to fetch trip.",
      error: error.message,
    });
  }
};