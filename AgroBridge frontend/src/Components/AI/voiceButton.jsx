import { useRef, useState } from "react";
import { uploadAudio } from "../../services/speechService";
export default function VoiceButton({onSpeech}) {

    const [isRecording, setIsRecording] = useState(false);

    const mediaRecorderRef = useRef(null);
    const streamRef = useRef(null);
    const audioChunksRef = useRef([]);

    const startRecording = async () => {

        try {

            console.log("Requesting microphone...");

            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true
            });

            streamRef.current = stream;

            const mediaRecorder = new MediaRecorder(stream);

            mediaRecorderRef.current = mediaRecorder;

            audioChunksRef.current = [];

            mediaRecorder.onstart = () => {

                console.log("🎤 Recording Started");

                setIsRecording(true);

            };

            mediaRecorder.ondataavailable = (event) => {

                if (event.data.size > 0) {

                    audioChunksRef.current.push(event.data);

                }

            };

            mediaRecorder.onstop = async () => {

                console.log("⏹ Recording Stopped");

                const audioBlob = new Blob(audioChunksRef.current, {
                    type: mediaRecorder.mimeType
                });
                try {
                    const response = await uploadAudio(audioBlob);
                    console.log("Transcript:", response.transcript);

                    if (response.success && response.transcript) {
                        onSpeech(response.transcript);
                    }
                }
                catch(error){

                    console.log(error);

                }

                console.log("========== AUDIO BLOB ==========");
                console.log(audioBlob);
                console.log("Blob Size:", audioBlob.size);
                console.log("Blob Type:", audioBlob.type);

                const audioURL = URL.createObjectURL(audioBlob);

                console.log("Audio URL:", audioURL);

                // Play recorded audio
                const audio = new Audio(audioURL);

                console.log("▶ Playing Recorded Audio...");

                audio.play();

                // Stop microphone
                streamRef.current.getTracks().forEach(track => track.stop());

                setIsRecording(false);

            };

            mediaRecorder.start();

        } catch (err) {

            console.error("Microphone Error:", err);

        }

    };

    const stopRecording = () => {

        if (
            mediaRecorderRef.current &&
            mediaRecorderRef.current.state !== "inactive"
        ) {

            mediaRecorderRef.current.stop();

        }

    };

    return (

        <button
            type="button"
            onClick={isRecording ? stopRecording : startRecording}
        >

            {isRecording ? "⏹ Stop Recording" : "🎤 Start Recording"}

        </button>

    );

}