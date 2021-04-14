let canvas,screen, time, precTime, buttons, selected, start, startImg, smallImg, bigImg, smallTxt, bigTxt, alertText, scoreBoard, play, modal, weather, user, alertUser, restart, alertScreen;

let boats = new Image();
boats.src = "img/boats.png";

let daySky = new Image();
daySky.src = "img/daySky.png";
let nightSky = new Image();
nightSky.src = "img/nightSky.png";
let sunsetSky = new Image();
sunsetSky.src = "img/sunsetSky.png";

let life = new Image();
life.src = "img/life.png";

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

let healthBarPlayer = new Image();
healthBarPlayer.src = "img/healthBarPlayer.png";

let sea = new Image();
sea.src = "img/sea.png";

let healthBarBot = new Image();
healthBarBot.src = "img/healthBarBot.png";

let seaAnim = new Animation(sea, 7);
let defaultAnimations = [seaAnim];
let animations = [];
let attacks = ["shield", "big", "small"];
let playerHealth = 2500, botHealth = 2500;
let playerStock = {small : 3, big : 1};
let botStock = {small : 3, big : 1};
let bigDamages = 500;
let smallDamages =  350;
let animationSpeed = 130;
let shieldProtection = smallDamages;
let steps = 0;
let username, score;
let playerRank = []
let memory = [];
let localPlayer = "";
let background = daySky;

function Animation (img, maxFrame) {
	this.img = img;
	this.maxFrame = maxFrame;
	this.currentFrame = 0;
}

function reset () {
	restart.src = "img/restartPushed.png";
	setTimeout(function () {
		restart.style.display = "none";
		restart.src = "img/restart.png";
		alertText.innerHTML = "";
		playerHealth = 2500, botHealth = 2500;
		playerStock = {small : 3, big : 1};
		botStock = {small : 3, big : 1};
		steps = 0;
		bigTxt.innerHTML = playerStock.big;
		bigImg.src = "img/big.png";
		smallTxt.innerHTML = playerStock.small;
		smallImg.src = "img/small.png";
		start.parentElement.style.display = "flex";
		start.addEventListener("click", round);
	},300);
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
	screen.drawImage(background, 50, 0, 1000, 500);
	screen.fillStyle = "#052216";
	screen.fillRect(0,0,50,500);
	screen.fillStyle = "#09162a";
	screen.fillRect(1050,0,50,500);
	screen.drawImage(healthBarBot, 0, ((2500-botHealth)/5), 50, 500, 1050, ((2500-botHealth)/5), 50, 500);
	screen.drawImage(healthBarPlayer, 0, ((2500-playerHealth)/5), 50, 500, 0, ((2500-playerHealth)/5), 50, 500);
	screen.drawImage(boats, 50, 0, 1000, 500);
	screen.drawImage(life, 0, 450, 50, 50);
	screen.drawImage(life, 1050, 450, 50, 50);

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

	screen.globalAlpha = 0.15;
	switch (weather.value) {
		case "night":
			screen.fillStyle = "#001a43";
			break;
		case "sunset":
			screen.fillStyle = "#ff8010";
			break;
		default:
			screen.globalAlpha = 0;
	}
	screen.fillRect(50,0,1000,500);
	screen.globalAlpha = 1;

}

function select () {
	for (const button of buttons) {
		if (button == this) {
			if (button.id == "small" && playerStock.small == 0) {
				button.firstChild.src = "img/reloadPushed.png";
				selected = button.id;
			} else if (button.id == "big" && playerStock.big == 0) {
				button.firstChild.src = "img/reloadPushed.png";
				selected = button.id;
			} else {
				button.firstChild.src = "img/"+button.id+"Pushed.png";
				selected = button.id;
			}
		} else {
			if (button.id == "small" && playerStock.small == 0) {
				button.firstChild.src = "img/reload.png";
			} else if (button.id == "big" && playerStock.big == 0) {
				button.firstChild.src = "img/reload.png";
			} else {
				button.firstChild.src = "img/"+button.id+".png";
			}
		}
	}
}

