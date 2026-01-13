import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles.scss';

// Dynamically import PostHog to reduce initial bundle size
const PostHogWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [PostHogProvider, setPostHogProvider] = useState<React.ComponentType<any> | null>(null);

  useEffect(() => {
    // Load PostHog after initial render
    import('posthog-js/react').then(({ PostHogProvider: Provider }) => {
      setPostHogProvider(() => Provider);
    });
  }, []);

  if (!PostHogProvider) {
    return <>{children}</>;
  }

  const options = {
    api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
    defaults: '2025-11-30',
  } as const;

  return (
    <PostHogProvider apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY} options={options}>
      {children}
    </PostHogProvider>
  );
};

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <PostHogWrapper>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </PostHogWrapper>
);