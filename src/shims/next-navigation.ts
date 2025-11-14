// Shim for `next/navigation` used by some Next-specific packages (e.g. @vercel/analytics)
// Exports the hooks as no-op or browser-friendly implementations so the app can
// build/run under Vite (non-Next) environments.

export function useParams(): Record<string, string> {
  // Return an empty params object — suitable fallback for client-only usage
  return {};
}

export function usePathname(): string {
  return typeof window !== 'undefined' ? window.location.pathname : '/';
}

export function useSearchParams(): URLSearchParams {
  return new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
}

export function useRouter() {
  return {
    push: (url: string) => {
      if (typeof window !== 'undefined') window.location.assign(url);
    },
    replace: (url: string) => {
      if (typeof window !== 'undefined') window.location.replace(url);
    },
    back: () => {
      if (typeof window !== 'undefined') window.history.back();
    },
  };
}

// Named exports above should satisfy most imports from `next/navigation` used by
// packages that expect Next's client hooks. Keep this file minimal and safe.
