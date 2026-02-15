import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("calendar", "routes/calendar.tsx"),
  route("prayers", "routes/prayers.tsx"),
  route("quran", "routes/quran.tsx"),
  route("dhikr", "routes/dhikr.tsx"),
  route("auth", "routes/auth.tsx", [
    route("login", "routes/auth.login.tsx"),
    route("register", "routes/auth.register.tsx"),
  ]),
] satisfies RouteConfig;
