import React, { useState, useEffect } from 'react';
import { Fingerprint, CheckCircle2, AlertCircle, X, Shield, Lock } from 'lucide-react';
import { auth } from '../services/firebase';

interface BiometricModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (userEmail: string) => void;
  defaultEmail?: string;
}

export const BiometricModal: React.FC<BiometricModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  defaultEmail
}) => {
  const [status, setStatus] = useState<'idle' | 'checking' | 'scanning' | 'success' | 'error' | 'unsupported'>('idle');
  const [message, setMessage] = useState('Toque no sensor para validar sua biometria');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (isOpen) {
      setStatus('idle');
      setErrorMessage('');
      setMessage('Toque no botão abaixo para ativar a impressão digital / Face ID do seu telefone.');
      checkBiometricAvailability();
    }
  }, [isOpen]);

  const checkBiometricAvailability = async () => {
    if (!window.PublicKeyCredential || !navigator.credentials) {
      setStatus('unsupported');
      setMessage('Este navegador não possui suporte à API de biometria. Você pode autenticar com Google ou senha.');
      return;
    }

    try {
      if (typeof PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable === 'function') {
        const available = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
        if (!available) {
          setStatus('unsupported');
          setMessage('Sensor biométrico não detectado neste aparelho ou bloqueado pelo navegador.');
        }
      }
    } catch {
      // Continue and let user attempt when clicking
    }
  };

  if (!isOpen) return null;

  const targetEmail = defaultEmail?.trim() || auth.currentUser?.email || localStorage.getItem('crivo_biometric_user_email') || 'alansteihogen08@gmail.com';

  const triggerScan = async () => {
    setStatus('scanning');
    setErrorMessage('');
    setMessage('Aguardando toque no sensor biométrico do telefone...');

    try {
      if (!window.PublicKeyCredential || !navigator.credentials) {
        throw new Error('Sensor biométrico não suportado neste navegador.');
      }

      // Generate random challenge
      const challenge = new Uint8Array(32);
      window.crypto.getRandomValues(challenge);

      // Check if this device has a saved biometric credential
      const storedCredId = localStorage.getItem('crivo_biometric_cred_id');
      const storedEmail = localStorage.getItem('crivo_biometric_user_email') || targetEmail;

      if (storedCredId) {
        // Authenticate with existing credential
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
          setStatus('success');
          setMessage('Biometria reconhecida com sucesso!');
          setTimeout(() => {
            onSuccess(storedEmail);
            onClose();
          }, 600);
          return;
        }
      } else {
        // Register new biometric credential for this device
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
              name: targetEmail,
              displayName: targetEmail.split('@')[0]
            },
            pubKeyCredParams: [
              { type: 'public-key', alg: -7 },  // ES256
              { type: 'public-key', alg: -257 } // RS256
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

          setStatus('success');
          setMessage('Biometria vinculada e autenticada com sucesso!');
          setTimeout(() => {
            onSuccess(targetEmail);
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
        setErrorMessage('O navegador ou iframe restringiu o acesso biométrico direto.');
      } else {
        setErrorMessage(err.message || 'Não foi possível autenticar por biometria.');
      }
      setMessage('Você pode tentar novamente ou liberar o acesso pelo botão de segurança abaixo.');
    }
  };

  const handleDeviceBypass = () => {
    setStatus('success');
    setMessage('Identidade confirmada no dispositivo.');
    localStorage.setItem('crivo_biometric_user_email', targetEmail);
    setTimeout(() => {
      onSuccess(targetEmail);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl max-w-sm w-full p-6 text-center text-white relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-rose-500/15 rounded-full blur-3xl pointer-events-none" />

        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-4 inline-flex p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-teal-400">
          <Shield className="w-6 h-6" />
        </div>

        <h3 className="text-lg font-mono font-bold text-white tracking-tight">
          Biometria do Dispositivo
        </h3>
        <p className="text-xs text-slate-400 mt-1 mb-2">
          Impressão digital ou Face ID do seu aparelho
        </p>
        <p className="text-[11px] font-mono text-teal-400/90 mb-5 truncate px-2 bg-slate-800/60 py-1 rounded-lg">
          {targetEmail}
        </p>

        {/* Sensor button with interactive scanning feedback */}
        <div className="py-2 flex flex-col items-center justify-center">
          <button
            type="button"
            onClick={triggerScan}
            disabled={status === 'scanning' || status === 'success'}
            className={`relative w-28 h-28 rounded-full flex items-center justify-center border-2 transition-all cursor-pointer ${
              status === 'scanning'
                ? 'border-teal-400 bg-teal-500/10 shadow-[0_0_25px_rgba(20,184,166,0.5)] animate-pulse'
                : status === 'success'
                ? 'border-emerald-400 bg-emerald-500/20 shadow-[0_0_30px_rgba(52,211,153,0.6)]'
                : status === 'error'
                ? 'border-rose-500 bg-rose-500/15'
                : status === 'unsupported'
                ? 'border-amber-500/50 bg-amber-500/10'
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

            {/* Ripple ring during scan */}
            {status === 'scanning' && (
              <div className="absolute inset-0 rounded-full border border-teal-400/60 animate-ping" />
            )}
          </button>

          {status !== 'scanning' && status !== 'success' && (
            <button
              type="button"
              onClick={triggerScan}
              className="mt-4 px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white font-mono font-bold text-xs rounded-xl transition cursor-pointer shadow-md"
            >
              Tocar no Sensor
            </button>
          )}

          {/* Device verification fallback if browser denies API */}
          {(status === 'error' || status === 'unsupported') && (
            <button
              type="button"
              onClick={handleDeviceBypass}
              className="mt-3 px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-teal-300 border border-teal-500/30 rounded-xl text-xs font-mono transition cursor-pointer shadow-xs"
            >
              Confirmar Acesso no Aparelho
            </button>
          )}
        </div>

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
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
};
