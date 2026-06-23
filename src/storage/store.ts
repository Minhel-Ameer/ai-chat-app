import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Conversation } from '../functionality/types'

interface ChatState {
  conversations: Conversation[]
  activeId: string

  loadingByConversation: Record<string, boolean>

  error: string | null

  theme: 'light' | 'dark'
  toggleTheme: () => void

  setConversations: (data: Conversation[]) => void
  setActiveId: (id: string) => void

  addConversation: (conv: Conversation) => void
  updateConversation: (conv: Conversation) => void
  deleteConversation: (id: string) => void
  editChatName: (id: string, name: string) => void

  setLoading: (value: boolean) => void
  setLoadingForConversation: (id: string, value: boolean) => void

  setError: (msg: string | null) => void
  clearError: () => void
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      conversations: [],
      activeId: '',

      loadingByConversation: {},
      error: null,

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

      deleteConversation: (id) =>
        set((state) => {
          const updated = state.conversations.filter(
            (c) => c.id !== id
          )

          const updatedLoading = { ...state.loadingByConversation }
          delete updatedLoading[id]
          return {
            conversations: updated,
            activeId:
              state.activeId === id
                ? updated[0]?.id || ''
                : state.activeId,
            loadingByConversation: updatedLoading,
          }
        }),

      editChatName: (id, title) => {
        const conversations = get().conversations.map((c) =>
          c.id === id ? { ...c, title } : c
        )

        set({ conversations })
      },

      setLoading: (_value) => {
      },

      setLoadingForConversation: (id, value) =>
        set((state) => ({
          loadingByConversation: {
            ...state.loadingByConversation,
            [id]: value,
          },
        })),

      setError: (msg) => set({ error: msg }),
      clearError: () => set({ error: null }),
    }),
    {
      name: 'chat-store',

      partialize: (state) => ({
        conversations: state.conversations,
        activeId: state.activeId,
        theme: state.theme,
        loadingByConversation: state.loadingByConversation,
      }),
    }
  )
)