const { getImcHistory } = require('../lib/database');

module.exports = async function handler(req, res) {
  // Configuração CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

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
      
      res.status(200).json({
        success: true,
        data: historyData,
        source: 'database'
      });
    } catch (dbError) {
      console.error('❌ Erro no banco D1, usando dados de exemplo:', dbError.message || dbError);
      
      // Fallback para dados de exemplo
      const sampleData = [
        {
          id: 1,
          user_age: 25,
          user_sex: "male",
          user_height: 1.75,
          user_weight: 70,
          imc_result: 22.86,
          imc_class: "Peso Normal",
          ideal_weight: 70,
          created_at: "2024-10-01 14:30:25"
        },
        {
          id: 2,
          user_age: 30,
          user_sex: "female",
          user_height: 1.65,
          user_weight: 55,
          imc_result: 20.2,
          imc_class: "Peso Normal",
          ideal_weight: 55,
          created_at: "2024-10-01 15:00:00"
        }
      ];

      res.status(200).json({
        success: true,
        data: sampleData,
        source: 'sample'
      });
      
      console.log(`📊 Fallback ativo: retornando ${sampleData.length} registros de exemplo`);
    }

  } catch (err) {
    console.error('💥 Erro crítico no endpoint history:', err.message || err);
    res.status(500).json({
      success: false,
      error: "Erro ao buscar histórico de IMCs"
    });
  }
};