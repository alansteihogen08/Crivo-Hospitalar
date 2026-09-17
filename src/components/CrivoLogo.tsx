import React, { useState, useEffect } from 'react';
import { LogoConfig, getSavedLogoConfig } from '../utils/logoConfig';

interface CrivoLogoProps {
  size?: number | string;
  className?: string;
  showText?: boolean;
  textSize?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'dark' | 'light';
  customConfig?: Partial<LogoConfig>;
}

export const CrivoLogo: React.FC<CrivoLogoProps> = ({
  size = 48,
  className = '',
  showText = false,
  textSize = 'md',
  variant = 'light',
  customConfig,
}) => {
  const [config, setConfig] = useState<LogoConfig>(() => getSavedLogoConfig());

  useEffect(() => {
    const handleConfigChange = () => {
      setConfig(getSavedLogoConfig());
    };
    window.addEventListener('crivo_logo_config_changed', handleConfigChange);
    return () => window.removeEventListener('crivo_logo_config_changed', handleConfigChange);
  }, []);

  const activeConfig: LogoConfig = {
    ...config,
    ...(customConfig || {}),
  };

  const pixelSize = typeof size === 'number' ? size : 48;

  // Determine cross stroke color
  const strokeColor =
    activeConfig.crossColor !== 'auto'
      ? activeConfig.crossColor
      : variant === 'dark'
      ? '#FFFFFF'
      : '#0B1F3A';

  // Determine cross interior fill (adds subtle body so it never washes out on white)
  const crossFill =
    activeConfig.crossFill && activeConfig.crossFill !== 'auto'
      ? activeConfig.crossFill
      : variant === 'light'
      ? 'rgba(11, 31, 58, 0.05)'
      : 'rgba(255, 255, 255, 0.08)';

  // Determine doc background
  const docBg =
    activeConfig.documentBg !== 'auto'
      ? activeConfig.documentBg
      : variant === 'dark'
      ? '#0B1528'
      : '#FFFFFF';

  // Formato / Corner curvature
  let cornerPath = '';
  if (activeConfig.cornerRadius === 0) {
    // Sharp corners
    cornerPath = `M 72 4 L 128 4 L 128 64 L 192 64 L 192 136 L 128 136 L 128 196 L 72 196 L 72 136 L 8 136 L 8 64 L 72 64 Z`;
  } else if (activeConfig.cornerRadius === 2) {
    // Extra rounded / pill style
    cornerPath = `M 72 20 C 72 6, 80 4, 100 4 C 120 4, 128 6, 128 20 L 128 64 L 172 64 C 188 64, 192 72, 192 100 C 192 128, 188 136, 172 136 L 128 136 L 128 180 C 128 194, 120 196, 100 196 C 80 196, 72 194, 72 180 L 72 136 L 28 136 C 12 136, 8 128, 8 100 C 8 72, 12 64, 28 64 L 72 64 Z`;
  } else {
    // Standard rounded (from user reference)
    cornerPath = `M 72 16 C 72 10, 78 4, 86 4 L 114 4 C 122 4, 128 10, 128 16 L 128 64 L 176 64 C 184 64, 192 72, 192 82 L 192 118 C 192 128, 184 136, 176 136 L 128 136 L 128 184 C 128 190, 122 196, 114 196 L 86 196 C 78 196, 72 190, 72 184 L 72 136 L 24 136 C 16 136, 8 128, 8 118 L 8 82 C 8 72, 16 64, 24 64 L 72 64 Z`;
  }

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <svg
        width={pixelSize}
        height={pixelSize}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-md select-none transition-all duration-300"
      >
        {/* Medical Cross Outline & Tinted Fill */}
        <path
          d={cornerPath}
          fill={crossFill}
          stroke={strokeColor}
          strokeWidth={activeConfig.strokeWidth}
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Prescription Document Sheet in Center */}
        <path
          d="M 66 56 L 112 56 L 130 74 L 130 138 C 130 144, 126 148, 120 148 L 66 148 C 60 148, 56 144, 56 138 L 56 66 C 56 60, 60 56, 66 56 Z"
          fill={docBg}
          stroke={strokeColor}
          strokeWidth="8"
          strokeLinejoin="round"
        />
        {/* Document Fold Corner */}
        <path
          d="M 112 56 L 112 74 L 130 74"
          fill="none"
          stroke={strokeColor}
          strokeWidth="7"
          strokeLinejoin="round"
        />

        {/* Document Text Lines */}
        <line
          x1="74"
          y1="82"
          x2="108"
          y2="82"
          stroke={strokeColor}
          strokeWidth="7"
          strokeLinecap="round"
        />
        <line
          x1="74"
          y1="98"
          x2="118"
          y2="98"
          stroke={strokeColor}
          strokeWidth="7"
          strokeLinecap="round"
        />
        <line
          x1="74"
          y1="114"
          x2="100"
          y2="114"
          stroke={strokeColor}
          strokeWidth="7"
          strokeLinecap="round"
        />

        {/* Customizable Pharmaceutical Capsule (no arrows, as requested) */}
        <g transform={`rotate(${activeConfig.capsuleAngle} 126 138)`}>
          {/* Left Half (Base) */}
          <rect
            x="96"
            y="120"
            width="56"
            height="28"
            rx="14"
            fill={activeConfig.capsuleLeftColor}
            stroke={strokeColor}
            strokeWidth="7"
          />
          {/* Right Half */}
          <path
            d="M 124 120 L 138 120 C 145.7 120, 152 126.3, 152 134 C 152 141.7, 145.7 148, 138 148 L 124 148 Z"
            fill={activeConfig.capsuleRightColor}
            stroke="none"
          />
          {/* Center Divider Line */}
          <line
            x1="124"
            y1="120"
            x2="124"
            y2="148"
            stroke={strokeColor}
            strokeWidth="3.5"
          />
          {/* Outer Border Stroke */}
          <rect
            x="96"
            y="120"
            width="56"
            height="28"
            rx="14"
            fill="none"
            stroke={strokeColor}
            strokeWidth="7"
          />
          {/* Highlight Shine */}
          <line
            x1="130"
            y1="125"
            x2="142"
            y2="125"
            stroke="#FFFFFF"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </g>
      </svg>

      {/* Optional Typography */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span
              className={`font-['Syne',sans-serif] font-bold tracking-tight ${
                textSize === 'sm'
                  ? 'text-lg'
                  : textSize === 'lg'
                  ? 'text-3xl'
                  : textSize === 'xl'
                  ? 'text-4xl'
                  : 'text-2xl'
              } ${variant === 'dark' ? 'text-white' : 'text-[#0B1F3A]'}`}
            >
              CRIVO
            </span>
            <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded font-semibold bg-teal-500/20 text-teal-400 border border-teal-500/40">
              Prescrição Hospitalar
            </span>
          </div>
          <span
            className={`text-xs tracking-wide ${
              variant === 'dark' ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            Suporte à Decisão Clínica & Farmacoterapia
          </span>
        </div>
      )}
    </div>
  );
};
