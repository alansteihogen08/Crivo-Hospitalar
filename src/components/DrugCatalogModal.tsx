import React, { useState } from 'react';
import { X, Search, BookOpen, Plus, Check, Pill, Gauge, ShieldAlert, Utensils } from 'lucide-react';
import { DRUGS } from '../data/drugs';

interface DrugCatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDrugIds: string[];
  onAddDrug: (id: string) => void;
}

export const DrugCatalogModal: React.FC<DrugCatalogModalProps> = ({
  isOpen,
  onClose,
  selectedDrugIds,
  onAddDrug,
}) => {
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState<string>('todos');

  if (!isOpen) return null;

  const allTags = [
    { id: 'todos', label: 'Todos' },
    { id: 'antibiotico', label: 'Antibióticos' },
    { id: 'antifungico', label: 'Antifúngicos' },
    { id: 'anticonvulsivante', label: 'Anticonvulsivantes' },
    { id: 'sedativo', label: 'Sedativos' },
    { id: 'opioide', label: 'Opioides' },
    { id: 'antidepressivo', label: 'Antidepressivos' },
    { id: 'antirretroviral', label: 'Antirretrovirais' },
    { id: 'nefrotoxico', label: 'Nefrotóxicos' },
    { id: 'qt', label: 'Prolonga QT' },
  ];

  const drugEntries = Object.entries(DRUGS).filter(([id, drug]) => {
    const q = search.trim().toLowerCase();
    const matchesSearch =
      !q ||
      drug.name.toLowerCase().includes(q) ||
      drug.tags.some((t) => t.toLowerCase().includes(q));

    const matchesTag =
      activeTag === 'todos' ||
      drug.tags.includes(activeTag) ||
      (activeTag === 'nefrotoxico' && drug.tags.includes('nefrotoxico_alto'));

    return matchesSearch && matchesTag;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-3xl w-full max-h-[88vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 px-6 py-4 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center border border-teal-500/30">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold font-mono">
                Catálogo Farmacológico do Crivo
              </h2>
              <p className="text-xs text-slate-400">
                Base com {Object.keys(DRUGS).length} medicamentos hospitalares e regras de ajuste
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Toolbar */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Pesquisar por nome do fármaco ou classe farmacológica..."
              className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-1.5">
            {allTags.map((tag) => (
              <button
                key={tag.id}
                type="button"
                onClick={() => setActiveTag(tag.id)}
                className={`px-2.5 py-1 rounded-full text-xs font-medium transition cursor-pointer ${
                  activeTag === tag.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>

        {/* Drug Cards Scrollable List */}
        <div className="p-4 overflow-y-auto space-y-3 flex-1 divide-y divide-slate-100">
          {drugEntries.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs">
              Nenhum medicamento encontrado para este filtro.
            </div>
          ) : (
            drugEntries.map(([id, drug]) => {
              const isAdded = selectedDrugIds.includes(id);

              return (
                <div key={id} className="pt-3 first:pt-0 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-sm text-slate-900">
                        {drug.name}
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {drug.tags.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 border border-slate-200"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => onAddDrug(id)}
                      disabled={isAdded}
                      className={`px-2.5 py-1 text-xs font-medium rounded-lg flex items-center gap-1 transition ${
                        isAdded
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default'
                          : 'bg-slate-900 hover:bg-slate-800 text-white cursor-pointer'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Adicionado</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5 text-teal-400" />
                          <span>Adicionar à Prescrição</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Renal snippet */}
                  {drug.renal && drug.renal.length > 0 && (
                    <div className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded border border-slate-200/80 flex items-start gap-1.5">
                      <Gauge className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-800">Ajuste Renal: </strong>
                        {(() => {
                          const isNonAdjustmentText = (txt: string) => {
                            const t = (txt || '').toLowerCase();
                            return (
                              t.includes('não é necessário') ||
                              t.includes('não necessita') ||
                              t.includes('não há necessidade') ||
                              t.includes('sem ajuste') ||
                              t.includes('metabolização hepática') ||
                              t.includes('eliminação predominantemente')
                            );
                          };

                          if (
                            drug.requiresRenalAdjustment === false ||
                            (drug.renal.length === 1 && isNonAdjustmentText(drug.renal[0].dose)) ||
                            drug.renal.every((r) => isNonAdjustmentText(r.dose))
                          ) {
                            return (
                              <span className="text-emerald-700 font-medium">
                                {drug.renal[0]?.dose ||
                                  'Não é necessário ajuste de dose pela função renal.'}
                              </span>
                            );
                          }

                          return drug.renal
                            .map((r) => {
                              let bracket = '';
                              if (r.max >= 500) {
                                bracket = `ClCr ≥ ${r.min} mL/min`;
                              } else if (r.min === 0) {
                                bracket = `ClCr < ${r.max + 1} mL/min`;
                              } else {
                                bracket = `ClCr ${r.min} a ${r.max} mL/min`;
                              }
                              return `${bracket}: ${r.dose}`;
                            })
                            .join(' | ');
                        })()}
                      </div>
                    </div>
                  )}

                  {/* Effects preview */}
                  {drug.effects && drug.effects.length > 0 && (
                    <p className="text-[11px] text-slate-500">
                      <strong className="text-slate-700">Efeitos relevantes: </strong>
                      {drug.effects.join(' • ')}
                    </p>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
