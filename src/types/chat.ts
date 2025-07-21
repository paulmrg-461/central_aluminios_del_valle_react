export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'product' | 'inventory' | 'quote';
  data?: any;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  description: string;
  image: string;
  inStock: boolean;
  specifications?: string[];
}

export interface ChatbotResponse {
  message: string;
  type: 'text' | 'product' | 'inventory' | 'quote' | 'error';
  data?: any;
  suggestions?: string[];
}

export interface ChatSession {
  sessionId: string;
  userId?: string;
  startTime: Date;
  lastActivity: Date;
  context: Record<string, any>;
}