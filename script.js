document.addEventListener("keydown",(e)=>{
  const elem=document.querySelector(`#key-${e.keyCode}`)
  if(elem)
  {
    elem.classList.add("translate-y-1","shadow-xl","shadow-pink-100")
  }
});
document.addEventListener("keyup",(e)=>{
  const elem=document.querySelector(`#key-${e.keyCode}`)
  if(elem)
  {
    elem.classList.remove("translate-y-1","shadow-xl","shadow-pink-100")
  }
});
const showcase=document.querySelector("#text-showcase");
const input =document.querySelector("#user-input");
const timer=document.querySelector("#timer");
const button=document.querySelector("#start-btn");
button.addEventListener("click",main);
const inpute = () => {
  const field = document.querySelector('#user-input');
  document.querySelector('#start-btn').style.display = 'none';
  field.style.display = 'block'
  field.focus() 
}

input.addEventListener("input", (e) => {
  const value = e.target.value;
  const lastChar = value.slice(-1);
  if (lastChar === " ") {
    updateIndex();
  }
});
let words=[];
let currentIndex=0;
async function main()
{
  await getWords();
  generateWord(0);
  startTimer();
}
async function getWords(){
  const url="https://random-word-api.herokuapp.com/word?number=300&length=6";
  const data= await fetch(url);
  const result= await data.json();
  words=result;
}
function generateWord(startIndex){
  showcase.innerHTML="";
  for(let i=startIndex;i<startIndex+34;i++)
  {
    const spanElement =document.createElement("span");
    if(i=== startIndex)
    {
      spanElement.classList.add("bg-pink-500","rounded-lg")
    }
    spanElement.classList.add(`word-${i}`);
    spanElement.textContent = words[i].charAt(0).toUpperCase() + words[i].slice(1) + " "; 
    showcase.appendChild(spanElement);
  }
}
function updateIndex(){
  if(currentIndex>0 && currentIndex%33 === 0){
    currentIndex++
    generateWord(currentIndex)
    return
  }
  document.querySelector(`.word-${currentIndex}`).classList.remove("bg-pink-500","rounded-lg");
  currentIndex++;
  document.querySelector(`.word-${currentIndex}`).classList.add("bg-pink-500","rounded-lg");
}
///
function startTimer() {
  input.disabled = false;
  var i = 0;
  const intervalId = setInterval(() => {
    i++;
    timer.innerHTML = "00:" + i;
  }, 1000);

  setTimeout(() => {
    clearInterval(intervalId);
    input.disabled = true;
    correctnessDisplay(); 
    if(i==60)
    {
      document.querySelector("#timer").classList.add("bg-pink-900","rounded-lg");
    }
    
  }, 60000);
}
function correctnessDisplay() {
  const correctWords = words.map((word) => word.toLowerCase());
  const inputVal = input.value.trim(); 
  const typedWords = inputVal.split(" ").map((word) => word.toLowerCase());

  let correctWordCount = 0; 
  for (let i = 0; i < typedWords.length; i++) {
    if (typedWords[i] === correctWords[i]) {
      correctWordCount++;
    }
  }

  const correctnessDisplay = document.querySelector("#correctness");
  correctnessDisplay.innerHTML = correctWordCount;
 // alert(inputVal.length);
  const timeTaken = 1;
  wp(inputVal.length, timeTaken);
}

function wp(totalWords, timeTaken) {
  const wpm = Math.ceil(((totalWords/5) / timeTaken));
  const wpmDisplay = document.querySelector("#wpm");
  wpmDisplay.innerHTML = wpm;
}

