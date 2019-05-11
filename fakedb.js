var db = {
    "data": [
        {
            "id": 1,
            "nome": "Lucas Ferreira",
            "idade": 29,
            "email": "ferreira.alves@live.com",
            "path_imagem": "img/img_avatar2.png",
            "instrumentos": [
              {
                "instrumento": "guitarra",
                "exp": "intermediario"
              },
              {
                "instrumento": "vocal",
                "exp": "intermediario"
              }
            ],
            "estilos": [
              "rock",
              "progressivo",
              "metal"
            ],
        }
    ]
}

function primeiraUpperCase(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function parseInstrumentos(instrumentos){
  string = primeiraUpperCase(instrumentos[0].instrumento);
  for (i = 1; i < instrumentos.length; i++){
    instrumento = instrumentos[i].instrumento;
    string+= `, ${instrumento}`;
    //string+= instrumento
  }
  return string;
}

function parseEstilos(estilos){
  string = primeiraUpperCase(estilos[0]);
  for (i = 1; i < estilos.length; i++){
    estilo = estilos[i];
    string+= `, ${estilo}`;
    //string+= instrumento
  }
  return string;
}


function exibeContatos() {
    // Remove todas as linhas do corpo da tabela
    $("#grid-main-user").html("");

    // Popula a tabela com os registros do banco de dados
    for (i = 0; i < db.data.length; i++) {
        console.log(db.data);
        let contato = db.data[i];
        //parsiona instrumentos
        $("#grid-main-user").append(`
          <li class="w3-bar">
            <img src="${contato.path_imagem}" class="w3-bar-item w3-circle w3-hide-small" style="width:150px; height: 134px">
            <div class="w3-bar-item">
              <span class="w3-large"><b>${contato.nome}, ${contato.idade}</b></span><br>
              <span>${parseInstrumentos(contato.instrumentos)}</span><br>
              <span>${parseEstilos(contato.estilos)}</span><br>
              <span>Belo Horizonte, MG</span><br>
            </div>
          </li>
        `);
    }
}
