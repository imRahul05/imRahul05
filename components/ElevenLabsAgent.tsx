import React, { useEffect } from 'react';

export function ElevenLabsAgent() {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://elevenlabs.io/convai-widget/index.js';
        script.async = true;
        script.type = 'text/javascript';
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <elevenlabs-convai
            agent-id="agent_5701kh7y1pasfv5tee9yfnx2z0gf"
            action-text="Wanna call?"
            start-call-text="Start talking"
        ></elevenlabs-convai>
    );
}

// Add TypeScript definition for the custom element
declare global {
    namespace JSX {
        interface IntrinsicElements {
            'elevenlabs-convai': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
                'agent-id': string;
                'action-text'?: string;
                'start-call-text'?: string;
            }, HTMLElement>;
        }
    }
}
