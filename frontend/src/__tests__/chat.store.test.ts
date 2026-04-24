import { useChatStore } from '../store/chat.store';
import { Message } from '../types';

describe('ChatStore', () => {
  beforeEach(() => {
    useChatStore.setState({
      messages: [],
      isLoading: false,
      error: null,
    })
  })

  it('addMessage appends to messages array', () => {
    const msg: Message = {
      id: '1',
      role: 'user',
      content: 'Hello',
      timestamp: Date.now(),
    }
    useChatStore.getState().addMessage(msg)
    expect(useChatStore.getState().messages).toHaveLength(1)
    expect(useChatStore.getState().messages[0].content).toBe('Hello')
  })

  it('clearMessages empties the array', () => {
    useChatStore.setState({
      messages: [
        { id: '1', role: 'user', content: 'test', timestamp: 1 }
      ]
    })
    useChatStore.getState().clearMessages()
    expect(useChatStore.getState().messages).toHaveLength(0)
  })

  it('setLoading updates isLoading state', () => {
    useChatStore.getState().setLoading(true)
    expect(useChatStore.getState().isLoading).toBe(true)
    useChatStore.getState().setLoading(false)
    expect(useChatStore.getState().isLoading).toBe(false)
  })

  it('updateLastMessage updates content of last assistant message', () => {
    useChatStore.setState({
      messages: [
        { id: '1', role: 'user', content: 'Q', timestamp: 1 },
        { id: '2', role: 'assistant', content: '', 
          timestamp: 2, isLoading: true },
      ]
    })
    useChatStore.getState().updateLastMessage(
      'EVM answer', ['Chip 1', 'Chip 2']
    )
    const messages = useChatStore.getState().messages
    expect(messages[1].content).toBe('EVM answer')
    expect(messages[1].chips).toEqual(['Chip 1', 'Chip 2'])
    expect(messages[1].isLoading).toBe(false)
  })
})
