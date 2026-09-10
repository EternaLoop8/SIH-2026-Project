import ExperienceDetail from "../models/ExperienceDetail.js";
import Experience from "../models/Experience.js"

// GET /api/experiences/:id
export const getExperienceDetailById = async(req, res) => {
    try{
        const {id} = req.params;

        const details = await ExperienceDetail.findOne({
            experienceId: id,
        }).populate("experienceId")
    }
}