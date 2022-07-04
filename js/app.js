import Timer from './timer.js';


const tempoDisplay = document.querySelector('#bpm');
const tempoDescriptor = document.querySelector('.tempo-marking');
const tempoSlider = document.querySelector('.slider');
const btnPlayback = document.querySelector('#btn-playback');
const tempoDecrement = document.querySelector('#bpm-decrement');
const tempoIncrement = document.querySelector('#bpm-increment');

const beatsDecrement = document.querySelector('#beats-decrement');
const beatsIncrement = document.querySelector('#beats-increment');
const beatsText = document.querySelector('.beatsPerMeasure');

const minTempo = document.getElementById("metroRange").min;
const maxTempo = document.getElementById("metroRange").max;

const minBeats = 2;
const maxBeats = 8;

let bpm = 160;
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



beatsDecrement.addEventListener('click', ()=> {
    beatsPerMeasure = parseInt(beatsText.textContent);
    if (beatsPerMeasure!=minBeats){
        beatsPerMeasure--;
        beatsText.textContent = beatsPerMeasure;
        
        count=0;
        updateMetronome();
    }
});

beatsIncrement.addEventListener('click', ()=> {
    beatsPerMeasure = parseInt(beatsText.textContent);
    if (beatsPerMeasure!=maxBeats){
        beatsPerMeasure++;
        beatsText.textContent = beatsPerMeasure;
       
        count=0;
        updateMetronome();
    }
});





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
    if (bpm <=minTempo) {return}
    if (bpm >= maxTempo) {return}
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
