const BASE_URL = "http://localhost:5000/api/ai";

export const sendMessage = async ({
    message,
    conversationId
}) => {

    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${BASE_URL}/chat`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },

            body: JSON.stringify({
                message,
                conversationId
            })

        });

        if (!response.ok) {
            const error = await response.json();

            throw new Error(error.message || "Failed to send message");
        }

        const data = await response.json();

        return data;

    } catch (error) {

        console.error("AI Service Error:", error);

        throw error;

    }

};