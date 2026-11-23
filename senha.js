let codigoGerado = '';

// ETAPA 1: Gera o código fictício e avança para a Etapa 2
document.getElementById('form-etapa-1').addEventListener('submit', function(event) {
  event.preventDefault();

  const email = document.getElementById('email').value.trim();

  // Gera um código aleatório de 6 dígitos
  codigoGerado = String(Math.floor(100000 + Math.random() * 900000));

  document.getElementById('email-exibido').textContent = email;
  document.getElementById('codigo-simulado').textContent = codigoGerado;

  document.getElementById('etapa-1').style.display = 'none';
  document.getElementById('etapa-2').style.display = 'block';
});

// ETAPA 2: Confere o código e avança para a Etapa 3
document.getElementById('form-etapa-2').addEventListener('submit', function(event) {
  event.preventDefault();

  const codigoDigitado = document.getElementById('codigo').value.trim();
  const msg2 = document.getElementById('msg-etapa-2');

  if (codigoDigitado === codigoGerado) {
    msg2.style.display = 'none';
    document.getElementById('etapa-2').style.display = 'none';
    document.getElementById('etapa-3').style.display = 'block';
  } else {
    msg2.textContent = 'Código incorreto. Digite exatamente os 6 dígitos exibidos acima.';
    msg2.className = 'mensagem-retorno erro';
  }
});

// ETAPA 3: Valida a nova senha e redireciona de volta ao site
document.getElementById('form-etapa-3').addEventListener('submit', function(event) {
  event.preventDefault();

  const senha = document.getElementById('nova-senha').value;
  const confirmar = document.getElementById('confirmar-senha').value;
  const msg3 = document.getElementById('msg-etapa-3');

  if (senha.length < 6) {
    msg3.textContent = 'A senha deve ter pelo menos 6 caracteres.';
    msg3.className = 'mensagem-retorno erro';
    return;
  }

  if (senha !== confirmar) {
    msg3.textContent = 'As senhas não coincidem.';
    msg3.className = 'mensagem-retorno erro';
    return;
  }

  msg3.textContent = 'Senha alterada com sucesso! Redirecionando para o site...';
  msg3.className = 'mensagem-retorno sucesso';

  setTimeout(function() {
    window.location.href = 'pagInicial.html';
  }, 2000);
});