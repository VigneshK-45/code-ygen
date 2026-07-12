import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { PageId } from './types';

interface AppState {
  loggedIn: boolean;
  login: () => void;
  logout: () => void;
  page: PageId;
  setPage: (p: PageId) => void;
  dark: boolean;
  toggleDark: () => void;
  sidebarOpen: boolean;
  setSidebarOpen: (v: boolean) => void;
}

const Ctx = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [page, setPage] = useState<PageId>('dashboard');
  const [dark, setDark] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add('dark');
    else root.classList.remove('dark');
  }, [dark]);

  return (
    <Ctx.Provider
      value={{
        loggedIn,
        login: () => setLoggedIn(true),
        logout: () => {
          setLoggedIn(false);
          setPage('dashboard');
        },
        page,
        setPage: (p) => {
          setPage(p);
          setSidebarOpen(false);
        },
        dark,
        toggleDark: () => setDark((d) => !d),
        sidebarOpen,
        setSidebarOpen,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useApp() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
