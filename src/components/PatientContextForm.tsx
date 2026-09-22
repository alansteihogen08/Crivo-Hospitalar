import React, { useState } from 'react';
import { PatientContext, SetorHospital } from '../types';
import { calcCockcroftGault } from '../services/clinicalEngine';

interface PatientContextFormProps {
  ctx: PatientContext;
  setores: SetorHospital[];
  onChange: (updated: Partial<PatientContext>) => void;
  onNavigateToSetoresTab: () => void;
}

export const PatientContextForm: React.FC<PatientContextFormProps> = ({
  ctx,
  setores,
  onChange,
  onNavigateToSetoresTab,
}) => {
  const [isManualClcr, setIsManualClcr] = useState(ctx.clcrManual);

  const handleNumericInput = (field: 'idade' | 'peso' | 'creatinina', value: string) => {
    const num = value === '' ? null : Number(value);
    const updated = { [field]: num };

    if (!isManualClcr) {
      const newIdade = field === 'idade' ? num : ctx.idade;
      const newPeso = field === 'peso' ? num : ctx.peso;
      const newCreat = field === 'creatinina' ? num : ctx.creatinina;
      const newClcr = calcCockcroftGault(newIdade, newPeso, newCreat, ctx.sexo);
      onChange({ ...updated, clcr: newClcr, clcrManual: false });
    } else {
      onChange(updated);
    }
  };

  const handleSexoChange = (sexo: 'm' | 'f') => {
    const updated = { sexo };
    if (!isManualClcr) {
      const newClcr = calcCockcroftGault(ctx.idade, ctx.peso, ctx.creatinina, sexo);
      onChange({ ...updated, clcr: newClcr, clcrManual: false });
    } else {
      onChange(updated);
    }
  };

  const handleManualClcrChange = (value: string) => {
    const num = value === '' ? null : Number(value);
    onChange({ clcr: num, clcrManual: true });
  };

  return (
    <section className="bg-white rounded-xl border border-[#D9E2EC] p-5 shadow-xs space-y-4">
      {/* Title from Screenshot 1: CONTEXTO E SETOR */}
      <div className="flex items-center justify-between">
        <h2 className="font-mono text-[13px] font-bold uppercase tracking-[1.2px] text-[#627D98] m-0">
          Contexto e Setor
        </h2>
        {setores.length === 0 && (
          <button
            type="button"
            onClick={onNavigateToSetoresTab}
            className="text-xs text-teal-700 hover:underline font-mono"
          >
            + Criar Setores
          </button>
        )}
      </div>

      {/* Field: Setor / Unidade */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">
          Setor / Unidade
        </label>
        <select
          value={ctx.setorId}
          onChange={(e) => onChange({ setorId: e.target.value })}
          className="w-full px-3 py-2 bg-white border border-[#D9E2EC] rounded-lg text-sm text-slate-900 focus:outline-none focus:border-[#0A7EA4] transition"
        >
          <option value="">Selecione o setor...</option>
          {setores.map((s) => (
            <option key={s.id} value={s.id}>
              {s.nome} {s.souDono ? '' : '(compartilhado)'}
            </option>
          ))}
        </select>
      </div>

      {/* Row 2: Leito + Paciente (Iniciais) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Leito</label>
          <input
            type="text"
            value={ctx.leito}
            onChange={(e) => onChange({ leito: e.target.value })}
            placeholder="ex: Leito 4"
            className="w-full px-3 py-2 bg-white border border-[#D9E2EC] rounded-lg text-sm text-slate-900 focus:outline-none focus:border-[#0A7EA4] transition placeholder:text-slate-400"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Paciente (Iniciais)
          </label>
          <input
            type="text"
            value={ctx.pacienteIniciais}
            onChange={(e) => onChange({ pacienteIniciais: e.target.value })}
            placeholder="ex: J. S."
            className="w-full px-3 py-2 bg-white border border-[#D9E2EC] rounded-lg text-sm text-slate-900 focus:outline-none focus:border-[#0A7EA4] transition placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Row 3: Idade + Peso + Sexo (from Screenshot 1) */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
        <div className="sm:col-span-4">
          <label className="block text-xs font-semibold text-slate-700 mb-1">Idade (anos)</label>
          <input
            type="number"
            min={0}
            max={125}
            value={ctx.idade ?? ''}
            onChange={(e) => handleNumericInput('idade', e.target.value)}
            placeholder="—"
            className="w-full px-3 py-2 bg-white border border-[#D9E2EC] rounded-lg text-sm text-slate-900 focus:outline-none focus:border-[#0A7EA4] transition"
          />
        </div>

        <div className="sm:col-span-4">
          <label className="block text-xs font-semibold text-slate-700 mb-1">Peso (kg)</label>
          <input
            type="number"
            min={0}
            max={350}
            step="0.1"
            value={ctx.peso ?? ''}
            onChange={(e) => handleNumericInput('peso', e.target.value)}
            placeholder="—"
            className="w-full px-3 py-2 bg-white border border-[#D9E2EC] rounded-lg text-sm text-slate-900 focus:outline-none focus:border-[#0A7EA4] transition"
          />
        </div>

        <div className="sm:col-span-4">
          <label className="block text-xs font-semibold text-slate-700 mb-1">Sexo</label>
          <div className="flex items-center gap-2 pt-0.5">
            <button
              type="button"
              onClick={() => handleSexoChange('m')}
              className={`w-9 h-9 rounded-full border text-xs font-bold transition flex items-center justify-center cursor-pointer ${
                ctx.sexo === 'm'
                  ? 'bg-[#0B1F3A] text-white border-[#0B1F3A]'
                  : 'bg-white text-slate-700 border-[#D9E2EC] hover:bg-slate-50'
              }`}
            >
              M
            </button>
            <button
              type="button"
              onClick={() => handleSexoChange('f')}
              className={`w-9 h-9 rounded-full border text-xs font-bold transition flex items-center justify-center cursor-pointer ${
                ctx.sexo === 'f'
                  ? 'bg-[#0B1F3A] text-white border-[#0B1F3A]'
                  : 'bg-white text-slate-700 border-[#D9E2EC] hover:bg-slate-50'
              }`}
            >
              F
            </button>
          </div>
        </div>
      </div>

      {/* Row 4: Creatinina + ClCr (Cockcroft-Gault) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Creatinina (mg/dL)
          </label>
          <input
            type="number"
            min={0.1}
            max={30}
            step="0.01"
            value={ctx.creatinina ?? ''}
            onChange={(e) => handleNumericInput('creatinina', e.target.value)}
            placeholder="—"
            className="w-full px-3 py-2 bg-white border border-[#D9E2EC] rounded-lg text-sm text-slate-900 focus:outline-none focus:border-[#0A7EA4] transition"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            ClCr (Cockcroft-Gault)
          </label>
          {isManualClcr ? (
            <input
              type="number"
              step="0.1"
              value={ctx.clcr ?? ''}
              onChange={(e) => handleManualClcrChange(e.target.value)}
              placeholder="ex: 45"
              className="w-full px-3 py-2 bg-amber-50/50 border border-amber-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-amber-500 font-mono font-bold"
            />
          ) : (
            <input
              type="text"
              readOnly
              value={ctx.clcr !== null ? `${ctx.clcr} mL/min` : ''}
              placeholder="automático"
              className="w-full px-3 py-2 bg-[#F1F5F9] border border-[#D9E2EC] rounded-lg text-sm text-slate-700 font-mono cursor-not-allowed"
            />
          )}
        </div>
      </div>

      {/* Link from Screenshot 1: Digitar ClCr manualmente */}
      <div>
        <button
          type="button"
          onClick={() => {
            const nextState = !isManualClcr;
            setIsManualClcr(nextState);
            onChange({ clcrManual: nextState });
          }}
          className="text-xs italic underline text-[#6D28D9] hover:text-[#5B21B6] cursor-pointer"
        >
          {isManualClcr ? 'Calcular automaticamente (Cockcroft-Gault)' : 'Digitar ClCr manualmente'}
        </button>
      </div>

      {/* Row 5: Suporte ventilatório (Chips) */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
          Suporte ventilatório
        </label>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onChange({ ventilacaoMecanica: false, emVM: false })}
            className={`px-4 py-1.5 rounded-full text-xs font-medium border transition cursor-pointer ${
              !ctx.ventilacaoMecanica && !ctx.emVM
                ? 'bg-[#0B1F3A] text-white border-[#0B1F3A]'
                : 'bg-white text-slate-700 border-[#D9E2EC] hover:bg-slate-50'
            }`}
          >
            Sem VM
          </button>
          <button
            type="button"
            onClick={() => onChange({ ventilacaoMecanica: true, emVM: true })}
            className={`px-4 py-1.5 rounded-full text-xs font-medium border transition cursor-pointer ${
              ctx.ventilacaoMecanica || ctx.emVM
                ? 'bg-[#0B1F3A] text-white border-[#0B1F3A]'
                : 'bg-white text-slate-700 border-[#D9E2EC] hover:bg-slate-50'
            }`}
          >
            Em VM
          </button>
        </div>
      </div>

      {/* Row 6: Modalidade de diálise / TRS (Chips) */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
          Modalidade de diálise / TRS
        </label>
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: '', label: 'Nenhuma' },
            { id: 'hd', label: 'HD' },
            { id: 'cvvh', label: 'CVVH' },
            { id: 'cvvhd', label: 'CVVHD' },
          ].map((mode) => {
            const isSelected = ctx.dialise === mode.id;
            return (
              <button
                key={mode.id}
                type="button"
                onClick={() => onChange({ dialise: mode.id as any })}
                className={`px-4 py-1.5 rounded-full text-xs font-medium border transition cursor-pointer ${
                  isSelected
                    ? 'bg-[#0B1F3A] text-white border-[#0B1F3A]'
                    : 'bg-white text-slate-700 border-[#D9E2EC] hover:bg-slate-50'
                }`}
              >
                {mode.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Row 7: Nutrição Parenteral Total (NPT) */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-xs font-semibold text-slate-700">
            Nutrição Parenteral Total (NPT)
          </label>
          {ctx.emNPT && (
            <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-300">
              Vigilância de Incompatibilidade em Y Ativa
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onChange({ emNPT: false })}
            className={`px-4 py-1.5 rounded-full text-xs font-medium border transition cursor-pointer ${
              !ctx.emNPT
                ? 'bg-[#0B1F3A] text-white border-[#0B1F3A]'
                : 'bg-white text-slate-700 border-[#D9E2EC] hover:bg-slate-50'
            }`}
          >
            Sem NPT
          </button>
          <button
            type="button"
            onClick={() => onChange({ emNPT: true })}
            className={`px-4 py-1.5 rounded-full text-xs font-medium border transition cursor-pointer ${
              ctx.emNPT
                ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                : 'bg-white text-slate-700 border-[#D9E2EC] hover:bg-slate-50'
            }`}
          >
            Em NPT (Parenteral)
          </button>
        </div>
      </div>

      {/* Row 7: Contexto clínico / diagnóstico (Textarea) */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">
          Contexto clínico / diagnóstico
        </label>
        <textarea
          rows={2}
          value={ctx.diagnostico}
          onChange={(e) => onChange({ diagnostico: e.target.value })}
          placeholder="ex: sepse, infecção grave..."
          className="w-full px-3 py-2 bg-white border border-[#D9E2EC] rounded-lg text-sm text-slate-900 focus:outline-none focus:border-[#0A7EA4] transition placeholder:text-slate-400"
        />
      </div>
    </section>
  );
};
