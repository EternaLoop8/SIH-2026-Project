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


/// POST /api/destinations
export const createDestination = async (req, res) => {
  try {
    const files = req.files || (req.file ? [req.file] : null);
    if (!files || files.length === 0) {
      return res.status(400).json({ success: false, message: "Please upload an image file" });
    }

    const uploadedFile = files[0]; 

    // Extract latitude and longitude directly from req.body.location
    const lat = req.body.location?.latitude;
    const lng = req.body.location?.longitude;

    // 💡 FIX: Handle tag formatting seamlessly (handles single strings or comma-separated lists)
    let processedTags = [];
    if (req.body.tags) {
      if (Array.isArray(req.body.tags)) {
        processedTags = req.body.tags;
      } else if (typeof req.body.tags === 'string') {
        processedTags = req.body.tags.split(',').map(tag => tag.trim());
      }
    }

    const destinationData = {
      name: req.body.name,               
      description: req.body.description,
      state: req.body.state,             
      
      // 💡 ADDED MISSING FIELDS: Maps the extra data coming from req.body
      bestTimeToVisit: req.body.bestTimeToVisit, 
      estimatedDays: req.body.estimatedDays ? Number(req.body.estimatedDays) : undefined,
      tags: processedTags,
      
      image: {
        url: uploadedFile.path,          
        public_id: uploadedFile.filename 
      },
      location: {
        latitude: lat ? Number(lat) : undefined,
        longitude: lng ? Number(lng) : undefined
      }
    };

    const destination = await Destination.create(destinationData);
    
    res.status(201).json({ 
      success: true, 
      message: "Destination created successfully", 
      data: destination 
    });

  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
