
function speak(text){
    
    const text_speak = new SpeechSynthesisUtterance(text);

    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;

    window.speechSynthesis.speak(text_speak);

}



const time = () => {
    const day = new Date();
    const hours = day.getHours();
    
    if (hours >= 0 && hours < 12) {
        speak("Good morning boss");
    } else if (hours >= 12 && hours < 18) {
        speak("Good afternoon boss");
    } else {
        speak("Good evening boss");
    }
}


window.addEventListener('load', () => {
    speak("rony welcomes you")
    time()
})



export default speak