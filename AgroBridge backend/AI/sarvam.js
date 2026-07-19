const axios = require("axios");
const  {entityExtractionPrompt} = require("./prompts/entityExtractionPrompt");
const {missingFieldExtractionPrompt} = require("./prompts/missingFieldExtractionPrompt");
const fs = require("fs");
const FormData = require("form-data");

const SARVAM_URL = "https://api.sarvam.ai/v1/chat/completions";

const extractEntities = async (message) => {
    try {
        const prompt = entityExtractionPrompt(message);
        const response = await axios.post(
            SARVAM_URL,
            {
                model: "sarvam-30b",
                messages: [
                    {
                        role: "system",
                        content: prompt
                    }
                ],
                temperature: 0.2,
                reasoning_effort: null,
                max_tokens: 500,

                response_format: {
                    type: "json_object"
                }
            },

            {
                headers: {
                    Authorization: `Bearer ${process.env.SARVAM_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        console.log("========== ENTITY EXTRACTION RESPONSE ==========");
        console.log(JSON.stringify(response.data, null, 2));
        const content = response.data?.choices?.[0]?.message?.content;

        if (!content) {
            throw new Error("Sarvam did not return JSON content.");
        }
        const parsed = JSON.parse(content);

        console.log("========== PARSED ENTITIES ==========");
        console.log(parsed);
        return parsed;
    } catch (error) {
        console.error("Sarvam Error:",error.response?.data || error.message);
        return {};
    }
};

const extractMissingField = async (field, message) => {
    try {
        const prompt = missingFieldExtractionPrompt(field, message);
        const response = await axios.post(
            SARVAM_URL,
            {
                model: "sarvam-30b",
                messages: [
                    {
                        role: "system",
                        content: prompt
                    }
                ],

                temperature: 0.2,
                reasoning_effort: null,
                max_tokens: 300,

                response_format: {
                    type: "json_object"
                }
            },

            {
                headers: {
                    Authorization: `Bearer ${process.env.SARVAM_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        console.log("========== MISSING FIELD RESPONSE ==========");
        console.log(JSON.stringify(response.data, null, 2));

        const content =
            response.data?.choices?.[0]?.message?.content;

        if (!content) {
            throw new Error(
                "Sarvam did not return JSON content."
            );
        }

        const parsed = JSON.parse(content);
        console.log("========== PARSED FIELD ==========");
        console.log(parsed);
        return parsed;
    } catch (error) {
        console.error("Sarvam Missing Field Error:",error.response?.data || error.message);
        return {};
    }
};

const speechToText = async (filePath) => {
    try {
        const formData = new FormData();
        formData.append("file",fs.createReadStream(filePath));
        formData.append("model","saaras:v3");
        formData.append("mode","transcribe");
        formData.append("language_code","te-IN");

        const response = await axios.post(
            "https://api.sarvam.ai/speech-to-text",
            formData,
            {
                headers: {
                    "api-subscription-key":
                        process.env.SARVAM_API_KEY,
                    ...formData.getHeaders()
                }
            }
        );

        console.log("========== STT RESPONSE ==========");
        console.log(response.data);

        return response.data.transcript;

    }

    catch (error) {
        console.error("Sarvam STT Error:",error.response?.data || error.message);
        throw error;
    }

};

module.exports = { extractEntities, extractMissingField, speechToText };