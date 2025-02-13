interface StoredMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface StoredMemory {
  type: string;
  content: string;
  timestamp: string;
}

interface StoredChat {
  id: string;
  title: string;
  timestamp: string;
  messages: StoredMessage[];
  memories: StoredMemory[];
}

// In-memory storage
class ChatStorage {
  private chats: Map<string, StoredChat> = new Map();

  addChat(chat: StoredChat) {
    this.chats.set(chat.id, chat);
  }

  getChat(id: string) {
    return this.chats.get(id);
  }

  getAllChats() {
    return Array.from(this.chats.values());
  }

  updateChatMessages(id: string, messages: StoredMessage[]) {
    const chat = this.chats.get(id);
    if (chat) {
      chat.messages = messages;
      this.chats.set(id, chat);
    }
  }

  updateChatMemories(id: string, memories: StoredMemory[]) {
    const chat = this.chats.get(id);
    if (chat) {
      chat.memories = chat.memories || [];
      chat.memories = [...chat.memories, ...memories];
      this.chats.set(id, chat);
    }
  }

  getChatMemories(id: string): StoredMemory[] {
    return this.chats.get(id)?.memories || [];
  }
}

// Create a singleton instance
export const chatStorage = new ChatStorage(); 