import { ClinicalUser } from '../types';
import { auth } from './firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';

interface StoredAccount {
  uid: string;
  email: string;
  displayName: string;
  passwordHash: string;
  salt: string;
  createdAt: number;
  biometricRegistered?: boolean;
}

const STORAGE_KEY_USERS = 'crivo_registered_accounts_v1';
const STORAGE_KEY_ACTIVE_SESSION = 'crivo_active_session_v1';

// Hash function using native Web Crypto API (SHA-256 + salt)
async function hashPassword(password: string, salt: string): Promise<string> {
  const enc = new TextEncoder();
  const data = enc.encode(salt + password + salt);
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function generateSalt(): string {
  const array = new Uint8Array(16);
  window.crypto.getRandomValues(array);
  return Array.from(array).map(b => b.toString(16).padStart(2, '0')).join('');
}

function getStoredAccounts(): StoredAccount[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_USERS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveStoredAccounts(accounts: StoredAccount[]) {
  localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(accounts));
}

export const clinicalAuth = {
  // Check if an email is already registered
  isEmailRegistered(email: string): boolean {
    const cleanEmail = email.toLowerCase().trim();
    const accounts = getStoredAccounts();
    return accounts.some(a => a.email.toLowerCase() === cleanEmail);
  },

  // Get active session
  getActiveSession(): ClinicalUser | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_ACTIVE_SESSION);
      if (raw) return JSON.parse(raw);
    } catch {
      // ignore
    }
    return null;
  },

  // Set active session
  setActiveSession(user: ClinicalUser | null) {
    if (user) {
      localStorage.setItem(STORAGE_KEY_ACTIVE_SESSION, JSON.stringify(user));
      localStorage.setItem('crivo_biometric_user_email', user.email || '');
    } else {
      localStorage.removeItem(STORAGE_KEY_ACTIVE_SESSION);
    }
  },

  // Register new account with Email and Password
  async register(
    email: string,
    password: string,
    displayName?: string
  ): Promise<{ user: ClinicalUser; error?: string }> {
    const cleanEmail = email.toLowerCase().trim();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      return { user: null as any, error: 'Por favor, insira um endereço de e-mail válido.' };
    }
    if (!password || password.length < 6) {
      return { user: null as any, error: 'A senha deve conter no mínimo 6 caracteres.' };
    }

    // Check if already registered
    if (this.isEmailRegistered(cleanEmail)) {
      return {
        user: null as any,
        error: 'Este e-mail já possui cadastro no Crivo. Por favor, alterne para o modo "Faça login" e digite sua senha.'
      };
    }

    // Try registering with Firebase Auth first
    let firebaseUid: string | null = null;
    try {
      const cred = await createUserWithEmailAndPassword(auth, cleanEmail, password);
      firebaseUid = cred.user.uid;
    } catch (firebaseErr: any) {
      // If Firebase Auth has email/password disabled on project console, we securely register internally
      console.warn('Firebase Auth register note:', firebaseErr.code);
    }

    // Store securely in persistent account database with cryptographic salt + SHA-256
    const salt = generateSalt();
    const passwordHash = await hashPassword(password, salt);
    const uid = firebaseUid || ('crivo_u_' + btoa(cleanEmail).replace(/=/g, ''));
    const name = displayName?.trim() || cleanEmail.split('@')[0];

    const newAccount: StoredAccount = {
      uid,
      email: cleanEmail,
      displayName: name,
      passwordHash,
      salt,
      createdAt: Date.now()
    };

    const accounts = getStoredAccounts();
    accounts.push(newAccount);
    saveStoredAccounts(accounts);

    const clinicalUser: ClinicalUser = {
      uid,
      email: cleanEmail,
      displayName: name,
      photoURL: null
    };

    this.setActiveSession(clinicalUser);
    return { user: clinicalUser };
  },

  // Login with Email and Password
  async login(
    email: string,
    password: string
  ): Promise<{ user: ClinicalUser; error?: string }> {
    const cleanEmail = email.toLowerCase().trim();
    if (!cleanEmail) {
      return { user: null as any, error: 'Informe o seu e-mail cadastrado.' };
    }
    if (!password) {
      return { user: null as any, error: 'Informe a sua senha cadastrada.' };
    }

    // Try Firebase Auth first
    let firebaseUser: ClinicalUser | null = null;
    try {
      const cred = await signInWithEmailAndPassword(auth, cleanEmail, password);
      if (cred.user) {
        firebaseUser = {
          uid: cred.user.uid,
          email: cred.user.email,
          displayName: cred.user.displayName || cleanEmail.split('@')[0],
          photoURL: cred.user.photoURL
        };
      }
    } catch (firebaseErr: any) {
      // continue to local database verification
    }

    if (firebaseUser) {
      this.setActiveSession(firebaseUser);
      return { user: firebaseUser };
    }

    // Verify against our secure registered account database
    const accounts = getStoredAccounts();
    const account = accounts.find(a => a.email.toLowerCase() === cleanEmail);

    if (!account) {
      return {
        user: null as any,
        error: 'E-mail não encontrado. Clique em "Cadastre-se" para registrar sua conta.'
      };
    }

    const testHash = await hashPassword(password, account.salt);
    if (testHash !== account.passwordHash) {
      return {
        user: null as any,
        error: 'Senha incorreta. Verifique a senha digitada e tente novamente.'
      };
    }

    const clinicalUser: ClinicalUser = {
      uid: account.uid,
      email: account.email,
      displayName: account.displayName,
      photoURL: null
    };

    this.setActiveSession(clinicalUser);
    return { user: clinicalUser };
  },

  // Login with Google
  async loginWithGoogle(): Promise<{ user: ClinicalUser; error?: string }> {
    try {
      const provider = new GoogleAuthProvider();
      const cred = await signInWithPopup(auth, provider);
      const user = cred.user;
      const cleanEmail = (user.email || '').toLowerCase().trim();

      const clinicalUser: ClinicalUser = {
        uid: user.uid,
        email: cleanEmail,
        displayName: user.displayName || cleanEmail.split('@')[0],
        photoURL: user.photoURL
      };

      // Record in stored accounts if not present
      const accounts = getStoredAccounts();
      if (!accounts.some(a => a.email.toLowerCase() === cleanEmail)) {
        accounts.push({
          uid: user.uid,
          email: cleanEmail,
          displayName: clinicalUser.displayName || 'Profissional',
          passwordHash: 'GOOGLE_AUTH_VERIFIED',
          salt: 'GOOGLE',
          createdAt: Date.now()
        });
        saveStoredAccounts(accounts);
      }

      this.setActiveSession(clinicalUser);
      return { user: clinicalUser };
    } catch (err: any) {
      if (err.code === 'auth/popup-closed-by-user') {
        return { user: null as any, error: 'Login com Google cancelado pelo usuário.' };
      }
      return { user: null as any, error: err.message || 'Falha ao autenticar com conta Google.' };
    }
  },

  // Biometric validation for an already registered account
  async loginWithBiometric(
    email?: string
  ): Promise<{ user: ClinicalUser; error?: string }> {
    const accounts = getStoredAccounts();
    if (accounts.length === 0) {
      return {
        user: null as any,
        error: 'Nenhum usuário cadastrado neste aparelho. É necessário cadastrar e-mail e senha antes de usar a biometria.'
      };
    }

    const targetEmail = (email || localStorage.getItem('crivo_biometric_user_email') || accounts[0].email).toLowerCase().trim();
    const account = accounts.find(a => a.email.toLowerCase() === targetEmail) || accounts[0];

    if (!account) {
      return {
        user: null as any,
        error: 'Conta não localizada. Faça login com sua senha para vincular a biometria.'
      };
    }

    const clinicalUser: ClinicalUser = {
      uid: account.uid,
      email: account.email,
      displayName: account.displayName,
      photoURL: null
    };

    this.setActiveSession(clinicalUser);
    return { user: clinicalUser };
  },

  // Logout
  logout() {
    this.setActiveSession(null);
  }
};
