const ConversationManager = require("../AI/conversationalManager");
const { v4: uuidv4 } = require("uuid");
const conversations = {};
const createConversation = () => {
    const conversationId = uuidv4();
    conversations[conversationId] = {
        data: {},
        updates: [],
        correctedFields: [],
        lastMissingField: null
    };
    return conversationId;
};

const mergeConversationData = (
    conversation,
    extractedData
) => {
    const updates = {};
    const correctedFields = [];
    for (const key in extractedData) {
    let newValue = extractedData[key];

    if ((key === "food" || key === "accommodation") && conversation.lastMissingField !== key) {
        continue;
    }
    if (newValue === undefined || newValue === null || newValue === "") {
        continue;
    }
    const oldValue = conversation.data[key];
        if (oldValue === undefined ||oldValue === null ||oldValue === "") {
            conversation.data[key] = newValue;
            updates[key] = newValue;
            continue;
        }
        if (oldValue !== newValue) {
            conversation.data[key] = newValue;
            updates[key] = newValue;
            correctedFields.push(key);
        }
    }

    conversation.updates = updates;
    conversation.correctedFields = correctedFields;
    return conversation;
};

const mapReplyToMissingField = (missingField,message) => {
    switch (missingField) {
        case "wage":
        case "requiredworkers":
            return {
                [missingField]: Number(message)
            };

        case "food":
        case "accommodation":
            return {
                [missingField]:
                    ["yes", "అవును", "true"]
                        .includes(message.toLowerCase())
            };
        case "experience":
            if (message.includes("లేదు") ||message.includes("అవసరం లేదు") ||message === "0") {
                return {
                    experience: 0
                };
            }

            return {
                experience: Number(message)
            };

        default:
            return {
                [missingField]: message
            };
    }

};


const processExtractedEntities = (conversationId,extractedData) => {
    const conversation = ConversationManager.getConversation(conversationId);
    if (!conversation.intent) {
        conversation.intent = "create_job";
    }
    let updates = extractedData;
    if (conversation.lastMissingField && Object.keys(extractedData).length <= 1) {
        updates = mapReplyToMissingField(conversation.lastMissingField,Object.values(extractedData)[0] || "");
    }

    mergeConversationData(conversation,updates);
    ConversationManager.saveConversation(conversationId,conversation);
    return conversation;
};


const getConversationState = (conversationId) => {
    return ConversationManager.getConversation(conversationId);
};


const resetConversation = (conversationId) => {
    ConversationManager.clearConversation(conversationId);
};

const saveConversation = (conversationId,conversation) => {
    return ConversationManager.saveConversation(conversationId,conversation);
};

module.exports = {createConversation, processExtractedEntities, mergeConversationData, getConversationState, resetConversation, saveConversation};