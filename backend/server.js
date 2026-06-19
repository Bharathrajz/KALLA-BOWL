const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

// Load env first
dotenv.config();

const app = express();

// Database
const connectDB = require("./config/db");

// Routes
const productRoutes = require("./routes/productRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const contactRoutes = require("./routes/contactRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

// Connect Database
connectDB();

// Middleware
app.use(
  cors({
    origin: "https://kallabowl.netlify.app",
    credentials: true,
  })
);

app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("KALLA BOWL API Running 🚀");
});

// Routes
app.use("/api/products", productRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);

// Port
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});