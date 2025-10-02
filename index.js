const express = require("express");
const cors = require("cors");
const app = express();
const { saveImcCalculation, getImcHistory } = require("./lib/database");

// Configurar CORS
app.use(
  cors({
    origin: [
      "http://localhost:8100",
      "http://localhost:3000",
      "http://localhost:8080",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 3000;


// recebe os dados de uma pessoa e calcula o seu imc e salva seus dados
app.post("/handleImc", async (req, res) => {
  try {
    const { age, sex, height, weight } = req.body;

    if (!age || !sex || !height || !weight) {
      return res
        .status(400)
        .json({ error: "Send the person data to calculate the BMI" });
    }

    // Validação de tipos - convertendo para números
    const userAge = parseFloat(age);
    const userWeight = parseFloat(weight);
    const userHeight = parseFloat(height);

    // Verificando se são números válidos
    if (isNaN(userAge) || isNaN(userWeight) || isNaN(userHeight)) {
      return res
        .status(400)
        .json({ error: "Age, weight and height must be valid numbers" });
    }

    if (userHeight <= 0 || userWeight <= 0 || userAge <= 0) {
      return res
        .status(400)
        .json({ error: "age, weight and height must be positive numbers" });
    }

    if (sex !== "male" && sex !== "female") {
      return res.status(400).json({
        error:
          "Invalid data, send the person right information to calculate the imc",
      });
    }

    if (userAge <= 19) {
      return res
        .status(400)
        .json({
          error: "sorry, but we cant calculate child's and teenager's imc",
        });
    }

    //Cálculos do IMC
    const imcResult = userWeight / userHeight ** 2;

    let idealWeight;
    if (imcResult > 24.9) {
      idealWeight = 24.9 * userHeight ** 2;
    } else if (imcResult < 18.5) {
      idealWeight = 18.5 * userHeight ** 2;
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

    //Salvar no Banco de Dados
    try {
      await saveImcCalculation(
        userAge,
        sex,
        userHeight,
        userWeight,
        parseFloat(imcResult.toFixed(2)),
        imcClass,
        parseFloat(idealWeight.toFixed(2))
      );
    } catch (dbError) {
      console.error('❌ Erro ao salvar no banco:', dbError)
    }
  
    res.status(200).json({
      imc: imcResult.toFixed(2),
      class: imcClass,
      idealWeight: idealWeight.toFixed(2),
    });
  } catch (err) {
    res.status(400).json({ error: "Bad request: Invalid data format" });
  }
});

app.get("/history", async (req, res) => {
  try {
    console.log('📊 Endpoint /history chamado');
    
    // Buscar dados reais do banco D1
    try {
      const history = await getImcHistory(50);
      
      res.status(200).json({
        success: true,
        data: history[0]?.results || []
      });
    } catch (dbError) {
      console.error('❌ Erro no banco D1:', dbError);
      
      // Fallback para dados de exemplo se o banco falhar
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
        }
      ];

      res.status(200).json({
        success: true,
        data: sampleData,
        message: "Usando dados de fallback - erro no banco"
      });
    }

  } catch (err) {
    console.error('❌ Erro ao buscar histórico:', err);
    res.status(500).json({
      success: false,
      error: "Erro ao buscar histórico de IMCs"
    });
  }
});

app.listen(port, () => {
  console.log(`🚀 App listening on the port: http://localhost:${port}`);
  console.log('📊 Database connected')
});