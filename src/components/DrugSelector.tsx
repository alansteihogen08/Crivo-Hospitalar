import React, { useState, useRef, useEffect } from 'react';
import { Search, X, AlertCircle, Info, Lock } from 'lucide-react';
import { DRUGS } from '../data/drugs';
import { AdminRoute, ClinicalFinding, PatientContext } from '../types';
import { previewBadgeForDrug } from '../services/clinicalEngine';
import { getAvailableRoutesForDrug, ROUTE_METADATA, getRouteNote } from '../data/drugRoutes';

interface DrugSelectorProps {
  selectedDrugIds: string[];
  drugRoutes?: Record<string, AdminRoute>;
  currentFindings: ClinicalFinding[];
  patientCtx: PatientContext;
  onAddDrug: (drugId: string) => void;
  onRemoveDrug: (drugId: string) => void;
  onClearAll: () => void;
  onRouteChange?: (drugId: string, newRoute: AdminRoute) => void;
}

export const DrugSelector: React.FC<DrugSelectorProps> = ({
  selectedDrugIds,
  drugRoutes = {},
  currentFindings,
  patientCtx,
  onAddDrug,
  onRemoveDrug,
  onClearAll,
  onRouteChange,
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
      (drug.brandName && drug.brandName.toLowerCase().includes(q)) ||
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
    <section className="bg-white rounded-xl border border-[#D9E2EC] p-5 shadow-xs space-y-4">
      {/* Title & Clear Action */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-mono text-[13px] font-bold uppercase tracking-[1.2px] text-[#627D98] m-0">
            Medicamentos da Prescrição
          </h2>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Selecione o fármaco e ajuste a via de administração para checagem de interações com dieta e NPT.
          </p>
        </div>
        {selectedDrugIds.length > 0 && (
          <button
            type="button"
            onClick={onClearAll}
            className="text-xs text-rose-600 hover:text-rose-800 font-mono cursor-pointer transition font-medium"
          >
            Limpar medicamentos ({selectedDrugIds.length})
          </button>
        )}
      </div>

      {/* Search Input */}
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
            placeholder="Digite o nome do medicamento (ex: Fenitoína, Meropenem, Prometazina)..."
            className="w-full px-3.5 py-2.5 bg-white border border-[#D9E2EC] rounded-lg text-sm text-slate-900 focus:outline-none focus:border-[#0A7EA4] focus:ring-1 focus:ring-[#0A7EA4] transition placeholder:text-slate-400 font-sans"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setIsOpen(false);
              }}
              className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Autocomplete Dropdown */}
        {isOpen && query.trim() && (
          <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-[#D9E2EC] rounded-xl shadow-xl max-h-72 overflow-y-auto z-40 divide-y divide-slate-100">
            {matches.length === 0 ? (
              <div className="p-4 text-xs text-slate-500 italic text-center">
                Nenhum medicamento encontrado para &quot;{query}&quot;.
              </div>
            ) : (
              matches.map(([id, drug]) => {
                const preview = previewBadgeForDrug(id, selectedDrugIds, patientCtx, currentFindings);
                const availableRoutes = getAvailableRoutesForDrug(id);

                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => handleSelect(id)}
                    className="w-full px-3.5 py-2.5 text-left hover:bg-slate-50 flex items-center justify-between gap-3 transition cursor-pointer text-xs group"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-900 group-hover:text-[#0A7EA4] transition">
                          {drug.name}
                        </span>
                        {drug.brandName && (
                          <span className="text-[11px] text-slate-400 font-medium">
                            ({drug.brandName})
                          </span>
                        )}
                      </div>

                      {/* Badges de Vias disponíveis */}
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-[10px] text-slate-400 font-mono">Vias:</span>
                        {availableRoutes.map((r) => {
                          const meta = ROUTE_METADATA[r];
                          return (
                            <span
                              key={r}
                              className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded border ${meta?.badgeColor || 'bg-slate-50 text-slate-600 border-slate-200'}`}
                            >
                              {r}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    {preview.hasNewAlert && (
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold shrink-0 ${
                          preview.severity === 'critico'
                            ? 'bg-rose-100 text-rose-800 border border-rose-300'
                            : 'bg-amber-100 text-amber-800 border border-amber-300'
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

      {/* Selected Medications List with Route Selector */}
      {selectedDrugIds.length === 0 ? (
        <div className="p-4 rounded-lg bg-slate-50 border border-dashed border-slate-200 text-center">
          <p className="text-xs text-slate-500 italic">
            Nenhuma medicação adicionada na prescrição. Use o campo acima para buscar ou selecione no catálogo completo.
          </p>
        </div>
      ) : (
        <div className="space-y-2 pt-1">
          {selectedDrugIds.map((id) => {
            const drug = DRUGS[id];
            if (!drug) return null;

            const availableRoutes = getAvailableRoutesForDrug(id);
            const currentRoute = drugRoutes[id] || drug.defaultRoute || availableRoutes[0] || 'VO';
            const routeNote = getRouteNote(id, currentRoute);
            const isSingleRoute = availableRoutes.length === 1;

            return (
              <div
                key={id}
                className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-50/80 hover:bg-slate-50 border border-[#D9E2EC] rounded-xl transition shadow-2xs"
              >
                {/* Nome do medicamento */}
                <div className="flex items-center gap-2 min-w-[160px]">
                  <span className="font-semibold text-sm text-slate-900">
                    {drug.name}
                  </span>
                  {drug.brandName && (
                    <span className="text-[11px] text-slate-400 hidden sm:inline">
                      ({drug.brandName})
                    </span>
                  )}
                </div>

                {/* Seletor Criterioso de Via de Administração */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[11px] font-mono text-slate-500 font-medium">
                    Via:
                  </span>

                  {isSingleRoute ? (
                    // Medicamento com apresentação exclusiva (ex: Meropenem só IV, Losartana só VO)
                    <div
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-slate-200/90 text-slate-800 border border-slate-300"
                      title={`Formulação exclusivamente ${ROUTE_METADATA[currentRoute]?.fullName || currentRoute} no mercado brasileiro (ANVISA).`}
                    >
                      <Lock className="w-3 h-3 text-slate-500" />
                      <span>{currentRoute}</span>
                      <span className="text-[10px] font-normal text-slate-600 pl-0.5">
                        (Exclusiva)
                      </span>
                    </div>
                  ) : (
                    // Medicamento com múltiplas apresentações reais
                    <div className="inline-flex items-center p-0.5 bg-slate-200/60 rounded-lg border border-slate-300/80 gap-1">
                      {availableRoutes.map((r) => {
                        const isSelected = currentRoute === r;
                        const meta = ROUTE_METADATA[r];
                        return (
                          <button
                            key={r}
                            type="button"
                            onClick={() => onRouteChange?.(id, r)}
                            className={`px-2.5 py-1 rounded-md text-xs font-mono font-bold transition cursor-pointer ${
                              isSelected
                                ? `${meta?.activeColor || 'bg-slate-800 text-white'} shadow-xs`
                                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                            }`}
                            title={`Mudar para via ${meta?.fullName || r}`}
                          >
                            {r}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Indicador de Nota Específica de Via */}
                  {routeNote && (
                    <span
                      className="inline-flex items-center text-amber-700 bg-amber-50 px-2 py-0.5 rounded text-[11px] border border-amber-200 gap-1"
                      title={routeNote}
                    >
                      <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span className="max-w-[200px] truncate hidden md:inline">
                        {routeNote}
                      </span>
                    </span>
                  )}
                </div>

                {/* Botão Remover */}
                <button
                  type="button"
                  onClick={() => onRemoveDrug(id)}
                  className="text-slate-400 hover:text-rose-600 p-1 rounded-md hover:bg-rose-50 transition cursor-pointer ml-auto"
                  title={`Remover ${drug.name}`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
