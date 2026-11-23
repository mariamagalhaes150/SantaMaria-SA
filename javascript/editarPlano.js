// Seleciona os elementos do DOM
const galleryInput = document.getElementById('galleryInput');
const profileImage = document.getElementById('profileImage');

// Escuta o evento de mudança quando o usuário escolhe um arquivo
galleryInput.addEventListener('change', function(event) {
    const file = event.target.files[0]; // Pega o arquivo selecionado
    
    if (file) {
        // Cria uma URL temporária para o arquivo local e atualiza o src da imagem
        const reader = new FileReader();
        
        reader.onload = function(e) {
            profileImage.src = e.target.result;
        };
        
        reader.readAsDataURL(file);
    }
});