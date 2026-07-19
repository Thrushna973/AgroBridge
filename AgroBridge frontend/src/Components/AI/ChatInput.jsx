import { useState } from "react";
import VoiceButton from "./voiceButton";
import { useAI } from "../../context/AIContext";
import { sendMessage } from "../../services/aiService";
import { playAudio } from "../../utils/audioPlayer";

export default function ChatInput() {

    const [text, setText] = useState("");

    const {
        addMessage,
        conversationId,
        setConversationId,
        loading,
        setLoading
    } = useAI();

    const handleSend = async (message = text) => {

    if (!message.trim()) return;

    addMessage(

        "user",

        message

    );

    setText("");

    try {

        setLoading(true);

        const response = await sendMessage({

            message,

            conversationId

        });

        addMessage(

            "bot",

            response.reply

        );

        await playAudio(

            response.audio

        );

        if (response.conversationId) {

            setConversationId(

                response.conversationId

            );

        }

    }

    catch (error) {

        console.error(error);

        addMessage(

            "bot",

            "Sorry, something went wrong."

        );

    }

    finally {

        setLoading(false);

    }

};

    return (

        <div className="chat-input">

            <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type your message..."
                disabled={loading}
            />

            <VoiceButton
                onSpeech={handleSend}
            />

            <button
                onClick={() => handleSend()}
                disabled={loading}
            >
                Send
            </button>

        </div>

    );

}