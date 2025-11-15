import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import itemsRouter from './routes/items.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, 'routes/uploads')));

// app.post('/api/items', upload.single('image'), async (req, res) => {
//   const item = new Item({
//     name: req.body.name,
//     description: req.body.description,
//     price: req.body.price,
//     image: req.file.path,
//   });
// };)

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use('/api/items', require('./routes/items'));
app.use('/api/items', itemsRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message : 'Something broke!' });
});

mongoose.connect(process.env.MONGODB_URI, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  // useCreateIndex: true,
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => {
  console.error('Error connecting to MongoDB:', err);
  process.exit(1);
});

app.get('/', (req, res) => {
  res.json({message: 'API is running'});
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
