// File: api/call.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({ error: 'Phone number is required' });
  }

  // Format phone to E.164 if not already
  const formattedPhone = phone.startsWith('+') ? phone : `+1${phone}`;
  console.log("📞 Sending call to:", formattedPhone);

  try {
    const response = await fetch('https://api.synthflow.ai/v1/calls', {
      method: 'POST',
      headers: {
        Authorization: `Bearer Qax8vcxe8bnS0YaV0z4gbP192dqbVvw5yQ725U3YXn8`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phoneNumber: formattedPhone,
        agentId: '1746234854889x948654153723518700',
      }),
    });

    let data;
    try {
      data = await response.json();
    } catch (jsonError) {
      const raw = await response.text(); // fallback for HTML or plain-text errors
      console.error("❌ Non-JSON response from Synthflow:", raw);
      return res.status(500).json({ error: "Synthflow returned invalid response", raw });
    }

    if (!response.ok) {
      console.error("❌ Synthflow API error:", data);
      return res.status(500).json({ error: data.message || 'Synthflow call failed' });
    }

    return res.status(200).json({ message: 'Call started', data });
  } catch (error) {
    console.error("❌ API error:", error);
    return res.status(500).json({ error: error.message || "Server error" });
  }
}
