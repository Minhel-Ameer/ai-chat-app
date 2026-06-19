import type { Conversation } from '../functionality/types';

const KEY = 'chat_messages'

export const loadConversations = (): Conversation[] => {
  const data = localStorage.getItem(KEY)

  if (!data) return []

  try {
    const parsed = JSON.parse(data);
    return parsed.conversations || [];
  } catch (err) {
    console.error('Storage parse error:', err);
    return []
  }
};

export const saveConversations = (conversations: Conversation[]) => {
  try {
    localStorage.setItem(
      KEY,
      JSON.stringify({ conversations })
    )
  } catch (error) {
    console.error('Failed to save conversations:', error);
  }
}