let canvas,screen, time, precTime, buttons, selected, start, startImg, smallImg, bigImg, smallTxt, bigTxt;

let boats = new Image();
boats.src = "img/boats.png";

let bigBot = new Image();
bigBot.src = "img/bigBot.png";
let bigBotAnim = new Animation(bigBot, 21);
let smallBot = new Image();
smallBot.src = "img/smallBot.png";
let smallBotAnim = new Animation(smallBot, 21);
let bigPlayer = new Image();
bigPlayer.src = "img/bigPlayer.png";
let bigPlayerAnim = new Animation(bigPlayer, 21);
let smallPlayer = new Image();
smallPlayer.src = "img/smallPlayer.png";
let smallPlayerAnim = new Animation(smallPlayer, 21);

let shieldBigBot = new Image();
shieldBigBot.src = "img/shieldBigBot.png";
let shieldBigBotAnim = new Animation(shieldBigBot, 21);
let shieldSmallBot = new Image();
shieldSmallBot.src = "img/shieldSmallBot.png";
let shieldSmallBotAnim = new Animation(shieldSmallBot, 21);
let shieldBigPlayer = new Image();
shieldBigPlayer.src = "img/shieldBigPlayer.png";
let shieldBigPlayerAnim = new Animation(shieldBigPlayer, 21);
let shieldSmallPlayer = new Image();
shieldSmallPlayer.src = "img/shieldSmallPlayer.png";
let shieldSmallPlayerAnim = new Animation(shieldSmallPlayer, 21);

let shieldPlayer = new Image();
shieldPlayer.src = "img/shieldPlayer.png";
let shieldPlayerAnim = new Animation(shieldPlayer, 21);

let shieldBot = new Image();
shieldBot.src = "img/shieldBot.png";
let shieldBotAnim = new Animation(shieldBot, 21);

let reloadSmallPlayer = new Image();
reloadSmallPlayer.src = "img/reloadSmallPlayer.png";
let reloadSmallPlayerAnim = new Animation(reloadSmallPlayer, 21);

let reloadSmallBot = new Image();
reloadSmallBot.src = "img/reloadSmallBot.png";
let reloadSmallBotAnim = new Animation(reloadSmallBot, 21);

let reloadBigPlayer = new Image();
reloadBigPlayer.src = "img/reloadBigPlayer.png";
let reloadBigPlayerAnim = new Animation(reloadBigPlayer, 21);

let reloadBigBot = new Image();
reloadBigBot.src = "img/reloadBigBot.png";
let reloadBigBotAnim = new Animation(reloadBigBot, 21);

let sea = new Image();
sea.src = "img/sea.png";

let seaAnim = new Animation(sea, 7);
let defaultAnimations = [seaAnim];
let animations = [];
let attacks = ["small", "big", "shield"];
let playerHealth = 3000, botHealth = 3000;
let playerStock = {small : 3, big : 1};
let botStock = {small : 3, big : 1};
let bigDamages = 500;
let smallDamages =  350;
let animationSpeed = 130;
let shieldProtection = smallDamages;

function Animation (img, maxFrame) {
	this.img = img;
	this.maxFrame = maxFrame;
	this.currentFrame = 0;
}

function gameloop () {
	time = new Date().getTime();
	if (time-animationSpeed >= precTime) {
        draw();
        precTime = time;
    }
	window.requestAnimationFrame(gameloop);
}

function draw () {
	screen.clearRect(0,0,1100,500);
	screen.fillStyle = "#87ceeb";
	screen.fillRect(50,0,1000,500);
	screen.fillStyle = "#169b62";
	screen.fillRect(0,0,50,playerHealth/6);
	screen.fillStyle = "#3379ec";
	screen.fillRect(1050,0,50,botHealth/6);
	screen.drawImage(boats, 50, 0, 1000, 500);

	for (const animation of defaultAnimations) {
		if (animation.currentFrame >= animation.maxFrame) {
			animation.currentFrame = 0;
		} else {
			animation.currentFrame++;
		}
		screen.drawImage(animation.img, 1000*animation.currentFrame, 0, 1000, 500, 50, 0, 1000, 500);
	}

	for (const animation of animations) {
		if (animation.currentFrame >= animation.maxFrame) {
			animation.currentFrame = 0;
		} else {
			animation.currentFrame++;
		}
		console.log(animation.img);
		screen.drawImage(animation.img, 1000*animation.currentFrame, 0, 1000, 500, 50, 0, 1000, 500);
	}
}

function select () {
	for (const button of buttons) {
		button.classList.remove("selected");
	}
	this.classList.add("selected");
	selected = this.id;

}

