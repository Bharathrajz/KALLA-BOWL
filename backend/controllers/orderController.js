const Order = require("../models/Order");
const sendOrderEmail = require(
  "../utils/sendOrderEmail"
);

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

    // Basic server-side validation
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
    await sendOrderEmail(
      email,
      order
    );

    res.status(201).json(order);
  } catch (error) {
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
