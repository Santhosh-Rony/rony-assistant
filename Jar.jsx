import React, { useEffect, useState, useRef, useCallback } from "react";
import jar from "./assets/jarvis.gif";
import "./jarvis.css";
import speak from "./jarvis";

function Jar() {
    const [content, setContent] = useState("Click here to speak...");
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    const contentTimeout = useRef(null);

    recognition.onstart = () => {
        console.log("Voice recognition started."); // Debugging line
    };

    recognition.onspeechend = () => {
        console.log("Speech ended."); // Debugging line
        recognition.stop();
    };

    recognition.onerror = (event) => {
        console.error("Error occurred in recognition: ", event.error); // Debugging line
    };

    recognition.onresult = (event) => {
        const currentIndex = event.resultIndex;
        const transcript = event.results[currentIndex][0].transcript;
        console.log("Transcript received:", transcript); // Debugging line
        setContent(transcript); // This should update the UI
        resetContentTimeout();
    };

    const start = () => {
        setContent("Listening....");
        recognition.start();
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
        
        if (lowerContent.includes("hey")) {
            speak("Hello sir, How may I assist you?");
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
        }else if (lowerContent.includes("open youtube")) {
            window.open("https://www.youtube.com");
            speak("Opening Youtube");
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
                <button onClick={start} className="btn-large">
                    <p className="content">{content}</p>
                </button>
            </div>
        </div>
    );
}

export default Jar;
