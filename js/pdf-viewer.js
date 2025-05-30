// Script para adicionar botão de retorno à página inicial em todos os PDFs

document.addEventListener('DOMContentLoaded', function() {
    // Função para adicionar botão de retorno quando um PDF é aberto
    function adicionarBotaoRetorno() {
        // Verificar se estamos em uma página que exibe PDF
        if (window.location.href.includes('.pdf')) {
            // Criar o botão de retorno
            const botaoRetorno = document.createElement('div');
            botaoRetorno.className = 'pdf-return-button';
            botaoRetorno.innerHTML = '<a href="/index.html"><i class="fas fa-home"></i> Voltar ao Início</a>';
            
            // Estilizar o botão
            botaoRetorno.style.position = 'fixed';
            botaoRetorno.style.top = '20px';
            botaoRetorno.style.left = '20px';
            botaoRetorno.style.zIndex = '9999';
            botaoRetorno.style.backgroundColor = '#4e54c8';
            botaoRetorno.style.color = 'white';
            botaoRetorno.style.padding = '10px 20px';
            botaoRetorno.style.borderRadius = '50px';
            botaoRetorno.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
            botaoRetorno.style.cursor = 'pointer';
            botaoRetorno.style.transition = 'all 0.3s ease';
            
            // Adicionar efeito hover
            botaoRetorno.addEventListener('mouseover', function() {
                this.style.transform = 'translateY(-3px)';
                this.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.3)';
            });
            
            botaoRetorno.addEventListener('mouseout', function() {
                this.style.transform = '';
                this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
            });
            
            // Adicionar ao corpo do documento
            document.body.appendChild(botaoRetorno);
        }
    }
    
    // Executar a função quando a página carregar
    adicionarBotaoRetorno();
    
    // Também executar quando o URL mudar (para SPAs ou navegação dinâmica)
    window.addEventListener('popstate', adicionarBotaoRetorno);
});
