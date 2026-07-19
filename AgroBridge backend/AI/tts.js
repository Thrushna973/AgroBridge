const axios = require("axios");

const TTS_URL = "https://api.sarvam.ai/text-to-speech";

const generateSpeech = async (text) => {

    try {

        const response = await axios.post(

            TTS_URL,

            {
                text,
                target_language_code: "te-IN",
                model: "bulbul:v3",
                speaker: "shubh"
            },

            {
                timeout: 60000,
                headers: {
                    "api-subscription-key": process.env.SARVAM_API_KEY,
                    "Content-Type": "application/json"
                }
            }

        );

        // const response = await axios.post(
        //     TTS_URL,
        //     payload,
        //     {
        //         headers,
        //         timeout: 60000
        //     }
        // );

        if (!response.data) {
            throw new Error("No response data received from Sarvam.");
        }

        if (!response.data.audios || response.data.audios.length === 0) {
            throw new Error("No audio returned by Sarvam.");
        }

        return response.data.audios[0];

    } catch (error) {
        console.error("========== TTS ERROR ==========");

        console.error("Message:", error.message);

        console.error("Code:", error.code);

        console.error("Status:", error.response?.status);

        console.error("Response:", error.response?.data);

        throw error;

        throw new Error("Unable to generate speech.");

    }

};

module.exports = {generateSpeech};