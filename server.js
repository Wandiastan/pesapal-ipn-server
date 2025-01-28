const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Store the IPN and registration data
let lastReceivedIPN = null;
let ipnRegistration = null;

// Middleware
app.use(express.json());
app.use(cors());

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ 
    status: 'healthy', 
    message: 'PesaPal IPN server is running',
    ipn_url: `${req.protocol}://${req.get('host')}/ipn`,
    ipn_registration: ipnRegistration,
    last_ipn: lastReceivedIPN
  });
});

// Register IPN URL endpoint
app.post('/register-ipn', async (req, res) => {
  try {
    const { ipn_id, url } = req.body;
    
    // Store the IPN registration
    ipnRegistration = {
      registered_at: new Date().toISOString(),
      ipn_id,
      url
    };

    console.log('IPN Registration:', ipnRegistration);

    res.status(200).json({
      status: 'success',
      message: 'IPN URL registered successfully',
      data: ipnRegistration
    });
  } catch (error) {
    console.error('IPN Registration Error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to register IPN URL'
    });
  }
});

// Display IPN information
app.get('/ipn', (req, res) => {
  res.json({
    status: 'ready',
    message: 'PesaPal IPN endpoint',
    ipn_registration: ipnRegistration,
    last_received_ipn: lastReceivedIPN,
    setup_instructions: {
      registration_url: `${req.protocol}://${req.get('host')}/register-ipn`,
      ipn_url: `${req.protocol}://${req.get('host')}/ipn`,
      registration_method: 'POST',
      registration_parameters: {
        ipn_id: 'string - Your PesaPal IPN ID',
        url: 'string - Your IPN URL'
      },
      ipn_method: 'POST',
      ipn_parameters: [
        'orderTrackingId',
        'orderMerchantReference',
        'orderNotificationType',
        'orderAmount',
        'orderCurrency',
        'paymentStatus',
        'paymentStatusDescription',
        'paymentMethod',
        'paymentAccount',
        'createdDate'
      ]
    }
  });
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

    // Store the received IPN data
    lastReceivedIPN = {
      received_at: new Date().toISOString(),
      data: {
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
      }
    };

    // Log the payment notification
    console.log('Payment Notification Received:', lastReceivedIPN);

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