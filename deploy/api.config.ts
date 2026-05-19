const API_BASE_PATH = '/api';

class APIConfig {
  private static instance: APIConfig;
  private isServer: boolean;

  private constructor() {
    this.isServer = typeof window === 'undefined';
  }

  static getInstance(): APIConfig {
    if (!APIConfig.instance) {
      APIConfig.instance = new APIConfig();
    }
    return APIConfig.instance;
  }

  getBaseUrl(): string {
    if (this.isServer) {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://app-tareas-backend:3000';
      return `${apiUrl}${API_BASE_PATH}`;
    }
    return API_BASE_PATH;
  }

  async fetch(endpoint: string, options: RequestInit = {}, cookie?: string | null): Promise<Response> {
    const baseUrl = this.getBaseUrl();
    // ✅ Ahora endpoint debe ser '/api/app-tareas-backend/login'
    const url = `${baseUrl}${endpoint}`;
    
    const headers = new Headers(options.headers);
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');
    
    if (cookie && this.isServer) {
      headers.set('Cookie', cookie);
    }

    // console.log(`🌐 [${this.isServer ? 'SSR' : 'Client'}] ${options.method || 'GET'} ${url}`);

    return fetch(url, {
      ...options,
      headers,
      credentials: 'include',
    });
  }
}

export const apiConfig = APIConfig.getInstance();