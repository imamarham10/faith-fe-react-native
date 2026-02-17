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

const appName = "Faith";
const appDescription = "A comprehensive Islamic companion app for prayers, Quran, dhikr, and spiritual growth.";
const appUrl = "https://faith-app.com";

// Moon SVG favicon (embedded inline)
const moonFavicon = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%231B6B4E"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  { rel: "icon", href: moonFavicon, type: "image/svg+xml" },
];

export const meta: Route.MetaFunction = ({ location }) => {
  // Determine page-specific title based on route
  const pathname = location.pathname;
  let pageTitle = appName;

  if (pathname.startsWith("/prayers")) pageTitle = "Faith | Prayers";
  else if (pathname.startsWith("/quran")) pageTitle = "Faith | Quran";
  else if (pathname.startsWith("/dhikr")) pageTitle = "Faith | Dhikr";
  else if (pathname.startsWith("/calendar")) pageTitle = "Faith | Calendar";
  else if (pathname.startsWith("/qibla")) pageTitle = "Faith | Qibla";
  else if (pathname.startsWith("/names")) pageTitle = "Faith | Names";
  else if (pathname.startsWith("/feelings")) pageTitle = "Faith | Feelings";
  else if (pathname.startsWith("/auth")) pageTitle = "Faith | Auth";
  else pageTitle = "Faith | Home";

  return [
    { title: pageTitle },
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "theme-color", content: "#1B6B4E" },
    { name: "description", content: appDescription },
    { name: "application-name", content: appName },
    { name: "apple-mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
    { name: "apple-mobile-web-app-title", content: appName },
    { property: "og:type", content: "website" },
    { property: "og:title", content: pageTitle },
    { property: "og:description", content: appDescription },
    { property: "og:url", content: appUrl },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: pageTitle },
    { name: "twitter:description", content: appDescription },
  ];
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1B6B4E" />
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
