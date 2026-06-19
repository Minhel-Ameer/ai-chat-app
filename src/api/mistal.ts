import axios from 'axios';
import type { Message } from '../functionality/types';

const API_KEY = import.meta.env.VITE_MISTRAL_API_KEY;

const BASE_URL =
  'https://api.mistral.ai/v1/chat/completions'

export const sendToMistral = async (
  messages: Message[]
) => {
  try {
    const formattedMessages = messages.map((m) => ({
      role: m.role,
      content: m.text,
    }))
    const response = await axios.post(
      BASE_URL,
      {
        model: 'mistral-small-latest',
        messages: formattedMessages,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    )
    return response.data;
  } catch (error: any) {
    console.error(
      'Mistral API Error:',
      error?.response?.data || error.message
    )
    throw new Error('AI request failed')
  }
}