import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  addDoc,
  deleteDoc,
  updateDoc,
  collection,
  getDocs,
  query,
  where,
  arrayUnion,
  arrayRemove
} from 'firebase/firestore';
import { EvolucaoEntry, LeitoDocData, SetorHospital } from '../types';
import firebaseAppletConfig from '../../firebase-applet-config.json';

const app = !getApps().length ? initializeApp(firebaseAppletConfig) : getApp();
export const auth = getAuth(app);
export const db = (firebaseAppletConfig as any).firestoreDatabaseId
  ? getFirestore(app, (firebaseAppletConfig as any).firestoreDatabaseId)
  : getFirestore(app);

// User-scoped storage helpers
const LOCAL_EVOLUCOES_KEY = 'crivo_local_evolucoes';

// Purge legacy shared key if present to prevent cross-account contamination
try {
  if (typeof window !== 'undefined' && window.localStorage) {
    window.localStorage.removeItem('crivo_local_setores');
  }
} catch {
  // ignore
}

function getUserLocalSetoresKey(email: string): string {
  const clean = (email || '').toLowerCase().trim().replace(/[^a-z0-9]/g, '_');
  return `crivo_user_setores_${clean}`;
}

function getLocalSetores(email?: string): SetorHospital[] {
  if (!email) return [];
  try {
    const key = getUserLocalSetoresKey(email);
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalSetores(email: string, setores: SetorHospital[]) {
  if (!email) return;
  try {
    const key = getUserLocalSetoresKey(email);
    localStorage.setItem(key, JSON.stringify(setores));
  } catch (e) {
    console.warn('LocalStorage error:', e);
  }
}

function getLocalEvolucoes(key: string): EvolucaoEntry[] {
  try {
    const raw = localStorage.getItem(`${LOCAL_EVOLUCOES_KEY}_${key}`);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalEvolucoes(key: string, entries: EvolucaoEntry[]) {
  try {
    localStorage.setItem(`${LOCAL_EVOLUCOES_KEY}_${key}`, JSON.stringify(entries));
  } catch (e) {
    console.warn('LocalStorage error:', e);
  }
}

export const crivoFirestore = {
  lastError: '',

  setError(error: any) {
    this.lastError = error?.message || 'Falha de comunicação com o servidor.';
    console.warn('Firestore notice:', error);
  },

  clearError() {
    this.lastError = '';
  },

  slugLeito(leito: string) {
    return String(leito).trim().toLowerCase().replace(/\s+/g, '_');
  },

  docIdEvolucao(setorId: string, leito: string, episodio: string) {
    const base = `${setorId}_${this.slugLeito(leito)}`;
    return episodio ? `${base}__${episodio}` : base;
  },

  async getEpisodioAtivo(setorId: string, leito: string): Promise<string> {
    try {
      const ref = doc(db, "leitos_ativos", `${setorId}_${this.slugLeito(leito)}`);
      const snap = await getDoc(ref);
      return snap.exists() ? (snap.data().episodioAtual || '') : '';
    } catch (e) {
      const localEp = localStorage.getItem(`crivo_ep_${setorId}_${this.slugLeito(leito)}`);
      return localEp || '';
    }
  },

  getActiveUser(providedUser?: any): { uid: string; email: string } {
    if (providedUser?.email) {
      return {
        uid: providedUser.uid || '',
        email: String(providedUser.email).toLowerCase().trim()
      };
    }
    try {
      const raw = localStorage.getItem('crivo_active_session_v1');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.email) {
          return {
            uid: parsed.uid || '',
            email: String(parsed.email).toLowerCase().trim()
          };
        }
      }
    } catch {
      // ignore
    }
    if (auth.currentUser?.email) {
      return {
        uid: auth.currentUser.uid,
        email: String(auth.currentUser.email).toLowerCase().trim()
      };
    }
    return { uid: '', email: '' };
  },

  async getSetores(activeUser?: any): Promise<SetorHospital[]> {
    this.clearError();
    const user = this.getActiveUser(activeUser);
    const emailNorm = user.email;
    const uid = user.uid;

    if (!emailNorm) {
      return [];
    }

    try {
      const colRef = collection(db, "setores_hospital");
      const snap = await getDocs(colRef);
      const map = new Map<string, SetorHospital>();

      snap.forEach(d => {
        const data = d.data();
        const sOwnerUid = data.ownerUid || '';
        const sOwnerEmail = (data.ownerEmail || '').toLowerCase().trim();
        const sMembros: string[] = Array.isArray(data.membros) ? data.membros : [];
        const sMembrosEmails: string[] = Array.isArray(data.membrosEmails)
          ? data.membrosEmails.map((e: string) => String(e).toLowerCase().trim())
          : [];

        // Strict ownership check
        const isOwner = Boolean(
          (uid && sOwnerUid && sOwnerUid === uid) ||
          (emailNorm && sOwnerEmail && sOwnerEmail === emailNorm)
        );

        // Strict collaborator check
        const isMember = Boolean(
          (uid && sMembros.includes(uid)) ||
          (emailNorm && sMembrosEmails.includes(emailNorm))
        );

        // Include ONLY if this user is the owner or an authorized member
        if (isOwner || isMember) {
          map.set(d.id, {
            id: d.id,
            nome: data.nome || 'Setor',
            ownerUid: sOwnerUid,
            ownerEmail: sOwnerEmail,
            membros: sMembros,
            membrosEmails: sMembrosEmails,
            souDono: isOwner
          });
        }
      });

      // Merge with user-scoped local storage cache for offline created sectors
      const localList = getLocalSetores(emailNorm);
      localList.forEach(l => {
        if (!map.has(l.id)) {
          const lOwnerEmail = (l.ownerEmail || '').toLowerCase().trim();
          const lMembrosEmails = (l.membrosEmails || []).map(e => e.toLowerCase().trim());
          const isOwner = Boolean((uid && l.ownerUid === uid) || (emailNorm && lOwnerEmail === emailNorm));
          const isMember = Boolean(emailNorm && lMembrosEmails.includes(emailNorm));
          if (isOwner || isMember) {
            map.set(l.id, {
              ...l,
              souDono: isOwner
            });
          }
        }
      });

      const list = [...map.values()].sort((a, b) => (a.nome || '').localeCompare(b.nome || ''));
      saveLocalSetores(emailNorm, list);
      return list;
    } catch (e) {
      this.setError(e);
      console.warn('getSetores Firestore fallback to user local cache:', e);
      return getLocalSetores(emailNorm);
    }
  },

  async criarSetor(nome: string, activeUser?: any): Promise<string | null> {
    this.clearError();
    const trimmed = nome.trim();
    if (!trimmed) return null;
    const user = this.getActiveUser(activeUser);
    const emailNorm = user.email;
    const uid = user.uid || (emailNorm ? 'u_' + btoa(emailNorm).replace(/=/g, '') : '');

    if (!emailNorm) {
      this.lastError = 'É necessário estar autenticado para criar um setor.';
      return null;
    }

    try {
      const ref = await addDoc(collection(db, "setores_hospital"), {
        nome: trimmed,
        ownerUid: uid,
        ownerEmail: emailNorm,
        membros: [],
        membrosEmails: [],
        createdAt: new Date().toISOString()
      });

      const newSetor: SetorHospital = {
        id: ref.id,
        nome: trimmed,
        ownerUid: uid,
        ownerEmail: emailNorm,
        membros: [],
        membrosEmails: [],
        souDono: true
      };
      const list = getLocalSetores(emailNorm);
      list.push(newSetor);
      saveLocalSetores(emailNorm, list);
      return ref.id;
    } catch (e) {
      this.setError(e);
      const list = getLocalSetores(emailNorm);
      const id = `local_${Date.now()}`;
      list.push({
        id,
        nome: trimmed,
        ownerUid: uid,
        ownerEmail: emailNorm,
        membros: [],
        membrosEmails: [],
        souDono: true
      });
      saveLocalSetores(emailNorm, list);
      return id;
    }
  },

  async excluirSetor(setorId: string, activeUser?: any): Promise<boolean> {
    this.clearError();
    const user = this.getActiveUser(activeUser);
    try {
      await deleteDoc(doc(db, "setores_hospital", setorId));
    } catch (e) {
      console.warn('Delete cloud sector error:', e);
    }
    if (user.email) {
      const list = getLocalSetores(user.email).filter(s => s.id !== setorId);
      saveLocalSetores(user.email, list);
    }
    return true;
  },

  async compartilharSetor(setorId: string, email: string, activeUser?: any): Promise<boolean> {
    this.clearError();
    const emailNorm = email.trim().toLowerCase();
    const user = this.getActiveUser(activeUser);
    if (!emailNorm || !emailNorm.includes('@')) {
      this.lastError = 'Informe um endereço de e-mail válido.';
      return false;
    }

    try {
      // 1. Look up if user already exists in usuarios
      let targetUid = '';
      try {
        const q = query(collection(db, "usuarios"), where("email", "==", emailNorm));
        const snap = await getDocs(q);
        if (!snap.empty) {
          targetUid = snap.docs[0].id;
        }
      } catch (err) {
        console.warn('usuarios lookup notice:', err);
      }

      // 2. Persist directly in Firestore collection
      const sectorRef = doc(db, "setores_hospital", setorId);
      const updates: any = {
        membrosEmails: arrayUnion(emailNorm)
      };
      if (targetUid) {
        updates.membros = arrayUnion(targetUid);
      }
      await updateDoc(sectorRef, updates);

      // 3. Update local cache for active user
      if (user.email) {
        const list = getLocalSetores(user.email);
        const item = list.find(s => s.id === setorId);
        if (item) {
          if (!item.membrosEmails) item.membrosEmails = [];
          if (!item.membrosEmails.includes(emailNorm)) item.membrosEmails.push(emailNorm);
          if (targetUid) {
            if (!item.membros) item.membros = [];
            if (!item.membros.includes(targetUid)) item.membros.push(targetUid);
          }
          saveLocalSetores(user.email, list);
        }
      }
      return true;
    } catch (e) {
      this.setError(e);
      // Fallback local update
      if (user.email) {
        const list = getLocalSetores(user.email);
        const item = list.find(s => s.id === setorId);
        if (item) {
          if (!item.membrosEmails) item.membrosEmails = [];
          if (!item.membrosEmails.includes(emailNorm)) item.membrosEmails.push(emailNorm);
          saveLocalSetores(user.email, list);
          return true;
        }
      }
      return false;
    }
  },

  async removerMembro(setorId: string, uid: string, email: string, activeUser?: any): Promise<boolean> {
    this.clearError();
    const emailNorm = email.trim().toLowerCase();
    const user = this.getActiveUser(activeUser);
    try {
      const sectorRef = doc(db, "setores_hospital", setorId);
      const updates: any = {
        membrosEmails: arrayRemove(emailNorm)
      };
      if (uid) {
        updates.membros = arrayRemove(uid);
      }
      await updateDoc(sectorRef, updates);
    } catch (e) {
      console.warn('Remove member remote error:', e);
    }
    if (user.email) {
      const list = getLocalSetores(user.email);
      const item = list.find(s => s.id === setorId);
      if (item && item.membrosEmails) {
        item.membrosEmails = item.membrosEmails.filter(e => e.toLowerCase().trim() !== emailNorm);
        if (uid && item.membros) {
          item.membros = item.membros.filter(u => u !== uid);
        }
        saveLocalSetores(user.email, list);
      }
    }
    return true;
  },

  async getEvolucoes(setorId: string, leito: string): Promise<EvolucaoEntry[]> {
    this.clearError();
    if (!setorId || !leito) return [];
    try {
      const episodio = await this.getEpisodioAtivo(setorId, leito);
      const docId = this.docIdEvolucao(setorId, leito, episodio);
      const ref = doc(db, "evolucoes_setores", docId);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data();
        const entries = data.entries || [];
        saveLocalEvolucoes(docId, entries);
        return entries;
      }
      return getLocalEvolucoes(docId);
    } catch (e) {
      this.setError(e);
      const docId = `${setorId}_${this.slugLeito(leito)}`;
      return getLocalEvolucoes(docId);
    }
  },

  async saveEvolucoes(
    setorId: string,
    setorNome: string,
    leito: string,
    entries: EvolucaoEntry[]
  ): Promise<boolean> {
    this.clearError();
    const currentUser = auth.currentUser;
    try {
      const episodio = await this.getEpisodioAtivo(setorId, leito);
      const docId = this.docIdEvolucao(setorId, leito, episodio);
      const ref = doc(db, "evolucoes_setores", docId);
      const snap = await getDoc(ref);
      const payload: any = {
        setorId,
        setorNome,
        leito,
        entries,
        encerrado: false,
        atualizadoEm: Date.now()
      };
      if (!snap.exists() && currentUser) {
        payload.ownerUid = currentUser.uid;
        payload.ownerEmail = currentUser.email;
      }
      await setDoc(ref, payload, { merge: true });
      saveLocalEvolucoes(docId, entries);
      return true;
    } catch (e) {
      this.setError(e);
      const docId = `${setorId}_${this.slugLeito(leito)}`;
      saveLocalEvolucoes(docId, entries);
      return true;
    }
  },

  async encerrarLeito(setorId: string, leito: string): Promise<boolean> {
    this.clearError();
    const slug = this.slugLeito(leito);
    try {
      const episodioAntigo = await this.getEpisodioAtivo(setorId, leito);
      const docIdAntigo = this.docIdEvolucao(setorId, leito, episodioAntigo);
      const refAntigo = doc(db, "evolucoes_setores", docIdAntigo);
      const snapAntigo = await getDoc(refAntigo);
      if (snapAntigo.exists()) {
        await setDoc(refAntigo, { encerrado: true, encerradoEm: Date.now() }, { merge: true });
      }
      const novoEpisodio = String(Date.now());
      const refAtivo = doc(db, "leitos_ativos", `${setorId}_${slug}`);
      await setDoc(refAtivo, { setorId, leito, episodioAtual: novoEpisodio, atualizadoEm: Date.now() }, { merge: true });
      localStorage.setItem(`crivo_ep_${setorId}_${slug}`, novoEpisodio);
      return true;
    } catch (e) {
      this.setError(e);
      const novoEpisodio = String(Date.now());
      localStorage.setItem(`crivo_ep_${setorId}_${slug}`, novoEpisodio);
      return true;
    }
  },

  async getAllLeitosDoSetor(setorId: string): Promise<LeitoDocData[]> {
    this.clearError();
    if (!setorId) return [];
    try {
      const q = query(collection(db, "evolucoes_setores"), where("setorId", "==", setorId));
      const querySnapshot = await getDocs(q);
      const leitos: LeitoDocData[] = [];
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data() as LeitoDocData;
        if (!data.encerrado) {
          leitos.push(data);
        }
      });
      return leitos;
    } catch (e) {
      this.setError(e);
      // Scan localStorage for local entries of this sector
      const results: LeitoDocData[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(`${LOCAL_EVOLUCOES_KEY}_${setorId}_`)) {
          const raw = localStorage.getItem(key);
          if (raw) {
            try {
              const entries = JSON.parse(raw);
              const parts = key.replace(`${LOCAL_EVOLUCOES_KEY}_${setorId}_`, '').split('__');
              const leitoName = parts[0].replace(/_/g, ' ');
              results.push({
                setorId,
                leito: leitoName,
                entries
              });
            } catch {}
          }
        }
      }
      return results;
    }
  },

  async ensureUsuarioDoc(user: any): Promise<void> {
    if (!user) return;
    const emailNorm = (user.email || '').toLowerCase().trim();
    const uid = user.uid || (emailNorm ? 'u_' + btoa(emailNorm).replace(/=/g, '') : '');
    if (!emailNorm) return;

    try {
      const docRef = doc(db, "usuarios", uid || emailNorm);
      await setDoc(docRef, {
        uid: uid || emailNorm,
        email: emailNorm,
        displayName: user.displayName || emailNorm.split('@')[0] || 'Profissional',
        updatedAt: new Date().toISOString()
      }, { merge: true });

      if (uid) {
        const q = query(collection(db, "setores_hospital"), where("membrosEmails", "array-contains", emailNorm));
        const snap = await getDocs(q);
        const updates = snap.docs.map(d => {
          const m = d.data().membros || [];
          if (!m.includes(uid)) {
            return updateDoc(doc(db, "setores_hospital", d.id), {
              membros: arrayUnion(uid)
            });
          }
          return Promise.resolve();
        });
        await Promise.all(updates);
      }
    } catch (e) {
      console.warn('ensureUsuarioDoc notice:', e);
    }
  }
};
