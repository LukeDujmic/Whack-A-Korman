const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const countdownBoard = document.querySelector('.countdown');
const startButton = document.querySelector('.startButton');

//setting up variables for functions to alter later down the rode;
let lastHole;               //the hole that a yoda was in beforehand    
let timeUp = false;         //a boolean for if time is up, which will end the game in a function
let timeLimit = 60000;      //the time limit you get during a round
let score = 0;              //the score will go up by 1 per yoda 
let countdown;              //countdown timer variable
let isGolden = false;       //boolean that checks if a yoda will be golden or not (golden yodas will give +5 points)
let gameStarted = false;

function pickRandomHole(holes)
{
    const randomHole = Math.floor(Math.random() * holes.length);        //this generates a random number 0-5
    const hole = holes[randomHole];     //that random number is used as an index for the holes variable to determine where a yoda will appear
    if (hole === lastHole)      //this makes sure that a yoda doesn't appear in the same hole is previously went in
    {
        return pickRandomHole(holes);
    }
    lastHole = hole;
    return hole;
}
function popOut()
{
    const goldenYoda = Math.ceil(Math.random() * 5);        // yodas have a 1/5 chance of being golden
    if (goldenYoda == 1)    
    {
        const time = Math.random() * 200 + 750;        // this randomizes a time for yodas to pop out
        const hole = pickRandomHole(holes);
        hole.classList.add('up');           // this whole section below adds the 'up' class to the yoda so they pop out, and then removes it when they the time is up. 
        isGolden = true;                    // makes the variable for golden to true, since the whack function will rely on that
        setTimeout(function(){  
            hole.classList.remove('up');
            isGolden = false;
            if (!timeUp) popOut();      //makes sure that yodas don't pop out when the game time is up
        }, time)

    }
    else
    {
        const time = Math.random() * 600 + 900;        // this randomizes a time for yodas to pop out
        const hole = pickRandomHole(holes);
        hole.classList.add('up');           // this whole section below adds the 'up' class to the yoda so they pop out, and then removes it when they the time is up
        isGolden = false;               // since the 1/5 chance for the golden yoda wasn't met, golden should be set to false
        setTimeout(function(){  
            hole.classList.remove('up');
            isGolden = false;
            if (!timeUp) popOut();      //makes sure that yodas don't pop out when the game time is up
        }, time)
    }


}
function startGame()
{
    if (gameStarted == false)
    {
        gameStarted = true;
        countdown = timeLimit/1000;         //resets variables when the Start Game button is pressed
        scoreBoard.textContent = 0;
        scoreBoard.getElementsByClassName.display = "block";
        countdownBoard.textContent = countdown;         //displaying the variable as text in HTML
        timeUp = false;
        score = 0;
        isGolden = false;
        popOut();       
        setTimeout(function(){          //after the amount of time in the timeLimit variable is used, timeUp will be set to true, which will activate conditions to end the game in other functions
            timeUp = true;
            gameStarted = false;
        }, timeLimit)
    
        let startCountdown = setInterval(function(){        // countdown variable decreases by 1 every second, and is displayed on HTML
            countdown -= 1;
            countdownBoard.textContent = countdown;
            if (countdown < 0)          // when the countdown reaches 0, the game ends and the interval is removed for next game
            {       
                countdown = 0;
                clearInterval(startCountdown);
                countdownBoard.textContent = "NONE!"
            }
        }, 1000)
    }

}
startButton.addEventListener("click", startGame); // add a function when the start button is clicked

function whack(e)       // whack function
{
    if (isGolden == true)       // if its golden, it will reveal itself as golden AND give +3 to the score value
    {
        score += 3;
        this.style.backgroundImage = 'url("Gkorman2.png")';       //GOLDEN whacked image
        this.style.pointerEvents = 'none';
        setTimeout(() => {
            this.style.backgroundImage = 'url("korman1.png")';        // makes sure image isn't golden afterwards
            this.style.pointerEvents = 'all';
        }, 800)
        scoreBoard.textContent = score;
    }
    else        // if its just a normal yoda, it will have the normal animation for being whacked and give only +1 to the score value
    {
        score++;
        this.style.backgroundImage = 'url("korman2.png")';        //whacked image
        this.style.pointerEvents = 'none';
        setTimeout(() => {
            this.style.backgroundImage = 'url("korman1.png")';        //resets the yoda back to its original state before being whacked
            this.style.pointerEvents = 'all';
        }, 1000)
        scoreBoard.textContent = score;
    }
}
moles.forEach(mole => mole.addEventListener("click", whack));   // add the whack function for when a yoda is clicked
