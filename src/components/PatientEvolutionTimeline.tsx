import React, { useState } from 'react';
import { RefreshCw, Copy, Check } from 'lucide-react';
import { EvolucaoEntry, PatientContext } from '../types';

interface PatientEvolutionTimelineProps {
  entries: EvolucaoEntry[];
  patientCtx: PatientContext;
  onRegister: (conduta: string, observacao: string) => Promise<void>;
  onEncerrarLeito: () => Promise<void>;
  onRefresh: () => void;
  isLoading?: boolean;
}

export const PatientEvolutionTimeline: React.FC<PatientEvolutionTimelineProps> = ({
  entries,
  patientCtx,
  onRegister,
  onRefresh,
  isLoading,
}) => {
  const [conduta, setConduta] = useState('');
  const [observacao, setObservacao] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleRegister = async () => {
    if (!patientCtx.setorId || !patientCtx.leito) {
      alert('Selecione o Setor e informe o Leito no formulário acima para registrar a evolução.');
      return;
    }
    setIsSubmitting(true);
    try {
      await onRegister(conduta, observacao);
      setConduta('');
      setObservacao('');
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = () => {
    if (!entries.length) return;
    const latest = entries[entries.length - 1];
    const text = `--- EVOLUÇÃO DE FARMÁCIA CLÍNICA (CRIVO) ---
Data: ${new Date(latest.ts).toLocaleString('pt-BR')}
Leito: ${patientCtx.leito || 'N/I'} | Paciente: ${latest.iniciais || 'N/I'} | Idade: ${latest.idade || '—'} anos
ClCr (Cockcroft-Gault): ${latest.clcr || '—'} mL/min

MEDICAMENTOS AVALIADOS:
${(latest.medicamentos || []).join(', ') || 'Nenhum'}

ACHADOS / INTERAÇÕES:
${latest.achado || 'Nenhum alerta crítico'}

RECOMENDAÇÃO:
${latest.sugestao || 'Sem ajustes necessários no momento'}

CONDUTA DO PRESCRITOR:
${latest.conduta || 'Registrado para acompanhamento'}

OBSERVAÇÕES:
${latest.observacao || 'Sem observações adicionais'}
---------------------------------------------`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="bg-white rounded-xl border border-[#D9E2EC] p-5 shadow-xs space-y-4">
      {/* Title & Subtitle from Screenshot 1 */}
      <div>
        <h2 className="font-mono text-[13px] font-bold uppercase tracking-[1.2px] text-[#627D98] m-0">
          Evolução do Paciente
        </h2>
        <p className="text-xs italic text-[#627D98] mt-0.5">
          Sincronizado com o Firebase
        </p>
      </div>

      {/* Header bar: LINHA DO TEMPO + [Atualizar] */}
      <div className="flex items-center justify-between pt-1 border-t border-slate-100">
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#627D98]">
          Linha do Tempo
        </span>
        <div className="flex items-center gap-2">
          {entries.length > 0 && (
            <button
              type="button"
              onClick={copyToClipboard}
              className="text-xs px-2 py-0.5 bg-white border border-[#D9E2EC] hover:bg-slate-50 text-slate-700 rounded font-mono flex items-center gap-1 cursor-pointer"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-slate-500" />}
              <span>{copied ? 'Copiado' : 'Copiar'}</span>
            </button>
          )}
          <button
            type="button"
            onClick={onRefresh}
            className="text-xs px-2.5 py-0.5 bg-white border border-[#D9E2EC] hover:bg-slate-50 text-slate-700 rounded font-mono flex items-center gap-1 cursor-pointer"
          >
            <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Atualizar</span>
          </button>
        </div>
      </div>

      {/* Timeline Entries (if any for this leito) */}
      {entries.length > 0 && (
        <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
          {[...entries].reverse().map((entry, idx) => (
            <div
              key={idx}
              className="p-3 bg-slate-50/70 border border-[#D9E2EC] rounded-lg text-xs space-y-1"
            >
              <div className="flex items-center justify-between text-slate-500 font-mono text-[11px]">
                <span>{new Date(entry.ts).toLocaleString('pt-BR')}</span>
                <span className="font-semibold text-slate-700">{entry.leito}</span>
              </div>
              {entry.conduta && (
                <p className="text-slate-800">
                  <strong className="text-slate-900">Conduta:</strong> {entry.conduta}
                </p>
              )}
              {entry.observacao && (
                <p className="text-slate-600 italic">
                  <strong className="text-slate-700 not-italic">Obs:</strong> {entry.observacao}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Form Fields: Conduta do prescritor */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">
          Conduta do prescritor
        </label>
        <input
          type="text"
          value={conduta}
          onChange={(e) => setConduta(e.target.value)}
          placeholder="ex: Aceito, dose ajustada"
          className="w-full px-3 py-2 bg-white border border-[#D9E2EC] rounded-lg text-sm text-slate-900 focus:outline-none focus:border-[#0A7EA4] transition placeholder:text-slate-400 font-sans"
        />
      </div>

      {/* Form Fields: Observação livre */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">
          Observação livre
        </label>
        <textarea
          rows={3}
          value={observacao}
          onChange={(e) => setObservacao(e.target.value)}
          placeholder="observações..."
          className="w-full px-3 py-2 bg-white border border-[#D9E2EC] rounded-lg text-sm text-slate-900 focus:outline-none focus:border-[#0A7EA4] transition placeholder:text-slate-400 font-sans"
        />
      </div>

      {/* Big Action Button from Screenshot 1 */}
      <button
        type="button"
        onClick={handleRegister}
        disabled={isSubmitting}
        className="w-full py-3 bg-[#0B1F3A] hover:bg-[#162D4D] text-white text-sm font-bold rounded-lg transition shadow-xs cursor-pointer flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span>Registrando...</span>
          </>
        ) : (
          <span>Registrar na evolução</span>
        )}
      </button>
    </section>
  );
};
