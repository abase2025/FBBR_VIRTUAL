// Script para validação do formulário de contato
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obter valores dos campos
            const nome = document.getElementById('nome').value.trim();
            const email = document.getElementById('email').value.trim();
            const assunto = document.getElementById('assunto').value.trim();
            const mensagem = document.getElementById('mensagem').value.trim();
            
            // Validar campos
            let isValid = true;
            let errorMessages = [];
            
            // Validar nome
            if (nome === '') {
                isValid = false;
                errorMessages.push('Por favor, informe seu nome.');
                document.getElementById('nome').classList.add('error');
            } else {
                document.getElementById('nome').classList.remove('error');
            }
            
            // Validar email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email === '' || !emailRegex.test(email)) {
                isValid = false;
                errorMessages.push('Por favor, informe um email válido.');
                document.getElementById('email').classList.add('error');
            } else {
                document.getElementById('email').classList.remove('error');
            }
            
            // Validar assunto
            if (assunto === '') {
                isValid = false;
                errorMessages.push('Por favor, informe o assunto.');
                document.getElementById('assunto').classList.add('error');
            } else {
                document.getElementById('assunto').classList.remove('error');
            }
            
            // Validar mensagem
            if (mensagem === '') {
                isValid = false;
                errorMessages.push('Por favor, escreva sua mensagem.');
                document.getElementById('mensagem').classList.add('error');
            } else {
                document.getElementById('mensagem').classList.remove('error');
            }
            
            // Se houver erros, exibir mensagens
            if (!isValid) {
                const errorContainer = document.getElementById('formErrors');
                if (errorContainer) {
                    errorContainer.innerHTML = errorMessages.map(msg => `<p>${msg}</p>`).join('');
                    errorContainer.style.display = 'block';
                }
                return;
            }
            
            // Se tudo estiver válido, enviar o formulário
            const formData = new FormData();
            formData.append('nome', nome);
            formData.append('email', email);
            formData.append('assunto', assunto);
            formData.append('mensagem', mensagem);
            formData.append('destinatario', 'rlambaia2023@gmail.com');
            
            // Mostrar indicador de carregamento
            const submitBtn = document.querySelector('.btn-submit');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;
            
            // Enviar para o serviço de email
            fetch('https://formsubmit.co/ajax/rlambaia2023@gmail.com', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: nome,
                    email: email,
                    _subject: assunto,
                    message: mensagem
                })
            })
            .then(response => response.json())
            .then(data => {
                // Limpar formulário
                contactForm.reset();
                
                // Mostrar mensagem de sucesso
                const successContainer = document.getElementById('formSuccess');
                if (successContainer) {
                    successContainer.style.display = 'block';
                    setTimeout(() => {
                        successContainer.style.display = 'none';
                    }, 5000);
                }
                
                // Restaurar botão
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            })
            .catch(error => {
                console.error('Erro ao enviar formulário:', error);
                
                // Mostrar mensagem de erro
                const errorContainer = document.getElementById('formErrors');
                if (errorContainer) {
                    errorContainer.innerHTML = '<p>Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente mais tarde.</p>';
                    errorContainer.style.display = 'block';
                }
                
                // Restaurar botão
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            });
        });
    }
});
