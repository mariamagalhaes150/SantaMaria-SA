document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicializa os ícones da biblioteca Lucide
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Seleção dos elementos do HTML
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const senhaInput = document.getElementById('senha');
    const toggleSenhaBtn = document.getElementById('toggleSenha');
    const feedbackMessage = document.getElementById('feedbackMessage');
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');

    // Função para exibir mensagens de erro ou sucesso no card
    function mostrarMensagem(texto, tipo) {
        feedbackMessage.textContent = texto;
        feedbackMessage.className = `feedback-message ${tipo}`;
    }

    // Função para limpar a mensagem quando o usuário voltar a digitar
    function limparMensagem() {
        feedbackMessage.textContent = '';
        feedbackMessage.className = 'feedback-message';
    }

    emailInput.addEventListener('input', limparMensagem);
    senhaInput.addEventListener('input', limparMensagem);

    // 2. Botão de mostrar / ocultar senha (ícone de olho)
    if (toggleSenhaBtn) {
        toggleSenhaBtn.addEventListener('click', () => {
            const estaOculta = senhaInput.type === 'password';
            senhaInput.type = estaOculta ? 'text' : 'password';

            // Troca o ícone entre 'eye' e 'eye-off'
            toggleSenhaBtn.innerHTML = estaOculta
                ? '<i data-lucide="eye-off"></i>'
                : '<i data-lucide="eye"></i>';

            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        });
    }

    // 3. Ação do link "Esqueci a senha"
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', (e) => {
            // Se você já criou a página recuperarSenha.html, redireciona para ela
            // Caso queira apenas simular na mesma tela, comente a linha abaixo e descomente o bloco seguinte
            window.location.href = 'recuperarSenha.html';

        });
    }

    // 4. Validação e envio do formulário de Login (Front-end sem back-end)
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = emailInput.value.trim();
            const senha = senhaInput.value.trim();

            // Validação de campo vazio e formato de e-mail
            if (!email) {
                mostrarMensagem('Por favor, informe seu e-mail.', 'error');
                emailInput.focus();
                return;
            }

            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regexEmail.test(email)) {
                mostrarMensagem('Digite um endereço de e-mail válido (ex: nome@email.com).', 'error');
                emailInput.focus();
                return;
            }

            // Validação da senha
            if (!senha) {
                mostrarMensagem('Por favor, digite sua senha.', 'error');
                senhaInput.focus();
                return;
            }

            if (senha.length < 6) {
                mostrarMensagem('A senha deve conter no mínimo 6 caracteres.', 'error');
                senhaInput.focus();
                return;
            }

            // Verifica se existe uma lista de contas cadastradas no navegador (localStorage)
            const contasSalvas = JSON.parse(localStorage.getItem('contasSantaMaria')) || [];
            const contaEncontrada = contasSalvas.find(c => c.email.toLowerCase() === email.toLowerCase());

            if (contasSalvas.length > 0 && contaEncontrada && contaEncontrada.senha !== senha) {
                mostrarMensagem('E-mail ou senha incorretos. Tente novamente.', 'error');
                senhaInput.focus();
                return;
            }

            // Salva a sessão do usuário logado no navegador
            const dadosSessao = {
                nome: contaEncontrada ? contaEncontrada.nome : email.split('@')[0],
                email: email,
                logado: true,
                dataLogin: new Date().toLocaleString('pt-BR')
            };
            localStorage.setItem('usuarioLogadoSantaMaria', JSON.stringify(dadosSessao));

            // Desabilita o botão para evitar cliques duplos e exibe sucesso
            const btnEntrar = loginForm.querySelector('button[type="submit"]');
            if (btnEntrar) {
                btnEntrar.disabled = true;
                btnEntrar.textContent = 'Entrando...';
            }

            mostrarMensagem('Login realizado com sucesso! Redirecionando...', 'success');

            // Redireciona para a página inicial após 1,3 segundos
            setTimeout(() => {
                window.location.href = '../pagInicial.html';
            }, 1300);
        });
    }
});