import { MongoClient } from "mongodb";
import nodemailer from "nodemailer";

const uri = process.env.MONGODB_URL;
const dbName = process.env.MONGODB_DATABASE || "portfolio-messages";
const collectionName = process.env.MONGODB_COLLECTION || "messages";

// Security headers helper
const getSecurityHeaders = () => ({
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type, Accept",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block",
  "Referrer-Policy": "strict-origin-when-cross-origin"
});

// Create nodemailer transporter only if email credentials exist
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

export async function handler(event, context) {
  // Handle CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: getSecurityHeaders(),
      body: JSON.stringify({}),
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: getSecurityHeaders(),
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  let client = null;

  try {
    console.log('Environment check:');
    console.log('MONGODB_URL:', uri ? 'Set ✓' : 'Not set ❌');
    console.log('EMAIL_USER:', process.env.EMAIL_USER ? 'Set ✓' : 'Not set ❌');
    console.log('NOTIFY_EMAIL:', process.env.NOTIFY_EMAIL ? 'Set ✓' : 'Not set ❌');

    // Parse and validate request body
    let requestBody;
    try {
      requestBody = JSON.parse(event.body);
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      return {
        statusCode: 400,
        headers: getSecurityHeaders(),
        body: JSON.stringify({ error: "Invalid JSON in request body" }),
      };
    }

    const { name, email, message } = requestBody;

    // Sanitize inputs to prevent XSS
    const sanitizeInput = (input) => {
      if (typeof input !== 'string') return '';
      return input
        .replace(/[<>]/g, '') // Remove potential HTML tags
        .trim()
        .substring(0, 1000); // Limit length
    };

    const sanitizedName = sanitizeInput(name);
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedMessage = sanitizeInput(message);

    // Validate required fields
    if (!sanitizedName || !sanitizedEmail || !sanitizedMessage) {
      return {
        statusCode: 400,
        headers: getSecurityHeaders(),
        body: JSON.stringify({
          error: "Missing required fields",
          details: {
            name: !sanitizedName ? "Name is required" : null,
            email: !sanitizedEmail ? "Email is required" : null,
            message: !sanitizedMessage ? "Message is required" : null,
          }
        }),
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(sanitizedEmail)) {
      return {
        statusCode: 400,
        headers: getSecurityHeaders(),
        body: JSON.stringify({ error: "Invalid email format" }),
      };
    }

    console.log("Processing contact form:", { name: sanitizedName, email: sanitizedEmail.substring(0, 3) + "***" });

    const newMessage = {
      name: sanitizedName,
      email: sanitizedEmail,
      message: sanitizedMessage,
      createdAt: new Date(),
    };

    let messageId = null;

    // Save to MongoDB if available
    if (uri) {
      try {
        client = new MongoClient(uri);
        await client.connect();

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const result = await collection.insertOne(newMessage);
        messageId = result.insertedId;
        console.log("Message saved to MongoDB:", messageId);
      } catch (dbError) {
        console.error("MongoDB save error:", dbError);
        // Continue execution - we can still send email even if DB fails
      }
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
        // Don't fail the request if email fails - message might still be saved
      }
    }

    return {
      statusCode: 201,
      headers: getSecurityHeaders(),
      body: JSON.stringify({
        success: true,
        message: "Message received successfully!",
        id: messageId,
        timestamp: new Date().toISOString()
      }),
    };
  } catch (error) {
    console.error("Error processing contact form:", error);
    return {
      statusCode: 500,
      headers: getSecurityHeaders(),
      body: JSON.stringify({ 
        error: "Internal server error. Please try again later.",
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      }),
    };
  } finally {
    if (client) {
      try {
        await client.close();
      } catch (closeError) {
        console.error("Error closing database connection:", closeError);
      }
    }
  }
}
