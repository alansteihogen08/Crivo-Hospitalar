import React, { useState } from 'react';
import { CheckCircle2, AlertTriangle, ShieldAlert, Lock, Zap } from 'lucide-react';
import { DRUGS } from '../data/drugs';
import { AdminRoute, PatientContext } from '../types';
import { getRenalAdjustmentForDrug } from '../services/clinicalEngine';
import { getAvailableRoutesForDrug, ROUTE_METADATA, getRouteNote } from '../data/drugRoutes';

interface DrugDetailsListProps {
  selectedDrugIds: string[];
  drugRoutes?: Record<string, AdminRoute>;
  patientCtx: PatientContext;
  onRouteChange?: (id: string, route: AdminRoute) => void;
}

export const DrugDetailsList: React.FC<DrugDetailsListProps> = ({
  selectedDrugIds,
  drugRoutes = {},
  patientCtx,
  onRouteChange,
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

        const isCollapsed = collapsed[id] === true;
        const renalInfo = getRenalAdjustmentForDrug(drug, patientCtx.clcr, patientCtx.dialise);
        const isNefrotoxico =
          drug.tags.includes('nefrotoxico') || drug.tags.includes('nefrotoxico_alto');

        const availableRoutes = getAvailableRoutesForDrug(id);
        const currentRoute = drugRoutes[id] || drug.defaultRoute || availableRoutes[0] || 'VO';
        const isSingleRoute = availableRoutes.length === 1;
        const routeNote = getRouteNote(id, currentRoute);

        const isNptRisk =
          Boolean(patientCtx.emNPT) &&
          currentRoute === 'IV' &&
          Boolean(drug.nptIncompatibility?.incompatible);

        return (
          <div
            key={id}
            className={`bg-white rounded-xl border p-4 shadow-xs transition ${
              isNptRisk ? 'border-amber-400 ring-1 ring-amber-300' : 'border-[#D9E2EC]'
            }`}
          >
            {/* Header: Drug Name + Badges + Chevron */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => toggleCollapse(id)}
                className="flex flex-wrap items-center gap-2 text-left cursor-pointer focus:outline-none flex-1 min-w-[200px]"
              >
                <span className="font-['Syne',sans-serif] font-bold text-base text-[#1A202C]">
                  {drug.name}
                </span>

                {drug.brandName && (
                  <span className="text-xs text-slate-500 font-medium">
                    ({drug.brandName})
                  </span>
                )}

                {/* Badge de Via Ativa */}
                <span
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                    ROUTE_METADATA[currentRoute]?.badgeColor || 'bg-slate-100 text-slate-800'
                  }`}
                >
                  Via {currentRoute}
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

                {isNptRisk && (
                  <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-900 border border-purple-300 animate-pulse">
                    Alerta NPT
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => toggleCollapse(id)}
                className="text-[#0A7EA4] text-xs font-bold shrink-0 ml-2 p-1 cursor-pointer"
              >
                {isCollapsed ? '▸ Expandir' : '▾ Recolher'}
              </button>
            </div>

            {/* Expanded Body */}
            {!isCollapsed && (
              <div className="mt-4 pt-3 border-t border-[#D9E2EC] space-y-4">
                {/* 0. Seletor & Cuidados da Via de Administração */}
                <div className="bg-slate-50 border border-slate-200/90 rounded-lg p-3 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-[11px] font-bold uppercase tracking-[1px] text-[#0A7EA4]">
                        VIA DE ADMINISTRAÇÃO ATIVA:
                      </span>
                      {isSingleRoute ? (
                        <span className="inline-flex items-center gap-1 text-xs font-mono font-bold text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-300">
                          <Lock className="w-3 h-3 text-slate-500" />
                          <span>{currentRoute} (Apresentação Exclusiva ANVISA)</span>
                        </span>
                      ) : (
                        <div className="inline-flex items-center gap-1">
                          {availableRoutes.map((r) => {
                            const isSelected = currentRoute === r;
                            const meta = ROUTE_METADATA[r];
                            return (
                              <button
                                key={r}
                                type="button"
                                onClick={() => onRouteChange?.(id, r)}
                                className={`px-2 py-0.5 rounded text-xs font-mono font-bold transition cursor-pointer border ${
                                  isSelected
                                    ? `${meta?.activeColor || 'bg-slate-800 text-white'} border-transparent shadow-xs`
                                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                                }`}
                              >
                                {r}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    <div className="text-[11px] text-slate-500 font-mono">
                      Disponível em: <span className="font-semibold">{availableRoutes.join(', ')}</span>
                    </div>
                  </div>

                  {/* Alerta de Incompatibilidade de NPT quando ativo */}
                  {isNptRisk && (
                    <div className="p-2.5 bg-purple-50 border border-purple-200 rounded-md text-xs text-purple-900 flex items-start gap-2">
                      <ShieldAlert className="w-4 h-4 text-purple-700 shrink-0 mt-0.5" />
                      <div>
                        <strong>Incompatibilidade em Y com Nutrição Parenteral Total (NPT):</strong>{' '}
                        {drug.nptIncompatibility?.reason}
                      </div>
                    </div>
                  )}

                  {/* Nota específica da via */}
                  {routeNote && (
                    <div className="p-2.5 bg-amber-50/80 border border-amber-200 rounded-md text-xs text-amber-900 flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <strong>Orientações da via {currentRoute}:</strong> {routeNote}
                      </div>
                    </div>
                  )}
                </div>

                {/* 1. Ajuste de Dose por Clearance ou Mensagem Sem Ajuste */}
                {renalInfo.hasRenalSchedule ? (
                  <div>
                    <h4 className="font-mono text-[11px] font-bold uppercase tracking-[1px] text-[#627D98] mb-2">
                      AJUSTE DE DOSE POR CLEARANCE DE CREATININA (CLCR)
                    </h4>

                    {/* 2-Column Table */}
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
                              className={`grid grid-cols-12 px-3 py-2.5 items-center transition ${
                                isMatched
                                  ? 'bg-[#FEF3C7] border-l-4 border-l-[#F59E0B] font-semibold text-[#92400E]'
                                  : 'hover:bg-slate-50 text-[#1A202C]'
                              }`}
                            >
                              <div className="col-span-4 sm:col-span-3 font-mono">
                                {rangeLabel}
                              </div>
                              <div className="col-span-8 sm:col-span-9 flex items-center gap-1.5">
                                <span>{range.dose}</span>
                                {isMatched && (
                                  <span className="text-[10px] font-mono uppercase bg-[#F59E0B] text-white px-1.5 py-0.2 rounded shrink-0">
                                    Faixa do Paciente
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
                  <div>
                    <h4 className="font-mono text-[11px] font-bold uppercase tracking-[1px] text-[#627D98] mb-1">
                      AJUSTE DE DOSE POR CLEARANCE DE CREATININA (CLCR)
                    </h4>
                    <p className="text-xs text-[#1A202C] leading-relaxed">
                      Não requer ajuste de dose para função renal. Eliminação predominantemente hepática ou não renal.
                    </p>
                  </div>
                )}

                {/* 2. Diálise */}
                {drug.dialysis && (
                  <div>
                    <h4 className="font-mono text-[11px] font-bold uppercase tracking-[1px] text-[#0A7EA4] mb-1">
                      CONDUTA NA DIÁLISE / TERAPIA RENAL SUBSTITUTIVA
                    </h4>
                    <p className="text-xs text-[#1A202C] leading-relaxed bg-[#F0F4F8] p-2.5 rounded-lg border border-[#D9E2EC]">
                      {typeof drug.dialysis === 'string'
                        ? drug.dialysis
                        : Object.entries(drug.dialysis)
                            .map(([mode, text]) => `${mode.toUpperCase()}: ${text}`)
                            .join(' | ')}
                    </p>
                  </div>
                )}

                {/* 3. Efeitos Adversos Relevantes */}
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
