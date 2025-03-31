"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    AgentInitializer?: {
      init: (config: any) => void;
    };
  }
}

const JotformChatbot = () => {
  useEffect(() => {
    const scriptId = "jotform-chatbot-script";
    const existingScript = document.getElementById(scriptId);

    // Avoid adding the script multiple times
    if (!existingScript) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://cdn.jotfor.ms/s/umd/latest/for-embedded-agent.js";
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        if (window.AgentInitializer) {
          window.AgentInitializer.init({
            agentRenderURL: "https://agent.jotform.com/0195d0c0be76791aa5e8c8ca921c6117e2d2",
            rootId: "JotformAgent-0195d0c0be76791aa5e8c8ca921c6117e2d2",
            formID: "0195d0c0be76791aa5e8c8ca921c6117e2d2",
            queryParams: ["skipWelcome=1", "maximizable=1"],
            domain: "https://www.jotform.com",
            isDraggable: false,
            background: "linear-gradient(180deg, #f60a13 0%, #910E3E 100%)",
            buttonBackgroundColor: "#04569D",
            buttonIconColor: "#F7FFE9",
            variant: false,
            customizations: {
              greeting: "Yes",
              greetingMessage: "Hi! How can I assist you?",
              pulse: "Yes",
              position: "right",
              autoOpenChatIn: "0",
            },
            isVoice: undefined,
          });
        }
      };
    }

    return () => {
      // Remove injected chatbot UI
      const botElement = document.getElementById("JotformAgent-0195d0c0be76791aa5e8c8ca921c6117e2d2");
      if (botElement) {
        botElement.remove();
      }

      // Remove the script tag
      const script = document.getElementById(scriptId);
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return null;
};

export default JotformChatbot;
