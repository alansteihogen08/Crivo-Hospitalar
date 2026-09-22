import { DRUGS, SPECIFIC_RULES, CONTEXT_MODIFIERS, INDICATIONS } from '../data/drugs';
import { AdminRoute, ClinicalFinding, Drug, PatientContext, SeverityLevel } from '../types';

export function calcCockcroftGault(
  idade: number | null,
  peso: number | null,
  creatinina: number | null,
  sexo: 'm' | 'f' | ''
): number | null {
  if (idade === null || peso === null || creatinina === null || !creatinina || !sexo) {
    return null;
  }
  let clcr = ((140 - idade) * peso) / (72 * creatinina);
  if (sexo === 'f') clcr *= 0.85;
  return Math.round(clcr * 10) / 10;
}

export function getClcrClassification(clcr: number | null): {
  stage: string;
  color: string;
  badgeBg: string;
  description: string;
} | null {
  if (clcr === null || isNaN(clcr)) return null;

  if (clcr >= 90) {
    return {
      stage: 'Normal / Hiperfiltração',
      color: 'text-emerald-700 dark:text-emerald-400',
      badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      description: 'Função renal preservada (≥90 mL/min)'
    };
  } else if (clcr >= 60) {
    return {
      stage: 'Disfunção Leve',
      color: 'text-teal-700 dark:text-teal-400',
      badgeBg: 'bg-teal-50 text-teal-700 border-teal-200',
      description: 'TFG discretamente reduzida (60-89 mL/min)'
    };
  } else if (clcr >= 30) {
    return {
      stage: 'Disfunção Moderada',
      color: 'text-amber-700 dark:text-amber-400',
      badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
      description: 'Ajuste de dose necessário para a maioria dos fármacos (30-59 mL/min)'
    };
  } else if (clcr >= 15) {
    return {
      stage: 'Disfunção Grave',
      color: 'text-orange-700 dark:text-orange-400',
      badgeBg: 'bg-orange-50 text-orange-700 border-orange-200',
      description: 'Alto risco de acúmulo e toxicidade (15-29 mL/min)'
    };
  } else {
    return {
      stage: 'Falência Renal',
      color: 'text-rose-700 dark:text-rose-400',
      badgeBg: 'bg-rose-50 text-rose-700 border-rose-200',
      description: 'Filtração residual mínima (<15 mL/min ou anúrico)'
    };
  }
}

function drugsWithTag(selectedIds: string[], tag: string): string[] {
  return selectedIds
    .filter(id => DRUGS[id]?.tags.includes(tag))
    .map(id => DRUGS[id]?.name)
    .filter(Boolean);
}

function tagCount(selectedIds: string[], tag: string): number {
  return selectedIds.filter(id => DRUGS[id]?.tags.includes(tag)).length;
}

