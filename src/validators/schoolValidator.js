import {z} from "zod";

const addSchoolSchema = z.object({
    name: z
      .string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
      })
      .min(1, "Name cannot be empty"),
  
    address: z
      .string({
        required_error: "Address is required",
        invalid_type_error: "Address must be a string",
      })
      .min(1, "Address cannot be empty"),
  
    latitude: z
      .number({
        required_error: "Latitude is required",
        invalid_type_error: "Latitude must be a number",
      })
      .min(-90, "Latitude must be >= -90")
      .max(90, "Latitude must be <= 90"),
  
    longitude: z
      .number({
        required_error: "Longitude is required",
        invalid_type_error: "Longitude must be a number",
      })
      .min(-180, "Longitude must be >= -180")
      .max(180, "Longitude must be <= 180"),
  });



export  const validateAddSchool = (req, res, next) => {
    const result = addSchoolSchema.safeParse(req.body);
    if (!result.success) {
      const errors = result.error.errors.map(e => ({
        path: e.path[0],
        message: e.message,
      }));
      return res.status(400).json({ errors });
    }
  
    req.body = result.data; 
    next();
  };
