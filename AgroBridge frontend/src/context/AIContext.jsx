import { createContext, useContext, useState } from "react";

const AIContext = createContext();

export const AIProvider = ({ children }) => {

    const [chatOpen, setChatOpen] = useState(false);

    const [messages, setMessages] = useState([]);

    const [conversationId, setConversationId] = useState(null);

    const [loading, setLoading] = useState(false);

    const addMessage = (sender, text) => {

        setMessages(prev => [
            ...prev,
            {
                sender,
                text
            }
        ]);

    };

    return (

        <AIContext.Provider
            value={{
                chatOpen,
                setChatOpen,

                messages,
                addMessage,

                conversationId,
                setConversationId,

                loading,
                setLoading
            }}
        >

            {children}

        </AIContext.Provider>

    );

};

export const useAI = () => useContext(AIContext);