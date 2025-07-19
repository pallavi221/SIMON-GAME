 let gameSeq=[];
 let userSeq=[];

 let btns=[ "red","yellow","green","purple"];

let started =false;
let level =0;
let maxScore=0;
maxScore = Math.max(maxScore, level - 1);


let h2= document.querySelector("h2");

// document.addEventListener("keypress",function(){
//     if(started==false){
//         console.log("game is started");
//         started = true;

//         levelUp();
      
//     }
// });
document.addEventListener("keypress", function () {
  if (!started) {
    started = true;
    levelUp(); // this MUST run to start the game
  }
});




function userflash(btn){
   btn.classList.add("userflash");
   setTimeout (function(){
    btn.classList.remove("userflash");
   },250);
   }
  //  function gameflash(btn){
  //  btn.classList.add("flash");
  //  setTimeout (function(){
  //   btn.classList.remove("flash");
  //  },250);
  //  }
  function gameflash(btn) {
  if (!btn) return; // safety check

  btn.classList.add("flash");
  setTimeout(() => {
    btn.classList.remove("flash");
  }, 250);
}


function levelUp (){
   userSeq=[];
    level++;
    h2.innerText=`level ${level}`;

    let randIdx = Math.floor( Math.random()*4);
    let randColor=btns[randIdx];
    let randbtn = document.querySelector( `.${randColor}`);
    // console.log(randIdx);
    // console.log(randColor);
    // console.log(randbtn);
    gameSeq.push(randColor);
    // console.log(gameSeq);

    gameflash(randbtn);
}

function checkAns(idx){
  // console.log( "curr level: ",level);


  if ( userSeq[idx]==gameSeq[idx]){
    if( userSeq.length==gameSeq.length){

     setTimeout( levelUp,1000);
    }
  }
  else{
    if(level > maxScore){
      maxScore= level;
    }
    h2.innerHTML=`Game over! your score was <b>${level}</b> <br>Press any key to start`;
    document.querySelector("body").style.backgroundColor="red";
    setTimeout( function(){
      document.querySelector("body").style.backgroundColor="white";
    },150);
    reset();
  }
}

function btnPress (){
  // console.log(this);
  // let btn = this;
  // userflash(btn);
  if (!started) return; // Prevent pressing before game starts

  let btn = this;
  userflash(btn);

  let userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  checkAns(userSeq.length - 1);




}

let Allbtns=document.querySelectorAll(".btn");
for( let btn of Allbtns){
  btn.addEventListener( "click",btnPress);
}

function reset(){
  started=false;
  gameSeq=[];
  userSeq=[];
  level=0;
}
function playSound(color) {
  let audio = new Audio(`${color}.mp3`);
  audio.play();
}
gameflash(randbtn);
playSound(randColor);
