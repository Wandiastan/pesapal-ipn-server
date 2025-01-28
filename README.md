# PesaPal IPN Server

This is a simple Express.js server that handles Instant Payment Notifications (IPN) from PesaPal for the DFirst Trading App.

## Setup

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory (optional for local development)

## Local Development

To run the server locally:

```bash
npm run dev
```

The server will start on `http://localhost:3000`

## Deployment to Render

1. Create a new account on [Render](https://render.com) if you haven't already
2. Create a new Web Service
3. Connect your GitHub repository
4. Configure the deployment:
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment Variables: None required (but can be added if needed)

## Endpoints

- `GET /` - Health check endpoint
- `POST /ipn` - PesaPal IPN endpoint

## IPN Integration

1. After deploying to Render, copy your deployment URL (e.g., `https://your-app.onrender.com`)
2. Go to your PesaPal dashboard
3. Navigate to the IPNs section
4. Register a new IPN with the URL: `https://your-app.onrender.com/ipn`
5. Copy the IPN ID and update it in your mobile app's configuration

## Testing

You can test the IPN endpoint using tools like Postman or curl:

```bash
curl -X POST https://your-app.onrender.com/ipn \
  -H "Content-Type: application/json" \
  -d '{
    "orderTrackingId": "test-123",
    "paymentStatus": "COMPLETED"
  }'
``` 