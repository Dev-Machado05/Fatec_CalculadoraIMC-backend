const express = require("express");
const cors = require("cors");
const app = express();

// Configurar CORS
app.use(cors({
  origin: ['http://localhost:8100', 'http://localhost:3000', 'http://localhost:8080'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 3000;

// let userAge,
//   userHeight,
//   userWeight,
//   idealWeight,
//   imcResult = 0;
// let userSex,
//   imcClass = "";

app.get("/userLogin", (req, res) => {
  res.status(200).send("nothing here for now...");
});

// recebe os dados de uma pessoa e calcula o seu imc e salva seus dados
app.post("/handleImc", (req, res) => {
  try {
    const { age, sex, height, weight } = req.body;

    if (!age || !sex || !height || !weight) {
      return res.status(400).send("Send the person data to calculate the BMI");
    }
    
    // Validação de tipos - convertendo para números
    const userAge = parseFloat(age);
    const userWeight = parseFloat(weight);
    const userHeight = parseFloat(height);

    // Verificando se são números válidos
    if (isNaN(userAge) || isNaN(userWeight) || isNaN(userHeight)) {
      return res.status(400).send("Age, weight and height must be valid numbers");
    }

    if (
      (sex !== "male" && sex !== "female") || userHeight <= 0 || userWeight <= 0
    ) {
      return res
        .status(400)
        .send(
          "Invalid data, send the person right information to calculate the imc"
        );
    } else if (userAge <= 19) {
      return res
        .status(400)
        .send("sorry, but we cant calculate child's and teenager's imc");
    }
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

    res.status(200).json({
      imc: imcResult.toFixed(2),
      class: imcClass,
      idealWeight: idealWeight.toFixed(2),
    });
  } catch (err) {
    res.status(400).json({ error: "Bad request: Invalid data format" });
  }
});

app.listen(port, () => {
  console.log(`App listening on the port: http://localhost:${port}`);
});
