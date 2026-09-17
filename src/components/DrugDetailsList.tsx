import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { DRUGS } from '../data/drugs';
import { PatientContext } from '../types';
import { getRenalAdjustmentForDrug } from '../services/clinicalEngine';

interface DrugDetailsListProps {
  selectedDrugIds: string[];
  patientCtx: PatientContext;
}

export const DrugDetailsList: React.FC<DrugDetailsListProps> = ({
  selectedDrugIds,
  patientCtx,
}) => {
  // Default: first drug or all open, or toggle individually
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  if (selectedDrugIds.length === 0) return null;

  const toggleCollapse = (id: string) => {
    setCollapsed((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-3">
      {selectedDrugIds.map((id) => {
        const drug = DRUGS[id];
        if (!drug) return null;

        // Default open for the drugs to look like screenshot 2
        const isCollapsed = collapsed[id] === true;
        const renalInfo = getRenalAdjustmentForDrug(drug, patientCtx.clcr, patientCtx.dialise);
        const isNefrotoxico =
          drug.tags.includes('nefrotoxico') || drug.tags.includes('nefrotoxico_alto');

        return (
          <div
            key={id}
            className="bg-white rounded-xl border border-[#D9E2EC] p-4 shadow-xs transition"
          >
            {/* Header: Drug Name + Badges + Chevron (from Screenshot 2) */}
            <button
              type="button"
              onClick={() => toggleCollapse(id)}
              className="w-full flex items-center justify-between text-left cursor-pointer focus:outline-none"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-['Syne',sans-serif] font-bold text-base text-[#1A202C]">
                  {drug.name}
                </span>

                {renalInfo.hasRenalSchedule ? (
                  <span
                    className={`text-[11px] font-mono font-medium px-2 py-0.5 rounded border ${
                      renalInfo.requiresAdjustment
                        ? 'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]'
                        : 'bg-[#EFF6FF] text-[#1D4ED8] border-[#BFDBFE]'
                    }`}
                  >
                    {renalInfo.requiresAdjustment ? 'Ajuste Renal Necessário' : 'Ajuste Renal'}
                  </span>
                ) : (
                  <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-[#F0FDF4] text-[#15803D] border border-[#BBF7D0]">
                    Sem ajuste renal
                  </span>
                )}

                {isNefrotoxico && (
                  <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-[#FEF2F2] text-[#DC2626] border border-[#FECACA]">
                    Nefrotóxico
                  </span>
                )}
              </div>

              <span className="text-[#0A7EA4] text-xs font-bold shrink-0 ml-2">
                {isCollapsed ? '▸' : '▾'}
              </span>
            </button>

            {/* Expanded Body (from Screenshot 2) */}
            {!isCollapsed && (
              <div className="mt-4 pt-3 border-t border-[#D9E2EC] space-y-4">
                {/* 1. Ajuste de Dose por Clearance ou Mensagem Sem Ajuste */}
                {renalInfo.hasRenalSchedule ? (
                  <div>
                    <h4 className="font-mono text-[11px] font-bold uppercase tracking-[1px] text-[#627D98] mb-2">
                      AJUSTE DE DOSE POR CLEARANCE DE CREATININA (CLCR)
                    </h4>

                    {/* 2-Column Table matching Screenshot 2 */}
                    <div className="border border-[#D9E2EC] rounded-lg overflow-hidden text-xs">
                      {/* Table Header */}
                      <div className="bg-[#F0F4F8] border-b border-[#D9E2EC] grid grid-cols-12 px-3 py-2 text-[#0A7EA4] font-mono font-bold">
                        <div className="col-span-4 sm:col-span-3">ClCr (mL/min)</div>
                        <div className="col-span-8 sm:col-span-9">Posologia Recomendada</div>
                      </div>

                      {/* Table Rows */}
                      <div className="divide-y divide-[#D9E2EC]">
                        {renalInfo.allRanges.map((range, idx) => {
                          const isMatched =
                            patientCtx.clcr !== null &&
                            patientCtx.clcr >= range.min &&
                            patientCtx.clcr <= range.max;

                          // Format range display anatomically without ever showing < 1000
                          let rangeLabel = '';
                          if (range.min >= 50 && range.max >= 900) {
                            rangeLabel = `≥ ${range.min}`;
                          } else if (range.max >= 900) {
                            rangeLabel = `≥ ${range.min}`;
                          } else if (range.min === 0) {
                            rangeLabel = `< ${range.max + 1}`;
                          } else {
                            rangeLabel = `${range.min} a ${range.max}`;
                          }

                          return (
                            <div
                              key={idx}
                              className={`grid grid-cols-12 px-3 py-2.5 transition ${
                                isMatched
                                  ? 'bg-[#FEF3C7] text-[#1A202C]'
                                  : 'bg-white text-slate-800'
                              }`}
                            >
                              <div className="col-span-4 sm:col-span-3 font-mono font-semibold self-center">
                                {rangeLabel}
                              </div>
                              <div
                                className={`col-span-8 sm:col-span-9 ${
                                  isMatched
                                    ? "font-['Syne',sans-serif] font-bold text-[#1A202C] leading-snug"
                                    : 'font-sans text-xs leading-relaxed text-slate-700'
                                }`}
                              >
                                {isMatched ? (
                                  <span>
                                    👉 {range.dose} (faixa atual do paciente)
                                  </span>
                                ) : (
                                  range.dose
                                )}
                                {range.note && (
                                  <span className="block text-[11px] text-slate-500 italic mt-0.5 font-normal">
                                    Nota: {range.note}
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-lg p-3 text-xs text-[#14532D] flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-[#15803D] font-mono text-[11px] uppercase tracking-wider">
                        Função Renal & Posologia
                      </h4>
                      <p className="mt-0.5 leading-relaxed text-[#14532D]">
                        {renalInfo.noAdjustmentMessage ||
                          'Não é necessário ajuste de dose pela função renal — eliminação predominantemente hepática/biliar ou dose padrão mantida.'}
                      </p>
                    </div>
                  </div>
                )}

                {/* 2. Conduta em Diálise / TRS */}
                {drug.dialysis && (
                  <div>
                    <h4 className="font-mono text-[11px] font-bold uppercase tracking-[1px] text-[#0A7EA4] mb-1">
                      CONDUTA EM DIÁLISE / TRS
                    </h4>
                    <p className="text-xs text-[#1A202C] leading-relaxed">
                      {typeof drug.dialysis === 'string'
                        ? drug.dialysis
                        : Object.entries(drug.dialysis)
                            .map(([mode, text]) => `${mode.toUpperCase()}: ${text}`)
                            .join(' | ')}
                    </p>
                  </div>
                )}

                {/* 3. Interação Fármaco-Alimento / Nutrição Enteral */}
                {drug.food && drug.food.length > 0 && (
                  <div>
                    <h4 className="font-mono text-[11px] font-bold uppercase tracking-[1px] text-[#0A7EA4] mb-1">
                      INTERAÇÃO FÁRMACO-ALIMENTO / NUTRIÇÃO ENTERAL
                    </h4>
                    <ul className="text-xs text-[#1A202C] leading-relaxed list-none space-y-1">
                      {drug.food.map((f, i) => (
                        <li key={i}>• {f}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* 4. Efeitos Adversos Relevantes */}
                {drug.effects && drug.effects.length > 0 && (
                  <div>
                    <h4 className="font-mono text-[11px] font-bold uppercase tracking-[1px] text-[#0A7EA4] mb-1">
                      EFEITOS ADVERSOS RELEVANTES
                    </h4>
                    <ul className="text-xs text-[#1A202C] leading-relaxed list-disc list-inside space-y-0.5">
                      {drug.effects.map((ef, i) => (
                        <li key={i}>{ef}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* 5. Parâmetros a Monitorar */}
                {drug.monitor && drug.monitor.length > 0 && (
                  <div>
                    <h4 className="font-mono text-[11px] font-bold uppercase tracking-[1px] text-[#0A7EA4] mb-1">
                      PARÂMETROS A MONITORAR
                    </h4>
                    <ul className="text-xs text-[#1A202C] leading-relaxed list-disc list-inside space-y-0.5">
                      {drug.monitor.map((m, i) => (
                        <li key={i}>{m}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
