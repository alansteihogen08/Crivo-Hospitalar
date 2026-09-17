import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { DRUGS } from '../data/drugs';
import { ClinicalFinding, PatientContext } from '../types';
import { previewBadgeForDrug } from '../services/clinicalEngine';

interface DrugSelectorProps {
  selectedDrugIds: string[];
  currentFindings: ClinicalFinding[];
  patientCtx: PatientContext;
  onAddDrug: (drugId: string) => void;
  onRemoveDrug: (drugId: string) => void;
  onClearAll: () => void;
}

export const DrugSelector: React.FC<DrugSelectorProps> = ({
  selectedDrugIds,
  currentFindings,
  patientCtx,
  onAddDrug,
  onRemoveDrug,
  onClearAll,
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter matching drugs that are not already added
  const matches = Object.entries(DRUGS).filter(([id, drug]) => {
    if (selectedDrugIds.includes(id)) return false;
    if (!query.trim()) return false;
    const q = query.toLowerCase();
    return (
      drug.name.toLowerCase().includes(q) ||
      drug.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (id: string) => {
    onAddDrug(id);
    setQuery('');
    setIsOpen(false);
    inputRef.current?.focus();
  };

  return (
    <section className="bg-white rounded-xl border border-[#D9E2EC] p-5 shadow-xs space-y-3">
      {/* Title from Screenshot 1: MEDICAMENTOS DA PRESCRIÇÃO */}
      <div className="flex items-center justify-between">
        <h2 className="font-mono text-[13px] font-bold uppercase tracking-[1.2px] text-[#627D98] m-0">
          Medicamentos da Prescrição
        </h2>
        {selectedDrugIds.length > 0 && (
          <button
            type="button"
            onClick={onClearAll}
            className="text-xs text-rose-600 hover:text-rose-800 font-mono cursor-pointer"
          >
            Limpar medicamentos ({selectedDrugIds.length})
          </button>
        )}
      </div>

      {/* Search Input from Screenshot 1 */}
      <div className="relative" ref={containerRef}>
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => {
              if (query.trim()) setIsOpen(true);
            }}
            placeholder="Digite o nome do medicamento..."
            className="w-full px-3 py-2 bg-white border border-[#D9E2EC] rounded-lg text-sm text-slate-900 focus:outline-none focus:border-[#0A7EA4] transition placeholder:text-slate-400 font-sans"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setIsOpen(false);
              }}
              className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Autocomplete Dropdown */}
        {isOpen && query.trim() && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#D9E2EC] rounded-lg shadow-lg max-h-64 overflow-y-auto z-40 divide-y divide-slate-100">
            {matches.length === 0 ? (
              <div className="p-3 text-xs text-slate-500 italic">
                Nenhum medicamento encontrado para &quot;{query}&quot;.
              </div>
            ) : (
              matches.map(([id, drug]) => {
                const preview = previewBadgeForDrug(id, selectedDrugIds, patientCtx, currentFindings);
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => handleSelect(id)}
                    className="w-full px-3 py-2.5 text-left hover:bg-slate-50 flex items-center justify-between transition cursor-pointer text-xs"
                  >
                    <div>
                      <span className="font-semibold text-slate-900">{drug.name}</span>
                      <span className="text-[11px] text-slate-400 font-mono ml-2">
                        {drug.tags.slice(0, 2).join(', ')}
                      </span>
                    </div>
                    {preview.hasNewAlert && (
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                          preview.severity === 'critico'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {preview.severity === 'critico' ? 'Risco Crítico' : 'Alerta'}
                      </span>
                    )}
                  </button>
                );
              })
            )}
          </div>
        )}
      </div>

      {/* Selected Medications Pills or Empty Message */}
      {selectedDrugIds.length === 0 ? (
        <p className="text-xs italic text-[#627D98] pt-0.5">
          Nenhuma medicação adicionada ainda.
        </p>
      ) : (
        <div className="flex flex-wrap gap-2 pt-1">
          {selectedDrugIds.map((id) => {
            const drug = DRUGS[id];
            if (!drug) return null;
            return (
              <span
                key={id}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 border border-[#D9E2EC] text-slate-800 text-xs rounded-full font-medium"
              >
                <span>{drug.name}</span>
                <button
                  type="button"
                  onClick={() => onRemoveDrug(id)}
                  className="text-slate-400 hover:text-slate-600 cursor-pointer"
                  title={`Remover ${drug.name}`}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            );
          })}
        </div>
      )}
    </section>
  );
};
