const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const crypto = require("crypto");
const qs = require("qs");
const moment = require("moment");

// Load environment variables
dotenv.config();

// // Payment URL creation route
// router.post("/create_payment_url", function (req, res, next) {
//   try {
//     // Get client IP address
//     const ipAddr =
//       req.headers["x-forwarded-for"] ||
//       req.connection.remoteAddress ||
//       req.socket.remoteAddress ||
//       req.connection.socket.remoteAddress;

//     // Load configuration from environment variables
//     const tmnCode = process.env.vnp_TmnCode;
//     const secretKey = process.env.vnp_HashSecret;
//     const vnpUrl = process.env.vnp_Url;
//     const returnUrl = process.env.vnp_ReturnUrl;

//     // Get request parameters
//     const amount = req.body.amount;
//     const bankCode = req.body.bankCode || "";
//     const orderDescription = req.body.orderDescription || "";
//     const orderType = req.body.orderType || "";
//     const locale = req.body.language || "vn"; // Default 'vn' if not provided

//     if (!amount || !orderDescription || !orderType) {
//       return res.status(400).json({ error: "Missing required fields" });
//     }

//     // Create date and order ID
//     const date = moment();
//     const createDate = date.format("YYYYMMDDHHmmss");
//     const orderId = date.format("HHmmss");

//     // Payment URL parameters
//     let vnp_Params = {
//       vnp_Version: "2.1.0",
//       vnp_Command: "pay",
//       vnp_TmnCode: tmnCode,
//       vnp_Locale: locale,
//       vnp_CurrCode: "VND",
//       vnp_TxnRef: orderId,
//       vnp_OrderInfo: orderDescription,
//       vnp_OrderType: orderType,
//       vnp_Amount: amount * 100, // Amount in cents
//       vnp_ReturnUrl: returnUrl,
//       vnp_IpAddr: ipAddr,
//       vnp_CreateDate: createDate,
//     };

//     // If a bank code is provided, add it to the parameters
//     if (bankCode) {
//       vnp_Params["vnp_BankCode"] = bankCode;
//     }

//     // Sort parameters for signature creation
//     vnp_Params = sortObject(vnp_Params);

//     // Generate the signature
//     const signData = qs.stringify(vnp_Params, { encode: false });
//     const hmac = crypto.createHmac("sha512", secretKey);
//     const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

//     // Add secure hash to the parameters
//     vnp_Params["vnp_SecureHash"] = signed;

//     // Build the final URL
//     const finalUrl = vnpUrl + "?" + qs.stringify(vnp_Params, { encode: false });

//     // Redirect to the payment gateway
//     res.redirect(finalUrl);
//   } catch (error) {
//     console.error("Error in creating payment URL:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // Function to sort object keys (for generating the correct signature)
// function sortObject(obj) {
//   const sortedObj = {};
//   Object.keys(obj)
//     .sort()
//     .forEach(function (key) {
//       sortedObj[key] = obj[key];
//     });
//   return sortedObj;
// }
// router.get("/vnpay_return", function (req, res, next) {
//   try {
//     const vnp_Params = req.query;

//     const secureHash = vnp_Params["vnp_SecureHash"];
//     delete vnp_Params["vnp_SecureHash"];
//     delete vnp_Params["vnp_SecureHashType"];

//     // Sort the parameters
//     const sortedParams = sortObject(vnp_Params);

//     // Load configuration from environment variables
//     const tmnCode = process.env.vnp_TmnCode;
//     const secretKey = process.env.vnp_HashSecret;

//     // Generate the signature from the query parameters
//     const signData = qs.stringify(sortedParams, { encode: false });
//     const hmac = crypto.createHmac("sha512", secretKey);
//     const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

//     if (secureHash === signed) {
//       // Check the result from the database (if necessary)
//       res.json({ code: vnp_Params["vnp_ResponseCode"] });
//     } else {
//       res.json({ code: "97" }); // Code 97 if signature mismatch
//     }
//   } catch (error) {
//     console.error("Error in payment return:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

module.exports = router;
