import ChatMessages from "./ChatMessages";

import ChatInput from "./ChatInput";

import { useAI } from "../../context/AIContext";

export default function AIChatWindow() {

    const { setChatOpen } = useAI();

    return (

        <div className="ai-chat-window">

            <div className="chat-header">

                <h3>AgroBridge AI</h3>

                <button

                    onClick={() => setChatOpen(false)}

                >

                    ✖

                </button>

            </div>

            <ChatMessages />

            <ChatInput />

        </div>

    );

}