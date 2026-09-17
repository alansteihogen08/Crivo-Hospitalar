import React, { useState, useEffect, useMemo } from 'react';
import {
  ClipboardList,
  Layers,
  RotateCcw,
  CheckCircle2,
  Activity
} from 'lucide-react';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { auth, crivoFirestore } from './services/firebase';
import { Header } from './components/Header';
import { AuthModal } from './components/AuthModal';
import { LandingPage } from './components/LandingPage';
import { BiometricModal } from './components/BiometricModal';
import { PatientContextForm } from './components/PatientContextForm';
import { DrugSelector } from './components/DrugSelector';
import { DrugDetailsList } from './components/DrugDetailsList';
import { ChecklistClinico } from './components/ChecklistClinico';
import { SafetyAlerts } from './components/SafetyAlerts';
import { PatientEvolutionTimeline } from './components/PatientEvolutionTimeline';
import { SectorAuditView } from './components/SectorAuditView';
import { SectorManagerView } from './components/SectorManagerView';
import { DrugCatalogModal } from './components/DrugCatalogModal';
import { LogoCustomizerModal } from './components/LogoCustomizerModal';
import { PatientContext, SetorHospital, EvolucaoEntry, ClinicalFinding } from './types';
import { computeFindings } from './services/clinicalEngine';
import { DRUGS } from './data/drugs';

type ActiveTab = 'triagem' | 'consulta' | 'setores';
type ViewMode = 'landing' | 'app';