export function runGenericRules(selectedIds: string[], ctx: PatientContext): ClinicalFinding[] {
  const findings: ClinicalFinding[] = [];

  // 1. Indução enzimática potente reduzindo níveis de fármacos suscetíveis
  const indutores = drugsWithTag(selectedIds, 'indutor_enzimatico_potente');
  const susceptiveis = drugsWithTag(selectedIds, 'susceptivel_inducao');
  if (indutores.length && susceptiveis.length) {
    findings.push({
      key: 'inducao_enzimatica',
      severity: 'critico',
      drugs: [...new Set(indutores)].join(' + ') + ' × ' + [...new Set(susceptiveis)].join(' + '),
      text: 'Indutor(es) enzimático(s) potente(s) associado(s) a fármaco suscetível à indução — risco de queda significativa do nível sérico e falha terapêutica (ex: perda de controle viral ou convulsivo). Considerar ajuste de dose quando validado ou substituição terapêutica.'
    });
  }

  // 2. Inibição de CYP3A4 elevando substratos sensíveis
  const inibidores = drugsWithTag(selectedIds, 'inibidor_cyp3a4_potente');
  const substratosCyp3a4 = drugsWithTag(selectedIds, 'substrato_cyp3a4');
  if (inibidores.length && substratosCyp3a4.length) {
    findings.push({
      key: 'inibicao_enzimatica',
      severity: 'critico',
      drugs: [...new Set(inibidores)].join(' + ') + ' × ' + [...new Set(substratosCyp3a4)].join(' + '),
      text: 'Inibidor(es) potente(s) de CYP3A4 associado(s) a substrato sensível — risco de elevação acentuada do nível sérico e toxicidade grave (ex: sedação profunda/depressão respiratória prolongada com midazolam ou fentanil). Reduzir dose do substrato ou trocar fármaco.'
    });
  }

  // 3. Inibição de CYP2D6
  const inibidoresCyp2d6 = drugsWithTag(selectedIds, 'inibidor_cyp2d6_potente');
  const substratosCyp2d6 = drugsWithTag(selectedIds, 'substrato_cyp2d6');
  if (inibidoresCyp2d6.length && substratosCyp2d6.length) {
    findings.push({
      key: 'inibicao_cyp2d6',
      severity: 'atencao',
      drugs: [...new Set(inibidoresCyp2d6)].join(' + ') + ' × ' + [...new Set(substratosCyp2d6)].join(' + '),
      text: 'Inibidor(es) potente(s) de CYP2D6 associado(s) a substrato sensível (tricíclicos, risperidona, tramadol) — risco de elevação sérica e toxicidade, ou perda da eficácia analgésica do tramadol por menor conversão ao metabólito ativo.'
    });
  }

  // 4. Síndrome serotoninérgica (2 ou mais)
  const serotoninergicos = drugsWithTag(selectedIds, 'serotoninergico');
  if (serotoninergicos.length >= 2) {
    findings.push({
      key: 'serotonina_stack',
      severity: serotoninergicos.length >= 3 ? 'critico' : 'atencao',
      drugs: serotoninergicos.join(' + '),
      text: 'Dois ou mais agentes serotoninérgicos associados — risco somado de síndrome serotoninérgica (hipertermia, hiper-reflexia, agitação, clônus, instabilidade autonômica). Monitorar e reavaliar politerapia.'
    });
  }

  // 5. IMAO + serotoninérgico
  const imaos = drugsWithTag(selectedIds, 'imao');
  if (imaos.length && serotoninergicos.length) {
    findings.push({
      key: 'imao_serotoninergico',
      severity: 'critico',
      drugs: [...new Set(imaos)].join(' + ') + ' × ' + [...new Set(serotoninergicos)].join(' + '),
      text: 'Inibidor da MAO associado a agente serotoninérgico — combinação com risco crítico de síndrome serotoninérgica grave e crise hipertensiva. Geralmente contraindicada; respeitar período de washout.'
    });
  }

  // 6. Agonista dopaminérgico vs Bloqueador D2
  const agonistasDopa = drugsWithTag(selectedIds, 'agonista_dopaminergico');
  const antagonistasD2 = drugsWithTag(selectedIds, 'risco_extrapiramidal');
  if (agonistasDopa.length && antagonistasD2.length) {
    findings.push({
      key: 'antagonismo_dopaminergico',
      severity: 'atencao',
      drugs: [...new Set(agonistasDopa)].join(' + ') + ' × ' + [...new Set(antagonistasD2)].join(' + '),
      text: 'Antagonismo farmacodinâmico direto: bloqueio dos receptores D2 anula o benefício antiparkinsoniano e agrava sintomas motores. Priorizar antieméticos alternativos (ex: ondansetrona).'
    });
  }

  // 7. Inibidor de colinesterase vs Anticolinérgico
  const colinesterasicos = drugsWithTag(selectedIds, 'inibidor_colinesterase');
  const anticolinergicos = drugsWithTag(selectedIds, 'anticolinergico');
  if (colinesterasicos.length && anticolinergicos.length) {
    findings.push({
      key: 'colinesterase_anticolinergico',
      severity: 'atencao',
      drugs: [...new Set(colinesterasicos)].join(' + ') + ' × ' + [...new Set(anticolinergicos)].join(' + '),
      text: 'Antagonismo farmacológico: fármaco anticolinérgico reduz o ganho cognitivo do inibidor da colinesterase e eleva o risco de confusão mental e delirium.'
    });
  }

  // 8. Duplicidade de risco extrapiramidal (D2 stack)
  const d2 = drugsWithTag(selectedIds, 'risco_extrapiramidal');
  if (d2.length >= 2) {
    // Se todos os fármacos forem apenas procinéticos (ex: bromoprida + metoclopramida),
    // a regra específica de procinéticos já emite o alerta de forma direta e sem redundância.
    const allProcineticos = d2.every(name => {
      const drugObj = Object.values(DRUGS).find(d => d.name === name);
      return drugObj?.tags?.includes('procinetico');
    });

    if (!allProcineticos) {
      findings.push({
        key: 'd2_stack',
        severity: 'critico',
        drugs: d2.join(' + '),
        text: 'Dois ou mais antagonistas dopaminérgicos D2 associados (ex: antipsicótico + antiemético) — risco somado de reação extrapiramidal aguda (distonia, acatisia) e parkinsonismo medicamentoso.'
      });
    }
  }

  // 9. Nefrotoxicidade cumulativa
  const nefro = drugsWithTag(selectedIds, 'nefrotoxico').concat(drugsWithTag(selectedIds, 'nefrotoxico_alto'));
  if (nefro.length >= 2) {
    const hasAlto = tagCount(selectedIds, 'nefrotoxico_alto') > 0;
    findings.push({
      key: 'nefro_stack',
      severity: hasAlto ? 'critico' : 'atencao',
      drugs: nefro.join(' + '),
      text: 'Múltiplos agentes nefrotóxicos associados. Monitorização ativa da creatinina diária e balanço hídrico rigorosamente recomendados.'
    });
  }

  // 10. Prolongamento de intervalo QT
  const qt = drugsWithTag(selectedIds, 'qt');
  if (qt.length >= 2) {
    findings.push({
      key: 'qt_stack',
      severity: 'atencao',
      drugs: qt.join(' + '),
      text: 'Múltiplos fármacos prolongadores de QT associados. Realizar ECG basal/seriado e manter eletrólitos (K, Mg) nas faixas superiores da normalidade.'
    });
  }

  // 11. Depressores do SNC cumulativos
  const cns = drugsWithTag(selectedIds, 'cns_depressor');
  const idade = ctx.idade;
  if (cns.length >= 3) {
    const idoso = idade !== null && idade >= 60;
    findings.push({
      key: 'cns_stack',
      severity: idoso ? 'critico' : 'atencao',
      drugs: cns.join(' + '),
      text: idoso
        ? 'Três ou mais depressores do SNC em paciente idoso (≥60 anos) — risco crítico de depressão respiratória, sedação profunda, quedas e delirium.'
        : 'Três ou mais depressores do SNC associados. Monitorar nível de consciência e escala RASS / drive ventilatório.'
    });
  }

  // 12. Critérios de Beers (evitar em idosos)
  if (idade !== null && idade >= 60) {
    const evitarIdoso = selectedIds.filter(id => DRUGS[id]?.tags.includes('evitar_idoso'));
    evitarIdoso.forEach(id => {
      const d = DRUGS[id];
      if (!d) return;
      let motivo = 'sedação prolongada, quedas e delirium';
      if (d.tags.includes('benzodiazepinico')) motivo = 'sedação prolongada, quedas e delirium (ação longa)';
      else if (d.tags.includes('triciclico')) motivo = 'efeitos anticolinérgicos, sedação, hipotensão ortostática e arritmias (QT)';
      findings.push({
        key: `evitar_idoso_${id}`,
        severity: 'atencao',
        drugs: d.name,
        text: `Medicamento desaconselhado em idosos (Critérios de Beers) devido ao risco de ${motivo}. Considerar alternativa com menor meia-vida ou perfil mais seguro.`
      });
    });
  }

  // 13. Anticonvulsivantes de janela terapêutica estreita
  const janelaEstreita = drugsWithTag(selectedIds, 'janela_terapeutica_estreita');
  if (janelaEstreita.length >= 2) {
    findings.push({
      key: 'janela_estreita_stack',
      severity: 'atencao',
      drugs: janelaEstreita.join(' + '),
      text: 'Politerapia com fármacos de janela terapêutica estreita — monitorização estrita de níveis séricos e função hepática recomendada.'
    });
  }

  // 14. Duplo bloqueio do SRAA (IECA + BRA)
  const iecas = drugsWithTag(selectedIds, 'ieca');
  const bras = drugsWithTag(selectedIds, 'bra');
  if (iecas.length && bras.length) {
    findings.push({
      key: 'duplo_bloqueio_sraa',
      severity: 'critico',
      drugs: [...new Set(iecas)].join(' + ') + ' × ' + [...new Set(bras)].join(' + '),
      text: 'Duplo bloqueio do Sistema Renina-Angiotensina-Aldosterona (IECA + BRA): formalmente desaconselhado/contraindicado por diretrizes cardiológicas. Ausência de benefício clínico incremental somada à duplicação do risco de insuficiência renal aguda, hipercalemia severa e hipotensão sintomática com síncope. Desprescrever um dos agentes.'
    });
  }

  // 15. Duplicidade terapêutica de Betabloqueadores
  const betabloqs = drugsWithTag(selectedIds, 'betabloqueador');
  if (betabloqs.length >= 2) {
    findings.push({
      key: 'duplicidade_betabloqueador',
      severity: 'critico',
      drugs: betabloqs.join(' + '),
      text: 'Duplicidade terapêutica de betabloqueadores: risco severo de bradicardia acentuada, bloqueio atrioventricular de alto grau, hipotensão refratária e choque cardiogênico. Manter apenas um agente e titular a dose conforme resposta clínica.'
    });
  }

  // 16. Betabloqueador + Bloqueador de Canais de Cálcio Não Di-hidropiridínico (Verapamil / Diltiazem)
  const bccNaoDihidro = drugsWithTag(selectedIds, 'bcc_nao_dihidropiridinico');
  if (betabloqs.length && bccNaoDihidro.length) {
    findings.push({
      key: 'betabloq_bcc_nao_dihidro',
      severity: 'critico',
      drugs: [...new Set(betabloqs)].join(' + ') + ' × ' + [...new Set(bccNaoDihidro)].join(' + '),
      text: 'Associação de Betabloqueador com Bloqueador de Canal de Cálcio não di-hidropiridínico (Verapamil / Diltiazem): efeito inotrópico, cronotrópico e dromotrópico negativo sinérgico severo. Alto risco de bradicardia extrema, BAV total e descompensação aguda de insuficiência cardíaca.'
    });
  }

  // 17. Associação de risco de hipercalemia (Espironolactona + IECA / BRA)
  const poupadoresK = drugsWithTag(selectedIds, 'poupador_potassio');
  const bloqueadoresSraa = drugsWithTag(selectedIds, 'ieca').concat(drugsWithTag(selectedIds, 'bra'));
  if (poupadoresK.length && bloqueadoresSraa.length) {
    findings.push({
      key: 'espironolactona_bloqueador_sraa',
      severity: 'atencao',
      drugs: [...new Set(poupadoresK)].join(' + ') + ' × ' + [...new Set(bloqueadoresSraa)].join(' + '),
      text: 'Espironolactona associada a IECA ou BRA: risco elevado de hipercalemia grave (K > 5,5 mEq/L) e piora da função renal, especialmente em nefropatia prévia ou idosos. Monitorar potássio sérico e creatinina em 1, 4 e 12 semanas e após qualquer aumento posológico.'
    });
  }

  // 18. Duplicidade terapêutica de Estatinas
  const estatinas = drugsWithTag(selectedIds, 'estatina');
  if (estatinas.length >= 2) {
    findings.push({
      key: 'duplicidade_estatina',
      severity: 'critico',
      drugs: estatinas.join(' + '),
      text: 'Duplicidade de inibidores da HMG-CoA redutase (estatinas): duplicação do risco de miopatia, miosite, elevação de transaminases e rabdomiólise sem benefício lipídico justificado. Prescrever apenas uma estatina na potência indicada.'
    });
  }

  // 19. Duplicidade terapêutica de Sulfonilureias
  const sulfonilureias = drugsWithTag(selectedIds, 'sulfonilureia');
  if (sulfonilureias.length >= 2) {
    findings.push({
      key: 'duplicidade_sulfonilureia',
      severity: 'critico',
      drugs: sulfonilureias.join(' + '),
      text: 'Duplicidade de sulfonilureias (mesmo sítio de ação no canal K-ATP da célula beta pancreática): risco crítico de hipoglicemia severa e prolongada. Suspender a redundância posológica imediatamente.'
    });
  }

  // 20. Sinergismo diurético iSGLT2 + Diuréticos de alça / tiazídicos
  const isglt2 = drugsWithTag(selectedIds, 'isglt2');
  const diureticos = drugsWithTag(selectedIds, 'diuretico');
  if (isglt2.length && diureticos.length) {
    findings.push({
      key: 'isglt2_diuretico_deplecao',
      severity: 'atencao',
      drugs: [...new Set(isglt2)].join(' + ') + ' × ' + [...new Set(diureticos)].join(' + '),
      text: 'Inibidor de SGLT2 associado a diurético: efeito diurético osmótico aditivo com risco aumentado de hipotensão ortostática, depleção volêmica e azotemia pré-renal (especialmente em idosos). Avaliar redução preventiva da dose do diurético.'
    });
  }

  // 21. Lacosamida associada a múltiplos depressores da condução atrioventricular
  const lacosamida = drugsWithTag(selectedIds, 'anticonvulsivante').filter(n => n.toLowerCase().includes('lacosamida'));
  const depressoresAv = drugsWithTag(selectedIds, 'bradicardizante');
  if (lacosamida.length && depressoresAv.length) {
    findings.push({
      key: 'lacosamida_conducao_av',
      severity: 'atencao',
      drugs: lacosamida.join(' + ') + ' × ' + [...new Set(depressoresAv)].join(' + '),
      text: 'Lacosamida prolonga o intervalo PR de forma dose-dependente. Coadministração com outros depressores do nó AV (betabloqueadores, verapamil, diltiazem, digoxina) eleva o risco de BAV de 1º/2º grau e síncope. Realizar ECG de controle.'
    });
  }

  // 22. Bloqueador neuromuscular + Aminoglicosídeo
  const bnms = drugsWithTag(selectedIds, 'bloqueador_neuromuscular');
  const aminoglicosideos = drugsWithTag(selectedIds, 'aminoglicosideo');
  if (bnms.length && aminoglicosideos.length) {
    findings.push({
      key: 'bnm_aminoglicosideo',
      severity: 'critico',
      drugs: [...new Set(bnms)].join(' + ') + ' × ' + [...new Set(aminoglicosideos)].join(' + '),
      text: 'Bloqueador neuromuscular associado a aminoglicosídeo (Amicacina / Gentamicina): aminoglicosídeos inibem a liberação pré-sináptica de acetilcolina e quelam cálcio na placa motora, causando sinergismo bloqueador neuromuscular profundo. Risco de paralisia prolongada, curarização residual e apneia pós-operatória de reversão dificultada. Monitoração obrigatória com TOF e suporte ventilatório mecânico.'
    });
  }

  // 23. Duplicidade terapêutica de Bloqueadores Neuromusculares
  if (bnms.length >= 2) {
    findings.push({
      key: 'duplicidade_bnm',
      severity: 'critico',
      drugs: bnms.join(' + '),
      text: 'Duplicidade terapêutica de bloqueadores neuromusculares: uso concomitante de múltiplos agentes curarizantes. Risco de bloqueio neuromuscular imprevisível, dessincronia ventilatória e curarização residual com risco de apneia.'
    });
  }

  // 24. Carga anticolinérgica cumulativa
  if (anticolinergicos.length >= 2) {
    findings.push({
      key: 'carga_anticolinergica_stack',
      severity: 'atencao',
      drugs: anticolinergicos.join(' + '),
      text: 'Carga anticolinérgica cumulativa (múltiplos fármacos anticolinérgicos associados): risco aumentado de delirium e confusão mental aguda em idosos, retenção urinária aguda, obstipação/íleo paralítico, taquicardia sinusal e hipertermia. Reavaliar a necessidade de politerapia anticolinérgica.'
    });
  }

  return findings;
}

