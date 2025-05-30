// Script para funcionalidades do site Odonto_FBBR

document.addEventListener('DOMContentLoaded', function() {
    // Menu mobile
    const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
    const menu = document.querySelector('.menu');
    
    if (mobileMenuIcon) {
        mobileMenuIcon.addEventListener('click', function() {
            menu.classList.toggle('active');
        });
    }
    
    // Botão voltar ao topo
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('active');
            } else {
                backToTopButton.classList.remove('active');
            }
        });
        
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Funcionalidade do Assistente Virtual FBBR_IA
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    
    if (chatMessages && userInput && sendButton) {
        sendButton.addEventListener('click', sendMessage);
        userInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
        
        function sendMessage() {
            const message = userInput.value.trim();
            if (message !== '') {
                // Adicionar mensagem do usuário
                addMessage('user', message);
                
                // Limpar input
                userInput.value = '';
                
                // Simular "digitando..."
                setTimeout(() => {
                    addMessage('bot-typing', 'Pesquisando...');
                    
                    // Simular resposta do assistente após pesquisa
                    setTimeout(() => {
                        // Remover mensagem "digitando..."
                        const typingMessage = document.querySelector('.message.bot-typing');
                        if (typingMessage) {
                            chatMessages.removeChild(typingMessage);
                        }
                        
                        // Processar a pergunta e gerar resposta
                        const response = processQuestion(message);
                        addMessage('bot', response);
                        
                        // Rolar para o final da conversa
                        chatMessages.scrollTop = chatMessages.scrollHeight;
                    }, 1500);
                }, 500);
                
                // Rolar para o final da conversa
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }
        }
        
        function addMessage(type, content) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${type}`;
            
            const messageContent = document.createElement('div');
            messageContent.className = 'message-content';
            
            const messageParagraph = document.createElement('p');
            messageParagraph.textContent = content;
            
            messageContent.appendChild(messageParagraph);
            messageDiv.appendChild(messageContent);
            chatMessages.appendChild(messageDiv);
        }
        
        function processQuestion(question) {
            // Palavras-chave para simular pesquisa nos PDFs
            question = question.toLowerCase();
            
            // Respostas baseadas em palavras-chave relacionadas aos PDFs disponíveis
            if (question.includes('anatomia') || question.includes('dente') || question.includes('dental')) {
                return "A anatomia dental estuda a morfologia e estrutura dos dentes e suas relações com o sistema estomatognático. Recomendo consultar o PDF 'ANATOMIADENTAL-ResumoCompleto.pdf' para informações detalhadas sobre este tema.";
            } 
            else if (question.includes('cárie') || question.includes('carie') || question.includes('cariologia')) {
                return "A cariologia estuda a etiologia, diagnóstico, prevenção e tratamento da cárie dentária. Para mais informações, consulte o PDF 'cariologia.pdf' disponível na seção de Resumos.";
            }
            else if (question.includes('endodontia') || question.includes('canal') || question.includes('pulpar')) {
                return "A endodontia é a especialidade que trata dos canais radiculares e tecidos periapicais. Você pode encontrar mais detalhes no PDF 'Endodontia-Introduçãoeanatomiainternadosdentes.pdf'.";
            }
            else if (question.includes('periodontia') || question.includes('gengiva') || question.includes('periodontal')) {
                return "A periodontia é a especialidade que estuda e trata as doenças do periodonto (gengiva, ligamento periodontal, cemento e osso alveolar). Consulte o PDF 'Periodontia-CompletoNovaClassificação.pdf' para informações completas.";
            }
            else if (question.includes('ortodontia') || question.includes('aparelho') || question.includes('alinhamento')) {
                return "A ortodontia é responsável pela prevenção, supervisão e orientação do desenvolvimento do aparelho mastigatório. Recomendo o PDF 'ORTODONTIA.pdf' para aprofundar seus conhecimentos.";
            }
            else if (question.includes('prótese') || question.includes('protese') || question.includes('removível') || question.includes('removivel')) {
                return "A prótese dentária é a especialidade que reabilita a função mastigatória através de próteses fixas, removíveis ou sobre implantes. Veja mais no PDF 'PÓTESEPARCIALREMOVIVEL.pdf'.";
            }
            else if (question.includes('material') || question.includes('restaurador') || question.includes('resina')) {
                return "Os materiais odontológicos são fundamentais para procedimentos restauradores. Para conhecer os principais materiais e suas aplicações, consulte o PDF 'MATERIAISODONTOLOGICOS-MATERIAISRESTAURADORES.pdf'.";
            }
            else if (question.includes('farmaco') || question.includes('medicamento') || question.includes('remédio') || question.includes('remedio')) {
                return "A farmacologia aplicada à odontologia estuda os medicamentos utilizados na prática clínica. Para informações sobre analgésicos, antibióticos e anestésicos, consulte o PDF 'farmaco.pdf'.";
            }
            else if (question.includes('instrumento') || question.includes('instrumental')) {
                return "Os instrumentais odontológicos são ferramentas essenciais para a prática clínica. Para conhecer os principais instrumentos e suas funções, consulte o PDF 'instrumentais.pdf'.";
            }
            else if (question.includes('isolamento') || question.includes('absoluto') || question.includes('dique')) {
                return "O isolamento do campo operatório é fundamental para diversos procedimentos odontológicos. Para aprender sobre técnicas de isolamento, consulte o PDF 'isolamentos.pdf'.";
            }
            else if (question.includes('oclusão') || question.includes('oclusao') || question.includes('mordida')) {
                return "A oclusão estuda as relações de contato entre os dentes superiores e inferiores. Para entender melhor este tema, recomendo o PDF 'oclusao.pdf'.";
            }
            else if (question.includes('dentística') || question.includes('dentistica') || question.includes('restauração') || question.includes('restauracao')) {
                return "A dentística é a especialidade que estuda e aplica procedimentos para restaurar a forma, função e estética dos dentes. Consulte o PDF 'Dentisticacompleto.pdf' para mais informações.";
            }
            else if (question.includes('legal') || question.includes('forense') || question.includes('perícia') || question.includes('pericia')) {
                return "A odontologia legal aplica conhecimentos odontológicos a serviço da justiça. Para saber mais sobre identificação humana e perícias odontológicas, consulte o PDF 'odontolegal.pdf'.";
            }
            else {
                return "Não encontrei informações específicas sobre esse tema nos PDFs disponíveis. Posso sugerir que você consulte a seção de Especialidades ou Resumos para encontrar materiais relacionados ao seu interesse. Se preferir, reformule sua pergunta com mais detalhes para que eu possa ajudar melhor.";
            }
        }
    }
    
    // Efeitos visuais para os botões de navegação
    const navButtons = document.querySelectorAll('.menu a');
    
    navButtons.forEach(button => {
        button.addEventListener('mouseover', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        button.addEventListener('mouseout', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = '';
            }
        });
    });
});
