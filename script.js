const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer ;
let gameGrid ; 
const winningPostions =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//let's create a function to initialise the game
function initialGame(){

    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    newGameBtn.classList.remove("active");

    // this callbaack function has two arguments , first the value stored (box) in the boxes wala NodeList and second is the index (the second parameter is always a number so the callabck function by default has the power to give the index of the boxes )
    boxes.forEach((box,index)=>{
        //when we placed "x" or "o" in a box then we made the pointerevents of the box as none , so when we start a new game then we will initial thr game again so make the box content as empty and make their pointerEvensts as all 
        console.log(box , " -> " ,index);
        box.innerHTML="";
        boxes[index].style.pointerEvents = "all";
    })

    gameInfo.textContent = `Current Player - ${currentPlayer}`; 
}
initialGame();

//adding event listener to all 9boxes
boxes.forEach((box,index) =>{
    box.addEventListener("click",()=>{
        handleClick(index);
    })
});

function handleClick(index){
    if(gameGrid[index]==""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer
        boxes[index].style.pointerEvents = "none";

        swapTurn();

        checkGameOver();
    }
}

function swapTurn(){
    if(currentPlayer == "X")
        currentPlayer = "O";
    else
        currentPlayer = "X";
    gameInfo.textContent = `Current Player - ${currentPlayer}`;
}

function checkGameOver(){
    
}