export function runSpecificRules(selectedIds: string[]): ClinicalFinding[] {
  const set = new Set(selectedIds);
  return SPECIFIC_RULES
    .filter(r => r.match.every(id => set.has(id)))
    .map(r => ({
      key: r.key,
      severity: r.severity,
      drugs: r.match.map(id => DRUGS[id]?.name || id).join(' + '),
      text: r.text
    }));
}

export function applyContextModifiers(
  findings: ClinicalFinding[],
  indications?: string[]
): ClinicalFinding[] {
  if (!indications || !indications.length) return findings;
  const indSet = new Set(indications);

  return findings.map(f => {
    const mod = CONTEXT_MODIFIERS.find(m => indSet.has(m.indication) && m.key === f.key);
    if (!mod) return f;
    return {
      ...f,
      severity: mod.newSeverity,
      ctxNote: mod.note,
      ctxIndication: INDICATIONS[mod.indication]?.name
    };
  });
}

function runRouteAndDietRules(
  selectedIds: string[],
  drugRoutes: Record<string, AdminRoute>
): ClinicalFinding[] {
  const findings: ClinicalFinding[] = [];

  for (const id of selectedIds) {
    const route = drugRoutes[id] || DRUGS[id]?.defaultRoute || 'VO';
    const drugName = DRUGS[id]?.name || id;

    // Regra: Fenitoína via SNE
    if (id === 'fenitoina' && route === 'SNE') {
      findings.push({
        key: 'fenitoina_sne_dieta',
        severity: 'critico',
        route: 'SNE',
        findingCategory: 'via',
        drugs: `${drugName} (SNE)`,
        text: 'Fenitoína administrada via Sonda Enteral (SNE/SNG): os componentes proteicos e minerais da fórmula enteral contínua quelam a fenitoína e adsorvem na parede da sonda, diminuindo drasticamente sua absorção em até 50-70% com alto risco de descontrole e crises convulsivas. Conduta: pausar a infusão da nutrição enteral por 1 a 2 horas antes e 1 a 2 horas após a administração da dose, irrigar a sonda com 20 a 30 mL de água filtrada/destilada antes e depois, ou considerar transição para via intravenosa (IV).'
      });
    }

    // Regra: Quinolonas (Ciprofloxacino / Levofloxacino) via SNE
    if ((id === 'ciprofloxacino' || id === 'levofloxacino') && route === 'SNE') {
      findings.push({
        key: `${id}_sne_dieta`,
        severity: 'atencao',
        route: 'SNE',
        findingCategory: 'via',
        drugs: `${drugName} (SNE)`,
        text: `${drugName} via Sonda Enteral: cátions polivalentes (cálcio, magnésio, ferro, alumínio) presentes nas dietas enterais formam quelatos insolúveis com a fluoroquinolona, reduzindo substancialmente sua biodisponibilidade. Conduta: pausar a dieta enteral por pelo menos 1 a 2 horas antes e 1 a 2 horas após a administração, ou preferir a via IV em infecções graves/sepse.`
      });
    }

    // Regra: Inibidores de Bomba de Prótons (Omeprazol / Pantoprazol) via SNE
    if ((id === 'omeprazol' || id === 'pantoprazol') && route === 'SNE') {
      findings.push({
        key: `${id}_sne_trituracao`,
        severity: 'atencao',
        route: 'SNE',
        findingCategory: 'via',
        drugs: `${drugName} (SNE)`,
        text: `${drugName} via Sonda Enteral: formas farmacêuticas orais contêm microgrânulos com revestimento gastrorresistente que NUNCA devem ser triturados ou macerados. A trituração expõe o fármaco ao ácido gástrico inativando-o precocemente e os grânulos triturados causam obstrução mecânica frequente da sonda. Conduta: para pacientes com sonda enteral em ambiente hospitalar, preferir a formulação IV ou utilizar formulação líquida com veículo tamponado/bicarbonato conforme protocolo farmacêutico.`
      });
    }

    // Regra: Varfarina via SNE
    if (id === 'varfarina' && route === 'SNE') {
      findings.push({
        key: 'varfarina_sne_dieta',
        severity: 'atencao',
        route: 'SNE',
        findingCategory: 'via',
        drugs: `${drugName} (SNE)`,
        text: 'Varfarina via Sonda Enteral: a vitamina K presente na dieta enteral contínua neutraliza o efeito anticoagulante, somada à perda de fração ativa por adsorção na parede plástica da sonda. Conduta: monitorar o RNI com maior frequência e atentar que pausas ou reinícios de dieta enteral exigirão ajustes imediatos da dose.'
      });
    }

    // Regra: Prometazina via IV (Alerta de Caixa Preta)
    if (id === 'prometazina' && route === 'IV') {
      findings.push({
        key: 'prometazina_risco_iv',
        severity: 'critico',
        route: 'IV',
        findingCategory: 'via',
        drugs: `${drugName} (IV)`,
        text: 'Alerta de Caixa Preta (ANVISA/FDA) para Prometazina por via IV: altíssimo risco de lesão tecidual severa, tromboflebite química, necrose tecidual e gangrena por extravasamento perivenoso ou injeção intra-arterial acidental. Conduta: a via intramuscular profunda (IM) é a via de escolha recomendada. Se o uso IV for inevitável, diluir em 25 a 50 mL de SF 0,9%, certificar-se de retorno venoso livre em cateter calibroso e infundir lentamente a no máximo 25 mg/min.'
      });
    }

    // Regra: Diazepam via IM (Absorção errática)
    if (id === 'diazepam' && route === 'IM') {
      findings.push({
        key: 'diazepam_im_erratica',
        severity: 'atencao',
        route: 'IM',
        findingCategory: 'via',
        drugs: `${drugName} (IM)`,
        text: 'Diazepam por via Intramuscular (IM): absorção lenta, errática e dolorosa devido à lipofilicidade e precipitação no tecido muscular, com níveis plasmáticos imprevisíveis. Conduta: preferir a via IV lenta para sedação ou emergência de convulsão, ou via oral se disponível. Se via IM for imprescindível, preferir Midazolam IM.'
      });
    }
  }

  return findings;
}

