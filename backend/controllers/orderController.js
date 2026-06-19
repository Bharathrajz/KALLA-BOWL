const Order = require("../models/Order");
const sendOrderEmail = require("../utils/sendOrderEmail");

const createOrder = async (req, res) => {
  try {
    const {
      customerName,
      email,
      phone,
      address,
      city,
      state,
      pincode,
      items,
      total,
    } = req.body;

    console.log("🚀 CREATE ORDER HIT");
    console.log("📧 Customer Email:", email);

    // Validation
    if (
      !customerName ||
      !email ||
      !phone ||
      !address ||
      !city ||
      !state ||
      !pincode ||
      !items ||
      items.length === 0 ||
      !total
    ) {
      console.log("❌ Validation Failed");

      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const order = await Order.create({
      customerName,
      email,
      phone,
      address,
      city,
      state,
      pincode,
      items,
      total,
    });

    console.log("✅ ORDER CREATED");
    console.log("🆔 Order ID:", order._id);

    try {
      console.log("📨 SENDING EMAIL...");

      await sendOrderEmail(email, order);

      console.log("✅ EMAIL FUNCTION COMPLETED");
    } catch (mailError) {
      console.error("❌ EMAIL ERROR:");
      console.error(mailError);
    }

    res.status(201).json(order);
  } catch (error) {
    console.error("❌ CREATE ORDER ERROR:");
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json(order);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json({
      message: "Order deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getOrders,
  updateOrderStatus,
  deleteOrder,
};