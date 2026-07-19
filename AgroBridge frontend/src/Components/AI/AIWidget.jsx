import { useAI } from "../../context/AIContext";
import AIChatWindow from "./AIChatwindow";
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