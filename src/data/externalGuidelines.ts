export interface ExternalReference {
  id: string;
  category: 'nutricao_enteral' | 'nutricao_parenteral' | 'seguranca_medicamentos' | 'diluicao_injetaveis';
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
    id: 'rdc-63-2000-anvisa',
    category: 'nutricao_parenteral',
    title: 'Regulamento Técnico da Terapia de Nutrição Parenteral (TNP)',
    institution: 'ANVISA - Agência Nacional de Vigilância Sanitária',
    scope: 'Federal / Ministério da Saúde (Obrigatória em território nacional)',
    legalDocNumber: 'Resolução RDC nº 63/2000',
    year: 2000,
    description: 'Estabelece os requisitos mínimos para TNP em hospitais. Determina que a infusão da Nutrição Parenteral deve ocorrer por cateter venoso central com lúmen EXCLUSIVO, sendo terminantemente proibida a adição ou coinfusão em Y de medicamentos sem validação físico-química documentada de estabilidade e compatibilidade.',
    appliedRules: [
      'Alerta de Vigilância Ativa de NPT em Y',
      'Incompatibilidade de Ceftriaxona com NPT (risco de precipitação de ceftriaxona-cálcio)',
      'Incompatibilidade de Fenitoína, Ampicilina e Furosemida (alteração de pH e quebra de emulsão lipídica)'
    ],
    link: 'https://bvsms.saude.gov.br/bvs/saudelegis/anvisa/2000/rdc0063_06_07_2000.html',
    fullCitation: 'BRASIL. Ministério da Saúde. Agência Nacional de Vigilância Sanitária. Resolução RDC nº 63, de 6 de julho de 2000. Aprova o Regulamento Técnico para fixar os requisitos mínimos exigidos para a Terapia de Nutrição Parenteral. Diário Oficial da União, Brasília, DF, 7 jul. 2000.'
  },
  {
    id: 'braspen-sondas-2023',
    category: 'nutricao_enteral',
    title: 'Diretriz de Terapia Nutricional & Administração de Medicamentos por Sonda Enteral',
    institution: 'BRASPEN - Sociedade Brasileira de Nutrição Parenteral e Enteral',
    scope: 'Diretriz Clínica Nacional Multiprofissional',
    year: 2023,
    description: 'Padroniza as condutas de pausa de dieta enteral, técnica de flush (irrigação) com água filtrada/destilada (20 a 30 mL antes e após) e manejo de quelação mineral com micronutrientes presentes nas fórmulas industrializadas de nutrição enteral contínua.',
    appliedRules: [
      'Pausa de dieta enteral de 1-2h antes e após Fenitoína por SNE (quelação proteico-mineral e adsorção na sonda plástica)',
      'Pausa de dieta enteral de 1-2h antes e após Fluoroquinolonas (Ciprofloxacino / Levofloxacino) por quelação com cátions polivalentes (Ca²⁺, Mg²⁺, Fe³⁺, Al³⁺)',
      'Monitoramento de RNI e manejo da vitamina K na dieta enteral em pacientes em uso de Varfarina'
    ],
    link: 'https://braspen.org/',
    fullCitation: 'BRASPEN. Sociedade Brasileira de Nutrição Parenteral e Enteral. Diretriz BRASPEN de Terapia Nutricional no Paciente Hospitalizado e Guia de Administração de Medicamentos por Sonda. BRASPEN Journal, v. 38, supl. 2, 2023.'
  },
  {
    id: 'ismp-brasil-maceracao',
    category: 'seguranca_medicamentos',
    title: 'Guia de Boas Práticas: Medicamentos que Não Devem Ser Macerados ou Triturados',
    institution: 'ISMP Brasil - Instituto para Práticas Seguras no Uso de Medicamentos',
    scope: 'Segurança do Paciente / Farmácia Hospitalar',
    year: 2021,
    description: 'Alerta sobre formas farmacêuticas sólidas orais especiais (comprimidos e cápsulas de liberação modificada, revestimento entérico, drágeas e pellets). A trituração inativa o princípio ativo em meio ácido gástrico, destrói o mecanismo de liberação prolongada e provoca frequente obstrução mecânica de sondas nasoenterais.',
    appliedRules: [
      'Proibição de trituração de cápsulas/microgrânulos gastrorresistentes de Omeprazol e Pantoprazol via SNE',
      'Recomendação de transição para via parenteral (IV) ou formulação líquida tamponada com bicarbonato de sódio em pacientes com sonda enteral'
    ],
    link: 'https://www.ismp-brasil.org/',
    fullCitation: 'INSTITUTO PARA PRÁTICAS SEGURAS NO USO DE MEDICAMENTOS (ISMP BRASIL). Boletim ISMP Brasil: Medicamentos orais que não devem ser triturados ou abertos para administração por sondas. Belo Horizonte, 2021.'
  },
  {
    id: 'trissel-injectables',
    category: 'diluicao_injetaveis',
    title: 'Handbook on Injectable Drugs & King Guide to Parenteral Admixtures',
    institution: 'American Society of Health-System Pharmacists (ASHP)',
    scope: 'Compêndio Internacional de Compatibilidade Físico-Química e Estabilidade em Y',
    year: 2022,
    description: 'Estudos laboratoriais padronizados de compatibilidade em Y, turvação, precipitação macro e microscópica, alteração de pH e quebra de emulsões lipídicas de nutrição parenteral 2 em 1 e 3 em 1.',
    appliedRules: [
      'Incompatibilidade físico-química em Y de Ceftriaxona com sais de cálcio presentes na NPT',
      'Precipitação de fenitoína ácida e sais de diazepam em infusões parenterais contínuas'
    ],
    fullCitation: 'TRISSEL, L. A. Handbook on Injectable Drugs. 20. ed. Bethesda: American Society of Health-System Pharmacists (ASHP), 2022.'
  },
  {
    id: 'anvisa-alerta-prometazina',
    category: 'seguranca_medicamentos',
    title: 'Alerta de Farmacovigilância: Risco de Necrose Tecidual Severa com Prometazina Injetável',
    institution: 'ANVISA / FDA (Black Box Warning)',
    scope: 'Alerta Sanitário Regulatório e Farmacovigilância',
    year: 2018,
    description: 'A administração intravenosa de cloridrato de prometazina possui alto risco de dano endotelial químico, flebite, necrose tecidual e gangrena em casos de extravasamento perivenoso. A via intramuscular profunda é a única via parenteral preferencial.',
    appliedRules: [
      'Alerta de Caixa Preta e Risco Crítico para Prometazina por via IV',
      'Orientação de diluição em SF 0,9% (25-50 mL) e infusão lenta máxima de 25 mg/min se uso IV for estritamente inevitável'
    ],
    link: 'https://www.gov.br/anvisa/pt-br/assuntos/fiscalizacao-e-monitoramento/farmacovigilancia',
    fullCitation: 'BRASIL. Agência Nacional de Vigilância Sanitária (ANVISA). Alerta de Farmacovigilância: Cuidados na administração parenteral de Prometazina e risco de lesão tecidual severa. Brasília, DF: ANVISA, 2018.'
  }
];
