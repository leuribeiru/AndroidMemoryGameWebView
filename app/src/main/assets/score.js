var scoreContainer;
var btnClearScores;
var tabTime;
var tabError;

var scoreTitle;
var scoreList;

window.onload = () => {
    getDomElements();
    setEventListenners();
    fixingHeightContainer();
    onTabTimeClick();
}

function fixingHeightContainer(){
    const initialHeight = window.getComputedStyle(scoreContainer).height;
    scoreContainer.style.height = initialHeight;
}

function getDomElements(){
    scoreContainer = document.getElementById("scoreContainer");
    btnClearScores = document.getElementById("btnClearScores");
    tabTime = document.getElementById("tabTime");
    tabError = document.getElementById("tabError");
    scoreTitle = document.getElementById("scoreTitle");
    scoreList = document.getElementById("scoreList");
}

function setEventListenners(){
    tabTime.addEventListener("click", onTabTimeClick);
    tabError.addEventListener("click", onTabErroClick);
    btnClearScores.addEventListener("click", onBtnClearScoresClick);
}

function onTabTimeClick(){
    tabTime.setAttribute("disabled", true);
    tabError.removeAttribute("disabled");
    scoreTitle.innerText = "PONTUAÇÃO POR TEMPO";
    loadTimeList();
}

function onTabErroClick(){
    tabError.setAttribute("disabled", true);
    tabTime.removeAttribute("disabled");
    scoreTitle.innerText = "PONTUAÇÃO POR ERROS";

    loadErrorsList();
}

function loadTimeList(){

    const list = getScoreByTime();

    scoreList.innerHTML = "";
    for (const item of list) {
        const scoreItem = document.createElement("div");
        scoreItem.className = 'score-item';
        const name = document.createElement("div");
        name.innerText = item.name;
        const time = document.createElement("div");
        time.innerText = item.timeResult + " segundo(s)";
        scoreItem.appendChild(name);
        scoreItem.appendChild(time);
        scoreList.appendChild(scoreItem);
    }
}

function loadErrorsList(){

    const list = getScoreByMistakes();

    scoreList.innerHTML = "";
    for (const item of list) {
        const scoreItem = document.createElement("div");
        scoreItem.className = 'score-item';
        const name = document.createElement("div");
        name.innerText = item.name;
        const errors = document.createElement("div");
        errors.innerText = item.mistakes + " erro(s)";
        scoreItem.appendChild(name);
        scoreItem.appendChild(errors);
        scoreList.appendChild(scoreItem);
    }
}

function getScore(){
    return JSON.parse(localStorage.getItem("score")) || [];
}

function getScoreByTime(){

    function byTime(a, b){
        if(a.timeResult > b.timeResult) return 1;
        if(a.timeResult < b.timeResult) return -1;
        return 0;
    }

    let scores = getScore();
    let scoreByTime = scores.sort(byTime);

    return scoreByTime;
}

function getScoreByMistakes(){

    function byMistake(a, b){
        if(a.mistakes > b.mistakes) return 1;
        if(a.mistakes < b.mistakes) return -1;
        return 0;
    }

    let scores = getScore();
    let scoreByTime = scores.sort(byMistake);

    return scoreByTime;
}


function onBtnClearScoresClick(){
    Android.onClearScoreClick();
}

function doClearScore(){
    localStorage.clear();
    Android.androidToast("Os placares foram apagados!");
    if(tabTime.hasAttribute("disabled")){
        loadTimeList();
    }else{
        loadErrorsList();
    }
}

function cancelClearScore(){
    Android.androidToast("Os placares não foram apagados!");
}