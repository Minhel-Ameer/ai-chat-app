import { sendToMistral } from '../api/mistral'
import { useChatStore } from '../storage/store'
import type { Message } from './types'

const abortControllers: Record<string, AbortController> = {}

export const sendMessageFlow = async (
  text: string,
  conversationId: string
) => {
  const {
    conversations,
    updateConversation,
    setLoadingForConversation,
    setError,
  } = useChatStore.getState()

  if (!text.trim()) return

  setLoadingForConversation(conversationId, true)
  setError(null)

  if (abortControllers[conversationId]) {
    abortControllers[conversationId].abort()
  }

  const controller = new AbortController()
  abortControllers[conversationId] = controller

  try {
    const activeConversation = conversations.find(
      (c) => c.id === conversationId
    )

    if (!activeConversation) {
      throw new Error('Conversation not found')
    }

    const isFirstMessage =
      activeConversation.messages.length === 0

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      text,
      time: Date.now(),
    }

    const updatedMessages = [
      ...activeConversation.messages,
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

    updateConversation(updatedConversation)

    const aiResponse = await sendToMistral(updatedMessages)

    const content =
      aiResponse?.choices?.[0]?.message?.content

    if (!content) {
      throw new Error('Invalid AI response')
    }

    const aiMessage: Message = {
      id: crypto.randomUUID(),
      role: 'assistant',
      text: content,
      time: Date.now(),
    }

    const finalConversation = {
      ...updatedConversation,
      messages: [...updatedMessages, aiMessage],
    }

    updateConversation(finalConversation)
  } catch (error: unknown) {
    if (
      error instanceof DOMException &&
      error.name === 'AbortError'
    ) {
      return
    }

    setError(
      error instanceof Error
        ? error.message
        : 'Something went wrong'
    )
  } finally {
    setLoadingForConversation(conversationId, false)

    delete abortControllers[conversationId]
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
    setLoadingForConversation,
  } = useChatStore.getState()

  const activeConversation = conversations.find(
    (c) => c.id === activeId
  )

  if (!activeConversation) return

  const msgIndex =
    activeConversation.messages.findIndex(
      (m) => m.id === messageId
    )

  if (msgIndex === -1) return

  setLoadingForConversation(activeId, true)
  setError(null)

  if (abortControllers[activeId]) {
    abortControllers[activeId].abort()
  }

  const controller = new AbortController()
  abortControllers[activeId] = controller

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

    updateConversation(editedConversation)

    const aiResponse = await sendToMistral(editedMessages)

    const content =
      aiResponse?.choices?.[0]?.message?.content

    if (!content) {
      throw new Error('Invalid AI response')
    }

    const aiMessage: Message = {
      id: crypto.randomUUID(),
      role: 'assistant',
      text: content,
      time: Date.now(),
    }

    updateConversation({
      ...editedConversation,
      messages: [...editedMessages, aiMessage],
    })
  } catch (error: unknown) {
    if (
      error instanceof DOMException &&
      error.name === 'AbortError'
    ) {
      return
    }

    setError(
      error instanceof Error
        ? error.message
        : 'Edit failed'
    )
  } finally {
    setLoadingForConversation(activeId, false)

    delete abortControllers[activeId]
  }
}