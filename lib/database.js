require('dotenv').config();

const CLOUDFLARE_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const CLOUDFLARE_DATABASE_ID = process.env.CLOUDFLARE_DATABASE_ID;
const CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;

const isDev = process.env.NODE_ENV === 'development';

if (isDev) {
  const missingVars = [];
  if (!CLOUDFLARE_ACCOUNT_ID) missingVars.push('CLOUDFLARE_ACCOUNT_ID');
  if (!CLOUDFLARE_DATABASE_ID) missingVars.push('CLOUDFLARE_DATABASE_ID');
  if (!CLOUDFLARE_API_TOKEN) missingVars.push('CLOUDFLARE_API_TOKEN');

  if (missingVars.length > 0) {
    console.error('❌ Variáveis de ambiente faltando:', missingVars.join(', '));
  } else {
    console.log('✅ Todas as variáveis de ambiente D1 carregadas');
  }
}

const DB_URL = `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/d1/database/${CLOUDFLARE_DATABASE_ID}/query`;


if (isDev) {
  console.log('🌐 Database D1 configurado e pronto');
}

// Função para executar queries no D1
async function executeQuery(sql, params = []) {
    try {

        const response = await fetch(DB_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${CLOUDFLARE_API_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sql: sql,
                params: params
            })
        });


        if (!response.ok) {
            console.error('❌ Erro HTTP no banco D1:', response.status);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (!data.success) {
            console.error('❌ Erro do banco D1:', data.errors?.[0]?.message || 'Erro desconhecido');
            throw new Error(`Database error: ${data.errors?.[0]?.message || 'Unknown error'}`);
        }

        if (sql.trim().toUpperCase().startsWith('INSERT')) {
            console.log('✅ Dados salvos no banco D1 com sucesso');
        } else if (sql.trim().toUpperCase().startsWith('SELECT')) {
            const resultCount = data.result?.[0]?.results?.length || 0;
            console.log(`✅ Consulta executada: ${resultCount} registros encontrados`);
        }

        return data.result;
        
    } catch (err) {
        console.error('💥 Erro crítico no banco D1:', err.message || err);
        throw err;
    }
}

// Função para salvar IMC
async function saveImcCalculation(age, sex, height, weight, imcResult, imcClass, ideal_weight) {
    const sql = `
        INSERT INTO imc_calculations
        (user_age, user_sex, user_height, user_weight, imc_result, imc_class, ideal_weight)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [age, sex, height, weight, imcResult, imcClass, ideal_weight];
    return await executeQuery(sql, params);
}

// Função para buscar histórico
async function getImcHistory(limit = 50) {
    const sql = `
        SELECT * FROM imc_calculations
        ORDER BY created_at DESC
        LIMIT ?
    `;

    return await executeQuery(sql, [limit]);
}

module.exports = { 
    executeQuery,
    saveImcCalculation,
    getImcHistory
};