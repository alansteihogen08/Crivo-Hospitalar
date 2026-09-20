import { Drug } from '../types';
import { DRUG_REFERENCES } from './drugReferences';

const RAW_DRUGS: Record<string, Drug> = {
  meropenem: {
    name: 'Meropenem',
    tags: ['antibiotico', 'carbapenem', 'renal_ajuste'],
    renal: [
      { min: 50, max: 999, dose: '1 a 2g a cada 8 horas (dose padrão)' },
      { min: 26, max: 50, dose: 'Mesma dose a cada 12 horas' },
      { min: 10, max: 25, dose: 'Metade da dose a cada 12 horas' },
      { min: 0, max: 9, dose: 'Metade da dose a cada 24 horas' },
    ],
    dialysis: {
      cvvh: '500mg a cada 8h ou 1g a cada 8-12h',
      cvvhd: '500mg a cada 6-8h ou 1g a cada 8-12h',
      cvvhdf: '500mg a cada 6-8h ou 1g a cada 8-12h',
      hd: '500mg a cada 24h (nos dias de HD, administrar após a sessão)',
    },
    effects: ['Convulsões (raras, associadas a dose alta/disfunção renal)', 'Diarreia associada a C. difficile'],
    monitor: ['Função renal (ClCr)', 'Sinais neurológicos se dose alta ou disfunção renal'],
    maxDose: { value: '6g/dia', note: 'em meningite/infecção de SNC (2g a cada 8h); 3-4,5g/dia nas demais indicações — confirmar com protocolo institucional' }
  },
  ertapenem: {
    name: 'Ertapenem',
    tags: ['antibiotico', 'carbapenem', 'renal_ajuste'],
    renal: [
      { min: 30, max: 999, dose: '1g a cada 24 horas (dose padrão) — não é necessário ajuste' },
      { min: 0, max: 29, dose: '500mg a cada 24 horas' },
    ],
    dialysis: { hd: '500mg a cada 24h; se administrado nas 6h antes da sessão, dose suplementar de 150mg após a hemodiálise (cerca de 30% da dose é removida por HD)' },
    effects: ['Flebite no local de infusão', 'Diarreia/colite associada a C. difficile', 'Convulsões (raras, sobretudo em disfunção renal ou lesão de SNC)'],
    monitor: ['Função renal (ClCr)', 'Sinais neurológicos em pacientes com fatores de risco para convulsão'],
    maxDose: { value: '1g/dia', note: 'dose padrão já é a dose máxima usual para este fármaco' }
  },
  linezolida: {
    name: 'Linezolida',
    tags: ['antibiotico', 'oxazolidinona', 'renal_ajuste', 'serotoninergico'],
    renal: [
      { min: 0, max: 999, dose: '600mg a cada 12 horas — não é necessário ajuste de dose por função renal segundo o guia ILAS' },
    ],
    dialysis: 'Não é necessário ajuste de dose (todas as modalidades, segundo o guia ILAS).',
    effects: ['Trombocitopenia (uso prolongado >2 semanas)', 'Neuropatia periférica/óptica (uso prolongado)', 'Síndrome serotoninérgica (com ISRS/IMAO)'],
    monitor: ['Hemograma seriado (plaquetas)', 'Sinais de neuropatia se uso prolongado', 'Interação serotoninérgica se houver outros fármacos serotoninérgicos'],
    maxDose: { value: '1200mg/dia', note: '600mg a cada 12h — doses maiores não trazem benefício adicional e aumentam risco de toxicidade hematológica' }
  },
  vancomicina: {
    name: 'Vancomicina',
    tags: ['antibiotico', 'glicopeptideo', 'renal_ajuste', 'nefrotoxico', 'nivel_serico'],
    renal: [
      { min: 50, max: 999, dose: '25-30mg/kg ataque, depois 15-20mg/kg/dose a cada 8-12h', note: 'Ajustar por nível sérico' },
      { min: 20, max: 49, dose: 'Após ataque de 25-30mg/kg: 15-20mg/kg/dose a cada 24h (usual 750-1500mg)' },
      { min: 0, max: 19, dose: 'Intervalos mais longos, conforme concentração sérica' },
    ],
    dialysis: {
      cvvh: '1g a cada 48h ou 10-15mg/kg a cada 24-48h',
      cvvhd: '1g a cada 24h ou 10-15mg/kg a cada 24h',
      cvvhdf: '1g a cada 24h ou 7,5-10mg/kg a cada 12h',
      hd: '500mg-1g ou 5-10mg/kg (administrar depois da sessão de diálise)',
    },
    effects: ['Nefrotoxicidade (dose/tempo-dependente)', 'Síndrome do "homem vermelho" (infusão rápida)', 'Ototoxicidade (rara, geralmente com nível alto)'],
    monitor: ['Função renal seriada', 'Nível sérico (trough ou AUC-guiada)', 'Velocidade de infusão'],
    maxDose: { value: 'Guiada por nível sérico (AUC 400-600)', note: 'evitar ultrapassar 2g por dose isolada; não há teto diário fixo — ajustar por dosagem sérica' }
  },
  polimixina_b: {
    name: 'Polimixina B',
    tags: ['antibiotico', 'polimixina', 'nefrotoxico_alto', 'renal_ajuste'],
    renal: [
      { min: 0, max: 999, dose: '30.000 UI/kg (3mg/kg) ataque, depois 15.000 UI/kg 12/12h — não é necessário ajuste de dose por função renal segundo o guia ILAS' },
    ],
    dialysis: 'Não é necessário ajuste de dose (todas as modalidades, segundo o guia ILAS).',
    effects: ['Nefrotoxicidade (alta incidência)', 'Neurotoxicidade (parestesias, tontura, bloqueio neuromuscular em doses altas)'],
    monitor: ['Função renal seriada (creatinina diária em uso prolongado)', 'Sinais neurológicos'],
    maxDose: { value: '25.000 UI/kg/dia (2,5mg/kg/dia)', note: 'referência de segurança pelo alto risco de nefrotoxicidade dose-dependente — confirmar com farmácia clínica' }
  },
  amicacina: {
    name: 'Amicacina',
    tags: ['antibiotico', 'aminoglicosideo', 'nefrotoxico', 'ototoxico', 'renal_ajuste', 'nivel_serico'],
    renal: [
      { min: 50, max: 999, dose: '15mg/kg/dia a cada 24h (dose padrão) — não é necessário ajuste', note: 'Ajustar por nível sérico' },
      { min: 10, max: 49, dose: '7,5mg/kg/dose a cada 12 horas', note: 'Fonte também cita esquema alternativo por faixa (30-40: 4mg/kg/24h; 20-30: 7,5mg/kg/48h; 10-20: 4mg/kg/48h) — conferir pág. 41 do guia ILAS' },
      { min: 0, max: 9, dose: '7,5mg/kg/dose a cada 12 horas ou 3mg/kg a cada 72h conforme nível sérico' },
    ],
    dialysis: {
      cvvh: '7,5mg/kg a cada 24-48h',
      cvvhd: '7,5mg/kg a cada 24-48h',
      cvvhdf: '7,5mg/kg a cada 24-48h',
      hd: '5-7,5mg/kg a cada 48-72h (dose extra de 3,25mg/kg após a sessão de HD)',
    },
    effects: ['Nefrotoxicidade', 'Ototoxicidade (coclear e vestibular, pode ser irreversível)'],
    monitor: ['Função renal', 'Nível sérico (pico/vale)', 'Audição em uso prolongado'],
    maxDose: { value: '15mg/kg/dia', note: 'usar peso ajustado em obesidade; não ultrapassar mesmo em infecção grave sem reavaliar por nível sérico' }
  },
  fenitoina: {
    name: 'Fenitoína',
    tags: ['anticonvulsivante', 'substrato_cyp2c9', 'janela_terapeutica_estreita', 'indutor_enzimatico_potente', 'renal_ajuste'],
    renal: [
      { min: 0, max: 999, dose: 'Não é necessário ajuste renal (metabolização hepática)', note: 'Hipoalbuminemia/uremia aumentam a fração livre — considerar nível de fenitoína livre em insuficiência renal.' },
    ],
    dialysis: 'Não é dialisável de forma significativa (alta ligação proteica); não necessita suplementação em diálise.',
    effects: ['Nistagmo/ataxia (toxicidade)', 'Hiperplasia gengival (uso crônico)', 'Hepatotoxicidade', 'Arritmia com infusão IV rápida'],
    monitor: ['Nível sérico (considerar fração livre se hipoalbuminemia)', 'ECG se infusão IV rápida'],
    food: ['Nutrição enteral contínua reduz significativamente a absorção — pausar a dieta por 1-2h antes e depois da dose, ou seguir protocolo institucional de administração.']
  },
  midazolam: {
    name: 'Midazolam',
    tags: ['sedativo', 'cns_depressor', 'substrato_cyp3a4'],
    renal: [],
    effects: ['Depressão respiratória', 'Acúmulo/sedação prolongada em uso contínuo, obesidade ou disfunção hepática/renal', 'Delirium (uso prolongado)'],
    monitor: ['Escala de sedação (RASS)', 'Drive respiratório', 'Rastreio de delirium (CAM-ICU)']
  },
  diazepam: {
    name: 'Diazepam',
    tags: ['sedativo', 'cns_depressor', 'benzo_longa_acao', 'evitar_idoso'],
    renal: [],
    effects: ['Sedação prolongada (metabólitos ativos de meia-vida longa)', 'Depressão respiratória', 'Maior risco de queda/delirium em idosos'],
    monitor: ['Escala de sedação', 'Nível de consciência', 'Drive respiratório']
  },
  metoclopramida: {
    name: 'Metoclopramida',
    tags: ['procinetico', 'antagonista_d2', 'risco_extrapiramidal'],
    renal: [],
    effects: ['Reação extrapiramidal (distonia aguda, acatisia)', 'Sedação', 'Discinesia tardia (uso prolongado)'],
    monitor: ['Sinais extrapiramidais, especialmente se histórico prévio de reação']
  },
  bromoprida: {
    name: 'Bromoprida',
    tags: ['procinetico', 'antagonista_d2', 'risco_extrapiramidal', 'renal_ajuste_avaliar'],
    renal: [],
    effects: ['Reação extrapiramidal (distonia aguda, acatisia)', 'Sedação'],
    monitor: ['Sinais extrapiramidais, especialmente se histórico prévio de reação']
  },
  rifampicina: {
    name: 'Rifampicina',
    tags: ['antiTB', 'indutor_cyp3a4_potente', 'hepatotoxico', 'indutor_enzimatico_potente', 'renal_ajuste'],
    renal: [
      { min: 0, max: 999, dose: 'Não é necessário ajuste renal — eliminação predominantemente biliar/hepática' },
    ],
    dialysis: 'Não dialisável (alto peso molecular, alta ligação proteica); não necessita suplementação em diálise.',
    effects: ['Hepatotoxicidade', 'Coloração alaranjada de fluidos corporais (esperado, não patológico)', 'Indução enzimática ampla — reduz níveis de múltiplos fármacos concomitantes'],
    monitor: ['Transaminases', 'Nível/efeito de fármacos com interação conhecida (fenitoína, midazolam, fentanil, etc.)'],
    food: ['Administrar em jejum (1h antes ou 2h após as refeições) — alimentos, sobretudo gordurosos, reduzem e retardam a absorção.']
  },
  anfotericina_b: {
    name: 'Anfotericina B (lipídica)',
    tags: ['antifungico', 'nefrotoxico', 'renal_ajuste'],
    renal: [
      { min: 0, max: 999, dose: '3-6mg/kg/dia — não é necessário ajuste de dose por função renal segundo o guia ILAS' },
    ],
    dialysis: 'Não é necessário ajuste de dose (todas as modalidades, segundo o guia ILAS).',
    effects: ['Hipocalemia (perda renal de potássio induzida pela droga)', 'Nefrotoxicidade', 'Febre/calafrios relacionados à infusão', 'Hipomagnesemia'],
    monitor: ['Potássio e magnésio', 'Função renal', 'Sinais/sintomas na infusão'],
    maxDose: { value: '6mg/kg/dia', note: 'formulação lipídica' }
  },
  anfotericina_desoxicolato: {
    name: 'Anfotericina B desoxicolato',
    tags: ['antifungico', 'nefrotoxico_alto', 'renal_ajuste'],
    renal: [
      { min: 0, max: 999, dose: '0,5-1mg/kg/dia — não há esquema de ajuste de dose por função renal estabelecido; a nefrotoxicidade é dose-limitante, considerar troca para formulação lipídica se houver piora da função renal' },
    ],
    dialysis: 'Não é dialisável de forma significativa; não necessita suplementação em diálise.',
    effects: ['Nefrotoxicidade (a mais alta entre as formulações de anfotericina)', 'Reações relacionadas à infusão (febre, calafrios — mais intensas que as formulações lipídicas)', 'Hipocalemia/hipomagnesemia'],
    monitor: ['Função renal diária', 'Potássio e magnésio', 'Pré-medicação para reações infusionais (antitérmico/anti-histamínico)'],
    maxDose: { value: '1,5mg/kg/dia', note: 'doses maiores aumentam desproporcionalmente a nefrotoxicidade — considerar troca para formulação lipídica' }
  },
  anfotericina_complexo_lipidico: {
    name: 'Anfotericina B complexo lipídico (ABLC)',
    tags: ['antifungico', 'nefrotoxico', 'renal_ajuste'],
    renal: [
      { min: 0, max: 999, dose: '5mg/kg/dia — não é necessário ajuste de dose por função renal' },
    ],
    dialysis: 'Não é dialisável de forma significativa; não necessita suplementação em diálise.',
    effects: ['Nefrotoxicidade (menor que a formulação desoxicolato, porém presente)', 'Reações relacionadas à infusão (geralmente mais leves que a formulação convencional)', 'Hipocalemia'],
    monitor: ['Função renal', 'Potássio e magnésio']
  },
  fluconazol: {
    name: 'Fluconazol',
    tags: ['antifungico', 'triazol', 'renal_ajuste', 'qt'],
    renal: [
      { min: 50, max: 999, dose: 'Dose padrão (200-800mg/dia conforme indicação) — não é necessário ajuste' },
      { min: 10, max: 49, dose: '50% da dose padrão, no mesmo intervalo' },
      { min: 0, max: 9, dose: '50% da dose padrão' },
    ],
    dialysis: { hd: 'Administrar 100% da dose padrão após cada sessão de hemodiálise (fármaco significativamente removido por HD)' },
    effects: ['Prolongamento de QT', 'Hepatotoxicidade', 'Alopecia e xerose cutânea (uso prolongado)'],
    monitor: ['ECG se outros fatores de risco para QT longo', 'Transaminases'],
    maxDose: { value: '800mg/dia', note: 'em infecções fúngicas invasivas graves; doses menores (200-400mg/dia) na maioria das indicações' }
  },
  itraconazol: {
    name: 'Itraconazol',
    tags: ['antifungico', 'triazol', 'inibidor_cyp3a4_potente', 'renal_ajuste'],
    renal: [
      { min: 30, max: 999, dose: 'Dose padrão via oral — não é necessário ajuste' },
      { min: 0, max: 29, dose: 'Formulação IV contraindicada (acúmulo do veículo ciclodextrina) — preferir via oral quando possível' },
    ],
    effects: ['Hepatotoxicidade', 'Insuficiência cardíaca congestiva (efeito inotrópico negativo — contraindicado em disfunção ventricular)', 'Interações extensas via CYP3A4'],
    monitor: ['Transaminases', 'Sinais de insuficiência cardíaca', 'Revisar interações medicamentosas via CYP3A4'],
    food: ['Cápsulas: administrar com alimento ou bebida ácida (ex: refrigerante tipo cola) para melhorar a absorção. Solução oral: administrar em jejum (efeito inverso da cápsula) — não trocar entre as formulações sem ajustar essa orientação.']
  },
  voriconazol: {
    name: 'Voriconazol',
    tags: ['antifungico', 'triazol', 'inibidor_cyp3a4_potente', 'qt', 'renal_ajuste', 'nivel_serico'],
    renal: [
      { min: 50, max: 999, dose: 'Dose padrão via oral ou IV — não é necessário ajuste' },
      { min: 0, max: 49, dose: 'Preferir via oral (mesma dose); a formulação IV deve ser evitada pelo acúmulo do veículo ciclodextrina (SBECD) — se IV for imprescindível, avaliar risco-benefício com a equipe' },
    ],
    dialysis: { hd: 'Não é removido significativamente por HD convencional; a formulação IV segue contraindicada pelo veículo — preferir via oral' },
    effects: ['Alterações visuais transitórias (fotopsia)', 'Hepatotoxicidade', 'Alucinações/efeitos neuropsiquiátricos', 'Fototoxicidade cutânea (uso prolongado)', 'Prolongamento de QT'],
    monitor: ['Nível sérico (metabolismo variável via CYP2C19)', 'Transaminases', 'ECG se outros fatores de risco para QT longo'],
    food: ['Comprimidos: administrar pelo menos 1h antes ou 1h após as refeições — alimentos reduzem a absorção.']
  },
  cetoconazol: {
    name: 'Cetoconazol (sistêmico)',
    tags: ['antifungico', 'imidazol', 'inibidor_cyp3a4_potente', 'susceptivel_inducao', 'hepatotoxico', 'qt', 'renal_ajuste'],
    renal: [
      { min: 0, max: 999, dose: '200-400mg/dia (dose padrão) — não é necessário ajuste renal (metabolização predominantemente hepática)' },
    ],
    dialysis: 'Não é dialisável de forma significativa (alta ligação proteica); não necessita suplementação em diálise.',
    effects: ['Hepatotoxicidade grave, incluindo casos de insuficiência hepática fulminante', 'Insuficiência adrenal (inibição dose-dependente da esteroidogênese)', 'Prolongamento de QT', 'Ginecomastia, disfunção erétil (efeito antiandrogênico)'],
    monitor: ['Transaminases antes e durante o tratamento', 'Função adrenal em uso prolongado ou dose alta', 'ECG se outros fatores de risco para QT longo'],
    food: ['Requer acidez gástrica para absorção — se usado com antiácido, antagonista H2 ou IBP, administrar com bebida ácida e evitar reduzir a acidez.'],
    maxDose: { value: '400mg/dia', note: 'doses maiores aumentam desproporcionalmente o risco de hepatotoxicidade e o efeito antiandrogênico' }
  },
  micafungina: {
    name: 'Micafungina',
    tags: ['antifungico', 'equinocandina', 'renal_ajuste'],
    renal: [
      { min: 0, max: 999, dose: 'Não é necessário ajuste renal (eliminação predominantemente hepática/biliar)' },
    ],
    dialysis: 'Não é dialisável de forma significativa; não necessita suplementação em diálise.',
    effects: ['Hepatotoxicidade (elevação de transaminases)', 'Reações relacionadas à infusão (flushing)', 'Hemólise (rara)'],
    monitor: ['Transaminases']
  },
  flucitosina: {
    name: 'Flucitosina (5-FC)',
    tags: ['antifungico', 'renal_ajuste', 'nivel_serico'],
    renal: [
      { min: 40, max: 999, dose: '25mg/kg a cada 6 horas (dose padrão) — não é necessário ajuste' },
      { min: 20, max: 39, dose: '25mg/kg a cada 12 horas' },
      { min: 10, max: 19, dose: '25mg/kg a cada 24 horas' },
      { min: 0, max: 9, dose: '25-50mg/kg, dose única, guiada por nível sérico' },
    ],
    dialysis: { hd: '25-50mg/kg após cada sessão de hemodiálise (fármaco significativamente removido por HD)' },
    effects: ['Mielotoxicidade (leucopenia/trombocitopenia, dose/nível sérico-dependente)', 'Hepatotoxicidade', 'Diarreia'],
    monitor: ['Nível sérico', 'Hemograma seriado', 'Função renal']
  },
  gentamicina: {
    name: 'Gentamicina',
    tags: ['antibiotico', 'aminoglicosideo', 'nefrotoxico', 'ototoxico', 'renal_ajuste'],
    renal: [
      { min: 60, max: 999, dose: '5-7mg/kg/dia a cada 24 horas — não é necessário ajuste' },
      { min: 40, max: 59, dose: 'Mesma dose, administrar a cada 36 horas' },
      { min: 20, max: 39, dose: 'Mesma dose, administrar a cada 48 horas' },
      { min: 0, max: 19, dose: 'Administrar a dose íntegra; doses subsequentes conforme concentração sérica' },
    ],
    dialysis: {
      cvvh: '1,5-2,5mg/kg a cada 24-48h',
      cvvhd: '1,5-2,5mg/kg a cada 24-48h',
      cvvhdf: '1,5-2,5mg/kg a cada 24-48h',
      hd: '1-2mg/kg a cada 48-72h (dose extra de 0,85-1mg/kg após a sessão de HD)',
    },
    effects: ['Nefrotoxicidade', 'Ototoxicidade (coclear e vestibular)'],
    monitor: ['Função renal', 'Nível sérico (pico/vale)', 'Audição em uso prolongado'],
    maxDose: { value: '7mg/kg/dia', note: 'usar peso ajustado em obesidade' }
  },
  cefepima: {
    name: 'Cefepima',
    tags: ['antibiotico', 'cefalosporina', 'renal_ajuste', 'neurotoxico'],
    renal: [
      { min: 60, max: 999, dose: '2g a cada 8-12 horas — não é necessário ajuste' },
      { min: 30, max: 59, dose: 'Mesma dose a cada 12 horas' },
      { min: 11, max: 29, dose: 'Metade da dose a cada 12 horas' },
      { min: 0, max: 10, dose: 'Metade da dose a cada 24 horas' },
    ],
    dialysis: {
      cvvh: '1-2g a cada 12h',
      cvvhd: '1g a cada 8h ou 2g a cada 12h',
      cvvhdf: '1g a cada 8h ou 2g a cada 12h',
      hd: '500-1000mg a cada 24h (dose extra de 1g após a sessão de HD)',
    },
    effects: ['Neurotoxicidade (encefalopatia, mioclonias, convulsões — sobretudo com acúmulo por disfunção renal)', 'Diarreia associada a C. difficile'],
    monitor: ['Função renal', 'Estado mental/neurológico, especialmente se dose não ajustada'],
    maxDose: { value: '6g/dia', note: '2g a cada 8h em infecções graves/neutropenia febril; risco de neurotoxicidade aumenta com dose não ajustada à função renal' }
  },
  ceftriaxona: {
    name: 'Ceftriaxona',
    tags: ['antibiotico', 'cefalosporina', 'renal_ajuste'],
    renal: [
      { min: 0, max: 999, dose: '1-2g a cada 12-24 horas — não é necessário ajuste de dose por função renal segundo o guia ILAS' },
    ],
    dialysis: 'Não é necessário ajuste de dose (todas as modalidades, segundo o guia ILAS).',
    effects: ['Pseudolitíase biliar (sludge biliar)', 'Diarreia associada a C. difficile', 'Risco de precipitação com soluções contendo cálcio'],
    monitor: ['Sinais de colestase em uso prolongado'],
    maxDose: { value: '4g/dia', note: '2g a cada 12h em infecções graves/SNC; 1-2g/dia nas demais indicações' }
  },
  cefazolina: {
    name: 'Cefazolina',
    tags: ['antibiotico', 'cefalosporina', 'renal_ajuste'],
    renal: [
      { min: 55, max: 999, dose: '1-2g a cada 8 horas (dose padrão) — não é necessário ajuste' },
      { min: 35, max: 54, dose: 'Dose usual, ampliando o intervalo para a cada 12 horas' },
      { min: 11, max: 34, dose: 'Metade da dose usual a cada 12 horas' },
      { min: 0, max: 10, dose: 'Metade da dose usual a cada 18-24 horas' },
    ],
    dialysis: { hd: 'Dose adicional após a sessão de hemodiálise (parcialmente removida por HD)' },
    effects: ['Flebite no local de infusão', 'Rash cutâneo', 'Eosinofilia'],
    monitor: ['Função renal (ClCr)', 'Sinais de reação alérgica'],
    maxDose: { value: '6g/dia', note: '2g a cada 8h nas infecções mais graves' }
  },
  ceftazidima_avibactam: {
    name: 'Ceftazidima + Avibactam',
    tags: ['antibiotico', 'cefalosporina', 'inibidor_betalactamase', 'renal_ajuste'],
    renal: [
      { min: 50, max: 90, dose: '2,5g a cada 8 horas (dose padrão)' },
      { min: 31, max: 50, dose: '1,25g a cada 8 horas' },
      { min: 16, max: 30, dose: '0,94g a cada 12 horas' },
      { min: 6, max: 15, dose: '0,94g a cada 24 horas' },
      { min: 0, max: 5, dose: '0,94g a cada 48 horas' },
    ],
    dialysis: { hd: '0,94g a cada 48 horas (administrar após a sessão de HD)' },
    effects: ['Diarreia associada a C. difficile', 'Convulsões/neurotoxicidade em disfunção renal não ajustada', 'Reações de hipersensibilidade'],
    monitor: ['Função renal (ajuste de dose)', 'Estado neurológico se dose não ajustada'],
    maxDose: { value: '7,5g/dia', note: '2,5g a cada 8h (dose padrão com função renal preservada)' }
  },
  aztreonam: {
    name: 'Aztreonam',
    tags: ['antibiotico', 'monobactamico', 'renal_ajuste'],
    renal: [
      { min: 30, max: 999, dose: 'Dose padrão (1-2g a cada 6-12h, conforme gravidade) — não é necessário ajuste' },
      { min: 10, max: 29, dose: 'Dose de ataque plena, depois reduzir a manutenção para 50% da dose usual, no mesmo intervalo' },
      { min: 0, max: 9, dose: 'Dose de ataque plena, depois reduzir a manutenção para 25% da dose usual, no mesmo intervalo' },
    ],
    dialysis: { hd: 'Manter doses de manutenção da faixa <10 mL/min; em infecções graves, administrar dose extra de 1/8 da dose de ataque após cada sessão de HD' },
    effects: ['Baixo potencial de alergia cruzada com penicilinas/cefalosporinas', 'Flebite no local de infusão', 'Elevação transitória de transaminases'],
    monitor: ['Função renal (ajuste de dose)'],
    maxDose: { value: '8g/dia', note: '2g a cada 6h em infecções graves' }
  },
  ceftazidima: {
    name: 'Ceftazidima',
    tags: ['antibiotico', 'cefalosporina', 'renal_ajuste'],
    renal: [
      { min: 50, max: 999, dose: '2g a cada 8 horas (dose padrão) — não é necessário ajuste' },
      { min: 31, max: 50, dose: '1g a cada 12 horas' },
      { min: 16, max: 30, dose: '1g a cada 24 horas' },
      { min: 6, max: 15, dose: '500mg a cada 24 horas' },
      { min: 0, max: 5, dose: '500mg a cada 48 horas' },
    ],
    dialysis: {
      cvvh: '1-2g a cada 12h',
      cvvhd: '1g a cada 8h ou 2g a cada 12h',
      cvvhdf: '1g a cada 8h ou 2g a cada 12h',
      hd: '2g a cada 24h (dose extra de 1g após a sessão de HD)',
    },
    effects: ['Neurotoxicidade em disfunção renal não ajustada', 'Diarreia associada a C. difficile'],
    monitor: ['Função renal'],
    maxDose: { value: '6g/dia', note: '2g a cada 8h nas infecções mais graves' }
  },
  ampicilina_sulbactam: {
    name: 'Ampicilina + Sulbactam',
    tags: ['antibiotico', 'betalactamico', 'renal_ajuste'],
    renal: [
      { min: 30, max: 999, dose: '1,5-3g a cada 6 horas (dose padrão) — não é necessário ajuste' },
      { min: 15, max: 29, dose: '1,5-3g a cada 12 horas' },
      { min: 5, max: 14, dose: '1,5-3g a cada 24 horas' },
    ],
    dialysis: { hd: '1,5-3g a cada 24h, administrado após a sessão de hemodiálise' },
    effects: ['Rash cutâneo', 'Diarreia', 'Flebite no local de infusão'],
    monitor: ['Função renal', 'Sinais de reação alérgica'],
    maxDose: { value: '12g/dia de ampicilina', note: '3g a cada 6h nas infecções mais graves' }
  },
  amoxicilina_clavulanato: {
    name: 'Amoxicilina + Clavulanato',
    tags: ['antibiotico', 'betalactamico', 'renal_ajuste'],
    renal: [
      { min: 30, max: 999, dose: '500-875mg a cada 8-12 horas (dose padrão) — não é necessário ajuste' },
      { min: 10, max: 29, dose: '250-500mg a cada 12 horas' },
      { min: 0, max: 9, dose: '250-500mg a cada 24 horas' },
    ],
    dialysis: { hd: '250-500mg a cada 24h, administrado durante e após a sessão' },
    effects: ['Hepatotoxicidade colestática (pode surgir semanas após o término)', 'Diarreia'],
    monitor: ['Transaminases/bilirrubina se uso prolongado']
  },
  piperacilina_tazobactam: {
    name: 'Piperacilina + Tazobactam',
    tags: ['antibiotico', 'betalactamico', 'renal_ajuste'],
    renal: [
      { min: 40, max: 999, dose: '4,5g a cada 6-8 horas (dose padrão) — não é necessário ajuste' },
      { min: 20, max: 40, dose: '4,5g a cada 8 horas ou 3,375g a cada 6 horas' },
      { min: 0, max: 19, dose: '4,5g a cada 12 horas ou 2,25g a cada 6 horas' },
    ],
    dialysis: {
      cvvh: '2,25-3,375g a cada 6-8h',
      cvvhd: '2,25-3,375g a cada 6h',
      cvvhdf: '3,375g a cada 6h',
      hd: '2,25g a cada 8-12h (dose extra de 0,75g após a sessão de HD)',
    },
    effects: ['Nefrotoxicidade (especialmente em associação com vancomicina)', 'Neutropenia em uso prolongado', 'Hipocalemia'],
    monitor: ['Função renal', 'Hemograma em uso prolongado', 'Potássio'],
    maxDose: { value: '18g/dia (componente piperacilina)', note: '4,5g a cada 6h — considerar infusão estendida conforme protocolo institucional' }
  },
  levofloxacino: {
    name: 'Levofloxacino',
    tags: ['antibiotico', 'quinolona', 'renal_ajuste', 'qt'],
    renal: [
      { min: 50, max: 999, dose: '500-750mg a cada 24 horas (dose padrão) — não é necessário ajuste' },
      { min: 20, max: 49, dose: 'Esquema 750mg/dia: 750mg a cada 48h. Esquema 500mg/dia: 500mg dose inicial, depois 250mg a cada 24h' },
      { min: 10, max: 19, dose: 'Esquema 750mg/dia: 750mg inicial, depois 500mg a cada 48h. Esquema 500mg/dia: 500mg dose inicial, depois 250mg a cada 48h' },
    ],
    dialysis: {
      cvvh: '250mg a cada 24h',
      cvvhd: '250-500mg a cada 24h',
      cvvhdf: '250-750mg a cada 24h',
      hd: '500mg a cada 48h (administrar após a sessão de diálise)',
    },
    effects: ['Prolongamento de QT', 'Tendinite/ruptura de tendão', 'Neuropatia periférica', 'Disglicemia (hipo ou hiperglicemia)'],
    monitor: ['ECG se outros fatores de risco para QT longo', 'Glicemia'],
    maxDose: { value: '750mg/dia', note: 'dose máxima usual com função renal preservada' },
    food: ['Evitar administração concomitante com laticínios, antiácidos e suplementos de ferro/cálcio/magnésio/zinco — reduzem a absorção por quelação; espaçar pelo menos 2h.']
  },
  ciprofloxacino: {
    name: 'Ciprofloxacino',
    tags: ['antibiotico', 'quinolona', 'renal_ajuste', 'qt'],
    renal: [
      { min: 60, max: 999, dose: '400mg IV a cada 8-12h ou 500-750mg VO a cada 12h (dose padrão) — não é necessário ajuste' },
      { min: 31, max: 59, dose: '400mg IV a cada 12h ou 250-500mg VO a cada 12h (máximo 1.000mg/dia VO)' },
      { min: 0, max: 30, dose: '400mg IV a cada 24h ou 250-500mg VO a cada 24h (máximo 500mg/dia VO)' },
    ],
    dialysis: { hd: 'Mesma dose do ClCr ≤30 mL/min, administrada após a sessão (pouco removido por hemodiálise ou diálise peritoneal)' },
    effects: ['Prolongamento de QT', 'Tendinite/ruptura de tendão', 'Neuropatia periférica', 'Redução do limiar convulsivo'],
    monitor: ['ECG se outros fatores de risco para QT longo'],
    maxDose: { value: '1200mg/dia IV', note: '400mg a cada 8h em infecções graves; via oral usualmente até 1500mg/dia' },
    food: ['Evitar administração concomitante com laticínios, antiácidos e suplementos de cátions polivalentes; espaçar pelo menos 2h.']
  },
  smx_tmp: {
    name: 'Sulfametoxazol-Trimetoprima',
    tags: ['antibiotico', 'renal_ajuste', 'nefrotoxico_leve', 'hipercalemia'],
    renal: [
      { min: 30, max: 999, dose: 'Dose padrão (conforme indicação, calculada pelo componente trimetoprima) — não é necessário ajuste' },
      { min: 15, max: 29, dose: 'Reduzir para 50% da dose padrão' },
      { min: 0, max: 14, dose: 'Evitar se possível; se indispensável, usar com monitorização de níveis séricos e função renal' },
    ],
    dialysis: { hd: 'Dose padrão administrada após a sessão de hemodiálise; considerar reforço de 50% da dose após cada sessão' },
    effects: ['Hipercalemia (efeito poupador de potássio da trimetoprima)', 'Nefrotoxicidade leve', 'Rash cutâneo / Stevens-Johnson (raro)', 'Mielossupressão em uso prolongado'],
    monitor: ['Potássio', 'Função renal', 'Hemograma se uso prolongado']
  },
  metronidazol: {
    name: 'Metronidazol',
    tags: ['antibiotico', 'renal_ajuste_hepatico', 'renal_ajuste'],
    renal: [
      { min: 10, max: 999, dose: '500mg a cada 6-8 horas — não é necessário ajuste' },
      { min: 0, max: 9, dose: 'Considerar redução de 50% da dose a cada 12 horas (fora de diálise)' },
    ],
    dialysis: 'Não é necessário ajuste de dose (todas as modalidades, segundo o guia ILAS).',
    effects: ['Neuropatia periférica (uso prolongado)', 'Efeito dissulfiram-like com álcool', 'Gosto metálico'],
    monitor: ['Sinais neurológicos em uso prolongado'],
    food: ['Evitar álcool durante o uso e até 48h após o término — efeito dissulfiram-like (rubor facial, taquicardia, náusea).']
  },
  claritromicina: {
    name: 'Claritromicina',
    tags: ['antibiotico', 'macrolideo', 'qt', 'renal_ajuste', 'inibidor_cyp3a4'],
    renal: [
      { min: 30, max: 999, dose: '500mg a cada 12 horas — não é necessário ajuste' },
      { min: 0, max: 29, dose: 'Reduzir a dose em 50%' },
    ],
    dialysis: {
      cvvh: '500mg a cada 12-24h',
      cvvhd: '500mg a cada 12-24h',
      cvvhdf: '500mg a cada 12-24h',
      hd: '500mg a cada 24h (administrar após a sessão de HD)',
    },
    effects: ['Prolongamento de QT', 'Gosto metálico', 'Hepatotoxicidade', 'Inibidor potente de CYP3A4'],
    monitor: ['ECG se outros fatores de risco para QT longo', 'Revisar interações medicamentosas via CYP3A4 (estatinas, tacrolimo, varfarina)']
  },
  azitromicina: {
    name: 'Azitromicina',
    tags: ['antibiotico', 'macrolideo', 'qt', 'renal_ajuste'],
    renal: [
      { min: 10, max: 999, dose: '500mg a cada 24 horas (dose padrão) — não é necessário ajuste' },
      { min: 0, max: 9, dose: 'Sem redução de dose formalmente estabelecida; usar com cautela' },
    ],
    dialysis: 'Não é removida de forma significativa por hemodiálise; não necessita dose suplementar.',
    effects: ['Prolongamento de QT', 'Hepatotoxicidade (rara)', 'Ototoxicidade (rara, uso prolongado/altas doses)'],
    monitor: ['ECG se outros fatores de risco para QT longo'],
    maxDose: { value: '500mg/dia', note: 'dose usual máxima na maioria das indicações' }
  },
  daptomicina: {
    name: 'Daptomicina',
    tags: ['antibiotico', 'renal_ajuste'],
    renal: [
      { min: 30, max: 999, dose: '4mg/kg (pele/partes moles) ou 6mg/kg (bacteremia/endocardite) a cada 24 horas — não é necessário ajuste' },
      { min: 0, max: 29, dose: 'Mesma dose (4 ou 6mg/kg), porém a cada 48 horas, incluindo pacientes em hemodiálise' },
    ],
    dialysis: { hd: '4-6mg/kg a cada 48h, preferencialmente administrada após a sessão nos dias de diálise' },
    effects: ['Miopatia/rabdomiólise (elevação de CPK)', 'Pneumonia eosinofílica (inativada pelo surfactante alveolar)'],
    monitor: ['CPK semanal (mais frequente se disfunção renal)'],
    maxDose: { value: '12mg/kg/dia', note: 'doses >8mg/kg são off-label e devem ser validadas institucionalmente; monitorar CPK' }
  },
  tigeciclina: {
    name: 'Tigeciclina',
    tags: ['antibiotico', 'renal_ajuste'],
    renal: [
      { min: 0, max: 999, dose: '100mg dose de ataque, depois 50mg a cada 12 horas (dose padrão) — não é necessário ajuste renal' },
    ],
    dialysis: 'Não é removida por hemodiálise; não necessita dose suplementar.',
    effects: ['Náusea/vômito frequentes', 'Pancreatite (rara)', 'Coagulopatia em uso prolongado'],
    monitor: ['Sinais de pancreatite se dor abdominal', 'Coagulograma em uso prolongado'],
    maxDose: { value: '100mg/dia de manutenção', note: '50mg a cada 12h' }
  },
  isoniazida: {
    name: 'Isoniazida',
    tags: ['antiTB', 'inibidor_cyp2c9', 'hepatotoxico', 'renal_ajuste'],
    renal: [
      { min: 50, max: 999, dose: 'Dose padrão — não é necessário ajuste' },
      { min: 10, max: 49, dose: 'Manter 100% da dose ou considerar redução para 75%' },
      { min: 0, max: 9, dose: 'Considerar redução para 50% da dose' },
    ],
    dialysis: 'Eliminação predominantemente hepática — não é necessário suplementação após hemodiálise.',
    effects: ['Hepatotoxicidade', 'Neuropatia periférica (por deficiência de piridoxina induzida pela droga)'],
    monitor: ['Transaminases', 'Considerar piridoxina profilática (Vitamina B6)'],
    food: ['Administrar em jejum (1h antes ou 2h após). Evitar alimentos ricos em tiramina/histamina (queijos curados, vinho).']
  },
  pirazinamida: {
    name: 'Pirazinamida',
    tags: ['antiTB', 'hepatotoxico', 'renal_ajuste'],
    renal: [
      { min: 30, max: 999, dose: 'Dose diária padrão — não é necessário ajuste' },
      { min: 0, max: 29, dose: 'Manter a dose habitual, mas administrar 3x por semana (intervalo estendido)' },
    ],
    dialysis: 'Administrar após a sessão de hemodiálise; sem necessidade de dose suplementar.',
    effects: ['Hepatotoxicidade', 'Hiperuricemia/artralgia'],
    monitor: ['Transaminases', 'Ácido úrico se sintomas articulares']
  },
  etambutol: {
    name: 'Etambutol',
    tags: ['antiTB', 'renal_ajuste'],
    renal: [
      { min: 30, max: 999, dose: 'Dose diária padrão — não é necessário ajuste' },
      { min: 0, max: 29, dose: 'Manter a dose habitual, mas administrar 3x por semana (intervalo estendido)' },
    ],
    dialysis: 'Sem necessidade de suplementação adicional se administrado após a sessão de hemodiálise.',
    effects: ['Neurite óptica (dose-dependente)'],
    monitor: ['Acuidade visual e discriminação de cores, especialmente em uso prolongado ou disfunção renal']
  },
  carbamazepina: {
    name: 'Carbamazepina',
    tags: ['anticonvulsivante', 'janela_terapeutica_estreita', 'indutor_enzimatico_potente', 'renal_ajuste'],
    renal: [
      { min: 0, max: 999, dose: 'Não é necessário ajuste renal (metabolização hepática)' },
    ],
    effects: ['Leucopenia/agranulocitose', 'Hiponatremia (SIADH)', 'Hepatotoxicidade', 'Stevens-Johnson/DRESS', 'Ataxia/diplopia'],
    monitor: ['Hemograma', 'Sódio', 'Transaminases', 'Nível sérico'],
    food: ['Evitar suco de toranja (grapefruit) — inibe o metabolismo via CYP3A4 e pode elevar nível sérico.']
  },
  acido_valproico: {
    name: 'Ácido Valproico',
    tags: ['anticonvulsivante', 'janela_terapeutica_estreita', 'hepatotoxico', 'renal_ajuste'],
    renal: [
      { min: 0, max: 999, dose: 'Não é necessário ajuste renal (metabolização hepática)' },
    ],
    dialysis: 'Baixa remoção por diálise (alta ligação proteica); não necessita suplementação.',
    effects: ['Trombocitopenia e disfunção plaquetária', 'Hepatotoxicidade', 'Hiperamonemia (mesmo com transaminases normais)', 'Pancreatite'],
    monitor: ['Hemograma (plaquetas)', 'Transaminases', 'Nível sérico (janela terapêutica estreita)', 'Amônia se alteração do sensório']
  },
  fenobarbital: {
    name: 'Fenobarbital',
    tags: ['anticonvulsivante', 'indutor_enzimatico', 'cns_depressor', 'indutor_enzimatico_potente', 'renal_ajuste'],
    renal: [
      { min: 10, max: 999, dose: 'Dose padrão' },
      { min: 0, max: 9, dose: 'Usar doses menores (TFG <10 mL/min)' },
    ],
    dialysis: 'Dose suplementar recomendada após hemodiálise ou diálise peritoneal, para manter níveis terapêuticos.',
    effects: ['Sedação', 'Depressão respiratória em dose alta', 'Indução enzimática ampla'],
    monitor: ['Nível de consciência', 'Nível sérico']
  },
  levetiracetam: {
    name: 'Levetiracetam',
    tags: ['anticonvulsivante', 'renal_ajuste'],
    renal: [
      { min: 80, max: 999, dose: '500-1500mg a cada 12 horas (dose padrão)' },
      { min: 50, max: 79, dose: '500-1000mg a cada 12 horas' },
      { min: 30, max: 49, dose: '250-750mg a cada 12 horas' },
      { min: 0, max: 29, dose: '250-500mg a cada 12 horas' },
    ],
    dialysis: { hd: '500-1000mg a cada 24 horas + dose suplementar de 250-500mg após a sessão de hemodiálise (remove ~50%)' },
    effects: ['Alterações comportamentais/irritabilidade', 'Sonolência'],
    monitor: ['Sinais neuropsiquiátricos']
  },
  propofol: {
    name: 'Propofol',
    tags: ['sedativo', 'cns_depressor'],
    renal: [],
    effects: ['Hipotensão', 'Síndrome da infusão de propofol (PRIS — acidose metabólica, rabdomiólise, arritmia)', 'Hipertrigliceridemia'],
    monitor: ['Triglicerídeos em uso prolongado', 'CPK e gasometria se suspeita de síndrome da infusão', 'Pressão arterial']
  },
  cetamina: {
    name: 'Cetamina',
    tags: ['sedativo', 'cns_depressor'],
    renal: [],
    effects: ['Alucinações/agitação ao despertar', 'Hipertensão/taquicardia', 'Sialorreia'],
    monitor: ['Pressão arterial', 'Nível de sedação/agitação']
  },
  dexmedetomidina: {
    name: 'Dexmedetomidina (Precedex)',
    tags: ['sedativo', 'alfa2_agonista', 'cns_depressor'],
    renal: [],
    effects: ['Bradicardia', 'Hipotensão'],
    monitor: ['Frequência cardíaca e pressão arterial']
  },
  morfina: {
    name: 'Morfina',
    tags: ['opioide', 'cns_depressor', 'renal_ajuste'],
    renal: [],
    effects: ['Depressão respiratória', 'Constipação', 'Liberação de histamina (prurido, hipotensão)', 'Acúmulo de metabólito ativo em disfunção renal'],
    monitor: ['Drive respiratório', 'Função renal', 'Trânsito intestinal']
  },
  fentanil: {
    name: 'Fentanil',
    tags: ['opioide', 'cns_depressor', 'substrato_cyp3a4'],
    renal: [],
    effects: ['Depressão respiratória', 'Rigidez torácica (dose alta/infusão rápida)', 'Tolerância em uso prolongado'],
    monitor: ['Drive respiratório']
  },
  metadona: {
    name: 'Metadona',
    tags: ['opioide', 'cns_depressor', 'qt'],
    renal: [],
    effects: ['Prolongamento de QT (dose-dependente)', 'Depressão respiratória', 'Acúmulo por meia-vida longa'],
    monitor: ['ECG (QT)', 'Drive respiratório', 'Nível de sedação']
  },
  hidralazina: {
    name: 'Hidralazina',
    tags: ['anti_hipertensivo', 'vasodilatador_direto', 'renal_ajuste'],
    renal: [
      { min: 30, max: 999, dose: 'Dose padrão — sem ajuste específico publicado' },
      { min: 0, max: 29, dose: 'Ajustar a dose ou o intervalo conforme resposta clínica para evitar acúmulo' },
    ],
    effects: ['Síndrome lupus-like (uso prolongado, >100mg/dia)', 'Taquicardia reflexa', 'Cefaleia, rubor facial'],
    monitor: ['Frequência cardíaca e pressão arterial', 'Sinais de síndrome lupus-like']
  },
  clonidina: {
    name: 'Clonidina',
    tags: ['anti_hipertensivo', 'alfa2_agonista', 'renal_ajuste'],
    renal: [
      { min: 0, max: 999, dose: 'Ajustar individualmente conforme resposta anti-hipertensiva' },
    ],
    dialysis: 'Não é necessária dose suplementar após hemodiálise (remoção 0-5%).',
    effects: ['Hipotensão', 'Bradicardia', 'Rebote hipertensivo em suspensão abrupta'],
    monitor: ['Pressão arterial e frequência cardíaca', 'Evitar suspensão abrupta']
  },
  quetiapina: {
    name: 'Quetiapina',
    tags: ['antipsicotico', 'qt', 'cns_depressor'],
    renal: [],
    effects: ['Prolongamento de QT', 'Sedação', 'Hipotensão ortostática'],
    monitor: ['ECG se outros fatores de risco para QT longo']
  },
  haloperidol: {
    name: 'Haloperidol',
    tags: ['antipsicotico', 'qt', 'risco_extrapiramidal'],
    renal: [],
    effects: ['Prolongamento de QT', 'Reação extrapiramidal', 'Síndrome neuroléptica maligna (rara)'],
    monitor: ['ECG', 'Sinais extrapiramidais']
  },
  ondansetrona: {
    name: 'Ondansetrona',
    tags: ['antiemetico', 'qt'],
    renal: [],
    effects: ['Prolongamento de QT', 'Cefaleia', 'Constipação'],
    monitor: ['ECG se outros fatores de risco para QT longo']
  },
  domperidona: {
    name: 'Domperidona',
    tags: ['procinetico', 'antagonista_d2', 'qt'],
    renal: [],
    effects: ['Prolongamento de QT', 'Hiperprolactinemia'],
    monitor: ['ECG se outros fatores de risco para QT longo']
  },
  baclofeno: {
    name: 'Baclofeno',
    tags: ['relaxante_muscular', 'cns_depressor', 'renal_ajuste'],
    renal: [],
    effects: ['Sedação', 'Depressão respiratória em dose alta ou disfunção renal', 'Síndrome de abstinência em suspensão abrupta'],
    monitor: ['Nível de consciência', 'Função renal', 'Evitar suspensão abrupta']
  },
  furosemida: {
    name: 'Furosemida',
    tags: ['diuretico_alca', 'potencializa_ototoxicidade'],
    renal: [],
    effects: ['Hipocalemia', 'Hiponatremia', 'Ototoxicidade (dose alta/infusão rápida, sobretudo com aminoglicosídeo)', 'Alcalose metabólica'],
    monitor: ['Eletrólitos (K, Na, Mg)', 'Função renal', 'Balanço hídrico']
  },
  dolutegravir: {
    name: 'Dolutegravir',
    tags: ['antirretroviral', 'susceptivel_inducao', 'renal_ajuste'],
    renal: [
      { min: 0, max: 999, dose: '50mg — não é necessário ajuste de dose por função renal' },
    ],
    effects: ['Cefaleia', 'Insônia', 'Elevação de transaminases (rara)'],
    monitor: ['Adesão/continuidade do esquema antirretroviral']
  },
  abacavir: {
    name: 'Abacavir (ABC)',
    tags: ['antirretroviral', 'intr', 'renal_ajuste'],
    renal: [
      { min: 0, max: 999, dose: 'Não é necessário ajuste renal (metabolização hepática)' },
    ],
    effects: ['Reação de hipersensibilidade grave (associada a HLA-B*5701)', 'Risco cardiovascular aumentado'],
    monitor: ['Rastreio de HLA-B*5701 antes do início', 'Sinais de hipersensibilidade nas primeiras semanas']
  },
  zidovudina: {
    name: 'Zidovudina (AZT)',
    tags: ['antirretroviral', 'intr', 'renal_ajuste'],
    renal: [],
    effects: ['Mielotoxicidade (anemia, neutropenia)', 'Miopatia (uso prolongado)', 'Cefaleia, astenia'],
    monitor: ['Hemograma seriado']
  },
  efavirenz: {
    name: 'Efavirenz (EFZ)',
    tags: ['antirretroviral', 'inntr', 'renal_ajuste'],
    renal: [{ min: 0, max: 999, dose: 'Não é necessário ajuste renal (metabolização hepática)' }],
    effects: ['Efeitos no SNC (tontura, sonhos vívidos, insônia)', 'Sintomas psiquiátricos', 'Hepatotoxicidade', 'Rash cutâneo'],
    monitor: ['Sintomas neuropsiquiátricos', 'Transaminases'],
    food: ['Evitar refeições gordurosas — aumentam absorção e intensificam efeitos no SNC. Tomar à noite.']
  },
  nevirapina: {
    name: 'Nevirapina (NVP)',
    tags: ['antirretroviral', 'inntr', 'renal_ajuste'],
    renal: [
      { min: 20, max: 999, dose: 'Não é necessário ajuste renal' },
      { min: 0, max: 19, dose: 'Dose suplementar de 200mg após cada sessão de hemodiálise' }
    ],
    effects: ['Hepatotoxicidade grave', 'Reações cutâneas graves (Stevens-Johnson/DRESS)'],
    monitor: ['Transaminases nas primeiras semanas', 'Sinais de reação cutânea grave']
  },
  atazanavir: {
    name: 'Atazanavir (ATV)',
    tags: ['antirretroviral', 'ip', 'inibidor_cyp3a4_potente', 'renal_ajuste'],
    renal: [{ min: 0, max: 999, dose: 'Não é necessário ajuste renal (metabolização hepática)' }],
    effects: ['Hiperbilirrubinemia indireta (icterícia benigna)', 'Nefrolitíase', 'Prolongamento de intervalo PR', 'Inibidor potente de CYP3A4'],
    monitor: ['Bilirrubina', 'ECG', 'Revisar interações via CYP3A4'],
    food: ['Administrar com alimento — melhora a absorção e tolerabilidade.']
  },
  darunavir: {
    name: 'Darunavir (DRV)',
    tags: ['antirretroviral', 'ip', 'renal_ajuste'],
    renal: [{ min: 0, max: 999, dose: 'Não é necessário ajuste renal (metabolização hepática)' }],
    effects: ['Rash cutâneo (grupamento sulfa)', 'Hepatotoxicidade', 'Hiperlipidemia'],
    monitor: ['Transaminases', 'Perfil lipídico'],
    food: ['Administrar com alimento — absorção reduzida em jejum.']
  },
  ritonavir: {
    name: 'Ritonavir (RTV)',
    tags: ['antirretroviral', 'ip', 'inibidor_cyp3a4_potente', 'renal_ajuste'],
    renal: [{ min: 0, max: 999, dose: 'Não é necessário ajuste renal (metabolização hepática)' }],
    effects: ['Inibidor extremamente potente de CYP3A4', 'Efeitos gastrointestinais', 'Parestesias periorais', 'Dislipidemia'],
    monitor: ['Revisar cuidadosamente interações via CYP3A4'],
    food: ['Administrar com alimento.']
  },
  lopinavir_ritonavir: {
    name: 'Lopinavir + Ritonavir',
    tags: ['antirretroviral', 'ip', 'inibidor_cyp3a4_potente', 'qt', 'renal_ajuste'],
    renal: [{ min: 0, max: 999, dose: 'Não é necessário ajuste renal' }],
    effects: ['Prolongamento de QT e PR', 'Diarreia frequente', 'Dislipidemia', 'Inibidor potente de CYP3A4'],
    monitor: ['ECG se outros fatores de risco para QT longo', 'Perfil lipídico'],
    food: ['Solução oral deve ser administrada com alimento.']
  },
  aciclovir: {
    name: 'Aciclovir',
    tags: ['antiviral', 'renal_ajuste', 'nefrotoxico_leve'],
    renal: [
      { min: 50, max: 999, dose: 'Dose padrão a cada 8 horas (IV) — não é necessário ajuste' },
      { min: 25, max: 49, dose: 'Mesma dose a cada 12 horas' },
      { min: 10, max: 24, dose: 'Mesma dose a cada 24 horas' },
      { min: 0, max: 9, dose: 'Metade da dose a cada 24 horas' },
    ],
    dialysis: { hd: 'Administrar dose da faixa <10 mL/min após a sessão de hemodiálise' },
    effects: ['Nefrotoxicidade (cristalúria/nefropatia obstrutiva)', 'Neurotoxicidade (confusão, tremor)', 'Flebite no local de infusão'],
    monitor: ['Função renal seriada', 'Hidratação adequada e infusão lenta (≥1h)', 'Estado neurológico'],
    maxDose: { value: '30mg/kg/dia IV', note: '10mg/kg a cada 8h nas indicações mais graves (ex: encefalite herpética)' }
  },
  tenofovir: {
    name: 'Tenofovir',
    tags: ['antirretroviral', 'nefrotoxico_leve', 'renal_ajuste'],
    renal: [
      { min: 50, max: 999, dose: '300mg a cada 24 horas (dose padrão)' },
      { min: 30, max: 49, dose: '300mg a cada 48 horas' },
      { min: 10, max: 29, dose: '300mg 2x/semana (a cada 72-96h)' },
    ],
    dialysis: { hd: '300mg a cada 7 dias, ou após completar uma sessão de hemodiálise' },
    effects: ['Nefrotoxicidade (tubulopatia renal)', 'Redução de densidade mineral óssea'],
    monitor: ['Função renal', 'Fósforo sérico']
  },
  lamivudina: {
    name: 'Lamivudina',
    tags: ['antirretroviral', 'renal_ajuste'],
    renal: [
      { min: 50, max: 999, dose: '150mg a cada 12h ou 300mg 1x/dia (dose padrão)' },
      { min: 30, max: 49, dose: '150mg 1x/dia' },
      { min: 15, max: 29, dose: '150mg dose inicial, depois 100mg 1x/dia' },
      { min: 5, max: 14, dose: '150mg dose inicial, depois 50mg 1x/dia' },
      { min: 0, max: 4, dose: '50mg dose inicial, depois 25mg 1x/dia' },
    ],
    dialysis: 'Administrar após sessão de hemodiálise.',
    effects: ['Bem tolerada', 'Pancreatite (rara)', 'Acidose láctica (rara)'],
    monitor: ['Função renal (ajuste de dose)']
  },
  noradrenalina: {
    name: 'Noradrenalina',
    tags: ['vasopressor'],
    renal: [],
    effects: ['Isquemia periférica/necrose tecidual em extravasamento', 'Arritmia', 'Hipertensão'],
    monitor: ['Perfusão periférica e local de infusão (acesso central)', 'Pressão arterial invasiva / PAM']
  },
  amiodarona: {
    name: 'Amiodarona',
    tags: ['antiarritmico', 'qt', 'indutor_inibidor_multiplo'],
    renal: [],
    effects: ['Prolongamento de QT', 'Disfunção tireoidiana (hipo ou hiper)', 'Hepatotoxicidade', 'Toxicidade pulmonar', 'Bradicardia'],
    monitor: ['ECG', 'Função tireoidiana e hepática'],
    food: ['Evitar suco de toranja (grapefruit).']
  },
  nitroprussiato: {
    name: 'Nitroprussiato de sódio',
    tags: ['vasodilatador'],
    renal: [],
    effects: ['Hipotensão', 'Toxicidade por cianeto/tiocianato em uso prolongado'],
    monitor: ['Pressão arterial contínua', 'Acidose lática em uso prolongado', 'Função renal e hepática']
  },
  nitroglicerina: {
    name: 'Nitroglicerina',
    tags: ['vasodilatador'],
    renal: [],
    effects: ['Hipotensão', 'Cefaleia', 'Taquifilaxia'],
    monitor: ['Pressão arterial e frequência cardíaca']
  },
  enoxaparina: {
    name: 'Enoxaparina',
    tags: ['anticoagulante', 'profilaxia_tvp', 'renal_ajuste'],
    renal: [
      { min: 30, max: 999, dose: 'Profilaxia de TEV: 40mg SC 1x/dia | Tratamento (TEP/TVP): 1mg/kg SC 12/12h ou 1,5mg/kg 1x/dia' },
      { min: 0, max: 29, dose: 'Profilaxia de TEV: 20mg SC 1x/dia | Tratamento (TEP/TVP): 1mg/kg SC 24/24h (ou considerar migrar para HNF com TTPa)' },
    ],
    dialysis: 'Em diálise e ClCr < 15 mL/min, HNF (Heparina Não Fracionada) com controle de TTPa é preferida devido à imprevisibilidade de acúmulo da HBPM.',
    effects: ['Sangramento maior e menor', 'Trombocitopenia induzida por heparina (HIT/TIH)', 'Hematoma neuroaxial em punções'],
    monitor: ['Plaquetas basais e seriadas', 'Sinais de sangramento ativo', 'Clearance de creatinina (ClCr)']
  },
  rivaroxabana: {
    name: 'Rivaroxabana',
    tags: ['anticoagulante', 'substrato_cyp3a4', 'susceptivel_inducao', 'renal_ajuste'],
    renal: [
      { min: 30, max: 999, dose: 'Conforme indicação (20mg 1x/dia na FA; 15mg 12/12h 21 dias depois 20mg na TVP) — sem ajuste' },
      { min: 15, max: 29, dose: 'Usar com cautela; na fibrilação atrial considerar 15mg 1x/dia' },
      { min: 0, max: 14, dose: 'Uso não recomendado (ClCr <15 mL/min)' },
    ],
    dialysis: 'Não recomendado em pacientes dialíticos.',
    effects: ['Sangramento maior (incluindo intracraniano)', 'Hepatotoxicidade (rara)'],
    monitor: ['Sinais de sangramento', 'Função renal periodicamente'],
    maxDose: { value: 'Conforme indicação', note: 'contraindicado em hepatopatia com coagulopatia (Child-Pugh B/C)' }
  },
  varfarina: {
    name: 'Varfarina',
    tags: ['anticoagulante', 'substrato_cyp2c9', 'janela_terapeutica_estreita', 'susceptivel_inducao', 'nivel_serico'],
    renal: [
      { min: 0, max: 999, dose: 'Dose individualizada por RNI/TP (geralmente 2,5-10mg/dia) — guiada pelo RNI' },
    ],
    dialysis: 'Não é removida por diálise; ajuste exclusivamente por RNI.',
    effects: ['Sangramento', 'Necrose cutânea induzida por varfarina', 'Teratogênica (contraindicada na gravidez)'],
    monitor: ['RNI/TP seriado (reforçar monitorização 3 a 5 dias após alterar fármacos)', 'Sinais de sangramento'],
    food: ['Manter ingestão regular e consistente de alimentos ricos em vitamina K (vegetais verde-escuros).']
  },
  omeprazol: {
    name: 'Omeprazol',
    tags: ['ibp', 'profilaxia_ulcera'],
    renal: [],
    effects: ['Hipomagnesemia em uso prolongado', 'Risco de pneumonia nosocomial e colite por C. difficile', 'Interação com clopidogrel (inibe CYP2C19)'],
    monitor: ['Magnésio em uso prolongado', 'Reavaliar indicação formal de profilaxia de úlcera de estresse'],
    food: ['Administrar preferencialmente em jejum matinal. Em sonda nasoenteral, não triturar grânulos entéricos (usar veículo ácido ou formulação IV).']
  },
  pantoprazol: {
    name: 'Pantoprazol',
    tags: ['ibp', 'profilaxia_ulcera'],
    renal: [],
    effects: ['Hipomagnesemia em uso prolongado', 'Risco de pneumonia nosocomial/PAV e colite por C. difficile'],
    monitor: ['Magnésio em terapia prolongada', 'Reavaliar indicação formal de profilaxia de úlcera de estresse'],
    food: ['Pode ser administrado com ou sem alimentos; formulação IV disponível para uso em pacientes sem via oral/enteral disponível.']
  },
  prednisona: {
    name: 'Prednisona',
    tags: ['corticosteroide'],
    renal: [],
    effects: ['Hiperglicemia', 'Imunossupressão', 'Insônia/humor', 'Miopatia', 'Supressão do eixo HPA'],
    monitor: ['Glicemia capilar', 'Sinais de infecção', 'Desmame gradual em uso prolongado (>14-21 dias)'],
    food: ['Administrar com alimento para reduzir desconforto gástrico.']
  },
  prednisolona: {
    name: 'Prednisolona',
    tags: ['corticosteroide'],
    renal: [],
    effects: ['Hiperglicemia', 'Imunossupressão', 'Insônia/humor', 'Supressão do eixo HPA'],
    monitor: ['Glicemia capilar', 'Sinais de infecção', 'Desmame gradual em uso prolongado'],
    food: ['Administrar com alimentos para atenuar irritação gástrica.']
  },
  metilprednisolona: {
    name: 'Metilprednisolona',
    tags: ['corticosteroide'],
    renal: [],
    effects: ['Hiperglicemia', 'Imunossupressão', 'Miopatia (sobretudo com bloqueadores neuromusculares)'],
    monitor: ['Glicemia capilar', 'Sinais de infecção', 'Balanço hídrico']
  },
  dexametasona: {
    name: 'Dexametasona',
    tags: ['corticosteroide'],
    renal: [],
    effects: ['Hiperglicemia', 'Imunossupressão', 'Insônia/agitação', 'Supressão do eixo adrenal'],
    monitor: ['Glicemia capilar', 'Sinais de infecção', 'Desmame gradual se uso prolongado']
  },
  hidrocortisona: {
    name: 'Hidrocortisona',
    tags: ['corticosteroide'],
    renal: [],
    effects: ['Hiperglicemia', 'Retenção hidrossalina (efeito mineralocorticoide acentuado)', 'Imunossupressão'],
    monitor: ['Glicemia capilar', 'Pressão arterial, eletrólitos (K+, Na+) e balanço hídrico']
  },
  betametasona: {
    name: 'Betametasona',
    tags: ['corticosteroide'],
    renal: [],
    effects: ['Hiperglicemia', 'Imunossupressão', 'Supressão do eixo HPA'],
    monitor: ['Glicemia capilar', 'Sinais de infecção']
  },
  budesonida: {
    name: 'Budesonida',
    tags: ['corticosteroide'],
    renal: [],
    effects: ['Hiperglicemia (menor absorção sistêmica)', 'Candidíase oral se inalatória'],
    monitor: ['Glicemia capilar', 'Sinais de infecção local']
  },
  gabapentina: {
    name: 'Gabapentina',
    tags: ['anticonvulsivante', 'cns_depressor', 'renal_ajuste'],
    renal: [
      { min: 80, max: 999, dose: '900-3600mg/dia divididos em 3x/dia (dose padrão)' },
      { min: 50, max: 79, dose: '400-1400mg/dia' },
      { min: 30, max: 49, dose: '200-700mg/dia' },
      { min: 15, max: 29, dose: '200-700mg/dia (considerar 1x/dia)' },
      { min: 0, max: 14, dose: '100-300mg/dia em dose única diária' },
    ],
    dialysis: { hd: 'Dose de ataque 300-400mg, depois 200-300mg após cada sessão de HD de 4h' },
    effects: ['Sonolência/tontura', 'Edema periférico', 'Depressão respiratória em associação com opioides'],
    monitor: ['Nível de sedação com depressores do SNC', 'Função renal (ajuste de dose)']
  },
  pregabalina: {
    name: 'Pregabalina',
    tags: ['anticonvulsivante', 'cns_depressor', 'renal_ajuste'],
    renal: [
      { min: 60, max: 999, dose: '150-600mg/dia em 2-3x/dia (dose padrão)' },
      { min: 30, max: 59, dose: '75-300mg/dia' },
      { min: 15, max: 29, dose: '25-150mg/dia' },
      { min: 0, max: 14, dose: '25-75mg/dia' },
    ],
    dialysis: { hd: 'Dose suplementar de 25-100mg após sessão de HD' },
    effects: ['Sonolência/tontura', 'Edema periférico', 'Ganho de peso'],
    monitor: ['Nível de sedação', 'Função renal']
  },
  tramadol: {
    name: 'Tramadol',
    tags: ['opioide', 'cns_depressor', 'susceptivel_inducao', 'renal_ajuste', 'serotoninergico', 'substrato_cyp2d6'],
    renal: [
      { min: 30, max: 999, dose: '50-100mg a cada 4-6h (dose padrão, máx 400mg/dia)' },
      { min: 10, max: 29, dose: '50-100mg a cada 12h (máx 200mg/dia)' },
      { min: 0, max: 9, dose: '50mg a cada 12h' },
    ],
    dialysis: 'Removido lentamente por hemodiálise; ajustar pelo ClCr residual.',
    effects: ['Depressão respiratória', 'Redução do limiar convulsivo', 'Síndrome serotoninérgica (com ISRS/IRSN/linezolida)'],
    monitor: ['Drive respiratório', 'Síndrome serotoninérgica', 'Histórico de convulsão']
  },
  fluoxetina: {
    name: 'Fluoxetina',
    tags: ['antidepressivo', 'isrs', 'serotoninergico', 'inibidor_cyp2d6_potente', 'renal_ajuste'],
    renal: [{ min: 0, max: 999, dose: '20-80mg/dia (dose padrão) — não é necessário ajuste renal' }],
    effects: ['Síndrome serotoninérgica', 'Hiponatremia (SIADH)', 'Insônia/ativação'],
    monitor: ['Sódio em idosos', 'Sinais de síndrome serotoninérgica']
  },
  sertralina: {
    name: 'Sertralina',
    tags: ['antidepressivo', 'isrs', 'serotoninergico', 'renal_ajuste'],
    renal: [{ min: 0, max: 999, dose: '50-200mg/dia (dose padrão) — não é necessário ajuste renal' }],
    effects: ['Síndrome serotoninérgica', 'Hiponatremia (SIADH)', 'Diarreia'],
    monitor: ['Sódio em idosos']
  },
  escitalopram: {
    name: 'Escitalopram',
    tags: ['antidepressivo', 'isrs', 'serotoninergico', 'qt', 'renal_ajuste'],
    renal: [
      { min: 20, max: 999, dose: '10-20mg/dia (dose padrão) — sem ajuste' },
      { min: 0, max: 19, dose: 'Usar com cautela; considerar dose menor' },
    ],
    effects: ['Prolongamento de QT (dose-dependente)', 'Síndrome serotoninérgica', 'Hiponatremia'],
    monitor: ['ECG se outros fatores de risco para QT longo', 'Sódio em idosos']
  },
  citalopram: {
    name: 'Citalopram',
    tags: ['antidepressivo', 'isrs', 'serotoninergico', 'qt', 'renal_ajuste'],
    renal: [
      { min: 20, max: 999, dose: '20-40mg/dia (máx 20mg/dia em idosos ou hepatopatas)' },
      { min: 0, max: 19, dose: 'Usar com cautela' },
    ],
    effects: ['Prolongamento de QT dose-dependente', 'Síndrome serotoninérgica', 'Hiponatremia'],
    monitor: ['ECG se dose >20mg/dia ou fatores de risco', 'Sódio em idosos']
  },
  paroxetina: {
    name: 'Paroxetina',
    tags: ['antidepressivo', 'isrs', 'serotoninergico', 'inibidor_cyp2d6_potente', 'anticolinergico', 'renal_ajuste'],
    renal: [
      { min: 30, max: 999, dose: '20-50mg/dia (dose padrão)' },
      { min: 0, max: 29, dose: 'Iniciar com 10mg/dia e titular lentamente' },
    ],
    effects: ['Síndrome serotoninérgica', 'Efeitos anticolinérgicos', 'Síndrome de descontinuação'],
    monitor: ['Sódio em idosos']
  },
  duloxetina: {
    name: 'Duloxetina',
    tags: ['antidepressivo', 'isrsn', 'serotoninergico', 'renal_ajuste'],
    renal: [
      { min: 30, max: 999, dose: '60mg/dia (dose padrão)' },
      { min: 0, max: 29, dose: 'Não recomendado (incluindo diálise) — exposição 2x maior' },
    ],
    effects: ['Síndrome serotoninérgica', 'Hepatotoxicidade', 'Elevação da pressão arterial'],
    monitor: ['Pressão arterial', 'Transaminases']
  },
  venlafaxina: {
    name: 'Venlafaxina',
    tags: ['antidepressivo', 'isrsn', 'serotoninergico', 'qt', 'renal_ajuste'],
    renal: [
      { min: 30, max: 999, dose: '75-225mg/dia — reduzir dose em 25-50% em insuficiência leve a moderada' },
      { min: 0, max: 29, dose: 'Reduzir a dose em 50%' },
    ],
    dialysis: { hd: 'Reduzir em 50% e administrar após HD; evitar liberação prolongada' },
    effects: ['Síndrome serotoninérgica', 'Elevação pressórica', 'Prolongamento de QT em sobredose'],
    monitor: ['Pressão arterial', 'Sinais serotoninérgicos']
  },
  amitriptilina: {
    name: 'Amitriptilina',
    tags: ['antidepressivo', 'triciclico', 'cns_depressor', 'anticolinergico', 'qt', 'substrato_cyp2d6', 'evitar_idoso', 'renal_ajuste'],
    renal: [{ min: 0, max: 999, dose: 'Dose padrão, iniciar baixo e titular devagar — metabolização hepática' }],
    effects: ['Efeitos anticolinérgicos intensos (boca seca, retenção, constipação, confusão)', 'Prolongamento de QT / arritmia', 'Hipotensão ortostática', 'Sedação'],
    monitor: ['ECG', 'Delirium em idosos']
  },
  bupropiona: {
    name: 'Bupropiona',
    tags: ['antidepressivo', 'risco_convulsivo', 'renal_ajuste'],
    renal: [{ min: 0, max: 999, dose: 'Iniciar com dose ou frequência reduzida (150mg em dias alternados) em qualquer disfunção renal' }],
    effects: ['Redução do limiar convulsivo (dose-dependente)', 'Insônia/ativação', 'Hipertensão'],
    monitor: ['Pressão arterial', 'Sinais de convulsão/acúmulo']
  },
  mirtazapina: {
    name: 'Mirtazapina',
    tags: ['antidepressivo', 'cns_depressor', 'susceptivel_inducao', 'renal_ajuste'],
    renal: [
      { min: 40, max: 999, dose: '15-45mg/dia (dose padrão)' },
      { min: 10, max: 39, dose: 'Considerar redução de dose (depuração reduzida ~30%)' },
      { min: 0, max: 9, dose: 'Considerar redução de dose (depuração reduzida ~50%)' },
    ],
    effects: ['Sedação importante (maior em doses baixas)', 'Aumento de apetite/peso', 'Agranulocitose (rara)'],
    monitor: ['Nível de sedação', 'Hemograma']
  },
  clonazepam: {
    name: 'Clonazepam',
    tags: ['benzodiazepinico', 'cns_depressor', 'evitar_idoso', 'renal_ajuste'],
    renal: [{ min: 0, max: 999, dose: 'Dose padrão (0,5-4mg/dia) — usar com cautela em disfunção renal grave' }],
    effects: ['Sedação / depressão respiratória com opioides', 'Tolerância e dependência', 'Quedas em idosos'],
    monitor: ['Nível de sedação e drive respiratório']
  },
  lamotrigina: {
    name: 'Lamotrigina',
    tags: ['anticonvulsivante', 'susceptivel_inducao', 'renal_ajuste'],
    renal: [
      { min: 30, max: 999, dose: 'Dose padrão com titulação lenta obrigatória' },
      { min: 0, max: 29, dose: 'Considerar dose de manutenção reduzida' },
    ],
    dialysis: { hd: '~20% removida em 4h de HD; considerar dose pós-diálise' },
    effects: ['Rash cutâneo grave (Stevens-Johnson/DRESS — risco alto se titulação rápida)', 'Tontura/diplopia'],
    monitor: ['Pele (inspeção de lesões)', 'Nível sérico se associado a valproato']
  },
  risperidona: {
    name: 'Risperidona',
    tags: ['antipsicotico', 'risco_extrapiramidal', 'substrato_cyp2d6', 'cns_depressor', 'qt', 'renal_ajuste'],
    renal: [{ min: 0, max: 999, dose: 'Dose inicial reduzida e titulação mais lenta (ex: 0,5mg 2x/dia)' }],
    effects: ['Hiperprolactinemia', 'Reação extrapiramidal', 'Prolongamento de QT', 'Hipotensão ortostática'],
    monitor: ['Sinais extrapiramidais', 'ECG']
  },
  olanzapina: {
    name: 'Olanzapina',
    tags: ['antipsicotico', 'risco_extrapiramidal', 'cns_depressor', 'renal_ajuste'],
    renal: [{ min: 0, max: 999, dose: 'Dose padrão — metabolização hepática' }],
    effects: ['Ganho de peso acentuado', 'Sedação', 'Hiperglicemia/dislipidemia'],
    monitor: ['Glicemia e perfil lipídico', 'Peso']
  },
  donepezila: {
    name: 'Donepezila',
    tags: ['inibidor_colinesterase', 'renal_ajuste'],
    renal: [{ min: 0, max: 999, dose: '5-10mg/dia — não é necessário ajuste renal' }],
    effects: ['Bradicardia (efeito colinérgico)', 'Náusea, diarreia', 'Cãibras'],
    monitor: ['Frequência cardíaca (cuidado com outros bradicardizantes)']
  },
  memantina: {
    name: 'Memantina',
    tags: ['antagonista_nmda', 'renal_ajuste'],
    renal: [
      { min: 50, max: 999, dose: '20mg/dia (dose padrão)' },
      { min: 30, max: 49, dose: '10mg/dia (pode aumentar para 20mg após 7 dias se tolerado)' },
      { min: 5, max: 29, dose: '10mg/dia (dose máxima recomendada)' },
    ],
    effects: ['Tontura/cefaleia', 'Confusão (sinal de acúmulo em disfunção renal)', 'Constipação'],
    monitor: ['Função renal', 'Estado mental']
  },
  losartana: {
    name: 'Losartana Potássica',
    tags: ['anti-hipertensivo', 'bra', 'cardiovascular', 'risco_hipercalemia', 'renal_ajuste', 'teratogenico', 'substrato_cyp2c9'],
    renal: [
      { min: 30, max: 999, dose: '50mg a 100mg 1x/dia (dose padrão)' },
      { min: 0, max: 29, dose: 'Iniciar com 25mg a 50mg 1x/dia; titular conforme resposta e tolerância clínica' },
    ],
    dialysis: 'Não dialisável por hemodiálise (alta ligação proteica >98%); dose suplementar pós-HD desnecessária.',
    effects: ['Hipotensão postural/tontura', 'Hipercalemia (potencializada com espironolactona, IECA e suplementos de K)', 'Disfunção renal aguda transitória em estenose de artéria renal bilateral'],
    monitor: ['Pressão arterial', 'Potássio sérico', 'Creatinina e ureia'],
    maxDose: { value: '100mg/dia', note: 'doses superiores a 100mg não conferem ganho anti-hipertensivo adicional' }
  },
  olmesartana: {
    name: 'Olmesartana Medoxomila',
    tags: ['anti-hipertensivo', 'bra', 'cardiovascular', 'risco_hipercalemia', 'renal_ajuste', 'teratogenico'],
    renal: [
      { min: 30, max: 999, dose: '20mg a 40mg 1x/dia (dose padrão)' },
      { min: 0, max: 29, dose: 'Iniciar com 10mg a 20mg 1x/dia; dose máxima de 20mg/dia se ClCr < 20 mL/min' },
    ],
    dialysis: 'Não dialisável de forma significativa.',
    effects: ['Hipercalemia', 'Enteropatia sprue-like (diarreia crônica com atrofia de vilosidades intestinais)', 'Hipotensão'],
    monitor: ['Potássio', 'Função renal', 'Sintomas gastrointestinais persistentes'],
    maxDose: { value: '40mg/dia', note: 'máx 20mg/dia em ClCr < 20 mL/min' }
  },
  valsartana: {
    name: 'Valsartana',
    tags: ['anti-hipertensivo', 'bra', 'cardiovascular', 'risco_hipercalemia', 'renal_ajuste', 'teratogenico'],
    renal: [
      { min: 30, max: 999, dose: '80mg a 320mg 1x/dia (HAS) ou 40mg a 160mg 2x/dia (IC / pós-IAM)' },
      { min: 0, max: 29, dose: 'Iniciar com 40mg 1x/dia na HAS ou 20-40mg 2x/dia na IC; titular com monitorização' },
    ],
    dialysis: 'Não dialisável (ligação proteica ~95%).',
    effects: ['Hipercalemia', 'Hipotensão', 'Tontura', 'Piora de função renal em hipovolemia'],
    monitor: ['Pressão arterial', 'Potássio sérico', 'Creatinina'],
    maxDose: { value: '320mg/dia', note: '160mg 12/12h na IC ou 320mg 1x/dia na HAS' }
  },
  telmisartana: {
    name: 'Telmisartana',
    tags: ['anti-hipertensivo', 'bra', 'cardiovascular', 'risco_hipercalemia', 'renal_ajuste', 'teratogenico'],
    renal: [
      { min: 30, max: 999, dose: '40mg a 80mg 1x/dia (dose padrão — meia-vida prolongada de 24h)' },
      { min: 0, max: 29, dose: 'Iniciar com 20mg a 40mg 1x/dia; eliminação quase totalmente biliar/fecal' },
    ],
    dialysis: 'Não dialisável (ligação proteica >99,5%); não requer dose suplementar pós-HD.',
    effects: ['Hipotensão', 'Hipercalemia', 'Cefaleia/fadiga'],
    monitor: ['Pressão arterial', 'Potássio', 'Função renal'],
    maxDose: { value: '80mg/dia' }
  },
  candesartana: {
    name: 'Candesartana Cilexetila',
    tags: ['anti-hipertensivo', 'bra', 'cardiovascular', 'risco_hipercalemia', 'renal_ajuste', 'teratogenico'],
    renal: [
      { min: 30, max: 999, dose: '8mg a 32mg 1x/dia (iniciar com 4-8mg na IC)' },
      { min: 0, max: 29, dose: 'Iniciar com 4mg 1x/dia; titular cautelosamente' },
    ],
    dialysis: 'Não dialisável.',
    effects: ['Hipercalemia', 'Hipotensão postural', 'Tontura'],
    monitor: ['Potássio sérico', 'Creatinina', 'Pressão arterial'],
    maxDose: { value: '32mg/dia' }
  },
  hidroclorotiazida: {
    name: 'Hidroclorotiazida',
    tags: ['anti-hipertensivo', 'diuretico', 'diuretico_tiazidico', 'cardiovascular', 'risco_hipocalemia', 'risco_hiponatremia', 'renal_ajuste'],
    renal: [
      { min: 30, max: 999, dose: '12,5mg a 25mg 1x/dia (máx 50mg/dia)' },
      { min: 0, max: 29, dose: 'Eficácia diurética isolada muito reduzida; preferir diuréticos de alça (furosemida) como monoterapia, mantendo tiazídico apenas em bloqueio tubular sequencial' },
    ],
    dialysis: 'Não dialisável; ineficaz como diurético isolado em diálise/anúria.',
    effects: ['Hipocalemia e hipomagnesemia', 'Hiponatremia grave (idosos)', 'Hiperuricemia / crise de gota', 'Hiperglicemia / dislipidemia', 'Hipotensão ortostática'],
    monitor: ['Potássio e sódio séricos', 'Ácido úrico', 'Glicemia de jejum', 'Função renal'],
    maxDose: { value: '50mg/dia', note: 'em HAS, 25mg/dia já atinge o platô pressórico com menor toxicidade metabólica' }
  },
  indapamida: {
    name: 'Indapamida',
    tags: ['anti-hipertensivo', 'diuretico', 'diuretico_tiazidico_like', 'cardiovascular', 'risco_hipocalemia', 'risco_hiponatremia', 'renal_ajuste'],
    renal: [
      { min: 30, max: 999, dose: '1,5mg (liberação sustentada SR) ou 2,5mg 1x/dia pela manhã' },
      { min: 0, max: 29, dose: 'Contraindicada em insuficiência renal grave (ClCr < 30 mL/min)' },
    ],
    dialysis: 'Contraindicada em insuficiência renal grave / anúria.',
    effects: ['Hipocalemia', 'Hiponatremia', 'Hipotensão postural', 'Hiperuricemia', 'Fadiga'],
    monitor: ['Potássio e sódio séricos', 'Ácido úrico', 'Função renal'],
    maxDose: { value: '2,5mg/dia (ou 1,5mg SR)' }
  },
  clortalidona: {
    name: 'Clortalidona',
    tags: ['anti-hipertensivo', 'diuretico', 'diuretico_tiazidico_like', 'cardiovascular', 'risco_hipocalemia', 'risco_hiponatremia', 'renal_ajuste'],
    renal: [
      { min: 30, max: 999, dose: '12,5mg a 25mg 1x/dia pela manhã (meia-vida prolongada de 40-60h)' },
      { min: 0, max: 29, dose: 'Eficácia reduzida e risco elevado de distúrbios hidroeletrolíticos e azotemia; monitorar estritamente' },
    ],
    dialysis: 'Não dialisável.',
    effects: ['Hipocalemia severa e prolongada', 'Hiponatremia', 'Hiperuricemia / gota aguda', 'Hiperglicemia', 'Hipotensão'],
    monitor: ['Potássio sérico (risco aumentado de hipocalemia vs HCTZ)', 'Sódio', 'Ácido úrico', 'Função renal'],
    maxDose: { value: '50mg/dia', note: '12,5 a 25mg/dia é a faixa anti-hipertensiva ótima' }
  },
  espironolactona: {
    name: 'Espironolactona',
    tags: ['anti-hipertensivo', 'diuretico', 'poupador_potassio', 'antagonista_aldosterona', 'cardiovascular', 'risco_hipercalemia', 'renal_ajuste'],
    renal: [
      { min: 50, max: 999, dose: '12,5mg a 50mg 1x/dia (IC/HAS) ou até 100-200mg/dia na ascite hepática' },
      { min: 30, max: 49, dose: '12,5mg a cada 24-48h; monitorar potássio em 1 e 4 semanas e periodicamente' },
      { min: 0, max: 29, dose: 'Contraindicada / evitar pelo altíssimo risco de hipercalemia potencialmente fatal' },
    ],
    dialysis: 'Contraindicada em pacientes dialíticos ou com falência renal grave (anúria) pelo risco crítico de arritmias hipercalêmicas.',
    effects: ['Hipercalemia grave (arritmias cardíacas, PCR)', 'Ginecomastia dolorosa e impotência (efeito antiandrogênico)', 'Disfunção renal aguda', 'Hipotensão'],
    monitor: ['Potássio sérico (estrito: suspender se K > 5,5 mEq/L)', 'Creatinina sérica', 'Pressão arterial'],
    maxDose: { value: '100mg/dia (HAS/IC)', note: 'até 400mg/dia em ascite cirrótica sob protocolo estrito' }
  },
  atenolol: {
    name: 'Atenolol',
    tags: ['anti-hipertensivo', 'betabloqueador', 'cardiovascular', 'bradicardizante', 'renal_ajuste', 'evitar_idoso'],
    renal: [
      { min: 50, max: 999, dose: '25mg a 100mg 1x/dia (dose padrão)' },
      { min: 15, max: 49, dose: 'Dose máxima de 50mg/dia (ou 50mg a cada 48 horas)' },
      { min: 0, max: 14, dose: 'Dose máxima de 25mg/dia ou 50mg a cada 48 horas' },
    ],
    dialysis: { hd: '25-50mg após cada sessão de hemodiálise (cerca de 50% é removido por HD).' },
    effects: ['Bradicardia sinusal acentuada', 'Bloqueio atrioventricular (BAV)', 'Broncoespasmo', 'Fadiga e intolerância a exercícios', 'Mascaramento de sinais de hipoglicemia'],
    monitor: ['Frequência cardíaca (alvo basal 50-60 bpm)', 'Pressão arterial', 'ECG (intervalo PR)'],
    maxDose: { value: '100mg/dia', note: '50mg/dia se ClCr < 50; 25mg/dia se ClCr < 15 mL/min' }
  },
  bisoprolol: {
    name: 'Fumarato de Bisoprolol',
    tags: ['anti-hipertensivo', 'betabloqueador', 'cardiovascular', 'bradicardizante', 'renal_ajuste'],
    renal: [
      { min: 20, max: 999, dose: '2,5mg a 10mg 1x/dia (iniciar com 1,25mg na IC e titular a cada 2-4 semanas)' },
      { min: 0, max: 19, dose: 'Iniciar com 1,25mg a 2,5mg 1x/dia; dose máxima de 10mg/dia' },
    ],
    dialysis: 'Pouco dialisável; não requer dose suplementar pós-diálise.',
    effects: ['Bradicardia', 'Hipotensão', 'Fadiga e tontura', 'Extremidades frias', 'Piora transitória da congestão na titulação inicial de IC'],
    monitor: ['FC', 'PA', 'Sinais de congestão/peso na titulação de IC'],
    maxDose: { value: '10mg/dia (até 20mg/dia em casos excepcionais de HAS resistente)' }
  },
  nebivolol: {
    name: 'Cloridrato de Nebivolol',
    tags: ['anti-hipertensivo', 'betabloqueador', 'cardiovascular', 'bradicardizante', 'renal_ajuste'],
    renal: [
      { min: 30, max: 999, dose: '5mg 1x/dia (pode titular para 10mg após 2 semanas se necessário)' },
      { min: 0, max: 29, dose: 'Iniciar com 2,5mg 1x/dia; contraindicado em insuficiência renal grave não dialisada' },
    ],
    dialysis: 'Uso não recomendado em diálise devido à falta de dados de segurança.',
    effects: ['Bradicardia', 'Cefaleia', 'Tontura', 'Fadiga', 'Edema periférico leve (vasodilatação mediada por óxido nítrico)'],
    monitor: ['Frequência cardíaca', 'Pressão arterial'],
    maxDose: { value: '10mg/dia' }
  },
  metoprolol: {
    name: 'Succinato de Metoprolol',
    tags: ['anti-hipertensivo', 'betabloqueador', 'cardiovascular', 'bradicardizante', 'substrato_cyp2d6'],
    renal: [
      { min: 0, max: 999, dose: '25mg a 200mg 1x/dia (succinato) ou 50-100mg 12/12h (tartarato) — não requer ajuste de dose renal (metabolismo hepático extenso)' },
    ],
    dialysis: 'Não dialisável de forma significativa; não requer dose suplementar pós-HD.',
    effects: ['Bradicardia', 'Hipotensão', 'Tontura', 'Fadiga e sonolência', 'Broncoespasmo em altas doses'],
    monitor: ['FC', 'PA', 'ECG'],
    maxDose: { value: '200mg/dia (succinato) ou 400mg/dia (tartarato)' }
  },
  carvedilol: {
    name: 'Carvedilol',
    tags: ['anti-hipertensivo', 'betabloqueador', 'cardiovascular', 'bradicardizante', 'substrato_cyp2d6', 'substrato_cyp2c9'],
    renal: [
      { min: 0, max: 999, dose: '3,125mg a 25mg a cada 12h (IC) ou até 50mg/dia (HAS) — não é necessário ajuste renal (metabolismo hepático >98%)' },
    ],
    dialysis: 'Não dialisável (alta ligação proteica >98%); dose de reforço pós-HD desnecessária.',
    effects: ['Hipotensão postural/ortostática (bloqueio alfa-1)', 'Bradicardia e BAV', 'Tontura', 'Retenção hídrica inicial na IC', 'Broncoespasmo'],
    monitor: ['PA sentada e em ortostatismo', 'FC', 'Peso corporal diário na fase de titulação de IC'],
    maxDose: { value: '50mg/dia', note: '25mg 12/12h; ou 50mg 12/12h em pacientes com IC grave e peso > 85kg' }
  },
  propranolol: {
    name: 'Cloridrato de Propranolol',
    tags: ['anti-hipertensivo', 'betabloqueador', 'cardiovascular', 'bradicardizante', 'substrato_cyp2d6', 'substrato_cyp1a2'],
    renal: [
      { min: 0, max: 999, dose: '40mg a 240mg/dia divididos em 2 a 3 tomadas — eliminação primariamente hepática; não requer ajuste renal fixo, porém titular com cautela' },
    ],
    dialysis: 'Não dialisável (ligação proteica >90%).',
    effects: ['Broncoespasmo grave (contraindicado formalmente em asma/DPOC hiper-reativa)', 'Bradicardia e bloqueio AV', 'Fadiga e depressão', 'Extremidades frias', 'Pesadelos'],
    monitor: ['FC', 'PA', 'Ausculta pulmonar (sibilância)'],
    maxDose: { value: '320mg/dia (até 640mg/dia em situações excepcionais de arritmia ou tireotoxicose)' }
  },
  captopril: {
    name: 'Captopril',
    tags: ['anti-hipertensivo', 'ieca', 'cardiovascular', 'risco_hipercalemia', 'renal_ajuste', 'teratogenico'],
    renal: [
      { min: 50, max: 999, dose: '25mg a 50mg 2 a 3x/dia (dose padrão)' },
      { min: 10, max: 49, dose: '12,5mg a 25mg a cada 12-24 horas' },
      { min: 0, max: 9, dose: '6,25mg a 12,5mg a cada 24 horas' },
    ],
    dialysis: { hd: 'Dialisável (25-50% removido por HD); administrar dose suplementar de 50% após a hemodiálise.' },
    effects: ['Tosse seca irritativa intratável (acúmulo de bradicinina)', 'Angioedema (risco de via aérea)', 'Hipercalemia', 'Hipotensão de primeira dose', 'Disfunção renal aguda'],
    monitor: ['Potássio sérico', 'Creatinina/ureia', 'Pressão arterial'],
    maxDose: { value: '150mg/dia (em doses divididas)' }
  },
  enalapril: {
    name: 'Maleato de Enalapril',
    tags: ['anti-hipertensivo', 'ieca', 'cardiovascular', 'risco_hipercalemia', 'renal_ajuste', 'teratogenico'],
    renal: [
      { min: 30, max: 999, dose: '5mg a 40mg/dia (1 a 2 tomadas — dose padrão)' },
      { min: 10, max: 29, dose: 'Iniciar com 2,5mg 1x/dia; titular até máx 20mg/dia' },
      { min: 0, max: 9, dose: 'Iniciar com 2,5mg 1x/dia nos dias sem diálise' },
    ],
    dialysis: { hd: 'Dialisável (35-50% do enalaprilato é removido); administrar 2,5mg pós-sessão de HD.' },
    effects: ['Tosse seca persistente', 'Hipercalemia', 'Angioedema', 'Hipotensão', 'Deterioração de função renal em estenose de artéria renal'],
    monitor: ['Potássio sérico', 'Creatinina', 'PA'],
    maxDose: { value: '40mg/dia' }
  },
  lisinopril: {
    name: 'Lisinopril',
    tags: ['anti-hipertensivo', 'ieca', 'cardiovascular', 'risco_hipercalemia', 'renal_ajuste', 'teratogenico'],
    renal: [
      { min: 30, max: 999, dose: '10mg a 40mg 1x/dia (dose padrão)' },
      { min: 10, max: 29, dose: 'Iniciar com 2,5mg a 5mg 1x/dia; máx 20mg/dia' },
      { min: 0, max: 9, dose: '2,5mg 1x/dia' },
    ],
    dialysis: { hd: 'Dialisável (~50% removido por HD); administrar dose complementar após a sessão.' },
    effects: ['Tosse seca', 'Hipercalemia', 'Angioedema', 'Hipotensão'],
    monitor: ['Potássio sérico', 'Creatinina', 'PA'],
    maxDose: { value: '40mg/dia' }
  },
  ramipril: {
    name: 'Ramipril',
    tags: ['anti-hipertensivo', 'ieca', 'cardiovascular', 'risco_hipercalemia', 'renal_ajuste', 'teratogenico'],
    renal: [
      { min: 60, max: 999, dose: '2,5mg a 10mg 1x/dia (dose padrão)' },
      { min: 30, max: 59, dose: 'Iniciar com 1,25mg a 2,5mg 1x/dia; máx 5mg/dia' },
      { min: 0, max: 29, dose: 'Iniciar com 1,25mg 1x/dia; máx 2,5mg a 5mg/dia' },
    ],
    dialysis: 'Pouco dialisável (ramiprilato); titular com extremo cuidado.',
    effects: ['Tosse seca', 'Hipercalemia', 'Hipotensão', 'Angioedema'],
    monitor: ['Potássio', 'Função renal', 'Pressão arterial'],
    maxDose: { value: '10mg/dia' }
  },
  anlodipino: {
    name: 'Besilato de Anlodipino',
    tags: ['anti-hipertensivo', 'bcc_dihidropiridinico', 'cardiovascular', 'substrato_cyp3a4'],
    renal: [
      { min: 0, max: 999, dose: '2,5mg a 10mg 1x/dia — não requer ajuste de dose renal (eliminação 90% hepática)' },
    ],
    dialysis: 'Não dialisável (alta ligação a proteínas >97%).',
    effects: ['Edema maleolar/periférico dose-dependente', 'Cefaleia e rubor facial (flushing)', 'Tontura', 'Palpitações reflexas'],
    monitor: ['Pressão arterial', 'Edema de membros inferiores'],
    maxDose: { value: '10mg/dia' }
  },
  nifedipino: {
    name: 'Nifedipino (Adalat OROS / Retard)',
    tags: ['anti-hipertensivo', 'bcc_dihidropiridinico', 'cardiovascular', 'substrato_cyp3a4'],
    renal: [
      { min: 0, max: 999, dose: '20mg a 60mg 1x/dia (apresentação OROS/retard) — não requer ajuste em disfunção renal' },
    ],
    dialysis: 'Não dialisável.',
    effects: ['Edema periférico', 'Cefaleia', 'Rubor facial', 'Taquicardia reflexa', 'Constipação'],
    monitor: ['Pressão arterial', 'Edema', 'Sintomas vasomotores'],
    maxDose: { value: '90mg/dia (apresentação OROS)' }
  },
  verapamil: {
    name: 'Cloridrato de Verapamil',
    tags: ['anti-hipertensivo', 'antiarritmico', 'bcc_nao_dihidropiridinico', 'cardiovascular', 'bradicardizante', 'inibidor_cyp3a4_potente', 'substrato_cyp3a4', 'renal_ajuste'],
    renal: [
      { min: 10, max: 999, dose: '120mg a 480mg/dia (fracionados em 2-3x ou 1x/dia na formulação retard)' },
      { min: 0, max: 9, dose: 'Reduzir dose em 25-50% (risco de acúmulo e bradicardia/BAV grave)' },
    ],
    dialysis: 'Não dialisável (ligação proteica ~90%).',
    effects: ['Constipação intestinal intensa', 'Bradicardia acentuada e BAV', 'Descompensação de insuficiência cardíaca (inótropo negativo potente)', 'Hipotensão'],
    monitor: ['ECG (intervalo PR e ritmo sinusal)', 'FC', 'Hábito intestinal'],
    maxDose: { value: '480mg/dia' }
  },
  diltiazem: {
    name: 'Cloridrato de Diltiazem',
    tags: ['anti-hipertensivo', 'antiarritmico', 'bcc_nao_dihidropiridinico', 'cardiovascular', 'bradicardizante', 'inibidor_cyp3a4_potente', 'substrato_cyp3a4'],
    renal: [
      { min: 0, max: 999, dose: '120mg a 360mg/dia (divididos em 3-4 tomadas ou formulação de liberação prolongada) — não requer ajuste renal fixo; titular com cautela' },
    ],
    dialysis: 'Não dialisável.',
    effects: ['Bradicardia', 'Bloqueio AV', 'Edema maleolar', 'Hipotensão', 'Tontura'],
    monitor: ['FC', 'PA', 'ECG (intervalo PR)'],
    maxDose: { value: '360mg/dia' }
  },
  propafenona: {
    name: 'Cloridrato de Propafenona',
    tags: ['antiarritmico', 'classe_ic', 'cardiovascular', 'bradicardizante', 'proarritmico', 'substrato_cyp2d6', 'renal_ajuste'],
    renal: [
      { min: 30, max: 999, dose: '150mg a 300mg a cada 8 horas (dose padrão)' },
      { min: 0, max: 29, dose: 'Reduzir a dose em 25-50% (risco de acúmulo e efeito pró-arritmogênico ventricular)' },
    ],
    dialysis: 'Não dialisável (ligação proteica >97%).',
    effects: ['Alargamento de QRS e pró-arritmia ventricular', 'Gosto amargo/metálico característico', 'Efeito inotrópico negativo (contraindicada em cardiopatia estrutural/FE reduzida)', 'Tontura'],
    monitor: ['ECG seriado (largura do QRS — suspender se aumento >25%)', 'FC', 'Função ventricular'],
    maxDose: { value: '900mg/dia (300mg a cada 8h)' }
  },
  sotalol: {
    name: 'Cloridrato de Sotalol',
    tags: ['antiarritmico', 'classe_iii', 'betabloqueador', 'cardiovascular', 'qt', 'bradicardizante', 'renal_ajuste', 'janela_terapeutica_estreita'],
    renal: [
      { min: 60, max: 999, dose: '80mg a 160mg a cada 12 horas (dose padrão)' },
      { min: 30, max: 59, dose: '80mg a 160mg a cada 24 horas' },
      { min: 10, max: 29, dose: '80mg a cada 36-48 horas' },
      { min: 0, max: 9, dose: 'Contraindicado ou usar exclusivamente com monitorização contínua de QTc e telemetria' },
    ],
    dialysis: { hd: 'Dialisável (~50% removido na sessão de HD); administrar 80mg após cada hemodiálise.' },
    effects: ['Prolongamento extremo do intervalo QT e Torsades de Pointes (risco crítico na insuficiência renal)', 'Bradicardia severa e BAV', 'Broncoespasmo', 'Fadiga'],
    monitor: ['ECG basal e a cada ajuste (manter QTc < 500ms; suspender se > 500ms ou delta > 60ms)', 'Potássio e magnésio séricos', 'Creatinina/ClCr'],
    maxDose: { value: '320mg/dia', note: 'até 480mg/dia apenas em arritmias ventriculares refratárias com internação' }
  },
  digoxina: {
    name: 'Digoxina',
    tags: ['cardiovascular', 'inotropico', 'bradicardizante', 'janela_terapeutica_estreita', 'nivel_serico', 'renal_ajuste', 'evitar_idoso'],
    renal: [
      { min: 50, max: 999, dose: '0,125mg a 0,25mg 1x/dia' },
      { min: 30, max: 49, dose: '0,125mg 1x/dia ou a cada 48 horas' },
      { min: 10, max: 29, dose: '0,0625mg a 0,125mg a cada 48 horas' },
      { min: 0, max: 9, dose: '0,0625mg a cada 48 a 72 horas (ajustar estritamente por digoxinemia sérica)' },
    ],
    dialysis: 'Não dialisável de forma significativa (grande volume de distribuição tecidual Vd ~5-7 L/kg); não requer reforço pós-HD.',
    effects: ['Intoxicação digitálica (anorexia, náuseas, vômitos, xantopsia/visão amarelada)', 'Arritmias ventriculares fatais (extra-sístoles ventriculares bi-geminadas, taquicardia ventricular bidirecional)', 'BAV e bradicardia severa'],
    monitor: ['Digoxinemia sérica (alvo estrito: 0,5 a 0,9 ng/mL na IC; até 1,2 ng/mL na FA)', 'Potássio sérico (hipocalemia amplifica drasticamente a toxicidade)', 'Magnésio e cálcio séricos', 'ECG e função renal'],
    maxDose: { value: '0,25mg/dia', note: 'guiada por nível sérico terapêutico' }
  },
  rosuvastatina: {
    name: 'Rosuvastatina Cálcica',
    tags: ['estatina', 'hipolipemiante', 'cardiovascular', 'miopatia', 'renal_ajuste'],
    renal: [
      { min: 30, max: 999, dose: '10mg a 40mg 1x/dia (dose padrão)' },
      { min: 0, max: 29, dose: 'Iniciar com 5mg 1x/dia; dose máxima de 10mg/dia (dose de 40mg é contraindicada em ClCr < 30)' },
    ],
    dialysis: 'Não dialisável.',
    effects: ['Mialgia e fraqueza muscular proximal', 'Rabdomiólise (risco aumentado em DRC e com fibratos)', 'Elevação de transaminases hepáticas (ALT/AST)', 'Proteinúria tubular transitória em doses altas'],
    monitor: ['CPK se mialgia/fraqueza', 'Função hepática (ALT)', 'Função renal'],
    maxDose: { value: '40mg/dia', note: 'máx 10mg/dia em ClCr < 30 mL/min' }
  },
  sinvastatina: {
    name: 'Sinvastatina',
    tags: ['estatina', 'hipolipemiante', 'cardiovascular', 'miopatia', 'substrato_cyp3a4', 'renal_ajuste'],
    renal: [
      { min: 30, max: 999, dose: '10mg a 40mg 1x/dia à noite' },
      { min: 0, max: 29, dose: 'Iniciar com 5mg a 10mg 1x/dia à noite; titular com cautela devido ao risco aumentado de miopatia' },
    ],
    dialysis: 'Não dialisável.',
    effects: ['Mialgia e cãibras', 'Rabdomiólise com insuficiência renal aguda (risco crítico na associação com inibidores de CYP3A4)', 'Elevação de transaminases'],
    monitor: ['CPK em caso de dor muscular', 'ALT/AST', 'Interações medicamentosas via CYP3A4'],
    maxDose: { value: '40mg/dia', note: 'dose de 80mg/dia desaconselhada por risco excessivo de miopatia' }
  },
  atorvastatina: {
    name: 'Atorvastatina Cálcica',
    tags: ['estatina', 'hipolipemiante', 'cardiovascular', 'miopatia', 'substrato_cyp3a4'],
    renal: [
      { min: 0, max: 999, dose: '10mg a 80mg 1x/dia — não requer ajuste de dose renal (eliminação hepática/fecal >98%)' },
    ],
    dialysis: 'Não dialisável (alta ligação a proteínas plasmáticas >98%).',
    effects: ['Mialgia', 'Elevação de transaminases', 'Rabdomiólise (rara em monoterapia)', 'Elevação leve de HbA1c/glicemia'],
    monitor: ['Transaminases basais e se sintomas', 'CPK se queixas musculares', 'Perfil lipídico'],
    maxDose: { value: '80mg/dia' }
  },
  ezetimiba: {
    name: 'Ezetimiba',
    tags: ['hipolipemiante', 'cardiovascular'],
    renal: [
      { min: 0, max: 999, dose: '10mg 1x/dia — não requer ajuste de dose em nenhum estágio de insuficiência renal ou diálise' },
    ],
    dialysis: 'Não dialisável; dose padrão de 10mg mantida.',
    effects: ['Diarreia e desconforto abdominal leve', 'Cefaleia', 'Mialgia (quando associada a estatina)'],
    monitor: ['Perfil lipídico', 'Transaminases quando combinada a estatinas'],
    maxDose: { value: '10mg/dia' }
  },
  fenofibrato: {
    name: 'Fenofibrato',
    tags: ['fibrato', 'hipolipemiante', 'cardiovascular', 'miopatia', 'renal_ajuste'],
    renal: [
      { min: 60, max: 999, dose: '160mg a 200mg 1x/dia (formulação micronizada — dose padrão)' },
      { min: 30, max: 59, dose: 'Iniciar com 54mg a 67mg 1x/dia; máx 100mg/dia' },
      { min: 0, max: 29, dose: 'Contraindicado pelo alto risco de acúmulo grave e rabdomiólise' },
    ],
    dialysis: 'Contraindicado em pacientes em hemodiálise e insuficiência renal terminal.',
    effects: ['Rabdomiólise grave (risco potencializado na coadministração com estatinas)', 'Elevação reversível da creatinina sérica por inibição competitiva da secreção tubular', 'Colelitíase', 'Elevação de transaminases'],
    monitor: ['Creatinina sérica basal e no seguimento', 'CPK', 'Função hepática'],
    maxDose: { value: '200mg/dia (micronizado)' }
  },
  metformina: {
    name: 'Cloridrato de Metformina',
    tags: ['antidiabetico', 'biguanida', 'renal_ajuste', 'acidose_lactica'],
    renal: [
      { min: 60, max: 999, dose: '1000mg a 2550mg/dia (convencional fracionada) ou até 2000mg 1x/dia (Glifage XR à noite)' },
      { min: 45, max: 59, dose: 'Dose máxima de 1500mg/dia; monitorar função renal a cada 3 a 6 meses' },
      { min: 30, max: 44, dose: 'Dose máxima de 1000mg/dia; não iniciar novos tratamentos; reavaliar relação risco/benefício' },
      { min: 0, max: 29, dose: 'Contraindicada formalmente (risco severo de acidose láctica potencialmente fatal)' },
    ],
    dialysis: 'Contraindicada em pacientes sob hemodiálise (risco de acidose láctica letal).',
    effects: ['Acidose láctica associada à metformina (MALA — alta letalidade)', 'Desconforto gastrointestinal dose-dependente (diarreia, náuseas, cólicas, dispepsia)', 'Deficiência de vitamina B12 em uso crônico', 'Gosto metálico'],
    monitor: ['Taxa de filtração glomerular / ClCr a cada 3-6 meses', 'Gasometria e lactato se hipotensão, sepse ou hipoperfusão', 'Vitamina B12 anual'],
    maxDose: { value: '2550mg/dia (convencional) ou 2000mg/dia (Glifage XR)' }
  },
  dapagliflozina: {
    name: 'Dapagliflozina',
    tags: ['antidiabetico', 'isglt2', 'cardiovascular', 'renal_ajuste', 'risco_cetoacidose'],
    renal: [
      { min: 25, max: 999, dose: '10mg 1x/dia (dose única indicada para DM2, IC com FE reduzida/preservada e DRC)' },
      { min: 0, max: 24, dose: 'Não recomendado iniciar se ClCr < 25 mL/min; contraindicada formalmente em hemodiálise e insuficiência renal terminal' },
    ],
    dialysis: 'Contraindicada em hemodiálise e doença renal em estágio terminal.',
    effects: ['Infecções micóticas genitais (candidíase vulvovaginal / balanopostite)', 'Cetoacidose diabética euglicêmica (glicemia < 250 mg/dL com acidose metabólica e cetonemia)', 'Hipotensão e depleção volêmica por diurese osmótica', 'Gangrena de Fournier (rara)'],
    monitor: ['Status volêmico e pressão arterial', 'Glicemia e cetonemia se sintomas de mal-estar/acidose', 'Higiene genital'],
    maxDose: { value: '10mg/dia' }
  },
  empagliflozina: {
    name: 'Empagliflozina',
    tags: ['antidiabetico', 'isglt2', 'cardiovascular', 'renal_ajuste', 'risco_cetoacidose'],
    renal: [
      { min: 30, max: 999, dose: '10mg a 25mg 1x/dia' },
      { min: 20, max: 29, dose: '10mg 1x/dia (eficácia hipoglicemiante atenuada, mantido benefício cardioprotetor e nefroprotetor na IC e DRC)' },
      { min: 0, max: 19, dose: 'Não recomendado o início; contraindicada em hemodiálise' },
    ],
    dialysis: 'Contraindicada em pacientes dependentes de diálise.',
    effects: ['Infecções genitais micóticas', 'Cetoacidose euglicêmica', 'Hipotensão ortostática', 'Poliúria'],
    monitor: ['Pressão arterial e hidratação', 'Glicemia e cetonas se náuseas/vômitos ou dispneia', 'Função renal'],
    maxDose: { value: '25mg/dia (10mg/dia em IC e DRC)' }
  },
  glibenclamida: {
    name: 'Glibenclamida',
    tags: ['antidiabetico', 'sulfonilureia', 'risco_hipoglicemia', 'renal_ajuste', 'evitar_idoso'],
    renal: [
      { min: 60, max: 999, dose: '2,5mg a 15mg/dia (em 1 ou 2 tomadas antes das principais refeições)' },
      { min: 30, max: 59, dose: 'Iniciar com 1,25mg a 2,5mg/dia; alto risco de acúmulo de metabólitos ativos' },
      { min: 0, max: 29, dose: 'Contraindicada formalmente (risco severo de hipoglicemia prolongada e refratária)' },
    ],
    dialysis: 'Contraindicada em pacientes dialíticos e em idosos (Critérios de Beers).',
    effects: ['Hipoglicemia severa, prolongada e recorrente (meia-vida biológica estendida)', 'Ganho de peso', 'Colestase hepática (rara)'],
    monitor: ['Glicemia capilar seriada', 'Função renal', 'Sinais autonômicos e neuroglicopênicos de hipoglicemia'],
    maxDose: { value: '20mg/dia (doses acima de 10mg raramente trazem melhora do controle glicêmico)' }
  },
  gliclazida: {
    name: 'Gliclazida MR',
    tags: ['antidiabetico', 'sulfonilureia', 'risco_hipoglicemia', 'renal_ajuste'],
    renal: [
      { min: 30, max: 999, dose: '30mg a 120mg 1x/dia no café da manhã (liberação modificada MR)' },
      { min: 15, max: 29, dose: 'Usar com estrita cautela na dose inicial de 30mg/dia; monitorar glicemias rigorosamente' },
      { min: 0, max: 14, dose: 'Contraindicada' },
    ],
    dialysis: 'Contraindicada em hemodiálise pelo risco de hipoglicemia.',
    effects: ['Hipoglicemia (menor risco que glibenclamida, metabólitos inativos)', 'Ganho ponderal', 'Desconforto gástrico leve'],
    monitor: ['Glicemia capilar', 'Função renal'],
    maxDose: { value: '120mg/dia (formulação MR)' }
  },
  sitagliptina: {
    name: 'Fosfato de Sitagliptina',
    tags: ['antidiabetico', 'idpp4', 'renal_ajuste'],
    renal: [
      { min: 50, max: 999, dose: '100mg 1x/dia (dose padrão)' },
      { min: 30, max: 49, dose: '50mg 1x/dia' },
      { min: 0, max: 29, dose: '25mg 1x/dia (inclusive sob hemodiálise)' },
    ],
    dialysis: { hd: '25mg 1x/dia (pode ser administrada independentemente do horário da sessão de HD).' },
    effects: ['Pancreatite aguda (rara)', 'Artralgia intensa e incapacitante', 'Nasofaringite e cefaleia', 'Reações de hipersensibilidade'],
    monitor: ['Função renal (ClCr)', 'Sintomas gastrointestinais / dor abdominal irradiada para o dorso (pancreatite)', 'Glicemia'],
    maxDose: { value: '100mg/dia (50mg se ClCr 30-49; 25mg se ClCr < 30)' }
  },
  linagliptina: {
    name: 'Linagliptina',
    tags: ['antidiabetico', 'idpp4'],
    renal: [
      { min: 0, max: 999, dose: '5mg 1x/dia — NÃO é necessário qualquer ajuste de dose por função renal (eliminação 95% biliar/fecal)' },
    ],
    dialysis: '5mg 1x/dia (não requer ajuste nem dose de reforço pós-diálise).',
    effects: ['Nasofaringite', 'Pancreatite (rara)', 'Urticária/angioedema'],
    monitor: ['Glicemia', 'Sintomas abdominais'],
    maxDose: { value: '5mg/dia' }
  },
  saxagliptina: {
    name: 'Cloridrato de Saxagliptina',
    tags: ['antidiabetico', 'idpp4', 'renal_ajuste', 'substrato_cyp3a4'],
    renal: [
      { min: 50, max: 999, dose: '5mg 1x/dia (dose padrão)' },
      { min: 0, max: 49, dose: '2,5mg 1x/dia' },
    ],
    dialysis: { hd: '2,5mg 1x/dia (administrar preferencialmente após a sessão de hemodiálise).' },
    effects: ['Aumento do risco de hospitalização por insuficiência cardíaca (evitar em pacientes com histórico de IC)', 'Pancreatite', 'Artralgia'],
    monitor: ['Sinais e sintomas de insuficiência cardíaca (dispneia, edema, turgência jugular)', 'Função renal'],
    maxDose: { value: '5mg/dia (2,5mg/dia se ClCr < 50 mL/min)' }
  },
  ivermectina: {
    name: 'Ivermectina',
    tags: ['antiparasitario', 'substrato_cyp3a4'],
    renal: [
      { min: 0, max: 999, dose: '200 mcg/kg em dose única via oral (administrar com água em jejum) — não é necessário ajuste renal (eliminação <1% urinária)' },
    ],
    dialysis: 'Não dialisável (alta ligação proteica ~93%).',
    effects: ['Reação de Mazzotti por lise parasitária (prurido, exantema, febre, mialgia)', 'Tontura e sonolência', 'Diarreia e dor abdominal', 'Hipotensão transitória'],
    monitor: ['Sintomas neuropsiquiátricos', 'Resposta parasitológica e avaliação para segunda dose após 14 dias'],
    maxDose: { value: '200 mcg/kg (em filariose sob protocolo até 400 mcg/kg)' }
  },
  nitazoxanida: {
    name: 'Nitazoxanida',
    tags: ['antiparasitario'],
    renal: [
      { min: 0, max: 999, dose: '500mg a cada 12 horas por 3 dias consecutivos (administrar com alimento) — não requer ajuste renal prévio' },
    ],
    dialysis: 'Metabólito ativo tizoxanida possui ligação proteica >99%, não sendo removido por hemodiálise.',
    effects: ['Coloração amarela/esverdeada fluorescente da urina e esperma (benigno e reversível)', 'Dor abdominal epigástrica e diarreia', 'Náuseas e vômitos', 'Cefaleia'],
    monitor: ['Sintomas gastrointestinais', 'Coloração de excretas corpóreas'],
    maxDose: { value: '1000mg/dia (500mg a cada 12h por 3 dias)' }
  },
  lacosamida: {
    name: 'Lacosamida',
    tags: ['anticonvulsivante', 'renal_ajuste'],
    renal: [
      { min: 50, max: 999, dose: '100mg a 400mg/dia divididos em 2 tomadas (iniciar com 50mg 12/12h e titular)' },
      { min: 30, max: 49, dose: 'Dose máxima recomendada de 300mg/dia' },
      { min: 0, max: 29, dose: 'Dose máxima recomendada de 250mg a 300mg/dia; titular cautelosamente' },
    ],
    dialysis: { hd: 'Dialisável (cerca de 50% é removido após 4h de HD); administrar dose suplementar de até 50% após a sessão de hemodiálise.' },
    effects: ['Prolongamento do intervalo PR / risco de bloqueio atrioventricular de primeiro grau ou síncope', 'Tontura e ataxia', 'Diplopia e nistagmo', 'Náuseas e cefaleia'],
    monitor: ['ECG basal e pós-titulação em cardiopatas ou uso de outros fármacos que prolongam o PR', 'Controle de crises convulsivas'],
    maxDose: { value: '400mg/dia (300mg/dia em ClCr < 30 mL/min)' }
  },
  eritropoietina: {
    name: 'Alfaepoetina (Eritropoetina Humana Recombinante)',
    tags: ['fator_estimulador_eritropoiese', 'antianemico', 'cardiovascular', 'risco_trombose'],
    renal: [
      { min: 0, max: 999, dose: '50 a 100 UI/kg IV ou SC 3x por semana (ou 20-30 UI/kg em pré-diálise). Ajustar dose para manter hemoglobina alvo estrita entre 10 e 11,5 g/dL (evitar Hb > 12 g/dL)' },
    ],
    dialysis: '50-100 UI/kg IV no circuito de retorno após cada sessão de hemodiálise (via IV preferencial em pacientes em HD).',
    effects: ['Hipertensão arterial severa / descontrole pressórico agudo', 'Trombose vascular (trombose da fístula arteriovenosa de diálise, AVC, IAM, TVP)', 'Aplasia pura de células vermelhas mediada por anticorpos anti-EPO (rara)', 'Sintomas gripais na fase inicial'],
    monitor: ['Hemoglobina quinzenal ou mensal (alvo: 10,0 a 11,5 g/dL; suspender ou reduzir dose se Hb > 11,5-12,0 g/dL)', 'Pressão arterial antes e durante cada administração/sessão de HD', 'Cinética do ferro (manter saturação de transferrina ≥20% e ferritina ≥200 ng/mL para eficácia da EPO)', 'Patência da fístula arteriovenosa'],
    maxDose: { value: '300 UI/kg/semana', note: 'ajustes escalonados de 25% conforme delta da hemoglobina' }
  }
};

