import React, { useState } from 'react';
import {
  Eye,
  EyeOff,
  Sparkles,
  AlertCircle,
  HelpCircle,
  X,
  Activity,
  Layers,
  FileText,
  ShieldCheck
} from 'lucide-react';
import { CrivoLogo } from './CrivoLogo';
import { clinicalAuth } from '../services/clinicalAuth';
import { ClinicalUser } from '../types';

interface LandingPageProps {
  onEnterApp: (user?: ClinicalUser) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isPresentationOpen, setIsPresentationOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [infoNotice, setInfoNotice] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setErrorMsg('Por favor, informe seu e-mail e senha.');
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
        onEnterApp(res.user);
      } else {
        const res = await clinicalAuth.login(email.trim(), password);
        setIsLoading(false);
        if (res.error) {
          setErrorMsg(res.error);
          return;
        }
        onEnterApp(res.user);
      }
    } catch (err: any) {
      setIsLoading(false);
      setErrorMsg(err.message || 'Falha ao autenticar. Verifique suas credenciais.');
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden select-none font-sans">
      {/* BACKGROUND: Hospital bed / ICU setting with dark-blue clinical overlay */}
      <div className="fixed inset-0 z-0">
        {/* Real photo of modern hospital room & bed */}
        <img
          src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=2000&q=80"
          alt="Leito Hospitalar"
          className="w-full h-full object-cover object-center filter brightness-90"
        />
        {/* Soft clinical blue/navy tint overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-900/80 to-slate-950/90 backdrop-blur-[2px]" />
      </div>

      {/* TOP BAR */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-4 pb-2 flex items-center justify-between">
        {/* Left Brand info */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-300">
            <CrivoLogo size={24} variant="dark" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-bold font-mono tracking-tight text-white">
                CRIVO
              </span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-teal-950/90 text-teal-300 border border-teal-800">
                Hospitalar
              </span>
            </div>
            <p className="text-[11px] text-slate-300 hidden sm:block">
              Triagem de Prescrição & Ajuste Renal
            </p>
          </div>
        </div>

        {/* Right Nav: Only [ Sobre ] */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-xl border border-slate-700/80 shadow-lg backdrop-blur-md">
          <button
            type="button"
            onClick={() => setIsPresentationOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-200 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            <span className="font-mono font-semibold">Sobre</span>
          </button>
        </div>
      </header>

      {/* CENTER: Clean Whitebook-style Login Card */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4 py-8">
        <div className="w-full max-w-[420px] bg-white rounded-3xl shadow-2xl border border-slate-200/80 p-7 sm:p-9 text-slate-900 animate-fade-in">
          {/* Logo at top */}
          <div className="flex justify-center mb-6">
            <CrivoLogo size={68} variant="light" />
          </div>

          {/* Title & Subtitle */}
          <div className="text-left mb-6">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              {isRegisterMode ? 'Criar conta no Crivo' : 'Bem-vindo ao Crivo'}
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              {isRegisterMode
                ? 'Cadastre seus dados profissionais'
                : 'Entre com seus dados cadastrados'}
            </p>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Notice info */}
          {infoNotice && (
            <div className="mb-4 p-3 bg-teal-50 border border-teal-200 rounded-xl text-xs text-teal-900 flex items-start justify-between gap-2">
              <span>{infoNotice}</span>
              <button
                type="button"
                onClick={() => setInfoNotice(null)}
                className="text-teal-700 hover:text-teal-900 p-0.5 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Field: E-mail */}
            <div className="space-y-1.5 text-left">
              <label
                htmlFor="login-email-input"
                className="block text-xs font-bold text-slate-700 font-mono uppercase tracking-wider"
              >
                E-mail
              </label>
              <input
                id="login-email-input"
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrorMsg('');
                }}
                placeholder="seu.email@hospital.com"
                className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-slate-900 focus:border-slate-900 focus:outline-none transition placeholder:text-slate-400"
              />
            </div>

            {/* Field: Senha */}
            <div className="space-y-1.5 text-left">
              <label className="block text-xs font-bold text-slate-700 font-mono uppercase tracking-wider">
                Senha
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrorMsg('');
                  }}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-slate-900 focus:border-slate-900 focus:outline-none transition pr-11 placeholder:text-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600 transition cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              <div className="mt-1 text-left">
                <button
                  type="button"
                  onClick={() =>
                    setInfoNotice(
                      'Para redefinir sua senha, solicite o link de recuperação ao administrador do plantão.'
                    )
                  }
                  className="text-xs text-[#1e204d] hover:underline font-medium cursor-pointer"
                >
                  Esqueci minha senha
                </button>
              </div>
            </div>

            {/* Main Action Button ("Entrar") */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-[#12153a] hover:bg-[#1d225c] active:bg-[#0c0e27] text-white font-semibold text-sm rounded-full shadow-md transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <span>Carregando...</span>
                ) : isRegisterMode ? (
                  <span>Criar Conta</span>
                ) : (
                  <span>Entrar</span>
                )}
              </button>
            </div>
          </form>

          {/* Links Below Button */}
          <div className="mt-6 text-center space-y-2.5">
            <div>
              <button
                type="button"
                onClick={() => {
                  setIsRegisterMode(!isRegisterMode);
                  setErrorMsg('');
                }}
                className="text-xs text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                {isRegisterMode
                  ? 'Já possui uma conta? '
                  : 'Não possui conta? '}
                <span className="font-semibold underline text-[#12153a]">
                  {isRegisterMode ? 'Faça login' : 'Cadastre-se'}
                </span>
              </button>
            </div>

            <div>
              <a
                href="mailto:aperne@id.uff.br?subject=Suporte%20CRIVO%20Hospitalar"
                className="text-xs text-[#1e204d] hover:underline font-medium inline-block cursor-pointer"
              >
                Central de ajuda
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 w-full py-3 text-center text-[11px] text-slate-300 font-mono">
        CRIVO Hospitalar v2.4 • Suporte à Decisão Clínica • Farmacoterapia Segura
      </footer>

      {/* SOBRE O SISTEMA MODAL */}
      {isPresentationOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="bg-slate-900 border border-slate-700 text-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setIsPresentationOpen(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <CrivoLogo size={42} variant="dark" />
              <div>
                <h3 className="text-xl font-bold font-mono text-white">
                  CRIVO — Sobre o Sistema
                </h3>
                <p className="text-xs text-teal-400 font-mono">
                  Suporte à Decisão Clínica & Validação de Prescrições
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              O <strong className="text-white">Crivo</strong> é uma ferramenta especializada desenvolvida para farmacêuticos clínicos, médicos intensivistas e equipes hospitalares, garantindo prescrições seguras no beira-leito.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              <div className="p-3.5 bg-slate-800/80 border border-slate-700 rounded-xl flex items-start gap-3">
                <Activity className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold font-mono text-white">Ajuste Posológico Renal</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Cálculo automatizado do ClCr e condutas posológicas para disfunção renal e modalidades dialíticas.
                  </p>
                </div>
              </div>

              <div className="p-3.5 bg-slate-800/80 border border-slate-700 rounded-xl flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold font-mono text-white">Interações & Segurança</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Identificação imediata de interações medicamentosas graves, toxicidades somadas e critérios para idosos.
                  </p>
                </div>
              </div>

              <div className="p-3.5 bg-slate-800/80 border border-slate-700 rounded-xl flex items-start gap-3">
                <Layers className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold font-mono text-white">Gestão por Setores e Leitos</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Organização das avaliações por unidades hospitalares com histórico evolutivo e colaboração clínica.
                  </p>
                </div>
              </div>

              <div className="p-3.5 bg-slate-800/80 border border-slate-700 rounded-xl flex items-start gap-3">
                <FileText className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold font-mono text-white">Registro em Prontuário</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Estruturação da evolução farmacêutica pronta para inserção direta no prontuário eletrônico (PEP).
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setIsPresentationOpen(false)}
                className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs rounded-xl transition cursor-pointer"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HELP MODAL */}
      {isHelpOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 text-slate-900 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setIsHelpOpen(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-800 p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <HelpCircle className="w-5 h-5 text-teal-600" />
              <h3 className="text-base font-bold text-slate-900">Central de Ajuda — Crivo</h3>
            </div>

            <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
              <p>
                <strong>Primeiro acesso:</strong> Se você é profissional de saúde ou residente do hospital, você pode criar sua conta clicando em <em>Cadastre-se</em> informando seu e-mail institucional e definindo sua senha de acesso.
              </p>
              <p>
                <strong>Suporte Hospitalar:</strong> Dúvidas farmacoterapêuticas, sugestões ou suporte podem ser enviados para <em>aperne@id.uff.br</em>.
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setIsHelpOpen(false)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg cursor-pointer"
              >
                Entendi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
