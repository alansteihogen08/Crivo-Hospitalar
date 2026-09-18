import React, { useState, useMemo } from 'react';
import {
  X,
  Search,
  BookOpen,
  ExternalLink,
  Copy,
  Check,
  Building2,
  FileCheck,
  ShieldAlert,
  HelpCircle,
  GraduationCap
} from 'lucide-react';
import { DRUGS } from '../data/drugs';
import { Drug } from '../types';

interface ReferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReferencesModal: React.FC<ReferencesModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [search, setSearch] = useState('');
  const [selectedLetter, setSelectedLetter] = useState<string>('TODOS');
  const [copiedDrug, setCopiedDrug] = useState<string | null>(null);

  // Sorted drugs in alphabetical order (A to Z)
  const sortedDrugs = useMemo(() => {
    return Object.entries(DRUGS)
      .map(([id, drug]) => ({ id, ...drug }))
      .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
  }, []);

  // Unique starting letters
  const availableLetters = useMemo(() => {
    const letters = new Set<string>();
    sortedDrugs.forEach((d) => {
      const firstChar = d.name.charAt(0).toUpperCase();
      if (/[A-Z]/.test(firstChar)) {
        letters.add(firstChar);
      }
    });
    return Array.from(letters).sort();
  }, [sortedDrugs]);

  // Filtered by search and letter
  const filteredDrugs = useMemo(() => {
    const q = search.trim().toLowerCase();
    return sortedDrugs.filter((drug) => {
      const matchesSearch =
        !q ||
        drug.name.toLowerCase().includes(q) ||
        (drug.brandName && drug.brandName.toLowerCase().includes(q)) ||
        (drug.manufacturer && drug.manufacturer.toLowerCase().includes(q)) ||
        drug.tags.some((t) => t.toLowerCase().includes(q));

      const firstChar = drug.name.charAt(0).toUpperCase();
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in font-sans">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="bg-[#0B1F3A] px-5 sm:px-6 py-4 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center border border-teal-500/30">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold font-mono tracking-tight">
                  Referências Oficiais, Marcas & Bulário ANVISA
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-950 text-teal-300 border border-teal-800 hidden sm:inline-block">
                  Ordem Alfabética (A–Z)
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Nomes comerciais de referência, laboratórios detentores do registro e bulas oficiais
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition cursor-pointer"
            title="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Institutional Methodology Banner */}
        <div className="bg-slate-50 border-b border-slate-200 p-4 space-y-3">
          <div className="flex items-start gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
            <Building2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-600 leading-relaxed">
              <p>
                <strong className="text-slate-900 font-semibold">Fonte Oficial & Detentores de Registro:</strong> As indicações terapêuticas, posologias hospitalares, contraindicações e ajustes posológicos são parametrizados a partir das <strong className="text-slate-900 font-semibold">Bulas Oficiais Aprovadas pela ANVISA</strong>. Para medicamentos inovadores, cita-se a marca comercial de referência e seu laboratório (ex: <em>Ziagenavir® — GlaxoSmithKline</em>; <em>Meronem® — Pfizer</em>; <em>Plasil® — Sanofi</em>). Para fármacos com ampla padronização como genérico (ex: <em>Fenitoína</em>, <em>Polimixina B</em>), a referência é ancorada no laboratório técnico oficial (ex: <em>Laboratório Teuto / ANVISA</em>).
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-slate-500 font-mono">
                <span className="bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                  Bulário ANVISA
                </span>
                <span className="bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                  Bula.com.br
                </span>
                <span className="bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                  Farmacopeia Brasileira
                </span>
                <a
                  href="https://consultas.anvisa.gov.br/#/bulario/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-700 hover:text-teal-800 font-semibold hover:underline inline-flex items-center gap-1 ml-auto"
                >
                  <span>Portal Anvisa Bulário</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Search Toolbar & Letter Index */}
          <div className="space-y-2">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  if (e.target.value) setSelectedLetter('TODOS');
                }}
                placeholder="Pesquisar por princípio ativo (ex: Abacavir), marca (ex: Ziagenavir, Plasil, Unasyn) ou laboratório (ex: Teuto, Pfizer, Sanofi)..."
                className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-lg text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </div>

            {/* Quick Letter Navigation */}
            <div className="flex items-center gap-1 overflow-x-auto py-1 scrollbar-none text-[11px] font-mono">
              <button
                type="button"
                onClick={() => setSelectedLetter('TODOS')}
                className={`px-2 py-0.5 rounded transition shrink-0 cursor-pointer ${
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
                  className={`w-6 h-6 rounded flex items-center justify-center transition shrink-0 cursor-pointer ${
                    selectedLetter === char
                      ? 'bg-teal-600 text-white font-bold shadow-2xs'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {char}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Alphabetical List */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-3 flex-1 divide-y divide-slate-100">
          {filteredDrugs.length === 0 ? (
            <div className="p-10 text-center text-slate-400 space-y-2">
              <BookOpen className="w-8 h-8 mx-auto text-slate-300" />
              <p className="text-xs font-mono">
                Nenhum medicamento encontrado para o termo pesquisado.
              </p>
            </div>
          ) : (
            filteredDrugs.map((drug, index) => {
              const anvisaSearchUrl = `https://consultas.anvisa.gov.br/#/bulario/q/?nomeProduto=${encodeURIComponent(
                drug.anvisaRecord || drug.name
              )}`;
              const bulaComBrUrl = drug.bulaSlug
                ? `https://bula.com.br/${drug.bulaSlug}`
                : `https://bula.com.br/${encodeURIComponent(drug.name.toLowerCase().replace(/[^a-z0-9]/g, ''))}`;
              const isCopied = copiedDrug === drug.name;

              return (
                <div
                  key={drug.id}
                  className="pt-3.5 first:pt-0 space-y-2 text-left"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-500 font-mono text-[10px] flex items-center justify-center font-bold">
                          {index + 1}
                        </span>
                        <h3 className="text-sm font-bold text-slate-900 font-mono">
                          {drug.name}
                        </h3>
                        {drug.brandName && (
                          <span className="text-xs font-mono font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                            {drug.brandName}
                          </span>
                        )}
                        {drug.manufacturer && (
                          <span className="text-[11px] font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                            {drug.manufacturer}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-1.5 pl-7">
                        <span
                          className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${
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
                          <span className="text-[10px] font-mono text-slate-500">
                            Reg. MS: {drug.anvisaRecord}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center gap-1.5 self-start sm:self-auto sm:shrink-0 pl-7 sm:pl-0">
                      <button
                        type="button"
                        onClick={() => handleCopyCitation(drug)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-mono text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 rounded-md transition cursor-pointer"
                        title="Copiar citação institucional para relatórios e prontuários"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span className="text-emerald-700 font-semibold">Copiado</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 text-slate-400" />
                            <span>Copiar Citação</span>
                          </>
                        )}
                      </button>

                      <a
                        href={bulaComBrUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-mono font-medium text-indigo-700 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100/80 border border-indigo-200 rounded-md transition cursor-pointer"
                        title={`Acessar bula online no portal Bula.com.br (${drug.brandName || drug.name})`}
                      >
                        <span>Bula.com.br</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>

                      <a
                        href={anvisaSearchUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-mono font-semibold text-teal-700 hover:text-teal-800 bg-teal-50 hover:bg-teal-100/80 border border-teal-200 rounded-md transition cursor-pointer"
                        title="Consultar no Bulário Eletrônico da ANVISA"
                      >
                        <span>Bula ANVISA</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  <div className="text-xs text-slate-600 bg-slate-50/80 p-2.5 rounded-lg border border-slate-200 ml-7">
                    <p className="font-mono text-[11px] text-slate-700">
                      <strong>Referência Oficial:</strong>{' '}
                      {drug.brandName
                        ? `Bula Oficial de ${drug.brandName} (${drug.name}) — Empresa detentora do registro: ${drug.manufacturer}.`
                        : `Bula Oficial de ${drug.name} (Genérico) — Empresa detentora do registro técnico: ${drug.manufacturer}.`}
                      {drug.anvisaRecord ? ` Reg. MS nº ${drug.anvisaRecord}.` : ''}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-5 py-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 font-mono">
          <span>{filteredDrugs.length} de {sortedDrugs.length} medicamentos listados</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold cursor-pointer transition"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
