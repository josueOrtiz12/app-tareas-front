import { redirect } from "react-router";
import { logoutService } from "../services/authServices";

export async function action() {
    try {
        await logoutService();
    } catch (error) {
        console.error("Error avisando al backend:", error);
    }
    return redirect("/login", {
        headers: {
            "Set-Cookie": "token=; Path=/; HttpOnly; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT",
        },
    });
}