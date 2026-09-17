import React from 'react';
import { ClinicalFinding } from '../types';

interface SafetyAlertsProps {
  findings: ClinicalFinding[];
  hasDrugs: boolean;
}

export const SafetyAlerts: React.FC<SafetyAlertsProps> = ({ findings, hasDrugs }) => {
  if (!hasDrugs) {
    return null;
  }

  const criticos = findings.filter((f) => f.severity === 'critico');
  const atencoes = findings.filter((f) => f.severity === 'atencao');
  const informativos = findings.filter((f) => f.severity === 'informativo');

  return (
    <section className="bg-white rounded-xl border border-[#D9E2EC] p-5 shadow-xs space-y-3">
      {/* Header matching original Crivo design */}
      <div className="flex items-center justify-between">
        <h2 className="font-mono text-[13px] font-bold uppercase tracking-[1.2px] text-[#627D98] m-0">
          Alertas de Segurança & Interações
        </h2>

        <div className="flex items-center gap-2 text-xs font-mono font-semibold">
          {criticos.length > 0 && (
            <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 border border-rose-200">
              {criticos.length} Crítico{criticos.length > 1 ? 's' : ''}
            </span>
          )}
          {atencoes.length > 0 && (
            <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200">
              {atencoes.length} Atenção
            </span>
          )}
          {findings.length === 0 && (
            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
              Sem Alertas
            </span>
          )}
        </div>
      </div>

      <div className="space-y-2.5">
        {findings.length === 0 ? (
          <div className="border border-emerald-200 rounded-lg p-3.5 bg-emerald-50/40 flex items-start gap-3">
            <div className="font-mono font-bold text-emerald-600 text-base leading-none shrink-0 w-4 text-center pt-0.5">
              ✓
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-sm text-emerald-950 leading-snug">
                Nenhuma Interação Crítica Detectada
              </h3>
              <p className="text-xs text-emerald-800 leading-relaxed mt-1">
                A combinação atual de medicamentos não disparou alertas automáticos nas regras ativas do Crivo.
                Mantenha a monitorização clínica de rotina.
              </p>
            </div>
          </div>
        ) : (
          findings.map((f, idx) => {
            const isCritico = f.severity === 'critico';
            const isAtencao = f.severity === 'atencao';

            return (
              <div
                key={idx}
                className={`border rounded-lg p-3.5 flex items-start gap-3 transition ${
                  isCritico
                    ? 'border-rose-300 bg-rose-50/25'
                    : isAtencao
                    ? 'border-amber-300 bg-amber-50/20'
                    : 'border-teal-200 bg-teal-50/20'
                }`}
              >
                <div
                  className={`font-mono font-bold text-base leading-none shrink-0 w-4 text-center pt-0.5 ${
                    isCritico
                      ? 'text-rose-600'
                      : isAtencao
                      ? 'text-amber-500'
                      : 'text-teal-600'
                  }`}
                >
                  !
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-sm text-[#1A202C] leading-snug">
                      {f.drugs}
                    </h3>
                    <span
                      className={`text-[10px] font-mono font-bold uppercase px-1.5 py-0.5 rounded ${
                        isCritico
                          ? 'bg-rose-100 text-rose-800 border border-rose-200'
                          : isAtencao
                          ? 'bg-amber-100 text-amber-800 border border-amber-200'
                          : 'bg-teal-100 text-teal-800 border border-teal-200'
                      }`}
                    >
                      {isCritico ? 'Crítico' : isAtencao ? 'Atenção' : 'Informativo'}
                    </span>
                    {f.ctxIndication && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                        Contexto: {f.ctxIndication}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#627D98] leading-relaxed mt-1">{f.text}</p>
                  {f.ctxNote && (
                    <div className="mt-2 p-2 bg-white border border-slate-200 rounded text-[11px] text-slate-600">
                      <strong>Nota Clínica:</strong> {f.ctxNote}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};
