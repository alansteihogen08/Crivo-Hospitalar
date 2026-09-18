import { DRUGS, SPECIFIC_RULES, CONTEXT_MODIFIERS, INDICATIONS } from '../data/drugs';
import { ClinicalFinding, Drug, PatientContext, SeverityLevel } from '../types';

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
  indications: string[]
): ClinicalFinding[] {
  if (!indications.length) return findings;
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

const SEV_ORDER: Record<SeverityLevel, number> = {
  critico: 0,
  atencao: 1,
  informativo: 2,
};

export function computeFindings(
  selectedIds: string[],
  ctx: PatientContext
): ClinicalFinding[] {
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
  let findings = [...specific, ...generic];
  findings = applyContextModifiers(findings, ctx.indications);

  // Deduplicação de segurança: caso surjam alertas idênticos para os mesmos fármacos e mesma severidade
  const seen = new Set<string>();
  findings = findings.filter(f => {
    const sig = `${f.severity}:${f.drugs}`;
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