function runNptIncompatibilityRules(
  selectedIds: string[],
  ctx: PatientContext,
  drugRoutes: Record<string, AdminRoute>
): ClinicalFinding[] {
  const findings: ClinicalFinding[] = [];
  if (!ctx.emNPT) return findings;

  for (const id of selectedIds) {
    const route = drugRoutes[id] || DRUGS[id]?.defaultRoute || 'VO';
    // Incompatibilidade de NPT se aplica aos medicamentos infundidos por via IV
    if (route === 'IV') {
      const drug = DRUGS[id];
      if (drug?.nptIncompatibility?.incompatible) {
        findings.push({
          key: `npt_${id}`,
          severity: 'critico',
          route: 'IV',
          findingCategory: 'npt',
          drugs: `${drug.name} (IV) × NPT`,
          text: `Incompatibilidade com Nutrição Parenteral (NPT): ${drug.nptIncompatibility.reason} Conduta: reservar lúmen EXCLUSIVO do cateter venoso central (CVC) para a infusão da NPT. Jamais coinfundir em Y. Se houver acesso único emergencial, interromper temporariamente a NPT e realizar flushing vigoroso com solução compatível antes e após a administração do fármaco.`
        });
      }
    }
  }

  return findings;
}

const SEV_ORDER: Record<SeverityLevel, number> = {
  critico: 0,
  atencao: 1,
  informativo: 2,
};

