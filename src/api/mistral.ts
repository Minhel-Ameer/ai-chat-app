import axios from 'axios'
import type { Message } from '../functionality/types'

const BASE_URL = '/api/chat'

export interface MistralResponse {
  choices: {
    message: {
      content: string
    }
  }[]
}

const isValidMistralResponse = (
  data: unknown
): data is MistralResponse => {
  if (
    typeof data !== "object" ||
    data === null
  ) {
    return false;
  }

  const d = data as Record<string, unknown>;

  if (!Array.isArray(d.choices)) {
    return false;
  }

  const firstChoice = d.choices[0] as Record<string, unknown> | undefined;

  if (!firstChoice) {
    return false;
  }

  const message = firstChoice.message as Record<string, unknown> | undefined;

  if (!message) {
    return false;
  }

  return typeof message.content === "string";
};

export const sendToMistral = async (
  messages: Message[]
): Promise<MistralResponse> => {
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
          'Content-Type': 'application/json',
        },
      }
    )

    if (!isValidMistralResponse(response.data)) {
      throw new Error('Invalid API response structure')
    }

    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        'Mistral API request failed'

      throw new Error(message)
    }

    if (error instanceof Error) {
      throw error
    }

    throw new Error('Unknown error occurred')
  }
}