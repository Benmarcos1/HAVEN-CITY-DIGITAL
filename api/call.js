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

  const data = await response.json();

  if (!response.ok) {
    console.error("❌ Synthflow response error:", data); // 👈 add this line
    return res.status(500).json({ error: data.message || 'Synthflow call failed' });
  }

  return res.status(200).json({ message: 'Call started', data });
} catch (error) {
  console.error("❌ API error:", error); // 👈 make sure this stays too
  return res.status(500).json({ error: error.message || "Server error" });
}
