import Event from "../models/Event.js";
import Destination from "../models/Destination.js";

// ==============================
// GET ALL EVENTS
// GET /api/events
// ==============================

export const getEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .populate("destinationId", "name state image")
      .sort({ date: 1 });

    return res.status(200).json({
      success: true,
      data: events,
    });
  } catch (error) {
    console.error("GET EVENTS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch events.",
      error: error.message,
    });
  }
};

// ==============================
// GET SINGLE EVENT
// GET /api/events/:id
// ==============================

export const getEventById = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findById(id).populate(
      "destinationId",
      "name state image",
    );

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: event,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to fetch event.",
      error: error.message,
    });
  }
};

// ==============================
// CREATE EVENT
// POST /api/events
// ==============================

export const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      destinationId,
      category,
      date,
      endDate,
      location,
      price,
      organizer,
      maxParticipants,
      isFeatured,
    } = req.body;

    // Verify destination exists
    const destination = await Destination.findById(destinationId);

    if (!destination) {
      return res.status(404).json({
        success: false,
        message: "Destination not found.",
      });
    }

    let image = {
      url: "",
      public_id: "",
    };

    if (req.file) {
      image = {
        url: req.file.path,
        public_id: req.file.filename,
      };
    }

    const event = await Event.create({
      title,
      description,
      destinationId,
      category,
      date,
      endDate: endDate || undefined,
      location,
      price: Number(price) || 0,
      image,
      organizer,
      maxParticipants: maxParticipants
        ? Number(maxParticipants)
        : undefined,
      isFeatured:
        isFeatured === true || isFeatured === "true",
    });

    return res.status(201).json({
      success: true,
      message: "Event created successfully.",
      data: event,
    });
  } catch (error) {
    console.error("CREATE EVENT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to create event.",
      error: error.message,
    });
  }
};