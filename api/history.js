// Função para retornar dados de exemplo
function getSampleData() {
  return [
    {
      id: 1,
      age: 25,
      sex: "male",
      height: 1.75,
      weight: 70,
      imc: 22.86,
      class: "Peso Normal",
      idealWeight: 70,
      timestamp: "2024-10-01T14:30:25.000Z"
    },
    {
      id: 2,
      age: 30,
      sex: "female",
      height: 1.65,
      weight: 55,
      imc: 20.2,
      class: "Peso Normal",
      idealWeight: 55,
      timestamp: "2024-10-01T15:00:00.000Z"
    },
    {
      id: 3,
      age: 35,
      sex: "male",
      height: 1.80,
      weight: 85,
      imc: 26.23,
      class: "Sobrepeso",
      idealWeight: 73,
      timestamp: "2024-10-02T10:15:30.000Z"
    }
  ];
}

export default async function handler(req, res) {
  // Configuração CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.setHeader('Access-Control-Max-Age', '86400');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('📊 Retornando dados de histórico de exemplo');
    const sampleData = getSampleData();
    
    res.status(200).json(sampleData);
    console.log(`📊 Enviados ${sampleData.length} registros de exemplo`);
  } catch (err) {
    console.error('💥 Erro no endpoint history:', err.message || err);
    res.status(500).json([]);
  }
}