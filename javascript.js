
  let imagemcaraio = 10;

  function imageHandler(e2) {
      let store = document.getElementById('pic-goes-here');
      store.innerHTML = '<img src="' + e2.target.result + '" style=" height: 134px" padding: 10 px>';
      let jsonstore = e2.target.result;
      imagemcaraio = jsonstore;
  }

  function loadimage(e1) {
      var filename = e1.target.files[0];
      var fr = new FileReader();
      fr.onload = imageHandler;
      fr.readAsDataURL(filename);
  }


  window.onload = function () {
    var y = document.getElementById("inputImage");
    y.addEventListener('change', loadimage, false);
  }

  $("#btnInsert").click(function () {
    // Verfica se o formulário está preenchido corretamente
    if (!$('#form-contato-musico')[0].checkValidity()) {
      displayMessage("Preencha o formulário corretamente.");
      return;
    }

    // Obtem os valores dos campos do formulário
    let campoNome = $("#inputNome").val();
    let campoEmail = $("#inputEmail").val();
    let campoIdade = $("#inputIdade").val();
    let campoEstado = $("#inputEstado").val();
    let campoCidade = $("#inputCidade").val();
    let campoInstrumentos = [];
    $.each($("input[name='instrumentos']:checked"), function(){
        campoInstrumentos.push($(this).val());
    });
    let campoEstilos = [];
    $.each($("input[name='estilos']:checked"), function(){
        campoEstilos.push($(this).val());
    });
    let campoDescicao = $("#inputDescricao").val();
    let campoImagem = document.getElementById("inputImage");
    usuario = {
      "nome": campoNome,
      "email": campoEmail,
      "idade": campoIdade,
      "cidade": campoCidade,
      "estado": campoEstado,
      "instrumentos": campoInstrumentos,
      "estilos": campoEstilos,
      "descricao": campoDescicao,
      "image_path": imagemcaraio
    };
    insertUsuario(usuario);
    location.href = 'lista.html';
  }); 
  
  // Função para alternar qual forms vai ser mostrado
  function cadastroMusico(){  
    let showForms = document.getElementById("form-contato-musico");
    if(showForms.style.display === "none"){
      showForms.style.display = "block";
    }
    else{
      showForms.style.display = "none";
    }
  }
  function cadastroBanda(){  
    let showForms = document.getElementById("form-contato-banda");
    if(showForms.style.display === "none"){
      showForms.style.display = "block";
    }
    else{
      showForms.style.display = "none";
    }
  }

