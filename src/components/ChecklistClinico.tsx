import React, { useState } from 'react';
import { DRUGS } from '../data/drugs';
import { PatientContext } from '../types';
import { CheckSquare, Square, AlertCircle, ShieldAlert, HeartPulse, Flame } from 'lucide-react';

interface ChecklistClinicoProps {
  selectedDrugIds: string[];
  patientCtx: PatientContext;
}

export const ChecklistClinico: React.FC<ChecklistClinicoProps> = ({
  selectedDrugIds,
  patientCtx,
}) => {
  // Local state for interactive checkboxes so the clinician can check items during triage
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleItem = (key: string) => {
    setCheckedItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // 1. Check Enoxaparina for TEP/TEV
  const hasEnoxaparina = selectedDrugIds.includes('enoxaparina');

  // 2. Check Omeprazol or Pantoprazol for Stress Ulcer Prophylaxis
  const ulceraDrugs = selectedDrugIds.filter(
    (id) => id === 'omeprazol' || id === 'pantoprazol'
  );
  const hasUlceraEstresse = ulceraDrugs.length > 0;

  // 3. Check Corticosteroids
  const corticoideIds = selectedDrugIds.filter((id) => {
    const d = DRUGS[id];
    if (!d) return false;
    return (
      d.tags.includes('corticosteroide') ||
      [
        'dexametasona',
        'hidrocortisona',
        'prednisona',
        'prednisolona',
        'metilprednisolona',
        'betametasona',
        'budesonida',
      ].includes(id)
    );
  });
  const hasCorticosteroides = corticoideIds.length > 0;

  // Rule: Only render if at least one of these target drugs is selected!
  const shouldShowChecklist = hasEnoxaparina || hasUlceraEstresse || hasCorticosteroides;

  if (!shouldShowChecklist) {
    return null;
  }

  return (
    <section className="bg-white rounded-xl border border-[#D9E2EC] p-5 shadow-xs space-y-4">
      {/* Header matching original design */}
      <div className="flex items-center justify-between border-b border-[#D9E2EC] pb-3">
        <div>
          <h2 className="font-mono text-[13px] font-bold uppercase tracking-[1.2px] text-[#627D98] m-0">
            Checklist Clínico & Segurança de Prescrição
          </h2>
          <p className="text-[11px] text-slate-500 font-sans mt-0.5">
            Verificações ativas obrigatórias para os fármacos específicos selecionados
          </p>
        </div>

        <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
          {[hasEnoxaparina, hasUlceraEstresse, hasCorticosteroides].filter(Boolean).length} Módulo(s) Ativo(s)
        </span>
      </div>

      <div className="space-y-4">
        {/* MÓDULO 1: ENOXAPARINA — TEP & TEV */}
        {hasEnoxaparina && (
          <div className="border border-blue-200 bg-blue-50/20 rounded-xl p-4 space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-blue-100 text-blue-700 flex items-center justify-center font-mono font-bold text-xs">
                  <HeartPulse className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#1A202C]">
                    Enoxaparina — Tromboembolismo Pulmonar (TEP) & Profilaxia de TEV
                  </h3>
                  <span className="text-[11px] text-[#627D98] font-mono">
                    Heparina de Baixo Peso Molecular (HBPM)
                  </span>
                </div>
              </div>

              {patientCtx.clcr !== null && patientCtx.clcr < 30 ? (
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-800 border border-rose-300">
                  ClCr {patientCtx.clcr} mL/min: Ajuste Obrigatório
                </span>
              ) : patientCtx.clcr !== null ? (
                <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                  ClCr {patientCtx.clcr} mL/min
                </span>
              ) : null}
            </div>

            {/* Checklist Items */}
            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={() => toggleItem('enox_indicacao')}
                className="w-full flex items-start gap-2.5 text-left p-2 rounded-lg hover:bg-white/80 transition cursor-pointer"
              >
                <span className="text-blue-600 mt-0.5 shrink-0">
                  {checkedItems['enox_indicacao'] ? (
                    <CheckSquare className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-400" />
                  )}
                </span>
                <div className="text-xs text-slate-800 leading-relaxed">
                  <strong className="text-slate-900">Definição Posológica por Indicação:</strong>{' '}
                  Diferenciar dose profilática de TEV (40mg SC 1x/dia) de dose plena de anticoagulação para TEP/TVP (1mg/kg SC 12/12h ou 1,5mg/kg 1x/dia).
                </div>
              </button>

              <button
                type="button"
                onClick={() => toggleItem('enox_renal')}
                className="w-full flex items-start gap-2.5 text-left p-2 rounded-lg hover:bg-white/80 transition cursor-pointer"
              >
                <span className="text-blue-600 mt-0.5 shrink-0">
                  {checkedItems['enox_renal'] ? (
                    <CheckSquare className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-400" />
                  )}
                </span>
                <div className="text-xs text-slate-800 leading-relaxed">
                  <strong className="text-slate-900">Ajuste na Insuficiência Renal (ClCr &lt; 30 mL/min):</strong>{' '}
                  Risco crítico de bioacumulação da HBPM e hemorragia. Reduzir profilaxia para 20mg SC 1x/dia. No tratamento de TEP, ajustar para 1mg/kg a cada 24h ou preferir Heparina Não Fracionada (HNF) com controle de TTPa.
                </div>
              </button>

              <button
                type="button"
                onClick={() => toggleItem('enox_plaquetas')}
                className="w-full flex items-start gap-2.5 text-left p-2 rounded-lg hover:bg-white/80 transition cursor-pointer"
              >
                <span className="text-blue-600 mt-0.5 shrink-0">
                  {checkedItems['enox_plaquetas'] ? (
                    <CheckSquare className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-400" />
                  )}
                </span>
                <div className="text-xs text-slate-800 leading-relaxed">
                  <strong className="text-slate-900">Vigilância Hematológica e TIH:</strong>{' '}
                  Conferir contagem plaquetária basal e no 3º a 5º dia de uso (rastreio de Trombocitopenia Induzida por Heparina - TIH). Monitorar sangramentos ativos e níveis de hemoglobina.
                </div>
              </button>

              <button
                type="button"
                onClick={() => toggleItem('enox_neuroeixo')}
                className="w-full flex items-start gap-2.5 text-left p-2 rounded-lg hover:bg-white/80 transition cursor-pointer"
              >
                <span className="text-blue-600 mt-0.5 shrink-0">
                  {checkedItems['enox_neuroeixo'] ? (
                    <CheckSquare className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-400" />
                  )}
                </span>
                <div className="text-xs text-slate-800 leading-relaxed">
                  <strong className="text-slate-900">Janela de Segurança para Bloqueio Neuroaxial:</strong>{' '}
                  Respeitar intervalo mínimo de 12 horas (dose profilática) ou 24 horas (dose terapêutica) antes de punção lombar ou anestesia espinhal/epidural (risco de hematoma neuroaxial).
                </div>
              </button>
            </div>
          </div>
        )}

        {/* MÓDULO 2: OMEPRAZOL OU PANTOPRAZOL — ÚLCERA DE ESTRESSE */}
        {hasUlceraEstresse && (
          <div className="border border-amber-200 bg-amber-50/20 rounded-xl p-4 space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-amber-100 text-amber-800 flex items-center justify-center font-mono font-bold text-xs">
                  <Flame className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#1A202C]">
                    {ulceraDrugs.map((id) => DRUGS[id]?.name).join(' / ')} — Profilaxia de Úlcera de Estresse
                  </h3>
                  <span className="text-[11px] text-[#627D98] font-mono">
                    Inibidor de Bomba de Prótons (IBP)
                  </span>
                </div>
              </div>

              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-300">
                Avaliar Indicação ASHP
              </span>
            </div>

            {/* Checklist Items */}
            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={() => toggleItem('ibp_indicacao')}
                className="w-full flex items-start gap-2.5 text-left p-2 rounded-lg hover:bg-white/80 transition cursor-pointer"
              >
                <span className="text-amber-600 mt-0.5 shrink-0">
                  {checkedItems['ibp_indicacao'] ? (
                    <CheckSquare className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-400" />
                  )}
                </span>
                <div className="text-xs text-slate-800 leading-relaxed">
                  <strong className="text-slate-900">Presença de Critérios de Risco Maiores:</strong>{' '}
                  Confirmar presença de Ventilação Mecânica invasiva &gt; 48 horas OU Coagulopatia prévia (Plaquetas &lt; 50.000, INR &gt; 1.5 ou TTPa &gt; 2x controle).
                </div>
              </button>

              <button
                type="button"
                onClick={() => toggleItem('ibp_descontinuacao')}
                className="w-full flex items-start gap-2.5 text-left p-2 rounded-lg hover:bg-white/80 transition cursor-pointer"
              >
                <span className="text-amber-600 mt-0.5 shrink-0">
                  {checkedItems['ibp_descontinuacao'] ? (
                    <CheckSquare className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-400" />
                  )}
                </span>
                <div className="text-xs text-slate-800 leading-relaxed">
                  <strong className="text-slate-900">Reavaliação e Critério de Descontinuação:</strong>{' '}
                  Suspender profilaxia assim que o paciente extubar, sair do choque e tolerar nutrição enteral plena. O uso prolongado desnecessário eleva risco de colite por <em>Clostridioides difficile</em> e pneumonia nosocomial/PAV.
                </div>
              </button>

              <button
                type="button"
                onClick={() => toggleItem('ibp_sonda')}
                className="w-full flex items-start gap-2.5 text-left p-2 rounded-lg hover:bg-white/80 transition cursor-pointer"
              >
                <span className="text-amber-600 mt-0.5 shrink-0">
                  {checkedItems['ibp_sonda'] ? (
                    <CheckSquare className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-400" />
                  )}
                </span>
                <div className="text-xs text-slate-800 leading-relaxed">
                  <strong className="text-slate-900">Compatibilidade com Sonda Enteral (SNE/SNG):</strong>{' '}
                  Nunca triturar drágeas/comprimidos de omeprazol (inativação pelo ácido gástrico). Utilizar grânulos em veículo ligeiramente ácido ou prescrever formulação intravenosa (pantoprazol IV disponível).
                </div>
              </button>
            </div>
          </div>
        )}

        {/* MÓDULO 3: CORTICOSTEROIDES */}
        {hasCorticosteroides && (
          <div className="border border-purple-200 bg-purple-50/20 rounded-xl p-4 space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-purple-100 text-purple-800 flex items-center justify-center font-mono font-bold text-xs">
                  <ShieldAlert className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#1A202C]">
                    Corticosteroides ({corticoideIds.map((id) => DRUGS[id]?.name).join(', ')})
                  </h3>
                  <span className="text-[11px] text-[#627D98] font-mono">
                    Manejo Clínico, Controle Metabólico e Desmame
                  </span>
                </div>
              </div>

              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-800 border border-purple-300">
                Glicemia & Imunossupressão
              </span>
            </div>

            {/* Checklist Items */}
            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={() => toggleItem('cort_glicemia')}
                className="w-full flex items-start gap-2.5 text-left p-2 rounded-lg hover:bg-white/80 transition cursor-pointer"
              >
                <span className="text-purple-600 mt-0.5 shrink-0">
                  {checkedItems['cort_glicemia'] ? (
                    <CheckSquare className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-400" />
                  )}
                </span>
                <div className="text-xs text-slate-800 leading-relaxed">
                  <strong className="text-slate-900">Monitorização Glicêmica Estrita:</strong>{' '}
                  Corticoides precipitam hiperglicemia e resistência insulínica severa. Instituir monitorização de HGT/glicemia capilar pré-refeições e pré-dormir com protocolo de correção por insulina regular/rápida.
                </div>
              </button>

              <button
                type="button"
                onClick={() => toggleItem('cort_infeccao')}
                className="w-full flex items-start gap-2.5 text-left p-2 rounded-lg hover:bg-white/80 transition cursor-pointer"
              >
                <span className="text-purple-600 mt-0.5 shrink-0">
                  {checkedItems['cort_infeccao'] ? (
                    <CheckSquare className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-400" />
                  )}
                </span>
                <div className="text-xs text-slate-800 leading-relaxed">
                  <strong className="text-slate-900">Vigilância Infecciosa e Imunossupressão:</strong>{' '}
                  Ação antipirética e imunossupressora pode mascarar febre e resposta inflamatória inicial. Rastrear focos infecciosos ocultos e acompanhar leucograma com diferencial.
                </div>
              </button>

              <button
                type="button"
                onClick={() => toggleItem('cort_desmame')}
                className="w-full flex items-start gap-2.5 text-left p-2 rounded-lg hover:bg-white/80 transition cursor-pointer"
              >
                <span className="text-purple-600 mt-0.5 shrink-0">
                  {checkedItems['cort_desmame'] ? (
                    <CheckSquare className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-400" />
                  )}
                </span>
                <div className="text-xs text-slate-800 leading-relaxed">
                  <strong className="text-slate-900">Supressão do Eixo HPA & Planejamento de Desmame:</strong>{' '}
                  Se tempo de uso previsto ou mantido ultrapassar 14 a 21 dias (dose equivalente &gt; 20mg/dia de prednisona), não suspender abruptamente; programar desmame escalonado para prevenir crise adrenal aguda.
                </div>
              </button>

              <button
                type="button"
                onClick={() => toggleItem('cort_gastroprotecao')}
                className="w-full flex items-start gap-2.5 text-left p-2 rounded-lg hover:bg-white/80 transition cursor-pointer"
              >
                <span className="text-purple-600 mt-0.5 shrink-0">
                  {checkedItems['cort_gastroprotecao'] ? (
                    <CheckSquare className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-400" />
                  )}
                </span>
                <div className="text-xs text-slate-800 leading-relaxed">
                  <strong className="text-slate-900">Proteção Gástrica e Balanço Eletrolítico:</strong>{' '}
                  Avaliar risco de sangramento gastrointestinal se associado a AINEs ou anticoagulantes. Com hidrocortisona, atentar para retenção hidrossalina e perda de potássio (efeito mineralocorticoide).
                </div>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
