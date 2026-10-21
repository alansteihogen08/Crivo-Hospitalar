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
    <section className="bg-white rounded-xl border border-[#D9E2EC] p-3.5 sm:p-4 shadow-xs space-y-2.5">
      {/* Title & Setores button */}
      <div className="flex items-center justify-between">
        <h2 className="font-mono text-[12px] font-bold uppercase tracking-[1.2px] text-[#627D98] m-0">
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

      {/* Linha 1: Setor (6 cols) + Leito (3 cols) + Paciente (3 cols) */}
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-6">
          <label className="block text-[11px] font-semibold text-slate-600 mb-0.5 truncate">
            Setor / Unidade
          </label>
          <select
            value={ctx.setorId}
            onChange={(e) => onChange({ setorId: e.target.value })}
            className="w-full h-9 px-2.5 bg-white border border-[#D9E2EC] rounded-lg text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#0A7EA4] transition truncate"
          >
            <option value="">Selecione...</option>
            {setores.map((s) => (
              <option key={s.id} value={s.id}>
                {s.nome} {s.souDono ? '' : '(compart.)'}
              </option>
            ))}
          </select>
        </div>

        <div className="col-span-3">
          <label className="block text-[11px] font-semibold text-slate-600 mb-0.5 truncate">
            Leito
          </label>
          <input
            type="text"
            value={ctx.leito}
            onChange={(e) => onChange({ leito: e.target.value })}
            placeholder="ex: 04"
            className="w-full h-9 px-2.5 bg-white border border-[#D9E2EC] rounded-lg text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#0A7EA4] transition placeholder:text-slate-400 font-medium"
          />
        </div>

        <div className="col-span-3">
          <label className="block text-[11px] font-semibold text-slate-600 mb-0.5 truncate">
            Paciente
          </label>
          <input
            type="text"
            value={ctx.pacienteIniciais}
            onChange={(e) => onChange({ pacienteIniciais: e.target.value })}
            placeholder="ex: J.S."
            className="w-full h-9 px-2.5 bg-white border border-[#D9E2EC] rounded-lg text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#0A7EA4] transition placeholder:text-slate-400 font-medium uppercase"
          />
        </div>
      </div>

      {/* Linha 2: Idade (4 cols) + Peso (4 cols) + Sexo (4 cols segmented) */}
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-4">
          <label className="block text-[11px] font-semibold text-slate-600 mb-0.5 truncate">
            Idade (anos)
          </label>
          <input
            type="number"
            min={0}
            max={125}
            value={ctx.idade ?? ''}
            onChange={(e) => handleNumericInput('idade', e.target.value)}
            placeholder="—"
            className="w-full h-9 px-2.5 bg-white border border-[#D9E2EC] rounded-lg text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#0A7EA4] transition font-medium"
          />
        </div>

        <div className="col-span-4">
          <label className="block text-[11px] font-semibold text-slate-600 mb-0.5 truncate">
            Peso (kg)
          </label>
          <input
            type="number"
            min={0}
            max={350}
            step="0.1"
            value={ctx.peso ?? ''}
            onChange={(e) => handleNumericInput('peso', e.target.value)}
            placeholder="—"
            className="w-full h-9 px-2.5 bg-white border border-[#D9E2EC] rounded-lg text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#0A7EA4] transition font-medium"
          />
        </div>

        <div className="col-span-4">
          <label className="block text-[11px] font-semibold text-slate-600 mb-0.5 truncate">
            Sexo
          </label>
          <div className="h-9 flex items-center bg-slate-100 p-0.5 rounded-lg border border-[#D9E2EC]">
            <button
              type="button"
              onClick={() => handleSexoChange('m')}
              className={`flex-1 h-full rounded-md text-xs font-bold transition flex items-center justify-center cursor-pointer ${
                ctx.sexo === 'm'
                  ? 'bg-[#0B1F3A] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              M
            </button>
            <button
              type="button"
              onClick={() => handleSexoChange('f')}
              className={`flex-1 h-full rounded-md text-xs font-bold transition flex items-center justify-center cursor-pointer ${
                ctx.sexo === 'f'
                  ? 'bg-[#0B1F3A] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              F
            </button>
          </div>
        </div>
      </div>

      {/* Linha 3: Creatinina (6 cols) + ClCr Cockcroft-Gault (6 cols) */}
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-6">
          <label className="block text-[11px] font-semibold text-slate-600 mb-0.5 truncate">
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
            className="w-full h-9 px-2.5 bg-white border border-[#D9E2EC] rounded-lg text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#0A7EA4] transition font-mono font-medium"
          />
        </div>

        <div className="col-span-6">
          <div className="flex items-center justify-between mb-0.5">
            <label className="block text-[11px] font-semibold text-slate-600 truncate">
              ClCr {isManualClcr ? '(manual)' : '(C-G)'}
            </label>
            <button
              type="button"
              onClick={() => {
                const nextState = !isManualClcr;
                setIsManualClcr(nextState);
                onChange({ clcrManual: nextState });
              }}
              className="text-[10px] font-semibold text-[#6D28D9] hover:text-[#5B21B6] hover:underline cursor-pointer"
              title={isManualClcr ? 'Mudar para cálculo automático' : 'Digitar valor manual de ClCr'}
            >
              {isManualClcr ? '↺ Auto' : '✎ Manual'}
            </button>
          </div>
          {isManualClcr ? (
            <input
              type="number"
              step="0.1"
              value={ctx.clcr ?? ''}
              onChange={(e) => handleManualClcrChange(e.target.value)}
              placeholder="ex: 45"
              className="w-full h-9 px-2.5 bg-amber-50/60 border border-amber-300 rounded-lg text-xs sm:text-sm text-amber-950 focus:outline-none focus:border-amber-500 font-mono font-bold"
            />
          ) : (
            <input
              type="text"
              readOnly
              value={ctx.clcr !== null ? `${ctx.clcr} mL/min` : ''}
              placeholder="automático"
              className="w-full h-9 px-2.5 bg-[#F1F5F9] border border-[#D9E2EC] rounded-lg text-xs sm:text-sm text-slate-800 font-mono font-semibold cursor-not-allowed placeholder:text-slate-400"
            />
          )}
        </div>
      </div>
    </section>
  );
};
