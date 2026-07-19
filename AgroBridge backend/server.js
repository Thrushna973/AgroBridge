const express = require("express");       //1. Import Express
const cors = require("cors")              // 2. Import CORS
require("dotenv").config();            // 3. Load .env variables 

const db = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const jobRoutes = require("./routes/jobRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const reportRoutes = require("./routes/reportRoutes");
const settingsRoutes = require("./routes/settingsRoutes");
const adminRoutes = require("./routes/adminRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const farmProfileRoutes=require("./routes/farmProfileRoutes");
const aiRoutes = require("./routes/aiRoutes");
const path=require("path");
const helmet = require("helmet");
                                                                           
const app = express();                    //4. Create Express app

 app.use(                                    //5. Enable CORS
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);

app.use(express.json());                  // 6. Enable JSON parsing
app.use("/api/auth", authRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/settings", settingsRoutes); // Add this line for settings routes
app.use("/api/admin", adminRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/farm-profile", farmProfileRoutes);
console.log("Attendance routes loaded");
// app.use("/uploads",express.static("uploads"));
app.use("/uploads",express.static(path.join(__dirname,"uploads")));
app.use("/api/ai", aiRoutes);


app.use(helmet());
app.get("/", (req, res) => {                   // 7. Create GET "/" route
    res.send("AgroBridge API Running");        // prints msg in browser
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {                                   // 8. Start server on PORT
    console.log(`server running on port ${PORT}`)         //9. Print success message
});