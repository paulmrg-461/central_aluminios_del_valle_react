# Central de Aluminios del Valle - Website

## Características Principales
## Descripción
### 🤖 Chatbot Inteligente
- Integración con backend para consultas en tiempo real
- Búsqueda de productos y verificación de inventarios
- Generación de cotizaciones automáticas
- Atención personalizada con IA
- Horario de atención: Lunes a Viernes 8:00 AM - 6:00 PM
Website profesional para Central de Aluminios del Valle, empresa especializada en soluciones de aluminio y vidrio para construcción y arquitectura.
### 📱 Funcionalidades
- Diseño responsive y moderno
- Catálogo completo de productos
- Portafolio de proyectos realizados
- Sistema de contacto integrado
- Blog y recursos informativos
- Optimización SEO completa
### 🛠️ Tecnologías
- **Frontend**: React 18 + TypeScript
- **Styling**: TailwindCSS
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Date Handling**: date-fns
## Configuración del Chatbot
### Variables de Entorno
Crea un archivo `.env` basado en `.env.example`:
```bash
# Configuración del Chatbot
VITE_REACT_APP_CHATBOT_API_URL=https://api.centralaluminiosdelvalle.com
VITE_REACT_APP_CHATBOT_API_KEY=your-api-key-here
```
### API Endpoints Esperados
El chatbot espera los siguientes endpoints en tu backend:
#### 1. Enviar Mensaje
```
POST /chat/message
Content-Type: application/json
Authorization: Bearer {API_KEY}
X-Session-ID: {SESSION_ID}
{
  "message": "string",
  "sessionId": "string",
  "context": {},
  "timestamp": "ISO_DATE"
}
```
#### 2. Buscar Productos
```
GET /products/search?q={query}&category={category}&sessionId={sessionId}
Authorization: Bearer {API_KEY}
```
#### 3. Consultar Inventario
```
GET /inventory/{productId}?sessionId={sessionId}
Authorization: Bearer {API_KEY}
```
#### 4. Solicitar Cotización
```
POST /quotes/request
Content-Type: application/json
Authorization: Bearer {API_KEY}
{
  "products": ["string"],
  "customerInfo": {},
  "sessionId": "string",
  "timestamp": "ISO_DATE"
}
```
#### 5. Información de la Empresa
```
GET /company/info?topic={topic}&sessionId={sessionId}
Authorization: Bearer {API_KEY}
```
### Estructura de Respuestas
Todas las respuestas del chatbot deben seguir esta estructura:
```typescript
{
  "message": "string",
  "type": "text" | "product" | "inventory" | "quote" | "error",
  "data": any, // Opcional
  "suggestions": ["string"], // Opcional
}
```
## Instalación y Desarrollo
```bash
# Instalar dependencias
npm install
# Iniciar servidor de desarrollo
npm run dev
# Construir para producción
npm run build
```
## Modo Demo
Si no tienes un backend configurado, el chatbot funcionará en modo demo con respuestas simuladas. Para activar el modo producción, configura las variables de entorno correctamente.
## Personalización
### Modificar Respuestas del Chatbot
Edita el archivo `src/services/chatbotService.ts` en el método `simulateResponse()` para personalizar las respuestas demo.
### Estilos del Chat
El widget de chat utiliza las clases de TailwindCSS definidas en `src/components/Chatbot/ChatWidget.tsx`.
### Agregar Nuevas Funcionalidades
1. Extiende la interfaz `ChatbotResponse` en `src/types/chat.ts`
2. Agrega nuevos métodos en `ChatbotService`
3. Actualiza el componente `ChatWidget` para manejar los nuevos tipos de respuesta
## Soporte
Para soporte técnico o consultas sobre la integración del chatbot, contacta al equipo de desarrollo.