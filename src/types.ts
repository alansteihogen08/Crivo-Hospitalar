export type SeverityLevel = 'critico' | 'atencao' | 'informativo';

export interface RenalRange {
  min: number;
  max: number;
  dose: string;
  note?: string;
}

export interface DialysisDose {
  hd?: string;
  cvvh?: string;
  cvvhd?: string;
  cvvhdf?: string;
  [key: string]: string | undefined;
}

export interface MaxDose {
  value: string;
  note?: string;
}

export interface Drug {
  name: string;
  tags: string[];
  renal?: RenalRange[];
  requiresRenalAdjustment?: boolean;
  dialysis?: string | DialysisDose;
  effects?: string[];
  monitor?: string[];
  food?: string[];
  maxDose?: MaxDose;
}

export interface ClinicalFinding {
  key: string;
  severity: SeverityLevel;
  drugs: string;
  text: string;
  ctxNote?: string;
  ctxIndication?: string;
}

export interface PatientContext {
  setorId: string;
  leito: string;
  pacienteIniciais: string;
  idade: number | null;
  peso: number | null;
  sexo: 'm' | 'f' | '';
  creatinina: number | null;
  clcr: number | null;
  clcrManual: boolean;
  emVM: boolean;
  gestacaoLactacao: '' | 'gestante' | 'lactante';
  dialise: '' | 'hd' | 'cvvh' | 'cvvhd' | 'cvvhdf';
  ctxNota: string;
  indications: string[];
}

export interface EvolucaoEntry {
  id: string;
  ts: number;
  origin: 'auto' | 'manual';
  achado: string;
  sugestao: string;
  medicamentos: string[];
  conduta: string;
  observacao: string;
  severidade: SeverityLevel;
  iniciais: string;
  idade?: string | number;
  clcr?: string | number;
}

export interface SetorHospital {
  id: string;
  nome: string;
  ownerUid: string;
  ownerEmail: string;
  membros: string[];
  membrosEmails: string[];
  souDono: boolean;
}

export interface LeitoDocData {
  setorId: string;
  setorNome?: string;
  leito: string;
  entries: EvolucaoEntry[];
  encerrado?: boolean;
  encerradoEm?: number;
  ownerUid?: string;
  ownerEmail?: string;
}
