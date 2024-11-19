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
  res.status(200).send(`<h1>API rodando corretamente</h1>`);
});


// Rota para "/dados" (receber dados via POST)
app.post('/dados', (req, res) => {
  // Recebendo os dados enviados no corpo da requisição
  
  const { Dado } = req.body;
  // Verificando se todos os dados necessários foram enviados
  if (Dado !== undefined) {
    // Exibindo os dados recebidos na resposta HTML
    res.status(200).send(`
      <p><strong>DADO:</strong> ${Dado}</p>
    `);
  } else {
    // Se faltar algum dado, respondemos com erro 400
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

