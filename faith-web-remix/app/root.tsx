import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { AuthProvider } from "./contexts/AuthContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import logoLight from "./welcome/logo-light.svg";

const appName = "Faith";
const appDescription = "A comprehensive Islamic companion app for prayers, Quran, dhikr, and spiritual growth.";
const appUrl = "https://faith-app.com";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  { rel: "icon", href: logoLight, type: "image/svg+xml" },
];

export const meta: Route.MetaFunction = () => [
  { charset: "utf-8" },
  { name: "viewport", content: "width=device-width, initial-scale=1" },
  { name: "theme-color", content: "#1B6B4E" },
  { name: "description", content: appDescription },
  { name: "application-name", content: appName },
  { name: "apple-mobile-web-app-capable", content: "yes" },
  { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
  { name: "apple-mobile-web-app-title", content: appName },
  { property: "og:type", content: "website" },
  { property: "og:title", content: appName },
  { property: "og:description", content: appDescription },
  { property: "og:url", content: appUrl },
  { property: "og:image", content: logoLight },
  { name: "twitter:card", content: "summary_large_image" },
  { name: "twitter:title", content: appName },
  { name: "twitter:description", content: appDescription },
  { name: "twitter:image", content: logoLight },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1B6B4E" />
        <title>{appName}</title>
        <link rel="icon" href={logoLight} type="image/svg+xml" />
        <link rel="apple-touch-icon" href={logoLight} />
        <Meta />
        <Links />
      </head>
      <body className="font-jakarta bg-bg text-text antialiased">
        <LanguageProvider>
          <NotificationProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
          </NotificationProvider>
        </LanguageProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const location = useLocation();
  const isAuthPage = location.pathname.startsWith("/auth");

  if (isAuthPage) {
    return <Outlet />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg p-6">
      <div className="text-center max-w-md">
        <div className="text-6xl font-bold text-gradient-primary font-playfair mb-4">{message}</div>
        <p className="text-text-secondary text-lg mb-8">{details}</p>
        <a href="/" className="btn-primary inline-flex">
          Go Home
        </a>
        {stack && (
          <pre className="mt-8 text-left text-xs p-4 bg-surface rounded-xl overflow-x-auto border border-border-light">
            <code>{stack}</code>
          </pre>
        )}
      </div>
    </div>
  );
}
