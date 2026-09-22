import React from 'react';
import {
  AlertOctagon,
  AlertTriangle,
  Info,
  CheckCircle2,
  ShieldCheck,
  Zap,
  HelpCircle
} from 'lucide-react';
import { ClinicalFinding } from '../types';

interface TriageFindingsProps {
  findings: ClinicalFinding[];
  hasDrugs: boolean;
}

export const TriageFindings: React.FC<TriageFindingsProps> = ({ findings, hasDrugs }) => {
  if (!hasDrugs) {
    return null;
  }

  const criticos = findings.filter((f) => f.severity === 'critico');
  const atencoes = findings.filter((f) => f.severity === 'atencao');
  const informativos = findings.filter((f) => f.severity === 'informativo');

  return (
    <section className="bg-white rounded-xl shadow-sm border border-slate-200/90 overflow-hidden">
      {/* Header */}
      <div className="bg-slate-50/80 px-5 py-3.5 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-rose-500/10 text-rose-700 flex items-center justify-center font-bold">
            <Zap className="w-4 h-4 text-rose-600" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono">
              Achados Clínicos & Interações Identificadas
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono font-semibold">
          {criticos.length > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200">
              {criticos.length} Crítico{criticos.length > 1 ? 's' : ''}
            </span>
          )}
          {atencoes.length > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
              {atencoes.length} Atenção
            </span>
          )}
          {findings.length === 0 && (
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Sem Alertas Críticos</span>
            </span>
          )}
        </div>
      </div>

      <div className="p-5 space-y-3">
        {findings.length === 0 ? (
          <div className="p-4 bg-emerald-50/80 border border-emerald-200 rounded-xl flex items-center gap-3.5 text-emerald-900">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-sm font-bold font-mono">Nenhuma interação de alto risco detectada</h3>
              <p className="text-xs text-emerald-800/90 mt-0.5">
                A combinação de medicamentos atual não disparou alertas automáticos nas regras ativas do Crivo.
                Mantenha a monitorização clínica de rotina.
              </p>
            </div>
          </div>
        ) : (
          findings.map((f, idx) => {
            const isCritico = f.severity === 'critico';
            const isAtencao = f.severity === 'atencao';

            const containerStyle = isCritico
              ? 'bg-rose-50/30 border-rose-300'
              : isAtencao
              ? 'bg-amber-50/30 border-amber-300'
              : 'bg-teal-50/30 border-teal-300';

            const badgeStyle = isCritico
              ? 'bg-rose-100 text-rose-900 border-rose-300'
              : isAtencao
              ? 'bg-amber-100 text-amber-900 border-amber-300'
              : 'bg-teal-100 text-teal-900 border-teal-300';

            const stripeColor = isCritico
              ? 'bg-rose-600'
              : isAtencao
              ? 'bg-amber-500'
              : 'bg-teal-600';

            const Icon = isCritico ? AlertOctagon : isAtencao ? AlertTriangle : Info;

            return (
              <div
                key={idx}
                className={`flex border rounded-xl overflow-hidden shadow-2xs transition ${containerStyle}`}
              >
                {/* Visual indicator stripe */}
                <div className={`w-2 shrink-0 ${stripeColor}`} />

                <div className="p-4 flex-1 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded border flex items-center gap-1 ${badgeStyle}`}
                      >
                        <Icon className="w-3 h-3" />
                        <span>{f.severity === 'critico' ? 'Risco Crítico' : f.severity === 'atencao' ? 'Alerta de Atenção' : 'Informativo'}</span>
                      </span>
                      {f.findingCategory === 'npt' && (
                        <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-purple-100 text-purple-900 border border-purple-300">
                          Incompatibilidade NPT
                        </span>
                      )}
                      {f.route && f.findingCategory !== 'npt' && (
                        <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-blue-100 text-blue-900 border border-blue-300">
                          Via {f.route}
                        </span>
                      )}
                      <span className="font-mono font-bold text-sm text-slate-900">
                        {f.drugs}
                      </span>
                    </div>

                    {f.ctxIndication && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                        Contexto: {f.ctxIndication}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-800 leading-relaxed font-normal">
                    {f.text}
                  </p>

                  {f.ctxNote && (
                    <div className="p-2 bg-white/80 border border-slate-200 rounded-md text-[11px] text-slate-600 flex items-start gap-1.5">
                      <Info className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>Nota de Contexto Clínico:</strong> {f.ctxNote}
                      </span>
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
