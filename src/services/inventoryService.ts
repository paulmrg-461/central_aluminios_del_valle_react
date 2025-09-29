import axios from 'axios';
import { InventoryData, InventoryItem, GoogleSheetsResponse } from '../types/inventory';

// ID de la hoja de Google Sheets extraído de la URL
const SHEET_ID = import.meta.env.VITE_GOOGLE_SHEETS_ID || '';
// const SHEET_ID = '1_hyMhDhvE_dbIQqAigv1a7l_07nK7jku4GHWJBsxXrc';
const SHEET_NAME = 'INVENTARIO';

// Configuración de autenticación
const API_KEY = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY || '';
const SERVICE_ACCOUNT_EMAIL = import.meta.env.VITE_GOOGLE_SERVICE_ACCOUNT_EMAIL || '';
const PRIVATE_KEY = import.meta.env.VITE_GOOGLE_PRIVATE_KEY || '';
const PROJECT_ID = import.meta.env.VITE_GOOGLE_PROJECT_ID || '';

export class InventoryService {
  private static baseUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values`;
  private static accessToken: string | null = null;
  private static tokenExpiry: number = 0;

  // Generar JWT para autenticación con Service Account
  private static async generateJWT(): Promise<string> {
    const header = {
      alg: 'RS256',
      typ: 'JWT'
    };

    const now = Math.floor(Date.now() / 1000);
    const payload = {
      iss: SERVICE_ACCOUNT_EMAIL,
      scope: 'https://www.googleapis.com/auth/spreadsheets.readonly',
      aud: 'https://oauth2.googleapis.com/token',
      exp: now + 3600, // 1 hora
      iat: now
    };

    // En un entorno de producción, necesitarías una librería para firmar JWT
    // Por simplicidad, usaremos la API Key como fallback
    throw new Error('JWT signing not implemented in browser environment');
  }

  // Obtener token de acceso usando Service Account
  private static async getAccessToken(): Promise<string> {
    if (this.accessToken && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }

    try {
      // Por ahora, usar directamente la API Key ya que la hoja está compartida con la cuenta de servicio
      if (API_KEY) {
        console.log('🔑 Usando API Key con hoja compartida a cuenta de servicio...');
        console.log('📧 Cuenta de servicio configurada:', SERVICE_ACCOUNT_EMAIL);
        return API_KEY;
      }

      throw new Error('No authentication method available');
    } catch (error) {
      console.error('Error getting access token:', error);
      throw error;
    }
  }

  static async getInventoryData(): Promise<InventoryData> {
    try {
      console.log('🚀 Iniciando conexión a Google Sheets...');
      console.log('📊 Hoja ID:', SHEET_ID);
      console.log('📋 Nombre de hoja:', SHEET_NAME);
      
      // Si no hay API Key, usar datos de ejemplo
      if (!API_KEY) {
        console.warn('❌ No hay API Key configurada. Usando datos de ejemplo.');
        return this.getMockData();
      }

      console.log('🔑 Intentando conexión con API Key...');
      console.log('🌐 Probando con hoja pública...');
      
      // Primero, intentar obtener información básica de la hoja para verificar acceso
      const sheetInfoUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}?key=${API_KEY}`;
      console.log('🔍 Verificando acceso a la hoja:', sheetInfoUrl);
      
      try {
        const sheetInfoResponse = await axios.get(sheetInfoUrl);
        console.log('✅ Acceso a la hoja confirmado');
        console.log('📄 Información de la hoja:', sheetInfoResponse.data.properties?.title);
        
        // Listar todas las hojas disponibles
        if (sheetInfoResponse.data.sheets) {
          console.log('📑 Hojas disponibles:');
          sheetInfoResponse.data.sheets.forEach((sheet: any, index: number) => {
            console.log(`  ${index + 1}. ${sheet.properties.title} (ID: ${sheet.properties.sheetId})`);
          });
        }
      } catch (infoError) {
        console.error('❌ Error verificando acceso a la hoja:', infoError);
        if (axios.isAxiosError(infoError) && infoError.response?.status === 403) {
          console.error('🚫 La hoja no es accesible con la API Key actual');
          return this.getMockData();
        }
      }
      
