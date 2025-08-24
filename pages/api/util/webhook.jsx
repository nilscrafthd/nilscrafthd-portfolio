import axios from 'axios';

export default async function webhook(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  try {
    const payload = req.body;

    // Validate that we have the required data
    if (!payload || !payload.embeds || !Array.isArray(payload.embeds)) {
      return res.status(400).json({ error: 'Invalid payload structure' });
    }

    // Discord webhook URL
    const webhookUrl = 'https://discord.com/api/webhooks/1383556276243529821/Z37V0O9GynSvs9QWXCpCxYGINmTjCpvskRPZ0EIbKyJDVWkZ2EniLq3U5TNVA3YL67Kp';

    // Send to Discord with proper headers and error handling
    const response = await axios.post(webhookUrl, payload, {
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'ContactForm/1.0'
      },
      timeout: 10000, // 10 second timeout
      validateStatus: function (status) {
        return status >= 200 && status < 300; // Only resolve for 2xx status codes
      }
    });

    console.log('Discord webhook success:', response.status);
    return res.status(200).json({ 
      success: true, 
      message: 'Message sent successfully',
      discordStatus: response.status 
    });

  } catch (error) {
    console.error('Discord webhook error:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data
    });

    // Handle specific Discord API errors
    if (error.response) {
      const status = error.response.status;
      const discordError = error.response.data;

      if (status === 400) {
        return res.status(400).json({ 
          error: 'Invalid request to Discord API',
          details: discordError 
        });
      } else if (status === 401) {
        return res.status(500).json({ 
          error: 'Discord webhook authentication failed' 
        });
      } else if (status === 404) {
        return res.status(500).json({ 
          error: 'Discord webhook not found' 
        });
      } else if (status === 429) {
        return res.status(429).json({ 
          error: 'Rate limited by Discord API',
          retryAfter: discordError.retry_after 
        });
      }
    }

    // Network or other errors
    if (error.code === 'ECONNABORTED') {
      return res.status(408).json({ error: 'Request timeout' });
    }

    return res.status(500).json({ 
      error: 'Failed to send message',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
