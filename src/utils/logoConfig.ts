export interface LogoConfig {
  crossColor: string;
  crossFill?: string;
  capsuleLeftColor: string;
  capsuleRightColor: string;
  documentBg: string;
  strokeWidth: number;
  cornerRadius: number; // 0 for sharp, 1 for standard, 2 for extra round
  capsuleAngle: number;
}

export const DEFAULT_LOGO_CONFIG: LogoConfig = {
  crossColor: 'auto', // matches variant: #0B1F3A on light, #FFFFFF on dark
  crossFill: 'auto', // subtle tint to prevent washing out on white
  capsuleLeftColor: '#E11D48',
  capsuleRightColor: '#FACC15',
  documentBg: 'auto',
  strokeWidth: 11,
  cornerRadius: 1,
  capsuleAngle: -40,
};

const STORAGE_KEY = 'crivo_custom_logo_config';

export function getSavedLogoConfig(): LogoConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return { ...DEFAULT_LOGO_CONFIG, ...JSON.parse(raw) };
    }
  } catch {
    // fallback
  }
  return DEFAULT_LOGO_CONFIG;
}

export function saveLogoConfig(config: LogoConfig) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    window.dispatchEvent(new Event('crivo_logo_config_changed'));
  } catch {
    // fallback
  }
}
