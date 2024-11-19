const express = require('express');
const Item = require('../models/Item');
const router = express.Router();

// Fetch all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Fetch item by ID
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).send('Item not found');
    res.json(item);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Place a bid
router.post('/:id/bid', async (req, res) => {
  try {
    const { bidAmount, userId } = req.body;
    const item = await Item.findById(req.params.id);

    if (!item) return res.status(404).send('Item not found');
    if (bidAmount <= item.currentBid) return res.status(400).send('Bid must be higher than current bid');

    // Update the highest bid
    item.currentBid = bidAmount;
    item.bidderId = userId;
    await item.save();

    res.status(200).send('Bid placed successfully');
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
