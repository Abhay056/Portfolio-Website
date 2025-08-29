import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URL = process.env.MONGODB_URL;

console.log('Environment check:');
console.log('MONGODB_URL:', MONGODB_URL ? 'Set ✓' : 'Not set ❌');
console.log('EMAIL_USER:', process.env.EMAIL_USER ? 'Set ✓' : 'Not set ❌');
console.log('NOTIFY_EMAIL:', process.env.NOTIFY_EMAIL ? 'Set ✓' : 'Not set ❌');

// Create nodemailer transporter
let transporter = null;
if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
}

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Accept"]
}));
app.use(express.json());

// Connect to MongoDB if URL is provided
if (MONGODB_URL) {
  mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => console.log('MongoDB connected'))
   .catch(err => console.error('MongoDB connection error:', err));
} else {
  console.log('MongoDB URL not provided, using file storage only');
}

const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);

function saveMessageToFile(message) {
  const filePath = path.join(process.cwd(), 'messages.json');
  let messages = [];
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, 'utf-8');
    messages = data ? JSON.parse(data) : [];
  }
  messages.push(message);
  fs.writeFileSync(filePath, JSON.stringify(messages, null, 2), 'utf-8');
}

app.options('/api/contact', (req, res) => {
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Accept'
  });
  res.status(200).json({});
});

app.post('/api/contact', async (req, res) => {
  try {
    // Parse and validate request body
    const { name, email, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        error: "Missing required fields",
        details: {
          name: !name ? "Name is required" : null,
          email: !email ? "Email is required" : null,
          message: !message ? "Message is required" : null,
        }
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    console.log("Processing contact form:", { name, email: email.substring(0, 3) + "***" });

    const newMessage = { 
      name, 
      email, 
      message, 
      createdAt: new Date() 
    };
    
    let messageId = null;

    // Save to MongoDB if available
    if (MONGODB_URL && mongoose.connection.readyState === 1) {
      try {
        const mongoMessage = new Message(newMessage);
        const result = await mongoMessage.save();
        messageId = result._id;
        console.log("Message saved to MongoDB:", messageId);
      } catch (dbError) {
        console.error("MongoDB save error:", dbError);
        // Continue execution - we can still save to file and send email
      }
    }

    // Always save to file as backup
    try {
      saveMessageToFile(newMessage);
      console.log("Message saved to file");
    } catch (fileError) {
      console.error("File save error:", fileError);
    }

    // Send email notification if configured
    if (transporter && process.env.NOTIFY_EMAIL) {
      try {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: process.env.NOTIFY_EMAIL,
          subject: "New Contact Form Message",
          text: `📩 Dear Abhay Bahuguna,\n\n You got a new message!\n\nFrom: ${name}\n\nEmail: ${email}\n\nMessage:\n${message}`,
          html: `
            <h2>📩 New Contact Form Message</h2>
            <p><strong>From:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <blockquote>${message.replace(/\n/g, '<br>')}</blockquote>
            <p><em>Received at: ${new Date().toLocaleString()}</em></p>
          `
        });
        console.log("Email sent successfully");
      } catch (emailError) {
        console.error("Email error:", emailError);
        // Don't fail the request if email fails
      }
    }

    res.status(201).json({
      success: true,
      message: "Message received successfully!",
      id: messageId,
      timestamp: new Date().toISOString()
    });

  } catch (err) {
    console.error("Error processing contact form:", err);
    res.status(500).json({ 
      error: "Internal server error. Please try again later.",
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});