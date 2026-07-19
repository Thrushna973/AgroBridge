export const uploadAudio = async (audioBlob) => {

    const formData = new FormData();

    formData.append(

        "audio",

        audioBlob,

        "recording.webm"

    );

    const response = await fetch(

        "import.meta.env.VITE_API_URL/ai/speech-to-text",

        {

            method: "POST",

            body: formData

        }

    );

    return response.json();

};