const transporter = require("../config/mailer");

const sendOrderEmail = async (email, order) => {
    try {
        const itemsHtml = order.items
            .map(
                (item) => `
          <div style="
            background:#ffffff;
            border:1px solid #e5e5e5;
            border-radius:16px;
            padding:16px;
            margin-bottom:12px;
          ">
            <h4 style="
              margin:0 0 8px;
              color:#112a1d;
            ">
              ${item.name}
            </h4>

            <p style="margin:4px 0;">
              Quantity: <strong>${item.qty}</strong>
            </p>

            <p style="margin:4px 0;">
              Price: <strong>₹${item.price}</strong>
            </p>

            <p style="margin:4px 0;">
              Subtotal:
              <strong>
                ₹${item.price * item.qty}
              </strong>
            </p>
          </div>
        `
            )
            .join("");

        await transporter.sendMail({
            from: `"KÄLLA BOWL" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: `🐶 Order Confirmed | ${order._id}`,

            html: `
      <div style="
        background:#f7f8f5;
        padding:40px 20px;
        font-family:Arial,Helvetica,sans-serif;
      ">

        <div style="
          max-width:650px;
          margin:auto;
          background:white;
          border-radius:24px;
          overflow:hidden;
          box-shadow:0 10px 40px rgba(0,0,0,.08);
        ">

          <!-- Header -->
          <div style="
            background:#d1f23a;
            padding:30px;
            text-align:center;
          ">
            <h1 style="
              margin:0;
              color:#112a1d;
              font-size:32px;
            ">
              🐶 KÄLLA BOWL
            </h1>

            <p style="
              margin-top:10px;
              color:#112a1d;
            ">
              Fresh Nutrition For Happier Dogs
            </p>
          </div>

          <!-- Content -->
          <div style="padding:35px;">

            <div style="text-align:center;">

              <span style="
                display:inline-block;
                background:#d1f23a;
                color:#112a1d;
                font-weight:bold;
                padding:10px 20px;
                border-radius:999px;
              ">
                ✓ ORDER CONFIRMED
              </span>

            </div>

            <h2 style="
              text-align:center;
              color:#112a1d;
              margin-top:25px;
            ">
              Thank You, ${order.customerName}!
            </h2>

            <p style="
              text-align:center;
              color:#555;
            ">
              We've received your order and payment successfully.
            </p>

            <hr style="
              margin:30px 0;
              border:none;
              border-top:1px solid #eee;
            ">

            <!-- Order Details -->
            <h3 style="color:#112a1d;">
              Order Details
            </h3>

            <table width="100%">
              <tr>
                <td><strong>Order ID</strong></td>
                <td>${order._id}</td>
              </tr>

              <tr>
                <td><strong>Total Amount</strong></td>
                <td>₹${order.total}</td>
              </tr>

              <tr>
                <td><strong>Status</strong></td>
                <td>Confirmed</td>
              </tr>
            </table>

            <hr style="
              margin:30px 0;
              border:none;
              border-top:1px solid #eee;
            ">

            <!-- Products -->
            <h3 style="color:#112a1d;">
              Ordered Products
            </h3>

            ${itemsHtml}

            <hr style="
              margin:30px 0;
              border:none;
              border-top:1px solid #eee;
            ">

            <!-- Shipping -->
            <h3 style="color:#112a1d;">
              Shipping Address
            </h3>

            <div style="
              background:#f8f8f8;
              border-radius:16px;
              padding:18px;
            ">
              <strong>
                ${order.customerName}
              </strong>

              <br><br>

              ${order.address}
              <br>

              ${order.city},
              ${order.state}

              <br>

              ${order.pincode}

              <br><br>

              Phone:
              ${order.phone}
            </div>

            <hr style="
              margin:30px 0;
              border:none;
              border-top:1px solid #eee;
            ">

            <!-- Timeline -->
            <h3 style="color:#112a1d;">
              Order Progress
            </h3>

            <div style="line-height:2;">
              ✅ Payment Received <br>
              ✅ Order Confirmed <br>
              🟡 Preparing Fresh Meal <br>
              ⏳ Packed & Ready To Ship <br>
              🚚 Out For Delivery
            </div>

            <div style="
              margin-top:40px;
              text-align:center;
            ">
              <p style="
                color:#666;
                font-size:15px;
              ">
                Thank you for trusting KÄLLA BOWL
                with your dog's nutrition 🐾
              </p>
            </div>

          </div>

          <!-- Footer -->
          <div style="
            background:#112a1d;
            color:white;
            text-align:center;
            padding:20px;
          ">
            <p style="margin:0;">
              KÄLLA BOWL
            </p>

            <p style="
              margin-top:8px;
              font-size:13px;
              opacity:.8;
            ">
              Fresh • Natural • Nutritious
            </p>
          </div>

        </div>

      </div>
      `,
        });

        console.log("📧 Order Email Sent");
    } catch (error) {
        console.error("EMAIL ERROR:", error);
throw error;
    }
};

module.exports = sendOrderEmail;