// Each time this function is called a GameObject
// is create based on the arguments
// In JavaScript you can consider everything an Object
// including functions

function GameObject(name, img, health, maxFrame, width, height, x, y, auto) {
    this.name = name;
    this.img = img;
    this.health = health;
    this.x = 300-x;
    this.y = y;
    this.maxFrame = maxFrame;
    this.currentFrame = 0;
    this.width = width/this.maxFrame;
    this.height = height;
    this.auto = auto;
    this.win=false;
    this.move = true;
}

// The GamerInput is an Object that holds the current input
function GamerInput() {
    this.right = false;
    this.left = false;
    this.up = false;
    this.left = false;
}

// Process keyboard input event
function input(event) {
    // Take Input from the Player
    if (event.type === "keydown") {
        switch (event.keyCode) {
            case 37:
                gamerInput.left = true;
                break; //Left key
            case 38:
                gamerInput.up = true;
                break; //Up key
            case 39:
                gamerInput.right = true;
                break; //Right key
            case 40:
                gamerInput.down = true;
                break; //Down key
            default:
                break;
        }
    } else {
         switch (event.keyCode) {
            case 37:
                gamerInput.left = false;
                break; //Left key
            case 38:
                gamerInput.up = false;
                break; //Up key
            case 39:
                gamerInput.right = false;
                break; //Right key
            case 40:
                gamerInput.down = false;
                break; //Down key
            default:
                break;
        }
    }
}

function update() {
    // Iterate through all GameObjects
    // Updating position and gamestate
    // console.log("Update");
    for (i = 0; i < gameobjects.length; i++) {

        /*if (gameobjects[i].auto) {console.log("y"+gameobjects[i].y+"x"+gameobjects[i].x)}*/

        //Conditions to make the NPC jump over the plank

        if (gameobjects[i].auto && gameobjects[i].move && (gameobjects[i].y < 250 || gameobjects[i].y > 350 || gameobjects[i].x < 15)) {gameobjects[i].y+=10;}

        if (gameobjects[i].auto && gameobjects[i].move && (gameobjects[i].y > 230 && gameobjects[i].y < 333 && gameobjects[i].x > 21)) {gameobjects[i].x-=10;}

        if (gameobjects[i].auto && gameobjects[i].move && (gameobjects[i].y > 375 && gameobjects[i].x < 300-gameobjects[i].height)) {gameobjects[i].x+=10;}

        //Test if the NPC win

        if (gameobjects[i].name=="NPC" && gameobjects[i].move) {
            if (gameobjects[i].y > 730 || player.health <= 3) {
                gameobjects[i].win = true;
                player.win = false;
            }
        }

        if (gameobjects[i].name=="Player" && gameobjects[i].move) {
            if (gamerInput.right && (gameobjects[i].y < 180 || gameobjects[i].y > 300 || gameobjects[i].x < 0)) {
                gameobjects[i].y += 15;
            }

            if (gamerInput.left && (gameobjects[i].y > 315 || gameobjects[i].y < 195 || gameobjects[i].x < 0)) {
                gameobjects[i].y -= 15;
            }

            if (gamerInput.up && gameobjects[i].x > -30) {
                gameobjects[i].x -= 15;
            }

            if (gamerInput.down && gameobjects[i].x < 150 && (gameobjects[i].y > 300 || gameobjects[i].y < 195)) {
                gameobjects[i].x += 15;
            }

            //Test if the player win

            if (gameobjects[i].y > 632) {
                gameobjects[i].win = true;
                gameobjects.filter(obj => {return obj.name == "NPC"})[0].win = false;
            }

            if (gameobjects[i].y > 170 && gameobjects[i].y < 195 && gameobjects[i].x > 0 && gameobjects[i].health>3) {
                gameobjects[i].health-=3;
            }
            

            if (gameobjects[i].health < 30) {
                context.fillStyle = "red";
            }
        }

    }
}

//Draw to Screen
function draw() {
    // Clear Canvas
    // Iterate through all GameObjects
    // Draw each GameObject
    
    //Draw all the non gameobjects things
    context.clearRect(0,0,800,800);
    context.drawImage(bgImg,0,0,1000,300);
    context.fillRect(player.y+147, player.x+10, player.health, 13);
    context.strokeRect(player.y+147, player.x+10, 100, 13);
    context.drawImage(lineImg,700,65,268,268);

    for (i = 0; i < gameobjects.length; i++) {
        if (gameobjects[i].currentFrame >= gameobjects[i].maxFrame) {gameobjects[i].currentFrame=0;}

        context.drawImage(gameobjects[i].img, gameobjects[i].width*gameobjects[i].currentFrame, 0, gameobjects[i].width, gameobjects[i].height, gameobjects[i].y, gameobjects[i].x, gameobjects[i].width, gameobjects[i].height);

        gameobjects[i].currentFrame++;
    }
    precTime = time;
}

