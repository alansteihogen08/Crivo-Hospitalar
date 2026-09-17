import React, { useState } from 'react';
import { X, RotateCcw, Check, Sparkles, Palette } from 'lucide-react';
import { CrivoLogo } from './CrivoLogo';
import {
  LogoConfig,
  DEFAULT_LOGO_CONFIG,
  getSavedLogoConfig,
  saveLogoConfig
} from '../utils/logoConfig';

interface LogoCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LogoCustomizerModal: React.FC<LogoCustomizerModalProps> = ({ isOpen, onClose }) => {
  const [config, setConfig] = useState<LogoConfig>(() => getSavedLogoConfig());

  if (!isOpen) return null;

  const crossColors = [
    { label: 'Automático', value: 'auto', color: '#0B1F3A' },
    { label: 'Azul Marinho', value: '#0B1F3A', color: '#0B1F3A' },
    { label: 'Branco Puro', value: '#FFFFFF', color: '#FFFFFF' },
    { label: 'Teal Hospitalar', value: '#0D9488', color: '#0D9488' },
    { label: 'Azul Cirúrgico', value: '#0A7EA4', color: '#0A7EA4' },
    { label: 'Verde Clínico', value: '#1A6B4A', color: '#1A6B4A' },
    { label: 'Rubi', value: '#DC2626', color: '#DC2626' },
  ];

  const capsuleLeftColors = [
    { label: 'Vermelho Hospitalar', value: '#E11D48', color: '#E11D48' },
    { label: 'Carmim Intenso', value: '#DC2626', color: '#DC2626' },
    { label: 'Coral Vivo', value: '#F43F5E', color: '#F43F5E' },
    { label: 'Púrpura / UTI', value: '#7C3AED', color: '#7C3AED' },
    { label: 'Azul Cobalto', value: '#2563EB', color: '#2563EB' },
    { label: 'Teal Escuro', value: '#0F766E', color: '#0F766E' },
  ];

  const capsuleRightColors = [
    { label: 'Amarelo Farmacêutico', value: '#FACC15', color: '#FACC15' },
    { label: 'Âmbar Clínico', value: '#F59E0B', color: '#F59E0B' },
    { label: 'Dourado', value: '#EAB308', color: '#EAB308' },
    { label: 'Ciano Suave', value: '#38BDF8', color: '#38BDF8' },
    { label: 'Lima Suave', value: '#A3E635', color: '#A3E635' },
    { label: 'Branco Cápsula', value: '#FFFFFF', color: '#FFFFFF' },
  ];

  const handleSave = () => {
    saveLogoConfig(config);
    onClose();
  };