export function computeFindings(
  selectedIds: string[],
  ctx: PatientContext,
  drugRoutes?: Record<string, AdminRoute>
): ClinicalFinding[] {
  const resolvedRoutes = drugRoutes || {};
  let specific = runSpecificRules(selectedIds);

  // Se a regra tríplice de procinéticos estiver ativa, suprimir os pares individuais de procinéticos para não poluir visualmente a interface
  const hasTripliceProcinetica = specific.some(r => r.key === 'triplice_procinetica');
  if (hasTripliceProcinetica) {
    const procineticPairs = new Set([
      'bromoprida_metoclopramida',
      'metoclopramida_domperidona',
      'bromoprida_domperidona'
    ]);
    specific = specific.filter(r => !procineticPairs.has(r.key));
  }

  const generic = runGenericRules(selectedIds, ctx);
  const routeFindings = runRouteAndDietRules(selectedIds, resolvedRoutes);
  const nptFindings = runNptIncompatibilityRules(selectedIds, ctx, resolvedRoutes);

  let findings = [...specific, ...generic, ...routeFindings, ...nptFindings];
  findings = applyContextModifiers(findings, ctx.indications);

  // Deduplicação de segurança: caso surjam alertas idênticos para a mesma regra e mesmos fármacos
  const seen = new Set<string>();
  findings = findings.filter(f => {
    const sig = `${f.key}:${f.severity}:${f.drugs}`;
    if (seen.has(sig)) return false;
    seen.add(sig);
    return true;
  });

  findings.sort((a, b) => SEV_ORDER[a.severity] - SEV_ORDER[b.severity]);
  return findings;
}

