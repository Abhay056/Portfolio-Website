import fs from 'fs';
import path from 'path';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DATABASE || 'portfolio-messages';
const collectionName = process.env.MONGODB_COLLECTION || 'messages';

export async function handler(event, context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  let client;

  try {
    const { name, email, message } = JSON.parse(event.body);

    if (!name || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    const newMessage = {
      name,
      email,
      message,
      date: new Date(),
    };

    client = new MongoClient(uri);
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const result = await collection.insertOne(newMessage);

    const filePath = path.join('/tmp', 'messages.json');
    let messages = [];

    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      messages = data ? JSON.parse(data) : [];
    }

    messages.push(newMessage);
    fs.writeFileSync(filePath, JSON.stringify(messages, null, 2), 'utf-8');

    return {
      statusCode: 201,
      body: JSON.stringify({
        success: true,
        message: 'Message saved!',
        id: result.insertedId,
      }),
    };
  } catch (error) {
    console.error('Error saving message:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to save message.' }),
    };
  } finally {
    if (client) await client.close();
  }
}
