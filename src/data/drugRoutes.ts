import { AdminRoute } from '../types';

export interface DrugRouteConfig {
  availableRoutes: AdminRoute[];
  defaultRoute: AdminRoute;
  routeNotes?: Partial<Record<AdminRoute, string>>;
  nptIncompatibility?: {
    incompatible: boolean;
    reason: string;
  };
}

export const DRUG_ROUTE_REGISTRY: Record<string, DrugRouteConfig> = {
  // --- ANTIMICROBIANOS ---
  meropenem: {
    availableRoutes: ['IV'],
    defaultRoute: 'IV',
    routeNotes: {
      IV: 'Infundir preferencialmente em infusão estendida (3 a 4 horas) para otimizar tempo acima da MIC (T > MIC).'
    },
    nptIncompatibility: {
      incompatible: false,
      reason: 'Pode ser infundido com cautela se lúmen exclusivo indisponível; preferir lúmen separado para evitar degradação térmica.'
    }
  },
  ertapenem: {
    availableRoutes: ['IV', 'IM'],
    defaultRoute: 'IV',
    routeNotes: {
      IV: 'Diluir em SF 0,9% e infundir em 30 minutos.',
      IM: 'Reconstituir exclusivamente com lidocaína a 1% sem vasoconstritor para injeção IM profunda.'
    }
  },
  linezolida: {
    availableRoutes: ['IV', 'VO', 'SNE'],
    defaultRoute: 'IV',
    routeNotes: {
      IV: 'Proteger da luz se infusão prolongada. Infundir em 30 a 120 minutos.',
      VO: 'Excelente biodisponibilidade oral (~100%). Transição precoce IV -> VO recomendada.',
      SNE: 'Administrar grânulos/solução com boa tolerabilidade enteral; não requer pausa prolongada de dieta.'
    }
  },
  vancomicina: {
    availableRoutes: ['IV', 'VO', 'SNE'],
    defaultRoute: 'IV',
    routeNotes: {
      IV: 'Infundir lentamente a no máximo 10 mg/min (≥ 60 min para cada 1g) para evitar Síndrome do Homem Vermelho e hipotensão.',
      VO: 'Uso oral estritamente restrito ao tratamento de colite pseudomembranosa por Clostridioides difficile (não absorvida sistemicamente).',
      SNE: 'Diluir o frasco injetável de 500mg em água destilada e instilar via sonda na colite por C. difficile grave.'
    },
    nptIncompatibility: {
      incompatible: true,
      reason: 'Risco de precipitação física e instabilidade físico-química em Y com NPT rica em cálcio e fósforo. Usar lúmen exclusivo.'
    }
  },
  polimixina_b: {
    availableRoutes: ['IV'],
    defaultRoute: 'IV',
    routeNotes: {
      IV: 'Dose calculada em mg (10.000 UI = 1 mg). Infundir em 60 minutos diluído em SG 5% ou SF 0,9%.'
    }
  },
  amicacina: {
    availableRoutes: ['IV', 'IM'],
    defaultRoute: 'IV',
    routeNotes: {
      IV: 'Infundir em 30 a 60 minutos diluída em 100 mL de SF 0,9% ou SG 5%.',
      IM: 'Aplicar via IM profunda em massa muscular íntegra se acesso venoso inacessível.'
    },
    nptIncompatibility: {
      incompatible: true,
      reason: 'Aminoglicosídeos sofrem complexação e inativação parcial em soluções de aminoácidos concentradas e com sais minerais da NPT.'
    }
  },
  gentamicina: {
    availableRoutes: ['IV', 'IM'],
    defaultRoute: 'IV',
    routeNotes: {
      IV: 'Infundir em 30 a 60 minutos. Dose única diária recomendada em pacientes não neutropênicos.',
      IM: 'Injeção IM profunda em glúteo ou vasto lateral.'
    },
    nptIncompatibility: {
      incompatible: true,
      reason: 'Incompatibilidade físico-química e risco de precipitação com emulsões lipídicas de NPT.'
    }
  },
  cefepima: {
    availableRoutes: ['IV', 'IM'],
    defaultRoute: 'IV',
    routeNotes: {
      IV: 'Infundir em 30 minutos ou infusão estendida de 3-4 horas para otimizar PK/PD em infecções graves por Pseudomonas.'
    }
  },
  ceftriaxona: {
    availableRoutes: ['IV', 'IM'],
    defaultRoute: 'IV',
    routeNotes: {
      IV: 'Infundir em 30 minutos diluído em SF 0,9% ou SG 5%. NUNCA utilizar diluentes contendo cálcio (ex: Ringer Lactato).',
      IM: 'Reconstituir com lidocaína 1% sem vasoconstritor (apenas para via IM).'
    },
    nptIncompatibility: {
      incompatible: true,
      reason: 'CONTRAINDICAÇÃO ABSOLUTA: Ceftriaxona forma precipitados insolúveis de ceftriaxona-cálcio com os íons de cálcio da NPT, provocando êmbolos microcristalinos, dano pulmonar fatal e nefrolitíase obstrutiva aguda. Jamais coinfundir em Y.'
    }
  },
  cefazolina: {
    availableRoutes: ['IV', 'IM'],
    defaultRoute: 'IV',
    routeNotes: {
      IV: 'Bolus lento em 3-5 minutos ou infusão em 30 minutos. Profilaxia cirúrgica até 60 min antes da incisão.'
    }
  },
  ceftazidima_avibactam: {
    availableRoutes: ['IV'],
    defaultRoute: 'IV',
    routeNotes: {
      IV: 'Infundir em 2 horas diluído em 100 mL de SF 0,9% para patógenos KPC e Enterobacterales multirresistentes.'
    }
  },
  aztreonam: {
    availableRoutes: ['IV', 'IM'],
    defaultRoute: 'IV',
    routeNotes: {
      IV: 'Infundir em 20 a 60 minutos. Alternativa para alérgicos graves a penicilinas/cefalosporinas (não tem reação cruzada, exceto ceftazidima).'
    }
  },
  ceftazidima: {
    availableRoutes: ['IV', 'IM'],
    defaultRoute: 'IV',
    routeNotes: {
      IV: 'Infundir em 30 minutos ou infusão contínua em infecções graves por Pseudomonas aeruginosa.'
    }
  },
  ampicilina_sulbactam: {
    availableRoutes: ['IV', 'IM'],
    defaultRoute: 'IV',
    routeNotes: {
      IV: 'Diluir em SF 0,9% (estabilidade limitada a 8h em temperatura ambiente). Infundir em 30 a 60 minutos.'
    },
    nptIncompatibility: {
      incompatible: true,
      reason: 'Ampicilina sofre hidrólise e degradação química rápida em contato com aminoácidos e pH de soluções de NPT.'
    }
  },
  amoxicilina_clavulanato: {
    availableRoutes: ['VO', 'SNE', 'IV'],
    defaultRoute: 'VO',
    routeNotes: {
      VO: 'Administrar no início de uma refeição para reduzir desconforto gastrointestinal e náuseas.',
      SNE: 'Preferir a suspensão oral líquida; administrar pela sonda e lavar com 20-30 mL de água.',
      IV: 'Infundir lentamente em 30 a 40 minutos em SF 0,9% imediatamente após reconstituição.'
    }
  },
  piperacilina_tazobactam: {
    availableRoutes: ['IV'],
    defaultRoute: 'IV',
    routeNotes: {
      IV: 'Infundir em 30 minutos (convencional) ou infusão estendida em 4 horas (estratégia preferida em choque séptico/UTI).'
    },
    nptIncompatibility: {
      incompatible: false,
      reason: 'Evitar correr em Y com NPT sem flush prévio por variação de pH e estabilidade da emulsão.'
    }
  },
  ciprofloxacino: {
    availableRoutes: ['IV', 'VO', 'SNE'],
    defaultRoute: 'IV',
    routeNotes: {
      IV: 'Infundir lentamente em no mínimo 60 minutos em veia calibrosa para evitar flebite e queimação endotelial.',
      VO: 'Não ingerir concomitantemente com antiácidos, leite ou derivados lácteos (quelação por cátions polivalentes).',
      SNE: 'ALERTA DE QUELAÇÃO: Cátions polivalentes (cálcio, ferro, magnésio) da nutrição enteral contínua quelam o ciprofloxacino, reduzindo a biodisponibilidade em até 70%. Pausar a dieta 2h antes e 2h após a administração, ou preferir a via IV.'
    },
    nptIncompatibility: {
      incompatible: true,
      reason: 'Risco de precipitação de sais de fluoroquinolona com fosfatos e pH alcalino da NPT. Usar lúmen exclusivo.'
    }
  },
  levofloxacino: {
    availableRoutes: ['IV', 'VO', 'SNE'],
    defaultRoute: 'IV',
    routeNotes: {
      IV: 'Infundir 500mg em no mínimo 60 minutos (750mg em 90 minutos) para prevenir hipotensão postural e arritmia.',
      VO: 'Biodisponibilidade oral ~99%. Tomar em jejum ou 2h afastado de alimentos ricos em minerais/ferro.',
      SNE: 'Pausar dieta enteral por pelo menos 1-2 horas antes e depois da administração devido à quelação por cátions.'
    }
  },
  smx_tmp: {
    availableRoutes: ['IV', 'VO', 'SNE'],
    defaultRoute: 'IV',
    routeNotes: {
      IV: 'Diluição volumosa obrigatória: cada ampola de 5 mL (400+80mg) exige no mínimo 125 mL de SG 5% ou SF 0,9%. Não refrigerar.',
      VO: 'Tomar com copo cheio de água para prevenir cristalúria.',
      SNE: 'Preferir a suspensão oral pediátrica; diluir antes de instilar e lavar a sonda vigorosamente.'
    }
  },
  metronidazol: {
    availableRoutes: ['IV', 'VO', 'SNE'],
    defaultRoute: 'IV',
    routeNotes: {
      IV: 'Infundir bolsa pronta (500mg/100mL) em 30 a 60 minutos. Não requer refrigeração.',
      VO: 'Tomar com alimento para reduzir náuseas e gosto metálico.',
      SNE: 'Triturar comprimido ou usar suspensão de benzoilmetronidazol; lavar a sonda com 20 mL de água.'
    }
  },
  claritromicina: {
    availableRoutes: ['IV', 'VO', 'SNE'],
    defaultRoute: 'IV',
    routeNotes: {
      IV: 'Infundir 500mg diluídos em 250 mL de SF 0,9% ou SG 5% em no mínimo 60 minutos para evitar flebite intensa.',
      VO: 'Pode ser tomada com ou sem alimentos (comprimidos convencionais). Comprimidos de liberação prolongada (UD) não devem ser mastigados nem partidos.',
      SNE: 'Utilizar suspensão oral pediátrica; não triturar comprimidos de liberação prolongada.'
    }
  },
  azitromicina: {
    availableRoutes: ['IV', 'VO', 'SNE'],
    defaultRoute: 'IV',
    routeNotes: {
      IV: 'Infundir 500mg diluído em 250 ou 500 mL em no mínimo 60 minutos. NUNCA aplicar em bolus IV ou IM.',
      VO: 'Tomar em dose única diária.',
      SNE: 'Preferir suspensão oral reconstituída; administrar via sonda e irrigar com água.'
    }
  },
  daptomicina: {
    availableRoutes: ['IV'],
    defaultRoute: 'IV',
    routeNotes: {
      IV: 'Reconstituir com SF 0,9% (NUNCA diluir em SG 5% pois requer cálcio para atividade antimicrobiana). Infundir em 30 min ou injeção IV direta em 2 min.'
    }
  },
  tigeciclina: {
    availableRoutes: ['IV'],
    defaultRoute: 'IV',
    routeNotes: {
      IV: 'Dose de ataque 100mg seguida de 50mg a cada 12h. Infundir em 30 a 60 minutos diluída em SF 0,9% ou SG 5%.'
    }
  },
  rifampicina: {
    availableRoutes: ['VO', 'SNE', 'IV'],
    defaultRoute: 'VO',
    routeNotes: {
      VO: 'Tomar com estômago vazio (1h antes ou 2h após refeições) com copo cheio de água.',
      SNE: 'Pausar dieta enteral 1h antes e 1h depois da dose. Alerta para coloração alaranjada/avermelhada de urina, suor e secreções.',
      IV: 'Infundir em 2 a 3 horas diluída em 250-500 mL de SG 5% ou SF 0,9%.'
    }
  },
  isoniazida: {
    availableRoutes: ['VO', 'SNE'],
    defaultRoute: 'VO',
    routeNotes: {
      VO: 'Tomar em jejum, 1 hora antes ou 2 horas após refeições. Associar piridoxina (vitamina B6) em neuropatia.',
      SNE: 'Triturar comprimido e diluir em água destilada. Pausar a dieta 1h antes e 1h após.'
    }
  },
  pirazinamida: {
    availableRoutes: ['VO', 'SNE'],
    defaultRoute: 'VO',
    routeNotes: {
      VO: 'Tomar junto com refeição leve se houver desconforto gástrico.',
      SNE: 'Triturar comprimido e administrar pela sonda.'
    }
  },
  etambutol: {
    availableRoutes: ['VO', 'SNE'],
    defaultRoute: 'VO',
    routeNotes: {
      VO: 'Tomar em dose única diária, preferencialmente pela manhã.',
      SNE: 'Triturar e diluir em água.'
    }
  },

  // --- ANTIFÚNGICOS ---
  anfotericina_b: {
    availableRoutes: ['IV'],
    defaultRoute: 'IV',
    routeNotes: {
      IV: 'DILUIÇÃO EXCLUSIVA EM SG 5%: precipita imediatamente em SF 0,9% ou qualquer solução com cloreto/eletrólitos. Pré-medicação com antitérmico + anti-histamínico obrigatória.'
    },
    nptIncompatibility: {
      incompatible: true,
      reason: 'Precipita em contato com soluções salinas, cálcio e emulsões lipídicas de NPT. Jamais coinfundir em Y. Flushing rigoroso com SG 5% se mesmo lúmen.'
    }
  },
  anfotericina_desoxicolato: {
    availableRoutes: ['IV'],
    defaultRoute: 'IV',
    routeNotes: {
      IV: 'Infundir em SG 5% em 4 a 6 horas. Hidratação prévia com 500-1000 mL de SF 0,9% para nefroproteção.'
    },
    nptIncompatibility: {
      incompatible: true,
      reason: 'Incompatível com eletrólitos e macronutrientes da NPT. Precipita.'
    }
  },
  anfotericina_complexo_lipidico: {
    availableRoutes: ['IV'],
    defaultRoute: 'IV',
    routeNotes: {
      IV: 'Infundir em SG 5% com filtro de linha de 5 micras em 2 a 4 horas.'
    },
    nptIncompatibility: {
      incompatible: true,
      reason: 'Incompatível com NPT.'
    }
  },
  fluconazol: {
    availableRoutes: ['IV', 'VO', 'SNE'],
    defaultRoute: 'IV',
    routeNotes: {
      IV: 'Infundir em velocidade máxima de 200 mg/hora (bolsa de 200mg em no mínimo 60 minutos).',
      VO: 'Biodisponibilidade oral superior a 90%, independente da acidez gástrica ou alimentos.',
      SNE: 'Excelente absorção por sonda enteral; não requer pausa alimentar.'
    },
    nptIncompatibility: {
      incompatible: false,
      reason: 'Geralmente compatível em Y com algumas fórmulas padrão de NPT, porém recomenda-se lúmen próprio se emulsão lipídica concomitante.'
    }
  },
  itraconazol: {
    availableRoutes: ['VO', 'SNE'],
    defaultRoute: 'VO',
    routeNotes: {
      VO: 'Cápsulas requerem meio ácido gástrico (tomar imediatamente após refeição completa ou com bebida ácida). Não usar com antiácidos.',
      SNE: 'Absorção imprevisível por sonda enteral; não triturar microesferas de cápsulas.'
    }
  },
  voriconazol: {
    availableRoutes: ['IV', 'VO', 'SNE'],
    defaultRoute: 'IV',
    routeNotes: {
      IV: 'Infundir em velocidade de no máximo 3 mg/kg/h em 1 a 2 horas. Contraindicado em ClCr < 50 se formulação contiver ciclodextrina (SBECD).',
      VO: 'Tomar pelo menos 1 hora antes ou 1 hora após refeições (alimentos reduzem biodisponibilidade em 22%).',
      SNE: 'Pausar dieta enteral 1h antes e 1h depois da administração.'
    }
  },
  cetoconazol: {
    availableRoutes: ['VO'],
    defaultRoute: 'VO',
    routeNotes: {
      VO: 'Requer acidez gástrica para dissolução. Alto risco de hepatotoxicidade fulminante.'
    }
  },
  micafungina: {
    availableRoutes: ['IV'],
    defaultRoute: 'IV',
    routeNotes: {
      IV: 'Infundir em 60 minutos diluída em SF 0,9% ou SG 5%. Proteger o frasco da luz excessiva.'
    }
  },
  flucitosina: {
    availableRoutes: ['VO', 'IV'],
    defaultRoute: 'VO',
    routeNotes: {
      VO: 'Tomar as cápsulas aos poucos em 15 minutos para diminuir náuseas e vômitos.',
      IV: 'Infundir em 20 a 40 minutos em veia calibrosa.'
    }
  },

  // --- ANTICONVULSIVANTES ---
  fenitoina: {
    availableRoutes: ['IV', 'VO', 'SNE'],
    defaultRoute: 'IV',
    routeNotes: {
      IV: 'DILUIÇÃO EXCLUSIVA EM SF 0,9%: precipita em glicose/SG 5%. Infundir em velocidade máxima de 50 mg/min (25 mg/min em idosos/cardiopatas) sob monitorização de ECG e PA (risco de arritmias fatais e hipotensão severa). Lavar o acesso venoso com SF 0,9% antes e depois.',
      VO: 'Tomar com refeições para evitar desconforto gástrico. Cinética de saturação (Michaelis-Menten).',
      SNE: 'ALERTA CRÍTICO DE INTERAÇÃO COM DIETA ENTERAL: Proteínas e sais de cálcio da nutrição enteral adsorvem à fenitoína e à parede da sonda, reduzindo os níveis séricos em até 70% com descontrole convulsivo. Pausar a dieta 1-2h antes e 1-2h depois, lavar com 30 mL de água destilada, ou converter a prescrição para via IV.'
    },
    nptIncompatibility: {
      incompatible: true,
      reason: 'pH extremamente alcalino (~12) precipita na hora ao menor contato com soluções de NPT ou quebra a emulsão lipídica, obstruindo o cateter venoso central. Coinfusão em Y expressamente proibida.'
    }
  },
  carbamazepina: {
    availableRoutes: ['VO', 'SNE'],
    defaultRoute: 'VO',
    routeNotes: {
      VO: 'Tomar com alimentos. Evitar suco de toranja (grapefruit) por inibição do CYP3A4 com risco de toxicidade. Comprimidos de liberação controlada (CR) não devem ser mastigados nem macerados.',
      SNE: 'Utilizar suspensão oral diluída em partes iguais com água antes de instilar na sonda para evitar aderência ao PVC.'
    }
  },
  acido_valproico: {
    availableRoutes: ['VO', 'SNE', 'IV'],
    defaultRoute: 'VO',
    routeNotes: {
      VO: 'Comprimidos revestidos ou cápsulas gastrorresistentes devem ser engolidos inteiros com água.',
      SNE: 'Utilizar xarope oral ou solução de valproato sódico; irrigar a sonda com 20 mL de água.',
      IV: 'Infundir valproato sódico IV em 60 minutos diluído em SF 0,9% ou SG 5% (ou bolus rápido em 5-10 min em status epilepticus).'
    }
  },
  fenobarbital: {
    availableRoutes: ['IV', 'IM', 'VO', 'SNE'],
    defaultRoute: 'IV',
    routeNotes: {
      IV: 'Infundir lentamente a no máximo 60 mg/min (risco de colapso circulatório e apneia).',
      IM: 'Injeção IM profunda em glúteo.',
      VO: 'Administrar dose diária única à noite ao deitar.',
      SNE: 'Triturar comprimido ou usar gotas; lavar a sonda após administração.'
    }
  },
  levetiracetam: {
    availableRoutes: ['IV', 'VO', 'SNE'],
    defaultRoute: 'IV',
    routeNotes: {
      IV: 'Diluir em 100 mL de SF 0,9% ou SG 5% e infundir em 15 minutos.',
      VO: 'Comprimidos podem ser tomados com ou sem alimentos. Relação de conversão IV : VO é de 1 : 1.',
      SNE: 'Excelente absorção por sonda enteral (solução oral ou comprimido triturado).'
    }
  },
  lacosamida: {
    availableRoutes: ['IV', 'VO', 'SNE'],
    defaultRoute: 'IV',
    routeNotes: {
      IV: 'Infundir em 15 a 60 minutos sem necessidade de diluição adicional.',
      VO: 'Conversão oral e intravenosa de 1:1. Pode ser administrada com ou sem alimentos.',
      SNE: 'Utilizar xarope ou triturar comprimido simples; lavar a sonda com água.'
    }
  },

  // --- SEDATIVOS, ANESTÉSICOS E HIPNÓTICOS ---
  propofol: {
    availableRoutes: ['IV'],
    defaultRoute: 'IV',
    routeNotes: {
      IV: 'Emulsão lipídica: troca do equipo a cada 12 horas para evitar contaminação bacteriana. Contabilizar aporte calórico de 1,1 kcal/mL de lípides.'
    },
    nptIncompatibility: {
      incompatible: false,
      reason: 'Ambos são emulsões lipídicas, porém coinfusão em Y pode desestabilizar os glóbulos graxos. Recomenda-se lúmen exclusivo dedicado para sedação.'
    }
  },
  cetamina: {
    availableRoutes: ['IV', 'IM'],
    defaultRoute: 'IV',
    routeNotes: {
      IV: 'Infundir lentamente em no mínimo 60 segundos para evitar apneia transitória e depressão respiratória.',
      IM: 'Dose de 4 a 10 mg/kg para sedação rápida/contenção química de emergência.'
    }
  },
  etomidato: {
    availableRoutes: ['IV'],
    defaultRoute: 'IV',
    routeNotes: {
      IV: 'Bolus lento em 30 a 60 segundos em veia calibrosa (minimiza dor endotelial e mioclonias). Infusão contínua contraindicada por supressão adrenal.'
    }
  },
  tiopental: {
    availableRoutes: ['IV'],
    defaultRoute: 'IV',
    routeNotes: {
      IV: 'ALERTA DE SEGURANÇA VASCULAR: Solução fortemente alcalina (pH 10-11). Risco de necrose tecidual e esfacelamento se extravasamento, ou gangrena se injeção intra-arterial acidental. Administrar exclusivamente em veia central ou acesso periférico calibroso calçado.'
    },
    nptIncompatibility: {
      incompatible: true,
      reason: 'Alcalinidade extrema desestabiliza imediatamente a emulsão da NPT e precipita componentes protéicos.'
    }
  },
  dexmedetomidina: {
    availableRoutes: ['IV'],
    defaultRoute: 'IV',
    routeNotes: {
      IV: 'Diluir em SF 0,9% (concentração padrão 4 mcg/mL). Infundir em bomba de infusão contínua; evitar bolus rápido para prevenir bradicardia severa e assistolia.'
    }
  },
  midazolam: {
    availableRoutes: ['IV', 'IM', 'VO'],
    defaultRoute: 'IV',
    routeNotes: {
      IV: 'Titular lentamente em bolus fracionados ou infusão contínua em UTI. Suporte de oxigênio e aspiração obrigatórios.',
      IM: 'Excelente e rápida absorção no deltoide ou glúteo (pico em 15-30 min).',
      VO: 'Xarope ou comprimido utilizado em pré-medicação ansiolítica pré-operatória.'
    }
  },
  diazepam: {
    availableRoutes: ['IV', 'VO', 'SNE', 'IM'],
    defaultRoute: 'IV',
    routeNotes: {
      IV: 'Injeção IV lenta (máx 5 mg/min) em veia calibrosa. Não misturar com outras drogas nem diluir em soluções salinas (precipita com turbidez).',
      VO: 'Tomar com água.',
      SNE: 'Pode ser administrado triturado, mas adsorve substancialmente às paredes de tubos plásticos de PVC da sonda.',
      IM: 'Absorção intramuscular errática e dolorosa; via IM desaconselhada.'
    }
  },
  eszopiclona: {
    availableRoutes: ['VO'],
    defaultRoute: 'VO',
    routeNotes: {
      VO: 'Tomar imediatamente antes de deitar com estômago vazio (alimentos ricos em gordura retardam o início do sono).'
    }
  },
  zolpidem: {
    availableRoutes: ['VO'],
    defaultRoute: 'VO',
    routeNotes: {
      VO: 'Tomar imediatamente antes de se deitar na cama (início ultrarrápido em 15-30 min). Nunca tomar se não houver previsão de 7-8 horas completas de sono.'
    }
  },

  // --- REVERSORES E ANTÍDOTOS ---
  flumazenil: {
    availableRoutes: ['IV'],
    defaultRoute: 'IV',
    routeNotes: {
      IV: 'Injetar em bolus IV em 15 segundos. Monitorar risco de convulsões se usuário crônico de benzodiazepínicos ou uso concomitante de tricíclicos.'
    }
  },
  naloxona: {
    availableRoutes: ['IV', 'IM', 'SC'],
    defaultRoute: 'IV',
    routeNotes: {
      IV: 'Via preferencial em PCR ou apneia severa. Diluir 1 ampola (0,4mg) em 9 mL de SF 0,9% e titular alíquotas de 1 a 2 mL a cada 2-3 minutos.',
      IM: 'Via alternativa se acesso venoso periférico inacessível.',
      SC: 'Absorção ligeiramente mais lenta que IM; útil se sem acesso venoso.'
    }
  },

  // --- BLOQUEADORES NEUROMUSCULARES (BNMs) ---
  succinilcolina: {
    availableRoutes: ['IV', 'IM'],
    defaultRoute: 'IV',
    routeNotes: {
      IV: 'Bolus IV direto para intubação em sequência rápida. Sedação profunda e hipnose prévias são obrigatórias.',
      IM: 'Dose de 3 a 4 mg/kg IM profunda em lactentes/crianças sem acesso venoso em emergência de via aérea.'
    }
  },
  rocuronio: {
    availableRoutes: ['IV'],
    defaultRoute: 'IV',
    routeNotes: {
      IV: 'Bolus IV direto em sequência rápida (1,0 a 1,2 mg/kg) ou 0,6 mg/kg em intubação eletiva. Titular manutenção por TOF.'
    }
  },
  vecuronio: {
    availableRoutes: ['IV'],
    defaultRoute: 'IV',
    routeNotes: {
      IV: 'Injetar bolus IV após reconstituição com água para injetáveis. Titular por TOF.'
    }
  },
  atracurio: {
    availableRoutes: ['IV'],
    defaultRoute: 'IV',
    routeNotes: {
      IV: 'Injetar lentamente em mais de 60 segundos para minimizar liberação sistêmica de histamina, rubor e broncoespasmo.'
    }
  },
  cisatracurio: {
    availableRoutes: ['IV'],
    defaultRoute: 'IV',
    routeNotes: {
      IV: 'Infundir em bolus ou infusão contínua em SF 0,9% ou SG 5%. Não libera histamina. Titular estritamente por TOF.'
    }
  },

  // --- OPIOIDES E ANALGÉSICOS ---
  morfina: {
    availableRoutes: ['IV', 'SC', 'VO', 'SNE'],
    defaultRoute: 'IV',
    routeNotes: {
      IV: 'Diluir em SF 0,9% (ex: 1 ampola 10mg + 9 mL SF = 1 mg/mL) e titular alíquotas de 2 a 4 mg lentamente.',
      SC: 'Excelente alternativa para analgesia e cuidados paliativos sem acesso venoso (relação 1:1 com IV).',
      VO: 'Comprimidos de liberação prolongada não devem ser mastigados nem triturados. Solução oral para resgate.',
      SNE: 'Utilizar solução oral de sulfato de morfina.'
    }
  },
  fentanil: {
    availableRoutes: ['IV'],
    defaultRoute: 'IV',
    routeNotes: {
      IV: 'Potência 50-100x maior que morfina. Infundir bolus lentamente em 1 a 2 minutos para evitar tórax rígido (rigidez torácica da musculatura respiratória).'
    }
  },
  metadona: {
    availableRoutes: ['VO', 'SNE'],
    defaultRoute: 'VO',
    routeNotes: {
      VO: 'Meia-vida bifásica longa e acúmulo tecidual. Ajustes posológicos espaçados em 5 a 7 dias.',
      SNE: 'Comprimidos podem ser triturados e diluídos em água destilada para administração via sonda.'
    }
  },
  tramadol: {
    availableRoutes: ['IV', 'IM', 'VO', 'SNE'],
    defaultRoute: 'IV',
    routeNotes: {
      IV: 'Diluir em 100 mL de SF 0,9% e infundir em 20 a 30 minutos (bolus rápido causa náuseas e vômitos intensos).',
      IM: 'Injeção intramuscular profunda.',
      VO: 'Gotas ou cápsulas com água.',
      SNE: 'Gotas orais são ideais para instilação em sonda.'
    }
  },

  // --- ANTIEMÉTICOS E PRÓ-CINÉTICOS ---
  metoclopramida: {
    availableRoutes: ['IV', 'VO', 'SNE', 'IM'],
    defaultRoute: 'IV',
    routeNotes: {
      IV: 'Infundir lentamente em no mínimo 3 minutos (bolus rápido gera ansiedade aguda intensa, acatisia e agitação motora).',
      VO: 'Tomar 30 minutos antes das refeições.',
      SNE: 'Solução oral líquida ou gotas instiladas na sonda.',
      IM: 'Injeção intramuscular profunda.'
    }
  },
  bromoprida: {
    availableRoutes: ['IV', 'VO', 'SNE', 'IM'],
    defaultRoute: 'IV',
    routeNotes: {
      IV: 'Infundir em injeção lenta em 2 a 3 minutos diluída em SF 0,9%.',
      VO: 'Tomar antes das principais refeições.',
      SNE: 'Preferir gotas orais instiladas na sonda.',
      IM: 'Injeção IM profunda.'
    }
  },
  ondansetrona: {
    availableRoutes: ['IV', 'VO', 'SNE', 'IM'],
    defaultRoute: 'IV',
    routeNotes: {
      IV: 'Infundir em no mínimo 2 a 5 minutos (ou diluído em 50 mL de SF em 15 min).',
      VO: 'Comprimidos orodispersíveis colocados sobre a língua sem água.',
      SNE: 'Comprimidos triturados e diluídos em água.'
    }
  },
  domperidona: {
    availableRoutes: ['VO', 'SNE'],
    defaultRoute: 'VO',
    routeNotes: {
      VO: 'Tomar 15 a 30 minutos antes das refeições (via parenteral proibida por risco de arritmias ventriculares fatais).',
      SNE: 'Utilizar suspensão oral pela sonda.'
    }
  },

  // --- ANTI-HISTAMÍNICOS ---
  prometazina: {
    availableRoutes: ['IM', 'IV', 'VO'],
    defaultRoute: 'IM',
    routeNotes: {
      IM: 'VIA PREFERENCIAL ABSOLUTA: injeção IM profunda em glúteo para evitar qualquer extravasamento.',
      IV: 'ALERTA DE CAIXA PRETA ANVISA/FDA: Altíssimo risco de lesão tecidual necrosante, tromboflebite química severa, gangrena e amputação de membros por extravasamento ou punção intra-arterial acidental. Se via IV inevitável: diluir obrigatoriamente em 25-50 mL de SF 0,9%, administrar em veia calibrosa com fluxo desimpedido comprovado e velocidade máxima de 25 mg/min.',
      VO: 'Comprimidos tomados com água às refeições ou antes de deitar.'
    }
  },
  difenidramina: {
    availableRoutes: ['IV', 'IM', 'VO', 'SNE'],
    defaultRoute: 'IV',
    routeNotes: {
      IV: 'Injetar lentamente a no máximo 25 mg/min para reduzir risco de hipotensão e tontura intensa.',
      IM: 'Injeção IM profunda.',
      VO: 'Comprimidos com água.',
      SNE: 'Triturar comprimido e irrigar a sonda.'
    }
  },
  dimenidrinato: {
    availableRoutes: ['IV', 'IM', 'VO', 'SNE'],
    defaultRoute: 'IV',
    routeNotes: {
      IV: 'Diluir cada ampola de 50mg em no mínimo 10 mL de SF 0,9% e injetar em no mínimo 2 minutos.',
      IM: 'Injeção IM profunda.',
      VO: 'Tomar 30 minutos antes de viagens ou procedimentos.',
      SNE: 'Solução oral ou gotas instiladas na sonda.'
    }
  },
  dexclorfeniramina: {
    availableRoutes: ['VO', 'SNE'],
    defaultRoute: 'VO',
    routeNotes: {
      VO: 'Tomar às refeições com copo de água.',
      SNE: 'Solução oral ou xarope instilado na sonda.'
    }
  },

  // --- CARDIOVASCULARES, VASOPRESSORES E ANTI-HIPERTENSIVOS ---
  noradrenalina: {
    availableRoutes: ['IV'],
    defaultRoute: 'IV',
    routeNotes: {
      IV: 'ADMINISTRAÇÃO EXCLUSIVA EM ACESSO VENOSO CENTRAL (CVC) em bomba de infusão contínua. Diluir preferencialmente em SG 5% para prevenir oxidação. Se periférico de emergência temporário, usar veia calibrosa de fossa antecubital com monitorização estrita contra extravasamento (risco de necrose isquêmica).'
    }
  },
  nitroprussiato: {
    availableRoutes: ['IV'],
    defaultRoute: 'IV',
    routeNotes: {
      IV: 'DILUIÇÃO EXCLUSIVA EM SG 5%. EQUIPO E FRASCO FOTOPROTETORES OBRIGATÓRIOS (a luz decompõe a droga em cianeto). Infusão contínua em CVC ou PAI.'
    }
  },
  nitroglicerina: {
    availableRoutes: ['IV'],
    defaultRoute: 'IV',
    routeNotes: {
      IV: 'UTILIZAR EQUIPO DE POLIETILENO / NÃO-PVC: a nitroglicerina é adsorvida pelas paredes de equipos comuns de PVC, reduzindo drasticamente a dose entregue.'
    }
  },
  amiodarona: {
    availableRoutes: ['IV', 'VO', 'SNE'],
    defaultRoute: 'IV',
    routeNotes: {
      IV: 'DILUIÇÃO EXCLUSIVA EM SG 5%: soluções salinas (SF 0,9%) causam precipitação física. Infusões contínuas > 1 hora requerem acesso venoso central (CVC) devido ao alto risco de flebite química severa periférica.',
      VO: 'Tomar com alimentos para minimizar náuseas e otimizar absorção. Evitar suco de toranja (grapefruit).',
      SNE: 'Triturar comprimido e diluir em água.'
    }
  },
  hidralazina: {
    availableRoutes: ['IV', 'VO', 'SNE'],
    defaultRoute: 'VO',
    routeNotes: {
      IV: 'Infundir lentamente em no mínimo 1 minuto diluída em SF 0,9%. Repetir com intervalo mínimo de 20-30 min.',
      VO: 'Tomar com água às refeições.',
      SNE: 'Triturar comprimido e irrigar a sonda.'
    }
  },
  clonidina: {
    availableRoutes: ['VO', 'SNE'],
    defaultRoute: 'VO',
    routeNotes: {
      VO: 'Tomar com água. Nunca suspender abruptamente devido ao risco de crise hipertensiva rebote fatal.',
      SNE: 'Triturar comprimido e diluir em água.'
    }
  },
  furosemida: {
    availableRoutes: ['IV', 'VO', 'SNE', 'IM'],
    defaultRoute: 'IV',
    routeNotes: {
      IV: 'Infundir em velocidade máxima de 4 mg/min (bolus rápido de altas doses causa ototoxicidade e surdez transitória ou permanente). Solução fotossensível.',
      VO: 'Tomar pela manhã em jejum.',
      SNE: 'Administrar solução oral ou comprimido triturado pela sonda.'
    },
    nptIncompatibility: {
      incompatible: true,
      reason: 'Furosemida tem pH alcalino e precipita imediatamente em contato com soluções ácidas de NPT ou cálcio/magnésio.'
    }
  },
  espironolactona: {
    availableRoutes: ['VO', 'SNE'],
    defaultRoute: 'VO',
    routeNotes: {
      VO: 'Tomar pela manhã junto ao café da manhã ou almoço.',
      SNE: 'Triturar comprimido e lavar a sonda.'
    }
  },
  hidroclorotiazida: {
    availableRoutes: ['VO', 'SNE'],
    defaultRoute: 'VO',
    routeNotes: {
      VO: 'Tomar pela manhã para evitar noctúria.',
      SNE: 'Triturar comprimido e instilar na sonda.'
    }
  },
  clortalidona: {
    availableRoutes: ['VO', 'SNE'],
    defaultRoute: 'VO',
    routeNotes: {
      VO: 'Tomar pela manhã com água.',
      SNE: 'Triturar comprimido.'
    }
  },
  indapamida: {
    availableRoutes: ['VO', 'SNE'],
    defaultRoute: 'VO',
    routeNotes: {
      VO: 'Comprimidos de liberação prolongada (SR) não devem ser mastigados.',
      SNE: 'Preferir formulação convencional se administrado por sonda.'
    }
  },
  losartana: {
    availableRoutes: ['VO', 'SNE'],
    defaultRoute: 'VO',
    routeNotes: {
      VO: 'Tomar no mesmo horário diariamente, independente das refeições.',
      SNE: 'Triturar comprimido e diluir em água.'
    }
  },
  olmesartana: {
    availableRoutes: ['VO', 'SNE'],
    defaultRoute: 'VO',
    routeNotes: {
      VO: 'Tomar 1x ao dia.',
      SNE: 'Triturar e diluir em água.'
    }
  },
  valsartana: {
    availableRoutes: ['VO', 'SNE'],
    defaultRoute: 'VO',
    routeNotes: {
      VO: 'Tomar com ou sem alimentos.',
      SNE: 'Triturar e irrigar a sonda.'
    }
  },
  telmisartana: {
    availableRoutes: ['VO', 'SNE'],
    defaultRoute: 'VO',
    routeNotes: {
      VO: 'Comprimidos higroscópicos (retirar da embalagem apenas no momento do uso).',
      SNE: 'Triturar e administrar imediatamente.'
    }
  },
  candesartana: {
    availableRoutes: ['VO', 'SNE'],
    defaultRoute: 'VO',
    routeNotes: {
      VO: 'Tomar 1x ao dia.',
      SNE: 'Triturar comprimido.'
    }
  },
  captopril: {
    availableRoutes: ['VO', 'SNE'],
    defaultRoute: 'VO',
    routeNotes: {
      VO: 'Tomar com estômago vazio (1 hora antes ou 2 horas após refeições) pois alimentos reduzem absorção em 30-40%.',
      SNE: 'Pausar dieta enteral 1h antes da dose. Triturar e diluir em água.'
    }
  },
  enalapril: {
    availableRoutes: ['VO', 'SNE'],
    defaultRoute: 'VO',
    routeNotes: {
      VO: 'Tomar com água, independente de refeições.',
      SNE: 'Triturar e lavar a sonda.'
    }
  },
  lisinopril: {
    availableRoutes: ['VO', 'SNE'],
    defaultRoute: 'VO',
    routeNotes: {
      VO: 'Tomar 1x ao dia.',
      SNE: 'Triturar comprimido.'
    }
  },
  ramipril: {
    availableRoutes: ['VO', 'SNE'],
    defaultRoute: 'VO',
    routeNotes: {
      VO: 'Cápsulas com água.',
      SNE: 'Abrir a cápsula, dissolver o pó em água e instilar.'
    }
  },
  atenolol: {
    availableRoutes: ['VO', 'SNE'],
    defaultRoute: 'VO',
    routeNotes: {
      VO: 'Tomar preferencialmente pela manhã.',
      SNE: 'Triturar comprimido e irrigar a sonda.'
    }
  },
  bisoprolol: {
    availableRoutes: ['VO', 'SNE'],
    defaultRoute: 'VO',
    routeNotes: {
      VO: 'Tomar pela manhã com ou sem alimentos.',
      SNE: 'Triturar comprimido e diluir em água.'
    }
  },
  nebivolol: {
    availableRoutes: ['VO', 'SNE'],
    defaultRoute: 'VO',
    routeNotes: {
      VO: 'Tomar no mesmo horário todos os dias.',
      SNE: 'Triturar comprimido.'
    }
  },
  metoprolol: {
    availableRoutes: ['IV', 'VO', 'SNE'],
    defaultRoute: 'VO',
    routeNotes: {
      IV: 'Infundir lentamente a 1 a 2 mg/min (máx 5mg por dose) sob monitorização de ECG e PA.',
      VO: 'Succinato (liberação prolongada): não mastigar nem triturar. Tartarato (ação imediata): tomar junto às refeições.',
      SNE: 'Utilizar tartarato de metoprolol triturado (evitar succinato de liberação controlada na sonda).'
    }
  },
  carvedilol: {
    availableRoutes: ['VO', 'SNE'],
    defaultRoute: 'VO',
    routeNotes: {
      VO: 'Tomar sempre junto a uma refeição para desacelerar a taxa de absorção e reduzir risco de hipotensão postural.',
      SNE: 'Triturar comprimido e administrar pela sonda.'
    }
  },
  propranolol: {
    availableRoutes: ['IV', 'VO', 'SNE'],
    defaultRoute: 'VO',
    routeNotes: {
      IV: 'Infundir lentamente a 1 mg/min (dose usual de 1 a 3 mg) sob monitorização contínua de ECG e PA.',
      VO: 'Tomar antes de refeições.',
      SNE: 'Triturar comprimido e diluir em água.'
    }
  },
  anlodipino: {
    availableRoutes: ['VO', 'SNE'],
    defaultRoute: 'VO',
    routeNotes: {
      VO: 'Tomar com água, independente de refeições.',
      SNE: 'Triturar comprimido e lavar a sonda com 20 mL de água.'
    }
  },
  nifedipino: {
    availableRoutes: ['VO', 'SNE'],
    defaultRoute: 'VO',
    routeNotes: {
      VO: 'Comprimidos retard ou OROS não devem ser partidos nem mastigados. NUNCA administrar nifedipino sublingual de ação rápida por risco de AVC e IAM.',
      SNE: 'Formulação OROS contraindicada em sonda; se inevitável, usar formulação não-retard triturada com monitorização estrita de PA.'
    }
  },
  verapamil: {
    availableRoutes: ['IV', 'VO', 'SNE'],
    defaultRoute: 'VO',
    routeNotes: {
      IV: 'Injeção lenta em 2 a 3 minutos sob ECG contínuo. Contraindicado em insuficiência cardíaca descompensada.',
      VO: 'Tomar com alimentos.',
      SNE: 'Não triturar formulações de liberação prolongada.'
    }
  },
  diltiazem: {
    availableRoutes: ['IV', 'VO', 'SNE'],
    defaultRoute: 'VO',
    routeNotes: {
      IV: 'Infundir em bolus inicial seguido de infusão contínua em SF ou SG.',
      VO: 'Tomar antes das refeições.',
      SNE: 'Triturar comprimido convencional.'
    }
  },
  propafenona: {
    availableRoutes: ['VO', 'SNE'],
    defaultRoute: 'VO',
    routeNotes: {
      VO: 'Tomar após refeições com água.',
      SNE: 'Triturar e diluir em água.'
    }
  },
  sotalol: {
    availableRoutes: ['VO', 'SNE'],
    defaultRoute: 'VO',
    routeNotes: {
      VO: 'Tomar com estômago vazio (1h antes ou 2h depois das refeições).',
      SNE: 'Pausar dieta enteral 1h antes e depois.'
    }
  },
  digoxina: {
    availableRoutes: ['IV', 'VO', 'SNE'],
    defaultRoute: 'VO',
    routeNotes: {
      IV: 'Infundir lentamente em no mínimo 5 minutos (preferir diluir em 50 mL de SF 0,9% e correr em 15 min).',
      VO: 'Tomar no mesmo horário diariamente. Evitar tomar junto a alimentos ricos em fibras não solúveis.',
      SNE: 'Utilizar elixir/solução oral ou triturar comprimido simples; lavar a sonda com água.'
    }
  },

  // --- ESTATINAS E HIPOLIPEMIANTES ---
  sinvastatina: {
    availableRoutes: ['VO', 'SNE'],
    defaultRoute: 'VO',
    routeNotes: {
      VO: 'Tomar 1x ao dia à noite (pico da síntese de colesterol hepático na madrugada).',
      SNE: 'Triturar comprimido e instilar na sonda à noite.'
    }
  },
  atorvastatina: {
    availableRoutes: ['VO', 'SNE'],
    defaultRoute: 'VO',
    routeNotes: {
      VO: 'Pode ser tomada a qualquer hora do dia (meia-vida longa de 14h com metabólitos ativos).',
      SNE: 'Triturar e diluir em água.'
    }
  },
  rosuvastatina: {
    availableRoutes: ['VO', 'SNE'],
    defaultRoute: 'VO',
    routeNotes: {
      VO: 'Tomar a qualquer hora do dia com ou sem alimentos.',
      SNE: 'Triturar comprimido e administrar pela sonda.'
    }
  },
  ezetimiba: {
    availableRoutes: ['VO', 'SNE'],
    defaultRoute: 'VO',
    routeNotes: {
      VO: 'Tomar no mesmo horário todos os dias.',
      SNE: 'Triturar e lavar a sonda.'
    }
  },
  fenofibrato: {
    availableRoutes: ['VO', 'SNE'],
    defaultRoute: 'VO',
    routeNotes: {
      VO: 'Tomar sempre junto com uma refeição principal (a absorção depende da presença de alimentos).',
      SNE: 'Triturar e administrar pela sonda imediatamente antes ou durante a dieta.'
    }
  },

  // --- ANTIDIABÉTICOS ---
  metformina: {
    availableRoutes: ['VO', 'SNE'],
    defaultRoute: 'VO',
    routeNotes: {
      VO: 'Tomar durante ou após as refeições para diminuir efeitos colaterais gastrointestinais (diarreia, cólica). Formulações XR não devem ser mastigadas nem partidas.',
      SNE: 'Utilizar apenas formulação de liberação imediata triturada (nunca triturar formulação XR na sonda).'
    }
  },
  dapagliflozina: {
    availableRoutes: ['VO', 'SNE'],
    defaultRoute: 'VO',
    routeNotes: {
      VO: 'Tomar pela manhã com ou sem alimentos.',
      SNE: 'Triturar e administrar pela sonda.'
    }
  },
  empagliflozina: {
    availableRoutes: ['VO', 'SNE'],
    defaultRoute: 'VO',
    routeNotes: {
      VO: 'Tomar 1x ao dia pela manhã.',
      SNE: 'Triturar comprimido e lavar a sonda.'
    }
  },
  glibenclamida: {
    availableRoutes: ['VO', 'SNE'],
    defaultRoute: 'VO',
    routeNotes: {
      VO: 'Tomar imediatamente antes do café da manhã ou da primeira refeição principal do dia.',
      SNE: 'Triturar e instilar na sonda antes do início da dieta enteral.'
    }
  },
  gliclazida: {
    availableRoutes: ['VO', 'SNE'],
    defaultRoute: 'VO',
    routeNotes: {
      VO: 'Tomar com o café da manhã. Comprimidos de liberação modificada (MR) devem ser engolidos inteiros sem mastigar.',
      SNE: 'Comprimidos MR não devem ser triturados na sonda.'
    }
  },
  sitagliptina: {
    availableRoutes: ['VO', 'SNE'],
    defaultRoute: 'VO',
    routeNotes: {
      VO: 'Tomar 1x ao dia com ou sem alimentos.',
      SNE: 'Triturar comprimido e diluir em água.'
    }
  },
  linagliptina: {
    availableRoutes: ['VO', 'SNE'],
    defaultRoute: 'VO',
    routeNotes: {
      VO: 'Tomar 1x ao dia.',
      SNE: 'Triturar comprimido e administrar.'
    }
  },
  saxagliptina: {
    availableRoutes: ['VO', 'SNE'],
    defaultRoute: 'VO',
    routeNotes: {
      VO: 'Tomar 1x ao dia.',
      SNE: 'Triturar e diluir em água.'
    }
  },

  // --- ANTICOAGULANTES E ANTIAGREGANTES ---
  enoxaparina: {
    availableRoutes: ['SC', 'IV'],
    defaultRoute: 'SC',
    routeNotes: {
      SC: 'VIA PADRÃO: injeção subcutânea profunda na parede abdominal anterolateral ou posterolateral. Não expelir a bolha de ar da seringa preenchida. Não massagear após injeção.',
      IV: 'VIA RESTRITA A BÓLUS DE ATAQUE EM SCA: apenas no infarto agudo do miocárdio com supra de ST (bolus IV de 30mg concomitante à primeira dose SC).'
    }
  },
  rivaroxabana: {
    availableRoutes: ['VO', 'SNE'],
    defaultRoute: 'VO',
    routeNotes: {
      VO: 'Doses de 15mg e 20mg DEVEM ser tomadas obrigatoriamente junto com alimentos para garantir absorção completa. A dose de 10mg pode ser tomada com ou sem alimentos.',
      SNE: 'Comprimido de 15mg ou 20mg triturado e suspenso em 50 mL de água deve ser administrado pela sonda seguido imediatamente de alimentação enteral.'
    }
  },
  varfarina: {
    availableRoutes: ['VO', 'SNE'],
    defaultRoute: 'VO',
    routeNotes: {
      VO: 'Tomar no final da tarde ou início da noite (facilita ajuste com o resultado do RNI coletado pela manhã).',
      SNE: 'ALERTA DE DIETA ENTERAL: Fórmulas de nutrição enteral contínua ricas em vitamina K antagonizam o efeito e a varfarina adsorve nas paredes da sonda plástica. Manter taxa de infusão da dieta rigorosamente estável e monitorar RNI com maior frequência.'
    }
  },

  // --- PROTETORES GÁSTRICOS ---
  omeprazol: {
    availableRoutes: ['IV', 'VO', 'SNE'],
    defaultRoute: 'IV',
    routeNotes: {
      IV: 'Infundir frasco injetável reconstituído com o diluente próprio em no mínimo 20 a 30 minutos em SF ou SG.',
      VO: 'Tomar pela manhã em jejum, 30 a 60 minutos antes da primeira refeição. Engolir cápsula inteira com água.',
      SNE: 'ALERTA DE SONDA ENTERAL: As cápsulas contêm microgrânulos gastrorresistentes que NUNCA devem ser triturados ou macerados (o ácido estomacal inativa o omeprazol e grânulos triturados entopem a sonda). Em pacientes com sonda, preferir a via IV hospitalar ou dissolver microgrânulos intactos em bicarbonato de sódio a 8,4% conforme protocolo farmacêutico.'
    }
  },
  pantoprazol: {
    availableRoutes: ['IV', 'VO', 'SNE'],
    defaultRoute: 'IV',
    routeNotes: {
      IV: 'Injetar em bolus lento em 2 a 15 minutos ou infusão contínua em hemorragia digestiva alta.',
      VO: 'Tomar em jejum pela manhã.',
      SNE: 'Comprimidos revestidos não devem ser mastigados nem partidos. Em pacientes com sonda enteral, a via IV hospitalar é fortemente recomendada.'
    },
    nptIncompatibility: {
      incompatible: true,
      reason: 'Incompatível com soluções ácidas de NPT; risco de precipitação em Y. Reservar via exclusiva.'
    }
  },

  // --- CORTICOIDES ---
  prednisona: {
    availableRoutes: ['VO', 'SNE'],
    defaultRoute: 'VO',
    routeNotes: {
      VO: 'Tomar pela manhã com alimentos para diminuir irritação gástrica e mimetizar o ciclo circadiano do cortisol.',
      SNE: 'Triturar comprimido e irrigar a sonda com 20 mL de água.'
    }
  },
  prednisolona: {
    availableRoutes: ['VO', 'SNE'],
    defaultRoute: 'VO',
    routeNotes: {
      VO: 'Tomar pela manhã.',
      SNE: 'Utilizar solução oral pela sonda.'
    }
  },
  metilprednisolona: {
    availableRoutes: ['IV', 'IM'],
    defaultRoute: 'IV',
    routeNotes: {
      IV: 'Infundir lentamente (doses altas de pulsoterapia em no mínimo 30 a 60 minutos sob monitorização cardíaca por risco de arritmias e parada cardíaca).',
      IM: 'Injeção intramuscular profunda.'
    }
  },
  dexametasona: {
    availableRoutes: ['IV', 'IM', 'VO', 'SNE'],
    defaultRoute: 'IV',
    routeNotes: {
      IV: 'Injetar lentamente em 2 a 5 minutos ou diluído em SF/SG.',
      IM: 'Injeção IM profunda.',
      VO: 'Tomar pela manhã junto às refeições.',
      SNE: 'Elixir ou comprimido triturado administrado pela sonda.'
    }
  },
  hidrocortisona: {
    availableRoutes: ['IV', 'IM'],
    defaultRoute: 'IV',
    routeNotes: {
      IV: 'Infundir em bolus lento ou infusão contínua em choque séptico refratário.',
      IM: 'Injeção IM profunda de emergência.'
    }
  },
  betametasona: {
    availableRoutes: ['IM', 'IV'],
    defaultRoute: 'IM',
    routeNotes: {
      IM: 'Injeção IM profunda em glúteo (maturação pulmonar fetal).'
    }
  },
  budesonida: {
    availableRoutes: ['INAL', 'VO'],
    defaultRoute: 'INAL',
    routeNotes: {
      INAL: 'Inalação oral/nasal. Enxaguar a boca com água e cuspir após inalação para prevenir candidíase oral (sapinho) e disfonia.',
      VO: 'Cápsulas de liberação ileal engolidas inteiras.'
    }
  },

  // --- MODULADORES NEUROLÓGICOS, ANTIDEPRESSIVOS E ANSIOLÍTICOS ---
  gabapentina: {
    availableRoutes: ['VO', 'SNE'],
    defaultRoute: 'VO',
    routeNotes: {
      VO: 'Tomar com água, independente das refeições. Doses devem ser espaçadas para evitar saturação do transportador LAT1.',
      SNE: 'Abrir a cápsula, dissolver o pó em água e instilar pela sonda.'
    }
  },
  pregabalina: {
    availableRoutes: ['VO', 'SNE'],
    defaultRoute: 'VO',
    routeNotes: {
      VO: 'Tomar com ou sem alimentos.',
      SNE: 'Abrir a cápsula e dissolver o conteúdo em água para instilar na sonda.'
    }
  },
  fluoxetina: {
    availableRoutes: ['VO', 'SNE'],
    defaultRoute: 'VO',
    routeNotes: {
      VO: 'Tomar pela manhã (efeito ativador pode causar insônia se tomado à noite).',
      SNE: 'Preferir gotas/solução oral para instilação em sonda.'
    }
  },
  sertralina: {
    availableRoutes: ['VO', 'SNE'],
    defaultRoute: 'VO',
    routeNotes: {
      VO: 'Tomar pela manhã ou à noite com água.',
      SNE: 'Triturar comprimido ou utilizar solução oral diluída.'
    }
  },
  escitalopram: {
    availableRoutes: ['VO', 'SNE'],
    defaultRoute: 'VO',
    routeNotes: {
      VO: 'Tomar em dose única diária com ou sem alimentos.',
      SNE: 'Gotas orais são ideais para instilação em sonda.'
    }
  },
  citalopram: {
    availableRoutes: ['VO', 'SNE'],
    defaultRoute: 'VO',
    routeNotes: {
      VO: 'Tomar pela manhã ou à noite.',
      SNE: 'Triturar comprimido ou usar gotas.'
    }
  },
  paroxetina: {
    availableRoutes: ['VO', 'SNE'],
    defaultRoute: 'VO',
    routeNotes: {
      VO: 'Tomar pela manhã com alimentos para diminuir náuseas. Nunca interromper abruptamente (síndrome de descontinuação intensa).',
      SNE: 'Triturar comprimido simples (não triturar formulação CR).'
    }
  },
  duloxetina: {
    availableRoutes: ['VO', 'SNE'],
    defaultRoute: 'VO',
    routeNotes: {
      VO: 'Engolir a cápsula inteira com água (contém grânulos gastrorresistentes sensíveis à acidez gástrica).',
      SNE: 'Não triturar os grânulos internos da cápsula na sonda.'
    }
  },
  venlafaxina: {
    availableRoutes: ['VO', 'SNE'],
    defaultRoute: 'VO',
    routeNotes: {
      VO: 'Tomar sempre junto com uma refeição com água. Não mastigar nem triturar cápsulas de liberação prolongada.',
      SNE: 'Abrir a cápsula e instilar os microgrânulos sem triturar com veículo líquido ligeiramente espesso.'
    }
  },
  amitriptilina: {
    availableRoutes: ['VO', 'SNE'],
    defaultRoute: 'VO',
    routeNotes: {
      VO: 'Tomar à noite ao deitar (efeito sedativo potente).',
      SNE: 'Triturar comprimido e irrigar a sonda.'
    }
  },
  bupropiona: {
    availableRoutes: ['VO', 'SNE'],
    defaultRoute: 'VO',
    routeNotes: {
      VO: 'Comprimidos de liberação prolongada (SR/XL) NUNCA devem ser triturados ou mastigados sob risco de absorção maciça e convulsão imediata. Tomar pela manhã.',
      SNE: 'Contraindicado triturar comprimidos de bupropiona em sonda enteral pelo risco de crises convulsivas.'
    }
  },
  mirtazapina: {
    availableRoutes: ['VO', 'SNE'],
    defaultRoute: 'VO',
    routeNotes: {
      VO: 'Tomar à noite imediatamente antes de deitar.',
      SNE: 'Comprimidos orodispersíveis desmancham rapidamente em água para administração na sonda.'
    }
  },
  clonazepam: {
    availableRoutes: ['VO', 'SNE'],
    defaultRoute: 'VO',
    routeNotes: {
      VO: 'Gotas ou comprimidos.',
      SNE: 'Gotas orais instiladas na sonda; lavar com 20 mL de água (evitar contato prolongado com plástico da sonda).'
    }
  },
  lamotrigina: {
    availableRoutes: ['VO', 'SNE'],
    defaultRoute: 'VO',
    routeNotes: {
      VO: 'Comprimidos dispersíveis podem ser mastigados, engolidos inteiros ou dissolvidos em água.',
      SNE: 'Dissolver o comprimido dispersível em 10 mL de água e administrar pela sonda.'
    }
  },
  risperidona: {
    availableRoutes: ['VO', 'SNE', 'IM'],
    defaultRoute: 'VO',
    routeNotes: {
      VO: 'Tomar 1 a 2x ao dia com ou sem alimentos.',
      SNE: 'Utilizar solução oral pela sonda (evitar misturar com chá ou bebidas tânicas).',
      IM: 'Formulação de depósito (Consta) quinzenal.'
    }
  },
  olanzapina: {
    availableRoutes: ['VO', 'SNE', 'IM'],
    defaultRoute: 'VO',
    routeNotes: {
      VO: 'Tomar à noite ao deitar com ou sem alimentos.',
      SNE: 'Comprimidos orodispersíveis dissolvem rapidamente na sonda.',
      IM: 'Injeção IM rápida de emergência para agitação psicomotora (não associar concomitantemente a benzodiazepínicos parenterais).'
    }
  },
  quetiapina: {
    availableRoutes: ['VO', 'SNE'],
    defaultRoute: 'VO',
    routeNotes: {
      VO: 'Tomar à noite ao deitar.',
      SNE: 'Triturar comprimido de liberação imediata e diluir em água.'
    }
  },
  haloperidol: {
    availableRoutes: ['IV', 'IM', 'VO', 'SNE'],
    defaultRoute: 'IV',
    routeNotes: {
      IV: 'Infundir lentamente sob monitorização de ECG contínuo (risco de prolongamento de QT e Torsades de Pointes).',
      IM: 'Injeção IM rápida para contenção de delírio agitado grave.',
      VO: 'Gotas ou comprimidos.',
      SNE: 'Gotas orais administradas pela sonda.'
    }
  },
  donepezila: {
    availableRoutes: ['VO', 'SNE'],
    defaultRoute: 'VO',
    routeNotes: {
      VO: 'Tomar à noite imediatamente antes de deitar.',
      SNE: 'Triturar comprimido e administrar pela sonda.'
    }
  },
  memantina: {
    availableRoutes: ['VO', 'SNE'],
    defaultRoute: 'VO',
    routeNotes: {
      VO: 'Tomar no mesmo horário todos os dias.',
      SNE: 'Utilizar solução oral em gotas ou triturar comprimido.'
    }
  },
  baclofeno: {
    availableRoutes: ['VO', 'SNE'],
    defaultRoute: 'VO',
    routeNotes: {
      VO: 'Tomar com alimentos ou leite.',
      SNE: 'Triturar comprimido e irrigar a sonda com água.'
    }
  },

  // --- ANTIRRETROVIRAIS ---
  dolutegravir: {
    availableRoutes: ['VO', 'SNE'],
    defaultRoute: 'VO',
    routeNotes: {
      VO: 'Tomar 2h antes ou 6h após antiácidos ou suplementos de cátions (cálcio, ferro, magnésio).',
      SNE: 'Pausar nutrição enteral 2h antes e depois devido à quelação por minerais.'
    }
  },
  abacavir: {
    availableRoutes: ['VO', 'SNE'],
    defaultRoute: 'VO',
    routeNotes: {
      VO: 'Tomar com ou sem alimentos. Triagem de HLA-B*5701 obrigatória antes do uso.',
      SNE: 'Solução oral ou comprimido triturado.'
    }
  },
  zidovudina: {
    availableRoutes: ['VO', 'SNE', 'IV'],
    defaultRoute: 'VO',
    routeNotes: {
      VO: 'Cápsulas com água.',
      SNE: 'Xarope oral pela sonda.',
      IV: 'Infundir em 1 hora diluída em SG 5% (profilaxia intraparto).'
    }
  },
  efavirenz: {
    availableRoutes: ['VO', 'SNE'],
    defaultRoute: 'VO',
    routeNotes: {
      VO: 'Tomar com estômago vazio ao deitar (alimentos gordurosos aumentam absorção em até 50%, piorando tontura e pesadelos vividos).',
      SNE: 'Pausar dieta enteral antes e depois da dose.'
    }
  },
  nevirapina: {
    availableRoutes: ['VO', 'SNE'],
    defaultRoute: 'VO',
    routeNotes: {
      VO: 'Tomar com água.',
      SNE: 'Suspensão oral pela sonda.'
    }
  },
  atazanavir: {
    availableRoutes: ['VO', 'SNE'],
    defaultRoute: 'VO',
    routeNotes: {
      VO: 'Tomar sempre junto com uma refeição completa para garantir absorção adequada.',
      SNE: 'Administrar junto ao ciclo da dieta enteral.'
    }
  },
  darunavir: {
    availableRoutes: ['VO', 'SNE'],
    defaultRoute: 'VO',
    routeNotes: {
      VO: 'Tomar sempre acompanhado de ritonavir e com alimentos.',
      SNE: 'Administrar com a dieta enteral.'
    }
  },
  ritonavir: {
    availableRoutes: ['VO', 'SNE'],
    defaultRoute: 'VO',
    routeNotes: {
      VO: 'Tomar junto com as refeições.',
      SNE: 'Solução oral administrada pela sonda.'
    }
  },
  lopinavir_ritonavir: {
    availableRoutes: ['VO', 'SNE'],
    defaultRoute: 'VO',
    routeNotes: {
      VO: 'Comprimidos devem ser engolidos inteiros sem mastigar nem partir.',
      SNE: 'Preferir a solução oral para pacientes com sonda enteral.'
    }
  },
  aciclovir: {
    availableRoutes: ['IV', 'VO', 'SNE'],
    defaultRoute: 'IV',
    routeNotes: {
      IV: 'Infundir lentamente em no mínimo 60 minutos com hidratação rigorosa para prevenir nefropatia por precipitação de cristais intratubulares.',
      VO: 'Tomar com bastante líquido.',
      SNE: 'Triturar comprimido ou usar suspensão oral.'
    },
    nptIncompatibility: {
      incompatible: true,
      reason: 'pH alcalino da solução injetável de aciclovir precipita na hora ao contato com NPT ácida ou emulsão lipídica. Usar via exclusiva.'
    }
  },
  tenofovir: {
    availableRoutes: ['VO', 'SNE'],
    defaultRoute: 'VO',
    routeNotes: {
      VO: 'Tomar com uma refeição.',
      SNE: 'Triturar comprimido e administrar pela sonda.'
    }
  },
  lamivudina: {
    availableRoutes: ['VO', 'SNE'],
    defaultRoute: 'VO',
    routeNotes: {
      VO: 'Tomar com ou sem alimentos.',
      SNE: 'Solução oral ou comprimido triturado.'
    }
  },

  // --- ANTIPARASITÁRIOS ---
  ivermectina: {
    availableRoutes: ['VO', 'SNE'],
    defaultRoute: 'VO',
    routeNotes: {
      VO: 'Tomar com estômago vazio (1h antes ou 2h depois das refeições) com copo de água.',
      SNE: 'Triturar comprimido e lavar a sonda.'
    }
  },
  nitazoxanida: {
    availableRoutes: ['VO', 'SNE'],
    defaultRoute: 'VO',
    routeNotes: {
      VO: 'Tomar junto com as refeições (alimentos aumentam a biodisponibilidade plasmática do metabólito ativo tizoxanida).',
      SNE: 'Suspensão oral administrada pela sonda durante a dieta.'
    }
  },

  // --- FATOR ESTIMULADOR DE ERITROPOIESE ---
  eritropoietina: {
    availableRoutes: ['SC', 'IV'],
    defaultRoute: 'SC',
    routeNotes: {
      SC: 'VIA PREFERENCIAL EM PRÉ-DIÁLISE E DIÁLISE PERITONEAL: maior biodisponibilidade e requer doses até 30% menores que a via IV.',
      IV: 'VIA PREFERENCIAL EM HEMODIÁLISE: administrada diretamente na linha venosa do circuito extracorpóreo de hemodiálise ao final da sessão.'
    }
  }
};

