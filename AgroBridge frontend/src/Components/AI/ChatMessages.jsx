import { useAI } from "../../context/AIContext";

import MessageBubble from "./MessageBubble";

export default function ChatMessages() {

    const {

        messages,

        loading

    } = useAI();

    return (

        <div className="chat-messages">

            {

                messages.map((message, index) => (

                    <MessageBubble

                        key={index}

                        sender={message.sender}

                        text={message.text}

                    />

                ))

            }

            {

                loading &&

                <MessageBubble

                    sender="bot"

                    text="Typing..."

                />

            }

        </div>

    );

}