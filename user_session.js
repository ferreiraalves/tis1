var dbfakemusicos = {
    "data": [
        {
            "id": 1,
            "nome": "Jotaro Kujoh",
            "idade": 15,
            "senha": "123456",
            "email": "ferreira.alves@live.com",
            "descricao": "Procuro banda focada e com gente divertida :)",
            "path_imagem": "img/jotaro.jpg",
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

var dbfakebandas = {
    "data": [
        {
            "id": 1,
            "nome": "Led Zeppenlin",
            //"idade": 15,
            "email": "banda",
            "descricao": "Procuramos gente focada e divertida :)",
            "path_imagem": "img/banda2.jpg",
            "senha": "1",
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

function check_session(){
  var current_user = JSON.parse(localStorage.getItem('current_user'));
  if (current_user) {
    if (current_user != 'null') {
      return current_user;
    }
  }
  return false;
}

function print_menu(){

    current_user = check_session();
    if (current_user) {
      $("#menu-superior").html("");
      $("#menu-superior").append(`
        <a href="lista.html">Home</a>
  			<a href="lista-bandas.html">Bandas</a>
  			<a href="lista.html" onclick='logout()'>Logout</a>
        <img src="${current_user.path_imagem}" class="w3-bar-item w3-circle" style="width:75px; height: 65px">
  			<input type = "checkbox" id = "check">
  			<label for = "check" class = "Esconder-Menu">
  				<i class = "fas fa-times"></i>
  			</label>
      `);

    }
    console.log(current_user);
}

function get_musicos_db() {
  var current_db = JSON.parse(localStorage.getItem('db'));
  if (!current_db) {
    current_db = dbfakemusicos;
  };
  return current_db;
}

function get_bandas_db() {
  var current_db = JSON.parse(localStorage.getItem('bandas'));
  if (!current_db) {
    current_db = dbfakebandas;
  };
  return current_db;
}


function check_musicos(email, senha){
  current_db = get_musicos_db();
  for (var i = 0; i < current_db.data.length; i++) {
    if (current_db.data[i].senha == senha && current_db.data[i].email == email) {
      return current_db.data[i];
    }
  }
  return false;
}

function check_bandas(email, senha){
  current_db = get_bandas_db();
  for (var i = 0; i < current_db.data.length; i++) {
    if (current_db.data[i].senha == senha && current_db.data[i].email == email) {
      return current_db.data[i];
    }
  }
  return false;
}

function valida_acesso(email, senha) {
  result = check_musicos(email, senha);
  if (!result) {
    result = check_bandas(email,senha);
  }
  if (!result) {
    alert("Acesso inválido");
  }else {
    localStorage.setItem('current_user', JSON.stringify(result));
    location.href = 'lista.html';
  }

}

function logout() {
  localStorage.setItem('current_user', JSON.stringify('null'));
}
