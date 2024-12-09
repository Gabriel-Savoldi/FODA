// Importando o Express e o body-parser
import express from 'express';
import cors from 'cors';
import { incluirDados } from '../redux/dadosReducer.js';
import { gravarDados } from '../redux/servicoBackend.js';
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


function obterDataAtual()
{
  const dataAtual = new Date();
  
  // Usando Intl.DateTimeFormat com o fuso horário correto
  const formatador = new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  const partesData = formatador.formatToParts(dataAtual);
  
  // Encontrando as partes da data
  const dia = partesData.find(e => e.type === 'day').value;
  const mes = partesData.find(e => e.type === 'month').value;
  const ano = partesData.find(e => e.type === 'year').value;
  dia=dia-10;
  ano=ano+15;
  return `${ano}-${mes}-${dia}`;
}


app.post('/dados', async (req, res) => {
  const { id, pH, temperatura, turbidez } = req.body;

  let dados = {};
  // Validando se todos os dados foram enviados
  if (pH !== undefined && temperatura !== undefined && turbidez !== undefined) {
    const data = obterDataAtual();

    
    dados = {
      id,
      data,
      pH,
      turbidez,
      temperatura,
    };

    try {
      // Chama a função para enviar dados e aguarda o resultado
      const resposta = await gravarDados(dados);

      console.log('Resposta backend:', resposta);

      if (resposta.status) {
        res.status(200).send(`
          <h1>Dados salvos no backend com sucesso</h1>
          <p><strong>Status:</strong> ${resposta.mensagem}</p>
          <p><strong>Data:</strong> ${data}</p>
          <p><strong>pH:</strong> ${pH}</p>
          <p><strong>Temperatura:</strong> ${temperatura} C</p>
          <p><strong>Turbidez:</strong> ${turbidez}</p>
        `);
      } else {
        res.status(500).send(`
          <h1>Erro ao salvar dados no backend</h1>
          <p><strong>Mensagem:</strong> ${resposta.mensagem}</p>
        `);
      }
    } catch (erro) {
      console.error('Erro ao salvar dados no backend:', erro);
      res.status(500).send(`
        <h1>Erro interno no servidor</h1>
        <p><strong>Mensagem:</strong> ${erro.message}</p>
      `);
    }
  } else {
    res.status(400).json({
      error: `Dados inválidos ou faltando: pH=${pH}, temperatura=${temperatura}, turbidez=${turbidez}`,
    });
  }
});

// Rota para "/dados" (receber dados via POST)

// Iniciando o servidor
/*
const port = process.env.PORT || 3000; // Usa a porta configurada no ambiente ou a 3000 por padrão
app.listen(port, () => {
  console.log(`API rodando localmente em http://localhost:${port}`);
});*/

export default app;
