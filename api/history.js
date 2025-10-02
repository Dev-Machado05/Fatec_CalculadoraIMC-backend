const { getImcHistory } = require('../lib/database');

module.exports = async function handler(req, res) {
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
    // Tentar buscar dados reais do banco
    try {
      const result = await getImcHistory(50);
      const historyData = result[0]?.results || [];
      
      console.log(`📊 Histórico carregado: ${historyData.length} registros encontrados`);
      
      // Retornar dados diretamente (sem wrapper)
      res.status(200).json(historyData);
    } catch (dbError) {
      console.error('❌ Erro no banco D1, usando dados de exemplo:', dbError.message || dbError);
      
      // Fallback para dados de exemplo - ajustando nomes dos campos
      const sampleData = [
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
        }
      ];

      // Retornar dados diretamente (sem wrapper)
      res.status(200).json(sampleData);
      
      console.log(`📊 Fallback ativo: retornando ${sampleData.length} registros de exemplo`);
    }

  } catch (err) {
    console.error('💥 Erro crítico no endpoint history:', err.message || err);
    res.status(500).json([]);
  }
};