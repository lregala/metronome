import Timer from './timer.js';


const tempoDisplay = document.querySelector('#bpm');
const tempoDescriptor = document.querySelector('.tempo-marking');
const tempoSlider = document.querySelector('.slider');
const btnPlayback = document.querySelector('#btn-playback');
const tempoDecrement = document.querySelector('#bpm-decrement');
const tempoIncrement = document.querySelector('#bpm-increment');


const minTempo = 20;
const maxTempo = 300;

let bpm = 120;
let tempoMarking = "Allegro";
let count = 0;
// let isRunning = false;
let beatsPerMeasure = 4;
let btnText = "START"

btnPlayback.addEventListener('click', ()=> {
    count =0;
    btnText = btnPlayback.textContent;

    if (btnText == "START") {
        btnPlayback.textContent = "STOP"
        metronome.start();
    } else {
        btnPlayback.textContent = "START"
        metronome.stop();
    }

});

tempoDecrement.addEventListener('click', ()=> {
    bpm = tempoSlider.value;
    if (bpm!=minTempo){
        bpm--;
        tempoDisplay.textContent = bpm;
        tempoSlider.value = bpm;
        updateMetronome();
    }
});

tempoIncrement.addEventListener('click', ()=> {
    bpm = tempoSlider.value;
    if (bpm!=maxTempo){
        bpm++;
        tempoDisplay.textContent = bpm;
        tempoSlider.value = bpm;
        updateMetronome();
    }
});


tempoSlider.addEventListener('input', ()=> {
  bpm = tempoSlider.value;
  tempoDisplay.textContent = bpm;
  tempoSlider.value = bpm;
  updateMetronome();
});

tempoSlider.addEventListener('input', ()=>{
    bpm = tempoSlider.value;
    validateTempo();
    updateMetronome();
})


function updateMetronome() {
    tempoDisplay.textContent = bpm;
    tempoSlider.value = bpm;
    
    metronome.timeInterval = 60000/bpm;
    if (bpm<40){
        tempoMarking="Grave";
    } else if (bpm >=40 && bpm <60) {
        tempoMarking="Lento";
    } else if (bpm >=60 && bpm <76) {
        tempoMarking="Adagio";
    } else if (bpm >=76 && bpm <108) {
        tempoMarking="Andante";
    } else if (bpm >=108 && bpm <120) {
        tempoMarking="Moderato";
    } else if (bpm >=120 && bpm <168) {
        tempoMarking="Allegro";
    } else if (bpm >=168 && bpm <200) {
        tempoMarking="Presto";
    } else {
        tempoMarking="Prestissimo";
    }

    tempoDescriptor.textContent = tempoMarking;

}

function validateTempo() {
    if (bpm <=20) {return}
    if (bpm >= 300) {return}
}



const click1 = new Audio("./sfx/weak/metro1w.wav");
const click2 = new Audio("./sfx/strong/metro1s.wav");

function playClick(){
    if (count === beatsPerMeasure) {
        count = 0;
    }
    if (count ===0) {
        click2.play();
        click2.currentTime=0;
    } else {
        click1.play();
        click1.currentTime = 0;
    }
    count++;
}

const metronome = new Timer(playClick, 60000/bpm, {immediate: true});
