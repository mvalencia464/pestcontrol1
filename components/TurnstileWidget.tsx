import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    turnstile: any;
  }
}

interface TurnstileWidgetProps {
  siteKey: string;
  onVerify: (token: string) => void;
  onError?: (error: any) => void;
}

const TurnstileWidget: React.FC<TurnstileWidgetProps> = ({ siteKey, onVerify, onError }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (window.turnstile && containerRef.current && !widgetIdRef.current) {
      try {
        const id = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          callback: (token: string) => onVerify(token),
          'error-callback': (error: any) => {
            console.error('Turnstile Error:', error);
            onError?.(error);
          },
          theme: 'light',
          size: 'normal',
        });
        widgetIdRef.current = id;
      } catch (e) {
        console.error('Failed to render Turnstile widget:', e);
      }
    }

    return () => {
      // Cleanup: remove widget on unmount
      if (window.turnstile && widgetIdRef.current) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [siteKey]);

  return <div ref={containerRef} />;
};

export default TurnstileWidget;
