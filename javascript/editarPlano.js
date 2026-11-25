/* AVISO: A responsável pela página (Gabriela) não sabe bulhufas do que está acontecendo aqui. Se funciona, não mexe.... */

document.addEventListener("DOMContentLoaded", () => {
    // Seleção dos elementos do DOM (gabi nao se responsabiliza por isso)
    const form = document.querySelector(".cardPerfil form");
    const galleryInput = document.getElementById("galleryInput");
    const profileImage = document.getElementById("profileImage");
    const nomeTitulo = document.querySelector(".nameBox h2");
  
    const inputNome = document.getElementById("nome");
    const inputEmail = document.getElementById("email");
    const inputTelefone = document.getElementById("telefone");
    const inputAno = document.getElementById("anoNascimento");
  
    const btnCancelar = document.querySelector(".btnCancelar");
  
    // guarda as coisas caso o usuario cancelar
    let dadosIniciais = {
      nome: inputNome.value,
      email: inputEmail.value,
      telefone: inputTelefone.value,
      ano: inputAno.value,
      foto: profileImage.src
    };
  
    // 1. troca foto d perfil
    galleryInput.addEventListener("change", (event) => {
      const file = event.target.files[0];
  
      if (file) {
        // if imagem eh imagem, ta indo
        if (!file.type.startsWith("image/")) {
          alert("Por favor, selecione um arquivo de imagem válido.");
          return;
        }
  
        const reader = new FileReader();
        reader.onload = (e) => {
          profileImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  
    // verificacao telefone
    inputTelefone.addEventListener("input", (event) => {
      let valor = event.target.value.replace(/\D/g, ""); // Remove tudo que não é número
      
      if (valor.length > 11) valor = valor.slice(0, 11); // Limita a 11 dígitos
  
      if (valor.length > 2) {
        valor = `(${valor.slice(0, 2)}) ${valor.slice(2)}`;
      }
      if (valor.length > 10) {
        valor = `${valor.slice(0, 10)}-${valor.slice(10)}`;
      } else if (valor.length > 9) {
        // Caso seja telefone fixo de 8 dígitos
        valor = `${valor.slice(0, 9)}-${valor.slice(9)}`;
      }
  
      event.target.value = valor;
    });
  
    // slvar formulario
    form.addEventListener("submit", (event) => {
      event.preventDefault(); // pagina nao recarregar algo assim
  
      // validar ano de nascimento
      const anoAtual = new Date().getFullYear();
      const anoDigitado = parseInt(inputAno.value, 10);
  
      if (anoDigitado < 1900 || anoDigitado > anoAtual) {
        alert(`Por favor, insira um ano de nascimento válido (entre 1900 e ${anoAtual}).`);
        inputAno.focus();
        return;
      }
  
      // mudar nome-
      nomeTitulo.textContent = inputNome.value.trim();
  
      // novos dados !!!
      dadosIniciais = {
        nome: inputNome.value.trim(),
        email: inputEmail.value.trim(),
        telefone: inputTelefone.value.trim(),
        ano: inputAno.value,
        foto: profileImage.src
      };
  
      // feedback irado pro usuario
      alert("Alterações salvas com sucesso!");
    });
  
    //  cancelar
    btnCancelar.addEventListener("click", () => {
      const confirmar = confirm("Deseja descartar as alterações feitas?");
      
      if (confirmar) {
        inputNome.value = dadosIniciais.nome;
        inputEmail.value = dadosIniciais.email;
        inputTelefone.value = dadosIniciais.telefone;
        inputAno.value = dadosIniciais.ano;
        profileImage.src = dadosIniciais.foto;
        galleryInput.value = ""; // Limpa o input de arquivo
      }
    });
  });