// Script para funcionalidade de filtro na página de questões
document.addEventListener('DOMContentLoaded', function() {
    console.log("Inicializando script de filtro e assistente...");
    
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

    // Verificar se todos os elementos foram encontrados
    if (!filtroMateria || !filtroTema || !filtroBusca || !btnFiltrar || !btnLimpar || 
        !perguntaTextarea || !btnPerguntar || !respostaContainer || !respostaLoading || 
        !respostaConteudo || !respostaTexto || !respostaReferencias || !questoesLista) {
        console.error("Alguns elementos não foram encontrados na página");
        return; // Encerra a execução se algum elemento não for encontrado
    }

    console.log("Todos os elementos do DOM foram encontrados");

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
        'patologias': ['graves.pdf'],
        'anestesia': ['anestesia1.pdf', 'anestesia2.pdf', 'anestesia3.pdf', 'ANESTESIA-TÉCNICASEMANEJOS.pdf', 'ANESTESIA-CONSIDERAÇÕESANATÔMICAS(1).pdf']
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
        ],
        'anestesia': [
            {
                materia: 'Anestesia',
                titulo: 'Técnicas de anestesia para bloqueio do nervo alveolar inferior',
                preview: 'Quais são as técnicas mais eficazes para bloqueio do nervo alveolar inferior?',
                data: '30/05/2025',
                resposta: 'O bloqueio do nervo alveolar inferior (BNAI) pode ser realizado por diferentes técnicas: 1) Técnica direta: agulha inserida na prega pterigomandibular em direção à língula; 2) Técnica indireta: agulha inserida na face oclusal dos molares inferiores do lado oposto, avançando até a região retromolar; 3) Técnica de Gow-Gates: bloqueio mais alto, na altura do colo do côndilo mandibular; 4) Técnica de Vazirani-Akinosi: técnica de boca fechada, útil em casos de trismo. A eficácia varia entre 80-85% para técnicas convencionais e pode chegar a 95% com Gow-Gates quando corretamente executada.',
                referencias: ['anestesia1.pdf', 'ANESTESIA-TÉCNICASEMANEJOS.pdf']
            },
            {
                materia: 'Anestesia',
                titulo: 'Considerações anatômicas para anestesia em odontologia',
                preview: 'Quais são as principais considerações anatômicas para anestesia em odontologia?',
                data: '29/05/2025',
                resposta: 'As principais considerações anatômicas incluem: 1) Inervação específica de cada região (trigêmeo e seus ramos); 2) Variações anatômicas como forame mandibular acessório (15% da população); 3) Proximidade de estruturas vasculares importantes; 4) Espessura da cortical óssea (mais densa em mandíbula); 5) Presença de processos inflamatórios que podem alterar o pH local e reduzir a eficácia anestésica; 6) Diferenças anatômicas entre adultos e crianças. O conhecimento detalhado da anatomia neurovascular da cabeça e pescoço é fundamental para o sucesso anestésico e prevenção de complicações.',
                referencias: ['ANESTESIA-CONSIDERAÇÕESANATÔMICAS(1).pdf', 'anestesia2.pdf']
            }
        ]
    };

    // Função para buscar questões com base nos filtros
    function buscarQuestoes() {
        console.log("Função buscarQuestoes iniciada");
        const materia = filtroMateria.value;
        const tema = filtroTema.value;
        const busca = filtroBusca.value.toLowerCase();
        
        console.log(`Filtros: matéria=${materia}, tema=${tema}, busca=${busca}`);
        
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
            
            console.log(`Resultados encontrados: ${resultados.length}`);
            
            // Adicionar resultados de busca na web (simulado)
            if (busca) {
                // Expandir termos de busca para cobrir mais áreas da odontologia
                const termosBusca = [
                    'cárie', 'periodontite', 'endodontia', 'ortodontia', 'prótese', 
                    'dente', 'dental', 'gengiva', 'canal', 'restauração', 'implante',
                    'oclusão', 'bruxismo', 'anestesia', 'extração', 'cirurgia', 'odonto'
                ];
                
                if (termosBusca.some(termo => busca.includes(termo)) || busca.length > 5) {
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
        console.log("Função mostrarResposta iniciada", questao);
        
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
        console.log("Função buscarResposta iniciada");
        
        const pergunta = perguntaTextarea.value.trim();
        
        if (!pergunta) {
            alert('Por favor, digite sua pergunta antes de enviar.');
            return;
        }
        
        console.log(`Pergunta: ${pergunta}`);
        
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
                'farmacologia': ['farmacologia', 'medicamento', 'antibiótico', 'analgésico'],
                'anestesia': ['anestesia', 'anestésico', 'bloqueio', 'infiltrativa', 'lidocaína', 'articaína', 'mepivacaína'],
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
            
            console.log(`Matéria encontrada: ${materiaEncontrada}, PDFs relevantes: ${pdfsRelevantes.length}`);
            
            // Gerar resposta baseada na matéria identificada
            let resposta = '';
            let referencias = [];
            
            switch (materiaEncontrada) {
                case 'anatomia':
                    resposta = 'A anatomia dental é fundamental para a prática odontológica. Os dentes humanos são divididos em incisivos, caninos, pré-molares e molares, cada um com características morfológicas específicas. Os incisivos têm função de corte, os caninos de dilaceração, os pré-molares de trituração inicial e os molares de trituração final dos alimentos. A compreensão detalhada da anatomia dental permite diagnósticos precisos e tratamentos adequados, respeitando a forma e função de cada elemento dentário.';
                    referencias = pdfsRelevantes;
                    break;
                case 'cariologia':
                    resposta = 'A cárie dentária é uma doença multifatorial, biofilme-dependente, caracterizada pela desmineralização dos tecidos dentários duros. Seu desenvolvimento envolve a interação entre hospedeiro suscetível, microbiota cariogênica, dieta rica em carboidratos fermentáveis e tempo. O processo inicia-se com a formação de biofilme, seguido pela produção de ácidos que desmineralizam o esmalte. A prevenção baseia-se no controle de biofilme, uso de fluoretos, orientação dietética e aplicação de selantes em superfícies suscetíveis.';
                    referencias = pdfsRelevantes;
                    break;
                case 'endodontia':
                    resposta = 'A endodontia é a especialidade odontológica responsável pelo estudo da polpa dental e dos tecidos periapicais, bem como das doenças que os afetam. O tratamento endodôntico consiste na remoção do tecido pulpar inflamado ou necrosado, preparo biomecânico dos canais radiculares e seu selamento tridimensional. O conhecimento da anatomia interna dos dentes é essencial para o sucesso do tratamento, considerando variações como canais acessórios, deltas apicais e istmos.';
                    referencias = pdfsRelevantes;
                    break;
                case 'periodontia':
                    resposta = 'A periodontia é a especialidade que estuda e trata as doenças do periodonto: gengiva, ligamento periodontal, cemento radicular e osso alveolar. As principais doenças periodontais são a gengivite (inflamação restrita à gengiva) e a periodontite (destruição dos tecidos de suporte). A nova classificação de 2018 categoriza a periodontite em estágios (I a IV, baseados na severidade) e graus (A a C, baseados na progressão). O tratamento envolve controle de biofilme, raspagem e alisamento radicular, e em casos avançados, cirurgias periodontais.';
                    referencias = pdfsRelevantes;
                    break;
                case 'anestesia':
                    resposta = 'A anestesia local em odontologia envolve o bloqueio reversível da condução nervosa, permitindo procedimentos sem dor. Os anestésicos mais utilizados são lidocaína, mepivacaína, articaína e prilocaína, geralmente associados a vasoconstritores como epinefrina. As técnicas anestésicas variam conforme a região a ser anestesiada, incluindo técnicas infiltrativas (supraperiosteal, intraligamentar, intrapulpar) e técnicas de bloqueio regional (nervo alveolar inferior, nervo alveolar superior posterior, nervo infraorbitário). O conhecimento anatômico detalhado é fundamental para o sucesso anestésico e prevenção de complicações.';
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
                'isolamento absoluto': 'O isolamento absoluto é uma técnica que utiliza lençol de borracha para isolar o campo operatório da cavidade bucal. Proporciona melhor visualização, controle de umidade, proteção dos tecidos moles, prevenção de aspiração/deglutição de materiais e instrumentos, além de economia de tempo. É indicado em procedimentos restauradores, endodônticos e cimentações adesivas.',
                'anestesia tronco': 'A anestesia de tronco ou bloqueio regional é uma técnica que visa bloquear um nervo principal, anestesiando toda sua área de inervação. O exemplo mais comum é o bloqueio do nervo alveolar inferior, que anestesia hemimandíbula, incluindo dentes, periodonto vestibular e lingual, mucosa e dois terços anteriores da língua do lado correspondente. É indicada para procedimentos em múltiplos dentes na mesma hemiarcada.'
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
    
    // Adicionar eventos
    if (btnFiltrar) {
        console.log("Adicionando evento de clique ao botão Filtrar");
        btnFiltrar.addEventListener('click', buscarQuestoes);
    }
    
    if (btnLimpar) {
        console.log("Adicionando evento de clique ao botão Limpar");
        btnLimpar.addEventListener('click', () => {
            filtroMateria.value = '';
            filtroTema.value = '';
            filtroBusca.value = '';
            questoesLista.innerHTML = '';
            // Recarregar todas as questões após limpar filtros
            setTimeout(() => {
                buscarQuestoes();
            }, 300);
        });
    }
    
    if (btnPerguntar) {
        console.log("Adicionando evento de clique ao botão Perguntar");
        btnPerguntar.addEventListener('click', buscarResposta);
        
        // Adicionar evento de tecla Enter para enviar pergunta
        perguntaTextarea.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                buscarResposta();
            }
        });
    }
    
    // Carregar questões iniciais
    console.log("Carregando questões iniciais");
    setTimeout(() => {
        buscarQuestoes();
    }, 500);
});