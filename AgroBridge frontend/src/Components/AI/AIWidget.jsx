import { useAI } from "../../context/AIContext";
import AIChatWindow from "./AIChatWindow";
import "./ai.css";

export default function AIWidget() {

    const {

        chatOpen,
        setChatOpen

    } = useAI();

    return (

        <>

            {

                chatOpen &&

                <AIChatWindow />

            }

            <button

                className="ai-widget-btn"

                onClick={() => setChatOpen(!chatOpen)}

            >

                🤖

            </button>

        </>

    );

}