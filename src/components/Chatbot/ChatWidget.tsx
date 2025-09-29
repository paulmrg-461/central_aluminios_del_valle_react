import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Loader, User, Bot, Clock } from 'lucide-react';
import { ChatMessage } from '../../types/chat';
import chatbotService from '../../services/chatbotService';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Mensaje de bienvenida
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: 'welcome',
        content: '¡Hola! Soy el asistente virtual de Central de Aluminios del Valle. Puedo ayudarte con información sobre productos, inventarios, cotizaciones y más. ¿En qué puedo ayudarte hoy?',
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);

  // Auto-scroll al final de los mensajes
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Focus en input cuando se abre
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user_${Date.now()}`,
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setIsTyping(true);

    try {
      // Usar DeepSeek AI para consultas de inventario o respuesta simulada como fallback
      const response = await chatbotService.queryInventoryWithAI(inputMessage);
      
      // Simular typing delay
      setTimeout(() => {
        setIsTyping(false);
        
        const botMessage: ChatMessage = {
          id: `bot_${Date.now()}`,
          content: response.message,
          sender: 'bot',
          timestamp: new Date(),
          type: response.type,
          data: response.data
        };

        setMessages(prev => [...prev, botMessage]);

        // Agregar sugerencias como mensajes separados si existen
        if (response.suggestions && response.suggestions.length > 0) {
          setTimeout(() => {
            const suggestionsMessage: ChatMessage = {
              id: `suggestions_${Date.now()}`,
              content: 'Puedes preguntarme sobre:',
              sender: 'bot',
              timestamp: new Date(),
              type: 'text',
              data: { suggestions: response.suggestions }
            };
            setMessages(prev => [...prev, suggestionsMessage]);
          }, 500);
        }
      }, 1500);

    } catch (error) {
      setIsTyping(false);
      const errorMessage: ChatMessage = {
        id: `error_${Date.now()}`,
        content: 'Disculpa, estoy teniendo problemas técnicos. Por favor intenta de nuevo o contacta directamente con nosotros.',
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const renderMessage = (message: ChatMessage) => {
    const isBot = message.sender === 'bot';
    
    return (
      <div key={message.id} className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}>
        <div className={`flex max-w-xs lg:max-w-md ${isBot ? 'flex-row' : 'flex-row-reverse'}`}>
          {/* Avatar */}
          <div className={`flex-shrink-0 ${isBot ? 'mr-3' : 'ml-3'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              isBot ? 'bg-yellow-400' : 'bg-red-600'
            }`}>
              {isBot ? <Bot className="w-4 h-4 text-black" /> : <User className="w-4 h-4 text-white" />}
            </div>
          </div>

          {/* Message Content */}
          <div className={`px-4 py-2 rounded-lg ${
            isBot 
              ? 'bg-gray-100 text-gray-800' 
              : 'bg-red-600 text-white'
          }`}>
            <p className="text-sm">{message.content}</p>
            
            {/* Inventory Cards */}
            {(message.type === 'product' || message.type === 'inventory') && message.data && (
              <div className="mt-3 space-y-2">
                {message.data.slice(0, 3).map((product: any) => (
                  <div key={product.id} className="bg-white p-3 rounded-lg border">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 text-sm">{product.name}</h4>
                        <p className="text-gray-600 text-sm">{product.price || product.description}</p>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                          product.inStock 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {product.inStock ? 'Disponible' : 'Sin stock'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Suggestions */}
            {message.data?.suggestions && (
              <div className="mt-3 space-y-1">
                {message.data.suggestions.map((suggestion: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="block w-full text-left px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            <div className="mt-2 text-xs opacity-70">
              {format(message.timestamp, 'HH:mm', { locale: es })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Chat Widget Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg transition-all duration-300 z-50 ${
          isOpen 
            ? 'bg-red-600 hover:bg-red-700' 
            : 'bg-yellow-400 hover:bg-yellow-500'
        }`}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white mx-auto" />
        ) : (
          <MessageCircle className="w-6 h-6 text-black mx-auto" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[600px] bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col z-50">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-4 rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-black" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Asistente Virtual</h3>
                  <p className="text-xs opacity-90">Central de Aluminios del Valle</p>
                </div>
              </div>
              <div className="flex items-center space-x-1 text-xs">
                <Clock className="w-3 h-3" />
                <span>En línea</span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(renderMessage)}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-black" />
                  </div>
                  <div className="bg-gray-100 px-4 py-2 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Escribe tu mensaje..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Horario de atención: Lunes a Viernes 8:00 AM - 6:00 PM
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;