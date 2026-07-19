export default function MessageBubble({

    sender,

    text

}) {

    return (

        <div

            className={

                sender === "bot"

                    ? "bot-message"

                    : "user-message"

            }

        >

            {text}

        </div>

    );

}