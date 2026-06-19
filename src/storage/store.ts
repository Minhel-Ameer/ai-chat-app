import { create } from 'zustand';
import type { Conversation  } from '../functionality/types';

interface ChatState {
    conversations: Conversation[]
    activeId: string
  
    loading: boolean
    error: string | null

    theme: 'light' | 'dark'
    toggleTheme: () => void
  
    setConversations: (data: Conversation[]) => void
    setActiveId: (id: string) => void
  
    addConversation: (conv: Conversation) => void
    updateConversation: (conv: Conversation) => void
  
    setLoading: (value: boolean) => void
    setError: (msg: string | null) => void
    
  }

  export const useChatStore = create<ChatState>((set, get) => ({
    conversations: [],
    activeId: '',
  
    loading: false,
    error: null,
  
    // 🌗 THEME STATE
    theme: 'light',
  
    toggleTheme: () =>
      set((state) => ({
        theme: state.theme === 'light' ? 'dark' : 'light',
      })),
  
    setConversations: (data) =>
      set({ conversations: data }),
  
    setActiveId: (id) =>
      set({ activeId: id }),
  
    addConversation: (conv) =>
      set({
        conversations: [conv, ...get().conversations],
      }),
  
    updateConversation: (conv) =>
      set({
        conversations: get().conversations.map((c) =>
          c.id === conv.id ? conv : c
        ),
      }),
  
    setLoading: (value) => set({ loading: value }),
    setError: (msg) => set({ error: msg }),

  }))