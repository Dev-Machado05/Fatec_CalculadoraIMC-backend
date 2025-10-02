export default async function handler(req, res) {// Função para calcular IMCconst { saveImcCalculation } = require('../lib/database');

  // Configuração CORS

  res.setHeader('Access-Control-Allow-Origin', '*');function calculateIMC(weight, height) {

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');  return Number((weight / (height * height)).toFixed(2));module.exports = async function handler(req, res) {

  res.setHeader('Access-Control-Max-Age', '86400');

}  // Configuração CORS 

  if (req.method === 'OPTIONS') {

    return res.status(200).end();  res.setHeader('Access-Control-Allow-Origin', '*');

  }

// Função para classificar IMC  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

  if (req.method !== 'POST') {

    return res.status(405).json({ error: 'Method not allowed' });function classifyIMC(imc) {  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

  }

  if (imc < 18.5) return "Abaixo do peso";  res.setHeader('Access-Control-Max-Age', '86400');

  try {

    const { age, sex, height, weight } = req.body;  if (imc < 25) return "Peso Normal";



    if (!age || !sex || !height || !weight) {  if (imc < 30) return "Sobrepeso";  if (req.method === 'OPTIONS') {

      return res.status(400).json({ 

        error: "Todos os campos são obrigatórios"   if (imc < 35) return "Obesidade grau 1";    return res.status(200).end();

      });

    }  if (imc < 40) return "Obesidade grau 2";  }



    // Validações  return "Obesidade grau 3";

    if (age <= 19) {

      return res.status(400).json({ }  if (req.method !== 'POST') {

        error: "Idade deve ser maior que 19 anos" 

      });    return res.status(405).json({ error: 'Method not allowed' });

    }

// Função para calcular peso ideal  }

    if (height <= 0 || weight <= 0) {

      return res.status(400).json({ function calculateIdealWeight(height, sex) {

        error: "Altura e peso devem ser valores positivos" 

      });  if (sex === "male") {  try {

    }

    return Number((22 * height * height).toFixed(1));    const { age, sex, height, weight } = req.body;

    if (sex !== "male" && sex !== "female") {

      return res.status(400).json({   } else {

        error: "Sexo deve ser 'male' ou 'female'" 

      });    return Number((21 * height * height).toFixed(1));    if (!age || !sex || !height || !weight) {

    }

  }      return res.status(400).json({ error: "Send the person data to calculate the BMI" });

    // Cálculo do IMC

    const imc = Number((weight / (height * height)).toFixed(2));}    }



    // Classificação do IMC

    let classification;

    if (imc < 18.5) classification = "Abaixo do peso";export default async function handler(req, res) {    const userAge = parseFloat(age);

    else if (imc < 25) classification = "Peso Normal";

    else if (imc < 30) classification = "Sobrepeso";  // Configuração CORS    const userWeight = parseFloat(weight);

    else if (imc < 35) classification = "Obesidade grau 1";

    else if (imc < 40) classification = "Obesidade grau 2";  res.setHeader('Access-Control-Allow-Origin', '*');    const userHeight = parseFloat(height);

    else classification = "Obesidade grau 3";

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

    // Cálculo do peso ideal

    let idealWeight;  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');    if (isNaN(userAge) || isNaN(userWeight) || isNaN(userHeight)) {

    if (sex === "male") {

      idealWeight = Number((22 * height * height).toFixed(1));  res.setHeader('Access-Control-Max-Age', '86400');      return res.status(400).json({ error: "Age, weight and height must be valid numbers" });

    } else {

      idealWeight = Number((21 * height * height).toFixed(1));    }

    }

  if (req.method === 'OPTIONS') {

    const result = {

      imc,    return res.status(200).end();    if (userHeight <= 0 || userWeight <= 0 || userAge <= 0) {

      class: classification,

      idealWeight,  }      return res.status(400).json({ error: "Age, weight and height must be positive numbers" });

      message: "Cálculo realizado com sucesso",

      timestamp: new Date().toISOString()    }

    };

  if (req.method !== 'POST') {

    console.log(`✅ IMC calculado: ${imc} (${classification})`);

        return res.status(405).json({ error: 'Method not allowed' });    if (sex !== "male" && sex !== "female") {

    res.status(200).json(result);

  } catch (err) {  }      return res.status(400).json({ error: "Sex must be 'male' or 'female'" });

    console.error('💥 Erro no cálculo de IMC:', err.message || err);

    res.status(500).json({     }

      error: "Erro interno do servidor" 

    });  try {

  }

}    const { age, sex, height, weight } = req.body;    if (userAge <= 19) {

      return res.status(400).json({ error: "Sorry, but we can't calculate child's and teenager's BMI" });

    if (!age || !sex || !height || !weight) {    }

      return res.status(400).json({ 

        error: "Todos os campos são obrigatórios"     const imcResult = userWeight / (userHeight ** 2);

      });

    }    let idealWeight;

    if (imcResult > 24.9) {

    // Validações      idealWeight = 24.9 * (userHeight ** 2);

    if (age <= 19) {    } else if (imcResult < 18.5) {

      return res.status(400).json({       idealWeight = 18.5 * (userHeight ** 2);

        error: "Idade deve ser maior que 19 anos"     } else {

      });      idealWeight = userWeight;

    }    }



    if (height <= 0 || weight <= 0) {    let imcClass;

      return res.status(400).json({     if (imcResult < 18.5) {

        error: "Altura e peso devem ser valores positivos"       imcClass = "Abaixo do peso";

      });    } else if (imcResult >= 18.5 && imcResult < 25) {

    }      imcClass = "Peso Normal";

    } else if (imcResult >= 25 && imcResult < 30) {

    if (sex !== "male" && sex !== "female") {      imcClass = "Sobrepeso";

      return res.status(400).json({     } else if (imcResult >= 30 && imcResult < 35) {

        error: "Sexo deve ser 'male' ou 'female'"       imcClass = "Obesidade grau 1";

      });    } else if (imcResult >= 35 && imcResult < 40) {

    }      imcClass = "Obesidade grau 2";

    } else {

    // Cálculos      imcClass = "Obesidade grau 3";

    const imc = calculateIMC(weight, height);    }

    const classification = classifyIMC(imc);

    const idealWeight = calculateIdealWeight(height, sex);    // Salvar no banco

    try {

    const result = {      await saveImcCalculation(

      imc,        userAge, sex, userHeight, userWeight,

      class: classification,        parseFloat(imcResult.toFixed(2)), imcClass, parseFloat(idealWeight.toFixed(2))

      idealWeight,      );

      message: "Cálculo realizado com sucesso",      

      timestamp: new Date().toISOString()      console.log(`✅ IMC calculado e salvo com sucesso - Classificação: ${imcClass}`);

    };      

    } catch (dbError) {

    console.log(`✅ IMC calculado: ${imc} (${classification})`);      console.error('❌ Erro ao salvar IMC no banco:', dbError.message || dbError);

        }

    res.status(200).json(result);

  } catch (err) {    res.status(200).json({

    console.error('💥 Erro no cálculo de IMC:', err.message || err);      imc: parseFloat(imcResult.toFixed(2)),

    res.status(500).json({       class: imcClass,

      error: "Erro interno do servidor"       idealWeight: parseFloat(idealWeight.toFixed(2)),

    });      saved: true

  }    });

}
  } catch (err) {
    console.error("💥 Erro crítico no handleImc:", err.message || err);
    res.status(500).json({ error: "Internal server error" });
  }
};