export const DRUGS: Record<string, Drug> = Object.fromEntries(
  Object.entries(RAW_DRUGS).map(([id, drug]) => {
    const ref = DRUG_REFERENCES[id];
    return [
      id,
      {
        ...drug,
        brandName: ref?.brandName,
        manufacturer: ref?.manufacturer,
        referenceType: ref?.referenceType,
        bulaSlug: ref?.bulaSlug,
        bulaUrl: ref?.bulaUrl,
        bulaLabel: ref?.bulaLabel,
        anvisaRecord: ref?.anvisaRegNumber,
        anvisaSearchQuery: ref?.anvisaSearchQuery,
      }
    ];
  })
);

export const INDICATIONS: Record<string, { name: string }> = {
  tetano: { name: 'Tétano grave' },
  sepse_mdr: { name: 'Infecção por MDR / Sepse grave' },
  status_epilepticus: { name: 'Status epilepticus / Crise refratária' },
  tce_hic: { name: 'TCE / Hipertensão intracraniana' },
  agitacao_refrataria: { name: 'Agitação / Delirium refratário' },
};

export const CONTEXT_MODIFIERS = [
  {
    indication: 'tetano',
    key: 'cns_stack',
    newSeverity: 'atencao' as const,
    note: 'Combinação de sedativos/relaxantes musculares (benzodiazepínicos ± baclofeno) é conduta padrão no controle de espasmos no tétano grave. Mantida recomendação de monitorização respiratória.'
  },
  {
    indication: 'sepse_mdr',
    key: 'nefro_stack',
    newSeverity: 'atencao' as const,
    note: 'Associação provavelmente intencional para cobertura de patógeno multirresistente. Monitorização de função renal segue recomendada.'
  },
  {
    indication: 'status_epilepticus',
    key: 'janela_estreita_stack',
    newSeverity: 'atencao' as const,
    note: 'Politerapia anticonvulsivante esperada no manejo de status epilepticus / epilepsia refratária. Monitorização de níveis séricos segue recomendada.'
  },
  {
    indication: 'agitacao_refrataria',
    key: 'cns_stack',
    newSeverity: 'atencao' as const,
    note: 'Associação de sedativos pode ser intencional no manejo de agitação refratária. Ainda assim, atenção ao efeito aditivo sobre drive respiratório.'
  },
];

