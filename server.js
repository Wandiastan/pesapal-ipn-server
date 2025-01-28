const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ status: 'healthy', message: 'PesaPal IPN server is running' });
});

// IPN endpoint
app.post('/ipn', async (req, res) => {
  try {
    const {
      orderTrackingId,
      orderMerchantReference,
      orderNotificationType,
      orderAmount,
      orderCurrency,
      paymentStatus,
      paymentStatusDescription,
      paymentMethod,
      paymentAccount,
      createdDate,
    } = req.body;

    // Log the payment notification
    console.log('Payment Notification Received:', {
      orderTrackingId,
      orderMerchantReference,
      orderNotificationType,
      orderAmount,
      orderCurrency,
      paymentStatus,
      paymentStatusDescription,
      paymentMethod,
      paymentAccount,
      createdDate,
    });

    // TODO: Add your custom logic here
    // For example:
    // - Validate the payment status
    // - Update your database
    // - Send notifications
    // - etc.

    // Always respond with success to PesaPal
    res.status(200).json({
      status: 'success',
      message: 'IPN notification received and processed'
    });
  } catch (error) {
    console.error('IPN Error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to process IPN notification'
    });
  }
});

// Start server
app.listen(port, () => {
  console.log(`PesaPal IPN server listening at http://localhost:${port}`);
}); 