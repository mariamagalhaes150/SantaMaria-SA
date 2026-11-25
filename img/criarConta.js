document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.form-cadastro');
    const inputNascimento = document.getElementById('nascimento');
    const inputCpf = document.getElementById('cpf');
    const inputSenha = document.getElementById('senha');
    const inputConfirmarSenha = document.getElementById('confirmar-senha');
    const botoesToggleSenha = document.querySelectorAll('.btn-toggle-senha');

    //Mostra e oculta a senha
    botoesToggleSenha.forEach((botao) => {
        botao.addEventListener('click', () => {
            // Pega o input que está logo antes do botão dentro da div .input-wrapper
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

    //Mascará de data de nascimento (DD/MM/AAAA)
    inputNascimento.addEventListener('input', (e) => {
        let valor = e.target.value.replace(/\D/g, ''); // Remove tudo que não for número

        if (valor.length > 2) {
            valor = valor.replace(/^(\d{2})(\d)/, '$1/$2');
        }
        if (valor.length > 5) {
            valor = valor.replace(/^(\d{2})\/(\d{2})(\d)/, '$1/$2/$3');
        }

        e.target.value = valor;
    });

    // Marcará o CPF (000.000.000-00)
    inputCpf.addEventListener('input', (e) => {
        let valor = e.target.value.replace(/\D/g, ''); // Remove tudo que não for número

        valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
        valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
        valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

        e.target.value = valor;
    });

    // Validação ao enviar o cadastro
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Impede o recarregamento padrão da página

        // Valida tamanho da data
        if (inputNascimento.value.length < 10) {
            alert('Por favor, preencha a data de nascimento completa (DD/MM/AAAA).');
            inputNascimento.focus();
            return;
        }

        // Valida tamanho do CPF
        if (inputCpf.value.length < 14) {
            alert('Por favor, preencha o CPF completo (000.000.000-00).');
            inputCpf.focus();
            return;
        }

        // Valida tamanho mínimo da senha
        if (inputSenha.value.length < 6) {
            alert('A senha deve ter pelo menos 6 caracteres.');
            inputSenha.focus();
            return;
        }

        // Confere se as senhas batem
        if (inputSenha.value !== inputConfirmarSenha.value) {
            alert('As senhas não se correspondem. Digite novamente.');
            inputConfirmarSenha.focus();
            return;
        }

        // Se estiver tudo certo:
        alert('Conta criada com sucesso!');
        
        // Redireciona para a tela de login 
        //GABI AJUSTAR

        window.location.href = '../';
    });
});

const btnCancelar = document.querySelector('.btn-cancelar');

btnCancelar.addEventListener('click', () => {
    window.location.href = '../pagInicial.html';
});