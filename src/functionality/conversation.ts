import type { Conversation, Message } from './types';

export const createConversation = () => {
    return {
      id: crypto.randomUUID(),
      title: 'New Chat',
      messages: [],
      createdAt: new Date().toISOString(),
      label: '',
    }
  }

  export const addMessage = (
    conversation: Conversation,
    message: Message
  ): Conversation => {
    return {
      ...conversation,
      messages: [...conversation.messages, message],
    }
  }


  export const updateConversation = (
    conversation: Conversation,
    updates: Partial<Conversation>
  ): Conversation => {
    return {
      ...conversation,
      ...updates,
    }
  }
