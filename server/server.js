const express = require('express');
const cors    = require('cors');
const path    = require('path');
require('dotenv').config();

const app  = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve locally-saved PDF receipts (fallback when Firebase Storage is unavailable)
app.use('/receipts', express.static(path.join(__dirname, 'public', 'receipts')));

// Load and mount Razorpay routes
const razorpayRouter = require('./razorpay');
app.use('/api', razorpayRouter);

// Load and mount Contact routes
const contactRouter = require('./contact');
app.use('/api', contactRouter);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Dongri Cha Raja backend is running' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
