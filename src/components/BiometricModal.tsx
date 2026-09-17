import React, { useState, useEffect } from 'react';
import { Fingerprint, CheckCircle2, AlertCircle, X, Shield, Lock, UserPlus } from 'lucide-react';
import { clinicalAuth } from '../services/clinicalAuth';

interface BiometricModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (userEmail: string) => void;
  defaultEmail?: string;
  onGoToRegister?: () => void;
}

export const BiometricModal: React.FC<BiometricModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  defaultEmail,
  onGoToRegister
}) => {
  const [status, setStatus] = useState<'idle' | 'checking' | 'scanning' | 'success' | 'error' | 'no_registered_user' | 'unsupported'>('idle');
  const [message, setMessage] = useState('Toque no sensor para validar sua biometria');
  const [errorMessage, setErrorMessage] = useState('');
  const [registeredEmail, setRegisteredEmail] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      setErrorMessage('');
      checkPrerequisites();
    }
  }, [isOpen]);

  const checkPrerequisites = async () => {
    // Check if there is an existing registered user
    const targetEmail = defaultEmail?.trim() || localStorage.getItem('crivo_biometric_user_email') || '';
    const hasAccount = targetEmail ? clinicalAuth.isEmailRegistered(targetEmail) : true;

    if (!hasAccount) {
      setStatus('no_registered_user');
      setMessage('Nenhum cadastro encontrado para este e-mail. É obrigatório criar uma conta com login e senha primeiro.');
      return;
    }

    setRegisteredEmail(targetEmail);
    setStatus('idle');
    setMessage('Toque no botão abaixo para ativar a impressão digital / Face ID do seu telefone.');

    if (!window.PublicKeyCredential || !navigator.credentials) {
      setStatus('unsupported');
      setMessage('Sensor biométrico não suportado neste navegador. Entre com seu e-mail e senha cadastrados.');
      return;
    }

    try {
      if (typeof PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable === 'function') {
        const available = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
        if (!available) {
          setStatus('unsupported');
          setMessage('Sensor biométrico indisponível ou não cadastrado nas configurações do aparelho.');
        }
      }
    } catch {
      // Allow trying on click
    }
  };

  if (!isOpen) return null;

  const triggerScan = async () => {
    setStatus('scanning');
    setErrorMessage('');
    setMessage('Aguardando toque no sensor biométrico do telefone...');

    try {
      if (!window.PublicKeyCredential || !navigator.credentials) {
        throw new Error('Sensor biométrico não suportado neste navegador.');
      }

      const challenge = new Uint8Array(32);
      window.crypto.getRandomValues(challenge);

      const targetEmail = registeredEmail || defaultEmail?.trim() || localStorage.getItem('crivo_biometric_user_email') || '';

      const storedCredId = localStorage.getItem('crivo_biometric_cred_id');

      if (storedCredId) {
        const rawId = Uint8Array.from(atob(storedCredId), c => c.charCodeAt(0));
        const assertion = await navigator.credentials.get({
          publicKey: {
            challenge,
            allowCredentials: [{
              id: rawId,
              type: 'public-key',
              transports: ['internal']
            }],
            userVerification: 'required',
            timeout: 60000
          }
        });

        if (assertion) {
          const res = await clinicalAuth.loginWithBiometric(targetEmail);
          if (res.error) {
            throw new Error(res.error);
          }
          setStatus('success');
          setMessage('Biometria reconhecida com sucesso!');
          setTimeout(() => {
            onSuccess(res.user.email || targetEmail);
            onClose();
          }, 600);
          return;
        }
      } else {
        const userId = new Uint8Array(16);
        window.crypto.getRandomValues(userId);

        const newCred = await navigator.credentials.create({
          publicKey: {
            challenge,
            rp: {
              name: 'CRIVO Hospitalar',
              id: window.location.hostname
            },
            user: {
              id: userId,
              name: targetEmail || 'profissional@crivo.hospital',
              displayName: (targetEmail || 'Profissional').split('@')[0]
            },
            pubKeyCredParams: [
              { type: 'public-key', alg: -7 },
              { type: 'public-key', alg: -257 }
            ],
            authenticatorSelection: {
              authenticatorAttachment: 'platform',
              userVerification: 'required',
              requireResidentKey: false
            },
            timeout: 60000
          }
        }) as PublicKeyCredential | null;

        if (newCred) {
          const credIdBase64 = btoa(String.fromCharCode(...new Uint8Array(newCred.rawId)));
          localStorage.setItem('crivo_biometric_cred_id', credIdBase64);
          localStorage.setItem('crivo_biometric_user_email', targetEmail);

          const res = await clinicalAuth.loginWithBiometric(targetEmail);
          if (res.error) {
            throw new Error(res.error);
          }

          setStatus('success');
          setMessage('Biometria vinculada e autenticada com sucesso!');
          setTimeout(() => {
            onSuccess(res.user.email || targetEmail);
            onClose();
          }, 600);
          return;
        }
      }

      throw new Error('Falha na resposta do sensor biométrico.');
    } catch (err: any) {
      console.warn('Biometric error:', err);
      setStatus('error');
      if (err.name === 'NotAllowedError') {
        setErrorMessage('Autenticação biométrica cancelada ou impressão digital/face não reconhecida.');
      } else if (err.name === 'SecurityError') {
        setErrorMessage('O navegador bloqueou a chamada biométrica.');
      } else {
        setErrorMessage(err.message || 'Não foi possível autenticar por biometria.');
      }
      setMessage('Tente novamente ou digite sua senha de acesso.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl max-w-sm w-full p-6 text-center text-white relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-rose-500/15 rounded-full blur-3xl pointer-events-none" />

        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-3 inline-flex p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-teal-400">
          <Shield className="w-6 h-6" />
        </div>

        <h3 className="text-lg font-mono font-bold text-white tracking-tight">
          Biometria do Dispositivo
        </h3>
        <p className="text-xs text-slate-400 mt-1 mb-2">
          Impressão digital ou Face ID do seu aparelho
        </p>

        {registeredEmail && (
          <p className="text-[11px] font-mono text-teal-400/90 mb-4 truncate px-2 bg-slate-800/60 py-1 rounded-lg">
            Conta: {registeredEmail}
          </p>
        )}

        {/* Case: No user registered yet */}
        {status === 'no_registered_user' ? (
          <div className="py-4 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <UserPlus className="w-8 h-8" />
            </div>
            <p className="text-xs text-amber-200/90 font-mono leading-relaxed px-2">
              Para sua segurança, a biometria só pode ser vinculada a uma conta já cadastrada com e-mail e senha.
            </p>
            <button
              type="button"
              onClick={() => {
                onClose();
                onGoToRegister?.();
              }}
              className="w-full py-2.5 px-4 bg-teal-600 hover:bg-teal-500 text-white font-mono font-bold text-xs rounded-xl transition cursor-pointer"
            >
              Criar Conta com Login e Senha
            </button>
          </div>
        ) : (
          <div className="py-2 flex flex-col items-center justify-center">
            <button
              type="button"
              onClick={triggerScan}
              disabled={status === 'scanning' || status === 'success' || status === 'unsupported'}
              className={`relative w-28 h-28 rounded-full flex items-center justify-center border-2 transition-all cursor-pointer ${
                status === 'scanning'
                  ? 'border-teal-400 bg-teal-500/10 shadow-[0_0_25px_rgba(20,184,166,0.5)] animate-pulse'
                  : status === 'success'
                  ? 'border-emerald-400 bg-emerald-500/20 shadow-[0_0_30px_rgba(52,211,153,0.6)]'
                  : status === 'error'
                  ? 'border-rose-500 bg-rose-500/15'
                  : status === 'unsupported'
                  ? 'border-slate-700 bg-slate-800/40 opacity-60 cursor-not-allowed'
                  : 'border-slate-600 bg-slate-800/80 hover:border-teal-400 hover:bg-slate-800 hover:shadow-[0_0_15px_rgba(20,184,166,0.3)]'
              }`}
            >
              {status === 'success' ? (
                <CheckCircle2 className="w-14 h-14 text-emerald-400" />
              ) : status === 'error' ? (
                <AlertCircle className="w-14 h-14 text-rose-400" />
              ) : (
                <Fingerprint
                  className={`w-14 h-14 transition-colors ${
                    status === 'scanning' ? 'text-teal-400' : 'text-slate-300'
                  }`}
                />
              )}

              {status === 'scanning' && (
                <div className="absolute inset-0 rounded-full border border-teal-400/60 animate-ping" />
              )}
            </button>

            {status !== 'scanning' && status !== 'success' && status !== 'unsupported' && (
              <button
                type="button"
                onClick={triggerScan}
                className="mt-4 px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white font-mono font-bold text-xs rounded-xl transition cursor-pointer shadow-md"
              >
                Tocar no Sensor
              </button>
            )}
          </div>
        )}

        <div className="min-h-[44px] mt-2 flex flex-col items-center justify-center text-xs font-mono font-medium px-2">
          {errorMessage && (
            <span className="text-rose-400 mb-1 leading-snug">{errorMessage}</span>
          )}
          <span className={status === 'error' ? 'text-slate-400' : status === 'success' ? 'text-emerald-400' : 'text-slate-300'}>
            {message}
          </span>
        </div>

        <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 font-mono">
          <span className="flex items-center gap-1">
            <Lock className="w-3 h-3 text-teal-500" />
            <span>WebAuthn / FIDO2</span>
          </span>
          <button
            type="button"
            onClick={onClose}
            className="text-teal-400 hover:text-teal-300 underline cursor-pointer"
          >
            Entrar com Senha
          </button>
        </div>
      </div>
    </div>
  );
};
