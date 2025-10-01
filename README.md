# 📊 Calculadora de IMC - Backend

API REST para cálculo de Índice de Massa Corporal (IMC) desenvolvida em Node.js com Express.

## 🚀 Como utilizar

### Pré-requisitos
- Node.js instalado
- npm ou yarn

### 1. Instalação
```bash
# Clone o repositório
git clone <url-do-repositorio>

# Navegue até a pasta do backend
cd calc_IMC/backend

# Instale as dependências
npm install
```

### 2. Executar o servidor
```bash
# Inicie o servidor
node index.js
```

O servidor estará rodando em: `http://localhost:3000`

## 📋 API Endpoints

### POST `/handleImc`
Calcula o IMC de uma pessoa.

**Corpo da requisição:**
```json
{
  "age": 25,
  "sex": "male", // "male" ou "female"
  "height": 1.75, // em metros
  "weight": 70 // em kg
}
```

**Resposta de sucesso (200):**
```json
{
  "imc": 22.86,
  "class": "Peso Normal",
  "idealWeight": 70
}
```

**Validações:**
- Idade deve ser maior que 19 anos
- Altura e peso devem ser valores positivos
- Sexo deve ser "male" ou "female"

### GET `/userLogin`
Endpoint de teste (retorna mensagem simples).

## 🛠️ Tecnologias
- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **CORS** - Middleware para requisições cross-origin

## 📁 Estrutura do projeto
```
backend/
├── index.js          # Arquivo principal da API
├── package.json       # Dependências e scripts
├── README.md         # Documentação
└── .gitignore        # Arquivos ignorados pelo Git
```

## 🔧 Configuração CORS
O servidor está configurado para aceitar requisições de:
- `http://localhost:8100` (Ionic)
- `http://localhost:3000`
- `http://localhost:8080`

## 📝 Exemplo de uso com fetch
```javascript
const response = await fetch('http://localhost:3000/handleImc', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    age: 25,
    sex: "male",
    height: 1.75,
    weight: 70
  })
});

const data = await response.json();
console.log(data);
```

## 📊 Classificação do IMC
- **Abaixo do peso**: < 18.5
- **Peso Normal**: 18.5 - 24.9
- **Sobrepeso**: 25.0 - 29.9
- **Obesidade grau 1**: 30.0 - 34.9
- **Obesidade grau 2**: 35.0 - 39.9
- **Obesidade grau 3**: ≥ 40.0
