import { MongoClient } from "mongodb";
import nodemailer from "nodemailer";

const uri = process.env.MONGODB_URL;
const dbName = process.env.MONGODB_DATABASE || "portfolio-messages";
const collectionName = process.env.MONGODB_COLLECTION || "messages";

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
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type, Accept",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
      body: JSON.stringify({}),
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type, Accept",
      },
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
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type, Accept",
        },
        body: JSON.stringify({ error: "Invalid JSON in request body" }),
      };
    }

    const { name, email, message } = requestBody;

    // Validate required fields
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type, Accept",
        },
        body: JSON.stringify({
          error: "Missing required fields",
          details: {
            name: !name ? "Name is required" : null,
            email: !email ? "Email is required" : null,
            message: !message ? "Message is required" : null,
          }
        }),
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type, Accept",
        },
        body: JSON.stringify({ error: "Invalid email format" }),
      };
    }

    console.log("Processing contact form:", { name, email: email.substring(0, 3) + "***" });

    const newMessage = {
      name,
      email,
      message,
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
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type, Accept",
      },
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
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type, Accept",
      },
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
