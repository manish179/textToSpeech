
//Init SpeechSynthesis API
const synth = window.speechSynthesis;

//DOM elements
const textForm = document.querySelector("form");
const textInput = document.querySelector("#text-input");
const voiceSelect = document.querySelector("#voice-select");
const rate = document.querySelector("#rate");
const rateValue = document.querySelector("#rate-value");
const pitch = document.querySelector("#pitch");
const pitchValue = document.querySelector("#pitch-value");
const body = document.querySelector('body'); 

 //Init Voices Array
let voices = [];

const getVoices = () => {      //=> arrow function
    voices = synth.getVoices();


    //loop throught voices and create an option for each one
    voices.forEach(voice => {
        //create Option Element
        const option = document.createElement('option');  // createElement ko parameter value ==nodename/type==string/desc==Required.The name of the element you want to create.
        //Fill option with voice and language
        option.textContent = voice.name + '(' + voice.lang + ')';

        //Set neede option attributes
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        voiceSelect.appendChild(option);

    });

};

getVoices();
if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = getVoices; 
}


//speak
const speak = () => {
 
    //check if speaking
    if (synth.speaking) {
        console.error('Already Speaking..');
        return;
    }
    if (textInput.value !== '') {
        //add background animation
        body.style.background = 'url( img/wave.gif)';
        body.style.backgroundRepeat = 'repeat-x';
        body.style.backgroundSize = '100% 100%';
        //get speak text
        const speakText = new SpeechSynthesisUtterance(textInput.value);
        //speak end
        speakText.onend = e => {
            console.log('DOne Speaking..');
            body.style.background='transparent';
        }

        //speak error
        speakText.oneerror = e => {
            console('something went wrong');
        }
        //selected Voice
        const selectedVoice = voiceSelect.selectedOptions[0]
            .getAttribute('data-name');

        //loop through voices
        voices.forEach(voice => {
            if (voice.name === selectedVoice) {
                speakText.voice = voice;
            }
        });

        //set pitch and rate
        speakText.rate = rate.value;
        speakText.pitch = pitch.value;

        //speak 
        synth.speak(speakText);

    }


};

//Event Listeners


//text form submit
textForm.addEventListener('submit', e => {
    e.preventDefault();
    speak();
    textInput.blur();

});

//Rate value change
rate.addEventListener('change', e => (rateValue.textContent = rate.value));

//pitchc value change
pitch.addEventListener('change', e => (pitchValue.textContent = pitch.value));


//voice select change
voiceSelect.addEventListener('chnage', e => speak());