/**
 * Retorna as vias de administração disponíveis na prática clínica e ANVISA para um fármaco.
 */
export function getAvailableRoutesForDrug(drugId: string): AdminRoute[] {
  const config = DRUG_ROUTE_REGISTRY[drugId];
  if (config && config.availableRoutes && config.availableRoutes.length > 0) {
    return config.availableRoutes;
  }
  // Fallback padrão se não configurado
  return ['VO'];
}

/**
 * Retorna a via padrão recomendada em ambiente hospitalar para um fármaco.
 */
export function getDefaultRouteForDrug(drugId: string): AdminRoute {
  const config = DRUG_ROUTE_REGISTRY[drugId];
  if (config && config.defaultRoute) {
    return config.defaultRoute;
  }
  const available = getAvailableRoutesForDrug(drugId);
  return available[0] || 'VO';
}

/**
 * Retorna notas e alertas clínicos específicos para a via selecionada.
 */
export function getRouteNote(drugId: string, route: AdminRoute): string | undefined {
  const config = DRUG_ROUTE_REGISTRY[drugId];
  return config?.routeNotes?.[route];
}

/**
 * Retorna informações de incompatibilidade com NPT se aplicável.
 */
export function getNptIncompatibility(drugId: string): { incompatible: boolean; reason: string } | undefined {
  const config = DRUG_ROUTE_REGISTRY[drugId];
  return config?.nptIncompatibility;
}

