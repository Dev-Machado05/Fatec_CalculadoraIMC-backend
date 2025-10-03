# 📊 Calculadora de IMC - Backend

> **API REST para cálculo de Índice de Massa Corporal (IMC) desenvolvida em Node.js com Express**

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![Cloudflare](https://img.shields.io/badge/Cloudflare_D1-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

Backend da atividade proposta na matéria de PDM (Programação para Dispositivos Móveis), integrada com banco de dados Cloudflare D1 e preparada para deploy na Vercel, tendo como intuito calcular o IMC de uma pessoa.

## 🚀 Como utilizar

### Pré-requisitos
- Node.js 18+ instalado
- npm ou yarn
- Conta Cloudflare (para banco de dados D1)
- Conta Vercel (para deploy - opcional)

### 1. Instalação
```bash
# Clone o repositório
git clone https://github.com/Dev-Machado05/Fatec_CalculadoraIMC-backend.git

# Navegue até a pasta do backend
cd Fatec_CalculadoraIMC-backend

# Instale as dependências
npm install

# Instale o Wrangler CLI (para gerenciar D1)
npm install -g wrangler
```

### 2. Configuração do Banco de Dados
```bash
# Configure suas credenciais Cloudflare
wrangler login

# Crie o banco de dados D1
wrangler d1 create calc-imc-db

# Execute o schema no banco remoto
wrangler d1 execute calc-imc-db --remote --file=./schema.sql
```

### 3. Configuração de Ambiente
```bash
# Copie o arquivo de exemplo
cp .env.example .env

# Edite o arquivo .env com suas credenciais
# CLOUDFLARE_DATABASE_ID=seu-database-id-aqui
```

### 4. Executar o servidor

#### Desenvolvimento Local:
```bash
# Inicie o servidor local
npm start
# ou
node index.js
```

#### Desenvolvimento com D1 Local:
```bash
# Execute migrações locais
wrangler d1 execute calc-imc-db --local --file=./schema.sql

# Inicie com D1 local
wrangler dev
```

O servidor estará rodando em: `http://localhost:3000`

## 📋 API Endpoints

### POST `/handleImc`
Calcula o IMC de uma pessoa e salva no banco de dados.

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
  "idealWeight": 70,
  "message": "Cálculo realizado com sucesso",
  "timestamp": "2025-10-03T10:30:00.000Z"
}
```

**Validações:**
- Idade deve ser maior que 19 anos
- Altura e peso devem ser valores positivos
- Sexo deve ser "male" ou "female"

### GET `/history`
Retorna o histórico de cálculos de IMC.

**Resposta de sucesso (200):**
```json
[
  {
    "id": 1,
    "age": 25,
    "sex": "male",
    "height": 1.75,
    "weight": 70,
    "imc": 22.86,
    "class": "Peso Normal",
    "idealWeight": 70,
    "timestamp": "2025-10-03T10:30:00.000Z"
  }
]
```

### GET `/userLogin`
Endpoint de teste (retorna mensagem simples).

## 🛠️ Tecnologias

### Backend
- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **Cloudflare D1** - Banco de dados SQLite serverless
- **Wrangler** - CLI da Cloudflare para gerenciar D1
- **Vercel** - Plataforma de deploy serverless

### Ferramentas de Desenvolvimento
- **CORS** - Middleware para requisições cross-origin
- **dotenv** - Gerenciamento de variáveis de ambiente
- **Git** - Controle de versão

## 📁 Estrutura do projeto
```
backend/
├── api/                    # Funções serverless (Vercel)
│   ├── handleImc.js       # Endpoint de cálculo de IMC
│   └── history.js         # Endpoint de histórico
├── lib/                   # Bibliotecas compartilhadas
│   └── database.js        # Funções do banco D1
├── index.js              # Servidor Express (desenvolvimento)
├── schema.sql            # Schema do banco de dados
├── wrangler.toml         # Configuração Cloudflare
├── vercel.json           # Configuração Vercel
├── package.json          # Dependências e scripts
├── .env.example          # Template de variáveis de ambiente
├── .gitignore           # Arquivos ignorados pelo Git
└── README.md            # Documentação
```

## 🗄️ Banco de Dados
O projeto utiliza **Cloudflare D1**, um banco SQLite serverless que oferece:
- **Desenvolvimento**: Banco local com Wrangler
- **Produção**: Banco global distribuído
- **Custo**: Tier gratuito generoso
- **Performance**: Baixa latência global

### Schema da tabela `imc_calculations`:
```sql
CREATE TABLE imc_calculations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    age INTEGER NOT NULL,
    sex TEXT NOT NULL,
    height REAL NOT NULL,
    weight REAL NOT NULL,
    imc REAL NOT NULL,
    class TEXT NOT NULL,
    idealWeight REAL NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## 🎯 Classificação do IMC

