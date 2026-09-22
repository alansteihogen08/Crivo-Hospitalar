import React, { useState, useMemo } from 'react';
import {
  X,
  Search,
  FileCheck,
  ExternalLink,
  Copy,
  Check,
  BookOpen,
  Scale,
  ShieldAlert,
  Apple,
  Syringe,
  FileText
} from 'lucide-react';
import { DRUGS } from '../data/drugs';
import { Drug } from '../types';
import { EXTERNAL_GUIDELINES, ExternalReference } from '../data/externalGuidelines';

interface ReferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReferencesModal: React.FC<ReferencesModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'bula' | 'diretrizes'>('bula');
  const [search, setSearch] = useState('');
  const [selectedLetter, setSelectedLetter] = useState<string>('TODOS');
  const [copiedDrug, setCopiedDrug] = useState<string | null>(null);
  const [copiedGuideline, setCopiedGuideline] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('TODAS');

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

  // Filtered by Search & Letter (Tab Bulas)
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

  // Filtered External Guidelines (Tab Diretrizes Externas)
  const filteredGuidelines = useMemo(() => {
    return EXTERNAL_GUIDELINES.filter((g) => {
      const q = search.toLowerCase().trim();
      const matchesSearch =
        !q ||
        g.title.toLowerCase().includes(q) ||
        g.institution.toLowerCase().includes(q) ||
        g.description.toLowerCase().includes(q) ||
        (g.legalDocNumber && g.legalDocNumber.toLowerCase().includes(q)) ||
        g.appliedRules.some((r) => r.toLowerCase().includes(q));

      const matchesCat =
        selectedCategory === 'TODAS' || g.category === selectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [search, selectedCategory]);

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

  const handleCopyGuidelineCitation = (g: ExternalReference) => {
    navigator.clipboard?.writeText(g.fullCitation);
    setCopiedGuideline(g.id);
    setTimeout(() => {
      setCopiedGuideline((prev) => (prev === g.id ? null : prev));
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
                  Fontes Clínicas & Referências
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-950 text-teal-300 border border-teal-800 hidden sm:inline-block">
                  ANVISA & Consensos Oficiais
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-400 truncate">
                Rastreabilidade de bulas do fabricante, resoluções sanitárias e diretrizes de nutrição
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

        {/* Tab Switcher: Bulas vs. Diretrizes Externas (Terapia Nutricional / Sondas) */}
        <div className="bg-slate-100 border-b border-slate-200 px-3 sm:px-6 pt-2.5 flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => {
              setActiveTab('bula');
              setSearch('');
            }}
            className={`px-3.5 py-2 rounded-t-xl text-xs sm:text-sm font-mono font-bold flex items-center gap-2 transition cursor-pointer border-t border-x ${
              activeTab === 'bula'
                ? 'bg-white text-[#0B1F3A] border-slate-200 shadow-2xs'
                : 'bg-slate-100 text-slate-600 border-transparent hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4 text-teal-600" />
            <span>Bulas Oficiais dos Fabricantes ({sortedDrugs.length})</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('diretrizes');
              setSearch('');
            }}
            className={`px-3.5 py-2 rounded-t-xl text-xs sm:text-sm font-mono font-bold flex items-center gap-2 transition cursor-pointer border-t border-x ${
              activeTab === 'diretrizes'
                ? 'bg-white text-[#0B1F3A] border-slate-200 shadow-2xs'
                : 'bg-slate-100 text-slate-600 border-transparent hover:text-slate-900'
            }`}
          >
            <Scale className="w-4 h-4 text-indigo-600" />
            <span>Diretrizes de Terapia Nutricional & Vias ({EXTERNAL_GUIDELINES.length})</span>
            <span className="text-[10px] bg-indigo-100 text-indigo-800 px-1.5 py-0.2 rounded font-mono">
              Fontes Externas
            </span>
          </button>
        </div>

        {/* Search Toolbar */}
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
              placeholder={
                activeTab === 'bula'
                  ? 'Pesquisar por princípio ativo, marca comercial ou laboratório...'
                  : 'Pesquisar diretriz (ex: RDC 63, BRASPEN, NPT, SNE, Fenitoína, Quinolonas)...'
              }
              className="w-full pl-9 pr-3 py-2 sm:py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-teal-500 focus:outline-none placeholder:text-slate-400 shadow-2xs"
            />
          </div>

          {/* Tab 1 Quick Letters Navigation */}
          {activeTab === 'bula' ? (
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
          ) : (
            /* Tab 2 Category Filter Buttons */
            <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 scrollbar-none text-xs font-mono">
              <button
                type="button"
                onClick={() => setSelectedCategory('TODAS')}
                className={`px-2.5 py-1 rounded-lg transition shrink-0 cursor-pointer font-medium ${
                  selectedCategory === 'TODAS'
                    ? 'bg-indigo-900 text-white font-bold shadow-2xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                Todas ({EXTERNAL_GUIDELINES.length})
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory('nutricao_parenteral')}
                className={`px-2.5 py-1 rounded-lg transition shrink-0 cursor-pointer font-medium ${
                  selectedCategory === 'nutricao_parenteral'
                    ? 'bg-purple-700 text-white font-bold'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                Nutrição Parenteral (NPT)
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory('nutricao_enteral')}
                className={`px-2.5 py-1 rounded-lg transition shrink-0 cursor-pointer font-medium ${
                  selectedCategory === 'nutricao_enteral'
                    ? 'bg-amber-700 text-white font-bold'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                Nutrição Enteral (SNE)
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory('seguranca_medicamentos')}
                className={`px-2.5 py-1 rounded-lg transition shrink-0 cursor-pointer font-medium ${
                  selectedCategory === 'seguranca_medicamentos'
                    ? 'bg-rose-700 text-white font-bold'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                Segurança / Não Macerar
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory('diluicao_injetaveis')}
                className={`px-2.5 py-1 rounded-lg transition shrink-0 cursor-pointer font-medium ${
                  selectedCategory === 'diluicao_injetaveis'
                    ? 'bg-blue-700 text-white font-bold'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                Injetáveis / Estabilidade
              </button>
            </div>
          )}
        </div>

        {/* Content Area */}
        <div className="p-3 sm:p-5 overflow-y-auto space-y-3 flex-1 divide-y divide-slate-100 bg-slate-50/40">
          {activeTab === 'bula' ? (
            /* TAB 1: LISTA ALFABÉTICA DE BULAS */
            filteredDrugs.length === 0 ? (
              <div className="p-10 text-center text-slate-400 space-y-2">
                <BookOpen className="w-8 h-8 mx-auto text-slate-300" />
                <p className="text-xs sm:text-sm font-mono">
                  Nenhum medicamento encontrado para &quot;{search}&quot;.
                </p>
              </div>
            ) : (
              filteredDrugs.map((drug, index) => {
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

                    {/* Actions Bar */}
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
            )
          ) : (
            /* TAB 2: DIRETRIZES EXTERNAS (TERAPIA NUTRICIONAL / RDC / ISMP) */
            <div className="space-y-4">
              {/* Box Informativo de Transparência Regulatória */}
              <div className="bg-indigo-50/70 border border-indigo-200 rounded-xl p-3.5 text-xs text-indigo-950 space-y-1">
                <div className="flex items-center gap-1.5 font-bold font-mono text-indigo-900">
                  <Scale className="w-4 h-4 text-indigo-700" />
                  <span>TRANSPARÊNCIA REGULATÓRIA E FONTES NÃO CONSTANTES EM BULA</span>
                </div>
                <p className="leading-relaxed text-indigo-900/90">
                  Determinadas condutas de administração hospitalar (como a obrigatoriedade de lúmen exclusivo para Nutrição Parenteral, pausas de infusão enteral para evitar quelação e o manejo de sondas plásticas) decorrem de <strong>Resoluções Sanitárias da ANVISA</strong> e <strong>Diretrizes Clínicas Multiprofissionais</strong>. Abaixo estão todas as fontes formais que respaldam os alertas do sistema.
                </p>
              </div>

              {filteredGuidelines.length === 0 ? (
                <div className="p-10 text-center text-slate-400 space-y-2">
                  <Scale className="w-8 h-8 mx-auto text-slate-300" />
                  <p className="text-xs sm:text-sm font-mono">
                    Nenhuma diretriz encontrada para &quot;{search}&quot;.
                  </p>
                </div>
              ) : (
                filteredGuidelines.map((g) => {
                  const isCopied = copiedGuideline === g.id;
                  const catBadges: Record<string, { label: string; color: string }> = {
                    nutricao_parenteral: { label: 'Nutrição Parenteral (NPT)', color: 'bg-purple-100 text-purple-900 border-purple-300' },
                    nutricao_enteral: { label: 'Nutrição Enteral (SNE)', color: 'bg-amber-100 text-amber-900 border-amber-300' },
                    seguranca_medicamentos: { label: 'Segurança / Não Macerar', color: 'bg-rose-100 text-rose-900 border-rose-300' },
                    diluicao_injetaveis: { label: 'Injetáveis & Estabilidade', color: 'bg-blue-100 text-blue-900 border-blue-300' },
                  };

                  return (
                    <div
                      key={g.id}
                      className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-3 text-left"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                                catBadges[g.category]?.color || 'bg-slate-100 text-slate-800'
                              }`}
                            >
                              {catBadges[g.category]?.label || g.category}
                            </span>
                            {g.legalDocNumber && (
                              <span className="text-[10px] font-mono font-bold bg-slate-900 text-white px-2 py-0.5 rounded">
                                {g.legalDocNumber}
                              </span>
                            )}
                            <span className="text-[11px] font-mono text-slate-500">
                              Ano: {g.year}
                            </span>
                          </div>

                          <h3 className="text-sm sm:text-base font-bold text-slate-900 font-mono">
                            {g.title}
                          </h3>

                          <p className="text-xs font-semibold text-slate-600">
                            {g.institution} • <span className="text-slate-500 font-normal">{g.scope}</span>
                          </p>
                        </div>
                      </div>

                      <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                        {g.description}
                      </p>

                      {/* Regras e Alertas Vinculados */}
                      <div>
                        <span className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider block mb-1">
                          Regras & Alertas Vinculados no Crivo:
                        </span>
                        <ul className="text-xs text-slate-700 space-y-1">
                          {g.appliedRules.map((rule, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <span className="text-teal-600 font-bold shrink-0">•</span>
                              <span>{rule}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Ações: Copiar Citação ABNT e Acessar Documento Oficial */}
                      <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleCopyGuidelineCitation(g)}
                          className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-mono text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition cursor-pointer"
                          title="Copiar citação formatada ABNT"
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              <span className="text-emerald-700 font-semibold">Citação Copiada (ABNT)</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              <span>Copiar Citação ABNT</span>
                            </>
                          )}
                        </button>

                        {g.link && (
                          <a
                            href={g.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-mono font-medium text-indigo-700 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100/80 border border-indigo-200 rounded-lg transition cursor-pointer"
                            title="Acessar documento/portal oficial"
                          >
                            <span>Acessar Documento Oficial</span>
                            <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-white px-4 sm:px-6 py-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 font-mono shrink-0">
          <span>
            {activeTab === 'bula'
              ? `${filteredDrugs.length} de ${sortedDrugs.length} medicamentos catalogados`
              : `${filteredGuidelines.length} de ${EXTERNAL_GUIDELINES.length} diretrizes normativas`}
          </span>
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
