import { MongoClient } from "mongodb";
import nodemailer from "nodemailer";

const uri = process.env.MONGODB_URL;
const dbName = process.env.MONGODB_DATABASE || "portfolio-messages";
const collectionName = process.env.MONGODB_COLLECTION || "messages";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS  
  }
});

export async function handler(event, context) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  let client = null;

  try {
    const { name, email, message } = JSON.parse(event.body);

    if (!name || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing required fields" }),
      };
    }

    client = new MongoClient(uri);
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const newMessage = {
      name,
      email,
      message,
      createdAt: new Date(),
    };

    const result = await collection.insertOne(newMessage);

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.NOTIFY_EMAIL, 
      subject: "New Contact Form Message",
      text: `📩 Dear Abhay Bahuguna,\n\n You got a new message!\n\nFrom: ${name}\n\nEmail: ${email}\n\nMessage:\n${message}`
    });

    return {
      statusCode: 201,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify({
        success: true,
        message: "Successfully saved and emailed!",
        id: result.insertedId,
      }),
    };
  } catch (error) {
    console.error("Error saving/sending message:", error);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify({ error: "Failed to send message." }),
    };
  } finally {
    if (client) await client.close();
  }
}
