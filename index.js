require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.post("/send-email", async (req, res) => {
    const { name, email, message, subject } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,  // Your Gmail
                pass: process.env.EMAIL_PASS   // App Password (from Google)
            }
        });

        const mailOptions = {
            from: `${email}`,
            to: process.env.EMAIL_USER, // Your email (where you receive messages)
            subject: `${subject}`,
            text: `Name: ${name}\nEmail: ${email}\n\n\nMessage: ${message}`,
            replyTo: email
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: "Email sent successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to send email" });
    }
});

app.get('/test',async (req, res)=>{
    const gg = 'hellowworld'
    res.send(gg)
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