export const SPECIFIC_RULES = [
  {
    match: ['meropenem', 'acido_valproico'],
    key: 'meropenem_valproico',
    severity: 'critico' as const,
    text: 'Carbapenêmicos reduzem significativamente (60–90%) o nível sérico de valproato, com risco real de crise convulsiva breakthrough. Considerar dosagem sérica de valproato durante o curso do antibiótico ou discutir esquema anticonvulsivante alternativo.'
  },
  {
    match: ['fenitoina', 'acido_valproico'],
    key: 'fenitoina_valproico',
    severity: 'atencao' as const,
    text: 'Interação bidirecional: valproato inibe o metabolismo da fenitoína (aumenta fração livre); fenitoína induz o metabolismo do valproato (reduz nível). Monitorar níveis séricos de ambos.'
  },
  {
    match: ['fenitoina', 'fenobarbital'],
    key: 'fenitoina_fenobarbital',
    severity: 'atencao' as const,
    text: 'Dois anticonvulsivantes indutores enzimáticos associados — interação mútua complexa e imprevisível sobre os níveis séricos de ambos. Reforçar monitorização de nível sérico e resposta clínica.'
  },
  {
    match: ['carbamazepina', 'fenitoina'],
    key: 'carbamazepina_fenitoina',
    severity: 'atencao' as const,
    text: 'Indução enzimática mútua entre dois anticonvulsivantes — pode alterar imprevisivelmente os níveis séricos de ambos. Monitorar nível sérico e resposta clínica.'
  },
  {
    match: ['carbamazepina', 'acido_valproico'],
    key: 'carbamazepina_valproico',
    severity: 'atencao' as const,
    text: 'Valproato inibe a epóxido-hidrolase e pode elevar o metabólito ativo da carbamazepina (10,11-epóxido) mesmo com o nível total de carbamazepina normal — risco de toxicidade sem elevação aparente do nível medido. Monitorar clinicamente sinais de toxicidade (ataxia, diplopia, sedação).'
  },
  {
    match: ['rifampicina', 'fenitoina'],
    key: 'rifampicina_fenitoina',
    severity: 'critico' as const,
    text: 'Rifampicina é indutor potente do CYP450 e reduz substancialmente os níveis de fenitoína — risco de perda de controle de crises. Monitorar nível sérico e considerar ajuste de dose.'
  },
  {
    match: ['rifampicina', 'midazolam'],
    key: 'rifampicina_midazolam',
    severity: 'atencao' as const,
    text: 'Rifampicina induz CYP3A4 e pode reduzir significativamente o efeito sedativo do midazolam — risco de sedação inadequada em uso prolongado concomitante.'
  },
  {
    match: ['rifampicina', 'fentanil'],
    key: 'rifampicina_fentanil',
    severity: 'atencao' as const,
    text: 'Rifampicina (indutor de CYP3A4) pode reduzir a eficácia analgésica do fentanil em uso concomitante prolongado.'
  },
  {
    match: ['isoniazida', 'fenitoina'],
    key: 'isoniazida_fenitoina',
    severity: 'atencao' as const,
    text: 'Isoniazida inibe o metabolismo da fenitoína (CYP2C9), podendo elevar seus níveis séricos — risco de toxicidade. Considerar monitorização, especialmente em acetiladores lentos.'
  },
  {
    match: ['amicacina', 'furosemida'],
    key: 'aminoglicosideo_furosemida',
    severity: 'atencao' as const,
    text: 'Associação de aminoglicosídeo com diurético de alça potencializa o risco de ototoxicidade.'
  },
  {
    match: ['gentamicina', 'furosemida'],
    key: 'aminoglicosideo_furosemida',
    severity: 'atencao' as const,
    text: 'Associação de aminoglicosídeo com diurético de alça potencializa o risco de ototoxicidade.'
  },
  {
    match: ['zidovudina', 'linezolida'],
    key: 'azt_linezolida',
    severity: 'critico' as const,
    text: 'Mielossupressão aditiva relevante (anemia, leucopenia, trombocitopenia) entre zidovudina e linezolida — associação a evitar. Substituir AZT por tenofovir ou abacavir; se inevitável, realizar hemograma semanal.'
  },
  {
    match: ['dolutegravir', 'rifampicina'],
    key: 'dtg_rifampicina',
    severity: 'critico' as const,
    text: 'Rifampicina induz UGT1A1/CYP3A4 e reduz o nível sérico de dolutegravir em cerca de 57%. Dobrar a dose de dolutegravir para 50mg a cada 12 horas durante todo o tratamento com rifampicina, retornando à dose padrão 15 dias após o término.'
  },
  {
    match: ['darunavir', 'rifampicina'],
    key: 'drv_rifampicina',
    severity: 'critico' as const,
    text: 'A indução de CYP3A4 pela rifampicina prevalece sobre a inibição pelo ritonavir, reduzindo o nível sérico de darunavir em mais de 80% — combinação contraindicada. Substituir rifampicina por rifabutina em dose reduzida.'
  },
  {
    match: ['lopinavir_ritonavir', 'rifampicina'],
    key: 'lpvr_rifampicina',
    severity: 'critico' as const,
    text: 'A indução de CYP3A4 pela rifampicina supera a inibição pelo ritonavir, reduzindo o nível sérico de lopinavir em mais de 75% — combinação contraindicada. Substituir rifampicina por rifabutina em dose reduzida.'
  },
  {
    match: ['lamotrigina', 'acido_valproico'],
    key: 'lamotrigina_valproico',
    severity: 'critico' as const,
    text: 'Ácido valproico inibe a glicuronidação da lamotrigina, podendo dobrar seu nível sérico — aumenta o risco de rash grave (incluindo Stevens-Johnson/DRESS). Reduzir a dose de lamotrigina para cerca da metade da dose usual e titular lentamente.'
  },
  {
    match: ['topiramato', 'acido_valproico'],
    key: 'topiramato_valproico',
    severity: 'atencao' as const,
    text: 'Associação com risco descrito de hiperamonemia e encefalopatia, mesmo com amônia previamente normal. Monitorar estado mental; dosar amônia se rebaixamento do sensório.'
  },
  {
    match: ['bupropiona', 'tramadol'],
    key: 'bupropiona_tramadol',
    severity: 'critico' as const,
    text: 'Redução aditiva do limiar convulsivo entre bupropiona e tramadol — associação a evitar, sobretudo em pacientes com fatores de risco para convulsão.'
  },
  {
    match: ['cetoconazol', 'varfarina'],
    key: 'cetoconazol_varfarina',
    severity: 'critico' as const,
    text: 'Cetoconazol inibe potentemente o CYP3A4 e compromete a depuração da varfarina, aumentando significativamente o RNI e o risco hemorrágico.'
  },
  {
    match: ['cetoconazol', 'rivaroxabana'],
    key: 'cetoconazol_rivaroxabana',
    severity: 'critico' as const,
    text: 'Cetoconazol eleva substancialmente os níveis de rivaroxabana via inibição do CYP3A4 e P-gp — risco aumentado de sangramentos maiores.'
  },
  {
    match: ['voriconazol', 'varfarina'],
    key: 'voriconazol_varfarina',
    severity: 'atencao' as const,
    text: 'Voriconazol aumenta o tempo de protrombina/RNI na vigência de varfarina. Monitorar RNI em intervalos curtos.'
  },
  {
    match: ['voriconazol', 'rivaroxabana'],
    key: 'voriconazol_rivaroxabana',
    severity: 'critico' as const,
    text: 'Voriconazol inibe potentemente CYP3A4 elevando as concentrações de rivaroxabana — associação desaconselhada pelo risco de sangramento.'
  },
  {
    match: ['fluconazol', 'varfarina'],
    key: 'fluconazol_varfarina',
    severity: 'critico' as const,
    text: 'Fluconazol inibe o metabolismo da varfarina e eleva substancialmente o RNI, com risco de hemorragias graves. Monitorar RNI e ajustar dose.'
  },
  {
    match: ['rivaroxabana', 'enoxaparina'],
    key: 'rivaroxabana_enoxaparina',
    severity: 'atencao' as const,
    text: 'Duplicidade de anticoagulantes — aceitável somente em pontes ou transições específicas. Eleva substancialmente o risco hemorrágico sem ganho de eficácia.'
  },
  {
    match: ['varfarina', 'enoxaparina'],
    key: 'varfarina_enoxaparina',
    severity: 'informativo' as const,
    text: 'Sobreposição esperada na fase de ponte/indução da varfarina até que o RNI atinja a faixa terapêutica por 2 dias consecutivos.'
  },
  {
    match: ['bromoprida', 'metoclopramida', 'domperidona'],
    key: 'triplice_procinetica',
    severity: 'critico' as const,
    text: 'Duplicidade terapêutica tríplice de procinéticos (mesmo mecanismo de ação): risco severo de reações extrapiramidais graves (distonia aguda, acatisia, parkinsonismo), sedação excessiva e arritmias por prolongamento do QT (domperidona). Conduta: manter apenas um agente em monoterapia e suspender os demais.'
  },
  {
    match: ['bromoprida', 'metoclopramida'],
    key: 'bromoprida_metoclopramida',
    severity: 'critico' as const,
    text: 'Duplicidade de benzamidas: Bromoprida e Metoclopramida compartilham o mesmo mecanismo antagonista D2. Duplicação do risco de reações extrapiramidais agudas (distonia, acatisia, parkinsonismo) e sedação sem ganho de eficácia. Conduta: desprescrever um dos fármacos.'
  },
  {
    match: ['metoclopramida', 'domperidona'],
    key: 'metoclopramida_domperidona',
    severity: 'critico' as const,
    text: 'Sobreposição de procinéticos: Metoclopramida (D2 central) e Domperidona (D2 periférico). Risco aditivo de hiperprolactinemia, arritmia por prolongamento de QT (domperidona) e sintomas extrapiramidais (metoclopramida). Conduta: manter monoterapia com agente único.'
  },
  {
    match: ['bromoprida', 'domperidona'],
    key: 'bromoprida_domperidona',
    severity: 'critico' as const,
    text: 'Sobreposição de procinéticos: Bromoprida e Domperidona. Risco aumentado de sintomas extrapiramidais (bromoprida) somado ao potencial arritmogênico por prolongamento do QT (domperidona). Conduta: desprescrever a sobreposição farmacológica.'
  },
  {
    match: ['sinvastatina', 'claritromicina'],
    key: 'sinvastatina_claritromicina',
    severity: 'critico' as const,
    text: 'Inibição potente do CYP3A4 pela Claritromicina eleva em até 10-12 vezes os níveis séricos da Sinvastatina, disparando o risco de rabdomiólise fatal e insuficiência renal aguda. Associação formalmente contraindicada; suspender a sinvastatina durante o curso do antimicrobiano.'
  },
  {
    match: ['sinvastatina', 'cetoconazol'],
    key: 'sinvastatina_cetoconazol',
    severity: 'critico' as const,
    text: 'Cetoconazol inibe potentemente o CYP3A4, provocando elevação maciça das concentrações de Sinvastatina com risco iminente de miopatia necrosante e rabdomiólise. Combinação contraindicada.'
  },
  {
    match: ['sinvastatina', 'voriconazol'],
    key: 'sinvastatina_voriconazol',
    severity: 'critico' as const,
    text: 'Voriconazol inibe intensamente o metabolismo da Sinvastatina via CYP3A4. Risco crítico de rabdomiólise grave. Suspender a sinvastatina durante o tratamento antifúngico.'
  },
  {
    match: ['sinvastatina', 'diltiazem'],
    key: 'sinvastatina_diltiazem',
    severity: 'atencao' as const,
    text: 'Diltiazem inibe o CYP3A4 e aumenta em 3 a 5x a exposição à Sinvastatina (risco aumentado de miopatia e rabdomiólise). Limitar a dose de sinvastatina ao máximo de 10mg/dia se mantida a coadministração.'
  },
  {
    match: ['sinvastatina', 'verapamil'],
    key: 'sinvastatina_verapamil',
    severity: 'atencao' as const,
    text: 'Verapamil eleva os níveis séricos de Sinvastatina por inibição do CYP3A4. Dose máxima de sinvastatina recomendada é de 10mg a 20mg/dia para prevenir lesão muscular.'
  },
  {
    match: ['sinvastatina', 'anlodipino'],
    key: 'sinvastatina_anlodipino',
    severity: 'atencao' as const,
    text: 'Anlodipino aumenta as concentrações plasmáticas de Sinvastatina. Recomenda-se dose máxima de 20mg/dia de sinvastatina para prevenir mialgia e miopatia.'
  },
  {
    match: ['atorvastatina', 'claritromicina'],
    key: 'atorvastatina_claritromicina',
    severity: 'atencao' as const,
    text: 'Claritromicina eleva as concentrações séricas de Atorvastatina via CYP3A4. Limitar a dose de atorvastatina a no máximo 20mg/dia e monitorar queixas de mialgia ou fraqueza muscular.'
  },
  {
    match: ['sinvastatina', 'fenofibrato'],
    key: 'sinvastatina_fenofibrato',
    severity: 'atencao' as const,
    text: 'Associação de Sinvastatina com Fenofibrato: risco sinérgico de miopatia grave e rabdomiólise. Monitorar CPK basal e orientar paciente a relatar imediatamente dores musculares inexplicadas ou urina escura.'
  },
  {
    match: ['rosuvastatina', 'fenofibrato'],
    key: 'rosuvastatina_fenofibrato',
    severity: 'atencao' as const,
    text: 'Associação de Rosuvastatina com Fenofibrato: risco aumentado de miosite e rabdomiólise, especialmente em insuficiência renal. Evitar dose de rosuvastatina superior a 10mg/dia nesta combinação.'
  },
  {
    match: ['atorvastatina', 'fenofibrato'],
    key: 'atorvastatina_fenofibrato',
    severity: 'atencao' as const,
    text: 'Associação de Atorvastatina com Fenofibrato: potencialização do risco de toxicidade muscular e elevação de CPK. Monitorar função hepática, renal e sintomas osteomusculares.'
  },
  {
    match: ['digoxina', 'amiodarona'],
    key: 'digoxina_amiodarona',
    severity: 'critico' as const,
    text: 'Amiodarona inibe a depuração renal e biliar da Digoxina e sua eliminação via glicoproteína-P, dobrando (100%) os níveis séricos de digoxina, além de deprimir aditivamente os nós sinusal e AV. Conduta: reduzir a dose da digoxina em 50% de imediato e monitorar ECG e digoxinemia sérica.'
  },
  {
    match: ['digoxina', 'verapamil'],
    key: 'digoxina_verapamil',
    severity: 'critico' as const,
    text: 'Verapamil inibe a glicoproteína-P e depuração tubular da Digoxina, elevando a concentração sérica em 50% a 75%, somado a potente depressão da condução atrioventricular (risco de BAV total e toxicidade digitálica). Conduta: reduzir a dose de digoxina pela metade e monitorar ECG.'
  },
  {
    match: ['digoxina', 'diltiazem'],
    key: 'digoxina_diltiazem',
    severity: 'atencao' as const,
    text: 'Diltiazem aumenta os níveis séricos de Digoxina (~20-40%) e soma efeito inotrópico e dromotrópico negativo. Risco de bradicardia sintomática e BAV. Monitorar frequência cardíaca e níveis séricos de digoxina.'
  },
  {
    match: ['digoxina', 'propafenona'],
    key: 'digoxina_propafenona',
    severity: 'atencao' as const,
    text: 'Propafenona aumenta a concentração de Digoxina em 30% a 60% por deslocamento e inibição de depuração, associada à depressão nodal AV. Reduzir a dose de digoxina e monitorar intervalo PR e digoxinemia.'
  },
  {
    match: ['digoxina', 'furosemida'],
    key: 'digoxina_furosemida',
    severity: 'atencao' as const,
    text: 'Diurético de alça indutor de hipocalemia e hipomagnesemia: a redução do potássio sérico sensibiliza criticamente o miocárdio aos efeitos tóxicos da Digoxina, deflagrando arritmias ventriculares potencialmente fatais mesmo em níveis terapêuticos. Manter K > 4,0 mEq/L e Mg > 2,0 mg/dL.'
  },
  {
    match: ['digoxina', 'hidroclorotiazida'],
    key: 'digoxina_hidroclorotiazida',
    severity: 'atencao' as const,
    text: 'Hidroclorotiazida promove depleção de potássio e magnésio, aumentando expressivamente o risco de intoxicação digitálica e arritmias cardíacas graves. Monitorar e suplementar eletrólitos conforme necessário.'
  },
  {
    match: ['digoxina', 'clortalidona'],
    key: 'digoxina_clortalidona',
    severity: 'atencao' as const,
    text: 'Clortalidona provoca hipocalemia pronunciada e prolongada, facilitando arritmias ventriculares graves por digoxina. Monitoramento estrito do potássio sérico mandatório.'
  },
  {
    match: ['digoxina', 'indapamida'],
    key: 'digoxina_indapamida',
    severity: 'atencao' as const,
    text: 'Indapamida induz perda urinária de potássio, potencializando a toxicidade cardíaca da Digoxina. Monitorar eletrólitos séricos com frequência regular.'
  },
  {
    match: ['glibenclamida', 'fluconazol'],
    key: 'glibenclamida_fluconazol',
    severity: 'atencao' as const,
    text: 'Fluconazol inibe potentemente o CYP2C9, bloqueando a depuração hepática da Glibenclamida. Risco elevado de hipoglicemia severa, refratária e prolongada. Reduzir dose da glibenclamida e monitorar glicemias capilares seriadas.'
  },
  {
    match: ['gliclazida', 'fluconazol'],
    key: 'gliclazida_fluconazol',
    severity: 'atencao' as const,
    text: 'Fluconazol inibe o CYP2C9 e reduz o metabolismo da Gliclazida, prolongando seu efeito hipoglicemiante. Ajustar dose e reforçar monitorização glicêmica.'
  },
  {
    match: ['sotalol', 'amiodarona'],
    key: 'sotalol_amiodarona',
    severity: 'critico' as const,
    text: 'Associação de Sotalol com Amiodarona (dois antiarrítmicos de classe III prolongadores de QT com ação betabloqueadora): risco extremo de prolongamento maciço de QTc, Torsades de Pointes, bradicardia extrema e PCR. Combinação formalmente contraindicada.'
  },
  {
    match: ['sotalol', 'claritromicina'],
    key: 'sotalol_claritromicina',
    severity: 'critico' as const,
    text: 'Sotalol associado a Claritromicina: prolongamento sinérgico severo do intervalo QT com risco iminente de Torsades de Pointes e parada cardiorrespiratória. Associação contraindicada; utilizar antibiótico alternativo sem efeito no QT.'
  },
  {
    match: ['sotalol', 'azitromicina'],
    key: 'sotalol_azitromicina',
    severity: 'critico' as const,
    text: 'Sotalol associado a Azitromicina: soma de efeitos arritmogênicos sobre o intervalo QT. Risco crítico de arritmias ventriculares polimórficas. Evitar a associação.'
  },
  {
    match: ['sotalol', 'levofloxacino'],
    key: 'sotalol_levofloxacino',
    severity: 'critico' as const,
    text: 'Quinolona (Levofloxacino) associada a Sotalol: prolongamento aditivo de QT com alto risco de Torsades de Pointes. Associação contraindicada.'
  },
  {
    match: ['sotalol', 'haloperidol'],
    key: 'sotalol_haloperidol',
    severity: 'critico' as const,
    text: 'Haloperidol associado a Sotalol: alto risco de arritmias ventriculares malignas por prolongamento acentuado de repolarização ventricular e torsades de pointes. Combinação contraindicada.'
  }
];
