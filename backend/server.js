const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

app.use(
  cors({
    origin: "https://kallabowl.netlify.app",
    credentials: true,
  })
);

// Load env FIRST
dotenv.config();

const connectDB = require("./config/db");

// Routes
const productRoutes = require("./routes/productRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const contactRoutes = require("./routes/contactRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");


// Connect Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
// Test Route
app.get("/", (req, res) => {
  res.send("DOGGI API Running");
});

// Product Routes
app.use("/api/products", productRoutes);

// Review Routes
app.use("/api/reviews", reviewRoutes);
app.use("/api/contact", contactRoutes);

// Order Routes
app.use("/api/orders", orderRoutes);

app.use("/api/payment", paymentRoutes);

// Port
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});



//razorpayroutingystsjem


