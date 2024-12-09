const urlBase = 'https://api-gamma-sandy.vercel.app/dados';


export  async function gravarDados(dados){
    const resposta = await fetch(urlBase,{
        'method':"POST",
        'headers': { 
            'Content-Type':"application/json"
        },
        'body': JSON.stringify(dados)
    });
    const resultado = await resposta.json();
    return resultado;
}

export async function consultarDados() {
    const resposta = await fetch(urlBase,{
        'method':"GET"
    });
    const resultado = await resposta.json();
    return resultado;
}