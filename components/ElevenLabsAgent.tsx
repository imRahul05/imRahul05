import React, { useEffect, useState } from "react";
import { X, Phone } from "lucide-react";

export function ElevenLabsAgent() {
    const [dismissed, setDismissed] = useState(false);

    useEffect(() => {
        if (dismissed) return;

        const script = document.createElement("script");
        script.src = "https://elevenlabs.io/convai-widget/index.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, [dismissed]);

    if (dismissed) {
        return (
            <button
                onClick={() => setDismissed(false)}
                aria-label="Talk to AI"
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    zIndex: 10000,
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--text-primary)',
                    color: 'var(--bg-color)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 0,
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                }}
            >
                <Phone size={20} />
            </button>
        );
    }

    return (
        <>
            <elevenlabs-convai
                agent-id="agent_5701kh7y1pasfv5tee9yfnx2z0gf"
                action-text="Wanna call?"
                start-call-text="Start talking"
            />

            <button
                onClick={() => setDismissed(true)}
                aria-label="Close AI agent"
                style={{
                    position: 'fixed',
                    bottom: '68px',
                    right: '8px',
                    zIndex: 10000,
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-color)',
                    color: 'var(--text-primary)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 0,
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                }}
            >
                <X size={14} />
            </button>
        </>
    );
}
