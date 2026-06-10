export type FossilId =
  | "odonata_adulto"
  | "odonata_ninfa"
  | "decapoda"
  | "scorpiones"
  | "orthoptera"
  | "ephemeroptera_ninfa"
  | "ephemeroptera_adulto"
  | "blattodea"
  | "hemiptera"
  | "odonata_vivente"
  | "hemiptera_vivente"
  | "orthoptera_vivente"
  | "blattodea_vivente";

export interface Fossil {
  id: FossilId;
  name: string;
  sciName: string;
  image: string;
  silhouette: string;
  description: string;
  funFact: string;
  habitat: string;
  period: string;
  group: string;
  taxon?: string;
  acceptedIds?: FossilId[];
}

export const FOSSILS: Record<FossilId, Fossil> = {
  odonata_adulto: {
    id: "odonata_adulto",
    name: "Libélula adulta",
    sciName: "Odonata (adulto)",
    image: "/fossils/odonata-adulto.png",
    silhouette: "M50,20 L55,18 L80,25 L90,20 L100,22 L80,28 L55,24 L50,26 L45,24 L20,28 L10,22 L20,20 L45,18 Z M50,26 L52,60 L50,75 L48,60 Z",
    description: "As libélulas adultas da Formação Crato são algumas das mais bem preservadas do mundo. Com asas abertas ainda visíveis após 110 milhões de anos, esses insetos voadores habitavam margens de lagos e brejos do antigo Gondwana.",
    funFact: "As libélulas existem há mais de 300 milhões de anos — são mais antigas que os dinossauros!",
    habitat: "Margens de lagos e brejos",
    period: "Cretáceo Inferior (~110 Ma)",
    group: "Insecta › Pterygota › Palaeoptera",
    taxon: "Odonata",
    
  },
  odonata_ninfa: {
    id: "odonata_ninfa",
    name: "Libélula ninfa",
    sciName: "Odonata (ninfa)",
    image: "/fossils/odonata-ninfa.png",
    silhouette: "M50,15 L60,20 L65,35 L60,55 L50,65 L40,55 L35,35 L40,20 Z M35,40 L20,35 M65,40 L80,35 M35,50 L18,48 M65,50 L82,48",
    description: "As ninfas de libélula são predadoras aquáticas que viviam no fundo dos lagos cretáceos. A preservação de estágios ninfais é raríssima no registro fóssil, tornando os exemplares do Crato excepcionalmente valiosos.",
    funFact: "As ninfas de libélula podem viver subaquáticas por até 5 anos antes de se tornarem adultas.",
    habitat: "Fundo de lagos rasos",
    period: "Cretáceo Inferior (~110 Ma)",
    group: "Insecta › Pterygota › Palaeoptera",
    taxon: "Odonata",
  },
  decapoda: {
    id: "decapoda",
    name: "Crustáceo decápode",
    sciName: "Decapoda",
    image: "/fossils/decapoda.png",
    silhouette: "M50,30 L65,25 L75,30 L78,45 L70,55 L50,60 L30,55 L22,45 L25,30 L35,25 Z M78,35 L92,30 M78,42 L93,40 M22,35 L8,30 M22,42 L7,40 M50,60 L45,75 M50,60 L55,75 M50,60 L40,72 M50,60 L60,72",
    description: "Os decápodes fósseis da Formação Crato incluem camarões e caranguejos primitivos. Eram os principais decompositores e predadores de pequeno porte nos lagos cretáceos, semelhantes aos crustáceos atuais.",
    funFact: "O nome 'decápode' vem do grego: deka (dez) + pous (pé). Todos têm exatamente 10 patas.",
    habitat: "Lagos e lagoas permanentes",
    period: "Cretáceo Inferior (~110 Ma)",
    group: "Crustacea › Malacostraca",
    taxon: "Decapoda",
  },
  scorpiones: {
    id: "scorpiones",
    name: "Escorpião",
    sciName: "Scorpiones",
    image: "/fossils/scorpiones.png",
    silhouette: "M40,40 L35,30 L30,25 L28,30 L32,38 M40,40 L30,42 L22,38 L20,44 L28,50 M40,40 L30,52 L25,58 L28,63 L36,56 M50,35 L40,40 L50,45 L60,40 Z M60,40 L70,42 L78,38 L80,44 L72,50 M60,40 L70,52 L75,58 L72,63 L64,56 M60,40 L65,30 L70,25 L72,30 L68,38 M50,25 L50,15 L52,8 L54,5 L55,10 L53,15 L52,25",
    description: "Escorpiões fósseis do Crato são quelicerados terrestres que ocasionalmente caíam nos lagos e eram soterrados rapidamente. A morfologia é notavelmente similar à dos escorpiões atuais, demonstrando enorme conservadorismo evolutivo.",
    funFact: "Escorpiões existem há mais de 430 milhões de anos e mudaram muito pouco desde então.",
    habitat: "Ambiente terrestre árido periférico",
    period: "Cretáceo Inferior (~110 Ma)",
    group: "Chelicerata › Arachnida",
    taxon: "Scorpiones",
  },
  orthoptera: {
    id: "orthoptera",
    name: "Gafanhoto / Grilo",
    sciName: "Orthoptera",
    image: "/fossils/orthoptera.png",
    silhouette: "M45,35 L40,25 L45,20 L50,25 L55,20 L60,25 L55,35 M50,35 L50,65 M50,40 L30,35 L20,38 M50,40 L70,35 L80,38 M50,48 L28,44 L18,46 M50,48 L72,44 L82,46 M50,65 L42,80 L38,90 M50,65 L58,80 L62,90",
    description: "Os ortópteros — gafanhotos, grilos e esperanças — são abundantes na Formação Crato. Muitos exemplares preservam detalhes das asas e até estruturas de estridulação, os órgãos usados para produzir sons.",
    funFact: "Os gafanhotos 'ouvem' com um órgão na barriga chamado órgão timpânico, não com a cabeça.",
    habitat: "Vegetação às margens do lago",
    period: "Cretáceo Inferior (~110 Ma)",
    group: "Insecta › Neoptera › Polyneoptera",
    taxon: "Orthoptera",
  },
  ephemeroptera_ninfa: {
    id: "ephemeroptera_ninfa",
    name: "Efêmera ninfa",
    sciName: "Ephemeroptera (ninfa)",
    image: "/fossils/ephemeroptera-ninfa.png",
    silhouette: "M50,20 L55,25 L58,40 L55,60 L50,70 L45,60 L42,40 L45,25 Z M42,45 L30,40 L22,42 M58,45 L70,40 L78,42 M42,52 L28,50 M58,52 L72,50 M50,70 L44,85 M50,70 L50,87 M50,70 L56,85",
    description: "As ninfas de efemerópteros são aquáticas e viviam no fundo dos lagos. São reconhecidas pelas brânquias laterais e pelas três caudas longas características. Sua presença indica água limpa e oxigenada.",
    funFact: "As ninfas de efemerópteros atuais podem viver até 3 anos na água, mas os adultos vivem apenas algumas horas.",
    habitat: "Fundo de lagos bem oxigenados",
    period: "Cretáceo Inferior (~110 Ma)",
    group: "Insecta › Pterygota › Palaeoptera",
    taxon: "Ephemeroptera",
  },
  ephemeroptera_adulto: {
    id: "ephemeroptera_adulto",
    name: "Efêmera adulta",
    sciName: "Ephemeroptera (adulto)",
    image: "/fossils/ephemeroptera-adulto.png",
    silhouette: "M50,18 L58,16 L85,22 L95,18 L85,26 L58,22 L50,24 L42,22 L15,26 L5,18 L15,22 L42,16 Z M50,24 L52,50 L50,70 L48,50 Z M65,20 L68,35 L65,45 M35,20 L32,35 L35,45 M50,70 L44,82 M50,70 L50,84 M50,70 L56,82",
    description: "Os adultos de efemerópteros atuais são insetos efêmeros por excelência: emergem em massa, acasalam em voo e morrem. Os fósseis do Crato mostram asas triangulares características e os três apêndices caudais filiformes.",
    funFact: "Efemerópteros adultos não possuem aparelho bucal funcional — não comem nada durante toda a vida adulta.",
    habitat: "Superfície e margens de lagos",
    period: "Cretáceo Inferior (~110 Ma)",
    group: "Insecta › Pterygota › Palaeoptera",
    taxon: "Ephemeroptera",
  },
  blattodea: {
    id: "blattodea",
    name: "Barata",
    sciName: "Blattodea",
    image: "/fossils/blattodea.png",
    silhouette: "M50,25 L62,22 L72,28 L75,42 L70,55 L50,62 L30,55 L25,42 L28,28 L38,22 Z M50,22 L50,15 L48,10 M50,22 L52,12 M38,25 L25,20 L18,24 M62,25 L75,20 L82,24 M38,32 L22,28 M62,32 L78,28",
    description: "Baratas (Blattodea) são comuns na Formação Crato. Esses insetos oportunistas habitavam a serapilheira e decompunham matéria orgânica às margens dos lagos. Sua morfologia cretácea é quase idêntica à das baratas modernas.",
    funFact: "As baratas existem há mais de 320 milhões de anos — sobreviveram ao evento que extinguiu os dinossauros.",
    habitat: "Serapilheira e detritos vegetais",
    period: "Cretáceo Inferior (~110 Ma)",
    group: "Insecta › Neoptera › Dictyoptera",
    taxon: "Blattodea",
  },
  hemiptera: {
    id: "hemiptera",
    name: "Percevejo ",
    sciName: "Hemiptera",
    image: "/fossils/hemiptera.png",
    silhouette: "M50,28 L60,24 L70,28 L73,40 L68,50 L50,56 L32,50 L27,40 L30,28 L40,24 Z M40,26 L28,20 L20,22 M60,26 L72,20 L80,22 M50,25 L50,18 L48,12 M50,25 L52,14 M50,56 L48,68 M50,56 L52,68",
    description: "Hemípteros (percevejos, cigarras, pulgões) possuem aparelho bucal em forma de estilete para perfurar e sugar. Os exemplares do Crato incluem formas aquáticas e terrestres, algumas com asas parcialmente endurecidas (hemiélitros) perfeitamente preservadas.",
    funFact: "O nome Hemiptera significa 'meia asa' — metade da asa dianteira é endurecida e a outra metade é membranosa.",
    habitat: "Aquático e terrestre (vegetação)",
    period: "Cretáceo Inferior (~110 Ma)",
    group: "Insecta › Neoptera › Paraneoptera",
    taxon: "Hemiptera",
  },
  odonata_vivente: {
    id: "odonata_vivente",
    name: "Libélula adulta",
    sciName: "Odonata",
    image: "/fossils/odonata-vivo.png",
    silhouette: "",
    description: "As libélulas atuais são praticamente idênticas às do Cretáceo. São predadoras aéreas eficientes, capturando insetos em pleno voo com taxa de sucesso de até 95%.",
    funFact: "A libélula é considerada o predador mais eficiente do reino animal — erra menos de 5% de suas caçadas!",
    habitat: "Margens de lagos, rios e brejos",
    period: "Atual",
    group: "Insecta › Pterygota › Palaeoptera",
    taxon: "Odonata",
    acceptedIds: ["odonata_adulto", "odonata_vivente"],
  },
  hemiptera_vivente: {
    id: "hemiptera_vivente",
    name: "Percevejo",
    sciName: "Belostomatidae",
    image: "/fossils/hemiptera-vivo.png",
    silhouette: "",
    description: "Os hemípteros atuais mantêm o aparelho bucal em estilete para perfurar e sugar, exatamente como seus ancestrais cretáceos. São encontrados em praticamente todos os ambientes terrestres e aquáticos.",
    funFact: "Alguns hemípteros aquáticos respiram através de uma bolha de ar presa sob as asas — um tanque de oxigênio portátil!",
    habitat: "Terrestre e aquático",
    period: "Atual",
    group: "Insecta › Neoptera › Paraneoptera",
    taxon: "Belostomatidae",
    acceptedIds: ["hemiptera", "hemiptera_vivente"],
  },
  orthoptera_vivente: {
    id: "orthoptera_vivente",
    name: "Gafanhoto / Grilo",
    sciName: "Orthoptera",
    image: "/fossils/orthoptera-vivo.png",
    silhouette: "",
    description: "Os ortópteros atuais como grilos e gafanhotos são praticamente iguais aos do Cretáceo. Produzem sons esfregando partes do corpo — comportamento já presente há 110 milhões de anos.",
    funFact: "Um gafanhoto pode saltar 20 vezes o comprimento do próprio corpo — equivalente a um humano saltando 35 metros!",
    habitat: "Vegetação terrestre",
    period: "Atual",
    group: "Insecta › Neoptera › Polyneoptera",
    taxon: "Orthoptera",
    acceptedIds: ["orthoptera", "orthoptera_vivente"],
  },
  blattodea_vivente: {
    id: "blattodea_vivente",
    name: "Barata",
    sciName: "Blattodea",
    image: "/fossils/blattodea-vivo.png",
    silhouette: "",
    description: "As baratas atuais são morfologicamente quase idênticas às do Cretáceo e do Carbonífero. São onívoras oportunistas extremamente adaptáveis, presentes em todos os continentes exceto a Antártida.",
    funFact: "Baratas conseguem sobreviver até uma semana sem cabeça — morrem apenas de desidratação!",
    habitat: "Serapilheira, cavernas e ambientes urbanos",
    period: "Atual",
    group: "Insecta › Neoptera › Dictyoptera",
    taxon: "Blattodea",
    acceptedIds: ["blattodea", "blattodea_vivente"],
  },
};

