import { Outlet } from "react-router";
import ResponsiveDrawer from "../components/Sidebar"; 
import type { Route } from "./+types/home";
import { requireUserSession } from "../services/auth.server";


export async function loader({ request }: Route.LoaderArgs) {
  await requireUserSession(request);
  return { message: "Sesión activa" };
}

export default function DashboardLayout() {
  return (
    <ResponsiveDrawer>
      {/* Todo lo que pongas aquí dentro se inyectará donde pusimos {children} */}
      <Outlet /> 
    </ResponsiveDrawer>
  );
}