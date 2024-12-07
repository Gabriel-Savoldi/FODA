// Importando o Express e o body-parser
import express from 'express';
import cors from 'cors';
import gravarDados from "./servicoBackend.js";
// Criando o servidor Express
const app = express();

// Middleware para processar requisições com JSON no corpo
app.use(express.json()); // Permite que o Express entenda JSON no corpo da requisição

// Ativar CORS para permitir requisições de qualquer origem
app.use(cors({
  origin: '*', // Permite qualquer origem
  "Access-Control-Allow-Origin": "*"
}));

// Rota padrão ("/")
app.get('/', (req, res) => {
  res.status(200).send(`<h1>API rodando corretamente</h1>`);
});




// Rota para "/dados" (receber dados via POST)
app.post('/dados', (req, res) => {
  // Recebendo os dados enviados no corpo da requisição
  const { pH, Temperatura, Turbidez } = req.body;
  let dados= {};
  // Verificando se todos os dados necessários foram enviados
  if (pH !== undefined && Temperatura !== undefined && Turbidez !== undefined) {

    const data = new Date();
    dados=
    {
      "id":0,
      "data":data,
      "pH":pH,
      "turbidez":Turbidez,
      "temperatura":Temperatura
    }
    



    // Exibindo os dados recebidos
    console.log(`Dados recebidos: pH = ${pH}, Temperatura = ${Temperatura} C, Turbidez = ${Turbidez}`);
    try{
      const resposta = gravarDados(dados);
      console.log(`Resposta: ${resposta.status}
        Mensagem:${resposta.mensagem}
        `)

    }catch(erro){
      console.log(`Resposta: ${resposta.status}
        Mensagem:${erro.menssage}
        `)
    }
    // Respondendo com os dados recebidos em formato HTML
    res.status(200).send(`
      <p><strong>pH:</strong> ${pH}</p>
      <p><strong>Temperatura:</strong> ${Temperatura} C</p>
      <p><strong>Turbidez:</strong> ${Turbidez}</p>
    `);

  } else {
    // Se faltar algum dado, respondemos com erro 400
    res.status(400).json({ error: 'Dados faltando' });
  }
});

// Iniciando o servidor
/*
const port = process.env.PORT || 3000; // Usa a porta configurada no ambiente ou a 3000 por padrão
app.listen(port, () => {
  console.log(`API rodando localmente em http://localhost:${port}`);
});*/

export default app;
