import React, { useState } from 'react';
import { X, Lock, Mail, UserPlus, LogIn, AlertCircle } from 'lucide-react';
import { clinicalAuth } from '../services/clinicalAuth';
import { CrivoLogo } from './CrivoLogo';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setErrorMsg('Por favor, preencha o e-mail e a senha.');
      return;
    }
    setErrorMsg('');
    setIsLoading(true);

    try {
      if (isRegisterMode) {
        const res = await clinicalAuth.register(email.trim(), password);
        setIsLoading(false);
        if (res.error) {
          setErrorMsg(res.error);
          return;
        }
      } else {
        const res = await clinicalAuth.login(email.trim(), password);
        setIsLoading(false);
        if (res.error) {
          setErrorMsg(res.error);
          return;
        }
      }
      onSuccess();
      onClose();
    } catch (err: any) {
      setIsLoading(false);
      setErrorMsg(err.message || 'Falha ao processar autenticação.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 px-6 py-5 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <CrivoLogo size={36} variant="dark" />
            <div>
              <h2 className="text-base font-bold font-mono">
                {isRegisterMode ? 'CRIVO — Novo Cadastro' : 'CRIVO — Acesso Clínico'}
              </h2>
              <p className="text-xs text-slate-400">
                Acesso aos leitos e sincronização de evolução
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg flex items-start gap-2.5 text-rose-800 text-xs">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider font-mono">
              E-mail institucional / profissional
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="farmacia@hospital.com"
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider font-mono">
              Senha
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-mono font-medium text-xs rounded-lg shadow-sm transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <span className="text-xs">Processando...</span>
            ) : isRegisterMode ? (
              <>
                <UserPlus className="w-4 h-4" />
                <span>Criar Conta Profissional</span>
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                <span>Entrar no Sistema</span>
              </>
            )}
          </button>

          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={() => {
                setIsRegisterMode(!isRegisterMode);
                setErrorMsg('');
              }}
              className="text-xs font-medium text-teal-700 hover:text-teal-800 hover:underline cursor-pointer font-mono"
            >
              {isRegisterMode
                ? 'Já possui cadastro? Clique aqui para entrar'
                : 'Primeiro acesso? Cadastre-se gratuitamente'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

