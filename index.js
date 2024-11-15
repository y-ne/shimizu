const express = require('express')
const axios = require('axios')
const app = express()
const port = 3000

// Middleware to parse JSON bodies
app.use(express.json())

// Endpoint that receives the callback
app.post('/callbacks', (req, res) => {
  console.log('request from callbacks :', req.body)
  res.json({
    success: true,
    message: 'Callback received',
    header: req.headers,
    body: req.body
  })
})

// Endpoint that sends the callback using axios
app.post('/send-callbacks', async (req, res) => {
  try {
    // Making a POST request to our callbacks endpoint
    const response = await axios.post('http://localhost:3000/callbacks', {
      message: 'Hello from axios!',
      timestamp: new Date(),
      data: req.body // Forward any data received
    })

    console.log('response from callbacks : ', response)

    res.json({
      success: true,
      message: 'Callback sent successfully',
      response: response.data
    })
  } catch (error) {
    console.error('response from callback :', error.response)
    console.error('Error sending callback :', error.message)
    res.status(500).json({
      success: false,
      message: 'Failed to send callback',
      error: error.message
    })
  }
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})