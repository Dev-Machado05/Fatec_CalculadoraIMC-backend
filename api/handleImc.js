const { saveImcCalculation } = require('../lib/database');

module.exports = async function handler(req, res) {
  // Configuração CORS 
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.setHeader('Access-Control-Max-Age', '86400');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { age, sex, height, weight } = req.body;

    if (!age || !sex || !height || !weight) {
      return res.status(400).json({ error: "Send the person data to calculate the BMI" });
    }

    const userAge = parseFloat(age);
    const userWeight = parseFloat(weight);
    const userHeight = parseFloat(height);

    if (isNaN(userAge) || isNaN(userWeight) || isNaN(userHeight)) {
      return res.status(400).json({ error: "Age, weight and height must be valid numbers" });
    }

    if (userHeight <= 0 || userWeight <= 0 || userAge <= 0) {
      return res.status(400).json({ error: "Age, weight and height must be positive numbers" });
    }

    if (sex !== "male" && sex !== "female") {
      return res.status(400).json({ error: "Sex must be 'male' or 'female'" });
    }

    if (userAge <= 19) {
      return res.status(400).json({ error: "Sorry, but we can't calculate child's and teenager's BMI" });
    }

    const imcResult = userWeight / (userHeight ** 2);

    let idealWeight;
    if (imcResult > 24.9) {
      idealWeight = 24.9 * (userHeight ** 2);
    } else if (imcResult < 18.5) {
      idealWeight = 18.5 * (userHeight ** 2);
    } else {
      idealWeight = userWeight;
    }

    let imcClass;
    if (imcResult < 18.5) {
      imcClass = "Abaixo do peso";
    } else if (imcResult >= 18.5 && imcResult < 25) {
      imcClass = "Peso Normal";
    } else if (imcResult >= 25 && imcResult < 30) {
      imcClass = "Sobrepeso";
    } else if (imcResult >= 30 && imcResult < 35) {
      imcClass = "Obesidade grau 1";
    } else if (imcResult >= 35 && imcResult < 40) {
      imcClass = "Obesidade grau 2";
    } else {
      imcClass = "Obesidade grau 3";
    }

    // Salvar no banco
    try {
      await saveImcCalculation(
        userAge, sex, userHeight, userWeight,
        parseFloat(imcResult.toFixed(2)), imcClass, parseFloat(idealWeight.toFixed(2))
      );
      
      console.log(`✅ IMC calculado e salvo com sucesso - Classificação: ${imcClass}`);
      
    } catch (dbError) {
      console.error('❌ Erro ao salvar IMC no banco:', dbError.message || dbError);
    }

    res.status(200).json({
      imc: parseFloat(imcResult.toFixed(2)),
      class: imcClass,
      idealWeight: parseFloat(idealWeight.toFixed(2)),
      saved: true
    });

  } catch (err) {
    console.error("💥 Erro crítico no handleImc:", err.message || err);
    res.status(500).json({ error: "Internal server error" });
  }
};