  const handleReset = () => {
    setConfig(DEFAULT_LOGO_CONFIG);
    saveLogoConfig(DEFAULT_LOGO_CONFIG);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in font-sans">
      <div className="bg-white text-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 relative max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700">
              <Palette className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-['Syne',sans-serif] text-slate-900">
                Personalizar Cores e Formato do Logo
              </h2>
              <p className="text-xs text-slate-500">
                Ajuste o visual do logotipo oficial do Crivo
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Preview Cards (Light and Dark) */}
        <div className="my-5 p-4 bg-slate-50 border border-slate-200/80 rounded-2xl">
          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold mb-3">
            Pré-visualização em Tempo Real
          </div>
          <div className="grid grid-cols-2 gap-3">
            {/* Light Mode Preview */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center shadow-xs">
              <CrivoLogo size={60} variant="light" customConfig={config} />
              <span className="text-[11px] font-mono text-slate-500 mt-2 font-medium">
                Fundo Claro
              </span>
            </div>

            {/* Dark Mode Preview */}
            <div className="bg-[#0B1F3A] border border-slate-800 rounded-xl p-4 flex flex-col items-center justify-center shadow-xs">
              <CrivoLogo size={60} variant="dark" customConfig={config} />
              <span className="text-[11px] font-mono text-slate-300 mt-2 font-medium">
                Fundo Escuro
              </span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-5 text-sm">
          {/* 1. Formato dos Cantos da Cruz */}
          <div>
            <label className="block text-xs font-bold font-mono text-slate-700 uppercase tracking-wide mb-2">
              Formato dos Cantos da Cruz
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 1, label: 'Arredondado (Padrão)' },
                { id: 2, label: 'Extra Curvo (Pill)' },
                { id: 0, label: 'Reto Cirúrgico' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setConfig({ ...config, cornerRadius: opt.id })}
                  className={`py-2 px-2.5 text-xs font-mono font-medium rounded-xl border transition text-center cursor-pointer ${
                    config.cornerRadius === opt.id
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Cor do Contorno da Cruz */}
          <div>
            <label className="block text-xs font-bold font-mono text-slate-700 uppercase tracking-wide mb-2">
              Cor do Contorno da Cruz
            </label>
            <div className="flex flex-wrap gap-2">
              {crossColors.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setConfig({ ...config, crossColor: c.value })}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-mono cursor-pointer transition ${
                    config.crossColor === c.value
                      ? 'border-slate-900 bg-slate-100 font-bold'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-slate-300"
                    style={{ backgroundColor: c.color }}
                  />
                  <span>{c.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 2.1 Preenchimento do Fundo da Cruz (Evita ficar branco no branco) */}
          <div>
            <label className="block text-xs font-bold font-mono text-slate-700 uppercase tracking-wide mb-2">
              Fundo / Preenchimento da Cruz Médica
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'auto', label: 'Suave (Recomendado)', desc: 'Contraste sutil' },
                { id: 'none', label: 'Transparente', desc: 'Apenas contorno' },
                { id: 'rgba(10, 126, 164, 0.09)', label: 'Azul Glacial', desc: 'Tom hospitalar' },
                { id: 'rgba(26, 107, 74, 0.09)', label: 'Verde Clínico', desc: 'Tom cirúrgico' },
              ].map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setConfig({ ...config, crossFill: f.id })}
                  className={`p-2 rounded-xl border text-left cursor-pointer transition ${
                    (config.crossFill || 'auto') === f.id
                      ? 'border-teal-600 bg-teal-50/60 font-bold'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="text-xs font-mono text-slate-900">{f.label}</div>
                  <div className="text-[10px] text-slate-500">{f.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Cor da Metade Esquerda da Cápsula */}
          <div>
            <label className="block text-xs font-bold font-mono text-slate-700 uppercase tracking-wide mb-2">
              Cor da Metade Esquerda (Cápsula)
            </label>
            <div className="flex flex-wrap gap-2">
              {capsuleLeftColors.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setConfig({ ...config, capsuleLeftColor: c.value })}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-mono cursor-pointer transition ${
                    config.capsuleLeftColor === c.value
                      ? 'border-slate-900 bg-slate-100 font-bold'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-slate-300"
                    style={{ backgroundColor: c.color }}
                  />
                  <span>{c.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 4. Cor da Metade Direita da Cápsula */}
          <div>
            <label className="block text-xs font-bold font-mono text-slate-700 uppercase tracking-wide mb-2">
              Cor da Metade Direita (Cápsula)
            </label>
            <div className="flex flex-wrap gap-2">
              {capsuleRightColors.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setConfig({ ...config, capsuleRightColor: c.value })}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-mono cursor-pointer transition ${
                    config.capsuleRightColor === c.value
                      ? 'border-slate-900 bg-slate-100 font-bold'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-slate-300"
                    style={{ backgroundColor: c.color }}
                  />
                  <span>{c.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 5. Inclinação e Espessura */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold font-mono text-slate-700 uppercase tracking-wide mb-1.5">
                Inclinação da Cápsula: {config.capsuleAngle}°
              </label>
              <input
                type="range"
                min="-60"
                max="45"
                step="5"
                value={config.capsuleAngle}
                onChange={(e) =>
                  setConfig({ ...config, capsuleAngle: Number(e.target.value) })
                }
                className="w-full accent-teal-600"
              />
            </div>
            <div>
              <label className="block text-xs font-bold font-mono text-slate-700 uppercase tracking-wide mb-1.5">
                Espessura do Traço: {config.strokeWidth}px
              </label>
              <input
                type="range"
                min="7"
                max="14"
                step="1"
                value={config.strokeWidth}
                onChange={(e) =>
                  setConfig({ ...config, strokeWidth: Number(e.target.value) })
                }
                className="w-full accent-teal-600"
              />
            </div>
          </div>
        </div>

        {/* Actions Footer */}
        <div className="mt-7 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-mono text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restaurar Padrão</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-mono font-medium text-slate-600 hover:text-slate-900 transition cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="flex items-center gap-1.5 px-5 py-2.5 bg-[#0B1F3A] hover:bg-slate-800 text-white text-xs font-mono font-bold rounded-xl shadow-md transition cursor-pointer"
            >
              <Check className="w-4 h-4 text-teal-400" />
              <span>Salvar Alterações</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
