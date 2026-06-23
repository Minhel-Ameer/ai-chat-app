export type Role = 'user' | 'assistant'

export interface Message {
    id: string
    role: Role
    text: string
    time: number
}

export interface Conversation {
    id: string
    label: string
    messages: Message[]
    createdAt: string
    title: string
  }