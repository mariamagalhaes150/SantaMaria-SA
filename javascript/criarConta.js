document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.form-cadastro');
    const inputNascimento = document.getElementById('nascimento');
    const inputCpf = document.getElementById('cpf');
    const inputSenha = document.getElementById('senha');
    const inputConfirmarSenha = document.getElementById('confirmar-senha');
    const botoesToggleSenha = document.querySelectorAll('.btn-toggle-senha');
    const btnCancelar = document.querySelector('.btn-cancelar');

    // Mostra e oculta a senha
    botoesToggleSenha.forEach((botao) => {
        botao.addEventListener('click', () => {
            const input = botao.previousElementSibling;
            const icone = botao.querySelector('.material-symbols-outlined');

            if (input.type === 'password') {
                input.type = 'text';
                icone.textContent = 'visibility_off';
            } else {
                input.type = 'password';
                icone.textContent = 'visibility';
            }
        });
    });

    // Máscara de data de nascimento (DD/MM/AAAA)
    if (inputNascimento) {
        inputNascimento.addEventListener('input', (e) => {
            let valor = e.target.value.replace(/\D/g, '').slice(0, 8);

            if (valor.length > 2) {
                valor = valor.replace(/^(\d{2})(\d)/, '$1/$2');
            }
            if (valor.length > 5) {
                valor = valor.replace(/^(\d{2})\/(\d{2})(\d)/, '$1/$2/$3');
            }

            e.target.value = valor;
        });
    }

    // Máscara de CPF (000.000.000-00)
    if (inputCpf) {
        inputCpf.addEventListener('input', (e) => {
            let valor = e.target.value.replace(/\D/g, '').slice(0, 11);

            valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
            valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
            valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

            e.target.value = valor;
        });
    }

    // Validação ao enviar o cadastro
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            if (inputNascimento.value.length < 10) {
                alert('Por favor, preencha a data de nascimento completa (DD/MM/AAAA).');
                inputNascimento.focus();
                return;
            }

            if (inputCpf.value.length < 14) {
                alert('Por favor, preencha o CPF completo (000.000.000-00).');
                inputCpf.focus();
                return;
            }

            if (inputSenha.value.length < 6) {
                alert('A senha deve ter pelo menos 6 caracteres.');
                inputSenha.focus();
                return;
            }

            if (inputSenha.value !== inputConfirmarSenha.value) {
                alert('As senhas não se correspondem. Digite novamente.');
                inputConfirmarSenha.focus();
                return;
            }

            alert('Conta criada com sucesso!');
            window.location.href = './login.html';
        });
    }

    // Botão cancelar
    if (btnCancelar) {
        btnCancelar.addEventListener('click', () => {
            window.location.href = '../pagInicial.html';
        });
    }
});