/**
 * Metadados visuais para renderização de cada via de administração.
 */
export const ROUTE_METADATA: Record<AdminRoute, { label: string; fullName: string; shortBadge: string; badgeColor: string; activeColor: string }> = {
  IV: {
    label: 'IV',
    fullName: 'Intravenoso / Endovenoso',
    shortBadge: 'IV',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    activeColor: 'bg-blue-600 text-white border-blue-600'
  },
  VO: {
    label: 'VO',
    fullName: 'Via Oral',
    shortBadge: 'VO',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    activeColor: 'bg-emerald-600 text-white border-emerald-600'
  },
  SNE: {
    label: 'SNE/SNG',
    fullName: 'Sonda Enteral / Gástrica',
    shortBadge: 'SNE',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
    activeColor: 'bg-amber-600 text-white border-amber-600'
  },
  SC: {
    label: 'SC',
    fullName: 'Subcutâneo',
    shortBadge: 'SC',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
    activeColor: 'bg-purple-600 text-white border-purple-600'
  },
  IM: {
    label: 'IM',
    fullName: 'Intramuscular',
    shortBadge: 'IM',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    activeColor: 'bg-indigo-600 text-white border-indigo-600'
  },
  INAL: {
    label: 'INAL',
    fullName: 'Inalatório',
    shortBadge: 'INAL',
    badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    activeColor: 'bg-cyan-600 text-white border-cyan-600'
  }
};
