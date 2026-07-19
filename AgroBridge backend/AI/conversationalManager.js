const conversations = new Map();


const createConversation = () => ({
    intent: null,
    data: {},
    updates: {},
    correctedFields: [],
    lastMissingField: null
});


const getConversation = (conversationId) => {

    if (!conversations.has(conversationId)) {
        conversations.set(
            conversationId,
            createConversation()
        );
    }

    return conversations.get(conversationId);

};


const saveConversation = (conversationId,conversation) => {
    conversations.set(conversationId,conversation);
    return conversation;
};


const updateConversation = (conversationId,updates) => {
    const conversation = getConversation(conversationId);
    Object.assign(conversation,updates);
    return saveConversation(
        conversationId,
        conversation
    );
};


const clearConversation = (conversationId) => {
    conversations.delete(conversationId);
};

module.exports = {getConversation, saveConversation, updateConversation, clearConversation};