export type QuestionType = "fossil" | "trivia";

export interface FossilQuestion {
  type: "fossil";
  fossilId: FossilId;
  // image is shown, player must identify
}

export interface TriviaQuestion {
  type: "trivia";
  question: string;
  options: string[];
  answer: string;
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
}

export type Question = FossilQuestion | TriviaQuestion;

export const TRIVIA_QUESTIONS: TriviaQuestion[] = [
  {
    type: "trivia",
    question: "A Formação Crato pertence a qual bacia sedimentar?",
    options: ["Bacia do Parnaíba", "Bacia do Araripe", "Bacia do São Francisco", "Bacia Potiguar"],
    answer: "Bacia do Araripe",
    explanation: "A Formação Crato é parte da Bacia do Araripe, localizada no limite entre Ceará, Pernambuco e Piauí.",
    difficulty: "easy",
  },
  {
    type: "trivia",
    question: "Qual tipo de rocha preserva a maioria dos fósseis da Formação Crato?",
    options: ["Arenito grosso", "Granito", "Calcário laminado", "Basalto vulcânico"],
    answer: "Calcário laminado",
    explanation: "O calcário laminado (litográfico) da Formação Crato permite preservação excepcionalmente detalhada.",
    difficulty: "easy",
  },
  {
    type: "trivia",
    question: "Qual a idade aproximada dos fósseis da Formação Crato?",
    options: ["50 milhões de anos", "200 milhões de anos", "110 milhões de anos", "300 milhões de anos"],
    answer: "110 milhões de anos",
    explanation: "A Formação Crato data do Aptiano (Cretáceo Inferior), cerca de 110 a 115 milhões de anos atrás.",
    difficulty: "easy",
  },
  {
    type: "trivia",
    question: "Por que os fósseis da Formação Crato são tão bem preservados?",
    options: [
      "Alta temperatura magmática",
      "Soterramento rápido em lago com baixa oxigenação",
      "Congelamento glacial",
      "Pressão tectônica intensa",
    ],
    answer: "Soterramento rápido em lago com baixa oxigenação",
    explanation: "O fundo anóxico (sem oxigênio) do lago impedia a decomposição, permitindo fossilização de tecidos moles.",
    difficulty: "medium",
  },
  {
    type: "trivia",
    question: "Qual o ambiente que originou a Formação Crato?",
    options: ["Mar profundo", "Sistema lacustre (lago)", "Floresta tropical", "Deserto de dunas"],
    answer: "Sistema lacustre (lago)",
    explanation: "A Formação Crato representa os sedimentos de um grande lago cretáceo que existiu no interior do Nordeste brasileiro.",
    difficulty: "easy",
  },
  {
    type: "trivia",
    question: "A venda de fósseis da Formação Crato é permitida no Brasil?",
    options: ["Sim, livremente", "Apenas para museus", "Não — são patrimônio da União", "Sim, com autorização estadual"],
    answer: "Não — são patrimônio da União",
    explanation: "A Lei 9.985/2000 e o Código de Mineração classificam fósseis como bens da União. A comercialização é crime.",
    difficulty: "medium",
  },
  {
    type: "trivia",
    question: "Qual grupo de vertebrados é famoso nos fósseis da Formação Santana, da mesma bacia?",
    options: ["Dinossauros saurópodes", "Peixes actinopterígios e pterossauros", "Mamíferos placentários", "Quelônios marinhos"],
    answer: "Peixes actinopterígios e pterossauros",
    explanation: "A Formação Santana, acima do Crato na Bacia do Araripe, é mundialmente famosa por peixes ósseos e pterossauros excepcionais.",
    difficulty: "medium",
  },
  {
    type: "trivia",
    question: "O que é um 'lagerstätte'?",
    options: [
      "Uma técnica de preparação de fósseis",
      "Um depósito fossilífero com preservação excepcionalmente rica",
      "Um tipo de rocha sedimentar",
      "Um museu paleontológico alemão",
    ],
    answer: "Um depósito fossilífero com preservação excepcionalmente rica",
    explanation: "A Formação Crato é classificada como um Konservat-Lagerstätte — sítio onde tecidos moles e detalhes anatômicos são preservados.",
    difficulty: "hard",
  },
  {
    type: "trivia",
    question: "Os insetos com metamorfose completa (ninfa → pupa → adulto) são chamados de:",
    options: ["Hemimetábolos", "Ametábolos", "Holometábolos", "Parametábolos"],
    answer: "Holometábolos",
    explanation: "Holometábola (metamorfose completa) inclui besouros, moscas, borboletas e formigas. Hemimetábola (incompleta) inclui libélulas e baratas.",
    difficulty: "hard",
  },
  {
    type: "trivia",
    question: "Qual período geológico veio antes do Cretáceo?",
    options: ["Triássico", "Jurássico", "Permiano", "Paleógeno"],
    answer: "Jurássico",
    explanation: "A sequência é: Triássico → Jurássico → Cretáceo. O Cretáceo terminou há ~66 Ma com a extinção em massa.",
    difficulty: "easy",
  },
  {
    type: "trivia",
    question: "Qual estado brasileiro NÃO faz parte da Bacia do Araripe?",
    options: ["Ceará", "Pernambuco", "Piauí", "Bahia"],
    answer: "Bahia",
    explanation: "A Bacia do Araripe está localizada no limite entre Ceará, Pernambuco e Piauí. A Bahia não faz parte desta bacia sedimentar.",
    difficulty: "medium",
  },
  {
    type: "trivia",
    question: "Como se chama o processo de fossilização onde tecidos moles são preservados?",
    options: ["Mineralização", "Carbonização", "Fossilização excepcional", "Bioturbação"],
    answer: "Fossilização excepcional",
    explanation: "A fossilização excepcional (ou Konservat-Lagerstätte) preserva tecidos moles como asas, músculos e órgãos internos, algo raríssimo no registro fóssil.",
    difficulty: "medium",
  },
  {
    type: "trivia",
    question: "O que é o Chapada do Araripe?",
    options: [
      "Uma cordilheira de origem vulcânica",
      "Um planalto sedimentar que preserva os estratos fossilíferos",
      "Um vale fluvial escavado pelo Rio São Francisco",
      "Uma planície costeira do Nordeste",
    ],
    answer: "Um planalto sedimentar que preserva os estratos fossilíferos",
    explanation: "A Chapada do Araripe é um planalto sedimentar com até 900m de altitude que protege os estratos cretáceos da erosão, preservando os fósseis.",
    difficulty: "easy",
  },
  {
    type: "trivia",
    question: "Por que a ausência de oxigênio no fundo do lago cretáceo era importante para a fossilização?",
    options: [
      "Acelerava a decomposição dos organismos",
      "Impedia bactérias decompositoras de atuar, preservando tecidos moles",
      "Aumentava a pressão sobre os sedimentos",
      "Criava minerais especiais que endureciam os fósseis",
    ],
    answer: "Impedia bactérias decompositoras de atuar, preservando tecidos moles",
    explanation: "Em ambientes anóxicos (sem oxigênio), as bactérias aeróbicas não conseguem decompor os organismos, permitindo a preservação de detalhes anatômicos finos.",
    difficulty: "medium",
  },
  {
    type: "trivia",
    question: "Qual é o nome do museu localizado em Santana do Cariri dedicado aos fósseis do Araripe?",
    options: [
      "Museu Nacional do Rio de Janeiro",
      "Museu de Paleontologia da URCA",
      "Museu Paraense Emílio Goeldi",
      "Museu de História Natural de São Paulo",
    ],
    answer: "Museu de Paleontologia da URCA",
    explanation: "O Museu de Paleontologia da Universidade Regional do Cariri (URCA) em Santana do Cariri é referência nacional nos fósseis da Bacia do Araripe.",
    difficulty: "easy",
  },
  {
    type: "trivia",
    question: "O que indica a presença de fósseis de insetos aquáticos como ninfas de libélula e efêmeras na Formação Crato?",
    options: [
      "O ambiente era um deserto com oásis temporários",
      "Existia um lago permanente com água limpa e oxigenada na superfície",
      "A região era coberta por floresta tropical densa",
      "O ambiente era um mar raso com águas salobras",
    ],
    answer: "Existia um lago permanente com água limpa e oxigenada na superfície",
    explanation: "As ninfas de libélula e efêmeras são bioindicadores de água limpa. Sua presença indica que a superfície do lago era bem oxigenada, mesmo que o fundo fosse anóxico.",
    difficulty: "medium",
  },
  {
    type: "trivia",
    question: "Qual característica das asas dos insetos é frequentemente preservada nos fósseis do Crato?",
    options: [
      "A cor original das asas",
      "A venação alar (nervuras das asas)",
      "O brilho metálico das escamas",
      "A textura da membrana alar",
    ],
    answer: "A venação alar (nervuras das asas)",
    explanation: "A venação alar é extremamente importante na taxonomia de insetos. Os fósseis do Crato preservam essas nervuras com detalhes suficientes para identificação até nível de espécie.",
    difficulty: "easy",
  },
  {
    type: "trivia",
    question: "Durante o Cretáceo Inferior, o continente sul-americano estava:",
    options: [
      "Completamente separado da África há milhões de anos",
      "Se separando da África — o Atlântico Sul estava se abrindo",
      "Unido à América do Norte formando um supercontinente",
      "Submerso pelo oceano Tétis",
    ],
    answer: "Se separando da África — o Atlântico Sul estava se abrindo",
    explanation: "Há ~110 Ma, a América do Sul e a África estavam em processo de separação. O Atlântico Sul era ainda estreito, o que explica as semelhanças entre fósseis brasileiros e africanos.",
    difficulty: "hard",
  },
  {
    type: "trivia",
    question: "O que são 'nódulos de calcário' encontrados na Formação Santana, acima do Crato?",
    options: [
      "Rochas vulcânicas ricas em fósseis de peixes",
      "Concreções calcárias que preservam fósseis em 3D",
      "Fragmentos de meteoritos do Cretáceo",
      "Estromatólitos formados por algas cianobactérias",
    ],
    answer: "Concreções calcárias que preservam fósseis em 3D",
    explanation: "Os nódulos (concreções) da Formação Santana são famosos por preservar peixes e pterossauros em três dimensões, diferente dos fósseis achatados do Crato.",
    difficulty: "hard",
  },
  {
    type: "trivia",
    question: "O que é tafonomia?",
    options: [
      "O estudo dos táxons extintos",
      "A ciência que estuda os processos de fossilização",
      "A técnica de preparação mecânica de fósseis",
      "O estudo da distribuição geográfica dos fósseis",
    ],
    answer: "A ciência que estuda os processos de fossilização",
    explanation: "A tafonomia estuda tudo que acontece com um organismo desde sua morte até virar fóssil: decomposição, transporte, soterramento e mineralização.",
    difficulty: "hard",
  },
  {
    type: "trivia",
    question: "Por que fósseis de insetos são raros no registro geológico em geral?",
    options: [
      "Insetos eram muito pequenos para fossilizar",
      "Seu exoesqueleto quitinoso se decompõe rapidamente sem condições especiais",
      "Insetos viviam apenas em locais sem sedimentação",
      "A quitina é solúvel em água e se dissolve facilmente",
    ],
    answer: "Seu exoesqueleto quitinoso se decompõe rapidamente sem condições especiais",
    explanation: "A quitina se decompõe rapidamente em condições normais. Por isso, sítios como o Crato com condições anóxicas excepcionais são tão raros e valiosos.",
    difficulty: "medium",
  },
  {
    type: "trivia",
    question: "Qual evento geológico terminou o período Cretáceo?",
    options: [
      "Uma glaciação global intensa",
      "O impacto de um asteroide associado ao vulcanismo intenso",
      "A separação dos continentes de Gondwana",
      "A elevação dos Andes bloqueando correntes oceânicas",
    ],
    answer: "O impacto de um asteroide associado ao vulcanismo intenso",
    explanation: "O Cretáceo terminou há ~66 Ma com a extinção em massa K-Pg, causada pelo impacto do asteroide Chicxulub no México, combinado com intenso vulcanismo nas Trapas do Decã.",
    difficulty: "easy",
  },
  {
    type: "trivia",
    question: "O que é o Geopark Araripe?",
    options: [
      "Um parque temático sobre dinossauros em Juazeiro do Norte",
      "O primeiro Geopark da América do Sul reconhecido pela UNESCO",
      "Uma reserva ambiental federal no Ceará",
      "Um museu virtual de paleontologia brasileira",
    ],
    answer: "O primeiro Geopark da América do Sul reconhecido pela UNESCO",
    explanation: "O Geopark Araripe foi reconhecido pela UNESCO em 2006 como o primeiro Geopark das Américas, valorizando o patrimônio geológico e paleontológico da região.",
    difficulty: "medium",
  },
  {
    type: "trivia",
    question: "Qual característica morfológica distingue Ephemeroptera (efêmeras) de outros insetos alados?",
    options: [
      "Possuem apenas dois pares de asas membranosas iguais",
      "Possuem asas anteriores endurecidas (élitros)",
      "Têm asas cobertas de escamas coloridas",
      "As asas anteriores são parcialmente endurecidas (hemiélitros)",
    ],
    answer: "Possuem apenas dois pares de asas membranosas iguais",
    explanation: "Efemerópteros têm asas triangulares membranosas, com o par anterior muito maior que o posterior. Não podem dobrar as asas sobre o corpo — característica primitiva herdada dos Palaeoptera.",
    difficulty: "hard",
  },
];

export type SquareType = "fossil" | "trivia" | "start" | "finish" | "rest";

export interface BoardSquare {
  id: number;
  type: SquareType;
  label?: string;
}

export function generateBoard(): BoardSquare[] {
  // 30 squares: start + 26 game squares + finish
  const squares: BoardSquare[] = [];
  squares.push({ id: 0, type: "start", label: "INÍCIO" });

  const pattern: SquareType[] = [
  "fossil", "trivia", "fossil", "fossil", "trivia",
  "fossil", "fossil", "trivia", "fossil", "fossil",
  "trivia", "fossil", "trivia", "trivia", "fossil",
  "fossil", "trivia", "fossil", "trivia", "fossil",
  "trivia", "fossil", "fossil", "trivia", "fossil",
  "trivia", "fossil", "trivia", "fossil", "fossil",
  "fossil", "trivia", "fossil", "fossil", "trivia",
  "fossil", "trivia", "fossil", "fossil",
];
  for (let i = 0; i < 39; i++) {
    squares.push({ id: i + 1, type: pattern[i] });
  }

  squares.push({ id: 40, type: "finish", label: "MUSEU" });
  return squares;
}

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
