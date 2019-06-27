var dbfake = {
    "data": [
        {
            "id": 1,
            "nome": "Led Zeppenlin",
            //"idade": 15,
            "email": "ferreira.alves@live.com",
            "descricao": "Procuramos gente focada e divertida :)",
            "path_imagem": "img/banda2.jpg",
            "senha": "123456",
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
            "cidade": "Belo Horizonte",
            "estado": "MG",
            "mensagens": []
        }
    ]
}

// Caso exista no Local Storage, recupera os dados salvos
function get_db(){
  var current_db = JSON.parse(localStorage.getItem('bandas'));
  if (!current_db) {
    current_db = dbfake;
  };
  return current_db;
}


function primeiraUpperCase(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function parseInstrumentos(instrumentos){
  var i;
  string = primeiraUpperCase(instrumentos[0].instrumento);
  for (i = 1; i < instrumentos.length; i++){
    instrumento = instrumentos[i].instrumento;
    string+= `, ${instrumento}`;
    //string+= instrumento
  }
  return string;
}

function parseEstilos(estilos){
  var i;
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
    current_db = get_db();
    $("#grid-main-user").html("");
    // Popula a tabela com os registros do banco de dados
    var i;
    for (i = 0; i < current_db.data.length; i++) {

        contato = current_db.data[i];
        //instrumentos = parseInstrumentos(contato.instrumentos);
        estilos = parseEstilos(contato.estilos)
        instrumentos = parseInstrumentos(contato.instrumentos)
        //parsiona instrumentos
        $("#grid-main-user").append(`
          <li class="w3-bar" onclick="goToProfile(${contato.id})">
            <img src="${contato.path_imagem}" class="w3-bar-item w3-circle" style="width:150px; height: 134px">
            <div class="w3-bar-item">
              <span class="w3-large"><b>${contato.nome}</b></span><br>
              <span>Procura: ${instrumentos} </span><br>
              <span>Estilos: ${estilos} </span><br>
              <span>${contato.cidade}, ${contato.estado}</span><br>
            </div>
          </li>
        `);
    }
}

function open_modal(){
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
}


function goToProfile(id){
  location.href = `user-banda.html?id=${id}`;
}



function build_profile_page(){
  urlParams = new URLSearchParams(window.location.search);
  id = urlParams.get('id');
  current_db = get_db();
  user = current_db.data[id-1];
  estilos = parseEstilos(user.estilos)
  instrumentos = parseInstrumentos(user.instrumentos)

  $("#profile-box").html("");
  $("#profile-box").append(`
    <div class="span2" >
      <img src="${user.path_imagem}" class="w3-bar-item w3-circle" style="width:250px; height: 250px; display: block; margin-left: auto; margin-right: auto;"  >
    </div>

    <div class="span8">
      <h3>${user.nome}</h3>
      <h4>${user.cidade}, ${user.estado}</h4>
      <h6>Email: ${user.email}</h6>
      <h6>Descrição : ${user.descricao}</h6>
      <h6>Procura: ${instrumentos}</h6>
      <h6>Estilos : ${estilos}</h6>
      <button onclick='open_modal_mensagens(${user.id})'>Mensagens</button>
    </div>
  `);

}

function parseInstrumentosInput(instrumentos) {
  parsed = [];
  var i;
  for (i = 0; i < instrumentos.length; i++){
    aux = {
      "instrumento": instrumentos[i],
      "exp": "intermediario"
    }
    parsed.push(aux)
  }
  return parsed;
}

function insertUsuario(user) {
    // Calcula novo Id a partir do último código existente no array
    current_db = get_db();
    let novoId = current_db.data[current_db.data.length - 1].id + 1;
    let novoUser = {
      "id": novoId,
      "nome": user.nome,
      "descricao": user.descricao,
      "email": user.email,
      //"idade": user.idade,
      "path_imagem": "img/img_avatar5.png",
      "instrumentos": parseInstrumentosInput(user.instrumentos),
      "estilos": user.estilos,
      "path_imagem": user.image_path,
      "cidade": user.cidade,
      "estado": user.estado,
      "senha": user.senha
    };

    // Insere o novo objeto no array
    current_db.data.push(novoUser);

    // Atualiza os dados no Local Storage
    localStorage.setItem('bandas', JSON.stringify(current_db));
}

var span = document.getElementsByClassName("close")[0];

span.onclick = function() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
}

function filtrarInstrumentos(filtro, usuarios){
  result = [];
  for (var i = 0; i < usuarios.length; i++) {
    for (var j = 0; j < usuarios[i].instrumentos.length; j++) {
      if (usuarios[i].instrumentos[j].instrumento == filtro) {
        result.push(usuarios[i]);
      }
    }
  }
  return result;
}