function gameloop() {
    time = new Date().getTime();
    //Fill the table with winer gameobject or with loser
    loser = gameobjects.filter(obj => {return obj.win == false});
    winner = gameobjects.filter(obj => {return obj.win == true});

    if (loser.length === 2) {
        context.drawImage(loserImg, loser[0].y, loser[0].x, 300,150);
        context.drawImage(winnerImg, winner[0].y, winner[0].x, 300,150);
        if (winner[0].name == "Player") {
            scoreNumber = (Date.now() - startDate) / 1000;
        }
        score = scoreNumber.toFixed(3);
        if (scoreNumber < localStorage.getItem(usernameClient)) {
            localStorage.setItem(usernameClient, score);
            displayScore.innerHTML = "New High Score!";
            username.innerHTML = "Hi " + usernameClient + "!<br>Your high score is " + localStorage.getItem(usernameClient);
            rank = "";
            for ( var i = 0; i < localStorage.length; i++) {
                rank += localStorage.key(i) + " : " + localStorage.getItem(localStorage.key(i)) + "<br>";
            }
document.getElementById("rank").innerHTML = rank;
        } else {
            displayScore.innerHTML = score;
        }
        return;
    }

    if (time-100 > precTime) {
        update();
        draw();
        precTime = time;
    }

    window.requestAnimationFrame(gameloop);
}

function updateBg (e) {
    switch (this.value) {
        case "day":
            bgImg.src = "img/bg.png";
            break;
        case "sunset":
            bgImg.src = "img/bgSunset.png";
            break;
        case "night":
            bgImg.src = "img/bgNight.png";
            break;
    }
    this.blur();
}

// Default GamerInput is set to None
var gamerInput = new GamerInput(); //No Input

var playerImg = new Image();
playerImg.src = "img/knight.png";

var npcImg = new Image();
npcImg.src = "img/dino.png";

var bgImg = new Image();
bgImg.src = "img/bg.png";

var urlParam = new URLSearchParams(window.location.search);

var username = document.getElementById("usernameZone");

if (urlParam.has("time")) {
    switch (urlParam.get("time")) {
        case "day":
            bgImg.src = "img/bg.png";
            break;
        case "sunset":
            bgImg.src = "img/bgSunset.png";
            break;
        case "night":
            bgImg.src = "img/bgNight.png";
            break;
    }
}

var startDate = Date.now();
var scoreNumber = 15.000;
var score = scoreNumber.toFixed(3);
var displayScore = document.getElementById("score");
if (urlParam.has("username")) {
    var usernameClient = urlParam.get("username");
} else {
    var usernameClient = "Default_username";
}
if (localStorage.getItem(usernameClient) === null) {
    localStorage.setItem(usernameClient,score);
}

var rank;

setTimeout(function () {
    for ( var i = 0; i < localStorage.length; i++) {
        rank += localStorage.key(i) + " : " + localStorage.getItem(localStorage.key(i)) + "<br>";
    }
    document.getElementById("rank").innerHTML = rank;
}, 1000)

username.innerHTML = "Hi " + usernameClient + "!<br>Your high score is " + localStorage.getItem(usernameClient) + " seconds";

var lineImg = new Image();
lineImg.src = "img/line.png";

var plankImg = new Image();
plankImg.src = "img/plank.png";

var loserImg = new Image();
loserImg.src = "img/loser.png";
console.log(loserImg);

var winnerImg = new Image();
winnerImg.src = "img/winner.png";
console.log(winnerImg);

var loser;

var winner;

// Default Player
var player = new GameObject("Player", playerImg, 100, 8, 3072, 173, 173, -100, false);

// Gameobjects is a collection of the Actors within the game
var gameobjects = [player, new GameObject("NPC", npcImg, 100, 5, 720, 108, 108, -200, true), new GameObject("Obstacle", plankImg, 100, 13, 1664, 128, 142, 375, false)];

var time;
var precTime = new Date().getTime();

// Handle Keypressed
window.addEventListener('keyup', input);
window.addEventListener('keydown', input);

var canvas = document.getElementById("game");
var context = canvas.getContext("2d");
context.fillStyle = "green";

// Handle Active Browser Tag Animation
window.requestAnimationFrame(gameloop);