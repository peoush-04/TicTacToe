const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer ;
let gameGrid ; 
var count=0;

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
function initGame(){

    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    count=0;
    newGameBtn.classList.remove("active");

    boxes.forEach((box)=>{
        //when we placed "x" or "o" in a box then we made the pointerevents of the box as none , so when we start a new game then we will initial thr game again so make the box content as empty and make their pointerEvensts as all 
        box.innerHTML="";
        box.style.pointerEvents = "all";
        box.classList.remove("win");
    })

    gameInfo.textContent = `Current Player - ${currentPlayer}`; 
}
initGame();

//adding event listener to all 9boxes
// this callback function has two arguments , first the element stored (box) in the boxes wala NodeList and second is the index (the second parameter is always a number so the callabck function by default has the power to give the index of the boxes )
boxes.forEach((box,index) =>{
    box.addEventListener("click",()=>{
        handleClick(index);
    })
});

function handleClick(index){
    // make sure that the index is empty 
    if(gameGrid[index]==""){
        // updating the UI 
        boxes[index].innerText = currentPlayer;
        //updating in the code logic
        gameGrid[index] = currentPlayer
        count++;
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
    let winner="";
    for(let i=0;i<winningPostions.length;i++)
    {
        if((gameGrid[winningPostions[i][0]]!="" || gameGrid[winningPostions[i][1]]!="" || gameGrid[winningPostions[i][2]]!="") && (gameGrid[winningPostions[i][0]]==gameGrid[winningPostions[i][1]] && gameGrid[winningPostions[i][1]] == gameGrid[winningPostions[i][2]]))
        {
            // got winner
            if(gameGrid[winningPostions[i][0]]=="X")
                winner="X";
            else
                winner="O";

            //make the winning boxes as green
            boxes[winningPostions[i][0]].classList.add("win");
            boxes[winningPostions[i][1]].classList.add("win");
            boxes[winningPostions[i][2]].classList.add("win");

            // display winner 
            gameInfo.textContent=`Winner Player - ${winner}`;
            //activate new game btn
            newGameBtn.classList.add("active");

            //once u get a winner then u shudn't be able to play further so make pointerEvents of all the boxes as none
            boxes.forEach((box)=>{
                box.style.pointerEvents="none";
            });

            break;
        }
    }
    //match tie
    if(count>=9 && winner==""){
        gameInfo.textContent="Game Tied !";
        newGameBtn.classList.add("active");
    }
}

//when new game button clicked then restart the game that is re initialise the game , so call initGame() function 
newGameBtn.addEventListener("click", initGame);