const initialPatientCtx: PatientContext = {
  setorId: '',
  leito: '',
  pacienteIniciais: '',
  idade: null,
  peso: null,
  sexo: '',
  creatinina: null,
  clcr: null,
  clcrManual: false,
  emVM: false,
  gestacaoLactacao: '',
  dialise: '',
  ctxNota: '',
  indications: [],
};

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('landing');
  const [activeTab, setActiveTab] = useState<ActiveTab>('triagem');
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isBiometricModalOpen, setIsBiometricModalOpen] = useState(false);
  const [isCatalogModalOpen, setIsCatalogModalOpen] = useState(false);
  const [isLogoCustomizerOpen, setIsLogoCustomizerOpen] = useState(false);

  // Sectors & Patient state
  const [setores, setSetores] = useState<SetorHospital[]>([]);
  const [patientCtx, setPatientCtx] = useState<PatientContext>(initialPatientCtx);
  const [selectedDrugIds, setSelectedDrugIds] = useState<string[]>([]);
  const [evolutionEntries, setEvolutionEntries] = useState<EvolucaoEntry[]>([]);

  // UI state
  const [isSyncing, setIsSyncing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isLoadingEvolution, setIsLoadingEvolution] = useState(false);

  // Toast helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  // Auth observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await crivoFirestore.ensureUsuarioDoc(currentUser);
      }
      refreshSetores();
    });
    return () => unsubscribe();
  }, []);

  const refreshSetores = async () => {
    setIsSyncing(true);
    const list = await crivoFirestore.getSetores();
    setSetores(list);
    setIsSyncing(false);
  };

  // Current sector object
  const currentSetorObj = useMemo(() => {
    return setores.find((s) => s.id === patientCtx.setorId) || null;
  }, [setores, patientCtx.setorId]);

  // Real-time clinical findings computation
  const currentFindings = useMemo<ClinicalFinding[]>(() => {
    return computeFindings(selectedDrugIds, patientCtx);
  }, [selectedDrugIds, patientCtx]);

  // Load evolution history when sector or bed changes
  useEffect(() => {
    const loadEvolution = async () => {
      if (!patientCtx.setorId || !patientCtx.leito) {
        setEvolutionEntries([]);
        return;
      }
      setIsLoadingEvolution(true);
      const entries = await crivoFirestore.getEvolucoes(patientCtx.setorId, patientCtx.leito);
      setEvolutionEntries(entries);
      setIsLoadingEvolution(false);
    };

    loadEvolution();
  }, [patientCtx.setorId, patientCtx.leito]);

  // Register new evolution entry
  const handleRegisterEvolution = async (conduta: string, observacao: string) => {
    if (!patientCtx.setorId || !patientCtx.leito) {
      showToast('Selecione o setor e informe o leito.');
      return;
    }

    const setorNome = currentSetorObj ? currentSetorObj.nome : '';
    const achadoStr = currentFindings.map((f) => f.drugs).join(' | ');
    const sugestaoStr = currentFindings.map((f) => f.text).join('\n\n');
    const severidade = currentFindings.length ? currentFindings[0].severity : 'informativo';
    const medicamentos = selectedDrugIds.map((id) => DRUGS[id]?.name).filter(Boolean);

    const newEntry: EvolucaoEntry = {
      id: `${Date.now()}`,
      ts: Date.now(),
      origin: currentFindings.length ? 'auto' : 'manual',
      achado: achadoStr,
      sugestao: sugestaoStr,
      medicamentos,
      conduta: conduta.trim(),
      observacao: observacao.trim(),
      severidade,
      iniciais: patientCtx.pacienteIniciais.trim(),
      idade: patientCtx.idade ?? '',
      clcr: patientCtx.clcr ?? '',
    };

    const updated = [...evolutionEntries, newEntry];
    setEvolutionEntries(updated);

    const ok = await crivoFirestore.saveEvolucoes(
      patientCtx.setorId,
      setorNome,
      patientCtx.leito,
      updated
    );

    if (ok) {
      showToast('Evolução clínica registrada com sucesso.');
    } else {
      showToast(`Salvo na sessão local (${crivoFirestore.lastError || 'sincronizado'})`);
    }
  };

  // Encerrar leito / Alta do paciente
  const handleEncerrarLeito = async () => {
    if (!patientCtx.setorId || !patientCtx.leito) return;
    if (
      !confirm(
        `Encerrar este leito (${patientCtx.leito})? O histórico atual fica arquivado e o próximo paciente nesse leito começará com a evolução zerada.`
      )
    ) {
      return;
    }

    const ok = await crivoFirestore.encerrarLeito(patientCtx.setorId, patientCtx.leito);
    if (ok) {
      showToast(`Leito ${patientCtx.leito} encerrado. Pronto para o próximo paciente.`);
      setPatientCtx((prev) => ({
        ...prev,
        leito: '',
        pacienteIniciais: '',
      }));
      setEvolutionEntries([]);
    } else {
      showToast(`Erro ao encerrar: ${crivoFirestore.lastError}`);
    }
  };

  // Limpar formulário de triagem
  const handleClearForm = () => {
    if (
      selectedDrugIds.length > 0 &&
      !confirm('Deseja limpar todos os dados do paciente e medicamentos da prescrição?')
    ) {
      return;
    }
    setPatientCtx(initialPatientCtx);
    setSelectedDrugIds([]);
    setEvolutionEntries([]);
    showToast('Formulário de triagem reiniciado.');
  };

  // Open bed directly from sector audit view
  const handleOpenBedInTriage = (setorId: string, leito: string, initials?: string) => {
    setPatientCtx((prev) => ({
      ...prev,
      setorId,
      leito,
      pacienteIniciais: initials || prev.pacienteIniciais,
    }));
    setActiveTab('triagem');
    showToast(`Carregado: ${leito}`);
  };

  // If in Landing mode, render the Landing Page
  if (viewMode === 'landing') {
    return (
      <div className="min-h-screen">
        <LandingPage
          onEnterApp={() => {
            setViewMode('app');
            showToast('Ambiente Clínico ativado.');
          }}
        />

        <DrugCatalogModal
          isOpen={isCatalogModalOpen}
          onClose={() => setIsCatalogModalOpen(false)}
          selectedDrugIds={selectedDrugIds}
          onAddDrug={(id) => {
            if (!selectedDrugIds.includes(id)) {
              setSelectedDrugIds((prev) => [...prev, id]);
              showToast(`${DRUGS[id]?.name} adicionado.`);
            }
          }}
        />

        <LogoCustomizerModal
          isOpen={isLogoCustomizerOpen}
          onClose={() => setIsLogoCustomizerOpen(false)}
        />

        {toastMessage && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-lg shadow-xl border border-slate-700 text-xs font-mono font-medium animate-fade-in flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>
    );
  }

  // Otherwise, render the Clinical Workspace ("Engineering")
  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-900 font-sans">
      {/* App Header */}
      <Header
        user={user}
        currentSetor={currentSetorObj}
        currentLeito={patientCtx.leito}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onLogout={() => {
          signOut(auth);
          setViewMode('landing');
          showToast('Sessão encerrada.');
        }}
        onOpenCatalog={() => setIsCatalogModalOpen(true)}
        onGoToLanding={() => setViewMode('landing')}
        isSyncing={isSyncing}
      />

      {/* Navigation Tabs Bar */}
      <nav className="bg-[#0B1F3A] border-b border-slate-800 text-slate-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex gap-2 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('triagem')}
            className={`py-3 px-4 text-xs font-mono font-bold tracking-wide border-b-2 whitespace-nowrap transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'triagem'
                ? 'border-teal-400 text-white bg-slate-800/60'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
            }`}
          >
            <Activity className="w-4 h-4 text-teal-400" />
            <span>Triagem e Evolução</span>
            {currentFindings.length > 0 && (
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('consulta')}
            className={`py-3 px-4 text-xs font-mono font-bold tracking-wide border-b-2 whitespace-nowrap transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'consulta'
                ? 'border-teal-400 text-white bg-slate-800/60'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
            }`}
          >
            <ClipboardList className="w-4 h-4 text-teal-400" />
            <span>Consulta por Setor</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('setores')}
            className={`py-3 px-4 text-xs font-mono font-bold tracking-wide border-b-2 whitespace-nowrap transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'setores'
                ? 'border-teal-400 text-white bg-slate-800/60'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
            }`}
          >
            <Layers className="w-4 h-4 text-teal-400" />
            <span>Gerenciar Setores ({setores.length})</span>
          </button>
        </div>
      </nav>

      {/* Main Content Area - max-w-[720px] to match original screenshot proportions */}
      <main className="flex-1 max-w-[720px] w-full mx-auto px-4 py-6">
        {/* TAB 1: TRIAGEM E EVOLUÇÃO */}
        {activeTab === 'triagem' && (
          <div className="space-y-4">
            {/* Card 1: Contexto e Setor */}
            <PatientContextForm
              ctx={patientCtx}
              setores={setores}
              onChange={(updated) => setPatientCtx((prev) => ({ ...prev, ...updated }))}
              onNavigateToSetoresTab={() => setActiveTab('setores')}
            />

            {/* Card 2: Medicamentos da Prescrição */}
            <DrugSelector
              selectedDrugIds={selectedDrugIds}
              currentFindings={currentFindings}
              patientCtx={patientCtx}
              onAddDrug={(id) => {
                if (!selectedDrugIds.includes(id)) {
                  setSelectedDrugIds((prev) => [...prev, id]);
                }
              }}
              onRemoveDrug={(id) => {
                setSelectedDrugIds((prev) => prev.filter((d) => d !== id));
              }}
              onClearAll={() => setSelectedDrugIds([])}
            />

            {/* Cards dos Medicamentos com Ajuste Renal / Posologias */}
            <DrugDetailsList
              selectedDrugIds={selectedDrugIds}
              patientCtx={patientCtx}
            />

            {/* Alertas de Segurança & Interações (Após os cards dos medicamentos) */}
            <SafetyAlerts
              findings={currentFindings}
              hasDrugs={selectedDrugIds.length > 0}
            />

            {/* Checklist Clínico: Separado dos alertas, só aparece se enoxaparina, omeprazol/pantoprazol ou corticosteroides forem selecionados */}
            <ChecklistClinico
              selectedDrugIds={selectedDrugIds}
              patientCtx={patientCtx}
            />

            {/* Clear Form Button from Screenshot 1 */}
            <button
              type="button"
              onClick={handleClearForm}
              className="w-full py-2.5 bg-white border border-[#D9E2EC] hover:bg-slate-50 text-[#627D98] hover:text-slate-800 text-xs font-mono font-bold rounded-lg transition text-center shadow-xs cursor-pointer"
            >
              Limpar formulário
            </button>

            {/* Card 4: Patient Evolution Timeline (Screenshot 1) */}
            <PatientEvolutionTimeline
              entries={evolutionEntries}
              patientCtx={patientCtx}
              onRegister={handleRegisterEvolution}
              onEncerrarLeito={handleEncerrarLeito}
              onRefresh={async () => {
                if (!patientCtx.setorId || !patientCtx.leito) return;
                setIsLoadingEvolution(true);
                const entries = await crivoFirestore.getEvolucoes(
                  patientCtx.setorId,
                  patientCtx.leito
                );
                setEvolutionEntries(entries);
                setIsLoadingEvolution(false);
                showToast('Histórico atualizado.');
              }}
              isLoading={isLoadingEvolution}
            />
          </div>
        )}

        {/* TAB 2: CONSULTA POR SETOR */}
        {activeTab === 'consulta' && (
          <SectorAuditView
            setores={setores}
            selectedSetorId={patientCtx.setorId}
            onSelectSetorId={(id) => setPatientCtx((prev) => ({ ...prev, setorId: id }))}
            onOpenBedInTriage={handleOpenBedInTriage}
            onShowToast={showToast}
          />
        )}

        {/* TAB 3: GERENCIAR SETORES */}
        {activeTab === 'setores' && (
          <SectorManagerView
            setores={setores}
            onRefreshSetores={refreshSetores}
            onShowToast={showToast}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-4 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2 font-mono">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">CRIVO v2.4</span>
            <span>• Suporte à Decisão Clínica & Farmacoterapia</span>
          </div>
          <div className="text-[11px] text-slate-400">
            Fórmula Cockcroft-Gault • Critérios Beers • Guia ILAS • Tabela SOPTERJ
          </div>
        </div>
      </footer>

      {/* Modals */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={() => {
          showToast('Login efetuado com sucesso.');
          refreshSetores();
        }}
        onOpenBiometric={() => setIsBiometricModalOpen(true)}
      />

      <BiometricModal
        isOpen={isBiometricModalOpen}
        onClose={() => setIsBiometricModalOpen(false)}
        onSuccess={(email) => {
          showToast(`Biometria validada (${email}).`);
          refreshSetores();
        }}
      />

      <DrugCatalogModal
        isOpen={isCatalogModalOpen}
        onClose={() => setIsCatalogModalOpen(false)}
        selectedDrugIds={selectedDrugIds}
        onAddDrug={(id) => {
          if (!selectedDrugIds.includes(id)) {
            setSelectedDrugIds((prev) => [...prev, id]);
            showToast(`${DRUGS[id]?.name} adicionado à prescrição.`);
          }
        }}
      />

      <LogoCustomizerModal
        isOpen={isLogoCustomizerOpen}
        onClose={() => setIsLogoCustomizerOpen(false)}
      />

      {/* Global Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-lg shadow-xl border border-slate-700 text-xs font-mono font-medium animate-fade-in flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