function round () {

	startImg.src = "img/buttonPushed.png";
	start.removeEventListener("click", round);

	let botChoice = attacks[Math.floor(Math.random() * Math.floor(3))];
	let playerChoice = selected;

	console.log("Bot : "+botChoice);
	console.log("Player : "+playerChoice);

	if (playerChoice != undefined) {
		if (botChoice == "small") {
			if (botStock.small == 0) {
				botStock.small = 3;
				animations.push(reloadSmallBotAnim);
				if (playerChoice == "shield") {
					animations.push(shieldPlayerAnim);
				}
			} else {
				botStock.small--;
				if (playerChoice != "shield") {
					playerHealth -= smallDamages;
					animations.push(smallBotAnim);
				} else {
					playerHealth -= smallDamages - shieldProtection;
					animations.push(shieldSmallBotAnim);
				}
			}
		}

		if (botChoice == "big") {
			if (botStock.big == 0) {
				botStock.big = 1;
				animations.push(reloadBigBotAnim);
				if (playerChoice == "shield") {
					animations.push(shieldPlayerAnim);
				}
			} else {
				botStock.big--;
				if (playerChoice != "shield") {
					playerHealth -= bigDamages;
					animations.push(bigBotAnim);
				} else {
					playerHealth -= bigDamages - shieldProtection;
					animations.push(shieldBigBotAnim);
				}
			}
			
		}

		if (playerChoice == "small") {
			if (playerStock.small == 0) {
				playerStock.small = 3;
				smallImg.src = "img/smallMissile.png";
				animations.push(reloadSmallPlayerAnim);
				if (botChoice == "shield") {
					animations.push(shieldBotAnim);
				}
			} else {
				playerStock.small--;
				if (botChoice != "shield") {
					botHealth -= smallDamages;
					animations.push(smallPlayerAnim);
				} else {
					botHealth -= smallDamages - shieldProtection;
					animations.push(shieldSmallPlayerAnim);
				}
			}
			smallTxt.innerHTML = playerStock.small;
		}

		if (playerChoice == "big") {
			if (playerStock.big == 0) {
				playerStock.big = 1;
				bigImg.src = "img/bigMissile.png";
				animations.push(reloadBigPlayerAnim);
				console.log(animations);
				if (botChoice == "shield") {
					animations.push(shieldBotAnim);
				}
			} else {
				playerStock.big--;
				if (botChoice != "shield") {
					botHealth -= bigDamages;
					animations.push(bigPlayerAnim);
				} else {
					botHealth -= bigDamages - shieldProtection;
					animations.push(shieldBigPlayerAnim);
				}
			}
			bigTxt.innerHTML = playerStock.big;
		}

		if (botChoice == "shield" && playerChoice == "shield") {
			animations.push(shieldBotAnim);
			animations.push(shieldPlayerAnim);
		}

	} else {
		console.log("You should select an attack");
	}

	if (playerStock.small == 0) {
		smallImg.src = "img/reload.png";
	}

	if (playerStock.big == 0) {
		bigImg.src = "img/reload.png";
	}

	setTimeout(function () {
		for (const animation of animations) {
			animation.currentFrame = 0;
		}
		animations = [];
		start.addEventListener("click", round);
		startImg.src = "img/button.png";
	}, animationSpeed*smallBotAnim.maxFrame);

	if (playerHealth <= 0 && botHealth <= 0) {
		console.log("Peace");
		start.removeEventListener("click", round);
	} else if (playerHealth <= 0) {
		console.log("You lose, the Bot win");
		start.removeEventListener("click", round);
	} else if (botHealth <= 0) {
		console.log("You win, the Bot lose");
		start.removeEventListener("click", round);
	}

}

window.addEventListener("DOMContentLoaded", main);

function main () {
	canvas = document.getElementById("game");
	screen = canvas.getContext("2d");

	buttons = document.getElementsByClassName("button");
	for (const button of buttons) {
		button.addEventListener("click", select);
	}

	startImg = document.getElementById("startImg");
	start = document.getElementById("start");
	start.addEventListener("click", round);

	smallImg = document.getElementById("smallImg");
	bigImg = document.getElementById("bigImg");

	smallTxt = document.getElementById("smallStock");
	bigTxt = document.getElementById("bigStock");
	smallTxt.innerHTML = playerStock.small;
	bigTxt.innerHTML = playerStock.big;

	sea.addEventListener("load", function () {
			screen.fillStyle = "#87ceeb";
			screen.fillRect(50,0,1000,500);
			screen.fillStyle = "#169b62";
			screen.fillRect(0,0,50,playerHealth/6);
			screen.fillStyle = "#3379ec";
			screen.fillRect(1050,0,50,botHealth/6);
			screen.drawImage(boats, 50, 0, 1000, 500);
			screen.drawImage(seaAnim.img, 1000*seaAnim.currentFrame, 0, 1000, 500, 50, 0, 1000, 500);
			precTime = new Date().getTime();
			window.requestAnimationFrame(gameloop);
	})
}