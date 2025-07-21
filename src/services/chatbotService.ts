import axios from 'axios';
import { ChatbotResponse, Product, ChatSession } from '../types/chat';

// Configuración del servicio de chatbot
const CHATBOT_API_BASE_URL = import.meta.env.VITE_REACT_APP_CHATBOT_API_URL || 'https://api.centralaluminiosdelvalle.com';
const API_KEY = import.meta.env.VITE_REACT_APP_CHATBOT_API_KEY || 'demo-key';

class ChatbotService {
  private sessionId: string;
  private apiClient;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.apiClient = axios.create({
      baseURL: CHATBOT_API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
        'X-Session-ID': this.sessionId
      },
      timeout: 10000
    });
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Enviar mensaje al chatbot
  async sendMessage(message: string, context?: Record<string, any>): Promise<ChatbotResponse> {
    try {
      const response = await this.apiClient.post('/chat/message', {
        message,
        sessionId: this.sessionId,
        context,
        timestamp: new Date().toISOString()
      });

      return response.data;
    } catch (error) {
      console.error('Error sending message to chatbot:', error);
      return this.handleError(error);
    }
  }

  // Consultar productos
  async searchProducts(query: string, category?: string): Promise<ChatbotResponse> {
    try {
      const response = await this.apiClient.get('/products/search', {
        params: {
          q: query,
          category,
          sessionId: this.sessionId
        }
      });

      return {
        message: `Encontré ${response.data.products.length} productos relacionados con "${query}"`,
        type: 'product',
        data: response.data.products,
        suggestions: response.data.suggestions || []
      };
    } catch (error) {
      console.error('Error searching products:', error);
      return this.handleError(error);
    }
  }

  // Consultar inventario
  async checkInventory(productId: string): Promise<ChatbotResponse> {
    try {
      const response = await this.apiClient.get(`/inventory/${productId}`, {
        params: { sessionId: this.sessionId }
      });

      const { product, stock, availability } = response.data;

      return {
        message: `${product.name}: ${stock > 0 ? `${stock} unidades disponibles` : 'Sin stock disponible'}`,
        type: 'inventory',
        data: {
          product,
          stock,
          availability,
          estimatedDelivery: response.data.estimatedDelivery
        }
      };
    } catch (error) {
      console.error('Error checking inventory:', error);
      return this.handleError(error);
    }
  }

  // Solicitar cotización
  async requestQuote(products: string[], customerInfo?: any): Promise<ChatbotResponse> {
    try {
      const response = await this.apiClient.post('/quotes/request', {
        products,
        customerInfo,
        sessionId: this.sessionId,
        timestamp: new Date().toISOString()
      });

      return {
        message: 'He generado una cotización preliminar para los productos seleccionados.',
        type: 'quote',
        data: response.data.quote,
        suggestions: ['Ver cotización completa', 'Modificar productos', 'Contactar asesor']
      };
    } catch (error) {
      console.error('Error requesting quote:', error);
      return this.handleError(error);
    }
  }

  // Obtener información de la empresa
  async getCompanyInfo(topic: string): Promise<ChatbotResponse> {
    try {
      const response = await this.apiClient.get('/company/info', {
        params: {
          topic,
          sessionId: this.sessionId
        }
      });

      return {
        message: response.data.message,
        type: 'text',
        data: response.data.details,
        suggestions: response.data.relatedTopics || []
      };
    } catch (error) {
      console.error('Error getting company info:', error);
      return this.handleError(error);
    }
  }

  // Manejar errores
  private handleError(error: any): ChatbotResponse {
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        return {
          message: 'Lo siento, la consulta está tardando más de lo esperado. ¿Podrías intentar de nuevo?',
          type: 'error'
        };
      }
      
      if (error.response?.status === 404) {
        return {
          message: 'No encontré información sobre esa consulta. ¿Podrías ser más específico?',
          type: 'error',
          suggestions: ['Ver catálogo de productos', 'Contactar asesor', 'Preguntas frecuentes']
        };
      }
    }

    return {
      message: 'Disculpa, estoy teniendo problemas técnicos. Un asesor humano te contactará pronto.',
      type: 'error',
      suggestions: ['Llamar ahora: +57 (2) 123-4567', 'Enviar email', 'Programar llamada']
    };
  }

  // Simular respuestas para demo (cuando no hay backend)
  async simulateResponse(message: string): Promise<ChatbotResponse> {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    const lowerMessage = message.toLowerCase();

    // Respuestas sobre productos
    if (lowerMessage.includes('producto') || lowerMessage.includes('aluminio') || lowerMessage.includes('vidrio')) {
      return {
        message: 'Tenemos una amplia gama de productos en aluminio y vidrio. ¿Te interesa alguna categoría específica?',
        type: 'product',
        data: [
          {
            id: '1',
            name: 'Perfiles Estructurales',
            category: 'aluminum',
            price: 'Desde $25,000 COP/m',
            description: 'Perfiles de alta resistencia para estructuras',
            image: 'https://images.pexels.com/photos/1078538/pexels-photo-1078538.jpeg?auto=compress&cs=tinysrgb&w=300',
            inStock: true
          }
        ],
        suggestions: ['Ver más productos', 'Consultar precios', 'Solicitar cotización']
      };
    }

    // Respuestas sobre inventario
    if (lowerMessage.includes('stock') || lowerMessage.includes('disponible') || lowerMessage.includes('inventario')) {
      return {
        message: 'Puedo consultar la disponibilidad de cualquier producto. ¿Qué producto específico te interesa?',
        type: 'inventory',
        suggestions: ['Perfiles de aluminio', 'Vidrio templado', 'Ventanas', 'Mamparas']
      };
    }

    // Respuestas sobre cotizaciones
    if (lowerMessage.includes('cotiz') || lowerMessage.includes('precio') || lowerMessage.includes('costo')) {
      return {
        message: 'Puedo ayudarte a generar una cotización personalizada. ¿Qué productos necesitas y para qué tipo de proyecto?',
        type: 'quote',
        suggestions: ['Proyecto residencial', 'Proyecto comercial', 'Proyecto industrial']
      };
    }

    // Respuestas sobre la empresa
    if (lowerMessage.includes('empresa') || lowerMessage.includes('nosotros') || lowerMessage.includes('experiencia')) {
      return {
        message: 'Central de Aluminios del Valle tiene más de 20 años de experiencia en soluciones de aluminio y vidrio en el Valle del Cauca. ¿Qué te gustaría saber específicamente?',
        type: 'text',
        suggestions: ['Nuestra historia', 'Certificaciones', 'Proyectos realizados', 'Equipo de trabajo']
      };
    }

    // Respuesta por defecto
    return {
      message: 'Hola, soy el asistente virtual de Central de Aluminios del Valle. Puedo ayudarte con información sobre productos, consultar inventarios, generar cotizaciones y responder preguntas sobre nuestros servicios. ¿En qué puedo ayudarte?',
      type: 'text',
      suggestions: ['Ver productos', 'Consultar inventario', 'Solicitar cotización', 'Información de la empresa']
    };
  }
}

export default new ChatbotService();