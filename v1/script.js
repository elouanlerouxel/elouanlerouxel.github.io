let canvas,screen, time, precTime, buttons, selected, start, startImg, smallImg, bigImg, smallTxt, bigTxt;

let boats = new Image();
boats.src = "img/boats.png";

let bigBot = new Image();
bigBot.src = "img/bigBot.png";

let sea = new Image();
sea.src = "img/sea.png";

let seaAnim = new Animation(sea, 7);
let bigBotAnim = new Animation(bigBot, 19)
let animations = [seaAnim];
let attacks = ["small", "big", "shield"];
let playerHealth = 3000, botHealth = 3000;
let playerStock = {small : 3, big : 1};
let botStock = {small : 3, big : 1};
let bigDamages = 500;
let smallDamages =  350;
let shieldProtection = smallDamages;

function Animation (img, maxFrame) {
	this.img = img;
	this.maxFrame = maxFrame;
	this.currentFrame = 0;
}

function gameloop () {
	time = new Date().getTime();
	if (time-130 >= precTime) {
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

	for (const animation of animations) {
		if (animation.currentFrame >= animation.maxFrame) {
			animation.currentFrame = 0;
		} else {
			animation.currentFrame++;
		}
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
	let botChoice = attacks[Math.floor(Math.random() * Math.floor(3))];
	let playerChoice = selected;

	startImg.src = "img/buttonPushed.png";
	start.removeEventListener("click", round);

	console.log("Bot : "+botChoice);
	console.log("Player : "+playerChoice);

	if (playerChoice != undefined) {
		if (botChoice == "small") {
			if (botStock.small == 0) {
				botStock.small = 3;
			} else {
				botStock.small--;
				if (playerChoice != "shield") {
					playerHealth -= smallDamages;
				} else {
					playerHealth -= smallDamages - shieldProtection;
				}
			}
		}

		if (botChoice == "big") {
			if (botStock.big == 0) {
				botStock.big = 1;
			} else {
				botStock.big--;
				if (playerChoice != "shield") {
					playerHealth -= bigDamages;
				} else {
					playerHealth -= bigDamages - shieldProtection;
				}
			}
			
		}

		if (playerChoice == "small") {
			if (playerStock.small == 0) {
				playerStock.small = 3;
				smallImg.src = "img/smallMissile.png";
			} else {
				playerStock.small--;
				if (botChoice != "shield") {
					botHealth -= smallDamages;
				} else {
					botHealth -= smallDamages - shieldProtection;
				}
			}
			smallTxt.innerHTML = playerStock.small;
		}

		if (playerChoice == "big") {
			if (playerStock.big == 0) {
				playerStock.big = 1;
				bigImg.src = "img/bigMissile.png";
			} else {
				playerStock.big--;
				if (botChoice != "shield") {
					botHealth -= bigDamages;
				} else {
					botHealth -= bigDamages - shieldProtection;
				}
			}
			bigTxt.innerHTML = playerStock.big;
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

	setTimeout(function () {
		if (playerHealth > 0 && botHealth > 0) {
			start.addEventListener("click", round);
			startImg.src = "img/button.png";
		}
	}, 1500);

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
	start.addEventListener("click", round)

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