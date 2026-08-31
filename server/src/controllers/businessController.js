import Business from "../models/Business.js";

// ==========================================
// 1. GET ALL BUSINESSES /api/business
// ==========================================
export const getBusiness = async (req, res) => {
    try {
        const business = await Business.find();

        res.status(200).json({
            success: true, // 💡 FIXED: Corrected spelling typo
            count: business.length,
            data: business,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch businesses",
        });
    }
};

// ==========================================
// 2. GET BUSINESS BY ID  /api/business/:id
// ==========================================
export const getBusinessById = async (req, res) => {
    try {
        const business = await Business.findById(req.params.id);

        if (!business) {
            return res.status(404).json({
                success: false,
                message: "Business not found",
            });
        }
        res.status(200).json({
            success: true,
            data: business, // 💡 FIXED: Changed from 'destination' to 'business'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch business details",
        });
    }
};

// ==========================================
// 3. CREATE BUSINESS (POST)  /api/business
// ==========================================
export const createBusiness = async (req, res) => {
    try {
        const files = req.files || (req.file ? [req.file] : null);
        if (!files || files.length === 0) {
            return res.status(400).json({ success: false, message: "Please upload an image file" });
        }

        const uploadedFile = files[0];

        // Handle tags structure formatting safely
        let processedTags = [];
        if (req.body.tags) {
            if (Array.isArray(req.body.tags)) {
                processedTags = req.body.tags;
            } else if (typeof req.body.tags === 'string') {
                processedTags = req.body.tags.split(',').map(tag => tag.trim());
            }
        }

        // 💡 FIXED: Properly mapped all remaining fields matching your exact schema layout
        const businessData = {
            name: req.body.name,
            neighbourhood: req.body.neighbourhood,
            category: req.body.category, // Map as single string per your schema
            rating: req.body.rating ? Number(req.body.rating) : 0,
            reviewCount: req.body.reviewCount ? Number(req.body.reviewCount) : 0,
            isOpen: req.body.isOpen === 'false' ? false : true,
            tags: processedTags, // Assign arrays to tags
            image: {
                url: uploadedFile.path,
                public_id: uploadedFile.filename
            },
        };

        const business = await Business.create(businessData);

        res.status(201).json({
            success: true,
            message: "Business created successfully", // 💡 FIXED: Changed placeholder text context
            data: business // 💡 FIXED: Changed from 'destination' to 'business'
        });

    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// ==========================================
// 4. REMAINING FEATURE: UPDATE BUSINESS (PUT)
// ==========================================
export const updateBusiness = async (req, res) => {
    try {
        // If a new image file is uploaded, map it into the update query object configuration
        if (req.file || (req.files && req.files.length > 0)) {
            const newFile = req.file || req.files[0];
            req.body.image = {
                url: newFile.path,
                public_id: newFile.filename
            };
        }

        // Process tags array if stringified array lists arrive
        if (req.body.tags && typeof req.body.tags === 'string') {
            req.body.tags = req.body.tags.split(',').map(t => t.trim());
        }

        const updatedBusiness = await Business.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        );

        if (!updatedBusiness) {
            return res.status(404).json({ success: false, message: "Business matching target context not found" });
        }

        res.status(200).json({ success: true, message: "Business updated successfully", data: updatedBusiness });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// ==========================================
// 5. REMAINING FEATURE: DELETE BUSINESS (DELETE)
// ==========================================
export const deleteBusiness = async (req, res) => {
    try {
        const business = await Business.findByIdAndDelete(req.params.id);

        if (!business) {
            return res.status(404).json({ success: false, message: "Business already removed or unavailable" });
        }

        /* 💡 Pro Tip: If you want to delete the file from Cloudinary upon removal, 
           call your cloudinary destroyer utility right here using: business.image.public_id */

        res.status(200).json({ success: true, message: "Business successfully purged from database" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server encountered error during asset deletion process." });
    }
};
