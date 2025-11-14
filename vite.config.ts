
  import { defineConfig, loadEnv } from 'vite';
  import react from '@vitejs/plugin-react-swc';
  import path from 'path';

  export default defineConfig(({ mode }) => {
    // Load env file based on `mode` in the current working directory.
    const env = loadEnv(mode, process.cwd(), '');
    
    console.log('Loading environment variables...');
    console.log('VITE_OPENAI_API_KEY exists:', !!env.VITE_OPENAI_API_KEY);
    
    // small plugin to resolve Vite's optional-peer-dep virtual ids for
    // next/navigation used by some packages (e.g. @vercel/analytics)
    const nextNavShimPlugin = {
      name: 'vite:next-navigation-shim',
      resolveId(id) {
        if (typeof id === 'string' && id.startsWith('__vite-optional-peer-dep:next/navigation')) {
          return path.resolve(__dirname, './src/shims/next-navigation.ts');
        }
        return null;
      }
    };

    return {
    plugins: [nextNavShimPlugin, react()],
    base: process.env.VITE_BASE_PATH || "/PC-Builder-Welcome-Screen--1-",
    define: {
      'process.env.VITE_OPENAI_API_KEY': JSON.stringify(process.env.VITE_OPENAI_API_KEY),
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      alias: {
        // Provide a lightweight shim for Next.js client navigation hooks used
        // by some libraries (e.g. @vercel/analytics) so Vite builds don't fail.
  'next/navigation': path.resolve(__dirname, './src/shims/next-navigation.ts'),
  'next/navigation.js': path.resolve(__dirname, './src/shims/next-navigation.ts'),
        // Vite may create virtual optional-peer-dep import ids for Next.js when
        // packages like @vercel/analytics declare Next as an optional peer.
        // Alias those virtual ids to our shim so Rollup can statically analyze
        // and bundle the library without errors.
        '__vite-optional-peer-dep:next/navigation.js:@vercel/analytics': path.resolve(
          __dirname,
          './src/shims/next-navigation.ts'
        ),
        '__vite-optional-peer-dep:next/navigation:@vercel/analytics': path.resolve(
          __dirname,
          './src/shims/next-navigation.ts'
        ),
        'vaul@1.1.2': 'vaul',
        'sonner@2.0.3': 'sonner',
        'recharts@2.15.2': 'recharts',
        'react-resizable-panels@2.1.7': 'react-resizable-panels',
        'react-hook-form@7.55.0': 'react-hook-form',
        'react-day-picker@8.10.1': 'react-day-picker',
        'next-themes@0.4.6': 'next-themes',
        'lucide-react@0.487.0': 'lucide-react',
        'input-otp@1.4.2': 'input-otp',
        'embla-carousel-react@8.6.0': 'embla-carousel-react',
        'cmdk@1.1.1': 'cmdk',
        'class-variance-authority@0.7.1': 'class-variance-authority',
        '@radix-ui/react-tooltip@1.1.8': '@radix-ui/react-tooltip',
        '@radix-ui/react-toggle@1.1.2': '@radix-ui/react-toggle',
        '@radix-ui/react-toggle-group@1.1.2': '@radix-ui/react-toggle-group',
        '@radix-ui/react-tabs@1.1.3': '@radix-ui/react-tabs',
        '@radix-ui/react-switch@1.1.3': '@radix-ui/react-switch',
        '@radix-ui/react-slot@1.1.2': '@radix-ui/react-slot',
        '@radix-ui/react-slider@1.2.3': '@radix-ui/react-slider',
        '@radix-ui/react-separator@1.1.2': '@radix-ui/react-separator',
        '@radix-ui/react-select@2.1.6': '@radix-ui/react-select',
        '@radix-ui/react-scroll-area@1.2.3': '@radix-ui/react-scroll-area',
        '@radix-ui/react-radio-group@1.2.3': '@radix-ui/react-radio-group',
        '@radix-ui/react-progress@1.1.2': '@radix-ui/react-progress',
        '@radix-ui/react-popover@1.1.6': '@radix-ui/react-popover',
        '@radix-ui/react-navigation-menu@1.2.5': '@radix-ui/react-navigation-menu',
        '@radix-ui/react-menubar@1.1.6': '@radix-ui/react-menubar',
        '@radix-ui/react-label@2.1.2': '@radix-ui/react-label',
        '@radix-ui/react-hover-card@1.1.6': '@radix-ui/react-hover-card',
        '@radix-ui/react-dropdown-menu@2.1.6': '@radix-ui/react-dropdown-menu',
        '@radix-ui/react-dialog@1.1.6': '@radix-ui/react-dialog',
        '@radix-ui/react-context-menu@2.2.6': '@radix-ui/react-context-menu',
        '@radix-ui/react-collapsible@1.1.3': '@radix-ui/react-collapsible',
        '@radix-ui/react-checkbox@1.1.4': '@radix-ui/react-checkbox',
        '@radix-ui/react-avatar@1.1.3': '@radix-ui/react-avatar',
        '@radix-ui/react-aspect-ratio@1.1.2': '@radix-ui/react-aspect-ratio',
        '@radix-ui/react-alert-dialog@1.1.6': '@radix-ui/react-alert-dialog',
        '@radix-ui/react-accordion@1.2.3': '@radix-ui/react-accordion',
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      target: 'esnext',
      outDir: 'build',
    },
    server: {
      port: 3000,
      open: true,
    },
  };
  });