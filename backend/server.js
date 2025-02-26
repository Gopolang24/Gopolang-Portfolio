require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const db = require("./database"); // Database connection

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// ✅ Configure Nodemailer for Gmail
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// ✅ Handle form submission
app.post("/submit-form", (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        return res.status(400).json({ message: "All fields are required!" });
    }

    // Insert into MySQL
    const sql = "INSERT INTO messages (name, email, subject, message) VALUES (?, ?, ?, ?)";
    db.query(sql, [name, email, subject, message], (err, result) => {
        if (err) {
            console.error("❌ Database error:", err);
            return res.status(500).json({ message: "Database error" });
        }

        console.log("✅ Form data saved to database!");

        // ✅ Send Email Notification
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // Change to your own email
            subject: `📩 New Message from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("❌ Email error:", error);
                return res.status(500).json({ message: "Email failed to send" });
            }
            console.log("📧 Email sent:", info.response);
            res.json({ message: "Message sent successfully!" });
        });
    });
});

// ✅ Start server
app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
});
