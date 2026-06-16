const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Load and mount Razorpay routes
const razorpayRouter = require('./razorpay');
app.use('/api', razorpayRouter);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Dongri Cha Raja backend is running' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
