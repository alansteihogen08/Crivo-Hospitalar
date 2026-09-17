import React from 'react';
import { LogOut, BookOpen, User as UserIcon } from 'lucide-react';
import { User } from 'firebase/auth';
import { SetorHospital, ClinicalUser } from '../types';
import { CrivoLogo } from './CrivoLogo';

interface HeaderProps {
  user: ClinicalUser | User | null;
  currentSetor?: SetorHospital | null;
  currentLeito: string;
  onOpenAuth: () => void;
  onLogout: () => void;
  onOpenCatalog: () => void;
  onGoToLanding: () => void;
  isSyncing?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  onOpenAuth,
  onLogout,
  onOpenCatalog,
  onGoToLanding,
}) => {
  return (
    <header className="bg-white border-b border-[#D9E2EC] sticky top-0 z-30 shadow-xs font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Brand from Screenshot 1: Logo + Crivo + TRIAGEM HOSPITALAR */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onGoToLanding}
            className="flex items-center gap-3 text-left hover:opacity-90 transition cursor-pointer"
            title="Ir para a Apresentação"
          >
            <CrivoLogo size={34} variant="light" />
            <div className="flex items-center gap-2.5">
              <span className="text-2xl font-bold tracking-tight text-slate-900 font-['Syne',sans-serif]">
                Crivo
              </span>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#627D98] border border-[#D9E2EC] px-2 py-0.5 rounded bg-slate-50">
                Triagem Hospitalar
              </span>
            </div>
          </button>
        </div>

        {/* Right Tools & Actions */}
        <div className="flex items-center gap-2">
          {/* Quick Drug Catalog Lookup */}
          <button
            type="button"
            onClick={onOpenCatalog}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-[#D9E2EC] rounded-lg transition cursor-pointer"
            title="Consultar catálogo de fármacos e ajustes"
          >
            <BookOpen className="w-3.5 h-3.5 text-teal-600" />
            <span className="font-mono font-semibold">Guia de Fármacos</span>
          </button>

          {/* User Status / Login */}
          {user ? (
            <div className="flex items-center gap-1.5 bg-slate-50 border border-[#D9E2EC] rounded-lg p-1 pl-2">
              <span className="text-[11px] font-mono text-slate-700 max-w-[120px] truncate" title={user.email || ''}>
                {user.email?.split('@')[0]}
              </span>
              <button
                type="button"
                onClick={onLogout}
                className="p-1 text-slate-400 hover:text-rose-600 rounded transition cursor-pointer"
                title="Desconectar"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={onOpenAuth}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono font-medium text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-lg transition cursor-pointer"
            >
              <UserIcon className="w-3.5 h-3.5" />
              <span>Entrar</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
