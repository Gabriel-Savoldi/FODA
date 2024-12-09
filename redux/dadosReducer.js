import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { gravarDados } from "./servicoBackend.js";
import { ESTADO } from "./estados.js";

export const buscarProdutos = createAsyncThunk('buscarProdutos', async ()=>{
    //lista de produtos
    const resultado = await consultarProduto();
    //se for um array/lista a consulta funcionou
    try {
        if (Array.isArray(resultado)){
            return {
                "status":true,
                "mensagem":"Produtos recuperados com sucesso",
                "listaDeProdutos":resultado
            }
        }
        else
        {
            return {
                "status":false,
                "mensagem":"Erro ao recuperar os produtos do backend.",
                "listaDeProdutos":[]
            }
        }
    }
    catch(erro){
        return {
            "status":false,
            "mensagem":"Erro: " + erro.message,
            "listaDeProdutos":[]
        }
    }
});

export const incluirDados = createAsyncThunk('incluirDados', async (dados)=>{
//dar previsibilidade ao conteúdo do payload
    
    const resultado = await gravarDados(dados);
    try {
            return {
                "status":resultado.status,
                "mensagem":resultado.mensagem,
            }
    }
    catch(erro){
        return {
            "status":false,
            "mensagem":"Erro: " + erro.message,
        }
    } 
});

const dadosReducer = createSlice({
    name:'dados',
    initialState:{
        estado: ESTADO.OCIOSO,
        mensagem:"",
        listaDeDados:[]
    },
    reducers:{},
    extraReducers:(builder)=> {
        builder.addCase(incluirDados.pending, (state, action) =>{
            state.estado=ESTADO.PENDENTE
            state.mensagem="Processando requisição (incluindo dados)"
        })
        .addCase(incluirDados.fulfilled, (state, action) =>{
          if (action.payload.status){
            state.estado=ESTADO.OCIOSO;
            state.mensagem=action.payload.mensagem;
          } 
          else{
            state.estado=ESTADO.ERRO;
            state.mensagem = action.payload.mensagem;
          } 
        })
        .addCase(incluirDados.rejected, (state, action) =>{
            state.estado=ESTADO.ERRO;
            state.mensagem = action.payload.mensagem;
            state.listaDeDados=action.payload.listaDeDados;
        })
    }
});

export default dadosReducer.reducer;