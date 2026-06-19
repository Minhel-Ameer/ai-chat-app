import { sendToMistral } from '../api/mistal';
import { useChatStore } from '../storage/store';
import type { Message } from './types';

export const sendMessageFlow = async (text: string) => {
  const {
    conversations,
    activeId,
    updateConversation,
    setLoading,
    setError,
  } = useChatStore.getState()

  if (!text.trim()) return

  setLoading(true)
  setError(null)

  try {
    const activeConversation = conversations.find(
      (c) => c.id === activeId
    );

    if (!activeConversation) return;

    const isFirstMessage =
      activeConversation.messages.length === 0;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      text,
      time: Date.now(),
    }

    const updatedMessages = [
      ...(activeConversation.messages || []),
      userMessage,
    ]

    let updatedConversation = {
      ...activeConversation,
      messages: updatedMessages,
    }

    if (isFirstMessage) {
      updatedConversation = {
        ...updatedConversation,
        title:
          text.length > 40
            ? `${text.slice(0, 40)}...`
            : text,
      }
    }

    updateConversation(updatedConversation);

    const aiResponse = await sendToMistral(updatedMessages)

    const aiMessage: Message = {
      id: crypto.randomUUID(),
      role: 'assistant',
      text: aiResponse.choices[0].message.content,
      time: Date.now(),
    }

    const finalConversation = {
      ...updatedConversation,
      messages: [...updatedMessages, aiMessage],
    }
    updateConversation(finalConversation)

  } catch (error) {
    console.error(error)
    setError('Something went wrong')
  } finally {
    setLoading(false)
  }
}
export const editMessageFlow = async (
  messageId: string,
  newText: string
) => {
  const {
    conversations,
    activeId,
    updateConversation,
    setError,
    setLoading,
  } = useChatStore.getState()

  const activeConversation = conversations.find(
    (c) => c.id === activeId
  );

  if (!activeConversation) return

  const msgIndex = activeConversation.messages.findIndex(
    (m) => m.id === messageId
  )

  if (msgIndex === -1) return

  setLoading(true)
  setError(null)

  try {
    const editedMessages = [
      ...activeConversation.messages.slice(0, msgIndex),
      {
        ...activeConversation.messages[msgIndex],
        text: newText,
      },
    ]

    const editedConversation = {
      ...activeConversation,
      messages: editedMessages,
    }
    updateConversation(editedConversation);
    const aiResponse = await sendToMistral(editedMessages);
    const aiMessage: Message = {
      id: crypto.randomUUID(),
      role: 'assistant',
      text: aiResponse.choices[0].message.content,
      time: Date.now(),
    }

    const latestConversation =
      useChatStore.getState().conversations.find(
        (c) => c.id === activeId
      )

    if (!latestConversation) return

    updateConversation({
      ...latestConversation,
      messages: [...editedMessages, aiMessage],
    })

  } catch (error) {
    console.error(error)
    setError('Edit failed')
  } finally {
    setLoading(false)
  }
}