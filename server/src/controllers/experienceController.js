import Experience from "../models/Experience.js";

// ==========================================
// 1. GET ALL EXPERIENCES /api/experience
// ==========================================
export const getExperience = async (req, res) => {
    try {
        const experiences = await Experience.find();

        res.status(200).json({
            success: true, 
            count: experiences.length,
            data: experiences,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch local experiences",
        });
    }
};

// ==========================================
// 2. GET EXPERIENCE BY ID  /api/experience/:id
// ==========================================
export const getExperienceById = async (req, res) => {
    try {
        // 💡 FIXED: Kept variables strictly lowercase 'experience' to match search scope
        const experience = await Experience.findById(req.params.id);

        if (!experience) { // 💡 FIXED: Fixed casing typo (was checking capital model name)
            return res.status(404).json({
                success: false,
                message: "Experience not found",
            });
        }
        res.status(200).json({
            success: true,
            data: experience, // 💡 FIXED: Return the exact lowercase item instance
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch experience details",
        });
    }
};

// ==========================================
// 3. CREATE EXPERIENCE (POST)  /api/experience
// ==========================================
export const createExperience = async (req, res) => {
    try {
        const files = req.files || (req.file ? [req.file] : null);
        if (!files || files.length === 0) {
            return res.status(400).json({ success: false, message: "Please upload an image file" });
        }

        const uploadedFile = files[0];

        // 💡 FIXED: Parse Categories array fields from form-data (matching the capital 'C' schema name)
        let processedCategories = [];
        if (req.body.Categories) {
            if (Array.isArray(req.body.Categories)) {
                processedCategories = req.body.Categories;
            } else if (typeof req.body.Categories === 'string') {
                processedCategories = req.body.Categories.split(',').map(cat => cat.trim());
            }
        }

        // 💡 FIXED: Properly mapped all fields matching your actual Experience layout schema parameters
        const experienceData = {
            title: req.body.title,
            rating: req.body.rating ? Number(req.body.rating) : 0,
            reviewCount: req.body.reviewCount ? Number(req.body.reviewCount) : 0,
            isPopular: req.body.isPopular === 'false' ? false : true,
            duration: req.body.duration ? Number(req.body.duration) : undefined,
            price: req.body.price ? Number(req.body.price) : undefined,
            Categories: processedCategories, 
            image: {
                url: uploadedFile.path,
                public_id: uploadedFile.filename
            },
        };

        // 💡 FIXED: Targets the Experience model wrapper container
        const experience = await Experience.create(experienceData);

        res.status(201).json({
            success: true,
            message: "Experience created successfully",
            data: experience 
        });

    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// ==========================================
// 4. UPDATE EXPERIENCE (PUT)  /api/experience/:id
// ==========================================
export const updateExperience = async (req, res) => {
    try {
        // If a new image file is uploaded, map it into the file system parameters
        if (req.file || (req.files && req.files.length > 0)) {
            const newFile = req.file || req.files[0];
            req.body.image = {
                url: newFile.path,
                public_id: newFile.filename
            };
        }

        // Process Categories array lists dynamically if arriving stringified
        if (req.body.Categories && typeof req.body.Categories === 'string') {
            req.body.Categories = req.body.Categories.split(',').map(c => c.trim());
        }

        // Convert numeric fields if passed in update request body
        if (req.body.rating) req.body.rating = Number(req.body.rating);
        if (req.body.reviewCount) req.body.reviewCount = Number(req.body.reviewCount);
        if (req.body.duration) req.body.duration = Number(req.body.duration);
        if (req.body.price) req.body.price = Number(req.body.price);
        if (req.body.isPopular) req.body.isPopular = req.body.isPopular === 'true';

        // 💡 FIXED: Uses the correct Experience collection target engine
        const updatedExperience = await Experience.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        );

        if (!updatedExperience) {
            return res.status(404).json({ success: false, message: "Target experience item not found" });
        }

        res.status(200).json({ success: true, message: "Experience updated successfully", data: updatedExperience });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// ==========================================
// 5. DELETE EXPERIENCE (DELETE) /api/experience/:id
// ==========================================
export const deleteExperience = async (req, res) => {
    try {
        // 💡 FIXED: Connected model cleanup workflow pipeline to correct target
        const experience = await Experience.findByIdAndDelete(req.params.id);

        if (!experience) {
            return res.status(404).json({ success: false, message: "Experience already removed or unavailable" });
        }

        res.status(200).json({ success: true, message: "Experience successfully purged from database" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server encountered error during asset deletion process." });
    }
};
