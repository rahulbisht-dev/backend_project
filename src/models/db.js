import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});



(async () => {
  try {
    const connection = await db.getConnection();
    console.log("Database connected successfully!");
    connection.release(); 
  } catch (error) {
    console.error("❌ Database connection error:", error.message);
    process.exit(1); 
  }
})();

export default db;