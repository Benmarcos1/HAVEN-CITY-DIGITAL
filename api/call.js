// File: api/call.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({ error: 'Phone number is required' });
  }

  try {
    const response = await fetch('https://api.synthflow.ai/v1/calls', {
      method: 'POST',
      headers: {
        Authorization: `Bearer Qax8vcxe8bnS0YaV0z4gbP192dqbVvw5yQ725U3YXn8`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phoneNumber: phone,
        agentId: '1746234854889x948654153723518700',
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({ error: data.message || 'Synthflow call failed' });
    }

    return res.status(200).json({ message: 'Call started', data });
  } catch (error) {
    console.error("API error:", error);
    return res.status(500).json({ error: error.message || "Server error" });
  }
}
