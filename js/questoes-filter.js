// Script para funcionalidade de filtro na página de questões
document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const filtroMateria = document.getElementById('filtro-materia');
    const filtroTema = document.getElementById('filtro-tema');
    const filtroBusca = document.getElementById('filtro-busca');
    const btnFiltrar = document.getElementById('btn-filtrar');
    const btnLimpar = document.getElementById('btn-limpar');
    const perguntaTextarea = document.getElementById('pergunta-textarea');
    const btnPerguntar = document.getElementById('btn-perguntar');
    const respostaContainer = document.getElementById('resposta-container');
    const respostaLoading = document.getElementById('resposta-loading');
    const respostaConteudo = document.getElementById('resposta-conteudo');
    const respostaTexto = document.getElementById('resposta-texto');
    const respostaReferencias = document.getElementById('resposta-referencias');
    const questoesLista = document.getElementById('questoes-lista');

    // Mapeamento de matérias para PDFs relacionados
    const materiasPdfs = {
        'anatomia': ['ANATOMIADENTAL-Caninos.pdf', 'ANATOMIADENTAL-DentesDecíduos.pdf', 'ANATOMIADENTAL-Incisivos.pdf', 
                    'ANATOMIADENTAL-Introdução.pdf', 'ANATOMIADENTAL-Molares.pdf', 'ANATOMIADENTAL-PrMolar.pdf', 
                    'ANATOMIADENTAL-ResumoCompleto.pdf'],
        'cariologia': ['cariologia.pdf', 'CARIOLOGIA-Evoluçãodacárie.pdf'],
        'dentistica': ['Dentisticacompleto.pdf'],
        'endodontia': ['Endodontia-Introduçãoeanatomiainternadosdentes.pdf'],
        'periodontia': ['Periodontia-CompletoNovaClassificação.pdf'],
        'ortodontia': ['ORTODONTIA.pdf'],
        'protese': ['PÓTESEPARCIALREMOVIVEL.pdf', 'completa.pdf'],
        'materiais': ['MATERIAISODONTOLOGICOS-MATERIAISRESTAURADORES.pdf'],
        'farmacologia': ['farmaco.pdf'],
        'oclusao': ['oclusao.pdf'],
        'instrumentais': ['instrumentais.pdf'],
        'isolamento': ['isolamentos.pdf'],
        'odontolegal': ['odontolegal.pdf'],
        'patologias': ['graves.pdf']
    };

    // Questões pré-definidas por matéria
    const questoesPredefinidas = {
        'anatomia': [
            {
                materia: 'Anatomia Dental',
                titulo: 'Diferenças entre incisivos centrais e laterais',
                preview: 'Quais são as principais diferenças morfológicas entre incisivos centrais e laterais superiores?',
                data: '28/05/2025',
                resposta: 'Os incisivos centrais superiores são maiores que os laterais, com coroa mais simétrica e retangular. Os incisivos laterais superiores têm coroa mais arredondada, são menores em todas as dimensões e apresentam maior variabilidade morfológica. Os centrais têm raiz cônica e reta, enquanto os laterais têm raiz mais fina e frequentemente curvada para distal.',
                referencias: ['ANATOMIADENTAL-Incisivos.pdf', 'ANATOMIADENTAL-ResumoCompleto.pdf']
            },
            {
                materia: 'Anatomia Dental',
                titulo: 'Características dos caninos superiores',
                preview: 'Quais são as características anatômicas que distinguem os caninos superiores?',
                data: '27/05/2025',
                resposta: 'Os caninos superiores são os dentes mais longos da arcada dentária, com coroa pentagonal na face vestibular e cúspide bem desenvolvida. Apresentam raiz única, longa e robusta, com sulcos longitudinais nas faces proximais. A face vestibular é convexa e dividida por uma crista longitudinal. São fundamentais na guia canina durante movimentos excursivos da mandíbula.',
                referencias: ['ANATOMIADENTAL-Caninos.pdf', 'ANATOMIADENTAL-ResumoCompleto.pdf']
            }
        ],
        'cariologia': [
            {
                materia: 'Cariologia',
                titulo: 'Estágios de evolução da cárie dentária',
                preview: 'Quais são os estágios de evolução da cárie dentária e suas características clínicas?',
                data: '26/05/2025',
                resposta: 'A evolução da cárie dentária pode ser dividida em: 1) Lesão inicial (mancha branca): desmineralização subsuperficial sem cavitação; 2) Lesão de esmalte: cavitação limitada ao esmalte; 3) Lesão de dentina: envolvimento da dentina com possível sensibilidade; 4) Lesão pulpar: comprometimento da polpa com possível dor espontânea; 5) Lesão crônica: ampla destruição coronária com possível necrose pulpar. O diagnóstico precoce é fundamental para tratamentos menos invasivos.',
                referencias: ['CARIOLOGIA-Evoluçãodacárie.pdf', 'cariologia.pdf']
            }
        ],
        'endodontia': [
            {
                materia: 'Endodontia',
                titulo: 'Anatomia interna dos molares superiores',
                preview: 'Como é a anatomia interna dos canais radiculares dos primeiros molares superiores?',
                data: '25/05/2025',
                resposta: 'Os primeiros molares superiores geralmente apresentam três raízes (mésio-vestibular, disto-vestibular e palatina) e quatro canais. A raiz mésio-vestibular frequentemente possui dois canais (MV1 e MV2), sendo o MV2 mais difícil de localizar. A raiz disto-vestibular geralmente possui um canal, assim como a raiz palatina, que é a mais longa e reta. A câmara pulpar tem formato trapezoidal ou romboide, com quatro cornos pulpares correspondentes às cúspides.',
                referencias: ['Endodontia-Introduçãoeanatomiainternadosdentes.pdf']
            }
        ],
        'periodontia': [
            {
                materia: 'Periodontia',
                titulo: 'Nova classificação das doenças periodontais',
                preview: 'Quais são as principais mudanças na nova classificação das doenças periodontais?',
                data: '24/05/2025',
                resposta: 'A nova classificação de 2018 divide as doenças periodontais em três grandes grupos: 1) Saúde periodontal e gengival; 2) Gengivite induzida por biofilme e não induzida por biofilme; 3) Periodontite, agora classificada em estágios (I-IV, baseados na severidade) e graus (A-C, baseados na progressão). Foram incluídas também condições e doenças peri-implantares. A periodontite agressiva e crônica foram unificadas em um único diagnóstico de periodontite.',
                referencias: ['Periodontia-CompletoNovaClassificação.pdf']
            }
        ]
    };

    // Função para buscar questões com base nos filtros
    function buscarQuestoes() {
        const materia = filtroMateria.value;
        const tema = filtroTema.value;
        const busca = filtroBusca.value.toLowerCase();
        
        // Mostrar indicador de carregamento
        respostaLoading.style.display = 'block';
        
        // Limpar lista de questões anteriores
        questoesLista.innerHTML = '';
        
        // Simular tempo de processamento
        setTimeout(() => {
            let resultados = [];
            
            // Buscar em questões predefinidas
            Object.keys(questoesPredefinidas).forEach(categoriaMateria => {
                if (!materia || materia === categoriaMateria) {
                    questoesPredefinidas[categoriaMateria].forEach(questao => {
                        if ((!tema || questao.titulo.toLowerCase().includes(tema.toLowerCase())) && 
                            (!busca || questao.titulo.toLowerCase().includes(busca) || 
                             questao.preview.toLowerCase().includes(busca) || 
                             questao.resposta.toLowerCase().includes(busca))) {
                            resultados.push(questao);
                        }
                    });
                }
            });
            
            // Adicionar resultados de busca na web (simulado)
            if (busca) {
                const termosBusca = ['cárie', 'periodontite', 'endodontia', 'ortodontia', 'prótese'];
                if (termosBusca.some(termo => busca.includes(termo))) {
                    resultados.push({
                        materia: materia ? filtroMateria.options[filtroMateria.selectedIndex].text : 'Resultado Web',
                        titulo: `Resultados da web para: ${busca}`,
                        preview: `Informações encontradas na internet sobre ${busca} em odontologia...`,
                        data: 'Hoje',
                        fonte: 'Web'
                    });
                }
            }
            
            // Exibir resultados
            if (resultados.length > 0) {
                resultados.forEach(questao => {
                    const card = document.createElement('div');
                    card.className = 'questao-card';
                    card.innerHTML = `
                        <span class="questao-materia">${questao.materia}</span>
                        <h4 class="questao-titulo">${questao.titulo}</h4>
                        <p class="questao-preview">${questao.preview}</p>
                        <div class="questao-footer">
                            <span>${questao.data}</span>
                            <span>${questao.fonte ? questao.fonte : 'Apostila'}</span>
                        </div>
                    `;
                    
                    // Adicionar evento de clique para mostrar resposta
                    card.addEventListener('click', () => {
                        mostrarResposta(questao);
                    });
                    
                    questoesLista.appendChild(card);
                });
            } else {
                questoesLista.innerHTML = `
                    <div class="resposta-vazia">
                        <i class="fas fa-search"></i>
                        <p>Nenhuma questão encontrada com os filtros selecionados.</p>
                    </div>
                `;
            }
            
            // Ocultar indicador de carregamento
            respostaLoading.style.display = 'none';
        }, 1000);
    }
    
    // Função para mostrar resposta de uma questão
    function mostrarResposta(questao) {
        // Rolar para o topo da seção de resposta
        respostaContainer.scrollIntoView({ behavior: 'smooth' });
        
        // Preencher o campo de pergunta com a questão selecionada
        perguntaTextarea.value = questao.preview;
        
        // Mostrar indicador de carregamento
        respostaLoading.style.display = 'block';
        respostaConteudo.style.display = 'none';
        
        // Simular tempo de processamento
        setTimeout(() => {
            // Preencher conteúdo da resposta
            if (questao.resposta) {
                respostaTexto.innerHTML = `<p>${questao.resposta}</p>`;
                
                // Preencher referências se existirem
                if (questao.referencias && questao.referencias.length > 0) {
                    let refsHTML = '<ul>';
                    questao.referencias.forEach(ref => {
                        refsHTML += `<li><a href="visualizador.html?pdf=${encodeURIComponent(ref)}&title=${encodeURIComponent(ref.replace('.pdf', ''))}" target="_blank">${ref}</a></li>`;
                    });
                    refsHTML += '</ul>';
                    respostaReferencias.innerHTML = `<h4>Referências:</h4>${refsHTML}`;
                    respostaReferencias.style.display = 'block';
                } else {
                    respostaReferencias.style.display = 'none';
                }
            } else {
                // Resposta para busca na web
                respostaTexto.innerHTML = `
                    <p>Com base na sua pergunta sobre "${questao.titulo.replace('Resultados da web para: ', '')}", encontramos as seguintes informações:</p>
                    <p>Para obter informações mais detalhadas e específicas sobre este tema, recomendamos consultar as apostilas disponíveis em nossa plataforma ou fazer uma pergunta mais específica.</p>
                `;
                respostaReferencias.innerHTML = `
                    <h4>Fontes sugeridas:</h4>
                    <ul>
                        <li>Artigos científicos recentes</li>
                        <li>Materiais didáticos da plataforma</li>
                        <li>Consulta com professores especialistas</li>
                    </ul>
                `;
                respostaReferencias.style.display = 'block';
            }
            
            // Ocultar indicador de carregamento e mostrar conteúdo
            respostaLoading.style.display = 'none';
            respostaConteudo.style.display = 'block';
        }, 1500);
    }
    
    // Função para buscar resposta para pergunta digitada
    function buscarResposta() {
        const pergunta = perguntaTextarea.value.trim();
        
        if (!pergunta) {
            alert('Por favor, digite sua pergunta antes de enviar.');
            return;
        }
        
        // Mostrar indicador de carregamento
        respostaLoading.style.display = 'block';
        respostaConteudo.style.display = 'none';
        
        // Rolar para o topo da seção de resposta
        respostaContainer.scrollIntoView({ behavior: 'smooth' });
        
        // Simular busca em PDFs e na web
        setTimeout(() => {
            // Identificar palavras-chave na pergunta
            const perguntaLower = pergunta.toLowerCase();
            let materiaEncontrada = null;
            let pdfsRelevantes = [];
            
            // Verificar se a pergunta contém palavras-chave relacionadas a alguma matéria
            for (const [materia, keywords] of Object.entries({
                'anatomia': ['anatomia', 'dente', 'dental', 'dentário', 'incisivo', 'canino', 'molar', 'pré-molar', 'raiz', 'coroa'],
                'cariologia': ['cárie', 'cariologia', 'lesão', 'desmineralização', 'remineralização', 'mancha branca'],
                'endodontia': ['endodontia', 'canal', 'pulpar', 'pulpite', 'tratamento de canal'],
                'periodontia': ['periodontia', 'gengiva', 'periodonto', 'bolsa periodontal', 'gengivite'],
                'ortodontia': ['ortodontia', 'aparelho', 'alinhamento', 'oclusão', 'maloclusão'],
                'protese': ['prótese', 'removível', 'fixa', 'total', 'parcial', 'implante'],
                'materiais': ['materiais', 'restaurador', 'resina', 'amálgama', 'cimento'],
                'farmacologia': ['farmacologia', 'medicamento', 'anestésico', 'antibiótico', 'analgésico'],
                'oclusao': ['oclusão', 'articulação', 'atm', 'bruxismo', 'mordida'],
                'instrumentais': ['instrumental', 'instrumento', 'pinça', 'sonda', 'espelho'],
                'isolamento': ['isolamento', 'absoluto', 'relativo', 'dique', 'lençol de borracha'],
                'odontolegal': ['legal', 'forense', 'identificação', 'perícia']
            })) {
                if (keywords.some(keyword => perguntaLower.includes(keyword))) {
                    materiaEncontrada = materia;
                    if (materiasPdfs[materia]) {
                        pdfsRelevantes = materiasPdfs[materia];
                    }
                    break;
                }
            }
            
            // Se não encontrou matéria específica, usar PDFs gerais
            if (!materiaEncontrada) {
                materiaEncontrada = 'geral';
                pdfsRelevantes = ['ANATOMIADENTAL-ResumoCompleto.pdf', 'Dentisticacompleto.pdf'];
            }
            
            // Gerar resposta baseada na matéria identificada
            let resposta = '';
            let referencias = [];
            
            switch (materiaEncontrada) {
                case 'anatomia':
                    resposta = 'A anatomia dental é fundamental para a prática odontológica. Os dentes humanos são divididos em incisivos, caninos, pré-molares e molares, cada um com características morfológicas específicas. Os incisivos têm função de corte, os caninos de rasgar, os pré-molares de trituração inicial e os molares de trituração final dos alimentos. Cada dente possui coroa (porção visível) e raiz (inserida no osso alveolar), além de esmalte, dentina, cemento e polpa como tecidos constituintes.';
                    referencias = pdfsRelevantes.slice(0, 3);
                    break;
                case 'cariologia':
                    resposta = 'A cárie dentária é uma doença multifatorial, biofilme-dependente, que resulta da desmineralização dos tecidos dentários duros. O processo inicia-se com a formação de biofilme, seguido pela produção de ácidos pelas bactérias após metabolização de carboidratos fermentáveis. A lesão inicial (mancha branca) é reversível através de medidas preventivas como controle de biofilme, uso de fluoretos e controle da dieta. O diagnóstico precoce é fundamental para tratamentos menos invasivos.';
                    referencias = pdfsRelevantes;
                    break;
                case 'endodontia':
                    resposta = 'A endodontia é a especialidade que estuda a polpa dentária, canais radiculares e tecidos periapicais, bem como as doenças que os afetam. O tratamento endodôntico consiste na remoção do tecido pulpar inflamado ou necrosado, preparo biomecânico dos canais radiculares e seu preenchimento com material obturador. A anatomia interna dos dentes é complexa e varia conforme o grupo dentário, sendo fundamental seu conhecimento para o sucesso do tratamento.';
                    referencias = pdfsRelevantes;
                    break;
                case 'periodontia':
                    resposta = 'A periodontia é a especialidade que estuda os tecidos de suporte e circundantes dos dentes (gengiva, ligamento periodontal, cemento radicular e osso alveolar) e as doenças que os afetam. A doença periodontal é uma condição inflamatória crônica induzida por biofilme que pode levar à perda de inserção periodontal e, eventualmente, à perda dentária. A nova classificação de 2018 categoriza a periodontite em estágios (I-IV) baseados na severidade e graus (A-C) baseados na progressão.';
                    referencias = pdfsRelevantes;
                    break;
                default:
                    resposta = 'Sua pergunta abrange diversos aspectos da odontologia. Para uma resposta mais precisa, recomendamos consultar as apostilas específicas relacionadas ao tema ou refinar sua pergunta com termos mais específicos. A plataforma Odonto_FBBR disponibiliza materiais completos sobre anatomia dental, cariologia, endodontia, periodontia, ortodontia, prótese, materiais odontológicos, farmacologia, oclusão, instrumentais, isolamento e odontologia legal.';
                    referencias = ['ANATOMIADENTAL-ResumoCompleto.pdf', 'Dentisticacompleto.pdf'];
            }
            
            // Adicionar resposta específica se a pergunta contém termos muito específicos
            const termosEspecificos = {
                'mancha branca': 'A mancha branca é o primeiro sinal clínico visível da cárie dentária, representando uma lesão de subsuperfície no esmalte. É caracterizada por uma área opaca, sem brilho, resultante da desmineralização subsuperficial. Neste estágio, a lesão ainda é reversível através de medidas preventivas como controle de biofilme, uso de fluoretos e controle da dieta.',
                'pulpite': 'A pulpite é a inflamação da polpa dentária, podendo ser reversível ou irreversível. Na pulpite reversível, o paciente apresenta dor provocada que cessa após a remoção do estímulo. Na pulpite irreversível, a dor é espontânea, intensa, pulsátil e pode ser exacerbada por mudanças de temperatura. O tratamento da pulpite irreversível é o tratamento endodôntico (canal).',
                'bruxismo': 'O bruxismo é uma atividade muscular repetitiva caracterizada pelo apertamento ou ranger dos dentes. Pode ocorrer durante o sono (bruxismo do sono) ou durante a vigília (bruxismo em vigília). Suas consequências incluem desgaste dentário, dor muscular, disfunção temporomandibular e danos às restaurações. O tratamento envolve placas oclusais, técnicas de relaxamento e, em alguns casos, medicamentos.',
                'isolamento absoluto': 'O isolamento absoluto é uma técnica que utiliza lençol de borracha para isolar o campo operatório da cavidade bucal. Proporciona melhor visualização, controle de umidade, proteção dos tecidos moles, prevenção de aspiração/deglutição de materiais e instrumentos, além de economia de tempo. É indicado em procedimentos restauradores, endodônticos e cimentações adesivas.'
            };
            
            for (const [termo, explicacao] of Object.entries(termosEspecificos)) {
                if (perguntaLower.includes(termo)) {
                    resposta = explicacao + '\n\n' + resposta;
                    break;
                }
            }
            
            // Preencher conteúdo da resposta
            respostaTexto.innerHTML = `<p>${resposta.replace(/\n\n/g, '</p><p>')}</p>`;
            
            // Preencher referências
            if (referencias.length > 0) {
                let refsHTML = '<ul>';
                referencias.forEach(ref => {
                    refsHTML += `<li><a href="visualizador.html?pdf=${encodeURIComponent(ref)}&title=${encodeURIComponent(ref.replace('.pdf', ''))}" target="_blank">${ref}</a></li>`;
                });
                refsHTML += '</ul>';
                respostaReferencias.innerHTML = `<h4>Referências:</h4>${refsHTML}`;
                respostaReferencias.style.display = 'block';
            } else {
                respostaReferencias.style.display = 'none';
            }
            
            // Adicionar referência à busca na web
            respostaReferencias.innerHTML += `
                <p>Resultados complementares da web:</p>
                <ul>
                    <li><a href="https://www.google.com/search?q=odontologia+${encodeURIComponent(pergunta)}" target="_blank">Buscar mais informações no Google</a></li>
                </ul>
            `;
            
            // Ocultar indicador de carregamento e mostrar conteúdo
            respostaLoading.style.display = 'none';
            respostaConteudo.style.display = 'block';
        }, 2000);
    }
    
    // Adicionar eventos aos botões
    btnFiltrar.addEventListener('click', buscarQuestoes);
    btnLimpar.addEventListener('click', () => {
        filtroMateria.value = '';
        filtroTema.value = '';
        filtroBusca.value = '';
        questoesLista.innerHTML = '';
    });
    btnPerguntar.addEventListener('click', buscarResposta);
    
    // Carregar questões iniciais
    buscarQuestoes();
});
