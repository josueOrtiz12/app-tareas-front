import { redirect } from "react-router";
import type { Route } from "./+types/register";
import { RegisterPage } from "../feature/register/registerPage";
import { registerServices } from "../services/authServices";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const user_name = String(formData.get("user_name"));
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));
  const confirmPassword = String(formData.get("confirmPassword"));

  try {
    await registerServices({ user_name, email, password, confirmPassword });
    return redirect("/login");
  } catch (error: any) {
    return { error: error.message };
  }
}

export default function RegisterRoute() {
  return <RegisterPage />;
}
