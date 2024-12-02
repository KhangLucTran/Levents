const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// 1. Hàm gửi email cơ bản
const sendMail = async (to, subject, text, htmlContent) => {
  try {
    const mailOptions = {
      from: `"KhangCoder 👻" <${process.env.EMAIL}>`,
      to: to,
      subject: subject,
      text: text, // Text content
      html: htmlContent, // HTML content
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: %s", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Error sending email");
  }
};

// 2. Hàm gửi OTP qua email
const sendOtpEmail = async (to, otp) => {
  const subject = "Password Reset Request ✔";
  const text = `Please click the link to reset your password`;
  const templatePath = path.join(__dirname, "..", "view", "forgotContent.html");

  let htmlContent = fs.readFileSync(templatePath, "utf-8");
  htmlContent = htmlContent.replace("{{otp}}", otp); // Replace OTP in HTML template

  return sendMail(to, subject, text, htmlContent);
};

// 3. Hàm gửi email VerifyAccount
const sendVerifyEmail = async (email) => {
  const subject = "Hello ✔";
  const text = `Please verify your account by clicking the link.`;
  const templatePath = path.join(__dirname, "..", "view", "emailContent.html");

  let htmlContent = fs.readFileSync(templatePath, "utf-8");
  const verifyAccountLink = `http://localhost:5000/api/auth/verify-account/${email}`;
  // Correct the placeholder syntax
  htmlContent = htmlContent.replace("{{verifyAccountLink}}", verifyAccountLink);

  return sendMail(email, subject, text, htmlContent);
};

module.exports = {
  sendMail,
  sendOtpEmail,
  sendVerifyEmail,
};
