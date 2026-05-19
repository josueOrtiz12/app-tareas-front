import type { LoginCredentials, AuthResponse } from "~/types/auth";
import { apiConfig } from "../../deploy/api.config";

export async function authServices(credentials: LoginCredentials): Promise<{ data: AuthResponse, headers: Headers }> {
        const response = await apiConfig.fetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
    });

    console.log("📡 Response status:", response.status);

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Credenciales incorrectas");
    }

    const data: AuthResponse = await response.json();
    
    return {
        data,
        headers: response.headers 
    };
}

export async function logoutService() {
     return apiConfig.fetch('/auth/logout', {
        method: 'POST',
    });
}

export async function validateTokenService(request: Request) {
    const cookieHeader = request.headers.get("Cookie");
    
    console.log("🔍 Validando token, cookie presente:", !!cookieHeader);
    
    if (!cookieHeader) {
        console.warn("⚠️ No hay cookie en la request");
        throw new Error("No hay token de autenticación");
    }
    
    const response = await apiConfig.fetch('/auth/validate-token', {
        method: "GET",
    }, cookieHeader);

    if (!response.ok) {
        console.error("❌ Error Status del Backend:", response.status);
        throw new Error("Token inválido");
    }

    return await response.json();
}