import React from 'react';
import { LogOut, BookOpen, User as UserIcon, FileText } from 'lucide-react';
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
  onOpenReferences: () => void;
  isSyncing?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  onOpenAuth,
  onLogout,
  onOpenCatalog,
  onOpenReferences,
}) => {
  return (
    <header className="bg-white border-b border-[#D9E2EC] sticky top-0 z-30 shadow-xs font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
        {/* Brand & References Button */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="flex items-center gap-2">
            <CrivoLogo size={32} variant="light" />
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 font-['Syne',sans-serif]">
              Crivo
            </span>
          </div>

          {/* Button: Referências (replaces previous Triagem Hospitalar button that was returning to landing page) */}
          <button
            type="button"
            onClick={onOpenReferences}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono font-bold uppercase tracking-wider text-teal-800 bg-teal-50 hover:bg-teal-100/90 border border-teal-300 rounded-lg transition cursor-pointer shadow-2xs"
            title="Consultar Referências Oficiais e Bulário ANVISA em ordem alfabética"
          >
            <FileText className="w-3.5 h-3.5 text-teal-600" />
            <span>Referências</span>
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
            <span className="font-mono font-semibold hidden sm:inline">Guia de Fármacos</span>
            <span className="font-mono font-semibold sm:hidden">Guia</span>
          </button>

          {/* User Status / Login */}
          {user ? (
            <div className="flex items-center gap-1.5 bg-slate-50 border border-[#D9E2EC] rounded-lg p-1 pl-2">
              <span className="text-[11px] font-mono text-slate-700 max-w-[110px] sm:max-w-[140px] truncate" title={user.email || ''}>
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
