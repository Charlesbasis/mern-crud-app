const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const multer = require('multer');
const path = require('path');
// const { check, validationResult } = require('express-validator');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', upload.single('image'), async (req, res) => {

  let imageData = null;
  
  if (req.file) {
    imageData = req.file.path;
  }
  
  const item = new Item({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      image: imageData,
    });

    try {
      const savedItem = await item.save();
      res.json(savedItem);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', upload.single('image'), async (req, res) => {
  
  try {
    const updateItem = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
    }
  
  if (req.file) {
    updateItem.image = req.file.path;
  }  
  
    const item = await Item.findByIdAndUpdate(req.params.id, updateItem, {
      new: true,
    });
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
