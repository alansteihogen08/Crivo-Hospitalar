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
    <header className="bg-white border-b border-[#D9E2EC] sticky top-0 z-30 shadow-xs font-sans w-full overflow-hidden">
      <div className="max-w-4xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-3">
        {/* Brand & References Button */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <CrivoLogo size={28} variant="light" />
            <span className="text-lg sm:text-2xl font-bold tracking-tight text-slate-900 font-['Syne',sans-serif]">
              Crivo
            </span>
          </div>

          {/* Button: Referências */}
          <button
            type="button"
            onClick={onOpenReferences}
            className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1.5 text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-teal-800 bg-teal-50 hover:bg-teal-100/90 border border-teal-300 rounded-lg transition cursor-pointer shadow-2xs whitespace-nowrap"
            title="Consultar Referências Oficiais e Bulário ANVISA em ordem alfabética"
          >
            <FileText className="w-3.5 h-3.5 text-teal-600 shrink-0" />
            <span>Referências</span>
          </button>
        </div>

        {/* Right Tools & Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Quick Drug Catalog Lookup */}
          <button
            type="button"
            onClick={onOpenCatalog}
            className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 text-[11px] sm:text-xs font-mono font-medium text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-[#D9E2EC] rounded-lg transition cursor-pointer whitespace-nowrap"
            title="Consultar catálogo de fármacos e ajustes"
          >
            <BookOpen className="w-3.5 h-3.5 text-teal-600 shrink-0" />
            <span className="font-mono font-semibold hidden sm:inline">Guia de Fármacos</span>
            <span className="font-mono font-semibold sm:hidden">Guia</span>
          </button>

          {/* User Status / Login */}
          {user ? (
            <div className="flex items-center gap-1 bg-slate-50 border border-[#D9E2EC] rounded-lg p-1 pl-1.5 sm:pl-2">
              <span className="text-[10px] sm:text-[11px] font-mono text-slate-700 max-w-[70px] sm:max-w-[140px] truncate" title={user.email || ''}>
                {user.email?.split('@')[0]}
              </span>
              <button
                type="button"
                onClick={onLogout}
                className="p-1 text-slate-400 hover:text-rose-600 rounded transition cursor-pointer shrink-0"
                title="Desconectar"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={onOpenAuth}
              className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1.5 text-[11px] sm:text-xs font-mono font-medium text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-lg transition cursor-pointer whitespace-nowrap"
            >
              <UserIcon className="w-3.5 h-3.5 shrink-0" />
              <span>Entrar</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
