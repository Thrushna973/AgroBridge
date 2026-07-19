export const uploadAudio = async (audioBlob) => {

    const formData = new FormData();

    formData.append(

        "audio",

        audioBlob,

        "recording.webm"

    );

    const response = await fetch(

        "http://localhost:5000/api/ai/speech-to-text",

        {

            method: "POST",

            body: formData

        }

    );

    return response.json();

};