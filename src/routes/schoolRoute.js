import express from "express";
import { validateAddSchool } from "../validators/schoolValidator.js";
import { addSchool, listSchools } from "../controllers/schoolController.js";

const router = express.Router();





router.route("/addschool").post(validateAddSchool , addSchool);
router.route("/listschools").get(listSchools);


export default router;