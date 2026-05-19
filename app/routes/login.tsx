
import { redirect } from "react-router";
import type { Route } from "./+types/login";
import { LoginPage } from "../feature/login/loginPage";
import { authServices } from "../services/authServices"; 

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));

  try {
    const result = await authServices({ email, password });
    const setCookie = result.headers.get("set-cookie");

    return redirect("/dashboard", {
      headers: {
        "Set-Cookie": setCookie || "",
      },
    });
  } catch (error: any) {
    return { error: error.message };
  }
}

export default function LoginRoute() {
  return <LoginPage />;
}