import React, { useState, useEffect } from 'react';
import {
  Layers,
  Search,
  Bed,
  AlertTriangle,
  FileText,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  LogOut,
  ArrowRight,
  ShieldAlert,
  Clock
} from 'lucide-react';
import { LeitoDocData, SetorHospital } from '../types';
import { crivoFirestore } from '../services/firebase';

interface SectorAuditViewProps {
  setores: SetorHospital[];
  selectedSetorId: string;
  onSelectSetorId: (id: string) => void;
  onOpenBedInTriage: (setorId: string, leito: string, initials?: string) => void;
  onShowToast: (msg: string) => void;
}

export const SectorAuditView: React.FC<SectorAuditViewProps> = ({
  setores,
  selectedSetorId,
  onSelectSetorId,
  onOpenBedInTriage,
  onShowToast,
}) => {
  const [leitos, setLeitos] = useState<LeitoDocData[]>([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [collapsedBeds, setCollapsedBeds] = useState<Record<string, boolean>>({});

  const loadLeitos = async (setorId: string) => {
    if (!setorId) {
      setLeitos([]);
      return;
    }
    setIsLoading(true);
    const data = await crivoFirestore.getAllLeitosDoSetor(setorId);
    setLeitos(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (selectedSetorId) {
      loadLeitos(selectedSetorId);
    }
  }, [selectedSetorId]);

  const toggleBedCollapse = (key: string) => {
    setCollapsedBeds((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleEncerrarLeito = async (leito: string) => {
    if (!selectedSetorId) return;
    if (!confirm(`Encerrar o histórico do leito "${leito}"? O próximo paciente nesse leito começará com a evolução zerada.`)) {
      return;
    }
    const ok = await crivoFirestore.encerrarLeito(selectedSetorId, leito);
    if (ok) {
      onShowToast(`Leito "${leito}" encerrado com sucesso.`);
      loadLeitos(selectedSetorId);
    } else {
      onShowToast(`Erro ao encerrar: ${crivoFirestore.lastError}`);
    }
  };

  // Filter leitos
  const filteredLeitos = leitos.filter((item) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    const matchLeito = String(item.leito || '').toLowerCase().includes(q);
    const matchInitials = (item.entries || []).some((e) =>
      String(e.iniciais || '').toLowerCase().includes(q)
    );
    return matchLeito || matchInitials;
  });

  return (
    <div className="space-y-4">
      {/* Filter and Sector Bar */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-700 flex items-center justify-center font-bold">
              <Layers className="w-4 h-4 text-teal-600" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono">
                Auditoria Centralizada de Leitos por Setor
              </h2>
              <p className="text-xs text-slate-500">
                Acompanhamento farmacoterapêutico de todos os leitos ativos da unidade
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => loadLeitos(selectedSetorId)}
            disabled={isLoading || !selectedSetorId}
            className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg border border-slate-200 transition cursor-pointer"
            title="Atualizar leitos"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-6">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Selecione o Setor / Unidade
            </label>
            <select
              value={selectedSetorId}
              onChange={(e) => onSelectSetorId(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-teal-500 focus:bg-white"
            >
              <option value="">Escolha uma unidade...</option>
              {setores.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.nome} {s.souDono ? '' : '(compartilhado)'}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-6">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Buscar por Leito ou Iniciais do Paciente
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="ex: Leito 04, J.S., Box 2..."
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-teal-500 focus:bg-white"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div>
        {!selectedSetorId ? (
          <div className="p-8 bg-white rounded-xl border border-slate-200 text-center text-slate-500">
            <Layers className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-medium text-slate-700">Selecione um setor acima</p>
            <p className="text-xs text-slate-400 mt-0.5">
              Escolha uma unidade hospitalar para auditar as evoluções e leitos ativos.
            </p>
          </div>
        ) : isLoading ? (
          <div className="p-8 bg-white rounded-xl border border-slate-200 text-center text-slate-500">
            <RefreshCw className="w-6 h-6 animate-spin text-teal-600 mx-auto mb-2" />
            <p className="text-xs">Carregando leitos ativos do setor...</p>
          </div>
        ) : filteredLeitos.length === 0 ? (
          <div className="p-8 bg-white rounded-xl border border-slate-200 text-center text-slate-500">
            <Bed className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-medium text-slate-700">Nenhum leito ativo encontrado</p>
            <p className="text-xs text-slate-400 mt-0.5">
              {search
                ? 'Nenhum leito corresponde ao filtro digitado.'
                : 'Ainda não há evoluções registradas neste setor. Vá para a aba "Triagem e Evolução" para registrar o primeiro paciente.'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-500 px-1">
              <span>Mostrando {filteredLeitos.length} leitos ativos</span>
            </div>

            {filteredLeitos.map((item, idx) => {
              const bedKey = `${item.setorId}_${item.leito}`;
              const isCollapsed = collapsedBeds[bedKey] ?? false; // open by default in audit
              const entries = [...(item.entries || [])].sort((a, b) => b.ts - a.ts);
              const latest = entries[0];
              const recentEntries = entries.slice(0, 3);
              const hasCritico = entries.some((e) => e.severidade === 'critico');

              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden transition"
                >
                  {/* Bed Header */}
                  <div
                    onClick={() => toggleBedCollapse(bedKey)}
                    className="p-4 bg-slate-50/70 hover:bg-slate-100/70 flex items-center justify-between cursor-pointer border-b border-slate-200 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-slate-900 text-white flex items-center justify-center font-mono font-bold text-sm">
                        <Bed className="w-4 h-4 text-teal-400" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-mono font-bold text-base text-slate-900">
                            {item.leito}
                          </h3>
                          {latest?.iniciais && (
                            <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-slate-200 text-slate-800">
                              Pac: {latest.iniciais}
                            </span>
                          )}
                          {hasCritico && (
                            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200 flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3" />
                              <span>Alerta Crítico</span>
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                          <Clock className="w-3 h-3" />
                          <span>
                            {entries.length} registro(s) • Última atualização:{' '}
                            {latest?.ts ? new Date(latest.ts).toLocaleDateString('pt-BR') : '—'}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenBedInTriage(item.setorId, item.leito, latest?.iniciais);
                        }}
                        className="px-3 py-1.5 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-xs font-medium flex items-center gap-1 transition shadow-2xs cursor-pointer"
                        title="Abrir este leito na tela de triagem ativa"
                      >
                        <span>Abrir na Triagem</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <div className="p-1 text-slate-400">
                        {isCollapsed ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronUp className="w-4 h-4" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Bed Details Body */}
                  {!isCollapsed && (
                    <div className="p-4 space-y-3 bg-white">
                      <div className="space-y-2.5">
                        {recentEntries.map((entry, eIdx) => {
                          const borderClass =
                            entry.severidade === 'critico'
                              ? 'border-l-rose-500'
                              : entry.severidade === 'atencao'
                              ? 'border-l-amber-500'
                              : 'border-l-teal-500';

                          return (
                            <div
                              key={eIdx}
                              className={`p-3 rounded-lg border border-slate-200 border-l-4 ${borderClass} bg-slate-50/40 text-xs space-y-1.5`}
                            >
                              <div className="flex items-center justify-between text-slate-500">
                                <span className="font-mono font-semibold text-slate-700">
                                  {new Date(entry.ts).toLocaleString('pt-BR')}
                                </span>
                                {entry.iniciais && (
                                  <span className="font-mono text-slate-600">
                                    Iniciais: {entry.iniciais}
                                  </span>
                                )}
                              </div>

                              {entry.medicamentos && entry.medicamentos.length > 0 && (
                                <div className="text-slate-700">
                                  <strong className="text-slate-900 font-mono">Fármacos: </strong>
                                  <span>{entry.medicamentos.join(', ')}</span>
                                </div>
                              )}

                              {entry.achado && (
                                <div className="text-slate-800">
                                  <strong className="text-slate-900 font-mono">Achado: </strong>
                                  <span>{entry.achado}</span>
                                </div>
                              )}

                              {entry.sugestao && (
                                <div className="text-slate-600">
                                  <strong className="text-slate-900 font-mono">Recomendação: </strong>
                                  <span>{entry.sugestao}</span>
                                </div>
                              )}

                              {entry.conduta && (
                                <div className="text-slate-800 font-medium">
                                  <strong className="text-slate-900 font-mono">Conduta Prescritor: </strong>
                                  <span>{entry.conduta}</span>
                                </div>
                              )}

                              {entry.observacao && (
                                <div className="text-slate-500 italic">
                                  &ldquo;{entry.observacao}&rdquo;
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                        <span className="text-[11px] text-slate-400">
                          {entries.length > 3 ? `Mostrando os 3 registros mais recentes de ${entries.length}` : `Exibindo histórico completo do leito`}
                        </span>

                        <button
                          type="button"
                          onClick={() => handleEncerrarLeito(item.leito)}
                          className="text-xs text-rose-600 hover:text-rose-800 hover:bg-rose-50 px-2.5 py-1 rounded transition cursor-pointer flex items-center gap-1 font-medium"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>Encerrar Leito (Alta do Paciente)</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