function filtrarEstilos(filtro, usuarios){
  result = [];
  for (var i = 0; i < usuarios.length; i++) {
    for (var j = 0; j < usuarios[i].estilos.length; j++) {
      if (usuarios[i].estilos[j] == filtro) {
        result.push(usuarios[i]);
      }
    }
  }
  return result;
}

function filtrarEstados(filtro, usuarios){
  result = [];
  for (var i = 0; i < usuarios.length; i++) {
    if (usuarios[i].estado == filtro) {
      result.push(usuarios[i]);
    }
  }
  return result;
}

function filtrarResultados(){
  var filtroInstrumento = $("#filtroInstrumento").val();
  var filtroEstilo = $("#filtroEstilo").val();
  var filtroEstado = $("#filtroEstado").val();

  // Remove todas as linhas do corpo da tabela
  current_db = get_db();
  //console.log(current_db);
  usuarios = current_db.data
  //console.log(usuarios);
  if (filtroInstrumento != 'null') {
    usuarios = filtrarInstrumentos(filtroInstrumento, usuarios);
  }
  if (filtroEstilo != 'null') {
    usuarios = filtrarEstilos(filtroEstilo, usuarios);
  }
  if (filtroEstado != 'null') {
    usuarios = filtrarEstados(filtroEstado, usuarios);
  }
  console.log(usuarios);

  $("#grid-main-user").html("");
  // Popula a tabela com os registros do banco de dados
  var i;
  for (i = 0; i < usuarios.length; i++) {

      contato = usuarios[i];
      //instrumentos = parseInstrumentos(contato.instrumentos);
      estilos = parseEstilos(contato.estilos)
      instrumentos = parseInstrumentos(contato.instrumentos)
      //parsiona instrumentos
      $("#grid-main-user").append(`
        <li class="w3-bar" onclick="goToProfile(${contato.id})">
          <img src="${contato.path_imagem}" class="w3-bar-item w3-circle" style="width:150px; height: 134px">
          <div class="w3-bar-item">
            <span class="w3-large"><b>${contato.nome}, ${contato.idade}</b></span><br>
            <span>Instumentos: ${instrumentos} </span><br>
            <span>Estilos: ${estilos} </span><br>
            <span>${contato.cidade}, ${contato.estado}</span><br>
          </div>
        </li>
      `);
  }
  var modal = document.getElementById("myModal");
  modal.style.display = "none";

}


function open_modal_mensagens(id){


    current_db = get_db();
    usuarios  = current_db.data
    usuario = usuarios[id-1]
    if (usuario.mensagens.length > 0) {
      $("#mensagens").html("");
      $("#mensagens").append(`
        <span class="close">&times;</span>
      `);
      for (var i = 0; i < usuario.mensagens.length; i++) {
        mensagem = usuario.mensagens[i];
        $("#mensagens").append(`
          <li class="w3-bar no-fuzz">
          <img src="${mensagem.imagem}" class="w3-bar-item w3-circle" style="width:75px; height: 60px">
          <div class="w3-bar-item">
            <span class="w3-large"><b>${mensagem.autor}</b></span><br>
            <span>${mensagem.texto} </span><br>
          </div>
          </li>
        `);
        if (i< usuario.mensagens.length-1) {
          $("#mensagens").append(`<hr>`)
        }
      }

    }else{
      $("#mensagens").html("");
      $("#mensagens").append(`
        <span class="close">&times;</span>
        <p>Nenhum comentário encontrado</p>
      `);
    }
    current_user = check_session();
    if (current_user) {
      $("#mensagens").append(`
        <br>
        <textarea id="inputMensagem" name="Descrição" placeholder="Mande uma mensagem para ${usuario.nome}..." style="width: 95%"></textarea>
        <input type="button" class="btn btn-success" id="btnComment" onclick='nova_mensagem(${id},"${current_user.nome}", "${current_user.path_imagem}")' value="+" style="float: right">
      `);
    }
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
    var span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
        var modal = document.getElementById("myModal");
        modal.style.display = "none";
    }
}


function nova_mensagem(id, nome, imagem){
  let campoMensagem = $("#inputMensagem").val();
  current_db = get_db();
  n_message = {
    'autor': nome,
    'texto': campoMensagem,
    'imagem': imagem
  }
  current_db.data[id-1].mensagens.push(n_message)
  localStorage.setItem('bandas', JSON.stringify(current_db));
  location.href = `user-banda.html?id=${id}`;
  open_modal_mensagens(id);

}
