import db from "../models/db.js";
import { calculateDistance } from "../utils/distance.js";

export const addSchool = async (req, res) => {

  const { name, address, latitude, longitude } = req.body;
  
  try{
    const [existing] = await db.query("SELECT * FROM schools WHERE name = ? AND address = ? AND ABS(latitude - ?) < 0.00001 AND ABS(longitude - ?) < 0.00001" , [name, address, latitude, longitude]);
    if(existing.length > 0){
        return res.status(409).send({success:false , message:"School already exists in our database"})
    }

    await db.query("INSERT INTO schools (name , address , latitude , longitude) VALUES (? , ? , ? , ?)" , [name , address , latitude , longitude]);
    res.status(201).send({success:true , message:"School Added Successfully"});
  }
  catch(error){
    res.status(500).send({success:false , message:"Internal Server Error , Please Try Again Later.."})
  }
};




export const listSchools = async (req, res) => {

  const { latitude, longitude } = req.query;

  try {
    const [schools] = await db.query("SELECT * FROM schools");

      const sorted = schools
      .map((school) => {
        const distance = calculateDistance(latitude , longitude ,  school.latitude, school.longitude);
        return { ...school};
      })
      .sort((a, b) => a.distance - b.distance);

    res.status(201).send({sorted})
  } catch (err) {
    console.log(err);
    res.status(500).send({success:false , message:"Internal Server Error , Please Try Again Later.."})
  }
};
