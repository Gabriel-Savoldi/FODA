// Importando o Express e o body-parser
import express from 'express';
import cors from 'cors';
import { incluirDados, buscarDados } from '../redux/dadosReducer.js';
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

  try {
    // Aguarde a resposta se buscarDados for uma função assíncrona
    const resposta = buscarDados();

    console.log(`Resposta: ${resposta.status}
      Mensagem: ${resposta.mensagem}`);

    res.status(200).send(`
      <h1>API rodando corretamente</h1>
      <p>Resposta: ${resposta.mensagem}</p>
    `);
  } catch (erro) {
    console.error('Erro ao buscar dados:', erro);
    res.status(500).send({ error: 'Erro interno no servidor' });
  }
});

// Rota para "/dados" (receber dados via POST)
app.post('/dados', (req, res) => {
  // Recebendo os dados enviados no corpo da requisição
  const pH = req.body.pH;
  const Temperatura = req.body.Temperatura;
  const Turbidez = req.body.Turbidez;

  console.log(`Dados recebidos: pH = ${pH}, Temperatura = ${Temperatura} C, Turbidez = ${Turbidez}`);


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
    try{
      const resposta = incluirDados(dados);
      console.log(`Resposta: ${resposta.status}
        Mensagem:${resposta.mensagem}
        `)

        res.status(200).send(`
        <p>Resposta ${resposta}</p>
      `);




    }catch(erro){
      console.log(`Resposta: ${resposta.status}
        Mensagem:${erro.menssage}
        `);


        res.status(200).send(`
      <p><strong>pH:</strong> ${pH}</p>
      <p><strong>Temperatura:</strong> ${Temperatura} C</p>
      <p><strong>Turbidez:</strong> ${Turbidez}</p>
    `);




    }
    // Respondendo com os dados recebidos em formato HTML
    

  } else {
    // Se faltar algum dado, respondemos com erro 400
    res.status(400).json({ error:  `Dados recebidos: pH = ${pH}, Temperatura = ${Temperatura} C, Turbidez = ${Turbidez}` });
  }
});

// Iniciando o servidor
/*
const port = process.env.PORT || 3000; // Usa a porta configurada no ambiente ou a 3000 por padrão
app.listen(port, () => {
  console.log(`API rodando localmente em http://localhost:${port}`);
});*/

export default app;
