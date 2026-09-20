import React, { useState, useMemo } from 'react';
import { X, Search, FileCheck, ExternalLink, Copy, Check, BookOpen } from 'lucide-react';
import { DRUGS } from '../data/drugs';
import { Drug } from '../types';

interface ReferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReferencesModal: React.FC<ReferencesModalProps> = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState('');
  const [selectedLetter, setSelectedLetter] = useState<string>('TODOS');
  const [copiedDrug, setCopiedDrug] = useState<string | null>(null);

  // Sort drugs alphabetically (A-Z)
  const sortedDrugs = useMemo(() => {
    return Object.entries(DRUGS)
      .map(([id, drug]) => ({
        id,
        ...drug,
      }))
      .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
  }, []);

  // Available initial letters from current drug dataset
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

  // Filtered by Search & Letter
  const filteredDrugs = useMemo(() => {
    return sortedDrugs.filter((drug) => {
      const q = search.toLowerCase().trim();
      const matchesSearch =
        !q ||
        drug.name.toLowerCase().includes(q) ||
        (drug.brandName && drug.brandName.toLowerCase().includes(q)) ||
        (drug.manufacturer && drug.manufacturer.toLowerCase().includes(q)) ||
        (drug.anvisaRecord && drug.anvisaRecord.includes(q));

      const firstChar = drug.name.trim().charAt(0).toUpperCase();
      const matchesLetter =
        selectedLetter === 'TODOS' || firstChar === selectedLetter;

      return matchesSearch && matchesLetter;
    });
  }, [sortedDrugs, search, selectedLetter]);

  if (!isOpen) return null;

  const handleCopyCitation = (drug: Drug) => {
    const brand = drug.brandName ? `${drug.brandName} (${drug.name})` : drug.name;
    const lab = drug.manufacturer || 'Laboratório Farmacêutico Credenciado';
    const reg = drug.anvisaRecord ? ` Reg. MS nº ${drug.anvisaRecord}.` : '';
    const citation = `BRASIL. Agência Nacional de Vigilância Sanitária (ANVISA). Bula do Medicamento: ${brand} — ${lab}.${reg} Brasília, DF. Disponível no Bulário Eletrônico da ANVISA.`;
    navigator.clipboard?.writeText(citation);
    setCopiedDrug(drug.name);
    setTimeout(() => {
      setCopiedDrug((prev) => (prev === drug.name ? null : prev));
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in font-sans">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-3xl w-full h-[94vh] sm:max-h-[90vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="bg-[#0B1F3A] px-4 sm:px-6 py-3.5 sm:py-4 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-8 h-8 sm:w-9 h-9 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center border border-teal-500/30 shrink-0">
              <FileCheck className="w-4 h-4 sm:w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-bold font-mono tracking-tight truncate">
                  Referências Oficiais & Bulas
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-950 text-teal-300 border border-teal-800 hidden sm:inline-block">
                  Bula.com.br / ANVISA
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-400 truncate">
                Marcas comerciais, laboratórios detentores e registro MS
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

        {/* Search Toolbar & Letter Index (Direto ao ponto, sem caixa de texto informativo que rouba espaço) */}
        <div className="bg-slate-50 border-b border-slate-200 px-3 sm:px-5 py-3 space-y-2.5 shrink-0">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                if (e.target.value) setSelectedLetter('TODOS');
              }}
              placeholder="Pesquisar por princípio ativo, marca comercial ou laboratório..."
              className="w-full pl-9 pr-3 py-2 sm:py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-teal-500 focus:outline-none placeholder:text-slate-400 shadow-2xs"
            />
          </div>

          {/* Quick Letter Navigation */}
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
        </div>

        {/* Alphabetical List of Drugs */}
        <div className="p-3 sm:p-5 overflow-y-auto space-y-3 flex-1 divide-y divide-slate-100 bg-slate-50/40">
          {filteredDrugs.length === 0 ? (
            <div className="p-10 text-center text-slate-400 space-y-2">
              <BookOpen className="w-8 h-8 mx-auto text-slate-300" />
              <p className="text-xs sm:text-sm font-mono">
                Nenhum medicamento encontrado para "{search}".
              </p>
            </div>
          ) : (
            filteredDrugs.map((drug, index) => {
              const anvisaSearchUrl = `https://consultas.anvisa.gov.br/#/bulario/q/?nomeProduto=${encodeURIComponent(
                drug.anvisaRecord || drug.name
              )}`;
              const finalBulaUrl = drug.bulaUrl
                ? drug.bulaUrl
                : drug.bulaSlug
                ? `https://bula.com.br/${drug.bulaSlug}`
                : `https://bula.com.br/${encodeURIComponent(drug.name.toLowerCase().replace(/[^a-z0-9]/g, ''))}`;
              const bulaButtonText = drug.bulaLabel || 'Bula.com.br';
              const isCopied = copiedDrug === drug.name;

              return (
                <div
                  key={drug.id}
                  className="bg-white p-3 sm:p-4 rounded-xl border border-slate-200 shadow-2xs space-y-3 text-left"
                >
                  {/* Title & Identifiers */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-500 font-mono text-[11px] flex items-center justify-center font-bold">
                          {index + 1}
                        </span>
                        <h3 className="text-sm sm:text-base font-bold text-slate-900 font-mono">
                          {drug.name}
                        </h3>
                        {drug.brandName && (
                          <span className="text-xs font-mono font-bold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-200">
                            {drug.brandName}
                          </span>
                        )}
                      </div>

                      {/* Technical specifications */}
                      <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                        <span className="text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 font-medium">
                          {drug.manufacturer || 'Laboratório Farmacêutico'}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded border ${
                            drug.referenceType === 'generico_padrao'
                              ? 'bg-amber-50 text-amber-800 border-amber-200'
                              : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          }`}
                        >
                          {drug.referenceType === 'generico_padrao'
                            ? 'Genérico Padrão ANVISA'
                            : 'Medicamento de Referência'}
                        </span>
                        {drug.anvisaRecord && (
                          <span className="text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                            Reg. MS: <strong className="text-slate-700">{drug.anvisaRecord}</strong>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar (Fácil de clicar no celular) */}
                  <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleCopyCitation(drug)}
                      className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-mono text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition cursor-pointer"
                      title="Copiar citação institucional para prontuário"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span className="text-emerald-700 font-semibold">Copiado</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>Copiar Citação</span>
                        </>
                      )}
                    </button>

                    <a
                      href={finalBulaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-mono font-medium text-indigo-700 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100/80 border border-indigo-200 rounded-lg transition cursor-pointer"
                      title={`Acessar bula online: ${bulaButtonText} (${drug.brandName || drug.name})`}
                    >
                      <span>{bulaButtonText}</span>
                      <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                    </a>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-white px-4 sm:px-6 py-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 font-mono shrink-0">
          <span>{filteredDrugs.length} de {sortedDrugs.length} medicamentos</span>
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
