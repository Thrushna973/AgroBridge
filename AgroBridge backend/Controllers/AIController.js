const { extractEntities, extractMissingField,  speechToText: sarvamSpeechToText } = require("../AI/sarvam");
// const { generateSuccessMessage} = require("../AI/sarvamService");
const { generateSpeech } = require("../AI/tts");
const {generateTemplateReply} = require("../AI/responseGenerator");
const {extractNumberFromText} = require(".././utils/numberParser");
const ConversationService = require("../services/ConversationService");
const JobService = require("../services/JobService");
const normalizeEntities = require("../AI/normalizeEntities");

const chatWithAI = async (req, res) => {
    try {
        const { message, conversationId } = req.body;
        if (!message) {
            return res.status(400).json({
                success: false,
                message: "Message is required."
            });
        }
        const currentConversationId = conversationId || ConversationService.createConversation();
        const conversation = ConversationService.getConversationState(currentConversationId);
        let normalizedData;
        let extractedData;
            if (conversation.lastMissingField) {
                extractedData =
                    await extractMissingField(
                        conversation.lastMissingField,
                        message
                    );
            } else {
                console.log("========== USER MESSAGE ==========");
                console.log(message);
                extractedData = await extractEntities(message);
                console.log("========== EXTRACTED ==========");
                console.log(extractedData);
            }
            normalizedData = normalizeEntities(extractedData);
            console.log("========== NORMALIZED ==========");
            console.log(normalizedData);
            const currentYear = new Date().getFullYear();

            ["startdate", "enddate"].forEach(field => {
                if (
                    normalizedData[field] &&
                    /^\d{4}-\d{2}-\d{2}$/.test(normalizedData[field])
                ) {
                    const parts = normalizedData[field].split("-");
                    parts[0] = String(currentYear);
                    normalizedData[field] = parts.join("-");
                }
            });

            const spokenNumber = extractNumberFromText(message);
            console.log("MESSAGE:", message);
            console.log("PARSED NUMBER:", spokenNumber);
            if(spokenNumber !== null && conversation.lastMissingField){
                switch (conversation.lastMissingField) {
                    case "distance":
                        normalizedData.distance = spokenNumber;
                        break;
                    case "workinghours":
                        normalizedData.workinghours = spokenNumber;
                        break;
                    case "requiredworkers":
                        normalizedData.requiredworkers = spokenNumber;
                        break;
                    case "wage":
                        normalizedData.wage = spokenNumber;
                        break;
                    case "experience":
                        if (spokenNumber !== null) {
                            normalizedData.experience = spokenNumber;
                        } else if (message.includes("అవసరం లేదు") || message.includes("లేదు")) {
                            normalizedData.experience = 0;
                        }
                        break;
                }
            }
        const updatedConversation  =
            ConversationService.processExtractedEntities(
                currentConversationId,
                normalizedData
            );

        console.log("FULL CONVERSATION");
        console.log(conversation);

        console.log("CONVERSATION DATA");
        console.log(conversation.data);
        console.log("UPDATE CONVERSATION DATA");
        console.log(updatedConversation.data);
        const missingFields =
            JobService.getMissingFields(
                updatedConversation.data
            );
        updatedConversation.lastMissingField = missingFields[0];
        ConversationService.saveConversation(currentConversationId,updatedConversation);

        if (missingFields.length > 0) {
            const nextField = missingFields[0];           
            const reply = generateTemplateReply({
                updates: updatedConversation.updates,
                correctedFields: updatedConversation.correctedFields,
                nextField
            });

            let audio = null;
            try {
                audio = await generateSpeech(reply);
            } catch (err) {
                console.error("TTS failed:", err.message);
            }

            console.log("========== AI Reply ==========");
            console.log(reply);

            return res.status(200).json({
                success: true,
                completed: false,
                conversationId: currentConversationId,
                missingField: missingFields[0],
                reply,
                audio,
                collectedData: updatedConversation.data
            });
        }


        const validationErrors = JobService.validateFieldValues(updatedConversation.data);
        if (Object.keys(validationErrors).length > 0) {
            const firstError = Object.keys(validationErrors)[0];
            updatedConversation.lastMissingField = firstError;
            ConversationService.saveConversation(currentConversationId,updatedConversation);
            const reply = validationErrors[firstError];
            let audio = null;
            try {
                audio = await generateSpeech(reply);
            } catch (err) {
                console.error(err);
            }

            return res.status(200).json({
                success: true,
                completed: false,
                conversationId: currentConversationId,
                missingField: firstError,
                reply,
                audio
            });
        }

        const jobData = JobService.prepareJobData(updatedConversation.data,{farmerId: req.user.id});
        console.log("========== FINAL JOB ==========");
        console.log(jobData);

        console.log("FIELDS:", Object.keys(jobData).length);
        console.log(Object.keys(jobData));
        const result = await JobService.createJob(jobData);
        console.log("✅ Job inserted");
        console.log(result);

        const successMessage = "మీ ఉద్యోగ ప్రకటన విజయవంతంగా నమోదు అయింది.";
        console.log("➡ Before Success TTS");
        let audio = null;
        try {
            audio = await generateSpeech(successMessage);
            console.log("✅ Success TTS completed");
        } catch (err) {
            console.error("❌ Success TTS failed");
            console.error(err);
        }

        console.log("➡ Sending Final Response");
        ConversationService.resetConversation(currentConversationId);
        return res.status(201).json({
            success: true,
            completed: true,
            conversationId: currentConversationId,
            reply: successMessage,
            audio,
            jobId: result.jobId
        });
    } catch (error) {
        console.error(error);
        return res.status(error.status || 500).json({
            success: false,
            message: error.message
        });
    }
};

const speechToText = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Audio file is required"
            });
        }

        const transcript = await sarvamSpeechToText(req.file.path);
        return res.status(200).json({
            success: true,
            transcript
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Speech-to-Text failed"
        });
    }
};

module.exports = {chatWithAI, speechToText};