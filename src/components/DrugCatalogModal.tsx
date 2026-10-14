import React, { useState, useMemo } from 'react';
import { X, Search, BookOpen, Plus, Check, Zap, ShieldCheck, ExternalLink } from 'lucide-react';
import { DRUGS } from '../data/drugs';
import { getAvailableRoutesForDrug, ROUTE_METADATA } from '../data/drugRoutes';

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
  const [selectedLetter, setSelectedLetter] = useState<string>('TODOS');
  const [activeTag, setActiveTag] = useState<string>('todos');

  const allTags = [
    { id: 'todos', label: 'Todas Classes' },
    { id: 'cardiovascular', label: 'Cardiovascular' },
    { id: 'anti-hipertensivo', label: 'Anti-hipertensivos' },
    { id: 'antibiotico', label: 'Antibióticos' },
    { id: 'antiviral', label: 'Antivirais' },
    { id: 'antifungico', label: 'Antifúngicos' },
    { id: 'anticonvulsivante', label: 'Anticonvulsivantes' },
    { id: 'sedativo', label: 'Sedativos & Hipnóticos' },
    { id: 'opioide', label: 'Opioides' },
    { id: 'bloqueador_neuromuscular', label: 'Bloqueadores Neuromusculares' },
    { id: 'diuretico', label: 'Diuréticos' },
    { id: 'antidiabetico', label: 'Antidiabéticos' },
    { id: 'hipolipemiante', label: 'Hipolipemiantes' },
    { id: 'corticosteroide', label: 'Corticosteroides' },
    { id: 'antiemético', label: 'Gastrointestinais' },
    { id: 'nefrotoxico', label: 'Nefrotóxicos' },
  ];

  // Sort drugs alphabetically (A-Z) by name
  const sortedDrugs = useMemo(() => {
    return Object.entries(DRUGS)
      .map(([id, drug]) => ({
        id,
        ...drug,
      }))
      .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
  }, []);

  // Available letters in alphabetical order
  const availableLetters = useMemo(() => {
    const letters = new Set<string>();
    sortedDrugs.forEach((d) => {
      const first = d.name.trim().charAt(0).toUpperCase();
      if (/[A-Z]/.test(first)) {
        letters.add(first);
      }
    });
    return Array.from(letters).sort();
  }, [sortedDrugs]);

  // Filtered by Search, Tag and Letter
  const filteredDrugs = useMemo(() => {
    return sortedDrugs.filter((drug) => {
      const q = search.trim().toLowerCase();
      const matchesSearch =
        !q ||
        drug.name.toLowerCase().includes(q) ||
        (drug.brandName && drug.brandName.toLowerCase().includes(q)) ||
        (drug.pharmacologicalClass && drug.pharmacologicalClass.toLowerCase().includes(q)) ||
        drug.tags.some((t) => t.toLowerCase().includes(q)) ||
        (drug.mechanism && drug.mechanism.toLowerCase().includes(q));

      const matchesTag =
        activeTag === 'todos' ||
        drug.tags.includes(activeTag) ||
        (activeTag === 'corticosteroide' && drug.tags.some((t) => t.includes('corticoide') || t.includes('corticosteroide'))) ||
        (activeTag === 'antiemético' && drug.tags.some((t) => t.includes('antiemetico') || t.includes('gastrointestinal') || t.includes('antiflatulento'))) ||
        (activeTag === 'nefrotoxico' && drug.tags.some((t) => t.includes('nefrotoxico')));

      const firstChar = drug.name.trim().charAt(0).toUpperCase();
      const matchesLetter =
        selectedLetter === 'TODOS' || firstChar === selectedLetter;

      return matchesSearch && matchesTag && matchesLetter;
    });
  }, [sortedDrugs, search, activeTag, selectedLetter]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in font-sans">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-3xl w-full h-[94vh] sm:max-h-[90vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="bg-[#0B1F3A] px-4 sm:px-6 py-3.5 sm:py-4 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-8 h-8 sm:w-9 h-9 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center border border-teal-500/30 shrink-0">
              <BookOpen className="w-4 h-4 sm:w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-bold font-mono tracking-tight truncate">
                  Guia Farmacológico & Mecanismo de Ação
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-950 text-teal-300 border border-teal-800 hidden sm:inline-block">
                  {sortedDrugs.length} Fármacos
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-400 truncate">
                Mecanismos de ação farmacodinâmicos baseados estritamente nas bulas oficiais aprovadas pela ANVISA
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition cursor-pointer shrink-0 ml-2"
            title="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Fixed Top Toolbar (Busca + Filtro A-Z + Filtro por Classe Farmacológica) */}
        <div className="bg-slate-50 border-b border-slate-200 px-3 sm:px-5 py-3 space-y-2.5 shrink-0">
          {/* Search input */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                if (e.target.value) setSelectedLetter('TODOS');
              }}
              placeholder="Pesquisar por fármaco, marca comercial, classe farmacológica ou mecanismo..."
              className="w-full pl-9 pr-3 py-2 sm:py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-teal-500 focus:outline-none placeholder:text-slate-400 shadow-2xs"
            />
          </div>

          {/* Alphabetical A-Z Quick Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 scrollbar-none text-xs font-mono">
            <button
              type="button"
              onClick={() => setSelectedLetter('TODOS')}
              className={`px-2.5 py-1 rounded-lg transition shrink-0 cursor-pointer font-medium ${
                selectedLetter === 'TODOS'
                  ? 'bg-slate-900 text-white font-bold shadow-2xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              Todos ({sortedDrugs.length})
            </button>
            {availableLetters.map((char) => (
              <button
                key={char}
                type="button"
                onClick={() => setSelectedLetter(char)}
                className={`w-7 h-7 rounded-lg flex items-center justify-center transition shrink-0 cursor-pointer text-xs font-bold ${
                  selectedLetter === char
                    ? 'bg-teal-600 text-white shadow-2xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {char}
              </button>
            ))}
          </div>

          {/* Quick Tag Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 scrollbar-none text-xs font-mono">
            {allTags.map((tag) => (
              <button
                key={tag.id}
                type="button"
                onClick={() => setActiveTag(tag.id)}
                className={`px-2.5 py-1 rounded-lg transition shrink-0 cursor-pointer text-[11px] ${
                  activeTag === tag.id
                    ? 'bg-teal-700 text-white font-bold shadow-2xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Drug List (A-Z) */}
        <div className="p-3 sm:p-5 overflow-y-auto space-y-3 flex-1 bg-slate-50/50">
          {filteredDrugs.length === 0 ? (
            <div className="p-10 text-center text-slate-400 space-y-2">
              <BookOpen className="w-8 h-8 mx-auto text-slate-300" />
              <p className="text-xs sm:text-sm font-mono">
                Nenhum medicamento encontrado para os filtros selecionados.
              </p>
            </div>
          ) : (
            filteredDrugs.map((drug, index) => {
              const isAdded = selectedDrugIds.includes(drug.id);
              const isReadyToUse =
                drug.id === 'ganciclovir' ||
                drug.tags.includes('bolsa_pronta_rtu') ||
                (drug.brandName && drug.brandName.toLowerCase().includes('bolsa pronta'));

              const finalBulaUrl = drug.bulaUrl
                ? drug.bulaUrl
                : `https://consultas.anvisa.gov.br/#/bulario/q/?nomeProduto=${encodeURIComponent(drug.anvisaSearchQuery || drug.name)}`;

              return (
                <div
                  key={drug.id}
                  className="bg-white p-4 sm:p-4.5 rounded-xl border border-slate-200 shadow-2xs space-y-3 text-left transition hover:border-slate-300 hover:shadow-xs"
                >
                  {/* Title Bar & Add Button */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1.5 min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                        <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-500 font-mono text-[11px] flex items-center justify-center font-bold shrink-0">
                          {index + 1}
                        </span>
                        <h3 className="text-sm sm:text-base font-bold text-slate-900 font-mono">
                          {drug.name}
                        </h3>

                        {/* Marca de Referência */}
                        {drug.brandName && (
                          <span className="text-[11px] font-mono font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200/80">
                            {drug.brandName}
                          </span>
                        )}

                        {/* Destaque especial Bolsa Pronta (RTU) */}
                        {isReadyToUse && (
                          <span className="text-[10px] font-mono font-bold text-amber-900 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-300 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                            Bolsa Pronta (RTU)
                          </span>
                        )}

                        {/* Classe Farmacológica */}
                        {drug.pharmacologicalClass && (
                          <span className="text-[10px] font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                            {drug.pharmacologicalClass}
                          </span>
                        )}
                      </div>

                      {/* Vias de Administração Permitidas */}
                      <div className="flex items-center gap-1.5 pt-0.5">
                        <span className="text-[10px] font-mono text-slate-400">Vias permitidas:</span>
                        {getAvailableRoutesForDrug(drug.id).map((r) => (
                          <span
                            key={r}
                            className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border ${
                              ROUTE_METADATA[r]?.badgeColor || 'bg-slate-100 text-slate-700 border-slate-200'
                            }`}
                          >
                            {r}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Botão Adicionar */}
                    <button
                      type="button"
                      onClick={() => onAddDrug(drug.id)}
                      disabled={isAdded}
                      className={`px-3 py-2 text-xs font-mono font-medium rounded-lg flex items-center gap-1.5 transition shrink-0 cursor-pointer ${
                        isAdded
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default'
                          : 'bg-slate-900 hover:bg-slate-800 text-white shadow-xs'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span className="font-semibold">Adicionado</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                          <span>Adicionar</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* MECANISMO DE AÇÃO - Elemento central do card no Guia */}
                  <div className="bg-gradient-to-r from-teal-50/70 via-slate-50 to-slate-50/90 border border-teal-100/90 rounded-xl p-3 text-xs space-y-1.5 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 font-bold font-mono text-[11px] text-teal-900 uppercase tracking-wide">
                        <Zap className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                        <span>Mecanismo de Ação Farmacodinâmico</span>
                      </div>
                      <span className="text-[10px] font-mono text-teal-700 font-semibold bg-teal-100/60 px-2 py-0.5 rounded border border-teal-200/50">
                        Bula Oficial
                      </span>
                    </div>
                    <p className="text-slate-800 text-xs sm:text-[13px] leading-relaxed font-sans">
                      {drug.mechanism ||
                        'Mecanismo de ação farmacológico descrito na monografia e bula registrada na ANVISA.'}
                    </p>
                  </div>

                  {/* Rodapé de Referência da Bula ANVISA */}
                  <div className="pt-1 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 text-[11px] font-mono text-slate-500">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">
                        Fonte Oficial: Bula ANVISA • {drug.brandName || drug.name}
                        {drug.manufacturer ? ` (${drug.manufacturer})` : ''}
                        {drug.anvisaRecord ? ` • MS: ${drug.anvisaRecord}` : ''}
                      </span>
                    </div>

                    <a
                      href={finalBulaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-teal-700 hover:text-teal-900 hover:underline shrink-0"
                    >
                      <span>{drug.bulaLabel || 'Acessar Bula ANVISA'}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-white px-4 sm:px-6 py-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 font-mono shrink-0">
          <span>{filteredDrugs.length} de {sortedDrugs.length} medicamentos catalogados</span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold cursor-pointer transition shadow-xs"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
