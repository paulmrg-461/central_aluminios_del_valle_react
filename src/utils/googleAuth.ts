// Utilidad para manejar autenticación con Google Service Account
// Nota: En un entorno de producción, esto debería manejarse en el backend por seguridad

interface ServiceAccountCredentials {
  client_email: string;
  private_key: string;
  project_id: string;
}

interface JWTHeader {
  alg: string;
  typ: string;
}

interface JWTPayload {
  iss: string;
  scope: string;
  aud: string;
  exp: number;
  iat: number;
}

export class GoogleAuthService {
  private static readonly GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';
  private static readonly SHEETS_SCOPE = 'https://www.googleapis.com/auth/spreadsheets.readonly';

  // Base64 URL encode
  private static base64UrlEncode(str: string): string {
    return btoa(str)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  }

  // Crear JWT manualmente (simplificado para demostración)
  // IMPORTANTE: En producción, esto debe hacerse en el backend
  private static async createJWT(credentials: ServiceAccountCredentials): Promise<string> {
    const header: JWTHeader = {
      alg: 'RS256',
      typ: 'JWT'
    };

    const now = Math.floor(Date.now() / 1000);
    const payload: JWTPayload = {
      iss: credentials.client_email,
      scope: this.SHEETS_SCOPE,
      aud: this.GOOGLE_TOKEN_URL,
      exp: now + 3600, // 1 hora
      iat: now
    };

    const encodedHeader = this.base64UrlEncode(JSON.stringify(header));
    const encodedPayload = this.base64UrlEncode(JSON.stringify(payload));

    // En un entorno real, necesitarías firmar con la clave privada RSA
    // Por ahora, lanzamos un error para indicar que se necesita implementación backend
    throw new Error('JWT signing requires server-side implementation with RSA private key');
  }

  // Obtener token de acceso usando Service Account
  static async getAccessToken(credentials: ServiceAccountCredentials): Promise<string> {
    try {
      // Crear JWT firmado
      const jwt = await this.createJWT(credentials);

      // Intercambiar JWT por access token
      const response = await fetch(this.GOOGLE_TOKEN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
          assertion: jwt,
        }),
      });

      if (!response.ok) {
        throw new Error(`Token request failed: ${response.statusText}`);
      }

      const tokenData = await response.json();
      return tokenData.access_token;
    } catch (error) {
      console.error('Error getting access token:', error);
      throw error;
    }
  }

  // Verificar si las credenciales están disponibles
  static hasServiceAccountCredentials(): boolean {
    const email = import.meta.env.VITE_GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = import.meta.env.VITE_GOOGLE_PRIVATE_KEY;
    const projectId = import.meta.env.VITE_GOOGLE_PROJECT_ID;

    return !!(email && privateKey && projectId);
  }

  // Obtener credenciales desde variables de entorno
  static getCredentialsFromEnv(): ServiceAccountCredentials | null {
    const email = import.meta.env.VITE_GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = import.meta.env.VITE_GOOGLE_PRIVATE_KEY;
    const projectId = import.meta.env.VITE_GOOGLE_PROJECT_ID;

    if (!email || !privateKey || !projectId) {
      return null;
    }

    return {
      client_email: email,
      private_key: privateKey.replace(/\\n/g, '\n'), // Convertir \n literales a saltos de línea
      project_id: projectId
    };
  }
}