function round () {

	startImg.src = "img/buttonPushed.png";
	start.removeEventListener("click", round);

	let botChoice = attacks[Math.floor(Math.random() * Math.floor(3))];
	let playerChoice = selected;

	if (playerChoice != undefined) {

		steps++;

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
				smallImg.src = "img/small.png";
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
				bigImg.src = "img/big.png";
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
		alertText.innerHTML = "Select an attack";
	}

	if (playerStock.small == 0) {
		smallImg.src = "img/reload.png";
	}

	if (playerStock.big == 0) {
		bigImg.src = "img/reload.png";
	}

	selected = undefined;

	for (const button of buttons) {
		if (button.id == "small" && playerStock.small == 0) {
			button.firstChild.src = "img/reload.png";
		} else if (button.id == "big" && playerStock.big == 0) {
			button.firstChild.src = "img/reload.png";
		} else {
			button.firstChild.src = "img/"+button.id+".png";
		}
	}

	setTimeout(function () {
		for (const animation of animations) {
			animation.currentFrame = 0;
		}
		animations = [];
		start.addEventListener("click", round);
		startImg.src = "img/button.png";
		alertText.innerHTML = "";
		if (playerHealth <= 0 && botHealth <= 0) {
			alertText.innerHTML = "That's peace <3";
			restart.style.display = "block";
			restart.addEventListener("click",reset);
			start.parentElement.style.display = "none";
			start.removeEventListener("click", round);
		} else if (playerHealth <= 0) {
			alertText.innerHTML = "Oups! You lose";
			restart.style.display = "block";
			restart.addEventListener("click",reset);
			start.parentElement.style.display = "none";
			start.removeEventListener("click", round);
		} else if (botHealth <= 0) {
			alertText.innerHTML = "Good job! You win in "+steps+" rounds";
			if (localStorage.getItem(username) === null) {
				score = steps;
		    	localStorage.setItem(username,score);
			} else {
				score = localStorage.getItem(username);
			}
			if (steps <= score) {
				score = steps;
				localStorage.setItem(username,score);
				for ( var i = 0; i < localStorage.length; i++) {
					playerRank[localStorage.key(i)] = localStorage.getItem(localStorage.key(i));
				}
				for (var key in playerRank) memory.push([key, playerRank[key]]);
				console.log(memory);
				memory.sort(function(a, b) {
				    a = a[1];
				    b = b[1];
				    return a-b;
				});
				console.log(memory);
				for (var i = 0; i < memory.length; i++) {
				    localPlayer += "<p>"+memory[i][0]+ "<span>" +memory[i][1]+ "</span></p>";
				}
				scoreBoard.innerHTML = "<h3>Local Player Rank</h3>"+localPlayer;
				localPlayer = "";
				playerRank = [];
				memory = [];
			}
			restart.style.display = "block";
			restart.addEventListener("click",reset);
			start.parentElement.style.display = "none";
			start.removeEventListener("click", round);
		}
	}, animationSpeed*smallBotAnim.maxFrame);

}

window.addEventListener("DOMContentLoaded", main);

function main () {
	canvas = document.getElementById("game");
	screen = canvas.getContext("2d");
	alertText = document.getElementById("alertText");

	buttons = document.getElementsByClassName("button");
	for (const button of buttons) {
		button.addEventListener("click", select);
	}

	startImg = document.getElementById("startImg");
	start = document.getElementById("start");

	smallImg = document.getElementById("smallImg");
	bigImg = document.getElementById("bigImg");

	smallTxt = document.getElementById("smallStock");
	bigTxt = document.getElementById("bigStock");
	smallTxt.innerHTML = playerStock.small;
	bigTxt.innerHTML = playerStock.big;
	play = document.getElementById("send");
	modal = document.getElementById("background");
	user = document.getElementById("username");
	weather = document.getElementById("weather");
	alertUser = document.getElementById("alertZone");
	restart = document.getElementById("restart");
	scoreBoard = document.getElementById("rank");
	alertScreen = document.getElementById("alert");

	for ( var i = 0; i < localStorage.length; i++) {
		playerRank[localStorage.key(i)] = localStorage.getItem(localStorage.key(i));
	}
	for (var key in playerRank) memory.push([key, playerRank[key]]);
	console.log(memory);
	memory.sort(function(a, b) {
	    a = a[1];
	    b = b[1];
	    return a-b;
	});
	console.log(memory);
	for (var i = 0; i < memory.length; i++) {
	    localPlayer += "<p>"+memory[i][0]+ "<span>" +memory[i][1]+ "</span></p>";
	}
	scoreBoard.innerHTML = "<h3>Local Player Rank</h3>"+localPlayer;
	localPlayer = "";
	playerRank = [];
	memory = [];

	play.addEventListener("click", function () {
		play.src = "img/playPushed.png";
		setTimeout(function () {
			play.src = "img/play.png";
			if (user.value.length >= 3) {
				modal.style.display = "none";
				username = user.value;
				switch (weather.value) {
					case "night":
						background = nightSky;
						break;
					case "sunset":
						background = sunsetSky;
						break;
					default:
						background = daySky;
				}
				start.parentElement.style.display = "flex";
				alertScreen.style.display = "block";
				game.style.display = "block";
				rank.style.display = "block";
				start.addEventListener("click", round);
				/*screen.fillStyle = "#87ceeb";
				screen.fillRect(50,0,1000,500);*/
				screen.drawImage(background, 50, 0, 1000, 500);
				screen.fillStyle = "#052216";
				screen.fillRect(0,0,50,500);
				screen.fillStyle = "#09162a";
				screen.fillRect(1050,0,50,500);
				screen.drawImage(healthBarBot, 0, ((2500-botHealth)/5), 50, 500, 1050, ((2500-botHealth)/5), 50, 500);
				screen.drawImage(healthBarPlayer, 0, ((2500-playerHealth)/5), 50, 500, 0, ((2500-playerHealth)/5), 50, 500);
				screen.drawImage(boats, 50, 0, 1000, 500);
				screen.drawImage(life, 0, 450, 50, 50);
				screen.drawImage(life, 1050, 450, 50, 50);
				screen.drawImage(seaAnim.img, 1000*seaAnim.currentFrame, 0, 1000, 500, 50, 0, 1000, 500);
				screen.globalAlpha = 0.15;
				switch (weather.value) {
					case "night":
						screen.fillStyle = "#001a43";
						break;
					case "sunset":
						screen.fillStyle = "#ff8010";
						break;
					default:
						screen.globalAlpha = 0;
				}
				screen.fillRect(50,0,1000,500);
				screen.globalAlpha = 1;
				precTime = new Date().getTime();
				window.requestAnimationFrame(gameloop);
			} else {
				alertUser.style.display = "block";
			}
		},500);
	});
}