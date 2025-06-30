import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(
  'mongodb+srv://user:abhay123@portfolio-messages.nomobox.mongodb.net/?retryWrites=true&w=majority&appName=portfolio-messages',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // For X.509, you need to provide SSL certs. For now, this is a placeholder.
    // sslKey: '/path/to/your/client-key.pem',
    // sslCert: '/path/to/your/client-cert.pem',
    // sslCA: '/path/to/your/ca.pem',
  }
).then(() => console.log('MongoDB connected'))
 .catch(err => console.error('MongoDB connection error:', err));

// Define a schema and model
const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  date: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);

// Helper function to save message to messages.json
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

// API endpoint to receive messages
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  try {
    const newMessage = { name, email, message, date: new Date() };
    // Save to MongoDB
    const mongoMessage = new Message(newMessage);
    await mongoMessage.save();
    // Save to local file
    saveMessageToFile(newMessage);
    res.status(201).json({ success: true, message: 'Message saved!' });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to save message.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 