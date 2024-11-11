// Importando o Express e o body-parser
import express from 'express';
import cors from 'cors';

// Criando o servidor Express
const app = express();
//const port = 3000;

// Middleware para processar requisições com JSON no corpo
app.use(express.json());




app.use(cors({
    "origin":"*",
    "Access-Control-Allow-Origin":'*'
}));




// Rota padrão ("/")
app.get('/', (req, res) => {
  res.status(200).send("API rodando corretamente");
});

// Rota para "/dados" (receber dados via POST)
app.post('/dados', (req, res) => {
  // Recebendo os dados enviados
  const { temperatura, ph } = req.body;

  // Verificando se os dados foram enviados corretamente
  if (temperatura && ph) {
    // Exibindo os dados recebidos na resposta
    res.status(200).send(`
      <h1>Dados Recebidos</h1>
      <p><strong>Temperatura:</strong> ${temperatura}°C</p>
      <p><strong>pH:</strong> ${ph}</p>
    `);
  } else {
    // Se faltarem dados, respondemos com erro 400
    res.status(400).json({ error: 'Dados faltando' });
  }
});

// Iniciando o servidor local
/*
app.listen(port, () => {
  console.log(`API rodando localmente em http://localhost:${port}`);
});
*/
export default app;

