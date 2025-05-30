// Script para adicionar botão de retorno à página inicial em todos os PDFs

// Função para injetar o botão de retorno em visualizadores de PDF
function injetarBotaoRetorno() {
    // Criar elemento de estilo para o botão
    const style = document.createElement('style');
    style.textContent = `
        .pdf-return-button {
            position: fixed;
            top: 20px;
            left: 20px;
            z-index: 9999;
            background: linear-gradient(45deg, #4e54c8, #43cea2);
            color: white;
            padding: 12px 25px;
            border-radius: 50px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            cursor: pointer;
            transition: all 0.3s ease;
            font-family: 'Arial', sans-serif;
            font-weight: bold;
            font-size: 14px;
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .pdf-return-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
        }
        
        .pdf-return-button i {
            font-size: 16px;
        }
    `;
    document.head.appendChild(style);
    
    // Criar o botão de retorno
    const botaoRetorno = document.createElement('a');
    botaoRetorno.className = 'pdf-return-button';
    botaoRetorno.href = '/index.html';
    botaoRetorno.innerHTML = '<i class="fas fa-home"></i> Voltar ao Início';
    
    // Adicionar ao corpo do documento
    document.body.appendChild(botaoRetorno);
}

// Executar quando o documento estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injetarBotaoRetorno);
} else {
    injetarBotaoRetorno();
}

// Também tentar injetar após um pequeno atraso para garantir que funcione em diferentes visualizadores de PDF
setTimeout(injetarBotaoRetorno, 1000);
