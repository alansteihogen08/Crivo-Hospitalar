export interface ExternalReference {
  id: string;
  category: 'nutricao_enteral' | 'nutricao_parenteral' | 'seguranca_medicamentos';
  title: string;
  institution: string;
  scope: string;
  legalDocNumber?: string;
  year: number;
  description: string;
  appliedRules: string[];
  link?: string;
  fullCitation: string;
}

export const EXTERNAL_GUIDELINES: ExternalReference[] = [
  {
    id: 'incor-hc-fmusp-2020',
    category: 'nutricao_enteral',
    title: 'Manual de Orientações para o Preparo e Administração de Medicamentos via Sonda Enteral',
    institution: 'Instituto do Coração (InCor) - Hospital das Clínicas da FMUSP',
    scope: 'Serviço de Farmácia Clínica / EMTN / Enfermagem (Atualização Julho/2020)',
    year: 2020,
    description: 'Manual de referência hospitalar de alta complexidade que classifica e detalha os 5 tipos de incompatibilidades entre fármacos e nutrição enteral (Física, Farmacêutica, Farmacológica, Fisiológica e Farmacocinética). Apresenta a tabela padronizada de medicamentos orais com recomendação por sonda, riscos de obstrução mecânica, necessidade de pausa alimentar e volumes de água para diluição e lavagem (flush com seringa dedicada de 20 mL).',
    appliedRules: [
      'Pausa de dieta enteral em fármacos com redução de biodisponibilidade por nutrientes e cátions (ex.: Ciprofloxacino, Levofloxacino, Fenitoína, Captopril, Varfarina)',
      'Classificação das 5 incompatibilidades fármaco × nutrição enteral (física, farmacêutica, farmacológica, fisiológica e farmacocinética)',
      'Técnica padronizada de irrigação manual da sonda com água filtrada (20 mL) antes e após cada administração',
      'Contraindicação formal de trituração de formas farmacêuticas de liberação modificada e revestimento entérico'
    ],
    link: 'https://www.incor.usp.br/',
    fullCitation: 'INSTITUTO DO CORAÇÃO (INCOR). Hospital das Clínicas da Faculdade de Medicina da Universidade de São Paulo. Manual de orientações para o preparo e administração de medicamentos via sonda enteral. Elaborado pelo Serviço de Farmácia, Coordenação de Enfermagem e EMTN. Atualização 2. São Paulo: InCor-HCFMUSP, jul. 2020.'
  },
  {
    id: 'rdc-503-2021-anvisa',
    category: 'nutricao_parenteral',
    title: 'Boas Práticas da Terapia de Nutrição Enteral e Parenteral (TNE e TNP)',
    institution: 'ANVISA - Agência Nacional de Vigilância Sanitária',
    scope: 'Regulamento Técnico Sanitário Federal (Consolidação da RDC nº 63/2000)',
    legalDocNumber: 'Resolução RDC nº 503/2021',
    year: 2021,
    description: 'Aprova os requisitos de Boas Práticas para Terapia de Nutrição Enteral e Nutrição Parenteral nos serviços de saúde. Estabelece a responsabilidade da Equipe Multiprofissional de Terapia Nutricional (EMTN) e da Farmácia Clínica em garantir a compatibilidade físico-química e a estabilidade das soluções parenterais, prevenindo riscos de contaminação e precipitação intravascular.',
    appliedRules: [
      'Vigilância ativa de incompatibilidade físico-química de misturas intravenosas com Nutrição Parenteral (NPT)',
      'Garantia de via e acesso venoso seguro para infusão de bolsas parenterais',
      'Prevenção de eventos adversos graves decorrentes de coinfusão inadvertida de fármacos precipitantes'
    ],
    link: 'https://www.gov.br/anvisa/pt-br/assuntos/regulamentacao/legislacao',
    fullCitation: 'BRASIL. Ministério da Saúde. Agência Nacional de Vigilância Sanitária (ANVISA). Resolução RDC nº 503, de 27 de maio de 2021. Dispõe sobre os requisitos mínimos de Boas Práticas para a Terapia de Nutrição Enteral e Parenteral. Diário Oficial da União, Brasília, DF, 2021.'
  },
  {
    id: 'ismp-brasil-seguranca',
    category: 'seguranca_medicamentos',
    title: 'Portal de Práticas Seguras no Uso de Medicamentos',
    institution: 'ISMP Brasil - Instituto para Práticas Seguras no Uso de Medicamentos',
    scope: 'Centro Nacional de Prevenção de Erros de Medicação / Segurança do Paciente',
    year: 2022,
    description: 'Principal referência brasileira de segurança farmacotécnica e prevenção de incidentes graves. Disponibiliza recomendações, diretrizes de boas práticas na administração de fármacos em sondas e orientações gerais sobre formas orais sólidas que não devem ser trituradas ou partidas para preservar a estabilidade, a farmacocinética e evitar obstrução de sondas enterais.',
    appliedRules: [
      'Diretrizes de segurança na manipulação e administração de medicamentos por sondas enterais',
      'Preservação da integridade de formas de liberação prolongada, controlada e revestimento entérico',
      'Estratégias de prevenção de obstrução de dispositivos e erros de medicação hospitalares'
    ],
    link: 'https://www.ismp-brasil.org/',
    fullCitation: 'INSTITUTO PARA PRÁTICAS SEGURAS NO USO DE MEDICAMENTOS (ISMP BRASIL). Recomendações e Boas Práticas para Segurança no Uso e Administração de Medicamentos. Belo Horizonte: ISMP Brasil, 2022.'
  }
];
