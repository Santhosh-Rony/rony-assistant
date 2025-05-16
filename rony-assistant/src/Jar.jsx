import React, { useEffect, useState, useRef, useCallback } from "react";
import jar from "./assets/jarvis.gif";
import "./jarvis.css";
import speak from "./jarvis";

function Jar() {
    const [content, setContent] = useState("Click here to speak...");
    const [isSpeechSupported, setIsSpeechSupported] = useState(true);
    const recognitionRef = useRef(null);
    const contentTimeout = useRef(null);

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            const recognition = new SpeechRecognition();
            recognition.continuous = false;
            recognition.lang = "en-US";
            recognition.interimResults = false;
            recognition.maxAlternatives = 1;

            recognition.onstart = () => {
                console.log("Voice recognition started.");
            };

            recognition.onspeechend = () => {
                console.log("Speech ended.");
                recognition.stop();
            };

            recognition.onerror = (event) => {
                console.error("Error occurred in recognition: ", event.error);
                setContent("Speech error: " + event.error);
            };

            recognition.onresult = (event) => {
                const transcript = event.results[event.resultIndex][0].transcript;
                console.log("Transcript received:", transcript);
                setContent(transcript);
                resetContentTimeout();
            };

            recognitionRef.current = recognition;
        } else {
            console.warn("Speech recognition not supported in this browser.");
            setIsSpeechSupported(false);
            setContent("Speech recognition is not supported on this browser.");
        }
    });

    const start = () => {
        if (recognitionRef.current) {
            setContent("Listening....");
            recognitionRef.current.start();
        }
    };

    const resetContentTimeout = useCallback(() => {
        if (contentTimeout.current) {
            clearTimeout(contentTimeout.current);
        }
        contentTimeout.current = setTimeout(() => {
            setContent("Click here to speak...");
        }, 7000);
    }, []);

    const run = useCallback(() => {
        const lowerContent = content.toLowerCase();
        if (lowerContent.includes("hello")) {
            speak("Hello sir, Iam rony, your personal assistant");
        } else if (lowerContent.includes("open google")) {
            window.open("https://www.google.com/");
            speak("Opening Google");
        } else if (lowerContent.includes("open instagram")) {
            window.open("https://www.instagram.com/");
            speak("Opening Instagram");
        } else if (lowerContent.includes("open facebook")) {
            window.open("https://www.facebook.com/");
            speak("Opening Facebook");
        } else if (lowerContent.includes("open twitter")) {
            window.open("https://www.twitter.com/");
            speak("Opening Twitter");
        } else if (lowerContent.includes("open linkedin")) {
            window.open("https://www.linkedin.com");
            speak("Opening LinkedIn");
        } else if (lowerContent.includes("open youtube")) {
            window.open("https://www.youtube.com");
            speak("Opening YouTube");
        }
    }, [content]);

    useEffect(() => {
        speak();
        resetContentTimeout();
    }, [resetContentTimeout]);

    useEffect(() => {
        run();
        resetContentTimeout();
    }, [content, run, resetContentTimeout]);

    return (
        <div className="body">
            <div className="command">
                <img className="jarvis" src={jar} alt="jarvis" />
            </div>
            <div className="elements">RONY</div>
            <p className="ele">I'm a virtual assistant, How may I help You?</p>
            <div className="btn">
                <button
                    onClick={start}
                    className="btn-large"
                    disabled={!isSpeechSupported}
                    style={{ opacity: isSpeechSupported ? 1 : 0.5 }}
                >
                    <p className="content">{content}</p>
                </button>
            </div>
        </div>
    );
}

export default Jar;