interface StoredMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface StoredChat {
  id: string;
  title: string;
  timestamp: string;
  messages: StoredMessage[];
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
}

// Create a singleton instance
export const chatStorage = new ChatStorage(); 