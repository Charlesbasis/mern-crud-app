const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

app.use(cors());
app.use(express.json());

app.use('/api/items', require('./routes/items'));

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
