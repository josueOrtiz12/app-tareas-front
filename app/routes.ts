
import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/root.tsx"), 


    route("login", "routes/login.tsx"),

    route("register", "routes/register.tsx"),

    route("logout", "routes/logout.ts"),

    route("dashboard", "layouts/DashboardLayout.tsx", [
        index("routes/tasks.tsx"),
    ]),

    route("*", "routes/not-found.tsx"),
] as RouteConfig;