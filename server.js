import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = 5000;
const MONGODB_URL = import.meta.env.MONGODB_URL

app.use(cors());
app.use(express.json());

mongoose.connect(
  MONGODB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
).then(() => console.log('MongoDB connected'))
 .catch(err => console.error('MongoDB connection error:', err));

const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  date: { type: Date, default: Date.now }
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

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  try {
    const newMessage = { name, email, message, date: new Date() };
    const mongoMessage = new Message(newMessage);
    await mongoMessage.save();
    saveMessageToFile(newMessage);
    res.status(201).json({ success: true, message: 'Message saved!' });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to save message.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 