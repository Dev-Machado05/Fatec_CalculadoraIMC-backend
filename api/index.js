module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  res.status(200).json({
    message: "✅ Fatec IMC Calculator API is running!",
    endpoints: {
      "POST /api/handleImc": "Calculate BMI",
      "GET /api/history": "Get BMI history"
    },
    status: "online"
  });
};