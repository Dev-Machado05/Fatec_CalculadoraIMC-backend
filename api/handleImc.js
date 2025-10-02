export default async function handler(req, res) {
  // Configuração CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { age, sex, height, weight } = req.body;

    if (!age || !sex || !height || !weight) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }

    if (age <= 19) {
      return res.status(400).json({ error: "Idade deve ser maior que 19 anos" });
    }

    if (height <= 0 || weight <= 0) {
      return res.status(400).json({ error: "Altura e peso devem ser valores positivos" });
    }

    if (sex !== "male" && sex !== "female") {
      return res.status(400).json({ error: "Sexo deve ser 'male' ou 'female'" });
    }

    // Cálculo do IMC
    const imc = Number((weight / (height * height)).toFixed(2));

    // Classificação
    let classification;
    if (imc < 18.5) classification = "Abaixo do peso";
    else if (imc < 25) classification = "Peso Normal";
    else if (imc < 30) classification = "Sobrepeso";
    else if (imc < 35) classification = "Obesidade grau 1";
    else if (imc < 40) classification = "Obesidade grau 2";
    else classification = "Obesidade grau 3";

    // Peso ideal
    let idealWeight;
    if (sex === "male") {
      idealWeight = Number((22 * height * height).toFixed(1));
    } else {
      idealWeight = Number((21 * height * height).toFixed(1));
    }

    const result = {
      imc,
      class: classification,
      idealWeight,
      message: "Cálculo realizado com sucesso",
      timestamp: new Date().toISOString()
    };

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}
