import React, { useState } from 'react';
import {
  Eye,
  EyeOff,
  Fingerprint,
  Sparkles,
  Smartphone,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  CheckCircle2,
  X,
  Activity,
  Layers,
  FileText,
  Zap,
  AlertTriangle,
  Copy,
  Check
} from 'lucide-react';
import { CrivoLogo } from './CrivoLogo';
import { BiometricModal } from './BiometricModal';
import { clinicalAuth } from '../services/clinicalAuth';
import { ClinicalUser } from '../types';

interface LandingPageProps {
  onEnterApp: (user?: ClinicalUser) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isBiometricModalOpen, setIsBiometricModalOpen] = useState(false);
  const [isPresentationOpen, setIsPresentationOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [infoNotice, setInfoNotice] = useState<string | null>(null);
  const [unauthorizedDomain, setUnauthorizedDomain] = useState<string | null>(null);
  const [copiedDomain, setCopiedDomain] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setErrorMsg('');
    setUnauthorizedDomain(null);
    const res = await clinicalAuth.loginWithGoogle();
    setIsLoading(false);

    if (res.errorCode === 'auth/unauthorized-domain') {
      const dom = res.unauthorizedDomain || (typeof window !== 'undefined' ? window.location.hostname : 'vercel.app');
      setUnauthorizedDomain(dom);
      if (!email.trim()) {
        setEmail('alansteihogen08@gmail.com');
      }
      return;
    }

    if (res.error) {
      setErrorMsg(res.error);
      return;
    }
    if (res.user) {
      onEnterApp(res.user);
    }
  };

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

  const handleProtectedEnterApp = () => {
    const active = clinicalAuth.getActiveSession();
    if (active) {
      onEnterApp(active);
    } else {
      setErrorMsg('Acesso restrito. É obrigatório criar uma conta ou fazer login com sua senha para acessar o Crivo.');
      const emailInput = document.getElementById('login-email-input');
      emailInput?.focus();
    }
  };

  const handleToggleBiometrics = () => {
    const nextVal = !biometricEnabled;
    setBiometricEnabled(nextVal);
    if (nextVal) {
      setIsBiometricModalOpen(true);
    }
  };

  const handleBiometricSuccess = async (validatedEmail: string) => {
    setBiometricEnabled(true);
    setIsBiometricModalOpen(false);
    const res = await clinicalAuth.loginWithBiometric(validatedEmail);
    if (res.user) {
      onEnterApp(res.user);
    } else if (res.error) {
      setErrorMsg(res.error);
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

      {/* TOP BAR: Styled directly like the user's screenshot */}
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

        {/* Right Nav Pills: [ Sobre ] [ 📱 Aplicativo Crivo ] */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-xl border border-slate-700/80 shadow-lg backdrop-blur-md">
          <button
            type="button"
            onClick={() => setIsPresentationOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-200 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            <span className="font-mono font-semibold">Sobre</span>
          </button>

          <button
            type="button"
            onClick={handleProtectedEnterApp}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold font-mono bg-teal-600 hover:bg-teal-500 text-white transition shadow-sm cursor-pointer"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="font-mono">Aplicativo Crivo</span>
          </button>
        </div>
      </header>

      {/* CENTER: Clean Whitebook-style Login Card */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4 py-8">
        <div className="w-full max-w-[420px] bg-white rounded-3xl shadow-2xl border border-slate-200/80 p-7 sm:p-9 text-slate-900 animate-fade-in">
          {/* Logo at top (without arrows) */}
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

          {/* Google Sign-in Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full py-2.5 px-4 mb-3 bg-white border border-slate-300 hover:bg-slate-50 active:bg-slate-100 text-slate-700 font-semibold text-sm rounded-full shadow-xs transition-all cursor-pointer flex items-center justify-center gap-3 disabled:opacity-50"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span>Continuar com Google</span>
          </button>

          {/* Diagnostic & Solution Box for Google Auth Domain Restriction */}
          {unauthorizedDomain && (
            <div className="mb-4 p-3.5 bg-amber-50/95 border border-amber-300/90 rounded-2xl text-left space-y-2.5 shadow-xs">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs text-slate-900 leading-snug">
                    Domínio de hospedagem não autorizado no Google Auth
                  </h4>
                  <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                    O Google bloqueia popups de domínios desconhecidos por segurança. Para usar a conta Google neste endereço, autorize-o no Firebase:
                  </p>
                </div>
              </div>

              <div className="p-2 bg-white border border-amber-200 rounded-xl font-mono text-[11px] text-slate-800 flex items-center justify-between gap-2">
                <span className="truncate select-all font-semibold">{unauthorizedDomain}</span>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(unauthorizedDomain);
                    setCopiedDomain(true);
                    setTimeout(() => setCopiedDomain(false), 2500);
                  }}
                  className="px-2 py-1 bg-amber-100 hover:bg-amber-200 text-amber-900 font-sans font-semibold rounded-md text-[10px] shrink-0 flex items-center gap-1 transition cursor-pointer"
                >
                  {copiedDomain ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedDomain ? 'Copiado!' : 'Copiar URL'}</span>
                </button>
              </div>

              <div className="text-[11px] text-slate-600 space-y-1 bg-amber-100/50 p-2 rounded-lg">
                <p className="font-semibold text-slate-800">Passo a passo no Console:</p>
                <ol className="list-decimal list-inside space-y-0.5 text-[10.5px]">
                  <li>Acesse o <strong>Firebase Console</strong></li>
                  <li>Vá em <strong>Authentication</strong> &rarr; aba <strong>Settings</strong></li>
                  <li>Em <strong>Authorized domains</strong>, clique em <em>Add domain</em> e cole o endereço</li>
                </ol>
              </div>

              <div className="pt-2 border-t border-amber-200/80">
                <p className="text-[11px] font-semibold text-slate-800">
                  Acesse agora sem esperar:
                </p>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  Preenchemos seu e-mail abaixo. Basta digitar sua senha ou clicar em "Cadastre-se" para entrar imediatamente!
                </p>
              </div>
            </div>
          )}

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-[11px]">
              <span className="bg-white px-2 text-slate-400 font-mono">ou com e-mail institucional</span>
            </div>
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
                className="text-teal-700 hover:text-teal-900 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* E-mail */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                E-mail
              </label>
              <input
                id="login-email-input"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu.email@hospital.com"
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 focus:border-slate-800 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-800 transition"
              />
            </div>

            {/* Senha */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Senha
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-3.5 pr-10 py-2.5 bg-white border border-slate-300 focus:border-slate-800 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-800 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
                  title={showPassword ? 'Ocultar senha' : 'Ver senha'}
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

            {/* Login com Biometria Toggle Switch */}
            <div className="pt-2 pb-1 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  role="switch"
                  aria-checked={biometricEnabled}
                  onClick={handleToggleBiometrics}
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                    biometricEnabled ? 'bg-teal-600' : 'bg-slate-300'
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      biometricEnabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
                <span
                  onClick={handleToggleBiometrics}
                  className="text-xs font-semibold text-slate-700 cursor-pointer flex items-center gap-1.5 select-none"
                >
                  <Fingerprint className="w-4 h-4 text-slate-500" />
                  <span>Login com Biometria</span>
                </span>
              </div>
            </div>

            {/* Main Action Button ("Entrar") */}
            <div className="pt-3">
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
                href="mailto:aperne@if.uff.br?subject=Suporte%20CRIVO%20Hospitalar"
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
        CRIVO Hospitalar v2.4 • Cockcroft-Gault • Interações Medicamentosas • Farmacoterapia
      </footer>

      {/* BIOMETRIC MODAL */}
      <BiometricModal
        isOpen={isBiometricModalOpen}
        onClose={() => setIsBiometricModalOpen(false)}
        onSuccess={handleBiometricSuccess}
      />

      {/* PRESENTATION MODAL / DRAWER (Triggered by [ ✨ Início / Apresentação ]) */}
      {isPresentationOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="bg-slate-900 border border-slate-700 text-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setIsPresentationOpen(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
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
                  <h4 className="text-xs font-bold font-mono text-white">Cockcroft-Gault & Diálise</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Cálculo automático de ClCr, estadiamento e condutas para HD, CVVH e CVVHD.
                  </p>
                </div>
              </div>

              <div className="p-3.5 bg-slate-800/80 border border-slate-700 rounded-xl flex items-start gap-3">
                <Zap className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold font-mono text-white">Interações Graves & Beers</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Alertas para Valproato + Meropenem, prolongamento de QT e nefrotoxicidade somada.
                  </p>
                </div>
              </div>

              <div className="p-3.5 bg-slate-800/80 border border-slate-700 rounded-xl flex items-start gap-3">
                <Layers className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold font-mono text-white">Auditoria por Leito</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Organização por UTI Adulto, Cardio e enfermarias com histórico evolutivo.
                  </p>
                </div>
              </div>

              <div className="p-3.5 bg-slate-800/80 border border-slate-700 rounded-xl flex items-start gap-3">
                <FileText className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold font-mono text-white">Cópia para Prontuário (PEP)</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Estruturação de texto com 1 clique para colar no prontuário eletrônico.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setIsPresentationOpen(false)}
                className="px-4 py-2 text-slate-400 hover:text-white font-mono text-xs rounded-xl transition cursor-pointer"
              >
                Fechar
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsPresentationOpen(false);
                  handleProtectedEnterApp();
                }}
                className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white font-mono font-bold text-xs rounded-xl transition cursor-pointer"
              >
                Ir para o Aplicativo Crivo
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
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-800 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <HelpCircle className="w-5 h-5 text-teal-600" />
              <h3 className="text-base font-bold text-slate-900">Central de Ajuda — Crivo</h3>
            </div>

            <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
              <p>
                <strong>Primeiro acesso:</strong> Se você é profissional de saúde ou residente do hospital, você pode criar sua conta clicando em <em>Cadastre-se</em> ou utilizar o <em>Acesso Rápido de Plantão</em>.
              </p>
              <p>
                <strong>Login com Biometria:</strong> Ative a chave de biometria para autenticar via sensor de digital (Touch ID), reconhecimento facial (Face ID) ou crachá digital.
              </p>
              <p>
                <strong>Suporte Hospitalar:</strong> Dúvidas farmacoterapêuticas ou inclusão de novos medicamentos no catálogo institucional podem ser direcionadas à Comissão de Farmácia e Terapêutica (CFT).
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

      {/* BIOMETRIC MODAL */}
      <BiometricModal
        isOpen={isBiometricModalOpen}
        onClose={() => setIsBiometricModalOpen(false)}
        onSuccess={handleBiometricSuccess}
        defaultEmail={email}
        onGoToRegister={() => {
          setIsRegisterMode(true);
          setErrorMsg('');
          const emailInput = document.getElementById('login-email-input');
          emailInput?.focus();
        }}
      />
    </div>
  );
};