export interface RenalAdjustmentResult {
  hasRenalSchedule: boolean;
  requiresAdjustment: boolean;
  matchedRange?: { min: number; max: number; dose: string; note?: string };
  dialysisAdvice?: string;
  allRanges: { min: number; max: number; dose: string; note?: string }[];
  noAdjustmentMessage?: string;
}

export function getRenalAdjustmentForDrug(
  drug: Drug,
  clcr: number | null,
  dialise: string
): RenalAdjustmentResult {
  const allRanges = drug.renal || [];

  const isNonAdjustmentText = (txt: string) => {
    const t = (txt || '').toLowerCase();
    return (
      t.includes('não é necessário') ||
      t.includes('não necessita') ||
      t.includes('não há necessidade') ||
      t.includes('não há esquema') ||
      t.includes('metabolização hepática') ||
      t.includes('eliminação predominantemente') ||
      t.includes('sem ajuste') ||
      (t.includes('dose padrão') && !t.includes('reduz') && !t.includes('ajust'))
    );
  };

  const isUniversalNoAdjustment =
    allRanges.length === 0 ||
    allRanges.every(r => isNonAdjustmentText(r.dose)) ||
    (allRanges.length === 1 && (allRanges[0].max >= 900 || isNonAdjustmentText(allRanges[0].dose)));

  const hasRenalSchedule = !isUniversalNoAdjustment && allRanges.length > 0;

  let matchedRange: { min: number; max: number; dose: string; note?: string } | undefined;
  if (hasRenalSchedule && clcr !== null && !isNaN(clcr)) {
    matchedRange = allRanges.find(r => clcr >= r.min && clcr <= r.max);
    if (!matchedRange) {
      const topRange = [...allRanges].sort((a, b) => b.min - a.min)[0];
      if (topRange && clcr >= topRange.min) {
        matchedRange = topRange;
      }
    }
  }

  let dialysisAdvice: string | undefined;
  if (dialise && drug.dialysis) {
    if (typeof drug.dialysis === 'string') {
      dialysisAdvice = drug.dialysis;
    } else if (typeof drug.dialysis === 'object') {
      dialysisAdvice = drug.dialysis[dialise] || drug.dialysis.hd || Object.values(drug.dialysis)[0];
    }
  }

  let requiresAdjustment = false;
  if (hasRenalSchedule) {
    if (clcr !== null && !isNaN(clcr)) {
      if (matchedRange) {
        const maxRangeMin = Math.max(...allRanges.map(r => r.min));
        requiresAdjustment = matchedRange.min < maxRangeMin;
      } else {
        requiresAdjustment = true;
      }
    } else {
      requiresAdjustment = true;
    }
  }

  let noAdjustmentMessage: string | undefined;
  if (!hasRenalSchedule) {
    if (allRanges.length > 0 && allRanges[0].dose) {
      noAdjustmentMessage = allRanges[0].dose;
    } else {
      noAdjustmentMessage =
        'Não é necessário ajuste pela função renal — eliminação predominantemente hepática/biliar ou dose padrão mantida.';
    }
  }

  return {
    hasRenalSchedule,
    requiresAdjustment,
    matchedRange,
    dialysisAdvice,
    allRanges: hasRenalSchedule ? allRanges : [],
    noAdjustmentMessage
  };
}

export function previewBadgeForDrug(
  candidateId: string,
  selectedIds: string[],
  ctx: PatientContext,
  currentFindings: ClinicalFinding[]
): { hasNewAlert: boolean; severity?: SeverityLevel } {
  if (selectedIds.includes(candidateId)) {
    return { hasNewAlert: false };
  }
  const testIds = [...selectedIds, candidateId];
  const testFindings = computeFindings(testIds, ctx);

  const existingKeys = new Set(currentFindings.map(f => `${f.drugs}__${f.text}`));
  const newFindings = testFindings.filter(f => !existingKeys.has(`${f.drugs}__${f.text}`));

  if (!newFindings.length) {
    return { hasNewAlert: false };
  }

  const hasCritico = newFindings.some(f => f.severity === 'critico');
  return {
    hasNewAlert: true,
    severity: hasCritico ? 'critico' : 'atencao'
  };
}