| Faixa de IMC | Classificação |
|--------------|---------------|
| < 18.5 | Abaixo do peso |
| 18.5 - 24.9 | Peso Normal |
| 25.0 - 29.9 | Sobrepeso |
| 30.0 - 34.9 | Obesidade grau 1 |
| 35.0 - 39.9 | Obesidade grau 2 |
| ≥ 40.0 | Obesidade grau 3 |

## 🚀 Deploy na Vercel

### 1. Preparação
```bash
# Instale a CLI da Vercel
npm install -g vercel

# Configure suas variáveis de ambiente na Vercel
vercel env add CLOUDFLARE_DATABASE_ID
vercel env add CLOUDFLARE_ACCOUNT_ID  
vercel env add CLOUDFLARE_API_TOKEN
```

### 2. Deploy
```bash
# Deploy para produção
vercel --prod
```

### 3. Configuração pós-deploy
- Configure as variáveis de ambiente no painel da Vercel
- Teste os endpoints serverless
- Configure domínio personalizado (opcional)

## 🔧 Configuração CORS
O servidor está configurado para aceitar requisições de múltiplas origens:
- `http://localhost:8100` (Ionic)
- `http://localhost:3000`
- `http://localhost:8080`
- Domínios de produção da Vercel

## 🛡️ Segurança
- Variáveis de ambiente para credenciais sensíveis
- Logs sanitizados (sem exposição de dados pessoais)
- Validação rigorosa de entrada
- CORS configurado adequadamente
- `.env` excluído do controle de versão

## 📝 Scripts disponíveis
```bash
# Desenvolvimento local
npm start

# Deploy na Vercel
npm run deploy

# Gerenciar banco D1
npm run db:create    # Criar banco
npm run db:migrate   # Executar migrações
npm run db:local     # Banco local para desenvolvimento
```

## 📝 Exemplo de uso com fetch

### Cálculo de IMC:
```javascript
const response = await fetch('https://seu-projeto.vercel.app/api/handleImc', {
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

### Histórico:
```javascript
const response = await fetch('https://seu-projeto.vercel.app/api/history');
const history = await response.json();
console.log(history);
```

## 🐛 Troubleshooting

### Problemas comuns:

1. **Erro de banco de dados**
   ```bash
   # Verifique se o banco foi criado
   wrangler d1 list
   
   # Execute as migrações
   wrangler d1 execute calc-imc-db --remote --file=./schema.sql
   ```

2. **Variáveis de ambiente**
   ```bash
   # Verifique se o .env está configurado
   cat .env
   
   # No Windows
   type .env
   ```

3. **CORS em produção**
   - Verifique se o domínio frontend está na lista de origens permitidas
   - Configure variáveis de ambiente na Vercel para diferentes origens

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Padrões de Código
- Use JavaScript ES6+ 
- Siga as convenções do ESLint
- Mantenha funções pequenas e reutilizáveis
- Documente funções complexas

## 📄 Licença

Este projeto é de uso acadêmico para a disciplina de PDM da FATEC.

## 👥 Equipe

- **Desenvolvedor Principal**: [Dev-Machado05](https://github.com/Dev-Machado05)
- **Instituição**: FATEC - Faculdade de Tecnologia
- **Disciplina**: PDM - Programação para Dispositivos Móveis

## 📞 Contato

- 📧 Email: [Lucas Machado](mailto:dev.lucasmachado205@gmail.com)
- 🐙 GitHub: [@Dev-Machado05](https://github.com/Dev-Machado05)
- 🎓 FATEC: [Site Institucional](https://fatec.sp.gov.br/)

---

<div align="center">

**⭐ Se este projeto foi útil para você, considere dar uma estrela!**

</div>
