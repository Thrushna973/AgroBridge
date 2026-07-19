export const playAudio = async (base64Audio) => {

    if (!base64Audio) return;

    try {

        const audio = new Audio(

            `data:audio/wav;base64,${base64Audio}`

        );

        await audio.play();

    }

    catch (error) {

        console.error(

            "Audio Play Error:",

            error

        );

    }

};