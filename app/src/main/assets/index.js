var numPossibilities = 6;
var possibilities;
var numericList;
var hits;
var mistakes;
var startTime;

//DOM elements
var gameContainer;
var gridCards;
var btnRestart;
var btnScore;
var progressBar;
var btn1;
var btn2;
var btn3;
var btn4;
var btn5;
var btn6;
var gridWinner;
var timeResult;
var errosResult;
var inputName;
var btnSave;


window.onload = () => {
    getDomElements();
    setEventListenners();

    fixingHeightContainer();

    start();
}


function fixingHeightContainer(){
    const initialHeight = window.getComputedStyle(gameContainer).height;
    gameContainer.style.height = initialHeight;
}

function getDomElements(){
    gameContainer = document.getElementById("gameContainer");
    gridCards = document.getElementById("gridCards");
    btnRestart = document.getElementById("btnRestart");
    btnScore = document.getElementById("btnScore");
    progressBar = document.getElementById("progressBar");
    btn1 = document.getElementById("btn1");
    btn2 = document.getElementById("btn2");
    btn3 = document.getElementById("btn3");
    btn4 = document.getElementById("btn4");
    btn5 = document.getElementById("btn5");
    btn6 = document.getElementById("btn6");
    gridWinner = document.getElementById("gridWinner");
    timeResult = document.getElementById("timeResult");
    errosResult = document.getElementById("errosResult");
    inputName = document.getElementById("inputName");
    btnSave = document.getElementById("btnSave");
}

function setEventListenners(){
    btnRestart.addEventListener("click", start);
    btn1.addEventListener("click", onBtnCardClick);
    btn2.addEventListener("click", onBtnCardClick);
    btn3.addEventListener("click", onBtnCardClick);
    btn4.addEventListener("click", onBtnCardClick);
    btn5.addEventListener("click", onBtnCardClick);
    btn6.addEventListener("click", onBtnCardClick);
    btnScore.addEventListener("click", onBtnScoreClick);
    inputName.addEventListener("input", enableDisableSaveButton);
    btnSave.addEventListener("click", onBtnSaveClick);
}

function onBtnCardClick(event){
    if(event.target.innerHTML == numericList[hits]){
        event.target.classList.add('btn-none');
        gameContainer.style.backgroundColor = window.getComputedStyle(event.target).backgroundColor;
        hits += 1;
        progressBar.setAttribute("value", calcProgress(hits));
        if(hits == numPossibilities){
            win()
        }
    }else{
        mistakes += 1;
        resetSession();
    }
}

function start(){
    
    resetSession();

    mistakes = 0
    startTime = new Date();

    createRandomNumberList();

}

function resetSession(){
    
    gameContainer.style.backgroundColor = 'white';

    gridWinner.style.display = 'none';
    gridCards.style.display = 'inline-flex';

    btn1.classList.remove('btn-none')
    btn2.classList.remove('btn-none')
    btn3.classList.remove('btn-none')
    btn4.classList.remove('btn-none')
    btn5.classList.remove('btn-none')
    btn6.classList.remove('btn-none')

    progressBar.setAttribute("value", 0);

    hits = 0;
}

function win(){
    let finishTime = new Date();
    let timeRes = finishTime.getTime() - startTime.getTime();
    
    timeResult.innerText = timeRes/1000;
    errosResult.innerText = mistakes;

    gridWinner.style.display = 'inline-flex';
    gridCards.style.display = 'none';

    enableDisableSaveButton()

}

function createRandomNumberList(){

    possibilities = [];
    numericList = [];

    for(i = 0; i< numPossibilities; i++){
        possibilities.push(i+1);
    }
    
    for(i=0; i< numPossibilities; i++){
        let index = Math.round(Math.random()*(possibilities.length - 1))
        let result = possibilities[index];
        numericList.push(result);
        possibilities.splice(index, 1);
    }

    console.log(numericList)
}

function calcProgress(hits){ return Math.round(hits*100/numPossibilities) }

function onBtnSaveClick(event){
    const name = inputName.value;
    const mistakes = parseInt(errosResult.innerHTML);
    const time = parseFloat(timeResult.innerHTML);
    const score = {
        name: name,
        mistakes: mistakes,
        timeResult: time
    }
    addScore(score);
    Android.androidToast('Sua pontuação foi salva com sucesso!');
}

function getScore(){
    return JSON.parse(localStorage.getItem("score")) || [];
}


function addScore(score){
    let scores = getScore();
    scores.push(score);
    localStorage.setItem("score", JSON.stringify(scores));
}

function enableDisableSaveButton(){
console.log(inputName.value.length)
    if(inputName.value.length < 1){
        btnSave.setAttribute("disabled", true);
    }else{
        btnSave.removeAttribute("disabled");
    }
}

function onBtnScoreClick(){
    window.open('./score.html', '_blank');
}