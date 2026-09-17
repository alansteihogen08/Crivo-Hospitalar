import React, { useState } from 'react';
import { Layers, Plus, Trash2, UserPlus, Users, X, Check, Shield, AlertCircle } from 'lucide-react';
import { SetorHospital } from '../types';
import { crivoFirestore } from '../services/firebase';

interface SectorManagerViewProps {
  setores: SetorHospital[];
  onRefreshSetores: () => Promise<void>;
  onShowToast: (msg: string) => void;
}

export const SectorManagerView: React.FC<SectorManagerViewProps> = ({
  setores,
  onRefreshSetores,
  onShowToast,
}) => {
  const [novoNome, setNovoNome] = useState('');
  const [collabEmail, setCollabEmail] = useState<Record<string, string>>({});
  const [isCreating, setIsCreating] = useState(false);

  const handleCriarSetor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoNome.trim()) return;
    setIsCreating(true);
    const id = await crivoFirestore.criarSetor(novoNome.trim());
    setIsCreating(false);
    if (id) {
      setNovoNome('');
      onShowToast('Setor cadastrado com sucesso.');
      await onRefreshSetores();
    } else {
      onShowToast(`Erro ao criar: ${crivoFirestore.lastError}`);
    }
  };

  const handleExcluirSetor = async (setor: SetorHospital) => {
    if (!confirm(`Remover permanentemente o setor "${setor.nome}"?`)) return;
    const ok = await crivoFirestore.excluirSetor(setor.id);
    if (ok) {
      onShowToast('Setor excluído com sucesso.');
      await onRefreshSetores();
    } else {
      onShowToast(`Erro ao excluir: ${crivoFirestore.lastError}`);
    }
  };

  const handleCompartilhar = async (setorId: string) => {
    const email = (collabEmail[setorId] || '').trim();
    if (!email) return;
    const ok = await crivoFirestore.compartilharSetor(setorId, email);
    if (ok) {
      onShowToast(`Setor compartilhado com ${email}.`);
      setCollabEmail((prev) => ({ ...prev, [setorId]: '' }));
      await onRefreshSetores();
    } else {
      onShowToast(`Não foi possível compartilhar: ${crivoFirestore.lastError}`);
    }
  };

  const handleRemoverMembro = async (setor: SetorHospital, email: string) => {
    const idx = (setor.membrosEmails || []).indexOf(email);
    const uid = idx >= 0 ? setor.membros[idx] : '';
    const ok = await crivoFirestore.removerMembro(setor.id, uid, email);
    if (ok) {
      onShowToast(`Colaborador ${email} removido.`);
      await onRefreshSetores();
    } else {
      onShowToast(`Erro ao remover: ${crivoFirestore.lastError}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Cadastro de novo setor */}
      <section className="bg-white rounded-xl shadow-sm border border-slate-200/90 overflow-hidden">
        <div className="bg-slate-50/80 px-5 py-3.5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-teal-500/10 text-teal-700 flex items-center justify-center font-bold">
              <Plus className="w-4 h-4 text-teal-600" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono">
                Cadastrar Novo Setor / Unidade Hospitalar
              </h2>
            </div>
          </div>
        </div>

        <form onSubmit={handleCriarSetor} className="p-5 space-y-3">
          <p className="text-xs text-slate-500 leading-relaxed">
            Cadastre os setores ou unidades de internação do seu hospital (ex: UTI Adulto, UTI Coronariana,
            Onco-Hematologia, Clínica Médica, Sala Vermelha) para organizar os leitos e avaliações clínicas.
          </p>

          <div className="flex flex-col sm:flex-row gap-2.5">
            <input
              type="text"
              required
              value={novoNome}
              onChange={(e) => setNovoNome(e.target.value)}
              placeholder="ex: UTI Pediátrica, Pronto-Socorro / SR..."
              className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-teal-500 focus:bg-white transition"
            />
            <button
              type="submit"
              disabled={isCreating || !novoNome.trim()}
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-medium text-sm font-mono rounded-lg transition shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4 text-teal-400" />
              <span>{isCreating ? 'Adicionando...' : 'Adicionar Setor'}</span>
            </button>
          </div>
        </form>
      </section>

      {/* Lista de setores cadastrados */}
      <section className="bg-white rounded-xl shadow-sm border border-slate-200/90 overflow-hidden">
        <div className="bg-slate-50/80 px-5 py-3.5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-teal-500/10 text-teal-700 flex items-center justify-center font-bold">
              <Layers className="w-4 h-4 text-teal-600" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono">
                Setores Ativos & Compartilhamento ({setores.length})
              </h2>
            </div>
          </div>
        </div>

        <div className="p-5">
          {setores.length === 0 ? (
            <div className="p-8 text-center text-slate-400 border border-dashed border-slate-200 rounded-lg">
              <Layers className="w-8 h-8 mx-auto mb-2 text-slate-300" />
              <p className="text-xs">Nenhum setor cadastrado ainda.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-200">
              {setores.map((setor) => {
                const currentInputEmail = collabEmail[setor.id] || '';

                return (
                  <div key={setor.id} className="py-4 first:pt-0 last:pb-0 space-y-3">
                    {/* Sector Title & Delete */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 font-mono text-sm">
                          {setor.nome}
                        </span>
                        {setor.souDono ? (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                            Proprietário
                          </span>
                        ) : (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200">
                            Compartilhado com você
                          </span>
                        )}
                      </div>

                      {setor.souDono && (
                        <button
                          type="button"
                          onClick={() => handleExcluirSetor(setor)}
                          className="text-xs text-rose-600 hover:text-rose-800 hover:bg-rose-50 p-1.5 rounded transition cursor-pointer flex items-center gap-1"
                          title="Excluir este setor"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Excluir</span>
                        </button>
                      )}
                    </div>

                    {/* Collaborators section if owner */}
                    {setor.souDono && (
                      <div className="bg-slate-50/70 p-3 rounded-lg border border-slate-200 space-y-2.5">
                        <div className="flex items-center gap-1.5 text-xs text-slate-700 font-semibold">
                          <Users className="w-3.5 h-3.5 text-slate-500" />
                          <span>Colaboradores com Acesso a este Setor:</span>
                        </div>

                        {/* Collaborator chips */}
                        <div className="flex flex-wrap gap-1.5">
                          {(setor.membrosEmails || []).length === 0 ? (
                            <span className="text-xs text-slate-400 italic">
                              Nenhum colega adicionado (visível apenas por você).
                            </span>
                          ) : (
                            setor.membrosEmails.map((email) => (
                              <span
                                key={email}
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-slate-200 rounded-full text-xs font-mono text-slate-700 shadow-2xs"
                              >
                                <span>{email}</span>
                                <button
                                  type="button"
                                  onClick={() => handleRemoverMembro(setor, email)}
                                  className="w-4 h-4 rounded-full bg-slate-100 hover:bg-rose-100 text-slate-400 hover:text-rose-700 flex items-center justify-center transition"
                                  title="Remover acesso"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </span>
                            ))
                          )}
                        </div>

                        {/* Invite email input */}
                        <div className="flex gap-2 pt-1">
                          <input
                            type="email"
                            value={currentInputEmail}
                            onChange={(e) =>
                              setCollabEmail((prev) => ({
                                ...prev,
                                [setor.id]: e.target.value,
                              }))
                            }
                            placeholder="e-mail do farmacêutico ou médico colega..."
                            className="flex-1 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:ring-2 focus:ring-teal-500"
                          />
                          <button
                            type="button"
                            onClick={() => handleCompartilhar(setor.id)}
                            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-medium font-mono flex items-center gap-1 transition cursor-pointer"
                          >
                            <UserPlus className="w-3.5 h-3.5 text-teal-400" />
                            <span>Compartilhar</span>
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
      </section>
    </div>
  );
};