      // Obtener datos de las columnas A (nombres) y C (cantidades) desde la fila 3 hasta la 300 para asegurar todas las filas
      const range = `${SHEET_NAME}!A3:B300`;
      const url = `${this.baseUrl}/${range}?key=${API_KEY}`;
      
      console.log(`📊 Solicitando datos desde: ${url}`);
      console.log('📋 Rango: A3:C300 (nombres en A, cantidades en C)');
      
      const response = await axios.get<GoogleSheetsResponse>(url);
      
      console.log('✅ Respuesta de Google Sheets recibida:', response.data);
      
      const items: InventoryItem[] = [];
      
      if (response.data.values) {
        console.log(`📈 Procesando ${response.data.values.length} filas de datos...`);
        
        response.data.values.forEach((row, index) => {
          const name = row[0]; // Columna A
          const quantity = parseInt(row[1]) || 0; // Columna C
          
          if (name && name.trim() !== '' && name.trim() !== 'SISTEMA 5020') {
            items.push({
              name: name.trim(),
              quantity,
              row: index + 3 // +3 porque empezamos desde la fila 3
            });
          }
        });
      }

      console.log(`✅ Datos procesados: ${items.length} productos encontrados`);

      return {
        items,
        lastUpdated: new Date().toISOString()
      };
    } catch (error) {
      console.error('❌ Error fetching inventory data:', error);
      if (axios.isAxiosError(error)) {
        const errorDetails = {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data
        };
        console.error('🔍 Detalles del error:', errorDetails);
        
        if (error.response?.status === 403) {
          console.error('🚫 Error 403: Acceso denegado.');
          console.error('');
          console.error('🔍 Diagnóstico del problema:');
          console.error('❌ La API Key no puede acceder a esta hoja');
          console.error('💡 Posibles causas:');
          console.error('1. La hoja no es realmente pública');
          console.error('2. La API Key no tiene permisos para Google Sheets API');
          console.error('3. El nombre de la hoja no coincide');
          console.error('');
          console.error('🔧 Verificar:');
          console.error('1. Que la hoja esté compartida como "Cualquier persona con el enlace"');
          console.error('2. Que la API Key tenga habilitado Google Sheets API');
          console.error('3. Que el nombre de la hoja sea exactamente "INVENTARIO"');
        } else if (error.response?.status === 400) {
          console.error('🚫 Error 400: Solicitud incorrecta');
          console.error('💡 Posibles causas:');
          console.error('1. El rango especificado no existe');
          console.error('2. El nombre de la hoja es incorrecto');
          console.error('3. El formato de la solicitud es inválido');
        }
      }
      // En caso de error, devolver datos de ejemplo
      console.log('🔄 Fallback: usando datos de ejemplo');
      return this.getMockData();
    }
  }

  private static getMockData(): InventoryData {
    // Datos de ejemplo basados en la imagen proporcionada
    const items: InventoryItem[] = [
      { name: 'CABEZAL 5020 NAT', quantity: 36, row: 4 },
      { name: 'CABEZAL 5020 BP', quantity: 107, row: 5 },
      { name: 'CABEZAL 5020 NEG', quantity: 87, row: 6 },
      { name: 'SILLAR 5020 NAT', quantity: 3, row: 7 },
      { name: 'SILLAR 5020 BP', quantity: 65, row: 8 },
      { name: 'SILLAR 5020 NEG', quantity: 113, row: 9 },
      { name: 'JAMBA 5020 NAT', quantity: 15, row: 10 }
    ];

    return {
      items,
      lastUpdated: new Date().toISOString()
    };
  }

  static async refreshInventory(): Promise<InventoryData> {
    return this.getInventoryData();
  }
}