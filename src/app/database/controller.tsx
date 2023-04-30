import Specimens from "../../../model/user";

// GET: http://localhost:3000/api/specimens
export async function getSpecimens(req:any, res:any) {
    try {
        const specimens = await Specimens.find({});
        if (!specimens) return res.status(404).json({ error: "Data not found" });
        res.status(200).json(specimens);
    } catch (error) {
        res.status(404).json({ error: "Error while fetching data" });
    }
}

// GET: http://localhost:3000/api/specimens/1
export async function getSpecimen(req:any, res:any) {
    try {
        const { specimenId } = req.query;
        if (specimenId) {
            const specimen = await Specimens.findById(specimenId);
            res.status(200).json(specimen);
        } else {
            res.status(404).json({ error: "Specimen ID not provided" });
        }
    } catch (error) {
        res.status(404).json({ error: "Cannot get specimen" });
    }
}

// POST: http://localhost:3000/api/specimens
export async function postSpecimen(req:any, res:any) {
    try {
        const formData = req.body;
        if (!formData) {
            return res.status(404).json({ error: "Form data not provided" });
        }
        const specimen = await Specimens.create(formData);
        res.status(200).json(specimen);
    } catch (error) {
        res.status(404).json({ error: "Error while creating specimen" });
    }
}

// PUT: http://localhost:3000/api/specimens/1
export async function putSpecimen(req:any, res:any) {
    try {
        const { specimenId } = req.query;
        const formData = req.body;
        if (specimenId && formData) {
            const specimen = await Specimens.findByIdAndUpdate(specimenId, formData, { new: true });
            res.status(200).json(specimen);
        } else {
            res.status(404).json({ error: "Specimen ID and/or form data not provided" });
        }
    } catch (error) {
        res.status(404).json({ error: "Error while updating data" });
    }
}

// DELETE: http://localhost:3000/api/specimens/1
export async function deleteSpecimen(req:any, res:any) {
    try {
        const { specimenId } = req.query;
        if (specimenId) {
            const specimen = await Specimens.findByIdAndDelete(specimenId);
            res.status(200).json({specimen});
        } else {
            res.status(404).json({ error: "Specimen ID not provided" });
        }
    } catch (error) {
        res.status(404).json({ error: "Error while deleting data" });
    }
}
