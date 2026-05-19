import { redirect } from "react-router";
import { validateTokenService } from "./authServices";

export async function requireUserSession(request: Request) {
    try {
        console.log("🔒 Verificando sesión de usuario...");
        
        // ✅ Asegurarse de que request tiene headers
        if (!request || !request.headers) {
            console.error("❌ Request inválida");
            throw redirect("/login?expired=true");
        }
        
        const user = await validateTokenService(request);
        
        if (!user || !user.data) {
            console.warn("⚠️ Usuario no encontrado en validación");
            throw redirect("/login?expired=true");
        }
        
        console.log("✅ Sesión válida para usuario:", user.data.email || user.data.name);
        return user;
        
    } catch (error) {
        console.error("❌ Error de autenticación, redirigiendo a login:", error);
        throw redirect("/login?expired=true");
    }
}